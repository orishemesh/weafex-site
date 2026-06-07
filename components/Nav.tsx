"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Wordmark from "./Wordmark";
import LangToggle from "./LangToggle";
import { type Content, type Lang } from "@/lib/i18n";

export default function Nav({ lang, c }: { lang: Lang; c: Content }) {
  const pathname = usePathname() || `/${lang}`;
  const [open, setOpen] = useState(false);

  const base = `/${lang}`;
  const links = [
    { href: base, label: c.nav.home },
    { href: `${base}/about`, label: c.nav.about },
    { href: `${base}/product`, label: c.nav.product },
    { href: `${base}/contact`, label: c.nav.contact },
  ];
  const isActive = (href: string) =>
    href === base ? pathname === base : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-weafex-line/70 bg-white/80 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-3 md:h-20">
        <Link href={base} aria-label="Weafex" className="shrink-0">
          <Wordmark />
        </Link>

        <div className="hidden items-center gap-9 text-sm font-medium lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative py-1 transition-colors ${
                isActive(l.href) ? "text-weafex-navy" : "text-weafex-muted hover:text-weafex-navy"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-weafex-coral"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <span className="hidden sm:block">
            <LangToggle lang={lang} label={c.toggle.label} to={c.toggle.to} />
          </span>
          <Link
            href={`${base}/waitlist`}
            className="hidden rounded-full bg-weafex-coral px-5 py-2 text-sm font-semibold text-white transition-[transform,filter] duration-200 hover:scale-[1.03] hover:brightness-105 active:scale-[0.98] sm:inline-block"
          >
            {c.nav.waitlist}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menu"
            className="inline-flex h-9 w-9 items-center justify-center text-weafex-navy lg:hidden"
          >
            <Menu className="h-6 w-6" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-white px-6 pb-10 pt-5 lg:hidden"
          >
            <div className="flex h-11 items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="inline-flex h-10 w-10 items-center justify-center text-weafex-navy"
              >
                <X className="h-6 w-6" strokeWidth={1.8} />
              </button>
            </div>

            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="mt-10 flex flex-1 flex-col"
            >
              {links.map((l) => (
                <motion.div
                  key={l.href}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="border-b border-weafex-line"
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`block py-5 text-4xl font-light tracking-tight ${
                      isActive(l.href) ? "text-weafex-navy" : "text-weafex-muted"
                    }`}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <div className="flex items-center justify-between pt-6">
              <LangToggle lang={lang} label={c.toggle.label} to={c.toggle.to} />
              <Link
                href={`${base}/waitlist`}
                onClick={() => setOpen(false)}
                className="rounded-full bg-weafex-coral px-6 py-3.5 text-base font-semibold text-white"
              >
                {c.nav.waitlist}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
