import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { type Content, type Lang, isRtl } from "@/lib/i18n";

// A single deliberate dark band — the page's only dark moment, for contrast.
export default function WaitlistCTA({
  lang,
  c,
  title,
  sub,
}: {
  lang: Lang;
  c: Content;
  title: string;
  sub: string;
}) {
  const rtl = isRtl(lang);
  return (
    <section className="bg-weafex-ink text-white">
      <div className="shell py-24 md:py-36">
        <Reveal>
          <h2 className="h-section max-w-4xl">{title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/55 md:text-xl">{sub}</p>
        </Reveal>
        <Reveal delay={0.14}>
          <Link
            href={`/${lang}/waitlist`}
            className="group mt-10 inline-flex items-center gap-2 rounded-full bg-weafex-coral px-7 py-3.5 text-base font-semibold text-white transition-[transform,filter] duration-200 hover:scale-[1.02] hover:brightness-105 active:scale-[0.98]"
          >
            {c.waitlistBtn.button}
            <ArrowRight
              className={`h-5 w-5 transition-transform ${
                rtl ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"
              }`}
              strokeWidth={2}
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
