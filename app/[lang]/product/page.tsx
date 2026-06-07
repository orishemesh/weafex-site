import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { LANGS, content, metaAlternates, type Lang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import Purpose from "@/components/Purpose";
import NameMeaning from "@/components/NameMeaning";
import WaitlistCTA from "@/components/WaitlistCTA";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const c = content[lang] ?? content.he;
  return { title: { absolute: c.product.meta.title }, description: c.product.meta.description, alternates: metaAlternates(lang, "/product") };
}

export default function ProductPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) notFound();
  const c = content[lang];
  const v = c.product.verification;

  return (
    <>
      <PageHeader kicker={c.product.hero.kicker} title={c.product.hero.title} sub={c.product.hero.sub} />

      {/* How it looks — the four interface pieces */}
      <Purpose c={c} />

      {/* The verification layer (the moat) */}
      <section className="section-pad bg-weafex-ink text-white">
        <div className="shell grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
          <Reveal>
            <p className="label">{v.kicker}</p>
            <h2 className="h-section mt-8">{v.title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-lg leading-relaxed text-white/60 md:text-xl">{v.body}</p>
            <ul className="mt-8 space-y-4 border-t border-white/10 pt-8">
              {v.points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-weafex-coral" strokeWidth={2.4} aria-hidden="true" />
                  <span className="text-white/85">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* What you can do */}
      <NameMeaning c={c} />

      <WaitlistCTA lang={lang} c={c} title={c.product.cta.title} sub={c.product.cta.sub} />
    </>
  );
}
