import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroProps {
  onComplete: () => void;
}

// Each phase:
// 0  → black screen (200ms)
// 1  → "PP" monogram slams in (600ms)
// 2  → Monogram fades, "PARTH PATEL" letters reveal (800ms)
// 3  → Hold (500ms)
// 4  → Exit: upward wipe reveals dashboard

export default function CinematicIntro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 200);
    const t1 = setTimeout(() => setPhase(2), 800);
    const t2 = setTimeout(() => setPhase(3), 1700);
    const t3 = setTimeout(() => setPhase(4), 2300);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const nameText = "PARTH PATEL";

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase < 4 && (
        <motion.div
          key="cinematic"
          style={overlayStyle}
          initial={{ y: 0 }}
          exit={{ y: "-100vh", transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Deep black base */}
          <div style={{ position: "absolute", inset: 0, background: "#080909" }} />

          {/* Subtle radial vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.03) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* ── Phase 1: PP Monogram (Netflix-style logo slam) ── */}
          <AnimatePresence>
            {phase === 1 && (
              <motion.div
                key="monogram"
                style={centerStyle}
                initial={{ opacity: 0, scale: 2.4 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } }}
                exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.25, ease: "easeIn" } }}
              >
                <div style={monogramStyle}>
                  <span style={monogramLetterStyle}>P</span>
                  <span style={{ ...monogramLetterStyle, color: "rgba(255,255,255,0.25)" }}>P</span>
                </div>
                {/* Glow pulse behind monogram */}
                <motion.div
                  style={monogramGlowStyle}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.6, 0], scale: [0.6, 1.5, 2], transition: { duration: 0.7, ease: "easeOut" } }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Phase 2 & 3: PARTH PATEL letter reveal ── */}
          <AnimatePresence>
            {(phase === 2 || phase === 3) && (
              <motion.div
                key="nameline"
                style={centerStyle}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                {/* Letter-by-letter upward reveal */}
                <div style={{ display: "flex", overflow: "hidden", gap: "0.02em" }}>
                  {nameText.split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{
                        y: "0%",
                        opacity: 1,
                        transition: {
                          duration: 0.6,
                          delay: i * 0.045,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      }}
                      style={letterStyle(char)}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </div>

                {/* Subtitle line */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.65, duration: 0.5, ease: "easeOut" } }}
                  style={subtitleStyle}
                >
                  Creative Developer &amp; Fullstack Engineer
                </motion.div>

                {/* Bottom scan line — Netflix-like */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1, transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
                  style={scanLineStyle}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Style objects ───────────────────────────────────────

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 99999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

const centerStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};

const monogramStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  letterSpacing: "-0.04em",
  lineHeight: 1,
  position: "relative",
  zIndex: 2,
};

const monogramLetterStyle: React.CSSProperties = {
  fontFamily: "'Source Serif 4', serif",
  fontSize: "clamp(64px, 16vw, 120px)",
  fontWeight: 600,
  color: "#ffffff",
  display: "inline-block",
  lineHeight: 1,
};

const monogramGlowStyle: React.CSSProperties = {
  position: "absolute",
  width: "280px",
  height: "280px",
  borderRadius: "50%",
  background: "radial-gradient(circle, rgba(255,255,255,0.18) 0%, transparent 70%)",
  zIndex: 1,
};

const letterStyle = (char: string): React.CSSProperties => ({
  display: "inline-block",
  fontFamily: "'Geist', sans-serif",
  fontSize: "clamp(28px, 7.5vw, 58px)",
  fontWeight: 500,
  color: "#ffffff",
  letterSpacing: "0.18em",
  lineHeight: 1,
  marginRight: char === " " ? "0.5em" : "0",
});

const subtitleStyle: React.CSSProperties = {
  fontFamily: "'Geist', sans-serif",
  fontSize: "clamp(11px, 2vw, 14px)",
  fontWeight: 400,
  color: "rgba(255,255,255,0.45)",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
};

const scanLineStyle: React.CSSProperties = {
  position: "absolute",
  bottom: "calc(50% - 80px)",
  left: "50%",
  transform: "translateX(-50%)",
  width: "clamp(180px, 40vw, 320px)",
  height: "1px",
  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
  transformOrigin: "left center",
};
