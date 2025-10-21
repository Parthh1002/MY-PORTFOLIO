import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload, FaCheck, FaSpinner, FaEye } from "react-icons/fa";
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
  const [dlState, setDlState] = useState<"idle" | "loading" | "done">("idle");

  const handleDownload = () => {
    if (dlState !== "idle") return;
    setDlState("loading");
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = "Parth_Patel_CV.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setDlState("done");
      setTimeout(() => setDlState("idle"), 3000);
    }, 600);
  };

  return (
    <>
      <div className={`ra-wrap ${className}`}>

        {/* Preview Button — ghost/outline */}
        <motion.button
          className="ra-preview"
          onClick={() => setModalOpen(true)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          type="button"
          title="Open CV preview"
        >
          <FaEye size={13} />
          <span>Preview</span>
        </motion.button>

        {/* Download Button — filled with shimmer */}
        <motion.button
          className={`ra-download${dlState === "done" ? " ra-done" : ""}`}
          onClick={handleDownload}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          type="button"
          disabled={dlState === "loading"}
          title="Download CV as PDF"
        >
          {/* Shimmer layer */}
          <span className="ra-shimmer" aria-hidden />

          <AnimatePresence mode="wait" initial={false}>
            {dlState === "idle" && (
              <motion.span
                key="idle"
                className="ra-btn-content"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <FaDownload size={12} />
                <span>Download CV</span>
              </motion.span>
            )}
            {dlState === "loading" && (
              <motion.span
                key="loading"
                className="ra-btn-content"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <FaSpinner size={12} className="ra-spin" />
                <span>Preparing…</span>
              </motion.span>
            )}
            {dlState === "done" && (
              <motion.span
                key="done"
                className="ra-btn-content"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <FaCheck size={12} />
                <span>Saved! 🎉</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <ResumeModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        pdfUrl={pdfUrl}
      />
    </>
  );
}
