"use client";

import { motion } from "framer-motion";
import Nebula from "./visuals/Nebula";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function AboutHero({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[70vh] bg-gradient-to-b from-[#eef2fb] to-white" />
      <Nebula className="opacity-80" />

      <div className="shell relative pt-40 pb-20 md:pt-52 md:pb-28">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="label"
        >
          {kicker}
        </motion.span>
        <h1 className="h-hero mt-7 max-w-[14ch] text-weafex-navy">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              initial={{ y: "115%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.18 }}
            >
              {title}
            </motion.span>
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: EASE }}
          className="mt-9 max-w-2xl text-lg leading-relaxed text-weafex-muted md:text-xl"
        >
          {sub}
        </motion.p>
      </div>
    </section>
  );
}
