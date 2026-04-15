import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const socialPostSchema = z.object({
  headline: z.string(),
  body: z.string(),
  cta: z.string(),
  backgroundColor: zColor(),
  textColor: zColor(),
  accentColor: zColor(),
});

type SocialPostProps = z.infer<typeof socialPostSchema>;

export const SocialPost: React.FC<SocialPostProps> = ({
  headline, body, cta, backgroundColor, textColor, accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const headlineOpacity = interpolate(frame, [10, 25], [0, 1], { extrapolateRight: "clamp" });
  const headlineX = spring({ frame: Math.max(0, frame - 10), fps, from: -60, to: 0, durationInFrames: 20 });
  const bodyOpacity = interpolate(frame, [30, 45], [0, 1], { extrapolateRight: "clamp" });
  const bodyX = spring({ frame: Math.max(0, frame - 30), fps, from: -40, to: 0, durationInFrames: 20 });
  const ctaOpacity = interpolate(frame, [50, 65], [0, 1], { extrapolateRight: "clamp" });
  const ctaScale = spring({ frame: Math.max(0, frame - 50), fps, from: 0.8, to: 1, durationInFrames: 20 });
  const ctaPulse = frame > 70 ? 1 + Math.sin((frame - 70) * 0.15) * 0.03 : 1;

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden" }}>
      <Sequence from={0} name="Background" layout="none">
        <div style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", backgroundColor: accentColor, opacity: 0.15, transform: `scale(${bgScale})` }} />
      </Sequence>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 100px", height: "100%" }}>
        <Sequence from={10} durationInFrames={110} name="Headline" layout="none">
          <div style={{ color: textColor, fontSize: 64, fontWeight: 800, lineHeight: 1.1, opacity: headlineOpacity, transform: `translateX(${headlineX}px)`, marginBottom: 32 }}>{headline}</div>
        </Sequence>
        <Sequence from={30} durationInFrames={90} name="Body Text" layout="none">
          <div style={{ color: textColor, fontSize: 28, fontWeight: 400, lineHeight: 1.6, opacity: bodyOpacity, transform: `translateX(${bodyX}px)`, marginBottom: 48, maxWidth: 700 }}>{body}</div>
        </Sequence>
        <Sequence from={50} durationInFrames={70} name="CTA Button" layout="none">
          <div style={{ opacity: ctaOpacity, transform: `scale(${ctaScale * ctaPulse})`, alignSelf: "flex-start" }}>
            <div style={{ backgroundColor: accentColor, color: backgroundColor, fontSize: 24, fontWeight: 700, padding: "16px 40px", borderRadius: 12, display: "inline-block" }}>{cta}</div>
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
