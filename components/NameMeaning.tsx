import Reveal from "./Reveal";
import { type Content } from "@/lib/i18n";

// Product: "What you can do" — four things, second person.
export default function NameMeaning({ c }: { c: Content }) {
  const can = c.product.can;
  return (
    <section className="section-pad bg-weafex-paper">
      <div className="shell">
        <Reveal>
          <p className="label">{can.kicker}</p>
          <h2 className="h-section mt-8 max-w-3xl text-weafex-navy">{can.title}</h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-weafex-line bg-weafex-line sm:grid-cols-2">
          {can.items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 * i} className="bg-white">
              <div className="h-full p-8 md:p-10">
                <span className="text-sm font-semibold text-weafex-muted/60">0{i + 1}</span>
                <h3 className="mt-5 text-2xl font-medium tracking-tight text-weafex-navy">
                  {item.title}
                </h3>
                <p className="mt-3 text-lg leading-relaxed text-weafex-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
