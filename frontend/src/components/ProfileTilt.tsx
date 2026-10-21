import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef, useState, useEffect } from "react";
import ProfileViewModal from "./ProfileViewModal";

interface ProfileTiltProps {
  src: string;
}

export default function ProfileTilt({ src }: ProfileTiltProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth <= 768 ||
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
    window.addEventListener("resize", checkTouch, { passive: true });
    return () => window.removeEventListener("resize", checkTouch);
  }, []);

  // Motion values for mouse position relative to center [-1 to 1]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs on desktop
  const mouseXSpring = useSpring(x, { stiffness: 180, damping: 24 });
  const mouseYSpring = useSpring(y, { stiffness: 180, damping: 24 });

  // Map to rotation degrees
  const rotateX = useTransform(mouseYSpring, [-1, 1], [7, -7]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], [-7, 7]);

  // Map to glare position/opacity
  const glareX = useTransform(mouseXSpring, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-1, 1], ["0%", "100%"]);
  const glareOpacity = useTransform(y, [-1, 1], [0.1, 0.35]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouch || !ref.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = (mouseX / width - 0.5) * 2;
      const yPct = (mouseY / height - 0.5) * 2;

      x.set(xPct);
      y.set(yPct);
    });
  };

  const handleMouseLeave = () => {
    if (isTouch) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <div
        className="profile-frame-container"
        style={!isTouch ? { perspective: "800px" } : undefined}
      >
        <motion.div
          ref={ref}
          className="profile-frame premium-glass-card profile-clickable"
          onClick={() => setModalOpen(true)}
          onMouseMove={!isTouch ? handleMouseMove : undefined}
          onMouseLeave={!isTouch ? handleMouseLeave : undefined}
          style={
            !isTouch
              ? {
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                  cursor: "pointer",
                }
              : {
                  cursor: "pointer",
                  transform: "none",
                }
          }
          whileHover={{ scale: 1.025 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          title="Click to view profile portrait"
        >
          {/* Photo Image */}
          <div
            className="profile-img-wrap"
            style={!isTouch ? { transform: "translateZ(26px)" } : undefined}
          >
            <img
              className="profile-pic"
              src={src}
              alt="Parth Patel"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Ambient Glow Behind Photo */}
          <div
            className="profile-glow"
            style={!isTouch ? { transform: "translateZ(-16px)" } : undefined}
          />

          {/* Interactive Glare overlay on desktop */}
          {!isTouch && (
            <motion.div
              className="profile-glare"
              style={
                {
                  background:
                    "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 60%)",
                  opacity: glareOpacity,
                  "--gx": glareX,
                  "--gy": glareY,
                  transform: "translateZ(32px)",
                } as any
              }
            />
          )}
        </motion.div>
      </div>

      {/* Executive Profile Modal */}
      <ProfileViewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={src}
      />
    </>
  );
}
