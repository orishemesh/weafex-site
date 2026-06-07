"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PackageSearch, Send } from "lucide-react";

// Clear, labeled diagram: importers ⇄ Weafex ⇄ exporters, with a "deal"
// token that travels through the Weafex hub. Easy to read at a glance.
function SideCard({
  icon,
  title,
  body,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone: "blue" | "coral";
}) {
  return (
    <div className="relative z-10 rounded-3xl border border-weafex-line bg-white p-7 text-center shadow-[0_24px_50px_-32px_rgba(17,24,39,0.4)] md:p-8">
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
          tone === "blue" ? "bg-weafex-blue/10 text-weafex-blue" : "bg-weafex-coral/10 text-weafex-coral"
        }`}
      >
        {icon}
      </span>
      <h3 className="mt-5 text-2xl font-medium tracking-tight text-weafex-navy">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-weafex-muted">{body}</p>
    </div>
  );
}

export default function AudienceFlow({
  importersTitle,
  importersBody,
  exportersTitle,
  exportersBody,
  caption,
}: {
  importersTitle: string;
  importersBody: string;
  exportersTitle: string;
  exportersBody: string;
  caption: string;
}) {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* connector + travelling deal (desktop) */}
      <div className="absolute inset-x-[20%] top-1/2 hidden -translate-y-1/2 md:block">
        <div className="relative h-px bg-gradient-to-l from-weafex-blue/45 via-weafex-coral/55 to-weafex-navy/35">
          <motion.span
            className="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-weafex-coral shadow-[0_0_0_4px_rgba(255,95,95,0.18)]"
            animate={{ left: ["0%", "50%", "100%", "50%", "0%"] }}
            transition={{ duration: 5.5, times: [0, 0.32, 0.5, 0.82, 1], repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-2">
        {/* importers (right in RTL) */}
        <SideCard
          tone="blue"
          icon={<PackageSearch className="h-6 w-6" strokeWidth={1.9} aria-hidden="true" />}
          title={importersTitle}
          body={importersBody}
        />

        {/* Weafex hub */}
        <div className="relative flex flex-col items-center px-4 py-2 md:px-10">
          <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white ring-1 ring-weafex-line shadow-[0_20px_45px_-20px_rgba(17,24,39,0.45)]">
            <div aria-hidden className="absolute -inset-3 rounded-full bg-gradient-to-br from-weafex-blue/20 to-weafex-coral/25 blur-xl" />
            <Image src="/logo.svg" alt="" aria-hidden width={44} height={44} className="relative h-11 w-11" />
          </div>
          <span className="mt-3 text-xs font-extrabold tracking-tight text-weafex-coral">Weafex</span>
        </div>

        {/* exporters (left in RTL) */}
        <SideCard
          tone="coral"
          icon={<Send className="h-6 w-6" strokeWidth={1.9} aria-hidden="true" />}
          title={exportersTitle}
          body={exportersBody}
        />
      </div>

      <p className="mt-8 text-center text-base font-semibold text-weafex-navy">{caption}</p>
    </div>
  );
}
