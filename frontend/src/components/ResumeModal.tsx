import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaDownload,
  FaExternalLinkAlt,
  FaFilePdf,
  FaEnvelope,
  FaSearchPlus,
  FaSearchMinus,
  FaExpand,
  FaRedo,
  FaCheck,
  FaSpinner,
  FaEye,
  FaDesktop
} from "react-icons/fa";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  previewUrl?: string;
}

export default function ResumeModal({
  isOpen,
  onClose,
  pdfUrl = "/resume/Parth_Patel_CV.pdf",
  previewUrl = "/resume/resume_preview.webp",
}: ResumeModalProps) {
  // Zoom level for document view (1 = 100%)
  const [zoom, setZoom] = useState<number>(1);
  const [fitWidth, setFitWidth] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"document" | "native">("document");
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Detect screen size on open
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setFitWidth(true);
        setZoom(1);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset zoom and state when opening
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setFitWidth(true);
      setZoom(1);
      setViewMode("document");
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "+" || e.key === "=") {
        setZoom((z) => Math.min(z + 0.25, 2.5));
        setFitWidth(false);
      } else if (e.key === "-") {
        setZoom((z) => Math.max(z - 0.25, 0.6));
        setFitWidth(false);
      } else if (e.key === "0") {
        setZoom(1);
        setFitWidth(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Handle clean, reliable download across both PC and mobile browsers
  const handleDownload = useCallback(async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      // Fetch as blob for guaranteed download filename in modern browsers
      const response = await fetch(pdfUrl);
      if (!response.ok) throw new Error("Download request failed");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = "Parth_Patel_CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      // Fallback direct anchor click
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Parth_Patel_CV.pdf";
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } finally {
      setIsDownloading(false);
    }
  }, [pdfUrl, isDownloading]);

  // Zoom helpers
  const zoomIn = () => {
    setFitWidth(false);
    setZoom((z) => Math.min(Number((z + 0.25).toFixed(2)), 2.5));
  };

  const zoomOut = () => {
    setFitWidth(false);
    setZoom((z) => Math.max(Number((z - 0.25).toFixed(2)), 0.6));
  };

  const toggleFitWidth = () => {
    setFitWidth((prev) => !prev);
    setZoom(1);
  };

  const resetZoom = () => {
    setZoom(1);
    setFitWidth(true);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="resume-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="resume-modal-card"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Modal Header ── */}
            <div className="resume-modal-header">
              <div className="resume-modal-title-group">
                <div className="resume-pdf-badge" title="Official PDF Document">
                  <FaFilePdf size={18} />
                </div>
                <div className="resume-modal-titles">
                  <div className="resume-title-row">
                    <h3 className="resume-modal-title">Parth Patel — Resume</h3>
                    <span className="resume-file-tag">PDF • 56 KB</span>
                  </div>
                  <p className="resume-modal-subtitle">
                    Web Development &amp; DBMS Enthusiast · Gandhinagar, Gujarat
                  </p>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="resume-modal-actions">
                {/* Desktop View Switcher */}
                {!isMobile && (
                  <div className="resume-mode-switch">
                    <button
                      type="button"
                      className={`resume-mode-tab ${viewMode === "document" ? "active" : ""}`}
                      onClick={() => setViewMode("document")}
                      title="Optimized high-res document preview"
                    >
                      <FaEye size={11} />
                      <span>Preview</span>
                    </button>
                    <button
                      type="button"
                      className={`resume-mode-tab ${viewMode === "native" ? "active" : ""}`}
                      onClick={() => setViewMode("native")}
                      title="Native browser PDF reader"
                    >
                      <FaDesktop size={11} />
                      <span>PDF Viewer</span>
                    </button>
                  </div>
                )}

                {/* Primary Download Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`resume-modal-btn resume-modal-download-btn ${downloadSuccess ? "is-success" : ""}`}
                  title="Download Parth Patel CV as PDF"
                >
                  {isDownloading ? (
                    <>
                      <FaSpinner size={12} className="ra-spin" />
                      <span>Saving…</span>
                    </>
                  ) : downloadSuccess ? (
                    <>
                      <FaCheck size={12} />
                      <span>Downloaded!</span>
                    </>
                  ) : (
                    <>
                      <FaDownload size={12} />
                      <span className="btn-label">Download PDF</span>
                    </>
                  )}
                </button>

                {/* Open in Full Browser Tab */}
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-modal-btn desktop-only"
                  title="Open PDF directly in a new browser tab"
                >
                  <FaExternalLinkAlt size={11} />
                  <span>Full Tab</span>
                </a>

                {/* Close Button */}
                <button
                  className="resume-modal-close-btn"
                  onClick={onClose}
                  aria-label="Close Preview"
                  type="button"
                >
                  <FaTimes size={15} />
                </button>
              </div>
            </div>

            {/* ── Modal Body / Document Preview Area ── */}
            <div className="resume-modal-body" ref={bodyRef}>
              {viewMode === "native" && !isMobile ? (
                /* Native PDF Viewer on Desktop */
                <iframe
                  src={`${pdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
                  title="Parth Patel Resume PDF"
                  className="resume-modal-pdf-frame"
                />
              ) : (
                /* Universal High-Res Document Preview (Flawless on Mobile & PC) */
                <div className="resume-preview-scroll-container">
                  <div
                    className={`resume-sheet-wrap ${fitWidth ? "is-fit-width" : ""}`}
                    style={
                      !fitWidth
                        ? {
                            transform: `scale(${zoom})`,
                            transformOrigin: "top center",
                            transition: "transform 0.18s ease-out",
                          }
                        : undefined
                    }
                  >
                    <picture>
                      <source srcSet={previewUrl} type="image/webp" />
                      <source srcSet="/resume/resume_preview.png" type="image/png" />
                      <img
                        src={previewUrl}
                        alt="Parth Patel Resume - Web Development & DBMS Enthusiast"
                        className="resume-sheet-img"
                        loading="eager"
                        decoding="async"
                        onDoubleClick={toggleFitWidth}
                        title="Double-click to toggle fit / zoom"
                      />
                    </picture>
                  </div>

                  {/* Floating Zoom & Fit Controls (Works smoothly on both Mobile and PC) */}
                  <div className="resume-floating-controls" aria-label="Zoom controls">
                    <button
                      type="button"
                      className="resume-ctrl-btn"
                      onClick={zoomOut}
                      title="Zoom Out (-)"
                      disabled={zoom <= 0.6 && !fitWidth}
                    >
                      <FaSearchMinus size={13} />
                    </button>

                    <button
                      type="button"
                      className={`resume-ctrl-btn resume-ctrl-fit ${fitWidth ? "active" : ""}`}
                      onClick={toggleFitWidth}
                      title={fitWidth ? "Switch to 100% scale" : "Fit to width"}
                    >
                      <FaExpand size={12} />
                      <span className="resume-ctrl-pct">
                        {fitWidth ? "Fit" : `${Math.round(zoom * 100)}%`}
                      </span>
                    </button>

                    <button
                      type="button"
                      className="resume-ctrl-btn"
                      onClick={zoomIn}
                      title="Zoom In (+)"
                      disabled={zoom >= 2.5}
                    >
                      <FaSearchPlus size={13} />
                    </button>

                    <button
                      type="button"
                      className="resume-ctrl-btn resume-ctrl-reset"
                      onClick={resetZoom}
                      title="Reset view (100%)"
                    >
                      <FaRedo size={11} />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ── Mobile Sticky Bottom Action Bar (One-Tap Download for Phones) ── */}
            <div className="resume-mobile-bottom-bar">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className={`resume-mobile-download-btn ${downloadSuccess ? "is-success" : ""}`}
              >
                {isDownloading ? (
                  <>
                    <FaSpinner size={14} className="ra-spin" />
                    <span>Preparing PDF…</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <FaCheck size={14} />
                    <span>Saved to Downloads! 🎉</span>
                  </>
                ) : (
                  <>
                    <FaDownload size={14} />
                    <span>Download CV (PDF • 56 KB)</span>
                  </>
                )}
              </button>

              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="resume-mobile-tab-btn"
                title="Open PDF in new tab"
              >
                <FaExternalLinkAlt size={13} />
                <span>Open Tab</span>
              </a>
            </div>

            {/* ── Desktop Footer: Quick Contact ── */}
            <div className="resume-modal-footer desktop-only">
              <div className="resume-footer-info">
                <span>📍 Gandhinagar, Gujarat</span>
                <span className="resume-dot">•</span>
                <a href="tel:+918866077505" className="resume-info-link">
                  📞 +91 88660 77505
                </a>
                <span className="resume-dot">•</span>
                <a href="mailto:parthh1002@gmail.com" className="resume-info-link">
                  📧 parthh1002@gmail.com
                </a>
              </div>
              <a
                href="mailto:parthh1002@gmail.com"
                className="resume-quick-hire-btn"
                title="Send email to Parth Patel"
              >
                <FaEnvelope size={12} />
                <span>Contact Parth Directly</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
