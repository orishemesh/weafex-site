import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { LANGS, content, metaAlternates, type Lang } from "@/lib/i18n";
import AboutHero from "@/components/AboutHero";
import FounderPhoto from "@/components/FounderPhoto";
import AudienceFlow from "@/components/AudienceFlow";
import Nebula from "@/components/visuals/Nebula";
import WaitlistCTA from "@/components/WaitlistCTA";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const c = content[lang] ?? content.he;
  return { title: { absolute: c.about.meta.title }, description: c.about.meta.description, alternates: metaAlternates(lang, "/about") };
}

export default function AboutPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) notFound();
  const c = content[lang];
  const f = c.about.founder;
  const a = c.about.audience;
  const why = c.about.why;

  return (
    <>
      <AboutHero kicker={c.about.hero.kicker} title={c.about.hero.title} sub={c.about.hero.sub} />

      {/* Founder — kept exactly as approved */}
      <section className="bg-white py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-weafex-line bg-gradient-to-br from-[#eef2fb] via-white to-[#fff1f1] px-7 py-10 md:px-14 md:py-14">
              <Image
                src="/logo.svg"
                alt=""
                aria-hidden
                width={320}
                height={320}
                className="pointer-events-none absolute -bottom-16 left-[-3rem] w-72 opacity-[0.06] md:w-80"
              />
              <div className="relative flex flex-col items-center gap-9 text-center md:flex-row md:items-center md:gap-14 md:text-start">
                <div className="md:order-1 md:flex-1">
                  <p className="label">{f.kicker}</p>
                  <h2 className="mt-4 text-4xl font-medium tracking-tight text-weafex-navy md:text-5xl">{f.name}</h2>
                  <span className="mt-4 block h-0.5 w-12 bg-weafex-coral md:mx-0 mx-auto" />
                  <p className="mt-4 text-lg font-semibold text-weafex-coral">{f.role}</p>
                </div>
                <div className="relative shrink-0 md:order-2">
                  <div aria-hidden className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-weafex-blue/30 to-weafex-coral/30 blur-2xl" />
                  <div className="relative aspect-[4/5] w-56 overflow-hidden rounded-[1.6rem] shadow-[0_30px_60px_-25px_rgba(17,24,39,0.5)] ring-1 ring-black/5 md:w-60">
                    <FounderPhoto alt={f.name} note={f.photoNote} />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Audience — clear: importers ⇄ Weafex ⇄ exporters */}
      <section className="section-pad bg-weafex-paper">
        <div className="shell">
          <Reveal>
            <p className="label">{a.kicker}</p>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-weafex-navy/80">{a.longBody}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-14">
              <AudienceFlow {...a.flow} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Why now — concise statement */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        <Nebula className="opacity-70" />
        <div className="shell relative">
          <Reveal>
            <p className="label">{why.kicker}</p>
            <h2 className="h-sub mt-7 max-w-3xl text-weafex-navy">{why.title}</h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-weafex-muted">{why.body}</p>
          </Reveal>
        </div>
      </section>

      <WaitlistCTA lang={lang} c={c} title={c.about.cta.title} sub={c.about.cta.sub} />
    </>
  );
}
