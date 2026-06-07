"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import NetworkField from "./visuals/NetworkField";
import { type Content, type Lang, isRtl } from "@/lib/i18n";

const EASE = [0.22, 1, 0.36, 1] as const;

function Line({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({ lang, c }: { lang: Lang; c: Content }) {
  const base = `/${lang}`;
  const rtl = isRtl(lang);
  const h = c.home.hero;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* tinted sky + living connection network + legibility wash */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[72vh] bg-gradient-to-b from-[#eef2fb] to-white" />
      <div className="absolute inset-0">
        <NetworkField className="opacity-70" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/10 to-white" />

      <div className="shell relative flex flex-col justify-center pt-40 pb-24 md:pt-52 md:pb-36">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="label"
        >
          {h.eyebrow}
        </motion.span>

        <h1 className="h-hero mt-7 max-w-[16ch] text-weafex-navy">
          <Line delay={0.16}>{h.headLead}</Line>
          <Line delay={0.3} className="text-weafex-navy/35">{h.headRest}</Line>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7, ease: EASE }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-weafex-muted md:text-xl"
        >
          {h.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.74, duration: 0.7, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3"
        >
          <Link
            href={`${base}/waitlist`}
            className="rounded-full bg-weafex-coral px-7 py-3.5 text-base font-semibold text-white transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
          >
            {h.ctaPrimary}
          </Link>
          <Link
            href={`${base}/product`}
            className="group inline-flex items-center gap-2 text-base font-semibold text-weafex-navy"
          >
            {h.ctaSecondary}
            <ArrowRight
              className={`h-5 w-5 transition-transform ${
                rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
              }`}
              strokeWidth={2}
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
