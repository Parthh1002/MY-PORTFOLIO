import { motion } from "framer-motion";
import { FaCode, FaBriefcase, FaGraduationCap, FaLayerGroup, FaUser } from "react-icons/fa";

const navLinks = [
  { id: "projects",   label: "Projects",  icon: <FaCode /> },
  { id: "experience", label: "Journey",   icon: <FaBriefcase /> },
  { id: "education",  label: "Education", icon: <FaGraduationCap /> },
  { id: "stack",      label: "Stack",     icon: <FaLayerGroup /> },
];

interface NavbarProps { visible: boolean; }

export default function Navbar({ visible }: NavbarProps) {
  if (!visible) return null;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── Desktop: floating pill at top ─────────────── */}
      <motion.nav
        className="navbar-desktop"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="navbar-pill">
          <div className="navbar-logo">
            <FaUser size={12} />
            <span>PP</span>
          </div>
          <div className="navbar-divider" />
          <div className="navbar-links">
            {navLinks.map(link => (
              <button
                key={link.id}
                className="nav-btn"
                onClick={() => scrollTo(link.id)}
              >
                <span className="nav-btn-icon">{link.icon}</span>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile: docked bottom bar ─────────────────── */}
      <motion.nav
        className="navbar-mobile"
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {navLinks.map(link => (
          <button
            key={link.id}
            className="nav-mobile-item"
            onClick={() => scrollTo(link.id)}
          >
            <span className="nav-mobile-icon">{link.icon}</span>
            <span className="nav-mobile-label">{link.label}</span>
          </button>
        ))}
      </motion.nav>
    </>
  );
}
