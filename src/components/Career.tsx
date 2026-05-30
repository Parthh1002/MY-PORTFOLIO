import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My <span>Journey</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Started Web Development</h4>
              </div>
              <h3>2024</h3>
            </div>
            <ul className="career-desc">
              <li>Learned HTML, CSS & JavaScript</li>
              <li>Built my first websites</li>
              <li>Explored modern frontend development</li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Frontend Development</h4>
              </div>
              <h3>Early 2025</h3>
            </div>
            <ul className="career-desc">
              <li>React.js & Tailwind CSS</li>
              <li>Responsive and interactive UI design</li>
              <li>Portfolio and personal projects</li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full Stack Development</h4>
              </div>
              <h3>Late 2025</h3>
            </div>
            <ul className="career-desc">
              <li>MERN Stack Applications</li>
              <li>Firebase Authentication & Database</li>
              <li>API Integration & Deployment</li>
            </ul>
          </div>

          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>AI & Real-World Products</h4>
              </div>
              <h3>NOW</h3>
            </div>
            <ul className="career-desc">
              <li>AI-powered applications</li>
              <li>Hackathons & Team Projects</li>
              <li>Building production-ready full-stack solutions</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;
