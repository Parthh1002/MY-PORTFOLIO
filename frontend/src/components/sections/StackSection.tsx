import { memo } from "react";
import { stackRows } from "../../data/techStack";

function StackSectionComponent() {
  return (
    <section id="stack" className="section-container">
      <header className="sec-h">
        <div className="sec-n">04</div>
        <h2 className="sec-l">Stack</h2>
      </header>
      <div className="fade-section skills">
        {stackRows.map((row) => (
          <div className="skill-row" key={row.label}>
            <p className="skill-k">{row.label}</p>
            <div className="tech-icon-grid">
              {row.items.map((item, idx) => (
                <div
                  key={item.name}
                  className="tech-tile"
                  title={item.name}
                  style={{ animationDelay: `${idx * 28}ms` }}
                >
                  <span
                    className="tech-tile-icon"
                    style={{ color: item.color }}
                  >
                    {item.icon}
                  </span>
                  <span className="tech-tile-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const StackSection = memo(StackSectionComponent);
export default StackSection;
