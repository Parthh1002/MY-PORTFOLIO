import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaCode, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";

interface ProfileViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

export default function ProfileViewModal({ isOpen, onClose, src }: ProfileViewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="prof-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            className="prof-modal-card"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close */}
            <div className="prof-modal-header">
              <div className="prof-modal-status">
                <span className="prof-status-dot" />
                <span>Available for Opportunities</span>
              </div>
              <button
                className="prof-modal-close"
                onClick={onClose}
                aria-label="Close Profile Modal"
                type="button"
              >
                <FaTimes size={15} />
              </button>
            </div>

            {/* Main Portrait Stage */}
            <div className="prof-modal-hero">
              <div className="prof-avatar-frame">
                <img
                  src={src}
                  alt="Parth Patel"
                  className="prof-avatar-img"
                />
              </div>

              <div className="prof-hero-details">
                <h2 className="prof-name">Parth Patel</h2>
                <p className="prof-title">Creative Developer &amp; Fullstack Engineer</p>

                <div className="prof-meta-chips">
                  <span className="prof-chip">
                    <FaGraduationCap size={12} />
                    <span>3rd Year B.Tech CSE · LDRP-ITR</span>
                  </span>
                  <span className="prof-chip">
                    <FaMapMarkerAlt size={11} />
                    <span>Ahmedabad, India</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Skills Summary */}
            <div className="prof-modal-body">
              <div className="prof-section-heading">
                <FaCode size={12} />
                <span>Core Expertise</span>
              </div>
              <div className="prof-tags-grid">
                <span className="prof-tag">Full-Stack Web (MERN / Next.js)</span>
                <span className="prof-tag">Data Science &amp; Machine Learning</span>
                <span className="prof-tag">TypeScript &amp; React Architecture</span>
                <span className="prof-tag">UI/UX &amp; High-Performance Motion</span>
              </div>

              {/* Connect Links */}
              <div className="prof-actions-row">
                <a
                  href="https://github.com/Parthh1002"
                  target="_blank"
                  rel="noreferrer"
                  className="prof-action-btn"
                >
                  <FaGithub size={15} />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/parth-patel-468772336"
                  target="_blank"
                  rel="noreferrer"
                  className="prof-action-btn"
                >
                  <FaLinkedin size={15} color="#0a66c2" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:parthh1002@gmail.com"
                  className="prof-action-btn"
                >
                  <FaEnvelope size={14} color="#ea4335" />
                  <span>Email</span>
                </a>
                <a
                  href="https://wa.me/918866077505"
                  target="_blank"
                  rel="noreferrer"
                  className="prof-action-btn"
                >
                  <FaWhatsapp size={15} color="#25D366" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
