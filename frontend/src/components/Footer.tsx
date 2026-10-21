import { memo } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function FooterComponent() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div
        className="footer-inner"
        style={{ position: "relative", paddingRight: "40px" }}
      >
        <p className="meta">
          © {new Date().getFullYear()} Parth Patel · Built with React + Vite
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/Parthh1002"
            target="_blank"
            rel="noreferrer"
            className="meta-link"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/parth-patel-468772336"
            target="_blank"
            rel="noreferrer"
            className="meta-link"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
        </div>
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
          title="Scroll to Top"
          type="button"
          aria-label="Scroll to top of the page"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterComponent);
export default Footer;
