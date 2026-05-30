import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiJavascript, SiExpress, SiMongodb, SiMysql, SiTailwindcss, SiEthereum } from "react-icons/si";
import "./styles/TechStack.css";

const skills = [
  { name: "React", icon: <FaReact color="#61DAFB" /> },
  { name: "Next.js", icon: <SiNextdotjs color="#ffffff" /> },
  { name: "TypeScript", icon: <SiTypescript color="#3178C6" /> },
  { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" /> },
  { name: "Node.js", icon: <FaNodeJs color="#339933" /> },
  { name: "Express", icon: <SiExpress color="#ffffff" /> },
  { name: "MongoDB", icon: <SiMongodb color="#47A248" /> },
  { name: "MySQL", icon: <SiMysql color="#4479A1" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss color="#06B6D4" /> },
  { name: "Web3", icon: <SiEthereum color="#3C3C3D" /> }
];

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsActive(entries[0].isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (techStackRef.current) {
      observer.observe(techStackRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="techstack-section" id="techstack" ref={techStackRef}>
      <div className="techstack-header">
        <p className="tech-subtitle">TECHNOLOGIES & TOOLS</p>
        <h2>
          My <span>Arsenal</span>
        </h2>
      </div>

      <div className={`tech-marquee-container ${isActive ? "active" : ""}`} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        <Marquee gradient={true} gradientColor="#080808" gradientWidth={150} speed={40} pauseOnHover={true} direction="left">
          <div className="tech-marquee-content">
            {skills.map((skill, index) => (
              <div className="tech-pill" key={`row1-${index}`}>
                <div className="tech-icon">{skill.icon}</div>
                <span className="tech-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </Marquee>

        <Marquee gradient={true} gradientColor="#080808" gradientWidth={150} speed={40} pauseOnHover={true} direction="right">
          <div className="tech-marquee-content">
            {[...skills].reverse().map((skill, index) => (
              <div className="tech-pill" key={`row2-${index}`}>
                <div className="tech-icon">{skill.icon}</div>
                <span className="tech-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </Marquee>

        <Marquee gradient={true} gradientColor="#080808" gradientWidth={150} speed={40} pauseOnHover={true} direction="left">
          <div className="tech-marquee-content">
            {[...skills.slice(5), ...skills.slice(0, 5)].map((skill, index) => (
              <div className="tech-pill" key={`row3-${index}`}>
                <div className="tech-icon">{skill.icon}</div>
                <span className="tech-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default TechStack;
