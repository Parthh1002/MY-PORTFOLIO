import { useState, memo } from "react";
import { achievements } from "../../data/achievements";

function AchievementsSectionComponent() {
  const [showAllAch, setShowAllAch] = useState(false);
  const visibleAch = showAllAch ? achievements : achievements.slice(0, 5);

  return (
    <section id="achievements" className="section-container">
      <header className="sec-h">
        <div className="sec-n">05</div>
        <h2 className="sec-l">Competitive Experience</h2>
      </header>
      <div className="fade-section">
        <ul className="ach-list-cards">
          {visibleAch.map((ach, i) => (
            <li
              key={ach.event}
              className="ach-card glass-card"
              style={{ animationDelay: `${i * 45}ms` }}
            >
              <div className="ach-card-top">
                <span className={`ach-badge ach-badge--${ach.resultType}`}>
                  {ach.result}
                </span>
                <span className="ach-org">{ach.org}</span>
              </div>
              <h3 className="ach-event">{ach.event}</h3>
              <p className="ach-detail">{ach.detail}</p>
            </li>
          ))}
        </ul>
        {achievements.length > 5 && (
          <button
            className="more-btn"
            onClick={() => setShowAllAch((s) => !s)}
            type="button"
          >
            <span>
              {showAllAch
                ? "COLLAPSE"
                : `SHOW ${achievements.length - 5} MORE EXPERIENCES`}
            </span>
            <span className="more-arrow" data-open={showAllAch ? "on" : "off"}>
              ↓
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

export const AchievementsSection = memo(AchievementsSectionComponent);
export default AchievementsSection;
