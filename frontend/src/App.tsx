import { useState, useEffect, useRef, ReactNode } from "react";
import { motion } from "framer-motion";
import "./index.css";
import "./App.css";
import "./components/styles/PremiumProfile.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaExternalLinkAlt, FaStar, FaCodeBranch, FaYoutube, FaWhatsapp, FaExpandAlt, FaAws } from "react-icons/fa";
import { IoLogoTableau } from "react-icons/io5";
import { RiOpenaiFill, RiClaudeFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import ParticleBackground from "./components/ParticleBackground";
import CinematicIntro from "./components/CinematicIntro";
import ProfileTilt from "./components/ProfileTilt";
import Navbar from "./components/Navbar";
import ThemeSwitcher, { ThemeMode } from "./components/ThemeSwitcher";
import ResumeAction from "./components/ResumeAction";
import ProjectDetailModal, { ProjectItem } from "./components/ProjectDetailModal";
import {
  SiReact, SiTypescript, SiJavascript, SiPython, SiNodedotjs, SiExpress,
  SiMongodb, SiFirebase, SiTailwindcss, SiNextdotjs, SiVite, SiGit,
  SiGithub, SiFigma, SiVercel, SiDocker, SiMysql, SiSupabase, SiFastapi,
  SiPytorch, SiOpencv, SiHtml5, SiCss, SiLinux, SiFramer,
  SiCplusplus, SiPostman, SiTensorflow, SiKubernetes, SiGsap, SiNumpy,
} from "react-icons/si";

// ─── TYPES ───────────────────────────────────────────────────────────────────
type TechItem = { name: string; icon: ReactNode; color: string; desc: string; };
type StackRow  = { label: string; items: TechItem[]; };

// ─── DATA ────────────────────────────────────────────────────────────────────
const allProjects: ProjectItem[] = [
  {
    name: "Aapno Rasto",
    year: "2025", category: "Fullstack Web App", org: "Personal Project",
    detail: "A smart civic complaint tracking platform that lets citizens report and track local infrastructure issues in real-time with interactive maps, Firebase auth, and Supabase storage.",
    longDesc: "Aapno Rasto empowers citizens and municipal corporations by digitizing road damage, sanitation issues, and civic infrastructure complaints. Citizens can capture geo-tagged images, pin precise locations on interactive maps, and track the real-time resolution lifecycle. Municipal authorities receive an analytics dashboard to prioritize urgent issues based on citizen upvotes and severity.",
    features: [
      "Interactive Geo-Mapping with real-time pin clustering and GPS geolocation",
      "Issue photo evidence upload with automated thumbnail optimization via Supabase",
      "Secure multi-role authentication & profile management with Firebase Auth",
      "Live status tracking workflow: Reported ➔ Review ➔ In-Progress ➔ Resolved",
      "Citizen upvoting system to surface critical local hazards to authorities",
      "100% Mobile-first responsive UI built with Tailwind CSS & Framer Motion"
    ],
    live: "https://aapno-rasto.vercel.app/",
    github: "https://github.com/Parthh1002/Aapno-Rasto",
    youtube: "https://youtube.com/@parthpatel-333?si=NZhgxUEcBVwg-9Ik",
    linkedin: "https://www.linkedin.com/in/parth-patel-468772336",
    badge: "LIVE",
    stack: ["React.js", "TypeScript", "Vite", "Firebase", "Supabase", "Tailwind CSS"],
  },
  {
    name: "The Saviourr",
    year: "2025", category: "AI / Fullstack", org: "Hackathon Project",
    detail: "An AI-powered safety platform using YOLOv8 & OpenCV for real-time threat detection. Next.js frontend with FastAPI backend and PyTorch inference engine.",
    longDesc: "The Saviourr is an intelligent real-time surveillance and threat detection platform designed to protect public spaces and institutional campuses. Leveraging fine-tuned YOLOv8 and OpenCV vision pipelines, it continuously analyzes video streams to detect suspicious activity, weapons, and anomalies, instantly alerting emergency teams with zero-latency websockets.",
    features: [
      "Real-time video stream object & threat detection powered by YOLOv8",
      "Ultra-low-latency asynchronous inference engine built on FastAPI & PyTorch",
      "Automated instant alert dispatch & incident event logging with snapshot captures",
      "Next.js interactive command center dashboard with live metrics & cameras",
      "Secure cloud event storage & role-based authority authorization via Firebase"
    ],
    live: "https://the-saviourr.vercel.app/",
    github: "https://github.com/Parthh1002/The-Saviour-Final",
    youtube: "https://youtube.com/@parthpatel-333?si=NZhgxUEcBVwg-9Ik",
    linkedin: "https://www.linkedin.com/in/parth-patel-468772336",
    badge: "HACKATHON",
    stack: ["Next.js", "React", "Firebase", "FastAPI", "YOLOv8", "PyTorch"],
  },
  {
    name: "Safaai Sarathi 2.0",
    year: "2024", category: "IoT / Web", org: "Hackathon Project",
    detail: "Smart waste management platform with IoT-enabled dustbins that track fill levels in real-time, optimising garbage collection routes and reducing urban waste overflow.",
    longDesc: "Safaai Sarathi 2.0 tackles urban sanitation crises by outfitting municipal dustbins with ultrasonic IoT telemetry modules. Fill-level data streams live to an intelligent central command platform that dynamically groups overflowing zones and calculates fuel-efficient collection routes for municipal trucks.",
    features: [
      "Ultrasonic IoT hardware telemetry integration for real-time dustbin fill tracking",
      "Dynamic route optimization algorithm for municipal waste collection fleets",
      "Automated capacity overflow alerts & predictive collection scheduling",
      "Real-time telemetry stream visualization powered by Firebase Realtime DB",
      "Dedicated municipal administration console with interactive maps & heatmaps"
    ],
    live: "https://safaai-sarathi.vercel.app/",
    github: "https://github.com/Parthh1002/SafaaiSarathi2.0",
    youtube: "https://youtube.com/@parthpatel-333?si=NZhgxUEcBVwg-9Ik",
    linkedin: "https://www.linkedin.com/in/parth-patel-468772336",
    badge: "HACKATHON",
    stack: ["React", "Node.js", "IoT", "Firebase"],
  },
  {
    name: "Mr & Mrs Optical",
    year: "2025", category: "E-Commerce", org: "Client Project",
    detail: "Modern e-commerce storefront for an optical shop — product catalog, cart, enquiry system and a fully responsive TypeScript UI.",
    longDesc: "A bespoke, conversion-optimized commercial storefront built for optical retail. Offers an interactive eyewear showroom, instant dynamic filtering across frame types, lens specifications, and unisex styles, accompanied by an instant WhatsApp checkout flow for direct retail sales.",
    features: [
      "High-definition eyewear catalog with multi-angle frame previews & variant selectors",
      "Instant client-side search & multifaceted filtering by brand, shape, and price",
      "Persistent customer cart & inquiry bag with live price tallying",
      "One-click WhatsApp order checkout routing for fast customer conversion",
      "High-speed, SEO-optimized responsive architecture with Vite + Tailwind CSS"
    ],
    live: "https://mr-mrs-optical.vercel.app/",
    github: "https://github.com/Parthh1002/Mr_Mrs_Optical",
    youtube: "https://youtube.com/@parthpatel-333?si=NZhgxUEcBVwg-9Ik",
    linkedin: "https://www.linkedin.com/in/parth-patel-468772336",
    badge: null,
    stack: ["TypeScript", "React", "Tailwind CSS"],
  },
  {
    name: "Aura — The Beginning",
    year: "2024", category: "Creative / Web", org: "Personal Project",
    detail: "A visually immersive web experience showcasing premium interactive animations, GSAP scroll effects, and a dark-first aesthetic.",
    longDesc: "An avant-garde exploration of modern web craft and cinematic interactive physics. Combines GSAP ScrollTrigger timelines, custom mouse-following ambient luminous fields, and fluid typography to push modern browser animation capabilities to their absolute limits.",
    features: [
      "Timeline-driven GSAP ScrollTrigger sequence with pinned storytelling sections",
      "Obsidian dark-first aesthetic with dynamic responsive gradient glow fields",
      "Physics-based cursor aura & particle dispersion interactions",
      "Silky smooth 60fps hardware-accelerated animations and micro-interactions"
    ],
    live: "https://aura-the-begining.vercel.app/",
    github: "https://github.com/Parthh1002/AuraTheBegining",
    youtube: "https://youtube.com/@parthpatel-333?si=NZhgxUEcBVwg-9Ik",
    linkedin: "https://www.linkedin.com/in/parth-patel-468772336",
    badge: null,
    stack: ["React", "GSAP", "Framer Motion", "CSS"],
  },
  {
    name: "Laxmi Tiles",
    year: "2024", category: "Business Website", org: "Client Project",
    detail: "Professional business website for a tiles manufacturer — sleek product gallery, inquiry forms and mobile-first responsive layout.",
    longDesc: "A complete digital product showcase and B2B catalog built for a prominent ceramic & porcelain manufacturer. Designed for architects, contractors, and retail clients to browse finishes, inspect technical grade sheets, and request instant trade quotes.",
    features: [
      "Corporate product gallery with high-resolution texture displays & finish categorization",
      "Detailed dimensional sheets, durability ratings, and slip-resistance metrics",
      "Direct B2B commercial quote submission form with WhatsApp quick connect",
      "Mobile-first responsive architecture optimized for fast load on site visits"
    ],
    live: "https://laxmi-tiles.vercel.app/",
    github: "https://github.com/Parthh1002/Laxmi_Tiles",
    youtube: "https://youtube.com/@parthpatel-333?si=NZhgxUEcBVwg-9Ik",
    linkedin: "https://www.linkedin.com/in/parth-patel-468772336",
    badge: null,
    stack: ["TypeScript", "React", "CSS"],
  },
];

const experience = [
  { role: "Data Science & Machine Learning", org: "Data Scientist Course", when: "2026 — Now", tag: "Current",
    detail: "Pursuing Data Scientist course. Training ML models at an intermediate/advanced level. Mastering Python, NumPy, Pandas, NLP, and OCR technologies." },
  { role: "AI & Real-World Products", org: "Full Stack & AI", when: "Late 2025", tag: null,
    detail: "Building production-ready full-stack solutions, AI-powered applications, and leading team projects in hackathons." },
  { role: "Full Stack Development", org: "MERN Stack", when: "Mid 2025", tag: null,
    detail: "MERN Stack Applications, Firebase Authentication & Realtime Database, REST API Integration & Vercel Deployment." },
  { role: "Frontend Development", org: "React & Tailwind", when: "Early 2025", tag: null,
    detail: "React.js & Tailwind CSS. Built responsive and interactive UI for personal projects and client sites." },
  { role: "Started Web Development", org: "Self-taught", when: "2024", tag: "Origin",
    detail: "Learned HTML, CSS & JavaScript from scratch. Built first static websites and discovered a passion for frontend craft." },
];

const education = [
  { deg: "B.Tech Computer Science Engineering", school: "LDRP-ITR Gandhinagar, Gujarat", when: "2024 — 2028", note: "3rd Year · CGPA: 8.8+" },
  { deg: "Class 12th (Science — PCM)", school: "Gujarat State Board (GSEB)", when: "2022 — 2023", note: "Percentage: 82%" },
  { deg: "Class 10th", school: "Gujarat State Board (GSEB)", when: "2020 — 2021", note: "Percentage: 78%" },
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
      { name: "Next.js",       icon: <SiNextdotjs />,   color: "var(--tech-monochrome, var(--fg-1, #0f172a))", desc: "Full-stack React framework with SSR, SSG, file-based routing and built-in API routes." },
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
      { name: "Express",  icon: <SiExpress />,   color: "var(--tech-monochrome, var(--fg-1, #0f172a))", desc: "Minimal, unopinionated web framework for Node.js. Great for building REST APIs fast." },
      { name: "FastAPI",  icon: <SiFastapi />,   color: "#009688", desc: "Modern Python API framework. Auto-generates OpenAPI docs and is built for high performance." },
    ],
  },
  {
    label: "Database",
    items: [
      { name: "MongoDB",  icon: <SiMongodb />,  color: "#47A248", desc: "NoSQL document database. Flexible, JSON-like storage that scales with your application." },
      { name: "Firebase", icon: <SiFirebase />, color: "#FFA000", desc: "Google's BaaS with real-time DB, authentication, cloud functions and easy deployment." },
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
      { name: "OpenAI API", icon: <RiOpenaiFill />, color: "#10A37F", desc: "Access GPT-4, DALL-E and Whisper APIs for AI-powered text generation, vision and code." },
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      { name: "Vercel",      icon: <SiVercel />,      color: "var(--tech-monochrome, var(--fg-1, #0f172a))", desc: "Zero-config deployment platform for frontend frameworks. Instant global CDN. Powers this site!" },
      { name: "AWS",         icon: <FaAws />,         color: "#FF9900", desc: "Amazon Web Services — industry-leading cloud with 200+ services for computing, storage, and AI." },
      { name: "Docker",      icon: <SiDocker />,      color: "#2496ED", desc: "Containerization platform for packaging apps with all dependencies into portable containers." },
      { name: "Linux",       icon: <SiLinux />,       color: "#FCC624", desc: "Open-source OS powering the majority of the world's servers and cloud infrastructure." },
      { name: "Kubernetes",  icon: <SiKubernetes />,  color: "#326CE5", desc: "Container orchestration system for automating deployment, scaling, and management of apps." },
    ],
  },
  {
    label: "Tools",
    items: [
      { name: "Git",     icon: <SiGit />,     color: "#F05032", desc: "Distributed version control. Track every change, branch freely, and collaborate on code." },
      { name: "GitHub",  icon: <SiGithub />,  color: "var(--tech-monochrome, var(--fg-1, #0f172a))", desc: "Platform for hosting Git repositories with CI/CD, Actions, and collaborative code review." },
      { name: "Figma",   icon: <SiFigma />,   color: "#F24E1E", desc: "Browser-based design tool for UI/UX prototyping, design systems, and team collaboration." },
      { name: "VS Code", icon: <VscVscode />, color: "#007ACC", desc: "Lightweight yet powerful code editor by Microsoft with a rich extension marketplace." },
      { name: "Postman", icon: <SiPostman />, color: "#FF6C37", desc: "API development and testing platform. Design, test, and document REST and GraphQL APIs." },
      { name: "Claude / Anthropic", icon: <RiClaudeFill />, color: "#D97706", desc: "Constitutional AI by Anthropic. Exceptional at reasoning, safety, and long-context tasks." },
      { name: "Tableau", icon: <IoLogoTableau />, color: "#E97627", desc: "Industry-leading data visualization tool for building interactive dashboards and analytics." },
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
  const [showAllAch, setShowAllAch]   = useState(false);
  const [theme, setTheme]             = useState<ThemeMode>(() => {
    return (localStorage.getItem("portfolio_theme") as ThemeMode) || "dark";
  });
  const [introComplete, setIntroComplete] = useState(false);
  const [repoStats, setRepoStats]     = useState<Record<string, RepoStats>>({});
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const visible = showAll ? allProjects : allProjects.slice(0, 4);
  const visibleAch = showAllAch ? achievements : achievements.slice(0, 5);

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

  const projRef  = useFadeIn(200);
  const xpRef    = useFadeIn(200);
  const eduRef   = useFadeIn(200);
  const stackRef = useFadeIn(200);
  const achRef   = useFadeIn(200);

  return (
    <div className="portfolio-wrap" data-theme={theme}>
      <ParticleBackground theme={theme} />

      {/* Cinematic Intro — shows on every page load and adapts to user's saved theme */}
      {!introComplete && <CinematicIntro onComplete={handleIntroComplete} theme={theme} />}

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
                    <span className="meta-icon location"><FaMapMarkerAlt /></span>
                    <span className="meta-val dim">Ahmedabad, India</span>
                  </li>
                  <li className="meta-item">
                    <a href="mailto:parthh1002@gmail.com" className="meta-link gmail">
                      <span className="meta-icon"><FaEnvelope /></span>
                      <span className="meta-val">Gmail</span>
                    </a>
                  </li>
                  <li className="meta-item">
                    <a href="https://github.com/Parthh1002" target="_blank" rel="noreferrer" className="meta-link github">
                      <span className="meta-icon"><FaGithub /></span>
                        <span className="meta-val">GitHub</span>
                    </a>
                  </li>
                  <li className="meta-item">
                    <a href="https://www.linkedin.com/in/parth-patel-468772336" target="_blank" rel="noreferrer" className="meta-link linkedin">
                      <span className="meta-icon"><FaLinkedin /></span>
                        <span className="meta-val">LinkedIn</span>
                    </a>
                  </li>
                  <li className="meta-item">
                    <a href="https://youtube.com/@parthpatel-333?si=NZhgxUEcBVwg-9Ik" target="_blank" rel="noreferrer" className="meta-link youtube">
                      <span className="meta-icon"><FaYoutube /></span>
                        <span className="meta-val">YouTube</span>
                    </a>
                  </li>
                  <li className="meta-item">
                    <a href="https://wa.me/918866077505" target="_blank" rel="noreferrer" className="meta-link whatsapp">
                      <span className="meta-icon"><FaWhatsapp /></span>
                        <span className="meta-val">WhatsApp</span>
                    </a>
                  </li>
                </motion.ul>

                {/* Unique Interactive Resume / CV Action */}
                <motion.div variants={slideUp} className="cv-btn-wrap" style={{ marginTop: "16px", marginBottom: "8px" }}>
                  <ResumeAction />
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
                            <button
                              className="ghost-btn proj-details-btn"
                              onClick={() => setSelectedProject(proj)}
                              type="button"
                              title="View full project details & case study"
                            >
                              <FaExpandAlt size={10} /> Details <span className="ghost-btn-arrow">↗</span>
                            </button>
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
                    {visibleAch.map((ach, i) => (
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
                  {achievements.length > 5 && (
                    <button className="more-btn" onClick={() => setShowAllAch(s => !s)}>
                      <span>{showAllAch ? "COLLAPSE" : `SHOW ${achievements.length - 5} MORE EXPERIENCES`}</span>
                      <span className="more-arrow" data-open={showAllAch ? "on" : "off"}>↓</span>
                    </button>
                  )}
                </div>
              </section>

              {/* FOOTER */}
              <footer className="site-footer">
                <div className="footer-inner" style={{ position: "relative", paddingRight: "40px" }}>
                  <p className="meta">© {new Date().getFullYear()} Parth Patel · Built with React + Vite</p>
                  <div className="footer-links">
                    <a href="https://github.com/Parthh1002" target="_blank" rel="noreferrer" className="meta-link"><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/parth-patel-468772336" target="_blank" rel="noreferrer" className="meta-link"><FaLinkedin /></a>
                  </div>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="scroll-top-btn"
                    title="Scroll to Top"
                  >
                    ↑
                  </button>
                </div>
              </footer>
            </motion.main>
          </div>
        </>
      )}

      {/* Full-Screen Project Detail & Case Study Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
