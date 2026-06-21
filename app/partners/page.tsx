"use client";

import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

type Partner = {
  name: string;
  logo: string;
  description: string;
  website?: string;
};

// Empty arrays (no real partners yet)
const bronzeSponsors: Partner[] = [];
const industrySponsors: Partner[] = [];
const silverSponsors: Partner[] = [];
const goldSponsors: Partner[] = [];

export default function PartnersPage() {
  return (
    <main className="pt-24 bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-zinc-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-zinc-700">Partners & Sponsors</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Partnerships
            </p>

            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-zinc-900 sm:text-5xl">
              Partners & Sponsors
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-8 text-zinc-600">
              Leading partners and sponsors across clean energy, industry,
              infrastructure, and innovation will be announced soon.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {/* GOLD CTA */}
      <Link
  href="/partners/become-a-partner"
  className="
    group relative inline-flex items-center justify-center gap-2
    rounded-full px-5 py-2.5 text-base font-semibold text-[#1f1f1f]

    bg-gradient-to-r from-[#d4af00] via-[#fad202] to-[#d4af00]
    bg-[length:200%_100%] bg-left

    shadow-[0_12px_35px_rgba(250,210,2,0.30)]

    transition-all duration-500 ease-out

    hover:bg-right
    hover:shadow-[0_18px_60px_rgba(250,210,2,0.42)]
    hover:scale-[1.05]

    active:scale-[0.97]

    focus:outline-none
    focus:ring-2
    focus:ring-[#fad202]/50
    focus:ring-offset-2
  "
>
  {/* subtle light sweep */}
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span
      className="
        absolute -left-[120%] top-0
        h-full w-[60%]
        rotate-12
        bg-white/25 blur-md
        transition-all duration-700
        group-hover:left-[120%]
      "
    />
  </span>

  <span className="relative z-10">Become a Partner</span>

  <ArrowRight
    className="
      relative z-10 h-4 w-4
      transition-transform duration-300
      group-hover:translate-x-1
    "
  />
</Link>


<Link
  href="/contact"
  className="
    group relative inline-flex items-center justify-center gap-2
    overflow-hidden

    rounded-full px-6 py-3 text-base font-semibold

    text-zinc-900
    bg-white

    border border-zinc-300

    shadow-sm

    transition-all duration-500 ease-out

    hover:border-[#02026e]/60
    hover:scale-[1.04]
    hover:shadow-[0_18px_50px_rgba(2,2,110,0.18)]

    active:scale-[0.97]

    focus:outline-none
    focus:ring-2
    focus:ring-[#02026e]/25
    focus:ring-offset-2
    focus:ring-offset-white
  "
>
  {/* blue sweep */}
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span
      className="
        absolute left-0 top-0 h-full w-0
        bg-[#02026e]
        transition-all duration-500 ease-out
        group-hover:w-full
      "
    />
  </span>

  {/* text turns white */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    Contact Us
  </span>

  <ArrowRight
    className="
      relative z-10 h-4 w-4
      transition-all duration-300
      group-hover:translate-x-1
      group-hover:text-white
    "
  />
</Link>
            </div>
          </div>
        </div>
      </section>

      {/* GOLD */}
      <PartnerSection
        eyebrow="Gold Sponsorship"
        title="Gold Sponsors"
        tone="gold"
      />

      {/* SILVER */}
      <PartnerSection
        eyebrow="Silver Sponsorship"
        title="Silver Sponsors"
        tone="silver"
      />

      {/* INDUSTRY */}
      <PartnerSection
        eyebrow="Industry / Session Sponsorship"
        title="Industry & Session Sponsors"
        tone="industry"
      />

      {/* BRONZE */}
      <PartnerSection
        eyebrow="Bronze Sponsorship"
        title="Bronze Sponsors"
        tone="bronze"
      />

      {/* CTA */}
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:pb-20">
  <div className="relative overflow-hidden rounded-[28px] border border-[#02026e]/20 bg-[#02026e] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.18)] md:px-10 md:py-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" />

    <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
          Partnership Opportunities
        </p>
        <h2 className="mt-2 text-2xl font-bold md:text-3xl">
          Position your brand within the clean energy conversation
        </h2>
        <p className="mt-3 text-blue-50">
          Join as a sponsor and connect with leaders shaping the energy transition.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 rounded-3xl bg-[#02026e] p-8">
        <Link
          href="/partners/become-a-partner"
          className="
            group relative inline-flex items-center justify-center gap-2
            overflow-hidden

            rounded-full px-6 py-3 text-base font-semibold

            text-[#02026e]
            bg-white

            border border-white

            shadow-[0_10px_30px_rgba(0,0,0,0.12)]

            transition-all duration-500 ease-out

            hover:border-white/60
            hover:scale-[1.04]
            hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]

            active:scale-[0.97]

            focus:outline-none
            focus:ring-2
            focus:ring-white/40
            focus:ring-offset-2
            focus:ring-offset-[#02026e]
          "
        >
          {/* blue sweep */}
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span
              className="
                absolute left-0 top-0 h-full w-0
                bg-[#02026e]
                transition-all duration-500 ease-out
                group-hover:w-full
              "
            />
          </span>

          {/* text turns white */}
          <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
            Become a Partner
          </span>
        </Link>

        <Link
          href="/contact"
          className="
            group relative inline-flex items-center justify-center gap-2
            overflow-hidden

            rounded-full px-6 py-3 text-base font-semibold

            text-white
            bg-white/10 backdrop-blur-sm

            border border-white/40

            shadow-[0_10px_30px_rgba(0,0,0,0.12)]

            transition-all duration-500 ease-out

            hover:border-white/60
            hover:scale-[1.04]
            hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]

            active:scale-[0.97]

            focus:outline-none
            focus:ring-2
            focus:ring-white/40
            focus:ring-offset-2
            focus:ring-offset-[#02026e]
          "
        >
          {/* white sweep */}
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span
              className="
                absolute left-0 top-0 h-full w-0
                bg-white
                transition-all duration-500 ease-out
                group-hover:w-full
              "
            />
          </span>

          {/* text turns blue */}
          <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">
            Contact the Team
          </span>
        </Link>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}

/* ========================= */
/* Partner Section Component */
/* ========================= */

function PartnerSection({
  eyebrow,
  title,
  tone,
}: {
  eyebrow: string;
  title: string;
  tone: "gold" | "silver" | "bronze" | "industry";
}) {
  const config = {
    gold: {
      bg: "bg-gradient-to-b from-amber-50 via-yellow-50 to-white",
      border: "border-amber-200",
      badge:
        "text-amber-800 border-amber-300 bg-gradient-to-r from-amber-200/40 to-yellow-200/40",
      glow: "bg-amber-400/10",
    },
    silver: {
      bg: "bg-gradient-to-b from-slate-50 via-gray-50 to-white",
      border: "border-slate-200",
      badge:
        "text-slate-700 border-slate-300 bg-gradient-to-r from-slate-200/40 to-gray-200/40",
      glow: "bg-slate-400/10",
    },
    bronze: {
      bg: "bg-gradient-to-b from-orange-50 via-amber-50 to-white",
      border: "border-orange-200",
      badge:
        "text-orange-800 border-orange-300 bg-gradient-to-r from-orange-200/40 to-yellow-200/40",
      glow: "bg-orange-400/10",
    },
    industry: {
      bg: "bg-gradient-to-b from-blue-50 via-indigo-50 to-white",
      border: "border-blue-200",
      badge:
        "text-[#02026e] border-blue-300 bg-gradient-to-r from-blue-200/40 to-indigo-200/40",
      glow: "bg-[#02026e]/10",
    },
  };

  const theme = config[tone];
  const placeholders = Array.from({ length: 4 });

  return (
    <section className={`relative ${theme.bg}`}>
      {/* subtle glow layer */}
      <div className={`absolute inset-0 opacity-60 ${theme.glow}`} />

      <div className="relative mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="max-w-3xl">
          <p
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] ${theme.badge}`}
          >
            {eyebrow}
          </p>

          <h2 className="mt-4 text-3xl font-bold text-zinc-900">
            {title}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {placeholders.map((_, i) => (
            <article
              key={i}
              className={`rounded-[24px] border ${theme.border} bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(2,6,23,0.08)]`}
            >
              <div className="flex flex-col items-center gap-4 py-10">
                <div
                  className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${theme.badge}`}
                >
                  {eyebrow}
                </div>

                <h3 className="text-xl font-semibold text-black">
                  To Be Announced
                </h3>

                <p className="max-w-md text-base text-slate-400">
                  Sponsors in this category will be announced soon.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}