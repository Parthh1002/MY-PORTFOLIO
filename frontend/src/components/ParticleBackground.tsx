import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  opacityDir: number;
}

interface ParticleBackgroundProps {
  theme?: string;
}

export default function ParticleBackground({ theme }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Device performance classification
    const isTouch = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth < 768 || (isTouch && window.innerWidth < 1024);
    const isLowEnd = (typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4) || isMobile;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    /* ── Adaptive Config ───────────────────────────────── */
    // Drastically reduce particle count on mobile/low-end devices to keep 60-120fps
    const COUNT = prefersReducedMotion
      ? 16
      : isMobile
      ? Math.min(24, Math.floor((W * H) / 32000))
      : isLowEnd
      ? 35
      : Math.min(48, Math.floor((W * H) / 22000));

    const MAX_SPEED       = isMobile ? 0.2 : 0.26;
    const CONNECT_DIST    = isMobile ? 70 : 110;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
    const MOUSE_REPEL     = 100;
    const MOUSE_REPEL_SQ  = MOUSE_REPEL * MOUSE_REPEL;
    const ENABLE_LINES    = !isMobile && !prefersReducedMotion;

    /* ── Init particles ────────────────────────────────── */
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:          Math.random() * W,
      y:          Math.random() * H,
      vx:         (Math.random() - 0.5) * MAX_SPEED * 2,
      vy:         (Math.random() - 0.5) * MAX_SPEED * 2,
      radius:     Math.random() * 1.4 + 0.6,
      opacity:    Math.random() * 0.7 + 0.3,
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    let isRunning = true;

    /* ── Draw loop ────────────────────────────────────── */
    const draw = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = !isTouch && mx > -500;

      const currentTheme =
        theme || document.documentElement.getAttribute("data-theme") || "dark";
      const isLight = currentTheme === "light";

      /* Update + draw dots */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Slow pulse opacity
          p.opacity += 0.0025 * p.opacityDir;
          if (p.opacity >= 0.95) { p.opacity = 0.95; p.opacityDir = -1; }
          if (p.opacity <= 0.15) { p.opacity = 0.15; p.opacityDir =  1; }

          // Mouse repulsion (desktop only, squared distance test first)
          if (hasMouse) {
            const dx = p.x - mx;
            const dy = p.y - my;
            const distSq = dx * dx + dy * dy;
            if (distSq < MOUSE_REPEL_SQ && distSq > 0) {
              const distMouse = Math.sqrt(distSq);
              const force = (MOUSE_REPEL - distMouse) / MOUSE_REPEL;
              p.vx += (dx / distMouse) * force * 0.035;
              p.vy += (dy / distMouse) * force * 0.035;
            }
          }

          p.x += p.vx;
          p.y += p.vy;

          // Wrap edges
          if (p.x < -10) p.x = W + 10;
          if (p.x > W + 10) p.x = -10;
          if (p.y < -10) p.y = H + 10;
          if (p.y > H + 10) p.y = -10;
        }

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isLight
          ? `rgba(71, 85, 105, ${p.opacity * 0.35})`
          : `rgba(255, 255, 255, ${p.opacity * 0.6})`;
        ctx.fill();
      }

      /* Draw connecting lines (Batched single path stroke for 10x faster GPU execution) */
      if (ENABLE_LINES) {
        ctx.beginPath();
        ctx.strokeStyle = isLight
          ? "rgba(100, 116, 139, 0.12)"
          : "rgba(255, 255, 255, 0.12)";
        ctx.lineWidth = 0.55;

        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          for (let j = i + 1; j < particles.length; j++) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distSq = dx * dx + dy * dy;

            // Fast check before doing any expensive calculations
            if (distSq < CONNECT_DIST_SQ) {
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
            }
          }
        }
        ctx.stroke();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    /* ── Resize with debounce ────────────────────────── */
    let resizeTimer: number;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        W = window.innerWidth;
        H = window.innerHeight;
        canvas.width  = W;
        canvas.height = H;
      }, 150);
    };

    /* ── Mouse track (desktop only) ──────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    /* ── Tab visibility handling (0% CPU when tab hidden) ── */
    const onVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        cancelAnimationFrame(frameRef.current);
      } else {
        if (!isRunning) {
          isRunning = true;
          frameRef.current = requestAnimationFrame(draw);
        }
      }
    };

    window.addEventListener("resize", onResize, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    if (!isTouch) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    }

    return () => {
      isRunning = false;
      clearTimeout(resizeTimer);
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (!isTouch) {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.85,
        transform: "translateZ(0)", // Force composite layer
        willChange: "transform",
      }}
    />
  );
}
