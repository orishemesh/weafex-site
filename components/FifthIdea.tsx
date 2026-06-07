import Reveal from "./Reveal";
import NetworkField from "./visuals/NetworkField";
import Nebula from "./visuals/Nebula";
import { type Content } from "@/lib/i18n";

// Home: the Problem — on the same white page, a faint grey "constellation" of
// fragmented clusters drifting in a soft nebula. No band, no edge — one page.
export default function FifthIdea({ c }: { c: Content }) {
  const p = c.home.problem;
  return (
    <section className="relative overflow-hidden bg-white section-pad">
      <Nebula />
      <div className="absolute inset-0">
        <NetworkField variant="fragmented" tone="muted" className="opacity-80" />
      </div>
      <div className="shell relative">
        <Reveal>
          <p className="label">{p.kicker}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-section mt-8 max-w-3xl text-weafex-navy">{p.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-weafex-muted md:text-xl">{p.lead}</p>
        </Reveal>
      </div>
    </section>
  );
}
