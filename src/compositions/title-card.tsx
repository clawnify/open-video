import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const titleCardSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  backgroundColor: zColor(),
  textColor: zColor(),
  accentColor: zColor(),
});

type TitleCardProps = z.infer<typeof titleCardSchema>;

export const TitleCard: React.FC<TitleCardProps> = ({
  title, subtitle, backgroundColor, textColor, accentColor,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({ frame, fps, from: 40, to: 0, durationInFrames: 30 });
  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const lineWidth = interpolate(frame, [15, 40], [0, 200], { extrapolateRight: "clamp" });
  const subtitleOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateRight: "clamp" });
  const subtitleY = spring({ frame: Math.max(0, frame - 25), fps, from: 30, to: 0, durationInFrames: 25 });

  return (
    <AbsoluteFill style={{ backgroundColor, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sequence from={0} durationInFrames={120} name="Title" layout="none">
        <div style={{ color: textColor, fontSize: 72, fontWeight: 800, letterSpacing: "-0.02em", opacity: titleOpacity, transform: `translateY(${titleY}px)`, textAlign: "center", padding: "0 80px" }}>
          {title}
        </div>
      </Sequence>
      <Sequence from={15} durationInFrames={105} name="Accent Line" layout="none">
        <div style={{ width: lineWidth, height: 4, backgroundColor: accentColor, borderRadius: 2, margin: "24px 0" }} />
      </Sequence>
      <Sequence from={25} durationInFrames={95} name="Subtitle" layout="none">
        <div style={{ color: textColor, fontSize: 28, fontWeight: 400, opacity: subtitleOpacity, transform: `translateY(${subtitleY}px)`, textAlign: "center", padding: "0 120px", lineHeight: 1.5 }}>
          {subtitle}
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
