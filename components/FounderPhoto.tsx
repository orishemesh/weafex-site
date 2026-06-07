"use client";

import { useState } from "react";
import { User } from "lucide-react";

// Renders the founder photo from /founder.jpg. If the file isn't there yet,
// it gracefully shows a placeholder instead of a broken image.
export default function FounderPhoto({ alt, note }: { alt: string; note: string }) {
  const [err, setErr] = useState(false);

  if (err) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-weafex-paper to-white text-weafex-muted">
        <User className="h-10 w-10" strokeWidth={1.2} />
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em]">{note}</span>
      </div>
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="/founder.jpg"
      alt={alt}
      onError={() => setErr(true)}
      className="h-full w-full object-cover object-top"
    />
  );
}
