"use client";

import { useEffect, useRef } from "react";

const stats = [
  { value: "600+", label: "Delegates" },
  { value: "5,000+", label: "Participants" },
  { value: "8", label: "Editions" },
  { value: "USD 2.2T", label: "Global Investment" },
  { value: "585 GW", label: "Renewable Capacity" },
  { value: "600M", label: "Without Electricity" },
  { value: "90%", label: "Renewable Target" },
  { value: "$16B", label: "Energy Investment" },
];

export function StatsBar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      scrollAmount += 0.5;
      container.scrollTo({
        left: scrollAmount,
      });

      if (scrollAmount > container.scrollWidth / 2) {
        scrollAmount = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#003994] text-white">
      {/* subtle gradient glow (same style as slider) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(0,153,102,0.18),transparent_30%)]" />

      <div
        ref={scrollRef}
        className="relative flex gap-12 overflow-x-auto whitespace-nowrap px-6 py-5 scrollbar-none"
      >
        {[...stats, ...stats].map((stat, index) => (
          <div
            key={index}
            className="flex min-w-max items-center gap-4 border-r border-white/15 pr-12 last:border-none"
          >
            {/* VALUE */}
            <span className="text-2xl font-extrabold tracking-[-0.02em] text-emerald-300 sm:text-3xl">
              {stat.value}
            </span>

            {/* LABEL */}
            <span className="text-base font-semibold uppercase tracking-[0.18em] text-white/75">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}