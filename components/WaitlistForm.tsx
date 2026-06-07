"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type FormContent = { nameLabel: string; emailLabel: string; submit: string; confirmed: string };

const inputCls =
  "mt-2 w-full rounded-xl border border-weafex-line bg-white px-4 py-3 text-weafex-navy outline-none transition-colors placeholder:text-weafex-muted/50 focus:border-weafex-blue";

// Front-end only waitlist form (no backend yet — confirms locally).
export default function WaitlistForm({ f }: { f: FormContent }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-weafex-navy px-6 py-3.5 text-base font-semibold text-white">
        <Check className="h-5 w-5 text-weafex-coral" strokeWidth={2.6} />
        <span>{f.confirmed}</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <div className="flex-1">
        <label className="block text-sm font-semibold text-weafex-navy">{f.nameLabel}</label>
        <input type="text" className={inputCls} />
      </div>
      <div className="flex-1">
        <label className="block text-sm font-semibold text-weafex-navy">{f.emailLabel}</label>
        <input type="email" required className={inputCls} />
      </div>
      <button
        type="submit"
        className="shrink-0 rounded-full bg-weafex-coral px-7 py-3 text-base font-semibold text-white transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
      >
        {f.submit}
      </button>
    </form>
  );
}
