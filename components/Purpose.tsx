import Reveal from "./Reveal";
import PhoneCarousel from "./PhoneCarousel";
import { type Content } from "@/lib/i18n";

const SCREENS = [
  ["/screens/globe-1.png", "/screens/globe-2.png", "/screens/globe-3.png", "/screens/globe-4.png"],
  ["/screens/feed-1.png", "/screens/feed-2.png", "/screens/feed-3.png", "/screens/feed-4.png", "/screens/feed-5.png"],
  ["/screens/chat-1.png", "/screens/chat-2.png", "/screens/chat-3.png", "/screens/chat-4.png"],
  ["/screens/profile-1.png", "/screens/profile-2.png", "/screens/profile-3.png", "/screens/profile-4.png"],
];

export default function Purpose({ c }: { c: Content }) {
  return (
    <section className="section-pad bg-white">
      <div className="shell">
        <Reveal>
          <p className="label">{c.product.featuresKicker}</p>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-32">
          {c.product.features.map((f, i) => (
            <Reveal key={f.title}>
              <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
                {/* zigzag: alternate which side the phone sits on */}
                <div className={i % 2 === 0 ? "md:order-2" : "md:order-1"}>
                  <div className="flex items-center justify-center py-2">
                    <PhoneCarousel images={SCREENS[i] ?? SCREENS[0]} alt="Weafex" />
                  </div>
                </div>
                <div className={i % 2 === 0 ? "md:order-1" : "md:order-2"}>
                  <span className="text-sm font-semibold text-weafex-muted/60">0{i + 1}</span>
                  <h3 className="h-sub mt-5 text-weafex-navy">{f.title}</h3>
                  <p className="mt-5 max-w-md text-lg leading-relaxed text-weafex-muted">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
