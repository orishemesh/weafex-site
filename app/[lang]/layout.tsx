import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import { notFound } from "next/navigation";
import { LANGS, content, isRtl, type Lang } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-heebo",
  display: "swap",
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Metadata {
  const lang = params.lang as Lang;
  const locale = lang === "he" ? "he_IL" : "en_US";
  return {
    metadataBase: new URL("https://weafex.com"),
    title: {
      default: "Weafex — The Social Network of International Trade",
      template: "%s · Weafex",
    },
    openGraph: { type: "website", locale, siteName: "Weafex" },
    twitter: { card: "summary_large_image" },
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang as Lang;
  if (!LANGS.includes(lang)) notFound();
  const c = content[lang];

  return (
    <html lang={lang} dir={isRtl(lang) ? "rtl" : "ltr"} className={heebo.variable}>
      <body className="font-sans antialiased bg-white text-weafex-navy">
        <a href="#main-content" className="skip-link">
          {lang === "he" ? "דלג לתוכן המרכזי" : "Skip to main content"}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "Weafex",
                  url: "https://weafex.com",
                  logo: "https://weafex.com/logo.svg",
                  email: "support@weafex.com",
                  description: c.home.meta.description,
                },
                {
                  "@type": "WebSite",
                  name: "Weafex",
                  url: "https://weafex.com",
                  inLanguage: lang,
                },
              ],
            }),
          }}
        />
        <Nav lang={lang} c={c} />
        <PageTransition>{children}</PageTransition>
        <Footer lang={lang} c={c} />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
