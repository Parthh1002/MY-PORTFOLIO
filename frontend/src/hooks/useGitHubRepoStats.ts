import { useState, useEffect } from "react";
import { GITHUB_REPOS } from "../data/projects";

export interface RepoStats {
  stars: number;
  forks: number;
}

const CACHE_KEY = "gh_repo_stats";

/**
 * Custom hook with single-responsibility: Fetches and caches GitHub star/fork counts.
 * Uses sessionStorage cache to prevent API rate limiting and avoid unnecessary network calls.
 */
export function useGitHubRepoStats() {
  const [repoStats, setRepoStats] = useState<Record<string, RepoStats>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        setRepoStats(JSON.parse(cached));
        return;
      } catch {
        sessionStorage.removeItem(CACHE_KEY);
      }
    }

    let isMounted = true;
    setLoading(true);

    (async () => {
      const stats: Record<string, RepoStats> = {};
      await Promise.all(
        Object.entries(GITHUB_REPOS).map(async ([name, path]) => {
          try {
            const res = await fetch(`https://api.github.com/repos/${path}`, {
              headers: { Accept: "application/vnd.github+json" },
            });
            if (!res.ok) return;
            const data = await res.json();
            stats[name] = {
              stars: data.stargazers_count ?? 0,
              forks: data.forks_count ?? 0,
            };
          } catch {
            /* Silent fallback if offline or rate limited */
          }
        })
      );

      if (isMounted) {
        setRepoStats(stats);
        setLoading(false);
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(stats));
        } catch {
          /* Storage quota exception safety */
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { repoStats, loading };
}
