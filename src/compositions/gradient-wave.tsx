import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const gradientWaveSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  colorFrom: zColor(),
  colorTo: zColor(),
  textColor: zColor(),
});

type GradientWaveProps = z.infer<typeof gradientWaveSchema>;

export const GradientWave: React.FC<GradientWaveProps> = ({ title, subtitle, colorFrom, colorTo, textColor }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const angle = interpolate(frame, [0, durationInFrames], [0, 360]);
  const wave1Y = Math.sin(frame * 0.08) * 20;
  const wave2Y = Math.cos(frame * 0.06) * 15;
  const titleOpacity = interpolate(frame, [10, 30], [0, 1], { extrapolateRight: "clamp" });
  const titleScale = interpolate(frame, [10, 35], [0.9, 1], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: `linear-gradient(${angle}deg, ${colorFrom}, ${colorTo})`, fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden" }}>
      <Sequence from={0} name="Floating Circles" layout="none">
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)", top: -100, right: -100, transform: `translateY(${wave1Y}px)` }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.06)", bottom: -50, left: -50, transform: `translateY(${wave2Y}px)` }} />
      </Sequence>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", position: "relative" }}>
        <Sequence from={10} durationInFrames={170} name="Title" layout="none">
          <div style={{ color: textColor, fontSize: 80, fontWeight: 800, letterSpacing: "-0.03em", opacity: titleOpacity, transform: `scale(${titleScale})`, textAlign: "center" as const, padding: "0 80px", textShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>{title}</div>
        </Sequence>
        <Sequence from={35} durationInFrames={145} name="Subtitle" layout="none">
          <div style={{ color: textColor, fontSize: 30, fontWeight: 400, opacity: subtitleOpacity, marginTop: 24, textAlign: "center" as const, padding: "0 120px", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>{subtitle}</div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};
