import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, content, metaAlternates, type Lang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const c = content[lang] ?? content.he;
  return {
    title: { absolute: c.privacy.meta.title },
    description: c.privacy.meta.description,
    alternates: metaAlternates(lang, "/privacy"),
  };
}

export default function PrivacyPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) notFound();
  const c = content[lang];
  const p = c.privacy;

  return (
    <>
      <PageHeader kicker={p.kicker} title={p.title} sub={p.intro} />

      <section className="bg-white pb-24 pt-4 md:pb-32 md:pt-8">
        <div className="shell max-w-3xl">
          {p.sections.map((s, i) => (
            <Reveal key={s.heading} delay={0.04 * i}>
              <div className={i === 0 ? "" : "mt-12 border-t border-weafex-line pt-12"}>
                <h2 className="h-sub text-weafex-navy">{s.heading}</h2>
                <p className="mt-5 text-lg leading-relaxed text-weafex-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.12}>
            <p className="mt-12 text-sm text-weafex-muted">{p.updated}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
