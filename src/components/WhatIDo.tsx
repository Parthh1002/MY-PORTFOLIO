import { useEffect, useRef, useState } from "react";
import "./styles/WhatIDo.css";
import { FiLayers, FiServer, FiZap, FiLayout } from "react-icons/fi";

const services = [
  {
    title: "Frontend Architecture",
    description: "Designing scalable, maintainable, and high-performance frontend systems for enterprise applications using React, Next.js, and TypeScript.",
    icon: <FiLayers />,
    color: "#8b5cf6" // Purple outline
  },
  {
    title: "Full-Stack Development",
    description: "Building seamless end-to-end applications with robust Node.js backend services and modern interactive user interfaces.",
    icon: <FiServer />,
    color: "#10b981" // Green outline
  },
  {
    title: "Performance Optimization",
    description: "Identifying bottlenecks and implementing strategies across the stack to ensure lightning-fast load times and smooth rendering.",
    icon: <FiZap />,
    color: "#f59e0b" // Yellow outline
  },
  {
    title: "UI/UX Engineering",
    description: "Translating complex design systems into pixel-perfect, accessible, and responsive digital experiences.",
    icon: <FiLayout />,
    color: "#f43f5e" // Red outline
  }
];

const WhatIDo = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsActive(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="whatIDO-section" id="what-i-do" ref={sectionRef}>
      <div className="whatIDO-header">
        <h2>What I <span>Do</span></h2>
        <div className="core-capabilities-badge">CORE CAPABILITIES</div>
      </div>
      <div className={`whatIDO-grid ${isActive ? "active" : ""}`}>
        {services.map((service, index) => (
          <div className="whatIDO-card" key={index} style={{ transitionDelay: `${index * 0.15}s` }}>
            <div className="whatIDO-icon-box" style={{ color: service.color, borderColor: service.color }}>
              {service.icon}
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatIDo;
