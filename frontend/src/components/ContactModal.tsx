import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
  FaTimes,
  FaCopy,
  FaCheck,
} from "react-icons/fa";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ContactItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  color: string;
  copyValue: string;
};

const CONTACTS: ContactItem[] = [
  {
    id: "phone",
    icon: <FaPhone size={14} />,
    label: "Phone",
    value: "+91 88660 77505",
    href: "tel:+918866077505",
    color: "#10b981",
    copyValue: "+918866077505",
  },
  {
    id: "whatsapp",
    icon: <FaWhatsapp size={15} />,
    label: "WhatsApp",
    value: "+91 88660 77505",
    href: "https://wa.me/918866077505",
    color: "#25D366",
    copyValue: "+918866077505",
  },
  {
    id: "email",
    icon: <FaEnvelope size={14} />,
    label: "Gmail",
    value: "parthh1002@gmail.com",
    href: "mailto:parthh1002@gmail.com",
    color: "#ea4335",
    copyValue: "parthh1002@gmail.com",
  },
  {
    id: "github",
    icon: <FaGithub size={15} />,
    label: "GitHub",
    value: "github.com/Parthh1002",
    href: "https://github.com/Parthh1002",
    color: "#e2e8f0",
    copyValue: "https://github.com/Parthh1002",
  },
  {
    id: "linkedin",
    icon: <FaLinkedin size={15} />,
    label: "LinkedIn",
    value: "parth-patel-468772336",
    href: "https://www.linkedin.com/in/parth-patel-468772336",
    color: "#0a66c2",
    copyValue: "https://www.linkedin.com/in/parth-patel-468772336",
  },
];

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handlePointer = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("touchstart", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("touchstart", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  const handleCopy = (item: ContactItem) => {
    navigator.clipboard.writeText(item.copyValue).catch(() => {});
    setCopied(item.id);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Blurred backdrop */}
          <motion.div
            key="contact-backdrop"
            className="cm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          />

          {/* Card */}
          <motion.div
            key="contact-card-wrap"
            className="cm-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <motion.div
              ref={cardRef}
              className="cm-card"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: "spring", stiffness: 340, damping: 28, delay: 0.05 }}
            >
              {/* Close */}
              <button className="cm-close" onClick={onClose} aria-label="Close" type="button">
                <FaTimes size={13} />
              </button>

              {/* Avatar + header */}
              <div className="cm-header">
                <div className="cm-avatar">
                  <span className="cm-avatar-initials">PP</span>
                  <span className="cm-avatar-ring" />
                </div>
                <div className="cm-header-text">
                  <h2 className="cm-name">Parth Patel</h2>
                  <p className="cm-role">Creative Fullstack &amp; AI Developer</p>
                  <span className="cm-badge">
                    <span className="cm-badge-dot" />
                    Open to Opportunities
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div className="cm-divider" />

              {/* Contact list */}
              <ul className="cm-list">
                {CONTACTS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    className="cm-item"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={item.href}
                      target={item.id === "phone" || item.id === "email" ? "_self" : "_blank"}
                      rel="noreferrer"
                      className="cm-item-link"
                    >
                      <span className="cm-item-icon" style={{ color: item.color }}>
                        {item.icon}
                      </span>
                      <span className="cm-item-body">
                        <span className="cm-item-label">{item.label}</span>
                        <span className="cm-item-value">{item.value}</span>
                      </span>
                    </a>
                    <button
                      className={`cm-copy-btn ${copied === item.id ? "cm-copy-done" : ""}`}
                      onClick={() => handleCopy(item)}
                      title="Copy"
                      type="button"
                      aria-label={`Copy ${item.label}`}
                    >
                      {copied === item.id ? <FaCheck size={11} /> : <FaCopy size={11} />}
                    </button>
                  </motion.li>
                ))}
              </ul>

              {/* Footer */}
              <div className="cm-footer">
                <span>Ahmedabad, India 🇮🇳</span>
                <span className="cm-footer-sep">·</span>
                <span>3rd Year B.Tech CSE</span>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
