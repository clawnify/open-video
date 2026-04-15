import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { z } from "zod";
import { zColor } from "@remotion/zod-types";

export const countdownSchema = z.object({
  from: z.number(),
  endText: z.string(),
  backgroundColor: zColor(),
  textColor: zColor(),
  accentColor: zColor(),
});

type CountdownProps = z.infer<typeof countdownSchema>;

const CountNumber: React.FC<{ num: number; color: string; accentColor: string; totalFrames: number }> = ({ num, color, accentColor, totalFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, from: 1.4, to: 1, durationInFrames: 15 });
  const opacity = interpolate(frame, [totalFrames - 8, totalFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringProgress = interpolate(frame, [0, totalFrames], [0, 1], { extrapolateRight: "clamp" });
  const circumference = 2 * Math.PI * 140;

  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", width: 320, height: 320 }}>
        <svg width={320} height={320} viewBox="0 0 320 320" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
          <circle cx={160} cy={160} r={140} fill="none" stroke={accentColor} strokeWidth={6} strokeOpacity={0.2} />
          <circle cx={160} cy={160} r={140} fill="none" stroke={accentColor} strokeWidth={6} strokeDasharray={circumference} strokeDashoffset={circumference * (1 - ringProgress)} strokeLinecap="round" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color, fontSize: 140, fontWeight: 800, opacity, transform: `scale(${scale})` }}>{num}</div>
      </div>
    </AbsoluteFill>
  );
};

const EndText: React.FC<{ text: string; color: string }> = ({ text, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  return (
    <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color, fontSize: 120, fontWeight: 900, letterSpacing: "0.05em", transform: `scale(${scale})` }}>{text}</div>
    </AbsoluteFill>
  );
};

export const Countdown: React.FC<CountdownProps> = ({ from, endText, backgroundColor, textColor, accentColor }) => {
  const { durationInFrames } = useVideoConfig();
  const countdownFrames = durationInFrames - 30;
  const framesPerCount = Math.floor(countdownFrames / from);

  return (
    <AbsoluteFill style={{ backgroundColor, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {Array.from({ length: from }, (_, i) => (
        <Sequence key={from - i} from={i * framesPerCount} durationInFrames={framesPerCount} name={`Count ${from - i}`}>
          <CountNumber num={from - i} color={textColor} accentColor={accentColor} totalFrames={framesPerCount} />
        </Sequence>
      ))}
      <Sequence from={countdownFrames} durationInFrames={30} name={`End: ${endText}`}>
        <EndText text={endText} color={accentColor} />
      </Sequence>
    </AbsoluteFill>
  );
};
