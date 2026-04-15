import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const logoRevealSchema = z.object({
  text: z.string(),
  tagline: z.string(),
  backgroundColor: zColor(),
  textColor: zColor(),
  accentColor: zColor(),
});

type LogoRevealProps = z.infer<typeof logoRevealSchema>;

export const LogoReveal: React.FC<LogoRevealProps> = ({ text, tagline, backgroundColor, textColor, accentColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const glowOpacity = interpolate(frame, [30, 50, 60, 75], [0, 0.8, 0.8, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const maskWidth = interpolate(frame, [20, 50], [0, 110], { extrapolateRight: "clamp" });
  const lineLeft = interpolate(frame, [40, 60], [50, 0], { extrapolateRight: "clamp" });
  const lineRight = interpolate(frame, [40, 60], [50, 100], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [55, 75], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = spring({ frame: Math.max(0, frame - 55), fps, from: 20, to: 0, durationInFrames: 20 });

  return (
    <AbsoluteFill style={{ backgroundColor, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden" }}>
      <Sequence from={10} durationInFrames={60} name="Glow Effect" layout="none">
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", backgroundColor: accentColor, filter: "blur(120px)", opacity: glowOpacity, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }} />
      </Sequence>
      <Sequence from={20} durationInFrames={100} name="Logo Text" layout="none">
        <div style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ color: textColor, fontSize: 120, fontWeight: 900, letterSpacing: "0.15em", clipPath: `inset(0 ${100 - maskWidth}% 0 0)` }}>{text}</div>
        </div>
      </Sequence>
      <Sequence from={40} durationInFrames={80} name="Divider" layout="none">
        <div style={{ width: "60%", height: 2, background: `linear-gradient(to right, transparent ${lineLeft}%, ${accentColor} 50%, transparent ${lineRight}%)`, margin: "20px 0" }} />
      </Sequence>
      <Sequence from={55} durationInFrames={65} name="Tagline" layout="none">
        <div style={{ color: textColor, fontSize: 24, fontWeight: 300, letterSpacing: "0.3em", textTransform: "uppercase" as const, opacity: taglineOpacity, transform: `translateY(${taglineY}px)` }}>{tagline}</div>
      </Sequence>
    </AbsoluteFill>
  );
};
