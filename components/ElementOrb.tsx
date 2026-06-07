/**
 * ElementOrb — the signature Weafex visual.
 * A glowing blue→coral sphere that evokes the iOS app's 3D globe and the
 * "flow of elements" idea, without the cost of a real WebGL globe.
 * Pure CSS/SVG, decorative only.
 */
export default function ElementOrb({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none relative aspect-square ${className}`}
      aria-hidden="true"
    >
      {/* soft outer glow */}
      <div className="absolute inset-0 rounded-full bg-weafex-blue/30 blur-[90px]" />
      <div className="absolute inset-[12%] rounded-full bg-weafex-coral/25 blur-[80px]" />

      {/* slow rotating conic ring */}
      <div className="absolute inset-[6%] animate-spin-slow rounded-full opacity-70 [background:conic-gradient(from_0deg,transparent,rgba(37,99,235,0.55),transparent_40%,rgba(255,95,95,0.55),transparent)] [mask:radial-gradient(farthest-side,transparent_calc(100%-2px),#000_calc(100%-1px))]" />

      {/* the sphere */}
      <div className="absolute inset-[14%] animate-float-slow rounded-full shadow-[0_40px_120px_-20px_rgba(37,99,235,0.6)] [background:radial-gradient(circle_at_32%_28%,#8ab0ff_0%,#2563eb_38%,#1b3aa6_62%,#ff5f5f_120%)]">
        {/* highlight */}
        <div className="absolute left-[18%] top-[14%] h-[28%] w-[28%] rounded-full bg-white/40 blur-md" />
        {/* meridian / latitude lines for a subtle globe feel */}
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full opacity-30 mix-blend-screen"
        >
          <defs>
            <clipPath id="orbClip">
              <circle cx="100" cy="100" r="100" />
            </clipPath>
          </defs>
          <g
            clipPath="url(#orbClip)"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.7"
          >
            <ellipse cx="100" cy="100" rx="100" ry="34" />
            <ellipse cx="100" cy="100" rx="100" ry="66" />
            <ellipse cx="100" cy="100" rx="34" ry="100" />
            <ellipse cx="100" cy="100" rx="66" ry="100" />
            <line x1="0" y1="100" x2="200" y2="100" />
          </g>
        </svg>
      </div>
    </div>
  );
}
