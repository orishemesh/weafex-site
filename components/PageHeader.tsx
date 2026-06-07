import Reveal from "./Reveal";

export default function PageHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-weafex-line bg-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-[#eef2fb] to-white"
      />
      <div className="shell relative pb-16 pt-36 md:pb-24 md:pt-48">
        <Reveal>
          <p className="label">{kicker}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="h-hero mt-7 max-w-[15ch] text-weafex-navy">{title}</h1>
        </Reveal>
        <Reveal delay={0.14}>
          <p className="mt-9 max-w-2xl text-lg leading-relaxed text-weafex-muted md:text-xl">
            {sub}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
