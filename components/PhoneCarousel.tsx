"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Real app screenshots inside a phone frame, auto-rotating with a crossfade.
export default function PhoneCarousel({
  images,
  alt = "Weafex",
  interval = 2800,
}: {
  images: string[];
  alt?: string;
  interval?: number;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const reduce =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || images.length < 2) return;
    const id = setInterval(() => setI((p) => (p + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div className="mx-auto w-full max-w-[250px]">
      <div className="relative aspect-[1206/2622] overflow-hidden rounded-[2.4rem] border-[7px] border-weafex-navy bg-weafex-navy shadow-[0_45px_90px_-35px_rgba(17,24,39,0.55)]">
        {images.map((src, idx) => (
          <Image
            key={src}
            src={src}
            alt={alt}
            fill
            sizes="250px"
            priority={idx === 0}
            className={`object-cover transition-opacity duration-700 ${
              idx === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === i ? "w-5 bg-weafex-coral" : "w-1.5 bg-weafex-line"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
