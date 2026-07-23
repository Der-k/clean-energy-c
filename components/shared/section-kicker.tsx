export function SectionKicker({
  index,
  label,
  heading,
  intro,
  accent,
}: {
  index: string;
  label: string;
  heading: string;
  intro?: string;
  accent: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: accent }}
        >
          {index}
        </span>
        <p
          className="text-xs font-semibold uppercase tracking-[0.24em]"
          style={{ color: accent }}
        >
          {label}
        </p>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {heading}
      </h2>
      {intro && (
        <p className="mt-3 text-base leading-7 text-zinc-600 sm:text-lg">{intro}</p>
      )}
    </div>
  );
}