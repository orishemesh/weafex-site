import type { Metadata } from "next";
import "./globals.css";

// Passthrough root layout. The real <html>/<body> live in app/[lang]/layout.tsx
// so that `lang` and `dir` can be set per-locale (Next.js App Router i18n pattern).
export const metadata: Metadata = {
  metadataBase: new URL("https://weafex.com"),
  title: "Weafex — The Fifth Element of the Global Economy",
  description:
    "Weafex is the fifth element of the global economy — the force that connects raw material to product, producer to consumer, continent to continent.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
