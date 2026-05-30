import { useEffect, useRef, useState } from "react";
import "./styles/HireMe.css";

const HireMe = () => {
  const [isActive, setIsActive] = useState(false);
  const hireRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsActive(entries[0].isIntersecting);
      },
      { threshold: 0.3 }
    );
    if (hireRef.current) {
      observer.observe(hireRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hire-section" id="hire" ref={hireRef}>
      <div className={`hire-glass-card ${isActive ? "active" : ""}`}>
        <h2>Let's <span>Build</span> Something Amazing Together!</h2>
        <p>Whether you need a complex fullstack web application, a premium landing page, or a dedicated intern who is eager to learn and contribute—I'm ready.</p>
        <a href="#contact" className="hire-btn">Say Hello 👋</a>
      </div>
    </div>
  );
};

export default HireMe;
