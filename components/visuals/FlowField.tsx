/**
 * FlowField — flowing, animated trade-route lines ("the loom").
 * Decorative SVG with animated dash offsets. Evokes the elements / trade
 * routes flowing across the world. Pure CSS animation, no JS.
 */
export default function FlowField({ className = "" }: { className?: string }) {
  const lines = [
    { d: "M-50 140 C 300 40, 700 260, 1100 120 S 1600 60, 2050 180", c: "#2563EB", o: 0.5, w: 1.5, dur: "9s" },
    { d: "M-50 220 C 350 320, 760 120, 1150 240 S 1650 320, 2050 200", c: "#6b6bff", o: 0.4, w: 1.2, dur: "12s" },
    { d: "M-50 80 C 320 160, 720 -20, 1120 90 S 1620 160, 2050 60", c: "#FF5F5F", o: 0.45, w: 1.3, dur: "11s" },
    { d: "M-50 300 C 360 220, 780 360, 1180 280 S 1680 220, 2050 320", c: "#2563EB", o: 0.3, w: 1, dur: "14s" },
  ];
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 2000 360"
      preserveAspectRatio="xMidYMid slice"
    >
      {lines.map((l, i) => (
        <path
          key={i}
          d={l.d}
          fill="none"
          stroke={l.c}
          strokeOpacity={l.o}
          strokeWidth={l.w}
          strokeDasharray="14 22"
          style={{ animation: `dash-flow ${l.dur} linear infinite` }}
        />
      ))}
    </svg>
  );
}
