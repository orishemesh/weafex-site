"use client";

// Footer control that re-opens the cookie-consent banner so users can change
// or withdraw consent at any time. SSR-safe: dispatches a window custom event
// that CookieConsent listens for.
export default function CookieSettingsButton({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("weafex:open-consent"));
      }}
    >
      {label}
    </button>
  );
}
