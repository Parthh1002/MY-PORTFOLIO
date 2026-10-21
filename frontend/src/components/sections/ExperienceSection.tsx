import { memo } from "react";
import { experience } from "../../data/experience";

function ExperienceSectionComponent() {
  return (
    <section id="experience" className="section-container">
      <header className="sec-h">
        <div className="sec-n">02</div>
        <h2 className="sec-l">Experience &amp; Journey</h2>
      </header>
      <div className="fade-section">
        <ul className="xp-list">
          {experience.map((xp, i) => (
            <li
              className="xp"
              key={xp.role}
              style={{ animationDelay: `${i * 65}ms` }}
            >
              <div className="xp-when">
                <span>{xp.when}</span>
                {xp.tag && <span className="xp-tag">{xp.tag}</span>}
              </div>
              <div className="xp-body">
                <h3 className="xp-role">{xp.role}</h3>
                <span className="xp-org">{xp.org}</span>
                <p className="xp-detail">{xp.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const ExperienceSection = memo(ExperienceSectionComponent);
export default ExperienceSection;
