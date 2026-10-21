import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaFolderOpen,
  FaBriefcase,
  FaGraduationCap,
  FaLayerGroup,
  FaTrophy,
  FaFilePdf,
} from "react-icons/fa";
import ResumeModal from "./ResumeModal";
import ContactModal from "./ContactModal";

interface NavProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavProps) {
  const [activeSection, setActiveSection] = useState<string>("projects");
  const [resumeOpen, setResumeOpen]       = useState<boolean>(false);
  const [contactOpen, setContactOpen]     = useState<boolean>(false);

  // Full labels for desktop; short labels for mobile tab bar
  const navLinks = [
    { id: "projects",     label: "Projects",    short: "Work",   icon: <FaFolderOpen size={14} /> },
    { id: "experience",   label: "Experience",  short: "XP",     icon: <FaBriefcase size={14} /> },
    { id: "education",    label: "Education",   short: "Edu",    icon: <FaGraduationCap size={14} /> },
    { id: "stack",        label: "Stack",       short: "Stack",  icon: <FaLayerGroup size={14} /> },
    { id: "achievements", label: "Achievements",short: "Wins",   icon: <FaTrophy size={14} /> },
  ];

  // Zero-cost off-thread IntersectionObserver for ScrollSpy
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      const intersecting = entries.filter((e) => e.isIntersecting);
      if (intersecting.length > 0) {
        intersecting.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        setActiveSection(intersecting[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-15% 0px -60% 0px",
      threshold: [0, 0.2, 0.5],
    });

    const elements = navLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const isDesktop = window.innerWidth > 1024;
      const navOffset = isDesktop ? 96 : 24;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          DESKTOP: Fixed floating pill at top with nav links
          MOBILE/TABLET: Fixed floating pill at bottom with tab bar
          ═══════════════════════════════════════════════════════ */}
      <motion.header
        className="navbar-wrapper"
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-pill">

          {/* ── LOGO (always visible — opens contact) ───────── */}
          <button
            className="navbar-logo"
            onClick={() => setContactOpen(true)}
            aria-label="Open contact and profile information"
            title="Parth Patel — Contact & Socials"
            type="button"
          >
            <div className="navbar-logo-badge">
              <FaUser size={10} />
            </div>
            <span className="navbar-logo-text">PP</span>
          </button>

          {/* ── DESKTOP: divider + full nav links + CV pill ─── */}
          <div className="navbar-divider desktop-only" />

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

          <button
            className="nav-cv-quick-btn desktop-only"
            onClick={() => setResumeOpen(true)}
            title="Preview & Download Resume"
            type="button"
          >
            <FaFilePdf size={11} />
            <span>CV</span>
          </button>

          {/* ── MOBILE/TABLET: full tab bar — all 5 sections ── */}
          <nav className="mobile-tab-bar mobile-only" aria-label="Mobile Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  className={`mobile-tab-btn${isActive ? " mobile-tab-active" : ""}`}
                  onClick={() => scrollTo(link.id)}
                  aria-current={isActive ? "page" : undefined}
                  type="button"
                  title={link.label}
                >
                  <span className="mobile-tab-icon">{link.icon}</span>
                  <span className="mobile-tab-label">{link.short}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileActivePill"
                      className="mobile-tab-indicator"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── MOBILE/TABLET: Quick CV button ── */}
          <button
            className="nav-cv-quick-btn mobile-only"
            onClick={() => setResumeOpen(true)}
            title="Preview & Download Resume"
            type="button"
            aria-label="Preview and Download CV"
          >
            <FaFilePdf size={11} />
            <span>CV</span>
          </button>

        </div>
      </motion.header>

      {/* In-App Resume Preview Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        pdfUrl="/resume/Parth_Patel_CV.pdf"
      />

      {/* Quick Contact & Profiles Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}

