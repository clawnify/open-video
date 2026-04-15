
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";

export interface BabetteWelcomeProps {
  salonName: string;
  tagline: string;
  welcomeText: string;
  locationText: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  goldColor: string;
  mutedColor: string;
}

export const BabetteWelcome: React.FC<BabetteWelcomeProps> = ({
  salonName,
  tagline,
  welcomeText,
  locationText,
  backgroundColor,
  textColor,
  accentColor,
  goldColor,
  mutedColor,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Background fade in
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });

  // Decorative top line
  const lineWidth = interpolate(frame, [10, 50], [0, 320], { extrapolateRight: "clamp" });
  const lineOpacity = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" });

  // "Bienvenue" welcome text
  const welcomeOpacity = interpolate(frame, [15, 40], [0, 1], { extrapolateRight: "clamp" });
  const welcomeLetterSpacing = interpolate(frame, [15, 50], [20, 8], { extrapolateRight: "clamp" });

  // Main salon name
  const nameY = spring({ frame: frame - 30, fps, from: 60, to: 0, durationInFrames: 45, config: { damping: 18, stiffness: 60 } });
  const nameOpacity = interpolate(frame, [30, 55], [0, 1], { extrapolateRight: "clamp" });

  // Ornamental divider
  const dividerOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateRight: "clamp" });
  const dividerWidth = interpolate(frame, [60, 90], [0, 180], { extrapolateRight: "clamp" });

  // Tagline
  const taglineOpacity = interpolate(frame, [75, 100], [0, 1], { extrapolateRight: "clamp" });
  const taglineY = spring({ frame: frame - 75, fps, from: 20, to: 0, durationInFrames: 30, config: { damping: 20 } });

  // Location
  const locationOpacity = interpolate(frame, [95, 115], [0, 1], { extrapolateRight: "clamp" });

  // Bottom line
  const bottomLineWidth = interpolate(frame, [100, 130], [0, 320], { extrapolateRight: "clamp" });
  const bottomLineOpacity = interpolate(frame, [100, 125], [0, 1], { extrapolateRight: "clamp" });

  // Fade out at the end
  const globalFadeOut = interpolate(frame, [durationInFrames - 20, durationInFrames - 5], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Floating particles
  const particles = Array.from({ length: 12 }, (_, i) => {
    const seed = i * 137.5;
    const x = (seed % 1920);
    const startY = 1080 + (seed % 200);
    const yProgress = interpolate(frame, [i * 5, durationInFrames], [startY, -100], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const particleOpacity = interpolate(frame, [i * 5, i * 5 + 30, durationInFrames - 20, durationInFrames], [0, 0.25, 0.25, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
    const size = 2 + (i % 3) * 1.5;
    return { x, y: yProgress, opacity: particleOpacity, size };
  });

  // Shimmer on name
  const shimmerX = interpolate(frame, [60, 110], [-600, 2200], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, #1a1208 0%, ${backgroundColor} 70%)`,
        opacity: bgOpacity * globalFadeOut,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        overflow: "hidden",
      }}
    >
      {/* Floating dust particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: goldColor,
            opacity: p.opacity,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Subtle vignette overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Top decorative line */}
      <Sequence from={10} durationInFrames={140} name="TopLine" layout="none">
        <div
          style={{
            position: "absolute",
            top: 320,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: lineOpacity,
          }}
        >
          <div style={{ width: lineWidth / 2, height: 1, background: `linear-gradient(to right, transparent, ${goldColor})` }} />
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: goldColor, boxShadow: `0 0 8px ${goldColor}` }} />
          <div style={{ width: lineWidth / 2, height: 1, background: `linear-gradient(to left, transparent, ${goldColor})` }} />
        </div>
      </Sequence>

      {/* Bienvenue */}
      <Sequence from={15} durationInFrames={135} name="Welcome" layout="none">
        <div
          style={{
            position: "absolute",
            top: 345,
            left: "50%",
            transform: "translateX(-50%)",
            color: goldColor,
            fontSize: 13,
            fontFamily: "'Inter', system-ui, sans-serif",
            fontWeight: 400,
            letterSpacing: welcomeLetterSpacing,
            textTransform: "uppercase",
            opacity: welcomeOpacity,
            whiteSpace: "nowrap",
          }}
        >
          {welcomeText}
        </div>
      </Sequence>

      {/* Main salon name with shimmer */}
      <Sequence from={30} durationInFrames={120} name="SalonName" layout="none">
        <div
          style={{
            position: "absolute",
            top: 390,
            left: "50%",
            transform: `translateX(-50%) translateY(${nameY}px)`,
            opacity: nameOpacity,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {/* Shimmer layer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(105deg, transparent 30%, rgba(255,230,140,0.55) 50%, transparent 70%)`,
              backgroundSize: "200% 100%",
              transform: `translateX(${shimmerX - 960}px)`,
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
          <div
            style={{
              color: textColor,
              fontSize: 148,
              fontWeight: 700,
              fontStyle: "italic",
              letterSpacing: -2,
              lineHeight: 1,
              textShadow: `0 0 60px rgba(212,175,55,0.3), 0 4px 32px rgba(0,0,0,0.6)`,
              position: "relative",
            }}
          >
            {salonName}
          </div>
        </div>
      </Sequence>

      {/* Ornamental divider */}
      <Sequence from={60} durationInFrames={90} name="Divider" layout="none">
        <div
          style={{
            position: "absolute",
            top: 548,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 14,
            opacity: dividerOpacity,
          }}
        >
          <div style={{ width: dividerWidth, height: 1, background: `linear-gradient(to right, transparent, ${goldColor}88)` }} />
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 1 L12.5 9.5 L21 11 L12.5 12.5 L11 21 L9.5 12.5 L1 11 L9.5 9.5 Z" fill={goldColor} opacity="0.9" />
          </svg>
          <div style={{ width: dividerWidth, height: 1, background: `linear-gradient(to left, transparent, ${goldColor}88)` }} />
        </div>
      </Sequence>

      {/* Tagline */}
      <Sequence from={75} durationInFrames={75} name="Tagline" layout="none">
        <div
          style={{
            position: "absolute",
            top: 585,
            left: "50%",
            transform: `translateX(-50%) translateY(${taglineY}px)`,
            opacity: taglineOpacity,
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              color: mutedColor,
              fontSize: 22,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              letterSpacing: 5,
              textTransform: "uppercase",
            }}
          >
            {tagline}
          </div>
        </div>
      </Sequence>

      {/* Location */}
      <Sequence from={95} durationInFrames={55} name="Location" layout="none">
        <div
          style={{
            position: "absolute",
            top: 636,
            left: "50%",
            transform: "translateX(-50%)",
            opacity: locationOpacity,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
            <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 6 3.5 1.5 1.5 0 0 1 6 6.5z" fill={goldColor} opacity="0.7"/>
          </svg>
          <div
            style={{
              color: mutedColor,
              fontSize: 14,
              fontFamily: "'Inter', system-ui, sans-serif",
              fontWeight: 300,
              letterSpacing: 4,
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            {locationText}
          </div>
        </div>
      </Sequence>

      {/* Bottom decorative line */}
      <Sequence from={100} durationInFrames={50} name="BottomLine" layout="none">
        <div
          style={{
            position: "absolute",
            top: 680,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: bottomLineOpacity,
          }}
        >
          <div style={{ width: bottomLineWidth / 2, height: 1, background: `linear-gradient(to right, transparent, ${goldColor}66)` }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", backgroundColor: goldColor, opacity: 0.5 }} />
          <div style={{ width: bottomLineWidth / 2, height: 1, background: `linear-gradient(to left, transparent, ${goldColor}66)` }} />
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
