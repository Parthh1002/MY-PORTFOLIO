import { ReactNode } from "react";
import { FaAws } from "react-icons/fa";
import { IoLogoTableau } from "react-icons/io5";
import { RiOpenaiFill, RiClaudeFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel,
  SiDocker,
  SiMysql,
  SiSupabase,
  SiFastapi,
  SiPytorch,
  SiOpencv,
  SiHtml5,
  SiCss,
  SiLinux,
  SiFramer,
  SiCplusplus,
  SiPostman,
  SiTensorflow,
  SiKubernetes,
  SiGsap,
  SiNumpy,
} from "react-icons/si";

export interface TechItem {
  name: string;
  icon: ReactNode;
  color: string;
  desc: string;
}

export interface StackRow {
  label: string;
  items: TechItem[];
}

export const stackRows: StackRow[] = [
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
