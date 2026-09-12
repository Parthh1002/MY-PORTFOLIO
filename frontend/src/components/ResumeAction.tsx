import { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaFilePdf, FaEye, FaDownload, FaCheck, FaSpinner } from "react-icons/fa";
import ResumeModal from "./ResumeModal";

interface ResumeActionProps {
  pdfUrl?: string;
  className?: string;
}

export default function ResumeAction({
  pdfUrl = "/resume/Parth_Patel_CV.pdf",
  className = "",
}: ResumeActionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "success">("idle");
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Magnetic Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-6, 6]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleDownload = () => {
    if (downloadState !== "idle") return;

    setDownloadState("downloading");

    // Smooth feedback state before triggering the download
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Parth_Patel_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadState("success");

      setTimeout(() => {
        setDownloadState("idle");
      }, 3000);
    }, 700);
  };

  return (
    <>
      <div className={`resume-action-container ${className}`}>
        <motion.div
          ref={cardRef}
          className="resume-action-card"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Animated Neon Border Glow */}
          <div className="resume-card-glow" />

          {/* Top Status Badge */}
          <div className="resume-card-header">
            <div className="resume-status-badge">
              <span className="resume-status-dot" />
              <span className="resume-status-text">ATS-READY · UPDATED 2025</span>
            </div>
            <span className="resume-file-chip">PDF · 20 KB</span>
          </div>

          {/* Core Info Row */}
          <div className="resume-card-hero">
            <div className="resume-icon-box">
              <FaFilePdf size={22} />
            </div>
            <div className="resume-hero-text">
              <div className="resume-hero-title">Curriculum Vitae</div>
              <div className="resume-hero-sub">Parth Patel · Fullstack &amp; AI</div>
            </div>
          </div>

          {/* Interactive Dual-Action Buttons */}
          <div className="resume-buttons-row">
            {/* Action 1: Quick Preview */}
            <button
              className="resume-preview-btn"
              onClick={() => setModalOpen(true)}
              title="Preview CV directly without downloading"
              type="button"
            >
              <FaEye size={13} />
              <span>Preview</span>
            </button>

            {/* Action 2: Dynamic Animated Download */}
            <button
              className={`resume-download-trigger ${
                downloadState === "downloading"
                  ? "is-downloading"
                  : downloadState === "success"
                  ? "is-success"
                  : ""
              }`}
              onClick={handleDownload}
              title="Download official PDF to device"
              type="button"
            >
              {downloadState === "idle" && (
                <>
                  <FaDownload size={13} className="resume-dl-icon" />
                  <span>Download CV</span>
                  <span className="resume-btn-arrow">↓</span>
                </>
              )}

              {downloadState === "downloading" && (
                <>
                  <FaSpinner size={14} className="resume-spin-icon" />
                  <span>Preparing...</span>
                </>
              )}

              {downloadState === "success" && (
                <>
                  <FaCheck size={14} className="resume-check-icon" />
                  <span>Downloaded! 🎉</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>

      {/* In-App Resume Preview Modal */}
      <ResumeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pdfUrl={pdfUrl}
      />
    </>
  );
}
