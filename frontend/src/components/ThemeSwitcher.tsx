import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCog } from "react-icons/fa";

export type ThemeMode = "dark" | "aurora" | "light";

// Richer, more distinctive icons for each mode
const ModeIcons: Record<ThemeMode, React.ReactNode> = {
  light: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  dark: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  aurora: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2L8 8H2l4.5 4-2 6 7.5-4 7.5 4-2-6L22 8h-6L12 2z"/>
    </svg>
  ),
};

const MODES: { id: ThemeMode; label: string }[] = [
  { id: "light",  label: "Light"  },
  { id: "dark",   label: "Dark"   },
  { id: "aurora", label: "Aurora" },
];

export const ACCENTS = [
  { id: "blue",   dark: "#6366f1", light: "#4338ca", label: "Sapphire Indigo" },
  { id: "teal",   dark: "#14b8a6", light: "#0f766e", label: "Emerald Teal"    },
  { id: "violet", dark: "#8b5cf6", light: "#6d28d9", label: "Royal Amethyst"  },
  { id: "rose",   dark: "#f43f5e", light: "#be123c", label: "Crimson Rose"    },
  { id: "amber",  dark: "#f59e0b", light: "#b45309", label: "Executive Amber" },
];

interface Props {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}

export default function ThemeSwitcher({ theme, setTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState(() => {
    return localStorage.getItem("portfolio_accent") || "blue";
  });

  const applyColors = useCallback((accentId: string, currentTheme: ThemeMode) => {
    const found = ACCENTS.find((a) => a.id === accentId) || ACCENTS[0];
    const isLight = currentTheme === "light";
    const color = isLight ? found.light : found.dark;
    const rgb = hexToRgb(color);

    const root = document.documentElement;
    root.setAttribute("data-theme", currentTheme);
    document.body.setAttribute("data-theme", currentTheme);

    // Accent variable sync
    root.style.setProperty("--accent-primary", color);
    root.style.setProperty("--accent-emphasis", color);
    root.style.setProperty("--accent", color);
    root.style.setProperty("--a-500", color);
    root.style.setProperty("--a-rgb", rgb);
    root.style.setProperty("--accent-primary-rgb", rgb);
    root.style.setProperty("--accent-surface", `rgba(${rgb}, ${isLight ? 0.06 : 0.1})`);
    root.style.setProperty("--accent-muted", `rgba(${rgb}, ${isLight ? 0.12 : 0.18})`);
    root.style.setProperty("--accent-border", `rgba(${rgb}, ${isLight ? 0.28 : 0.35})`);
    root.style.setProperty("--selection-bg", `rgba(${rgb}, ${isLight ? 0.18 : 0.28})`);

    // Foreground typography readability guarantee
    if (isLight) {
      root.style.setProperty("--fg-1", "#090d16");
      root.style.setProperty("--fg-2", "#1e293b");
      root.style.setProperty("--fg-3", "#475569");
      root.style.setProperty("--fg-4", "#64748b");
      root.style.setProperty("--bg-canvas", "#f8f9fc");
      root.style.setProperty("--bg-surface", "#ffffff");
      root.style.setProperty("--bg-elevated", "#ffffff");
      root.style.setProperty("--border-default", "rgba(15, 23, 42, 0.1)");
      root.style.setProperty("--border-subtle", "rgba(15, 23, 42, 0.06)");
      root.style.setProperty("--border-strong", "rgba(15, 23, 42, 0.18)");
    } else {
      root.style.setProperty("--fg-1", "#f8fafc");
      root.style.setProperty("--fg-2", `color-mix(in oklab, ${color} 15%, #cbd5e1)`);
      root.style.setProperty("--fg-3", `color-mix(in oklab, ${color} 10%, #94a3b8)`);
      root.style.removeProperty("--fg-4");
      root.style.removeProperty("--bg-canvas");
      root.style.removeProperty("--bg-surface");
      root.style.removeProperty("--bg-elevated");
      root.style.removeProperty("--border-default");
      root.style.removeProperty("--border-subtle");
      root.style.removeProperty("--border-strong");
    }
  }, []);

  // Sync on initial load and whenever theme or accent changes
  useEffect(() => {
    applyColors(accent, theme);
  }, [accent, theme, applyColors]);

  const handleSelectMode = (m: ThemeMode) => {
    setTheme(m);
    localStorage.setItem("portfolio_theme", m);
    applyColors(accent, m);
  };

  const handleSelectAccent = (id: string) => {
    setAccent(id);
    localStorage.setItem("portfolio_accent", id);
    applyColors(id, theme);
  };

  const currentAccentColor = (a: typeof ACCENTS[0]) => {
    return theme === "light" ? a.light : a.dark;
  };

  return (
    <div className="ts-wrap">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            className="ts-panel"
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Theme Mode Toggles */}
            <div className="ts-modes">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  className={`ts-mode-btn${theme === m.id ? " ts-mode-active" : ""}`}
                  onClick={() => handleSelectMode(m.id)}
                  title={`${m.label} Mode`}
                  type="button"
                >
                  <span className="ts-mode-icon">{ModeIcons[m.id]}</span>
                  <span className="ts-mode-label">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Accent Colors Palette */}
            <div className="ts-accents">
              {ACCENTS.map((a) => (
                <button
                  key={a.id}
                  className={`ts-accent-dot${accent === a.id ? " ts-accent-active" : ""}`}
                  style={{ background: currentAccentColor(a) }}
                  onClick={() => handleSelectAccent(a.id)}
                  title={a.label}
                  type="button"
                />
              ))}
            </div>

            {/* Footer label */}
            <div className="ts-footer">
              <FaCog size={11} style={{ opacity: 0.5 }} />
              <span>Palette &amp; Appearance</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Gear Trigger Button */}
      <button
        className="ts-pill"
        onClick={() => setOpen((o) => !o)}
        title="Customize Theme & Palette"
        aria-label="Open appearance settings"
        type="button"
      >
        <FaCog size={17} className={open ? "ts-gear-spin" : ""} />
      </button>
    </div>
  );
}

// Helper: hex → "r, g, b" string
function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}
