import { NextResponse, type NextRequest } from "next/server";

const LANGS = ["he", "en"];
const DEFAULT_LANG = "he";

// Only runs for the bare root path. Sends the visitor to their remembered
// locale (cookie), falling back to Hebrew.
export function middleware(request: NextRequest) {
  const cookieLang = request.cookies.get("weafex-lang")?.value;
  const lang = cookieLang && LANGS.includes(cookieLang) ? cookieLang : DEFAULT_LANG;
  return NextResponse.redirect(new URL(`/${lang}`, request.url));
}

export const config = {
  matcher: "/",
};
