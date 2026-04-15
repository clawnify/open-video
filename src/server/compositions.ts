/**
 * Composition registry — mirrors what's in src/Root.tsx.
 * Exposes metadata + input schemas so agents can discover
 * available templates and build valid render requests.
 */

export interface CompositionMeta {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  fps: number;
  durationInFrames: number;
  inputSchema: Record<string, PropField>;
  defaultProps: Record<string, unknown>;
}

export interface PropField {
  type: "string" | "number" | "color" | "string[]";
  label: string;
  description?: string;
  default: unknown;
}

export const compositions: CompositionMeta[] = [
  {
    id: "TitleCard",
    name: "Title Card",
    description: "Animated title with subtitle fade-in and accent line. Great for intros, thumbnails, and announcements.",
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 150,
    inputSchema: {
      title: { type: "string", label: "Title", default: "Your Title Here" },
      subtitle: { type: "string", label: "Subtitle", default: "A beautiful subtitle with smooth animations" },
      backgroundColor: { type: "color", label: "Background Color", default: "#1e1b4b" },
      textColor: { type: "color", label: "Text Color", default: "#ffffff" },
      accentColor: { type: "color", label: "Accent Color", default: "#818cf8" },
    },
    defaultProps: {
      title: "Your Title Here",
      subtitle: "A beautiful subtitle with smooth animations",
      backgroundColor: "#1e1b4b",
      textColor: "#ffffff",
      accentColor: "#818cf8",
    },
  },
  {
    id: "KineticText",
    name: "Kinetic Typography",
    description: "Lines of text animate in sequence with spring physics. Perfect for slogans, mantras, and impact messages.",
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 180,
    inputSchema: {
      lines: { type: "string[]", label: "Lines", description: "Each line appears one at a time", default: ["DREAM", "BUILD", "LAUNCH"] },
      backgroundColor: { type: "color", label: "Background Color", default: "#0f172a" },
      textColor: { type: "color", label: "Text Color", default: "#f8fafc" },
      accentColor: { type: "color", label: "Accent Color", description: "Used for the last line", default: "#38bdf8" },
      fontWeight: { type: "string", label: "Font Weight", default: "900" },
    },
    defaultProps: {
      lines: ["DREAM", "BUILD", "LAUNCH"],
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      accentColor: "#38bdf8",
      fontWeight: "900",
    },
  },
  {
    id: "SocialPost",
    name: "Social Post",
    description: "Eye-catching social media announcement with headline, body, and CTA button. Square 1080×1080 format.",
    width: 1080,
    height: 1080,
    fps: 30,
    durationInFrames: 120,
    inputSchema: {
      headline: { type: "string", label: "Headline", default: "Big News!" },
      body: { type: "string", label: "Body Text", default: "We just launched our new product. Check it out and see what's possible." },
      cta: { type: "string", label: "Call to Action", default: "Learn More →" },
      backgroundColor: { type: "color", label: "Background Color", default: "#7c3aed" },
      textColor: { type: "color", label: "Text Color", default: "#ffffff" },
      accentColor: { type: "color", label: "Accent / CTA Color", default: "#fbbf24" },
    },
    defaultProps: {
      headline: "Big News!",
      body: "We just launched our new product. Check it out and see what's possible.",
      cta: "Learn More →",
      backgroundColor: "#7c3aed",
      textColor: "#ffffff",
      accentColor: "#fbbf24",
    },
  },
  {
    id: "Countdown",
    name: "Countdown Timer",
    description: "Animated countdown with ring progress and customizable end text. Great for launches and events.",
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 210,
    inputSchema: {
      from: { type: "number", label: "Count From", description: "Starting number", default: 5 },
      endText: { type: "string", label: "End Text", description: "Text shown when countdown reaches zero", default: "GO!" },
      backgroundColor: { type: "color", label: "Background Color", default: "#0f172a" },
      textColor: { type: "color", label: "Text Color", default: "#ffffff" },
      accentColor: { type: "color", label: "Accent Color", default: "#ef4444" },
    },
    defaultProps: {
      from: 5,
      endText: "GO!",
      backgroundColor: "#0f172a",
      textColor: "#ffffff",
      accentColor: "#ef4444",
    },
  },
  {
    id: "LogoReveal",
    name: "Logo Reveal",
    description: "Dramatic text reveal with glow effect and tagline. Perfect for brand intros and outros.",
    width: 1920,
    height: 1080,
    fps: 30,
    durationInFrames: 120,
    inputSchema: {
      text: { type: "string", label: "Logo Text", default: "BRAND" },
      tagline: { type: "string", label: "Tagline", default: "Your tagline here" },
      backgroundColor: { type: "color", label: "Background Color", default: "#000000" },
      textColor: { type: "color", label: "Text Color", default: "#ffffff" },
      accentColor: { type: "color", label: "Accent / Glow Color", default: "#f59e0b" },
    },
    defaultProps: {
      text: "BRAND",
      tagline: "Your tagline here",
      backgroundColor: "#000000",
      textColor: "#ffffff",
      accentColor: "#f59e0b",
    },
  },
  {
    id: "TitleCard-Square",
    name: "Title Card (Square)",
    description: "Same as Title Card but 1080×1080 for Instagram and social media.",
    width: 1080,
    height: 1080,
    fps: 30,
    durationInFrames: 150,
    inputSchema: {
      title: { type: "string", label: "Title", default: "Your Title Here" },
      subtitle: { type: "string", label: "Subtitle", default: "Perfect for Instagram and social media" },
      backgroundColor: { type: "color", label: "Background Color", default: "#1e1b4b" },
      textColor: { type: "color", label: "Text Color", default: "#ffffff" },
      accentColor: { type: "color", label: "Accent Color", default: "#818cf8" },
    },
    defaultProps: {
      title: "Your Title Here",
      subtitle: "Perfect for Instagram and social media",
      backgroundColor: "#1e1b4b",
      textColor: "#ffffff",
      accentColor: "#818cf8",
    },
  },
  {
    id: "KineticText-Reel",
    name: "Kinetic Text (Reel)",
    description: "Kinetic typography in 1080×1920 vertical format for Instagram Reels and TikTok.",
    width: 1080,
    height: 1920,
    fps: 30,
    durationInFrames: 180,
    inputSchema: {
      lines: { type: "string[]", label: "Lines", default: ["SWIPE", "UP", "NOW"] },
      backgroundColor: { type: "color", label: "Background Color", default: "#0f172a" },
      textColor: { type: "color", label: "Text Color", default: "#f8fafc" },
      accentColor: { type: "color", label: "Accent Color", default: "#38bdf8" },
      fontWeight: { type: "string", label: "Font Weight", default: "900" },
    },
    defaultProps: {
      lines: ["SWIPE", "UP", "NOW"],
      backgroundColor: "#0f172a",
      textColor: "#f8fafc",
      accentColor: "#38bdf8",
      fontWeight: "900",
    },
  },
];
