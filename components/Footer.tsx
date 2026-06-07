import Link from "next/link";
import Wordmark from "./Wordmark";
import LangToggle from "./LangToggle";
import { type Content, type Lang } from "@/lib/i18n";

export default function Footer({ lang, c }: { lang: Lang; c: Content }) {
  const base = `/${lang}`;
  const links = [
    { href: base, label: c.nav.home },
    { href: `${base}/about`, label: c.nav.about },
    { href: `${base}/product`, label: c.nav.product },
    { href: `${base}/contact`, label: c.nav.contact },
    { href: `${base}/waitlist`, label: c.nav.waitlist },
  ];

  return (
    <footer className="border-t border-weafex-line bg-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:py-20">
        <div className="max-w-sm">
          <Wordmark />
          <p className="mt-5 text-sm leading-relaxed text-weafex-muted">
            {c.footer.tagline}
          </p>
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-weafex-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-weafex-coral" />
            {c.footer.prelaunch}
          </span>
        </div>

        <div>
          <p className="label">{c.footer.nav}</p>
          <ul className="mt-5 space-y-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-weafex-muted transition-colors hover:text-weafex-navy"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <LangToggle lang={lang} label={c.toggle.label} to={c.toggle.to} />
          <a
            href={`mailto:${c.contact.email}`}
            className="text-sm text-weafex-muted transition-colors hover:text-weafex-navy"
          >
            {c.contact.email}
          </a>
          <p className="text-xs text-weafex-muted/70">© 2026 Weafex. {c.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
