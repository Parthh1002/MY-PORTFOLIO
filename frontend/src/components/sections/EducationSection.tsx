import { memo } from "react";
import { education } from "../../data/education";

function EducationSectionComponent() {
  return (
    <section id="education" className="section-container">
      <header className="sec-h">
        <div className="sec-n">03</div>
        <h2 className="sec-l">Education</h2>
      </header>
      <div className="fade-section">
        <ul className="edu-list">
          {education.map((edu, i) => (
            <li
              className="edu"
              key={edu.deg}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="edu-when">{edu.when}</div>
              <div className="edu-body">
                <div className="edu-deg">{edu.deg}</div>
                <div className="edu-school">{edu.school}</div>
                <div className="edu-note">{edu.note}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const EducationSection = memo(EducationSectionComponent);
export default EducationSection;
