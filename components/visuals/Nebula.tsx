/**
 * Nebula — soft grey radial glows (with the faintest brand tints) on white.
 * Organic, edgeless atmosphere — the "galaxy" depth behind the constellation.
 * Pure CSS radial gradients, no hard boundaries.
 */
export default function Nebula({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(108,118,135,0.22), rgba(108,118,135,0) 70%)" }}
      />
      <div
        className="absolute right-[8%] top-[12%] h-[55%] w-[45%] blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(37,99,235,0.10), rgba(37,99,235,0) 70%)" }}
      />
      <div
        className="absolute bottom-[8%] left-[10%] h-[55%] w-[45%] blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(255,95,95,0.08), rgba(255,95,95,0) 70%)" }}
      />
    </div>
  );
}
