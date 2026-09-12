import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaLayerGroup,
  FaTrophy,
  FaFilePdf,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import ResumeModal from "./ResumeModal";

interface NavProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavProps) {
  const [activeSection, setActiveSection] = useState<string>("projects");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);

  const navLinks = [
    { id: "projects",    label: "Projects",     icon: <FaBriefcase size={11} /> },
    { id: "experience",  label: "Experience",   icon: <FaUser size={11} /> },
    { id: "education",   label: "Education",    icon: <FaGraduationCap size={11} /> },
    { id: "stack",       label: "Stack",        icon: <FaLayerGroup size={11} /> },
    { id: "achievements",label: "Achievements", icon: <FaTrophy size={11} /> },
  ];

  // ScrollSpy to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 76;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Fixed Floating Top Header Bar ─────────────────────── */}
      <motion.header
        className="navbar-wrapper"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-pill">
          {/* Logo Badge */}
          <button
            className="navbar-logo"
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            type="button"
          >
            <div className="navbar-logo-badge">
              <FaUser size={10} />
            </div>
            <span className="navbar-logo-text">PP</span>
          </button>

          <div className="navbar-divider desktop-only" />

          {/* Desktop Nav Links */}
          <nav className="navbar-links desktop-only" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  className={`nav-btn ${isActive ? "nav-btn-active" : ""}`}
                  onClick={() => scrollTo(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  type="button"
                >
                  <span className="nav-btn-icon">{link.icon}</span>
                  <span className="nav-btn-label">{link.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="nav-active-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="navbar-divider desktop-only" />

          {/* Desktop CV Action Pill */}
          <button
            className="nav-cv-quick-btn desktop-only"
            onClick={() => setResumeOpen(true)}
            title="Preview &amp; Download Resume"
            type="button"
          >
            <FaFilePdf size={11} />
            <span>CV</span>
            <span className="nav-cv-quick-dot" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className={`navbar-hamburger mobile-only ${mobileMenuOpen ? "is-active" : ""}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <span className="hamburger-box">
              <span className="hamburger-line line-1" />
              <span className="hamburger-line line-2" />
              <span className="hamburger-line line-3" />
            </span>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Drawer ───────────────────────────────── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              key="mobile-nav-backdrop"
              className="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              key="mobile-nav-menu"
              className="mobile-nav-card"
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mobile-nav-header">
                <div className="mobile-nav-user">
                  <div className="navbar-logo-badge">
                    <FaUser size={11} />
                  </div>
                  <div>
                    <div className="mobile-nav-name">Parth Patel</div>
                    <div className="mobile-nav-sub">Creative Fullstack &amp; AI Developer</div>
                  </div>
                </div>
              </div>

              <div className="mobile-nav-list">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.03 * idx, duration: 0.2 }}
                      className={`mobile-nav-btn ${isActive ? "mobile-nav-btn-active" : ""}`}
                      onClick={() => scrollTo(link.id)}
                      type="button"
                    >
                      <span className="mobile-nav-icon">{link.icon}</span>
                      <span className="mobile-nav-label">{link.label}</span>
                      <span className="mobile-nav-arrow">→</span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="mobile-nav-footer">
                <button
                  className="mobile-nav-cv-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeOpen(true);
                  }}
                  type="button"
                >
                  <FaFilePdf size={15} />
                  <span>Preview &amp; Download Resume</span>
                </button>

                <div className="mobile-nav-socials">
                  <a
                    href="https://github.com/Parthh1002"
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-social-icon"
                    aria-label="GitHub Profile"
                  >
                    <FaGithub size={16} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/parth-patel-468772336"
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-social-icon"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedin size={16} />
                  </a>
                  <a
                    href="mailto:parthh1002@gmail.com"
                    className="mobile-social-icon"
                    aria-label="Email Parth"
                  >
                    <FaEnvelope size={15} />
                  </a>
                  <a
                    href="https://wa.me/918866077505"
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-social-icon"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* In-App Resume Preview Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        pdfUrl="/resume/Parth_Patel_CV.pdf"
      />
    </>
  );
}
