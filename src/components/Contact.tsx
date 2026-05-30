import { MdCopyright } from "react-icons/md";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <div className="contact-mail" data-cursor="disable">
              <a href="mailto:parthh1002@gmail.com" data-cursor="disable">
                parthh1002@gmail.com
              </a>
            </div>
            <h4>Phone</h4>
            <p>
              <a href="tel:+918866077505" data-cursor="disable">
                +91 8866077505
              </a>
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Parthh1002"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              <span className="glass-icon-box">
                <FaGithub color="#ffffff" />
              </span>
              Github
            </a>
            <a
              href="https://www.linkedin.com/in/parth-patel-468772336"
              target="_blank"
              data-cursor="disable"
              className="contact-social"
            >
              <span className="glass-icon-box">
                <FaLinkedinIn color="#0a66c2" />
              </span>
              Linkedin
            </a>
          </div>
          <div className="contact-box">
            <div className="footer-info">
              Designed and Developed <br /> by <span>Parth Patel</span>
            </div>
            <h5>
              <MdCopyright /> 2025
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
