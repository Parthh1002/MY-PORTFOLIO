import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

export interface TechPopupItem {
  name: string;
  icon: ReactNode;
  color: string;
  desc: string;
  category: string;
}

interface TechPopupProps {
  tech: TechPopupItem | null;
  pos: { x: number; y: number } | null;
  isMobile: boolean;
  onClose: () => void;
}

export default function TechPopup({ tech, pos, isMobile, onClose }: TechPopupProps) {
  return (
    <AnimatePresence>
      {tech && (
        isMobile ? (
          /* ── Mobile modal ──────────────────────── */
          <motion.div
            key="backdrop"
            className="tech-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.div
              className="tech-modal"
              initial={{ scale: 0.82, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.82, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="tech-modal-icon" style={{ color: tech.color }}>
                {tech.icon}
              </div>
              <div className="tech-modal-body">
                <div className="tech-modal-cat">{tech.category}</div>
                <h3 className="tech-modal-name">{tech.name}</h3>
                <p className="tech-modal-desc">{tech.desc}</p>
              </div>
              <button className="tech-modal-close" onClick={onClose}>✕</button>
            </motion.div>
          </motion.div>
        ) : (
          /* ── Desktop tooltip ───────────────────── */
          <motion.div
            key="tooltip"
            className="tech-tooltip"
            style={{
              position: "fixed",
              left: pos!.x,
              top: pos!.y,
              transform: "translate(-50%, calc(-100% - 12px))",
              zIndex: 8000,
              pointerEvents: "none",
            }}
            initial={{ opacity: 0, scale: 0.88, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            <span className="tech-tooltip-icon" style={{ color: tech.color }}>
              {tech.icon}
            </span>
            <div className="tech-tooltip-text">
              <div className="tech-tooltip-name">{tech.name}</div>
              <div className="tech-tooltip-desc">{tech.desc}</div>
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
}
