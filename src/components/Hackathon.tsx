import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./styles/Hackathon.css";

const Hackathon = () => {
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsActive(entries[0].isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (hackRef.current) {
      observer.observe(hackRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="hackathon-section" id="hackathon" ref={hackRef}>
      <div className={`hackathon-container ${isActive ? "active" : ""}`}>
        <div className="hackathon-text">
          <h2>
            <a href="https://impactthon.mmpsrpc.in/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
              Hackathon <span>Achievement</span>
            </a>
          </h2>
          <h3>
            <a href="https://impactthon.mmpsrpc.in/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
              Finalist @ Impactthon KSV 2025-2026
            </a>
          </h3>
          <p style={{ marginBottom: "15px" }}>
            I participated as the <strong>Co-Leader of Team N+1's</strong> at ImpactThon 2025-26, hosted at LDRP Institute of Technology & Research. Out of 170+ teams, we proudly advanced to the Top 15 Grand Finale in the <em>Technology for Social Good</em> track.
          </p>
          <p style={{ marginBottom: "15px" }}>
            <strong>💡 Aapno Rasto:</strong> We built a civic-tech platform for transparent public issue management. Citizens map complaints, authorities track them, and field engineers upload completion proofs. 
          </p>
          <p style={{ marginBottom: "15px" }}>
            <strong>💰 Grant Recognition:</strong> Our solution was approved for a ₹10,000 Innovation Grant!
          </p>
          <p>
            <strong>🛠 Tech Stack:</strong> React, TypeScript, Supabase, Geolocation APIs, Leaflet Maps, and RBAC.
          </p>
        </div>
        <div className="hackathon-image-wrapper">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div className="glass-frame">
              <img src="/images/certificate.png" alt="Impactthon Finalist Certificate" className="certificate-img" />
            </div>
            <button className="view-cert-btn" onClick={() => setIsModalOpen(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
              View Full Screen
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && createPortal(
        <div className="cert-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="cert-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setIsModalOpen(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <img src="/images/certificate.png" alt="Full Screen Certificate" className="cert-modal-img" />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Hackathon;
