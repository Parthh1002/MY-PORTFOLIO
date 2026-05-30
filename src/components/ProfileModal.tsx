import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './styles/ProfileModal.css';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="profile-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="profile-modal-container"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="profile-close-btn" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="profile-content">
              <div className="profile-image-wrapper">
                <img src="/images/FULL.jpeg" alt="Parth Patel" className="profile-img" />
                <div className="profile-image-overlay"></div>
              </div>

              <div className="profile-details">
                <h2 className="profile-name">Parth Patel</h2>
                <h3 className="profile-role">Full Stack Developer</h3>
                
                <div className="profile-divider"></div>

                <div className="profile-contact-info">
                  <div className="profile-info-item">
                    <div className="info-icon"><FaPhoneAlt /></div>
                    <a href="tel:+918866077505">+91 8866077505</a>
                  </div>
                  <div className="profile-info-item">
                    <div className="info-icon"><FaEnvelope /></div>
                    <a href="mailto:parthh1002@gmail.com">parthh1002@gmail.com</a>
                  </div>
                </div>

                <div className="profile-socials">
                  <a href="https://github.com/moncy1002" target="_blank" rel="noreferrer" className="social-btn github-btn">
                    <FaGithub /> GitHub
                  </a>
                  <a href="https://linkedin.com/in/parth-patel-4841a0293/" target="_blank" rel="noreferrer" className="social-btn linkedin-btn">
                    <FaLinkedinIn /> LinkedIn
                  </a>
                </div>

                <a href="/resume.pdf" download="Resume.pdf" className="profile-resume-btn">
                  Download Resume
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProfileModal;
