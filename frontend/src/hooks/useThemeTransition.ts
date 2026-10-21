/**
 * useThemeTransition.ts
 * ---------------------
 * Provides a butter-smooth, cinematic circular-ripple theme transition.
 *
 * Architecture (High Cohesion / Low Coupling):
 *   - Encapsulates ALL transition logic in one hook.
 *   - The caller only supplies: current theme, a setter, and a trigger element ref.
 *   - Uses View Transition API when available (Chromium 111+), falls back to
 *     a CSS clip-path circle-expand overlay on older browsers.
 *
 * Animation: A circle grows from the toggle button's center out to every corner,
 * revealing the new theme underneath — exactly like Linear / Vercel / Arc Browser.
 */

import { useCallback, useRef } from "react";
import type { ThemeMode } from "../components/ThemeSwitcher";

type TransitionFn = (
  newTheme: ThemeMode,
  triggerEl: HTMLElement | null
) => void;

interface UseThemeTransitionReturn {
  triggerTransition: TransitionFn;
  /** Attach to the overlay div rendered in the consuming component */
  overlayRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Calculate the radius needed so a circle centred at (x,y)
 * fully covers every corner of the viewport.
 */
function maxRadius(x: number, y: number): number {
  const { innerWidth: W, innerHeight: H } = window;
  return Math.hypot(Math.max(x, W - x), Math.max(y, H - y));
}

/**
 * Apply new theme to DOM immediately (colour tokens, data-theme attr).
 * Called inside the transition so the "new" page is visible
 * when the clip-path expands.
 */
function applyThemeToDom(newTheme: ThemeMode) {
  document.documentElement.setAttribute("data-theme", newTheme);
  document.body.setAttribute("data-theme", newTheme);
  localStorage.setItem("portfolio_theme", newTheme);
}

export function useThemeTransition(
  setTheme: (t: ThemeMode) => void
): UseThemeTransitionReturn {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  // Guard: prevent double-firing during an ongoing animation
  const animatingRef = useRef(false);

  const triggerTransition: TransitionFn = useCallback(
    (newTheme, triggerEl) => {
      if (animatingRef.current) return;

      // Origin coordinates — centre of the trigger button, or screen centre
      const rect = triggerEl?.getBoundingClientRect();
      const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      const r = maxRadius(x, y);

      // ── Path 1: View Transition API (Chrome 111+, Edge 111+) ─────────────
      // Gives true paint-level isolation — zero jank, even at 60fps on low-end
      if (
        "startViewTransition" in document &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        // Write the CSS custom props so the pseudo-elements know origin + radius
        const root = document.documentElement;
        root.style.setProperty("--vt-x", `${x}px`);
        root.style.setProperty("--vt-y", `${y}px`);
        root.style.setProperty("--vt-r", `${r}px`);

        animatingRef.current = true;

        (document as any)
          .startViewTransition(() => {
            applyThemeToDom(newTheme);
            setTheme(newTheme);
          })
          .finished.finally(() => {
            animatingRef.current = false;
          });

        return;
      }

      // ── Path 2: CSS clip-path overlay fallback ────────────────────────────
      const overlay = overlayRef.current;
      if (!overlay) {
        // Bare minimum: just swap the theme
        applyThemeToDom(newTheme);
        setTheme(newTheme);
        return;
      }

      animatingRef.current = true;

      // Snapshot the current page as a frozen background
      // (We just use opacity so the overlay "reveals" the new theme)
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 99999;
        pointer-events: none;
        background: var(--bg-canvas, #0b0f1a);
        clip-path: circle(0px at ${x}px ${y}px);
        will-change: clip-path;
      `;
      overlay.style.display = "block";

      // Apply new theme BEFORE we animate so the overlay reveals the correct colours
      applyThemeToDom(newTheme);
      setTheme(newTheme);

      // Give the browser one frame to repaint the new theme behind the overlay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          overlay.style.transition =
            "clip-path 600ms cubic-bezier(0.22, 1, 0.36, 1)";
          overlay.style.clipPath = `circle(${r}px at ${x}px ${y}px)`;

          const cleanup = () => {
            overlay.style.display = "none";
            overlay.style.transition = "";
            overlay.style.clipPath = "";
            animatingRef.current = false;
            overlay.removeEventListener("transitionend", cleanup);
          };

          overlay.addEventListener("transitionend", cleanup, { once: true });

          // Safety: always clean up even if transitionend doesn't fire
          setTimeout(cleanup, 750);
        });
      });
    },
    [setTheme]
  );

  return { triggerTransition, overlayRef };
}
