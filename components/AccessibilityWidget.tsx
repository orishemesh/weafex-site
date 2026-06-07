"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Accessibility widget (כלי נגישות) — required by Israeli Standard IS 5568.
 * A floating button (bottom-left, RTL) opens a toolbar that lets users adapt
 * the site: font size, high contrast, grayscale, highlighted links, a readable
 * font, and an option to stop animations. Each option toggles a class on
 * <html>; the matching override styles live in globals.css. Preferences persist
 * in localStorage. Native React — no third-party overlay service.
 */

type Prefs = {
  fontStep: number; // 0..3  → +20% per step
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  readableFont: boolean;
  stopAnimations: boolean;
};

const DEFAULT_PREFS: Prefs = {
  fontStep: 0,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  readableFont: false,
  stopAnimations: false,
};

const STORAGE_KEY = "weafex-a11y";
const MAX_FONT_STEP = 3;

function applyPrefs(p: Prefs) {
  const el = document.documentElement;
  el.classList.remove("a11y-font-1", "a11y-font-2", "a11y-font-3");
  if (p.fontStep > 0) el.classList.add(`a11y-font-${p.fontStep}`);
  el.classList.toggle("a11y-high-contrast", p.highContrast);
  el.classList.toggle("a11y-grayscale", p.grayscale);
  el.classList.toggle("a11y-highlight-links", p.highlightLinks);
  el.classList.toggle("a11y-readable-font", p.readableFont);
  el.classList.toggle("a11y-stop-animations", p.stopAnimations);
}

/* ---- minimalist inline icons (white/currentColor, thin lines) ---- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Universal accessibility symbol — human figure, arms spread, inside a circle
function AccessIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="6.4" r="1.15" fill="currentColor" stroke="none" />
      <path d="M5.5 9.2c2 .9 4.2 1.3 6.5 1.3s4.5-.4 6.5-1.3" />
      <path d="M12 10.5v4.2" />
      <path d="M9 19l3-4.3 3 4.3" />
    </svg>
  );
}

const I = {
  plus: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  minus: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M5 12h14" />
    </svg>
  ),
  contrast: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18" />
      <path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" />
    </svg>
  ),
  grayscale: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <circle cx="9" cy="12" r="6" />
      <circle cx="15" cy="12" r="6" />
    </svg>
  ),
  link: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M10 13a4 4 0 0 0 5.66 0l2-2a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M14 11a4 4 0 0 0-5.66 0l-2 2a4 4 0 1 0 5.66 5.66l1-1" />
    </svg>
  ),
  type: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M5 6h14M9 6v13M15 6v13" />
    </svg>
  ),
  pause: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M9 5v14M15 5v14" />
    </svg>
  ),
  reset: (
    <svg width="20" height="20" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v4h4" />
    </svg>
  ),
  close: (
    <svg width="22" height="22" viewBox="0 0 24 24" {...stroke} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
};

export default function AccessibilityWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULT_PREFS);

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Load saved prefs once, on the client.
  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = { ...DEFAULT_PREFS, ...JSON.parse(raw) } as Prefs;
        setPrefs(saved);
        applyPrefs(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist + apply whenever prefs change (after mount).
  useEffect(() => {
    if (!mounted) return;
    applyPrefs(prefs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs, mounted]);

  const update = useCallback((patch: Partial<Prefs>) => {
    setPrefs((p) => ({ ...p, ...patch }));
  }, []);

  const reset = useCallback(() => setPrefs(DEFAULT_PREFS), []);

  // Escape to close + focus trap while the panel is open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into the panel.
    const t = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("button")
        ?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
    };
  }, [open]);

  if (!mounted) return null;

  const fontPct = prefs.fontStep > 0 ? `+${prefs.fontStep * 20}%` : "100%";

  return (
    <div dir="rtl">
      {/* Floating trigger button — bottom-left (natural side on an RTL site) */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="פתח כלי נגישות"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="a11y-fab"
      >
        <AccessIcon />
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="כלי נגישות"
          className="a11y-panel"
        >
          <div className="a11y-panel-head">
            <span className="a11y-panel-title">כלי נגישות</span>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="סגור כלי נגישות"
              className="a11y-x"
            >
              {I.close}
            </button>
          </div>

          <div className="a11y-grid">
            <button
              type="button"
              className="a11y-item"
              onClick={() =>
                update({ fontStep: Math.min(MAX_FONT_STEP, prefs.fontStep + 1) })
              }
              disabled={prefs.fontStep >= MAX_FONT_STEP}
              aria-label={`הגדל טקסט (${fontPct})`}
            >
              {I.plus}
              <span>הגדל טקסט</span>
            </button>

            <button
              type="button"
              className="a11y-item"
              onClick={() => update({ fontStep: Math.max(0, prefs.fontStep - 1) })}
              disabled={prefs.fontStep <= 0}
              aria-label={`הקטן טקסט (${fontPct})`}
            >
              {I.minus}
              <span>הקטן טקסט</span>
            </button>

            <button
              type="button"
              className={`a11y-item ${prefs.highContrast ? "is-active" : ""}`}
              aria-pressed={prefs.highContrast}
              onClick={() => update({ highContrast: !prefs.highContrast })}
            >
              {I.contrast}
              <span>ניגודיות גבוהה</span>
            </button>

            <button
              type="button"
              className={`a11y-item ${prefs.grayscale ? "is-active" : ""}`}
              aria-pressed={prefs.grayscale}
              onClick={() => update({ grayscale: !prefs.grayscale })}
            >
              {I.grayscale}
              <span>גוני אפור</span>
            </button>

            <button
              type="button"
              className={`a11y-item ${prefs.highlightLinks ? "is-active" : ""}`}
              aria-pressed={prefs.highlightLinks}
              onClick={() => update({ highlightLinks: !prefs.highlightLinks })}
            >
              {I.link}
              <span>הדגש קישורים</span>
            </button>

            <button
              type="button"
              className={`a11y-item ${prefs.readableFont ? "is-active" : ""}`}
              aria-pressed={prefs.readableFont}
              onClick={() => update({ readableFont: !prefs.readableFont })}
            >
              {I.type}
              <span>גופן קריא</span>
            </button>

            <button
              type="button"
              className={`a11y-item ${prefs.stopAnimations ? "is-active" : ""}`}
              aria-pressed={prefs.stopAnimations}
              onClick={() => update({ stopAnimations: !prefs.stopAnimations })}
            >
              {I.pause}
              <span>עצור אנימציות</span>
            </button>

            <button
              type="button"
              className="a11y-item a11y-reset"
              onClick={reset}
            >
              {I.reset}
              <span>איפוס</span>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .a11y-fab {
          position: fixed;
          bottom: 20px;
          inset-inline-start: 20px;
          z-index: 9999;
          width: 48px;
          height: 48px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 9999px;
          background: #111827;
          color: #ffffff;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .a11y-fab:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
        }

        .a11y-panel {
          position: fixed;
          bottom: 80px;
          inset-inline-start: 20px;
          z-index: 9999;
          width: min(320px, calc(100vw - 40px));
          max-width: 320px;
          background: #ffffff;
          color: #111827;
          border: 1px solid #e6e8ec;
          border-radius: 1rem;
          box-shadow: 0 18px 50px rgba(17, 24, 39, 0.22);
          padding: 16px;
          animation: a11y-slide-up 0.2s ease;
          font-family: var(--font-heebo), system-ui, sans-serif;
        }
        @keyframes a11y-slide-up {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .a11y-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 14px;
        }
        .a11y-panel-title {
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: #111827;
        }
        .a11y-x {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .a11y-x:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .a11y-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .a11y-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 14px 8px;
          min-height: 78px;
          text-align: center;
          border: 1px solid #e6e8ec;
          border-radius: 0.75rem;
          background: #ffffff;
          color: #111827;
          font-size: 0.8rem;
          font-weight: 600;
          line-height: 1.2;
          cursor: pointer;
          transition: border-color 0.15s ease, background 0.15s ease,
            color 0.15s ease, transform 0.12s ease;
        }
        .a11y-item:hover:not(:disabled) {
          border-color: #ff5f5f;
          transform: translateY(-1px);
        }
        .a11y-item:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
        .a11y-item.is-active {
          background: #ff5f5f;
          border-color: #ff5f5f;
          color: #ffffff;
        }
        .a11y-reset {
          grid-column: 1 / -1;
          flex-direction: row;
          min-height: 0;
          padding: 12px;
          background: #f3f4f6;
          border-color: #f3f4f6;
        }
        .a11y-reset:hover {
          background: #e9ebef;
          border-color: #e9ebef;
        }
      `}</style>
    </div>
  );
}
