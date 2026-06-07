import Reveal from "./Reveal";

// Generic large statement block (used for "Why now"). Light, editorial.
export default function Vision({
  v,
}: {
  v: { kicker: string; title: string; body: string };
}) {
  return (
    <section className="section-pad bg-white">
      <div className="shell">
        <Reveal>
          <p className="label">{v.kicker}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="h-section mt-10 max-w-4xl text-weafex-navy">{v.title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-weafex-muted">{v.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
