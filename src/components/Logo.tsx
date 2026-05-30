import { useState, useRef, MouseEvent } from 'react';
import './styles/Logo.css';
import ProfileModal from './ProfileModal';

const Logo = () => {
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!logoRef.current) return;
    const rect = logoRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the center of the logo
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Tilt calculations (max 20deg tilt)
    const rotateX = -(y / (rect.height / 2)) * 20; 
    const rotateY = (x / (rect.width / 2)) * 20;
    
    setTiltStyle({
      transform: `perspective(400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`,
      transition: 'transform 0.1s ease-out',
      boxShadow: '0 0 35px rgba(170, 66, 255, 0.9)'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: `perspective(400px) rotateX(0deg) rotateY(0deg) scale(1)`,
      transition: 'transform 0.4s ease',
      boxShadow: '' // Handled by CSS pulse animation
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <a href="/#" className="premium-logo-wrapper" data-cursor="disable" onClick={handleClick}>
        <div className="logo-floater">
        <div 
          className="logo-pulser"
          ref={logoRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={tiltStyle}
        >
          <div className="logo-circle">
            <span className="logo-text">&lt;PP/&gt;</span>
          </div>
          </div>
        </div>
      </a>
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Logo;
