import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaAdjust, FaCog } from "react-icons/fa";

type ThemeMode = "dark" | "aurora" | "light";

const MODES: { id: ThemeMode; icon: JSX.Element; label: string }[] = [
  { id: "light",  icon: <FaSun size={14} />,    label: "Light"  },
  { id: "dark",   icon: <FaMoon size={14} />,   label: "Dark"   },
  { id: "aurora", icon: <FaAdjust size={14} />, label: "Aurora" },
];

const ACCENTS = [
  { id: "blue",   color: "#6e7bff", label: "Blue"   },
  { id: "teal",   color: "#14b8a6", label: "Teal"   },
  { id: "violet", color: "#8b5cf6", label: "Violet" },
  { id: "rose",   color: "#f43f5e", label: "Rose"   },
  { id: "amber",  color: "#f59e0b", label: "Amber"  },
];

interface Props {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
}

export default function ThemeSwitcher({ theme, setTheme }: Props) {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState("blue");

  const applyAccent = (id: string, color: string) => {
    setAccent(id);
    document.documentElement.style.setProperty("--accent-primary", color);
    document.documentElement.style.setProperty("--accent-emphasis", color);
    document.documentElement.style.setProperty("--a-500", color);
    document.documentElement.style.setProperty("--fg-2", `color-mix(in oklab, ${color} 25%, #e2e8f0)`);
    document.documentElement.style.setProperty("--fg-3", `color-mix(in oklab, ${color} 15%, #94a3b8)`);
    // Also update subtle derived values
    document.documentElement.style.setProperty(
      "--accent-primary-rgb",
      hexToRgb(color)
    );
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
            {/* Mode row */}
            <div className="ts-modes">
              {MODES.map(m => (
                <button
                  key={m.id}
                  className={`ts-mode-btn${theme === m.id ? " ts-mode-active" : ""}`}
                  onClick={() => setTheme(m.id)}
                  title={m.label}
                >
                  {m.icon}
                </button>
              ))}
            </div>

            {/* Accent colour row */}
            <div className="ts-accents">
              {ACCENTS.map(a => (
                <button
                  key={a.id}
                  className={`ts-accent-dot${accent === a.id ? " ts-accent-active" : ""}`}
                  style={{ background: a.color }}
                  onClick={() => applyAccent(a.id, a.color)}
                  title={a.label}
                />
              ))}
            </div>

            {/* Footer label */}
            <div className="ts-footer">
              <FaCog size={11} style={{ opacity: 0.4 }} />
              <span>Appearance</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed pill trigger */}
      <button
        className="ts-pill"
        onClick={() => setOpen(o => !o)}
        title="Change theme"
        aria-label="Open theme switcher"
      >
        <FaCog size={18} />
      </button>
    </div>
  );
}

// Helper: hex → "r, g, b" string
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "110, 123, 255";
}
