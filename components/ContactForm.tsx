"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { type FormContent } from "@/lib/i18n";
import { track } from "@/lib/gtag";

const inputCls =
  "mt-2 w-full rounded-xl border border-weafex-line bg-white px-4 py-3 text-weafex-navy outline-none transition-colors placeholder:text-weafex-muted/50 focus:border-weafex-blue";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-weafex-navy">
      {children}
      <span className="text-weafex-coral" aria-hidden="true"> *</span>
    </label>
  );
}

// Submissions POST to /api/leads (server-side proxy to Google Sheet via Apps Script).
export default function ContactForm({ f }: { f: FormContent }) {
  const [purpose, setPurpose] = useState("");
  const [purposeErr, setPurposeErr] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-col items-center justify-center rounded-3xl border border-weafex-line bg-white p-12 text-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-weafex-coral text-white">
          <Check className="h-6 w-6" strokeWidth={2.6} aria-hidden="true" />
        </span>
        <p className="mt-5 max-w-sm text-lg font-medium text-weafex-navy">{f.confirmed}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!purpose) {
          setPurposeErr(true);
          return;
        }
        const form = e.currentTarget;
        const data = new FormData(form);
        const formType = f.subjectLabel ? "contact" : "waitlist";
        const language =
          typeof document !== "undefined" ? document.documentElement.lang || "he" : "he";
        const payload = {
          form_type: formType,
          name: String(data.get("name") || ""),
          purpose,
          field: String(data.get("field") || ""),
          phone: String(data.get("phone") || ""),
          email: String(data.get("email") || ""),
          subject: String(data.get("subject") || ""),
          language,
          source_url: typeof window !== "undefined" ? window.location.href : "",
          submitted_at: new Date().toISOString(),
        };
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
        } catch (err) {
          console.error("leads POST failed", err);
        }
        track("generate_lead", { form_type: formType, purpose, language });
        setDone(true);
      }}
      className="space-y-7 rounded-3xl border border-weafex-line bg-white p-7 md:p-10"
    >
      <div>
        <Label htmlFor="cf-name">{f.nameLabel}</Label>
        <input id="cf-name" name="name" type="text" required className={inputCls} />
      </div>

      <fieldset aria-describedby={purposeErr ? "cf-purpose-err" : undefined}>
        <legend className="text-sm font-semibold text-weafex-navy">
          {f.purposeLabel}
          <span className="text-weafex-coral" aria-hidden="true"> *</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {f.purposeOptions.map((opt) => (
            <button
              type="button"
              key={opt}
              aria-pressed={purpose === opt}
              onClick={() => {
                setPurpose(opt);
                setPurposeErr(false);
              }}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                purpose === opt
                  ? "border-weafex-navy bg-weafex-navy text-white"
                  : "border-weafex-line text-weafex-muted hover:border-weafex-navy/40 hover:text-weafex-navy"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <p
          id="cf-purpose-err"
          aria-live="polite"
          className={`mt-2 text-sm text-weafex-coral ${purposeErr ? "" : "sr-only"}`}
        >
          {purposeErr ? f.requiredHint : ""}
        </p>
      </fieldset>

      <div>
        <Label htmlFor="cf-field">{f.fieldLabel}</Label>
        <input id="cf-field" name="field" type="text" required className={inputCls} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="cf-phone">{f.phoneLabel}</Label>
          <input id="cf-phone" name="phone" type="tel" inputMode="tel" required className={inputCls} />
        </div>
        <div>
          <Label htmlFor="cf-email">{f.emailField}</Label>
          <input id="cf-email" name="email" type="email" required className={inputCls} />
        </div>
      </div>

      {f.subjectLabel && (
        <div>
          <label htmlFor="cf-subject" className="block text-sm font-semibold text-weafex-navy">{f.subjectLabel}</label>
          <input id="cf-subject" name="subject" type="text" className={inputCls} />
        </div>
      )}

      <button
        type="submit"
        className="w-full rounded-full bg-weafex-coral px-7 py-3.5 text-base font-semibold text-white transition-[transform,filter] duration-200 hover:scale-[1.01] hover:brightness-105 active:scale-[0.99] sm:w-auto"
      >
        {f.submit}
      </button>
    </form>
  );
}
