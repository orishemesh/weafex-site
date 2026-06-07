/**
 * Aurora — drifting blurred gradient blobs for dark sections.
 * Pure CSS, decorative. Sits behind content (place inside a relative parent).
 */
export default function Aurora({
  className = "",
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: intensity }}
    >
      <div
        className="absolute -left-[10%] top-[-20%] h-[55vmax] w-[55vmax] rounded-full blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.55), transparent 65%)",
          animation: "aurora-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-[-12%] top-[10%] h-[48vmax] w-[48vmax] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(255,95,95,0.45), transparent 65%)",
          animation: "aurora-drift 26s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-[-25%] left-[30%] h-[45vmax] w-[45vmax] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(107,107,255,0.4), transparent 65%)",
          animation: "aurora-drift 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}
