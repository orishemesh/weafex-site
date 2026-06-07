import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { LANGS, content, metaAlternates, type Lang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const c = content[lang] ?? content.he;
  return {
    title: { absolute: c.waitlist.meta.title },
    description: c.waitlist.meta.description,
    alternates: metaAlternates(lang, "/waitlist"),
  };
}

export default function WaitlistPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) notFound();
  const c = content[lang];
  const w = c.waitlist;

  return (
    <>
      <PageHeader kicker={w.kicker} title={w.title} sub={w.sub} />

      <section className="bg-white pb-24 pt-8 md:pb-32 md:pt-12">
        <div className="shell max-w-2xl">
          <Reveal>
            <ul className="space-y-6">
              {w.points.map((p) => (
                <li key={p} className="flex items-start gap-4">
                  <Check className="mt-1 h-6 w-6 shrink-0 text-weafex-coral" strokeWidth={2.2} aria-hidden="true" />
                  <span className="text-xl font-medium leading-snug text-weafex-navy">{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12">
              <ContactForm f={w.form} />
              <p className="mt-4 text-sm text-weafex-muted">{w.note}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
