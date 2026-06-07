// Lightweight GA4 event helper. window.gtag is defined by the inline
// "gtag-init" script in app/[lang]/layout.tsx; the Google Tag (loaded via GTM,
// G-2T6FFN9PTP) forwards these events to GA4.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}

export {};
