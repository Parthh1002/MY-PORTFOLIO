import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheckCircle, FaGithub, FaLinkedin, FaWhatsapp, FaHeart } from "react-icons/fa";

interface InstagramProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

export default function InstagramProfileModal({ isOpen, onClose, src }: InstagramProfileModalProps) {
  const [liked, setLiked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);

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

  const handleDoubleClick = () => {
    setLiked(true);
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ig-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          {/* Main Card */}
          <motion.div
            className="ig-modal-card"
            initial={{ scale: 0.82, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.82, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={handleDoubleClick}
          >
            {/* Top Bar (Instagram Story Header style) */}
            <div className="ig-modal-header">
              <div className="ig-header-user">
                <div className="ig-mini-story-ring">
                  <img src={src} alt="Parth Patel" className="ig-mini-avatar" />
                </div>
                <div className="ig-user-text">
                  <div className="ig-user-name">
                    <span>Parth Patel</span>
                    <FaCheckCircle className="ig-verified-badge" title="Verified Creator" />
                  </div>
                  <div className="ig-user-handle">@Parthh1002 · Story &amp; Profile</div>
                </div>
              </div>

              <button
                className="ig-modal-close-btn"
                onClick={onClose}
                aria-label="Close Profile View"
              >
                <FaTimes size={15} />
              </button>
            </div>

            {/* Profile Picture Showcase Area */}
            <div className="ig-avatar-stage">
              {/* Instagram Gradient Story Ring */}
              <div className="ig-story-ring-outer">
                <div className="ig-story-ring-inner">
                  <img
                    src={src}
                    alt="Parth Patel Profile"
                    className="ig-full-avatar"
                  />
                </div>
              </div>

              {/* Floating Live Badge */}
              <div className="ig-live-pill">
                <span className="ig-live-dot" />
                <span>ACTIVE NOW</span>
              </div>

              {/* Double-tap heart animation */}
              <AnimatePresence>
                {showHeartAnim && (
                  <motion.div
                    className="ig-heart-pop"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 1 }}
                    exit={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <FaHeart size={72} color="#ff3040" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bio & Details */}
            <div className="ig-modal-body">
              <div className="ig-tagline">
                Creative Developer &amp; Fullstack Engineer 🚀
              </div>
              <p className="ig-subtag">
                Building modern web apps, AI systems &amp; slick user experiences.
                Double-tap photo to send a like! ❤️
              </p>

              {/* Action Buttons */}
              <div className="ig-action-buttons">
                <button
                  className={`ig-like-btn ${liked ? "ig-liked" : ""}`}
                  onClick={() => {
                    setLiked((l) => !l);
                    if (!liked) {
                      setShowHeartAnim(true);
                      setTimeout(() => setShowHeartAnim(false), 800);
                    }
                  }}
                >
                  <FaHeart size={14} color={liked ? "#ff3040" : "currentColor"} />
                  <span>{liked ? "Liked!" : "Like Photo"}</span>
                </button>

                <a
                  href="https://github.com/Parthh1002"
                  target="_blank"
                  rel="noreferrer"
                  className="ig-social-pill"
                  title="GitHub Profile"
                >
                  <FaGithub size={15} />
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/parth-patel-468772336"
                  target="_blank"
                  rel="noreferrer"
                  className="ig-social-pill"
                  title="LinkedIn Profile"
                >
                  <FaLinkedin size={15} color="#0a66c2" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://wa.me/918866077505"
                  target="_blank"
                  rel="noreferrer"
                  className="ig-social-pill"
                  title="WhatsApp"
                >
                  <FaWhatsapp size={15} color="#25D366" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
