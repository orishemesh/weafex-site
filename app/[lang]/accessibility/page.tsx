import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LANGS, content, metaAlternates, type Lang } from "@/lib/i18n";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang = params.lang as Lang;
  const t = copy[lang === "en" ? "en" : "he"];
  return {
    title: { absolute: `${t.title} · Weafex` },
    description: t.metaDescription,
    alternates: metaAlternates(lang, "/accessibility"),
  };
}

type Copy = {
  kicker: string;
  title: string;
  metaDescription: string;
  intro: string;
  measuresTitle: string;
  measures: string[];
  widgetTitle: string;
  widgetBody: string;
  contactTitle: string;
  contactLead: string;
  emailLabel: string;
  responseTime: string;
  updated: string;
};

const copy: Record<"he" | "en", Copy> = {
  he: {
    kicker: "נגישות",
    title: "הצהרת נגישות",
    metaDescription:
      "הצהרת הנגישות של Weafex — האתר עומד בדרישות תקן ישראלי ת״י 5568 ברמה AA, המבוסס על הנחיות WCAG 2.0.",
    intro:
      "אנו ב-Weafex רואים חשיבות רבה במתן שירות שוויוני לכלל הלקוחות, כולל אנשים עם מוגבלויות. אתר זה עומד בדרישות תקן ישראלי ת״י 5568 ברמה AA, המבוסס על הנחיות WCAG 2.0 של ארגון W3C.",
    measuresTitle: "מה עשינו כדי להנגיש את האתר",
    measures: [
      "ניווט מלא באמצעות מקלדת בכל רכיבי האתר, עם סימון ברור של אלמנט הפוקוס.",
      "ניגודיות צבעים תקינה בין טקסט לרקע, בהתאם לדרישות התקן.",
      "תמיכה בקוראי מסך, כולל מבנה כותרות תקין וטקסט חלופי לתמונות.",
      "מבנה כותרות היררכי וברור בכל עמוד.",
      "טקסט חלופי משמעותי לכל התמונות התוכניות; תמונות עיצוביות מוסתרות מקוראי מסך.",
      "כלי נגישות ייעודי המאפשר התאמה אישית של תצוגת האתר.",
      "אפשרות למעבר לגופן קריא יותר.",
      "אפשרות לעצירת אנימציות ותנועה באתר, וכן כיבוד הגדרת מערכת ההפעלה לצמצום תנועה.",
    ],
    widgetTitle: "כלי הנגישות באתר",
    widgetBody:
      "באתר קיים כלי נגישות (אייקון בצד שמאל למטה) המאפשר התאמה אישית של תצוגת האתר — הגדלת והקטנת טקסט, ניגודיות גבוהה, גוני אפור, הדגשת קישורים, גופן קריא ועצירת אנימציות. ההעדפות נשמרות ונשארות פעילות גם במעבר בין עמודים.",
    contactTitle: "פנייה בנושא נגישות",
    contactLead: "נתקלת בבעיית נגישות? נשמח לשמוע ולתקן.",
    emailLabel: "אימייל",
    responseTime: "נחזור אליך תוך 3 ימי עסקים.",
    updated: "הצהרה זו עודכנה לאחרונה בתאריך: יוני 2026",
  },
  en: {
    kicker: "Accessibility",
    title: "Accessibility Statement",
    metaDescription:
      "Weafex accessibility statement — this site conforms to Israeli Standard IS 5568 Level AA, based on the WCAG 2.0 guidelines.",
    intro:
      "At Weafex we place great importance on providing equal service to all our customers, including people with disabilities. This website conforms to the requirements of Israeli Standard IS 5568 at Level AA, which is based on the WCAG 2.0 guidelines of the W3C.",
    measuresTitle: "What we did to make the site accessible",
    measures: [
      "Full keyboard navigation across every component, with a clear visible focus indicator.",
      "Sufficient colour contrast between text and background, per the standard.",
      "Screen-reader support, including a correct heading structure and alternative text for images.",
      "A clear, hierarchical heading structure on every page.",
      "Meaningful alternative text for all content images; decorative images are hidden from screen readers.",
      "A dedicated accessibility widget that lets users adapt the site's display.",
      "An option to switch to a more readable font.",
      "An option to stop animations and motion, and respect for the operating-system reduced-motion setting.",
    ],
    widgetTitle: "The site's accessibility widget",
    widgetBody:
      "The site includes an accessibility widget (icon at the bottom-left) that lets you personalise the display — increase or decrease text size, high contrast, grayscale, highlighted links, a readable font, and stop animations. Your preferences are saved and persist as you move between pages.",
    contactTitle: "Accessibility contact",
    contactLead: "Ran into an accessibility problem? We'd be glad to hear about it and fix it.",
    emailLabel: "Email",
    responseTime: "We'll get back to you within 3 business days.",
    updated: "This statement was last updated: June 2026",
  },
};

export default function AccessibilityPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) notFound();
  // Ensure i18n content exists for the locale (nav/footer rely on it).
  if (!content[lang]) notFound();
  const t = copy[lang === "en" ? "en" : "he"];

  return (
    <>
      <PageHeader kicker={t.kicker} title={t.title} sub={t.intro} />

      <section className="bg-white pb-24 pt-4 md:pb-32 md:pt-8">
        <div className="shell max-w-3xl">
          <Reveal>
            <h2 className="h-sub text-weafex-navy">{t.measuresTitle}</h2>
            <ul className="mt-6 space-y-3">
              {t.measures.map((m) => (
                <li
                  key={m}
                  className="flex items-start gap-3 text-lg leading-relaxed text-weafex-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-weafex-coral"
                  />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-14 border-t border-weafex-line pt-12">
              <h2 className="h-sub text-weafex-navy">{t.widgetTitle}</h2>
              <p className="mt-5 text-lg leading-relaxed text-weafex-muted">{t.widgetBody}</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 rounded-3xl border border-weafex-line bg-weafex-paper p-8 md:p-10">
              <h2 className="text-2xl font-semibold tracking-tight text-weafex-navy">
                {t.contactTitle}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-weafex-navy">{t.contactLead}</p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-weafex-muted">
                {t.emailLabel}
              </p>
              <a
                href="mailto:support@weafex.com"
                className="mt-1 inline-block text-xl font-semibold text-weafex-navy underline decoration-weafex-coral/60 decoration-2 underline-offset-4 transition-colors hover:text-weafex-coral"
              >
                support@weafex.com
              </a>
              <p className="mt-5 text-base leading-relaxed text-weafex-muted">{t.responseTime}</p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-12 text-sm text-weafex-muted">{t.updated}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
