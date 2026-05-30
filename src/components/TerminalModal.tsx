import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/TerminalModal.css';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  type: 'command' | 'output';
  content: string;
}

const BOOT_SEQUENCE = [
  "$ boot --developer",
  "Initializing profile...",
  "Loading projects...",
  "Connecting portfolio...",
  "Done ✓"
];

const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(false);
  const [isEasterEgg, setIsEasterEgg] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleConsoleClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state on open
      setHistory([]);
      setIsBooting(true);
      setIsEasterEgg(false);
      setInput("");
      
      let delay = 600;
      BOOT_SEQUENCE.forEach((line, index) => {
        setTimeout(() => {
          setHistory(prev => [...prev, { type: index === 0 ? 'command' : 'output', content: line }]);
          if (index === BOOT_SEQUENCE.length - 1) {
            setTimeout(() => {
              setHistory(prev => [...prev, { type: 'output', content: '----------------------------------------' }]);
              setIsBooting(false);
              setTimeout(() => inputRef.current?.focus(), 100);
            }, 600);
          }
        }, delay);
        delay += index === 0 ? 800 : 400; 
      });
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = "";

    switch (trimmed) {
      case "help":
        output = "Supported commands:\nabout, skills, projects, current_status, role, resume, contact, hackathon, coffee, clear";
        break;
      case "about":
      case "whoami":
        output = "Parth Patel\nFull Stack Developer | B.Tech Student (3rd Year)";
        break;
      case "role":
        output = "Full Stack Developer";
        break;
      case "skills":
        output = "React.js\nNode.js\nMongoDB\nExpress.js\nFirebase\nTailwind CSS\nThree.js\nAI Integration";
        break;
      case "projects":
        output = "> Smart Municipality Portal\n> Portfolio Website\n> AI Based Solutions";
        break;
      case "current_status":
        output = "Building real-world products...\nLearning every day...\nOpen for opportunities.";
        break;
      case "resume":
        output = "Click the Download Resume button on the right panel to get my CV.";
        break;
      case "contact":
        output = "Email: parthh1002@gmail.com\nOr use the Contact button on the right.";
        break;
      case "hackathon":
        output = "Participated in 2+ Hackathons building innovative AI & Web solutions.";
        break;
      case "coffee":
        output = "Error 418: I'm a teapot. (But I'd love a coffee!) ☕";
        break;
      case "clear":
        setHistory([]);
        return;
      case "sudo hire parth":
        output = "Access Granted ✓\n\nCongratulations!\nYou have unlocked a Full Stack Developer.\n\nContact:\nparthh1002@gmail.com";
        setIsEasterEgg(true);
        break;
      case "":
        return;
      default:
        output = `Command not found: ${trimmed}. Type 'help' to see available commands.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'command', content: `$ ${cmd}` },
      { type: 'output', content: output },
      { type: 'output', content: '----------------------------------------' }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isBooting) {
      processCommand(input);
      setInput("");
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="terminal-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className={`terminal-modal-container ${isEasterEgg ? 'easter-egg-glow' : ''}`}
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing if clicking inside
          >
            {/* Header */}
            <div className="terminal-header">
              <div className="terminal-dots">
                <div className="terminal-dot dot-red"></div>
                <div className="terminal-dot dot-yellow"></div>
                <div className="terminal-dot dot-green"></div>
              </div>
              <div className="terminal-title">parth@portfolio:~</div>
              <button className="terminal-close-btn" onClick={onClose}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="terminal-body">
              {/* Console */}
              <div className="terminal-console" onClick={handleConsoleClick}>
                {history.map((line, idx) => (
                  <div key={idx} className={`terminal-line ${line.type === 'command' ? 'terminal-command-echo' : 'terminal-output'}`}>
                    {line.content}
                  </div>
                ))}
                
                {!isBooting && (
                  <div className="terminal-input-row">
                    <span className="terminal-prompt">$</span>
                    <input 
                      ref={inputRef}
                      type="text" 
                      className="terminal-input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      autoFocus
                      autoComplete="off"
                      spellCheck="false"
                    />
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Sidebar */}
              <div className="terminal-sidebar">
                <div className="glass-card">
                  <div className="glass-card-title">System Status</div>
                  <div className="status-item">
                    <span>🟢</span> Available for Internship
                  </div>
                  <div className="status-item">
                    <span>⚡</span> Current Focus: Full Stack + AI
                  </div>
                  <div className="status-item">
                    <span>🚀</span> Building: Aapno Rasto
                  </div>
                </div>

                <div className="glass-card">
                  <div className="glass-card-title">Stats</div>
                  <div className="stat-row"><span>Projects Built</span><span className="stat-value">10+</span></div>
                  <div className="stat-row"><span>Tech Learned</span><span className="stat-value">15+</span></div>
                  <div className="stat-row"><span>Hackathons</span><span className="stat-value">2+</span></div>
                  <div className="stat-row"><span>Code Commits</span><span className="stat-value">500+</span></div>
                </div>

                <div className="glass-card">
                  <div className="glass-card-title">Action Center</div>
                  <a href="/resume.pdf" download="Resume.pdf" className="action-btn">Download Resume</a>
                  <a href="https://github.com/moncy1002" target="_blank" rel="noreferrer" className="action-btn">GitHub Profile</a>
                  <a href="https://linkedin.com/in/parth-patel-4841a0293/" target="_blank" rel="noreferrer" className="action-btn">LinkedIn Profile</a>
                  <a href="mailto:parthh1002@gmail.com" className="action-btn">Contact Me</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
};

export default TerminalModal;
