import { memo } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";
import ProfileTilt from "./ProfileTilt";
import ResumeAction from "./ResumeAction";

interface SidebarProps {
  stagger: any;
  slideUp: any;
}

/**
 * Sidebar component presenting profile information, stats, and social links.
 * Wrapped in memo to avoid re-renders when parent state updates.
 */
function SidebarComponent({ stagger, slideUp }: SidebarProps) {
  return (
    <aside className="aside">
      <motion.div
        className="aside-inner"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={slideUp} className="profile-pic-wrap">
          <ProfileTilt src="/profile.jpeg" />
        </motion.div>

        <motion.h1 variants={slideUp} className="name">
          Parth Patel
        </motion.h1>
        <motion.p variants={slideUp} className="role">
          Creative Developer &amp; Designer
        </motion.p>
        <motion.p variants={slideUp} className="blurb">
          3rd Year B.Tech CSE student and passionate Fullstack Developer.
          I love building dynamic, responsive, and premium web applications.
          Always eager to explore Generative AI, Web3, and real-world product development.
        </motion.p>

        {/* Quick Career Stats */}
        <motion.div variants={slideUp} className="stats">
          <div className="stat">
            <div className="stat-n">37+</div>
            <div className="stat-k">Stars ⭐</div>
          </div>
          <div className="stat">
            <div className="stat-n">12+</div>
            <div className="stat-k">Hackathons</div>
          </div>
          <div className="stat">
            <div className="stat-n">14+</div>
            <div className="stat-k">Projects</div>
          </div>
        </motion.div>

        {/* Contact & Social Links */}
        <motion.ul variants={slideUp} className="meta-list">
          <li className="meta-item">
            <span className="meta-icon location">
              <FaMapMarkerAlt />
            </span>
            <span className="meta-val dim">Ahmedabad, India</span>
          </li>
          <li className="meta-item">
            <a href="mailto:parthh1002@gmail.com" className="meta-link gmail">
              <span className="meta-icon">
                <FaEnvelope />
              </span>
              <span className="meta-val">Gmail</span>
            </a>
          </li>
          <li className="meta-item">
            <a
              href="https://github.com/Parthh1002"
              target="_blank"
              rel="noreferrer"
              className="meta-link github"
            >
              <span className="meta-icon">
                <FaGithub />
              </span>
              <span className="meta-val">GitHub</span>
            </a>
          </li>
          <li className="meta-item">
            <a
              href="https://www.linkedin.com/in/parth-patel-468772336"
              target="_blank"
              rel="noreferrer"
              className="meta-link linkedin"
            >
              <span className="meta-icon">
                <FaLinkedin />
              </span>
              <span className="meta-val">LinkedIn</span>
            </a>
          </li>
          <li className="meta-item">
            <a
              href="https://youtube.com/@parthpatel-333?si=NZhgxUEcBVwg-9Ik"
              target="_blank"
              rel="noreferrer"
              className="meta-link youtube"
            >
              <span className="meta-icon">
                <FaYoutube />
              </span>
              <span className="meta-val">YouTube</span>
            </a>
          </li>
          <li className="meta-item">
            <a
              href="https://wa.me/918866077505"
              target="_blank"
              rel="noreferrer"
              className="meta-link whatsapp"
            >
              <span className="meta-icon">
                <FaWhatsapp />
              </span>
              <span className="meta-val">WhatsApp</span>
            </a>
          </li>
        </motion.ul>

        {/* Interactive Resume Action */}
        <motion.div
          variants={slideUp}
          className="cv-btn-wrap"
          style={{ marginTop: "16px", marginBottom: "8px" }}
        >
          <ResumeAction />
        </motion.div>

        <motion.p variants={slideUp} className="foot dim">
          Parth Patel · 2025
        </motion.p>
      </motion.div>
    </aside>
  );
}

export const Sidebar = memo(SidebarComponent);
export default Sidebar;
