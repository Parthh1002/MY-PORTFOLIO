import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent, useRef, useState } from "react";
import InstagramProfileModal from "./InstagramProfileModal";
import { FaInstagram } from "react-icons/fa";

interface ProfileTiltProps {
  src: string;
}

export default function ProfileTilt({ src }: ProfileTiltProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for the mouse position relative to center [-1 to 1]
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth them with a spring
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  // Map to rotation degrees (tilt intensity)
  const rotateX = useTransform(mouseYSpring, [-1, 1], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-1, 1], [-8, 8]);

  // Map to glare position/opacity
  const glareX = useTransform(mouseXSpring, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-1, 1], ["0%", "100%"]);
  const glareOpacity = useTransform(y, [-1, 1], [0.1, 0.4]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse position relative to center of element (-1 to 1)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <>
      <div
        className="profile-frame-container"
        style={{ perspective: "800px" }}
      >
        <motion.div
          ref={ref}
          className="profile-frame premium-glass-card profile-clickable"
          onClick={() => setModalOpen(true)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          title="Click to view Instagram-style profile story"
        >
          {/* Photo Image */}
          <div
            className="profile-img-wrap"
            style={{ transform: "translateZ(30px)" }}
          >
            <img className="profile-pic" src={src} alt="Parth Patel" />
          </div>

          {/* Ambient Glow Behind Photo */}
          <div className="profile-glow" style={{ transform: "translateZ(-20px)" }} />

          {/* Instagram Story Ring Glow on Hover */}
          <div className="profile-ig-badge" style={{ transform: "translateZ(45px)" }}>
            <FaInstagram size={13} />
            <span>Story</span>
          </div>

          {/* Interactive Glare / Sheen overlay */}
          <motion.div
            className="profile-glare"
            style={
              {
                background:
                  "radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)",
                opacity: glareOpacity,
                "--gx": glareX,
                "--gy": glareY,
                transform: "translateZ(40px)",
              } as any
            }
          />
        </motion.div>
      </div>

      {/* Instagram Profile Popup Modal */}
      <InstagramProfileModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={src}
      />
    </>
  );
}
