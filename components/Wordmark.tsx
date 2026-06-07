import Image from "next/image";

export default function Wordmark({
  className = "",
  textClass = "text-weafex-navy",
}: {
  className?: string;
  textClass?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo.svg"
        alt="Weafex"
        width={60}
        height={60}
        className="h-[3.25rem] w-[3.25rem] md:h-[3.75rem] md:w-[3.75rem]"
        priority
      />
      <span className={`text-2xl font-extrabold tracking-tight ${textClass}`}>
        Weafex
      </span>
    </span>
  );
}
