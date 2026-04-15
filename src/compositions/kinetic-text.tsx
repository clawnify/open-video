import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const kineticTextSchema = z.object({
  lines: z.array(z.string()),
  backgroundColor: zColor(),
  textColor: zColor(),
  accentColor: zColor(),
  fontWeight: z.string(),
});

type KineticTextProps = z.infer<typeof kineticTextSchema>;

const KineticLine: React.FC<{ text: string; color: string; fontWeight: string; isLast: boolean; lineDuration: number }> = ({
  text, color, fontWeight, isLast, lineDuration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const exitProgress = interpolate(frame, [lineDuration - 10, lineDuration], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, from: 0.7, to: 1, durationInFrames: 20 });
  const opacity = isLast ? progress : progress * (1 - exitProgress);
  const y = interpolate(exitProgress, [0, 1], [0, -60]);

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color, fontSize: 96, fontWeight: fontWeight || "900", letterSpacing: "-0.03em", textTransform: "uppercase" as const, opacity, transform: `scale(${scale}) translateY(${y}px)`, textAlign: "center" as const, padding: "0 60px" }}>
        {text}
      </div>
    </AbsoluteFill>
  );
};

export const KineticText: React.FC<KineticTextProps> = ({
  lines, backgroundColor, textColor, accentColor, fontWeight,
}) => {
  const { durationInFrames } = useVideoConfig();
  const framesPerLine = Math.floor(durationInFrames / (lines.length + 1));

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily: "'Inter', system-ui, sans-serif", overflow: "hidden" }}>
      {lines.map((line, i) => (
        <Sequence key={i} from={i * framesPerLine} durationInFrames={framesPerLine + 5} name={`Line: ${line}`}>
          <KineticLine text={line} color={i === lines.length - 1 ? accentColor : textColor} fontWeight={fontWeight} isLast={i === lines.length - 1} lineDuration={framesPerLine} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
