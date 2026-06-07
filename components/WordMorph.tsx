"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// A word that transforms in place — e.g. סגור → פתוח — when scrolled into view.
export default function WordMorph({ from, to }: { from: string; to: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <span ref={ref} className="relative inline-grid">
      <motion.span
        className="col-start-1 row-start-1 text-weafex-navy/40 line-through decoration-weafex-navy/20"
        animate={inView ? { opacity: 0, y: "-35%" } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25, ease: EASE }}
      >
        {from}
      </motion.span>
      <motion.span
        className="col-start-1 row-start-1 text-weafex-coral"
        initial={{ opacity: 0, y: "45%" }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: "45%" }}
        transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
      >
        {to}
      </motion.span>
    </span>
  );
}
