export interface ExperienceItem {
  role: string;
  org: string;
  when: string;
  tag: string | null;
  detail: string;
}

export const experience: ExperienceItem[] = [
  {
    role: "Data Science & Machine Learning",
    org: "Data Scientist Course",
    when: "2026 — Now",
    tag: "Current",
    detail: "Pursuing Data Scientist course. Training ML models at an intermediate/advanced level. Mastering Python, NumPy, Pandas, NLP, and OCR technologies."
  },
  {
    role: "AI & Real-World Products",
    org: "Full Stack & AI",
    when: "Late 2025",
    tag: null,
    detail: "Building production-ready full-stack solutions, AI-powered applications, and leading team projects in hackathons."
  },
  {
    role: "Full Stack Development",
    org: "MERN Stack",
    when: "Mid 2025",
    tag: null,
    detail: "MERN Stack Applications, Firebase Authentication & Realtime Database, REST API Integration & Vercel Deployment."
  },
  {
    role: "Frontend Development",
    org: "React & Tailwind",
    when: "Early 2025",
    tag: null,
    detail: "React.js & Tailwind CSS. Built responsive and interactive UI for personal projects and client sites."
  },
  {
    role: "Started Web Development",
    org: "Self-taught",
    when: "2024",
    tag: "Origin",
    detail: "Learned HTML, CSS & JavaScript from scratch. Built first static websites and discovered a passion for frontend craft."
  },
];
