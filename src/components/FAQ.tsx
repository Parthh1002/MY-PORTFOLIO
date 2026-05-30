import { useState, useRef, useEffect } from "react";
import "./styles/FAQ.css";

const faqs = [
  { question: "What services do you offer?", answer: "I build responsive, high-performance web applications from scratch, handling both frontend (React, Next.js) and backend (Node.js, MongoDB, MySQL). I also specialize in UI/UX implementation using modern design systems." },
  { question: "What is your main Tech Stack?", answer: "My core stack includes React, TypeScript, Next.js, Node.js, Express, and MongoDB. I am also actively exploring Generative AI and Web3 to build futuristic solutions." },
  { question: "Are you available for freelance work or internships?", answer: "Yes! As a 3rd-year B.Tech CSE student, I am actively looking for internship opportunities and freelance projects where I can add value and solve real-world problems." },
  { question: "What was your experience at Impactthon @KSV?", answer: "It was an incredible experience! Being a Finalist under the 'Technology for Social Good' track taught me a lot about rapid prototyping, teamwork, and building impactful solutions under pressure." }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setIsActive(entries[0].isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (faqRef.current) {
      observer.observe(faqRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section" id="faq" ref={faqRef}>
      <h2>
        Got <span>Questions?</span>
      </h2>
      <div className={`faq-container ${isActive ? "active" : ""}`}>
        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${activeIndex === index ? "open" : ""}`}
            key={index}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              <h3>{faq.question}</h3>
              <span className="faq-icon">{activeIndex === index ? "-" : "+"}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
