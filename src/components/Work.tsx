import { useState } from "react";
import { createPortal } from "react-dom";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGlobe, FaGithub, FaYoutube, FaLinkedin } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [activeProject, setActiveProject] = useState<any>(null);

  useGSAP(() => {
    let translateX: number = 0;

    if (window.innerWidth <= 900) return;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      if (box.length === 0) return;
      const container = document.querySelector(".work-container");
      if (!container) return;
      const rectLeft = container.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      
      const calculatedX = rect.width * box.length - (rectLeft + parentWidth) + padding;
      translateX = Math.max(0, calculatedX);
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: translateX > 0 ? `+=${translateX}` : "bottom top", 
        scrub: true,
        pin: translateX > 0,
        id: "work",
      },
    });

    if (translateX > 0) {
      timeline.to(".work-flex", {
        x: -translateX,
        ease: "none",
      });
    }

    // Clean up
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {[
            {
              name: "Aapno Rasto",
              category: "Fullstack Web App",
              tools: "React, Node.js, Express, MongoDB",
              live: "https://aapno-rasto.vercel.app/",
              github: "https://github.com/Parthh1002/Aapno-Rasto",
              youtube: "https://youtu.be/vqTcp-bV1Og?si=XtXNZ_C5IxP7C00N",
              youtubeEmbed: "vqTcp-bV1Og",
              linkedin: "https://www.linkedin.com/in/parth-patel-8bb36b252",
              image: "/images/aapno-rasto.png",
              caption: (
                <div className="tech-stack-modal">
                  <h3>⚡ Technologies Used:</h3>
                  <ul>
                    <li>🔹 React.js + TypeScript</li>
                    <li>🔹 Vite + Tailwind CSS</li>
                    <li>🔹 Firebase Authentication</li>
                    <li>🔹 Supabase Storage</li>
                    <li>🔹 React Leaflet Maps</li>
                    <li>🔹 Real-Time Complaint Tracking</li>
                  </ul>
                </div>
              )
            },
            {
              name: "The Saviourr",
              category: "Fullstack Web App",
              tools: "React, Next.js, TailwindCSS",
              live: "https://the-saviour-final-fn6i.vercel.app/",
              github: "https://github.com/Parthh1002/The-Saviour-Final",
              youtube: "https://youtu.be/bVBt6yWTc9w?si=LHTJWv7xPjqovtAV",
              youtubeEmbed: "bVBt6yWTc9w",
              linkedin: "https://www.linkedin.com/in/parth-patel-8bb36b252",
              image: "/images/the-saviour.png",
              caption: (
                <div className="tech-stack-modal">
                  <h3>⚡ Technologies Used:</h3>
                  <ul>
                    <li>⚛️ Next.js & React</li>
                    <li>🔥 Firebase</li>
                    <li>🚀 FastAPI</li>
                    <li>👁️ YOLOv8 & OpenCV</li>
                    <li>🔥 PyTorch</li>
                  </ul>
                </div>
              )
            }
          ].map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div className="work-links">
                  <a href={project.live} target="_blank" rel="noreferrer" className="glass-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaGlobe color="#4ade80" /> Live Site
                  </a>
                  <a href={project.github} target="_blank" rel="noreferrer" className="glass-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaGithub color="#ffffff" /> GitHub
                  </a>
                  <a href={project.youtube} target="_blank" rel="noreferrer" className="glass-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaYoutube color="#ff0000" /> YouTube
                  </a>
                </div>
              </div>
              <WorkImage image={project.image} alt={project.name} />
              <button className="view-cert-btn work-view-more" onClick={() => setActiveProject(project)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                View More
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeProject && createPortal(
        <div className="cert-modal-overlay project-modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="cert-modal-content project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setActiveProject(null)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            
            <div className="project-modal-grid">
              <div className="project-modal-video">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/${activeProject.youtubeEmbed}?autoplay=1`}
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="project-modal-details">
                <h2>{activeProject.name}</h2>
                <div className="work-links" style={{ marginTop: '10px', marginBottom: '20px' }}>
                  <a href={activeProject.live} target="_blank" rel="noreferrer" className="glass-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaGlobe color="#4ade80" /> Live Site
                  </a>
                  <a href={activeProject.github} target="_blank" rel="noreferrer" className="glass-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FaGithub color="#ffffff" /> GitHub
                  </a>
                  {activeProject.linkedin && (
                    <a href={activeProject.linkedin} target="_blank" rel="noreferrer" className="glass-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaLinkedin color="#0077b5" /> LinkedIn
                    </a>
                  )}
                </div>
                <div className="project-modal-scroll-content">
                  {activeProject.caption}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Work;
