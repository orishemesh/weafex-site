import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, content, metaAlternates, type Lang } from "@/lib/i18n";
import Hero from "@/components/Hero";
import ScrollFill from "@/components/ScrollFill";
import FifthIdea from "@/components/FifthIdea";
import Problem from "@/components/Problem";
import ExploreRoutes from "@/components/ExploreRoutes";
import WaitlistCTA from "@/components/WaitlistCTA";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const c = content[lang] ?? content.he;
  return {
    title: { absolute: c.home.meta.title },
    description: c.home.meta.description,
    alternates: metaAlternates(lang, ""),
  };
}

export default function HomePage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) notFound();
  const c = content[lang];

  return (
    <>
      <Hero lang={lang} c={c} />
      <section className="section-pad bg-white">
        <div className="shell">
          <ScrollFill text={c.home.scrollLine} className="h-section max-w-5xl" />
        </div>
      </section>
      <FifthIdea c={c} />
      <Problem c={c} />
      <ExploreRoutes lang={lang} c={c} />
      <WaitlistCTA lang={lang} c={c} title={c.home.cta.title} sub={c.home.cta.sub} />
    </>
  );
}
