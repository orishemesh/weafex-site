import Reveal from "./Reveal";
import NetworkField from "./visuals/NetworkField";
import { type Content } from "@/lib/i18n";

// Home: the Solution — a light band with one fully-connected living network.
export default function Problem({ c }: { c: Content }) {
  const s = c.home.solution;
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <div className="absolute inset-0">
        <NetworkField className="opacity-70" />
      </div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/25 to-white"
      />
      <div className="shell relative">
        <Reveal>
          <p className="label">{s.kicker}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-section mt-8 max-w-3xl text-weafex-navy">{s.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-weafex-muted md:text-xl">{s.lead}</p>
        </Reveal>
      </div>
    </section>
  );
}
