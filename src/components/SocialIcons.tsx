import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes, TbBriefcase, TbX } from "react-icons/tb";
import { useState } from "react";

const SocialIcons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    const subject = encodeURIComponent("Hire Me Inquiry - Portfolio");
    const body = encodeURIComponent(message);
    window.location.href = `mailto:parthh1002@gmail.com?subject=${subject}&body=${body}`;
    setIsModalOpen(false);
    setMessage("");
  };

  return (
    <>
      <div className="icons-section">
        <div className="left-panel">
          <a href="/resume.pdf" download="Resume_Parth.pdf" className="resume-btn">
            <TbNotes size={20} /> RESUME
          </a>

          <div className="social-icons" data-cursor="icons" id="social">
            <span>
              <a href="https://github.com/Parthh1002" target="_blank" rel="noreferrer" style={{ color: "#ffffff" }}>
                <FaGithub />
              </a>
            </span>
            <span>
              <a href="https://www.linkedin.com/in/parth-patel-468772336" target="_blank" rel="noreferrer" style={{ color: "#0a66c2" }}>
                <FaLinkedinIn />
              </a>
            </span>
            <span>
              <a href="https://x.com" target="_blank" rel="noreferrer" style={{ color: "#ffffff" }}>
                <FaXTwitter />
              </a>
            </span>
          </div>
          
          <button className="hire-me-btn" onClick={() => setIsModalOpen(true)}>
            <TbBriefcase size={20} /> HIRE ME
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="hire-modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="hire-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="hire-modal-close" onClick={() => setIsModalOpen(false)}>
              <TbX size={24} />
            </button>
            <h3>Let's Work Together</h3>
            <p>Write your message below to reach out directly via email.</p>
            <textarea 
              placeholder="Hi Parth, I would like to talk about..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            ></textarea>
            <button className="hire-modal-send" onClick={handleSend}>
              Send Message
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialIcons;
