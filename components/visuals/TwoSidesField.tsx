"use client";

import { useEffect, useRef } from "react";

/**
 * TwoSidesField — importers (one cluster) and exporters (the other) connect
 * *through* a central Weafex hub; trade pulses travel side → hub → side.
 * The mission, made literal. Canvas, light tone, pauses offscreen.
 */
export default function TwoSidesField({ className = "" }: { className?: string }) {
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

    type N = { x: number; y: number; vx: number; vy: number; cx: number; cy: number; side: number };
    type P = { side: number; idx: number; t: number; sp: number };
    let w = 0, h = 0, raf = 0, active = true;
    let nodes: N[] = [];
    let pulses: P[] = [];
    let hx = 0, hy = 0;

    function build() {
      w = parent!.clientWidth; h = parent!.clientHeight;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = w + "px"; canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      hx = w / 2; hy = h / 2;
      nodes = []; pulses = [];
      const spread = Math.min(w * 0.16, 150);
      const make = (cx: number, cy: number, side: number, n: number) => {
        for (let k = 0; k < n; k++) {
          nodes.push({
            x: cx + (Math.random() - 0.5) * spread * 1.6,
            y: cy + (Math.random() - 0.5) * h * 0.55,
            vx: 0, vy: 0, cx, cy, side,
          });
        }
      };
      make(w * 0.82, h * 0.5, 0, 7); // importers (right)
      make(w * 0.18, h * 0.5, 1, 7); // exporters (left)
    }

    function frame() {
      if (!active) { raf = 0; return; }
      ctx!.clearRect(0, 0, w, h);

      if (!reduce) {
        for (const n of nodes) {
          n.vx += ((n.cx + (Math.random() - 0.5) * 90) - n.x) * 0.0006;
          n.vy += ((n.cy + (Math.random() - 0.5) * h * 0.5) - n.y) * 0.0006;
          n.vx *= 0.96; n.vy *= 0.96;
          n.x += n.vx; n.y += n.vy;
        }
      }

      // lines from every node to the central hub
      for (const n of nodes) {
        const d = Math.hypot(n.x - hx, n.y - hy);
        const o = Math.max(0, 1 - d / (w * 0.6)) * 0.22;
        ctx!.strokeStyle = `rgba(140,149,163,${o})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath(); ctx!.moveTo(n.x, n.y); ctx!.lineTo(hx, hy); ctx!.stroke();
      }

      // nodes
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.fillStyle = n.side === 0 ? "rgba(37,99,235,0.65)" : "rgba(17,24,39,0.45)";
        ctx!.arc(n.x, n.y, 2.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      // pulses: side → hub → other side
      if (!reduce) {
        if (pulses.length < 5 && Math.random() < 0.06) {
          const side = Math.random() < 0.5 ? 0 : 1;
          const pool = nodes.filter((n) => n.side === side);
          pulses.push({ side, idx: nodes.indexOf(pool[(Math.random() * pool.length) | 0]), t: 0, sp: 0.011 + Math.random() * 0.01 });
        }
        for (const p of pulses) {
          p.t += p.sp;
          const start = nodes[p.idx];
          let x: number, y: number;
          if (p.t < 1) { x = start.x + (hx - start.x) * p.t; y = start.y + (hy - start.y) * p.t; }
          else {
            const other = nodes.find((n) => n.side !== start.side)!;
            const tt = p.t - 1;
            x = hx + (other.x - hx) * tt; y = hy + (other.y - hy) * tt;
          }
          ctx!.beginPath();
          ctx!.fillStyle = "rgba(255,95,95,0.95)";
          ctx!.arc(x, y, 2.6, 0, Math.PI * 2);
          ctx!.fill();
        }
        pulses = pulses.filter((p) => p.t < 2);
      }

      // central Weafex hub
      const g = ctx!.createRadialGradient(hx, hy, 0, hx, hy, 46);
      g.addColorStop(0, "rgba(255,95,95,0.28)");
      g.addColorStop(1, "rgba(255,95,95,0)");
      ctx!.fillStyle = g;
      ctx!.beginPath(); ctx!.arc(hx, hy, 46, 0, Math.PI * 2); ctx!.fill();
      ctx!.beginPath(); ctx!.fillStyle = "#FF5F5F"; ctx!.arc(hx, hy, 6, 0, Math.PI * 2); ctx!.fill();
      ctx!.beginPath(); ctx!.fillStyle = "rgba(255,255,255,0.95)"; ctx!.arc(hx, hy, 2.4, 0, Math.PI * 2); ctx!.fill();

      raf = requestAnimationFrame(frame);
    }

    build(); frame();
    const ro = new ResizeObserver(build); ro.observe(parent);
    const io = new IntersectionObserver(
      ([e]) => { active = e.isIntersecting; if (active && !raf) raf = requestAnimationFrame(frame); },
      { threshold: 0 }
    );
    io.observe(parent);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`} />;
}
