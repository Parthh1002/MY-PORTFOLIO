import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaDownload, FaExternalLinkAlt, FaFilePdf, FaEnvelope } from "react-icons/fa";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function ResumeModal({ isOpen, onClose, pdfUrl }: ResumeModalProps) {
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            className="resume-modal-card"
            initial={{ scale: 0.9, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="resume-modal-header">
              <div className="resume-modal-title-group">
                <div className="resume-pdf-badge">
                  <FaFilePdf size={16} />
                </div>
                <div>
                  <h3 className="resume-modal-title">Parth Patel — Resume</h3>
                  <p className="resume-modal-subtitle">
                    Full-Stack Developer &amp; AI Enthusiast · Updated 2025
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="resume-modal-actions">
                <a
                  href={pdfUrl}
                  download="Parth_Patel_CV.pdf"
                  className="resume-modal-btn resume-modal-download-btn"
                  title="Download PDF to device"
                >
                  <FaDownload size={12} />
                  <span>Download</span>
                </a>

                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="resume-modal-btn"
                  title="Open PDF in new tab"
                >
                  <FaExternalLinkAlt size={12} />
                  <span className="desktop-only">Full Tab</span>
                </a>

                <button
                  className="resume-modal-close-btn"
                  onClick={onClose}
                  aria-label="Close Preview"
                >
                  <FaTimes size={15} />
                </button>
              </div>
            </div>

            {/* Modal Body / PDF Frame */}
            <div className="resume-modal-body">
              <object
                data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                type="application/pdf"
                className="resume-modal-pdf-frame"
              >
                <div className="resume-fallback">
                  <FaFilePdf size={48} color="var(--accent-primary)" />
                  <h4>Parth Patel — Curriculum Vitae</h4>
                  <p>Your browser doesn't support inline PDF preview.</p>
                  <a
                    href={pdfUrl}
                    download="Parth_Patel_CV.pdf"
                    className="resume-modal-download-btn"
                    style={{ marginTop: "12px", display: "inline-flex" }}
                  >
                    <FaDownload size={13} />
                    <span>Download CV (PDF)</span>
                  </a>
                </div>
              </object>
            </div>

            {/* Quick Contact Footer */}
            <div className="resume-modal-footer">
              <div className="resume-footer-info">
                <span>📍 Ahmedabad, India</span>
                <span>•</span>
                <span>📧 parthh1002@gmail.com</span>
              </div>
              <a
                href="mailto:parthh1002@gmail.com"
                className="resume-quick-hire-btn"
              >
                <FaEnvelope size={12} />
                <span>Hire / Contact Parth</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
