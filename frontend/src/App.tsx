import { useState, useEffect, useCallback } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import "./index.css";
import "./App.css";
import "./components/styles/PremiumProfile.css";

// Components
import ParticleBackground from "./components/ParticleBackground";
import CinematicIntro from "./components/CinematicIntro";
import Navbar from "./components/Navbar";
import ThemeSwitcher, { ThemeMode } from "./components/ThemeSwitcher";
import Sidebar from "./components/Sidebar";
import ProjectDetailModal, { ProjectItem } from "./components/ProjectDetailModal";
import Footer from "./components/Footer";

// Section Components (High Cohesion, Modular)
import ProjectsSection from "./components/sections/ProjectsSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import EducationSection from "./components/sections/EducationSection";
import StackSection from "./components/sections/StackSection";
import AchievementsSection from "./components/sections/AchievementsSection";

// Custom Hooks
import { useGitHubRepoStats } from "./hooks/useGitHubRepoStats";

// Framer Motion Animation Variants
const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

/**
 * Root Application Component.
 * Follows clean software engineering principles:
 * - High Cohesion: Orchestrates layout and global state without tight coupling.
 * - Low Coupling: Delegates domain data, data fetching, and section rendering to specialized modules.
 * - Low-End Hardware Optimized: Offloads offscreen renders and memoizes subcomponents.
 */
export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("portfolio_theme") as ThemeMode;
    return saved === "light" || saved === "dark" ? saved : "dark";
  });

  const [introComplete, setIntroComplete] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Custom hook for GitHub repository metrics with sessionStorage caching
  const { repoStats } = useGitHubRepoStats();

  // Hardware-accelerated scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  // Sync theme attribute to HTML and Body for CSS tokens
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  const handleSelectProject = useCallback((project: ProjectItem) => {
    setSelectedProject(project);
  }, []);

  const handleCloseProject = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const [themeOpen, setThemeOpen] = useState<boolean>(false);

  return (
    <div className="portfolio-wrap" data-theme={theme}>
      {/* Optimized Canvas particle starfield */}
      <ParticleBackground theme={theme} />

      {/* Cinematic entrance animation */}
      {!introComplete && (
        <CinematicIntro onComplete={handleIntroComplete} theme={theme} />
      )}

      {introComplete && (
        <>
          {/* Top smooth spring scroll progress bar */}
          <motion.div className="scroll-progress-bar" style={{ scaleX }} />

          {/* Navigation Bar */}
          <Navbar
            visible={introComplete}
            onOpenTheme={() => setThemeOpen((o) => !o)}
          />

          {/* Real-time Theme Mode Customizer */}
          <ThemeSwitcher
            theme={theme}
            setTheme={setTheme}
            isOpen={themeOpen}
            setIsOpen={setThemeOpen}
          />

          <div className="page">
            {/* Left Sidebar Profile & Bio */}
            <Sidebar stagger={stagger} slideUp={slideUp} />

            {/* Main Sections */}
            <motion.main
              className="main"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              {/* 01 — Projects */}
              <ProjectsSection
                repoStats={repoStats}
                onSelectProject={handleSelectProject}
              />

              {/* 02 — Experience */}
              <ExperienceSection />

              {/* 03 — Education */}
              <EducationSection />

              {/* 04 — Tech Stack */}
              <StackSection />

              {/* 05 — Achievements & Hackathons */}
              <AchievementsSection />

              {/* Site Footer */}
              <Footer />
            </motion.main>
          </div>
        </>
      )}

      {/* Full-Screen Project Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProject}
      />
    </div>
  );
}
