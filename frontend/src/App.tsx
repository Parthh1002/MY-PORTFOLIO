import { useState, useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import "./index.css";
import "./App.css";
import "./components/styles/PremiumProfile.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaFilePdf, FaStar, FaCodeBranch } from "react-icons/fa";
import ParticleBackground from "./components/ParticleBackground";
import CinematicIntro from "./components/CinematicIntro";
import ProfileTilt from "./components/ProfileTilt";
import Navbar from "./components/Navbar";
import TechPopup, { TechPopupItem } from "./components/TechPopup";
import ThemeSwitcher from "./components/ThemeSwitcher";
import {
  SiReact, SiTypescript, SiJavascript, SiPython, SiNodedotjs, SiExpress,
  SiMongodb, SiFirebase, SiTailwindcss, SiNextdotjs, SiVite, SiGit,
  SiGithub, SiFigma, SiVercel, SiDocker, SiMysql, SiSupabase, SiFastapi,
  SiPytorch, SiOpencv, SiHtml5, SiCss, SiLinux, SiFramer,
  SiVscodium, SiCplusplus, SiPostman, SiTensorflow, SiKubernetes, SiGsap, SiNumpy,
} from "react-icons/si";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type TechItem = { name: string; icon: ReactNode; color: string; desc: string; };
type StackRow  = { label: string; items: TechItem[]; };

// ─── DATA ────────────────────────────────────────────────────────────────────
const allProjects = [
  {
    name: "Aapno Rasto",
    year: "2025", category: "Fullstack Web App", org: "Personal Project",
    detail: "A smart civic complaint tracking platform that lets citizens report and track local infrastructure issues in real-time with interactive maps, Firebase auth, and Supabase storage.",
    live: "https://aapno-rasto.vercel.app/", github: "https://github.com/Parthh1002/Aapno-Rasto",
    badge: "LIVE", stack: ["React.js","TypeScript","Vite","Firebase","Supabase","Tailwind CSS"],
  },
  {
    name: "The Saviourr",
    year: "2025", category: "AI / Fullstack", org: "Hackathon Project",
    detail: "An AI-powered safety platform using YOLOv8 & OpenCV for real-time threat detection. Next.js frontend with FastAPI backend and PyTorch inference engine.",
    live: "https://the-saviourr.vercel.app/", github: "https://github.com/Parthh1002/The-Saviour-Final",
    badge: "HACKATHON", stack: ["Next.js","React","Firebase","FastAPI","YOLOv8","PyTorch"],
  },
  {
    name: "Safaai Sarathi 2.0",
    year: "2024", category: "IoT / Web", org: "Hackathon Project",
    detail: "Smart waste management platform with IoT-enabled dustbins that track fill levels in real-time, optimising garbage collection routes and reducing urban waste overflow.",
    live: "https://safaai-sarathi.vercel.app/", github: "https://github.com/Parthh1002/SafaaiSarathi2.0",
    badge: "HACKATHON", stack: ["React","Node.js","IoT","Firebase"],
  },
  {
    name: "Mr & Mrs Optical",
    year: "2025", category: "E-Commerce", org: "Client Project",
    detail: "Modern e-commerce storefront for an optical shop — product catalog, cart, enquiry system and a fully responsive TypeScript UI.",
    live: "https://mr-mrs-optical.vercel.app/", github: "https://github.com/Parthh1002/Mr_Mrs_Optical",
    badge: null, stack: ["TypeScript","React","Tailwind CSS"],
  },
  {
    name: "Aura — The Beginning",
    year: "2024", category: "Creative / Web", org: "Personal Project",
    detail: "A visually immersive web experience showcasing premium interactive animations, GSAP scroll effects, and a dark-first aesthetic.",
    live: "https://aura-the-begining.vercel.app/", github: "https://github.com/Parthh1002/AuraTheBegining",
    badge: null, stack: ["React","GSAP","Framer Motion","CSS"],
  },
  {
    name: "Laxmi Tiles",
    year: "2024", category: "Business Website", org: "Client Project",
    detail: "Professional business website for a tiles manufacturer — sleek product gallery, inquiry forms and mobile-first responsive layout.",
    live: "https://laxmi-tiles.vercel.app/", github: "https://github.com/Parthh1002/Laxmi_Tiles",
    badge: null, stack: ["TypeScript","React","CSS"],
  },
];

const experience = [
  { role: "AI & Real-World Products", org: "Present", when: "2025 — Now", tag: "Current",
    detail: "Building production-ready full-stack solutions, AI-powered applications, and leading team projects in hackathons." },
  { role: "Full Stack Development", org: "MERN Stack", when: "Mid 2025", tag: null,
    detail: "MERN Stack Applications, Firebase Authentication & Realtime Database, REST API Integration & Vercel Deployment." },
  { role: "Frontend Development", org: "React & Tailwind", when: "Early 2025", tag: null,
    detail: "React.js & Tailwind CSS. Built responsive and interactive UI for personal projects and client sites." },
  { role: "Started Web Development", org: "Self-taught", when: "2024", tag: "Origin",
    detail: "Learned HTML, CSS & JavaScript from scratch. Built first static websites and discovered a passion for frontend craft." },
];

const education = [
  { deg: "B.Tech Computer Science Engineering", school: "LDRP Institute of Technology and Research", when: "2022 — 2026", note: "3rd Year · CGPA: 8.2+" },
  { deg: "Class 12th (Science — PCM)", school: "Gujarat State Board (GSEB)", when: "2020 — 2022", note: "Percentage: 78%" },
  { deg: "Class 10th", school: "Gujarat State Board (GSEB)", when: "2019 — 2020", note: "Percentage: 85%" },
];

const achievements = [
  {
    event: "Smart India Hackathon (SIH) 2026",
    result: "Finalist",
    resultType: "finalist" as const,
    org: "Internal Round · LDRP-ITR",
    detail: "Top 50 teams out of 130+ participating teams. Built a Waste Management & Municipal Corporation Citizen Interaction Dashboard.",
  },
  {
    event: "Smart India Hackathon (SIH) 2025",
    result: "Finalist",
    resultType: "finalist" as const,
    org: "Internal Round · LDRP-ITR",
    detail: "Top 50 teams out of 130+ participating teams. Built a Blockchain-based Document Verification Portal using OCR for document extraction and verification.",
  },
  {
    event: "Smart India Hackathon (SIH) 2024",
    result: "Finalist",
    resultType: "finalist" as const,
    org: "Internal Round · LDRP-ITR",
    detail: "Top 50 teams out of 130+ participating teams. Developed an AI/ML-based solution as part of a collaborative team.",
  },
  {
    event: "Impactathon @ KSV 2026",
    result: "Finalist",
    resultType: "finalist" as const,
    org: "KSV University",
    detail: 'Built \"Apno Rasto\", an AI/ML-based solution focused on solving a real-world civic infrastructure problem.',
  },
  {
    event: "Adobe Hackathon 2026",
    result: "Round 2",
    resultType: "round2" as const,
    org: "LDRP-ITR",
    detail: "Team selected for Round 2, developing an AI/ML-based creative solution powered by Adobe technologies.",
  },
  {
    event: "ISRO Hackathon 2025",
    result: "Participant",
    resultType: "participant" as const,
    org: "ISRO",
    detail: "Participated in a team-based AI/ML-focused technical initiative organized by the Indian Space Research Organisation.",
  },
  {
    event: "ISRO Hackathon 2024",
    result: "Participant",
    resultType: "participant" as const,
    org: "ISRO",
    detail: "Participated in a team-based AI/ML-focused technical initiative organized by the Indian Space Research Organisation.",
  },
  {
    event: "Odoo Hackathon × KSV",
    result: "Participant",
    resultType: "participant" as const,
    org: "KSV University",
    detail: 'Built \"Vendor Vision\", an AI/ML-based vendor analytics solution developed during the Odoo hackathon series.',
  },
  {
    event: "Odoo Hackathon × LDCE",
    result: "Participant",
    resultType: "participant" as const,
    org: "LDCE Ahmedabad",
    detail: "Built a smart Trip Planner powered by AI/ML recommendations for personalized travel itineraries.",
  },
  {
    event: "Odoo Hackathon × NMIT Mangalore",
    result: "Participant",
    resultType: "participant" as const,
    org: "NMIT Mangalore",
    detail: "Built an Employee Management System using AI/ML-based automation for HR workflows and analytics.",
  },
];

const stackRows: StackRow[] = [
  {
    label: "Languages",
    items: [
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", desc: "The language of the web. Enables dynamic, interactive experiences across client and server." },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", desc: "JavaScript with static typing. Catches errors early and improves code quality at scale." },
      { name: "Python",     icon: <SiPython />,     color: "#3776AB", desc: "Versatile language for AI/ML, scripting, and backend APIs. Clean syntax, huge ecosystem." },
      { name: "C++",        icon: <SiCplusplus />,  color: "#00599C", desc: "High-performance systems language. Used for competitive programming and performance-critical apps." },
      { name: "HTML5",      icon: <SiHtml5 />,      color: "#E34F26", desc: "The backbone of the web. Semantic markup for structure and accessibility." },
      { name: "CSS3",       icon: <SiCss />,        color: "#1572B6", desc: "Styles the web with animations, layouts, variables, and responsive design." },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React.js",      icon: <SiReact />,       color: "#61DAFB", desc: "Component-based UI library. Powers fast, interactive web apps with a virtual DOM." },
      { name: "Next.js",       icon: <SiNextdotjs />,   color: "#ffffff", desc: "Full-stack React framework with SSR, SSG, file-based routing and built-in API routes." },
      { name: "Vite",          icon: <SiVite />,        color: "#646CFF", desc: "Lightning-fast build tool and dev server. HMR in milliseconds for modern web projects." },
      { name: "Tailwind CSS",  icon: <SiTailwindcss />, color: "#06B6D4", desc: "Utility-first CSS framework for rapid, consistent, and highly customizable UI development." },
      { name: "Framer Motion", icon: <SiFramer />,      color: "#0055FF", desc: "Production-ready animation library for React. Powers smooth, physics-based interactions." },
      { name: "GSAP",          icon: <SiGsap />,        color: "#88CE02", desc: "Professional-grade animation engine for timeline-based, high-performance web animations." },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Node.js",  icon: <SiNodedotjs />, color: "#339933", desc: "JavaScript runtime for server-side development. Powers scalable, event-driven backend APIs." },
      { name: "Express",  icon: <SiExpress />,   color: "#888888", desc: "Minimal, unopinionated web framework for Node.js. Great for building REST APIs fast." },
      { name: "FastAPI",  icon: <SiFastapi />,   color: "#009688", desc: "Modern Python API framework. Auto-generates OpenAPI docs and is built for high performance." },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MongoDB",  icon: <SiMongodb />,  color: "#47A248", desc: "NoSQL document database. Flexible, JSON-like storage that scales with your application." },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFCA28", desc: "Google's BaaS with real-time DB, authentication, cloud functions and easy deployment." },
      { name: "Supabase", icon: <SiSupabase />, color: "#3ECF8E", desc: "Open-source Firebase alternative built on PostgreSQL with real-time and auth capabilities." },
      { name: "MySQL",    icon: <SiMysql />,    color: "#4479A1", desc: "Reliable relational database management system for structured, transactional data." },
    ],
  },
  {
    label: "AI / ML",
    items: [
      { name: "PyTorch",    icon: <SiPytorch />,    color: "#EE4C2C", desc: "Deep learning framework by Meta. The go-to choice for research and production ML models." },
      { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00", desc: "Google's end-to-end ML platform for training, evaluating, and deploying neural networks." },
      { name: "NumPy",      icon: <SiNumpy />,      color: "#4DABCF", desc: "Fundamental Python package for numerical computing, array operations, and linear algebra." },
      { name: "OpenCV",     icon: <SiOpencv />,     color: "#5C3EE8", desc: "Open-source computer vision library for image processing, object detection, and video analysis." },
      { name: "OpenAI API", icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"1em",height:"1em"}}><path d="M22.28 9.28a5.76 5.76 0 0 0-.49-4.73 5.82 5.82 0 0 0-6.27-2.79A5.76 5.76 0 0 0 11.18 0a5.82 5.82 0 0 0-5.55 4.03 5.76 5.76 0 0 0-3.84 2.79 5.82 5.82 0 0 0 .71 6.82 5.76 5.76 0 0 0 .49 4.73 5.82 5.82 0 0 0 6.27 2.79A5.76 5.76 0 0 0 12.82 24a5.82 5.82 0 0 0 5.55-4.04 5.76 5.76 0 0 0 3.84-2.79 5.82 5.82 0 0 0-.72-6.89z"/></svg>, color: "#412991", desc: "Access GPT-4, DALL-E and Whisper APIs for AI-powered text generation, vision and code." },
      { name: "Claude / Anthropic", icon: <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"1em",height:"1em"}}><path d="M13.827 3.52h3.603L24 20.48h-3.603l-6.57-16.96zM6.232 3.52H9.77L16.5 20.48h-3.634l-6.634-16.96z"/></svg>, color: "#D97706", desc: "Constitutional AI by Anthropic. Exceptional at reasoning, safety, and long-context tasks." },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Vercel",      icon: <SiVercel />,      color: "#ffffff", desc: "Zero-config deployment platform for frontend frameworks. Instant global CDN. Powers this site!" },
      { name: "AWS",         icon: <span style={{fontFamily:"monospace",fontSize:"13px",fontWeight:700}}>AWS</span>, color: "#FF9900", desc: "Amazon Web Services — industry-leading cloud with 200+ services for computing, storage, and AI." },
      { name: "Docker",      icon: <SiDocker />,      color: "#2496ED", desc: "Containerization platform for packaging apps with all dependencies into portable containers." },
      { name: "Linux",       icon: <SiLinux />,       color: "#FCC624", desc: "Open-source OS powering the majority of the world's servers and cloud infrastructure." },
      { name: "Kubernetes",  icon: <SiKubernetes />,  color: "#326CE5", desc: "Container orchestration system for automating deployment, scaling, and management of apps." },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git",     icon: <SiGit />,     color: "#F05032", desc: "Distributed version control. Track every change, branch freely, and collaborate on code." },
      { name: "GitHub",  icon: <SiGithub />,  color: "#ffffff", desc: "Platform for hosting Git repositories with CI/CD, Actions, and collaborative code review." },
      { name: "Figma",   icon: <SiFigma />,   color: "#F24E1E", desc: "Browser-based design tool for UI/UX prototyping, design systems, and team collaboration." },
      { name: "VS Code", icon: <SiVscodium />,color: "#007ACC", desc: "Lightweight yet powerful code editor by Microsoft with a rich extension marketplace." },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37", desc: "API development and testing platform. Design, test, and document REST and GraphQL APIs." },
      { name: "Tableau", icon: <span style={{fontFamily:"monospace",fontSize:"11px",fontWeight:700}}>TAB</span>, color: "#E97627", desc: "Industry-leading data visualization tool for building interactive dashboards and analytics." },
    ],
  },
];

// ─── GITHUB REPO STATS ──────────────────────────────────────────────────────
type RepoStats = { stars: number; forks: number };

// Map project name → GitHub owner/repo path
const GITHUB_REPOS: Record<string, string> = {
  "Aapno Rasto":       "Parthh1002/Aapno-Rasto",
  "The Saviourr":      "Parthh1002/The-Saviour-Final",
  "Safaai Sarathi 2.0":"Parthh1002/SafaaiSarathi2.0",
  "Mr & Mrs Optical":  "Parthh1002/Mr_Mrs_Optical",
  "Aura — The Beginning": "Parthh1002/AuraTheBegining",
  "Laxmi Tiles":       "Parthh1002/Laxmi_Tiles",
};
function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      setTimeout(() => el.classList.add("fade-visible"), delay);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => el.classList.add("fade-visible"), delay); obs.unobserve(el); } },
      { threshold: 0.02 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

// ─── FADE-IN HOOK ────────────────────────────────────────────────────────────
const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.15 } } } as any;
const slideUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 18 } } } as any;

// ─── FRAMER VARIANTS ─────────────────────────────────────────────────────────
export default function App() {
  const [showAll, setShowAll]         = useState(false);
  const [theme, setTheme]             = useState<"dark"|"aurora"|"light">("dark");
  const [introComplete, setIntroComplete] = useState(false);
  const [hoveredTech, setHoveredTech] = useState<TechPopupItem | null>(null);
  const [popupPos, setPopupPos]       = useState<{x:number;y:number}|null>(null);
  const [isMobile, setIsMobile]       = useState(window.innerWidth < 768);
  const [repoStats, setRepoStats]     = useState<Record<string, RepoStats>>({});

  const visible = showAll ? allProjects : allProjects.slice(0, 4);

  // Always show intro on every page load
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── GitHub live stats ──────────────────────────────────
  useEffect(() => {
    const cacheKey = "gh_repo_stats";
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) { setRepoStats(JSON.parse(cached)); return; }

    (async () => {
      const stats: Record<string, RepoStats> = {};
      await Promise.all(
        Object.entries(GITHUB_REPOS).map(async ([name, path]) => {
          try {
            const res = await fetch(`https://api.github.com/repos/${path}`, {
              headers: { Accept: "application/vnd.github+json" },
            });
            if (!res.ok) return;
            const data = await res.json();
            stats[name] = { stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 };
          } catch {/* silent */}
        })
      );
      setRepoStats(stats);
      sessionStorage.setItem(cacheKey, JSON.stringify(stats));
    })();
  }, []);

  // Force fade-sections visible after intro
  useEffect(() => {
    if (!introComplete) return;
    const t = setTimeout(() => {
      document.querySelectorAll(".fade-section").forEach(el => el.classList.add("fade-visible"));
    }, 600);
    return () => clearTimeout(t);
  }, [introComplete]);

  const handleIntroComplete = () => setIntroComplete(true);

  // Tech tile handlers
  const handleTechEnter = (e: React.MouseEvent, item: TechItem, category: string) => {
    if (isMobile) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoveredTech({ ...item, category });
    setPopupPos({ x: rect.left + rect.width / 2, y: rect.top });
  };
  const handleTechLeave = () => { if (!isMobile) { setHoveredTech(null); setPopupPos(null); } };
  const handleTechClick = (item: TechItem, category: string) => {
    if (!isMobile) return;
    setHoveredTech({ ...item, category });
  };
  const closePopup = () => { setHoveredTech(null); setPopupPos(null); };

  const projRef  = useFadeIn(200);
  const xpRef    = useFadeIn(200);
  const eduRef   = useFadeIn(200);
  const stackRef = useFadeIn(200);
  const achRef   = useFadeIn(200);

  return (
    <div className="portfolio-wrap" data-theme={theme}>
      <ParticleBackground />

      {/* Cinematic Intro — shows on every page load */}
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} />}

      {/* Tech popup (both desktop tooltip + mobile modal) */}
      <TechPopup tech={hoveredTech} pos={popupPos} isMobile={isMobile} onClose={closePopup} />

      {introComplete && (
        <>
          {/* Navbar */}
          <Navbar visible={introComplete} />

          {/* New premium ThemeSwitcher */}
          <ThemeSwitcher theme={theme} setTheme={setTheme} />

          <div className="page">
            {/* ─── LEFT SIDEBAR ─────────────────────── */}
            <aside className="aside">
              <motion.div className="aside-inner" variants={stagger} initial="hidden" animate="show">
                <motion.div variants={slideUp} className="profile-pic-wrap">
                  <ProfileTilt src="/profile.jpeg" />
                </motion.div>

                <motion.h1 variants={slideUp} className="name">Parth Patel</motion.h1>
                <motion.p variants={slideUp} className="role">Creative Developer &amp; Designer</motion.p>
                <motion.p variants={slideUp} className="blurb">
                  3rd Year B.Tech CSE student and passionate Fullstack Developer.
                  I love building dynamic, responsive, and premium web applications.
                  Always eager to explore Generative AI, Web3, and real-world product development.
                </motion.p>

                {/* Stats */}
                <motion.div variants={slideUp} className="stats">
                  <div className="stat"><div className="stat-n">37+</div><div className="stat-k">Stars ⭐</div></div>
                  <div className="stat"><div className="stat-n">12+</div><div className="stat-k">Hackathons</div></div>
                  <div className="stat"><div className="stat-n">14+</div><div className="stat-k">Projects</div></div>
                </motion.div>

                {/* Contact */}
                <motion.ul variants={slideUp} className="meta-list">
                  <li className="meta-item">
                    <span className="meta-icon"><FaMapMarkerAlt /></span>
                    <span className="meta-val dim">Ahmedabad, India</span>
                  </li>
                  <li className="meta-item">
                    <a href="mailto:parthpatel@example.com" className="meta-link">
                      <span className="meta-icon"><FaEnvelope /></span>
                      <span className="meta-val">Email</span>
                    </a>
                  </li>
                  <li className="meta-item">
                    <a href="https://github.com/Parthh1002" target="_blank" rel="noreferrer" className="meta-link">
                      <span className="meta-icon"><FaGithub /></span>
                        <span className="meta-val">GitHub</span>
                    </a>
                  </li>
                  <li className="meta-item">
                    <a href="https://www.linkedin.com/in/parth-patel-8bb36b252" target="_blank" rel="noreferrer" className="meta-link">
                      <span className="meta-icon"><FaLinkedin /></span>
                        <span className="meta-val">LinkedIn</span>
                    </a>
                  </li>
                </motion.ul>

                {/* CV Download Button */}
                <motion.div variants={slideUp} className="cv-btn-wrap" style={{ marginTop: "20px", marginBottom: "8px" }}>
                  <a
                    href="/resume/Parth_Patel_CV.pdf"
                    download="Parth_Patel_CV.pdf"
                    className="cv-btn"
                  >
                    <FaFilePdf className="cv-btn-icon" />
                    <span>Download CV</span>
                    <span className="cv-btn-arrow">↓</span>
                  </a>
                </motion.div>

                <motion.p variants={slideUp} className="foot dim">Parth Patel · 2025</motion.p>
              </motion.div>
            </aside>

            {/* ─── MAIN CONTENT ─────────────────────── */}
            <motion.main className="main"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            >
              {/* 01 — PROJECTS */}
              <section id="projects">
                <header className="sec-h">
                  <div className="sec-n">01</div>
                  <h2 className="sec-l">Projects</h2>
                </header>
                <div ref={projRef} className="fade-section">
                  <ul className="proj-list">
                    {visible.map((proj, i) => {
                      const stats = repoStats[proj.name];
                      return (
                      <li className="proj glass-card" key={proj.name} style={{ animationDelay: `${i*55}ms` }}>
                        <div className="proj-meta">
                          <span className="proj-year">{proj.year}</span>
                          {proj.badge && <span className="proj-badge">{proj.badge}</span>}
                          {stats && (
                            <span className="proj-gh-stats">
                              <FaStar size={10} /> {stats.stars}
                              <FaCodeBranch size={10} style={{marginLeft:6}} /> {stats.forks}
                            </span>
                          )}
                        </div>
                        <div className="proj-body">
                          <h3 className="proj-title">{proj.name}</h3>
                          <p className="proj-org">{proj.org} · {proj.category}</p>
                          <p className="proj-detail">{proj.detail}</p>
                          <div className="proj-stack">
                            {proj.stack.map(t => <span key={t} className="chip">{t}</span>)}
                          </div>
                          <div className="proj-actions">
                            <a href={proj.github} target="_blank" rel="noreferrer" className="ghost-btn">
                              <FaGithub size={12} /> GitHub <span className="ghost-btn-arrow">↗</span>
                            </a>
                            <a href={proj.live} target="_blank" rel="noreferrer" className="ghost-btn">
                              <FaExternalLinkAlt size={12} /> Live <span className="ghost-btn-arrow">↗</span>
                            </a>
                          </div>
                        </div>
                      </li>
                      );
                    })}
                  </ul>
                  {allProjects.length > 4 && (
                    <button className="more-btn" onClick={() => setShowAll(s => !s)}>
                      <span>{showAll ? "COLLAPSE" : `SHOW ${allProjects.length - 4} MORE PROJECTS`}</span>
                      <span className="more-arrow" data-open={showAll ? "on" : "off"}>↓</span>
                    </button>
                  )}
                </div>
              </section>

              {/* 02 — EXPERIENCE */}
              <section id="experience">
                <header className="sec-h">
                  <div className="sec-n">02</div>
                  <h2 className="sec-l">Experience &amp; Journey</h2>
                </header>
                <div ref={xpRef} className="fade-section">
                  <ul className="xp-list">
                    {experience.map(xp => (
                      <li className="xp" key={xp.role}>
                        <div className="xp-when">
                          <span>{xp.when}</span>
                          {xp.tag && <span className="xp-tag">{xp.tag}</span>}
                        </div>
                        <div className="xp-body">
                          <h3 className="xp-role">{xp.role}</h3>
                          <span className="xp-org">{xp.org}</span>
                          <p className="xp-detail">{xp.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 03 — EDUCATION */}
              <section id="education">
                <header className="sec-h">
                  <div className="sec-n">03</div>
                  <h2 className="sec-l">Education</h2>
                </header>
                <div ref={eduRef} className="fade-section">
                  <ul className="edu-list">
                    {education.map(edu => (
                      <li className="edu" key={edu.deg}>
                        <div className="edu-when">{edu.when}</div>
                        <div>
                          <div className="edu-deg">{edu.deg}</div>
                          <div className="edu-school">{edu.school}</div>
                          <div className="edu-note">{edu.note}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* 04 — STACK */}
              <section id="stack">
                <header className="sec-h">
                  <div className="sec-n">04</div>
                  <h2 className="sec-l">Stack</h2>
                </header>
                <div ref={stackRef} className="fade-section skills">
                  {stackRows.map(row => (
                    <div className="skill-row" key={row.label}>
                      <p className="skill-k">{row.label}</p>
                      <div className="tech-icon-grid">
                        {row.items.map(item => (
                          <div
                            key={item.name}
                            className="tech-tile"
                            title={item.name}
                            onMouseEnter={e => handleTechEnter(e, item, row.label)}
                            onMouseLeave={handleTechLeave}
                            onClick={() => handleTechClick(item, row.label)}
                          >
                            <span className="tech-tile-icon" style={{ color: item.color }}>
                              {item.icon}
                            </span>
                            <span className="tech-tile-name">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 05 — ACHIEVEMENTS */}
              <section id="achievements">
                <header className="sec-h">
                  <div className="sec-n">05</div>
                  <h2 className="sec-l">Competitive Experience</h2>
                </header>
                <div ref={achRef} className="fade-section">
                  <ul className="ach-list-cards">
                    {achievements.map((ach, i) => (
                      <li
                        key={ach.event}
                        className="ach-card glass-card"
                        style={{ animationDelay: `${i * 45}ms` }}
                      >
                        <div className="ach-card-top">
                          <span className={`ach-badge ach-badge--${ach.resultType}`}>
                            {ach.result}
                          </span>
                          <span className="ach-org">{ach.org}</span>
                        </div>
                        <h3 className="ach-event">{ach.event}</h3>
                        <p className="ach-detail">{ach.detail}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* FOOTER */}
              <footer className="site-footer">
                <div className="footer-inner">
                  <p className="meta">© {new Date().getFullYear()} Parth Patel · Built with React + Vite</p>
                  <div className="footer-links">
                    <a href="https://github.com/Parthh1002" target="_blank" rel="noreferrer" className="meta-link"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/parth-patel-8bb36b252" target="_blank" rel="noreferrer" className="meta-link"><FaLinkedin /></a>
                  </div>
                </div>
              </footer>
            </motion.main>
          </div>
        </>
      )}
    </div>
  );
}
