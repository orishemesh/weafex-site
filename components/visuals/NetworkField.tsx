"use client";

import { useEffect, useRef } from "react";

type Variant = "connected" | "fragmented";

/**
 * NetworkField — the brand's signature visual.
 * - "connected": one living web; nodes link freely and pulses of activity flow.
 * - "fragmented": isolated clusters that link only within themselves (the closed market).
 * `dark` tunes colors for dark backgrounds. Canvas, reduced-motion aware, pauses offscreen.
 */
export default function NetworkField({
  className = "",
  variant = "connected",
  dark = false,
  tone = "blue",
}: {
  className?: string;
  variant?: Variant;
  dark?: boolean;
  tone?: "blue" | "muted";
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1, 2);
    const fragmented = variant === "fragmented";
    const MAXD = fragmented ? 95 : 155;

    const lineRGB = dark ? "255,255,255" : tone === "muted" ? "140,149,163" : "37,99,235";
    const nodeBase = dark
      ? "rgba(255,255,255,0.5)"
      : tone === "muted"
      ? "rgba(96,105,120,0.5)"
      : "rgba(17,24,39,0.5)";

    type Node = { x: number; y: number; vx: number; vy: number; coral: boolean; cx: number; cy: number; cl: number };
    type Pulse = { ax: number; ay: number; bx: number; by: number; t: number; sp: number; coral: boolean };
    let w = 0, h = 0, raf = 0, active = true;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let mcx: number | null = null, mcy: number | null = null;
    const onMove = (e: MouseEvent) => { mcx = e.clientX; mcy = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });

    function build() {
      w = parent!.clientWidth;
      h = parent!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = [];
      pulses = [];

      if (fragmented) {
        const clusters = Math.max(4, Math.min(9, Math.round(w / 230)));
        for (let ci = 0; ci < clusters; ci++) {
          const cx = 60 + Math.random() * Math.max(1, w - 120);
          const cy = 60 + Math.random() * Math.max(1, h - 120);
          const per = 3 + ((Math.random() * 3) | 0);
          for (let k = 0; k < per; k++) {
            nodes.push({
              x: cx + (Math.random() - 0.5) * 80,
              y: cy + (Math.random() - 0.5) * 80,
              vx: (Math.random() - 0.5) * 0.15,
              vy: (Math.random() - 0.5) * 0.15,
              coral: Math.random() < 0.1,
              cx, cy, cl: ci,
            });
          }
        }
      } else {
        const count = Math.max(26, Math.min(78, Math.round((w * h) / 14000)));
        for (let i = 0; i < count; i++) {
          nodes.push({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
            coral: Math.random() < 0.15, cx: 0, cy: 0, cl: -1,
          });
        }
      }
    }

    function frame() {
      if (!active) { raf = 0; return; }
      ctx!.clearRect(0, 0, w, h);

      if (!reduce) {
        for (const n of nodes) {
          if (fragmented) {
            n.vx += (n.cx - n.x) * 0.0009;
            n.vy += (n.cy - n.y) * 0.0009;
            n.vx *= 0.985; n.vy *= 0.985;
            n.x += n.vx; n.y += n.vy;
          } else {
            n.x += n.vx; n.y += n.vy;
            if (n.x < 0 || n.x > w) n.vx *= -1;
            if (n.y < 0 || n.y > h) n.vy *= -1;
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          if (fragmented && a.cl !== b.cl) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < MAXD) {
            const o = (1 - d / MAXD) * (fragmented ? 0.32 : 0.4);
            ctx!.strokeStyle = `rgba(${lineRGB},${o})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.fillStyle = n.coral ? "rgba(255,95,95,0.95)" : nodeBase;
        ctx!.arc(n.x, n.y, n.coral ? 2.8 : 1.9, 0, Math.PI * 2);
        ctx!.fill();
      }

      // "you become a node": nodes near the pointer reach out and connect to it
      if (mcx !== null && mcy !== null) {
        const rect = canvas!.getBoundingClientRect();
        const mx = mcx - rect.left, my = mcy - rect.top;
        if (mx >= 0 && mx <= w && my >= 0 && my <= h) {
          const CURD = 215;
          for (const n of nodes) {
            const d = Math.hypot(n.x - mx, n.y - my);
            if (d < CURD) {
              const o = (1 - d / CURD) * 0.65;
              ctx!.strokeStyle = `rgba(${lineRGB},${o})`;
              ctx!.lineWidth = 1.1;
              ctx!.beginPath(); ctx!.moveTo(mx, my); ctx!.lineTo(n.x, n.y); ctx!.stroke();
              ctx!.beginPath();
              ctx!.fillStyle = `rgba(${lineRGB},${o})`;
              ctx!.arc(n.x, n.y, 2.4, 0, Math.PI * 2);
              ctx!.fill();
            }
          }
          ctx!.beginPath();
          ctx!.fillStyle = "rgba(255,95,95,0.9)";
          ctx!.arc(mx, my, 3, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      // pulses only in the connected web
      if (!reduce && !fragmented) {
        if (pulses.length < 7 && Math.random() < 0.05 && nodes.length > 1) {
          const a = nodes[(Math.random() * nodes.length) | 0];
          let best = -1, bd = MAXD;
          for (let k = 0; k < nodes.length; k++) {
            const b = nodes[k];
            if (b === a) continue;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < bd) { bd = d; best = k; }
          }
          if (best >= 0) {
            const b = nodes[best];
            pulses.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, t: 0, sp: 0.012 + Math.random() * 0.016, coral: Math.random() < 0.5 });
          }
        }
        for (const p of pulses) {
          p.t += p.sp;
          const x = p.ax + (p.bx - p.ax) * p.t;
          const y = p.ay + (p.by - p.ay) * p.t;
          ctx!.beginPath();
          ctx!.fillStyle = p.coral ? "rgba(255,95,95,1)" : `rgba(${lineRGB},1)`;
          ctx!.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx!.fill();
        }
        pulses = pulses.filter((p) => p.t < 1);
      }

      raf = requestAnimationFrame(frame);
    }

    build();
    frame();
    const ro = new ResizeObserver(build);
    ro.observe(parent);
    const io = new IntersectionObserver(
      ([e]) => { active = e.isIntersecting; if (active && !raf) raf = requestAnimationFrame(frame); },
      { threshold: 0 }
    );
    io.observe(parent);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [variant, dark, tone]);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
