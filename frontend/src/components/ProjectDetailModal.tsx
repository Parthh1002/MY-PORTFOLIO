import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaExternalLinkAlt,
  FaCode,
  FaCheckCircle,
  FaCalendarAlt,
  FaTag,
} from "react-icons/fa";

export interface ProjectItem {
  name: string;
  year: string;
  category: string;
  org: string;
  detail: string;
  live: string;
  github: string;
  badge: string | null;
  stack: string[];
  longDesc?: string;
  features?: string[];
  youtube?: string;
  linkedin?: string;
}

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="pdm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            className="pdm-card"
            initial={{ scale: 0.92, opacity: 0, y: 28 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ── */}
            <div className="pdm-header">
              <div className="pdm-header-meta">
                <div className="pdm-meta-tags">
                  <span className="pdm-year-tag">
                    <FaCalendarAlt size={10} /> {project.year}
                  </span>
                  <span className="pdm-cat-tag">
                    <FaTag size={10} /> {project.category}
                  </span>
                  {project.badge && (
                    <span className="pdm-status-badge">{project.badge}</span>
                  )}
                </div>
                <h2 className="pdm-title">{project.name}</h2>
                <p className="pdm-org">{project.org}</p>
              </div>

              <button
                className="pdm-close-btn"
                onClick={onClose}
                aria-label="Close modal"
                type="button"
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* ── Working Links Action Bar ── */}
            <div className="pdm-links-bar">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="pdm-action-btn pdm-btn-live"
                  title="Open live website"
                >
                  <FaExternalLinkAlt size={12} />
                  <span>Live Demo</span>
                  <span className="pdm-btn-arrow">↗</span>
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="pdm-action-btn pdm-btn-github"
                  title="View GitHub Repository"
                >
                  <FaGithub size={14} />
                  <span>GitHub Repo</span>
                  <span className="pdm-btn-arrow">↗</span>
                </a>
              )}

              {project.youtube && (
                <a
                  href={project.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="pdm-action-btn pdm-btn-youtube"
                  title="Watch Video / Demo on YouTube"
                >
                  <FaYoutube size={15} color="#FF0000" />
                  <span>YouTube</span>
                  <span className="pdm-btn-arrow">↗</span>
                </a>
              )}

              {project.linkedin && (
                <a
                  href={project.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="pdm-action-btn pdm-btn-linkedin"
                  title="View LinkedIn Profile & Post"
                >
                  <FaLinkedin size={14} color="#0A66C2" />
                  <span>LinkedIn</span>
                  <span className="pdm-btn-arrow">↗</span>
                </a>
              )}
            </div>

            {/* ── Scrollable Body Content ── */}
            <div className="pdm-body">
              {/* Overview Section */}
              <div className="pdm-section">
                <h4 className="pdm-sec-title">
                  <span className="pdm-sec-dot" /> Project Overview &amp; Impact
                </h4>
                <p className="pdm-desc-text">
                  {project.longDesc || project.detail}
                </p>
              </div>

              {/* Key Features Section */}
              {project.features && project.features.length > 0 && (
                <div className="pdm-section">
                  <h4 className="pdm-sec-title">
                    <span className="pdm-sec-dot" /> Key Features &amp; Architecture
                  </h4>
                  <div className="pdm-features-grid">
                    {project.features.map((feat, idx) => (
                      <div className="pdm-feature-item" key={idx}>
                        <FaCheckCircle className="pdm-feat-icon" size={13} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack Section */}
              <div className="pdm-section">
                <h4 className="pdm-sec-title">
                  <span className="pdm-sec-dot" /> Technologies &amp; Tools Used
                </h4>
                <div className="pdm-stack-wrap">
                  {project.stack.map((tech) => (
                    <span className="pdm-stack-pill" key={tech}>
                      <FaCode size={10} />
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Footer Bar ── */}
            <div className="pdm-footer">
              <span className="pdm-footer-note">
                Crafted with precision by Parth Patel
              </span>
              <div className="pdm-footer-actions">
                <button
                  className="pdm-footer-close"
                  onClick={onClose}
                  type="button"
                >
                  Close
                </button>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="pdm-footer-live"
                  >
                    Open Live Project ↗
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
