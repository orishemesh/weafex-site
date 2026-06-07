import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { LANGS, content, isRtl, metaAlternates, type Lang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const c = content[lang] ?? content.he;
  return { title: { absolute: c.contact.meta.title }, description: c.contact.meta.description, alternates: metaAlternates(lang, "/contact") };
}

export default function ContactPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) notFound();
  const c = content[lang];
  const ct = c.contact;

  return (
    <>
      <PageHeader kicker={ct.kicker} title={ct.title} sub={ct.sub} />

      <section className="section-pad bg-white">
        <div className="shell grid gap-12 md:grid-cols-[1.25fr_0.75fr] md:gap-16">
          {/* form */}
          <Reveal>
            <ContactForm f={ct.form} />
          </Reveal>

          {/* direct contact + waitlist */}
          <Reveal delay={0.08}>
            <div>
              <p className="label">{ct.emailLabel}</p>
              <a
                href={`mailto:${ct.email}`}
                className="group mt-4 inline-flex items-center gap-3 text-weafex-navy transition-colors hover:text-weafex-coral"
              >
                <Mail className="h-6 w-6 text-weafex-muted transition-colors group-hover:text-weafex-coral" strokeWidth={1.6} />
                <span className="text-xl font-semibold">{ct.email}</span>
              </a>

              <div className="mt-10 border-t border-weafex-line pt-10">
                <p className="text-lg font-medium text-weafex-navy">{ct.waitlistLine}</p>
                <Link
                  href={`/${lang}/waitlist`}
                  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-weafex-coral px-6 py-3 text-base font-semibold text-white transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
                >
                  {c.waitlistBtn.button}
                  <ArrowRight
                    className={`h-5 w-5 transition-transform ${
                      isRtl(lang) ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
                    }`}
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
