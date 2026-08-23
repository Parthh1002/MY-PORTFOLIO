import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface IntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: IntroProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 1800; // 1.8s for loading sequence
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const percent = Math.min(Math.floor((currentStep / steps) * 100), 100);
      setProgress(percent);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsFinished(true), 400); // Small pause at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Text reveal animation (character by character sliding up)
  const text = "PARTH PATEL";
  const charVariants: any = {
    hidden: { y: "100%", opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      opacity: 1,
      transition: {
        ease: [0.22, 1, 0.36, 1],
        duration: 0.8,
        delay: i * 0.05, // Stagger effect
      },
    }),
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isFinished && (
        <motion.div
          key="intro"
          className="cinematic-intro"
          initial={{ y: 0 }}
          // The Netflix style upward wipe
          exit={{ 
            y: "-100vh", 
            transition: { ease: [0.76, 0, 0.24, 1], duration: 0.8 } 
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "#08090a", // Dark solid background to cover everything
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden"
          }}
        >
          {/* We make the background semi-transparent so the global ParticleBackground shows through! 
              Wait, the ParticleBackground is in App.tsx. If we want it to show through the intro,
              we should use a transparent/blur backdrop, but the user requested a dark background.
              Let's use a very dark but slightly transparent background with a heavy blur so it covers the content
              but lets particles bleed through, OR just a solid dark background with its own particle feel.
              Let's use #0a0a0c with 0.95 opacity so global particles are subtly visible.
          */}
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(8, 9, 10, 0.92)' }} />

          {/* Name Container */}
          <div style={{ display: "flex", overflow: "hidden", position: 'relative', zIndex: 10 }}>
            {text.split("").map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={charVariants}
                initial="hidden"
                animate="visible"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(32px, 8vw, 64px)",
                  fontWeight: 400,
                  color: "#ffffff",
                  letterSpacing: "0.08em",
                  marginRight: char === " " ? "0.3em" : "0",
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8, duration: 0.5 } }}
            style={{
              position: 'relative',
              zIndex: 10,
              marginTop: "40px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              width: "100%",
              maxWidth: "240px",
            }}
          >
            <div style={{
              width: "100%",
              height: "2px",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "2px",
              overflow: "hidden"
            }}>
              <motion.div
                style={{
                  height: "100%",
                  backgroundColor: "var(--accent-primary, #6e7bff)",
                  width: `${progress}%`,
                  transition: "width 0.1s linear"
                }}
              />
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.1em"
            }}>
              {progress.toString().padStart(3, '0')}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
