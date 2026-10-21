import { useState, memo } from "react";
import { FaStar, FaCodeBranch, FaExpandAlt, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { allProjects, ProjectItem } from "../../data/projects";
import { RepoStats } from "../../hooks/useGitHubRepoStats";

interface ProjectsSectionProps {
  repoStats: Record<string, RepoStats>;
  onSelectProject: (project: ProjectItem) => void;
}

function ProjectsSectionComponent({ repoStats, onSelectProject }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? allProjects : allProjects.slice(0, 4);

  return (
    <section id="projects" className="section-container">
      <header className="sec-h">
        <div className="sec-n">01</div>
        <h2 className="sec-l">Projects</h2>
      </header>
      <div className="fade-section">
        <ul className="proj-list">
          {visible.map((proj, i) => {
            const stats = repoStats[proj.name];
            return (
              <li
                className="proj glass-card"
                key={proj.name}
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <div className="proj-meta">
                  <span className="proj-year">{proj.year}</span>
                  {stats && (
                    <span className="proj-gh-stats">
                      <FaStar size={10} /> {stats.stars}
                      <FaCodeBranch size={10} style={{ marginLeft: 6 }} /> {stats.forks}
                    </span>
                  )}
                </div>
                <div className="proj-body">
                  <h3 className="proj-title">{proj.name}</h3>
                  <p className="proj-org">
                    {proj.org} · {proj.category}
                  </p>
                  <p className="proj-detail">{proj.detail}</p>
                  <div className="proj-stack">
                    {proj.stack.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="proj-actions">
                    <button
                      className="ghost-btn proj-details-btn"
                      onClick={() => onSelectProject(proj)}
                      type="button"
                      title="View full project details & case study"
                    >
                      <FaExpandAlt size={10} /> Details{" "}
                      <span className="ghost-btn-arrow">↗</span>
                    </button>
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noreferrer"
                      className="ghost-btn"
                    >
                      <FaGithub size={12} /> GitHub{" "}
                      <span className="ghost-btn-arrow">↗</span>
                    </a>
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noreferrer"
                      className="ghost-btn"
                    >
                      <FaExternalLinkAlt size={12} /> Live{" "}
                      <span className="ghost-btn-arrow">↗</span>
                    </a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {allProjects.length > 4 && (
          <button
            className="more-btn"
            onClick={() => setShowAll((s) => !s)}
            type="button"
          >
            <span>
              {showAll
                ? "COLLAPSE"
                : `SHOW ${allProjects.length - 4} MORE PROJECTS`}
            </span>
            <span className="more-arrow" data-open={showAll ? "on" : "off"}>
              ↓
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

export const ProjectsSection = memo(ProjectsSectionComponent);
export default ProjectsSection;
