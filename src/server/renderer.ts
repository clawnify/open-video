import puppeteer from "@cloudflare/puppeteer";

/**
 * Renders a Remotion composition to WebM using Browser Rendering.
 *
 * 1. Launches headless Chrome via Cloudflare Browser Rendering
 * 2. Navigates to /render page which loads the Player + MediaRecorder
 * 3. Waits for recording to complete
 * 4. Returns the WebM as ArrayBuffer
 */
export async function renderVideo(params: {
  browserBinding: Fetcher;
  appUrl: string;
  compositionId: string;
  props: Record<string, unknown>;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
}): Promise<ArrayBuffer> {
  const { browserBinding, appUrl, compositionId, props, width, height, fps, durationInFrames } = params;
  const durationMs = (durationInFrames / fps) * 1000;

  const browser = await puppeteer.launch(browserBinding);
  const page = await browser.newPage();
  await page.setViewport({ width, height });

  const renderUrl = `${appUrl}/render?` + new URLSearchParams({
    composition: compositionId,
    props: JSON.stringify(props),
    width: String(width),
    height: String(height),
    fps: String(fps),
    frames: String(durationInFrames),
  }).toString();

  await page.goto(renderUrl, { waitUntil: "networkidle0", timeout: 30000 });

  // Wait for recording to start
  await page.waitForFunction("window.__renderStatus === 'recording'", { timeout: 30000 });

  // Wait for completion (give extra time for encoding)
  await page.waitForFunction(
    "window.__renderStatus === 'done' || window.__renderStatus === 'error'",
    { timeout: durationMs + 60000 },
  );

  const status = await page.evaluate(() => (window as any).__renderStatus) as string;
  if (status === "error") {
    const error = await page.evaluate(() => (window as any).__renderError) as string;
    await browser.close();
    throw new Error(`Render failed: ${error}`);
  }

  // Get the WebM as base64 data URL
  const base64Data = await page.evaluate(() => (window as any).__renderResult) as string;
  await browser.close();

  // Decode base64 data URL to ArrayBuffer
  const base64 = base64Data.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

  return bytes.buffer;
}
