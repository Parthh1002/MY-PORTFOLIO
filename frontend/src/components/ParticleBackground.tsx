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

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    /* ── Config ───────────────────────────────────────── */
    const COUNT        = Math.min(100, Math.floor((W * H) / 14000));
    const MAX_SPEED    = 0.28;   // very slow drift
    const CONNECT_DIST = 130;    // px — when to draw connecting line
    const MOUSE_REPEL  = 110;    // px — mouse repulsion radius

    /* ── Init particles ────────────────────────────────── */
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x:          Math.random() * W,
      y:          Math.random() * H,
      vx:         (Math.random() - 0.5) * MAX_SPEED * 2,
      vy:         (Math.random() - 0.5) * MAX_SPEED * 2,
      radius:     Math.random() * 1.6 + 0.5,
      opacity:    Math.random(),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
    }));

    /* ── Draw loop ────────────────────────────────────── */
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      /* Update + draw each particle */
      for (const p of particles) {
        /* Slow pulse opacity */
        p.opacity += 0.003 * p.opacityDir;
        if (p.opacity >= 1)   { p.opacity = 1;   p.opacityDir = -1; }
        if (p.opacity <= 0.1) { p.opacity = 0.1; p.opacityDir =  1; }

        /* Mouse repulsion */
        const dx = p.x - mx;
        const dy = p.y - my;
        const distMouse = Math.sqrt(dx * dx + dy * dy);
        if (distMouse < MOUSE_REPEL && distMouse > 0) {
          const force = (MOUSE_REPEL - distMouse) / MOUSE_REPEL;
          p.vx += (dx / distMouse) * force * 0.04;
          p.vy += (dy / distMouse) * force * 0.04;
        }

        /* Clamp velocity */
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED * 2) {
          p.vx = (p.vx / speed) * MAX_SPEED * 2;
          p.vy = (p.vy / speed) * MAX_SPEED * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        /* Wrap edges */
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        /* Draw dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.7})`;
        ctx.fill();
      }

      /* Draw connecting lines */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.18;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    /* ── Resize ─────────────────────────────────────── */
    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    /* ── Mouse track ─────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize",      onResize);
    window.addEventListener("mousemove",   onMouseMove);
    window.addEventListener("mouseleave",  onMouseLeave);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize",     onResize);
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

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
        opacity: 0.9,
      }}
    />
  );
}
