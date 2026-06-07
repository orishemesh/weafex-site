import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { type Content, type Lang, isRtl } from "@/lib/i18n";

export default function ExploreRoutes({ lang, c }: { lang: Lang; c: Content }) {
  const base = `/${lang}`;
  const rtl = isRtl(lang);
  const e = c.home.explore;
  const arrow = `h-6 w-6 transition-transform ${
    rtl ? "rotate-180 group-hover:-translate-x-1.5" : "group-hover:translate-x-1.5"
  }`;

  const cards = [
    { href: `${base}/about`, n: "01", title: e.aboutTitle, body: e.aboutBody, link: e.aboutLink },
    { href: `${base}/product`, n: "02", title: e.productTitle, body: e.productBody, link: e.productLink },
  ];

  return (
    <section className="section-pad bg-white">
      <div className="shell">
        <Reveal>
          <p className="label">{e.kicker}</p>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-weafex-line bg-weafex-line md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.href} delay={0.08 * i} className="bg-white">
              <Link
                href={card.href}
                className="group flex h-full flex-col justify-between p-8 transition-colors hover:bg-weafex-paper md:p-12"
              >
                <div>
                  <span className="text-sm font-semibold text-weafex-muted/60">{card.n}</span>
                  <h3 className="h-sub mt-6 text-weafex-navy">{card.title}</h3>
                  <p className="mt-4 max-w-md text-lg leading-relaxed text-weafex-muted">{card.body}</p>
                </div>
                <span className="mt-12 inline-flex items-center gap-2 text-base font-semibold text-weafex-navy transition-colors group-hover:text-weafex-coral">
                  {card.link}
                  <ArrowRight className={arrow} strokeWidth={2} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
