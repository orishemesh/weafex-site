"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { type FormContent } from "@/lib/i18n";

const inputCls =
  "mt-2 w-full rounded-xl border border-weafex-line bg-white px-4 py-3 text-weafex-navy outline-none transition-colors placeholder:text-weafex-muted/50 focus:border-weafex-blue";

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-semibold text-weafex-navy">
      {children}
      <span className="text-weafex-coral"> *</span>
    </label>
  );
}

// Front-end only form (no backend yet — confirms locally). All fields required.
export default function ContactForm({ f }: { f: FormContent }) {
  const [purpose, setPurpose] = useState("");
  const [purposeErr, setPurposeErr] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-weafex-line bg-white p-12 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-weafex-coral text-white">
          <Check className="h-6 w-6" strokeWidth={2.6} />
        </span>
        <p className="mt-5 max-w-sm text-lg font-medium text-weafex-navy">{f.confirmed}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!purpose) {
          setPurposeErr(true);
          return;
        }
        setDone(true);
      }}
      className="space-y-7 rounded-3xl border border-weafex-line bg-white p-7 md:p-10"
    >
      <div>
        <Label>{f.nameLabel}</Label>
        <input type="text" required className={inputCls} />
      </div>

      <fieldset>
        <legend className="text-sm font-semibold text-weafex-navy">
          {f.purposeLabel}
          <span className="text-weafex-coral"> *</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {f.purposeOptions.map((opt) => (
            <button
              type="button"
              key={opt}
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
        {purposeErr && <p className="mt-2 text-sm text-weafex-coral">{f.requiredHint}</p>}
      </fieldset>

      <div>
        <Label>{f.fieldLabel}</Label>
        <input type="text" required className={inputCls} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label>{f.phoneLabel}</Label>
          <input type="tel" inputMode="tel" required className={inputCls} />
        </div>
        <div>
          <Label>{f.emailField}</Label>
          <input type="email" required className={inputCls} />
        </div>
      </div>

      {f.subjectLabel && (
        <div>
          <label className="block text-sm font-semibold text-weafex-navy">{f.subjectLabel}</label>
          <input type="text" className={inputCls} />
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
