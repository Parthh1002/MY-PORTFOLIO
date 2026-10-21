import { ProjectItem } from "../components/ProjectDetailModal";

export { type ProjectItem };

export const allProjects: ProjectItem[] = [
  {
    name: "Aapno Rasto",
    year: "2025",
    category: "Fullstack Web App",
    org: "Personal Project",
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
    year: "2025",
    category: "AI / Fullstack",
    org: "Hackathon Project",
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
    year: "2024",
    category: "IoT / Web",
    org: "Hackathon Project",
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
    year: "2025",
    category: "E-Commerce",
    org: "Client Project",
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
    year: "2024",
    category: "Creative / Web",
    org: "Personal Project",
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
    year: "2024",
    category: "Business Website",
    org: "Client Project",
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

// Mapping of project names to their GitHub repository paths
export const GITHUB_REPOS: Record<string, string> = {
  "Aapno Rasto": "Parthh1002/Aapno-Rasto",
  "The Saviourr": "Parthh1002/The-Saviour-Final",
  "Safaai Sarathi 2.0": "Parthh1002/SafaaiSarathi2.0",
  "Mr & Mrs Optical": "Parthh1002/Mr_Mrs_Optical",
  "Aura — The Beginning": "Parthh1002/AuraTheBegining",
  "Laxmi Tiles": "Parthh1002/Laxmi_Tiles",
};
