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
const premiumPartner: Partner[] = [];
const platinumSponsors: Partner[] = [];
const goldSponsors: Partner[] = [];
const silverSponsors: Partner[] = [];

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

            <p className="mt-5 max-w-3xl text-xl
 leading-8 text-zinc-600">
              Leading partners, sponsors, and collaborators will be announced soon.
              The conference continues to attract major players across energy,
              infrastructure, finance, and innovation.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/partners/become-a-partner"
                className="btn-glow rounded-full px-6 py-3 text-base font-semibold text-white"
              >
                Become a Partner
              </Link>

              <Link
                href="/contact"
                className="btn-outline-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-zinc-900"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <PartnerSection eyebrow="Premium Partner" title="Premium Partner" featured />

      <PartnerSection eyebrow="Platinum Sponsor" title="Platinum Sponsor" />

      <PartnerSection eyebrow="Gold Sponsors" title="Gold Sponsors" muted />

      <PartnerSection eyebrow="Silver Sponsors" title="Silver Sponsors" />

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:pb-20">
        <div className="rounded-[28px] border border-[#02026e]/20 bg-gradient-to-r from-blue-600 to-[#02026e] px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Partnership Opportunities
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Position your brand within the clean energy conversation
              </h2>
              <p className="mt-3 text-base leading-7 text-blue-50 md:text-base">
                Join the conference as a sponsor or partner and connect with
                delegates, policymakers, investors, and industry leaders.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/partners/become-a-partner"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[#02026e] transition hover:bg-blue-50"
              >
                Become a Partner
              </Link>

              <Link
                href="/contact"
                className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Contact the Team
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
  featured = false,
  muted = false,
}: {
  eyebrow: string;
  title: string;
  featured?: boolean;
  muted?: boolean;
}) {
  const placeholders = Array.from({ length: featured ? 1 : 4 });

  return (
    <section className={muted ? "bg-slate-50" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#02026e]">
            {eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-zinc-900">
            {title}
          </h2>
        </div>

        <div
          className={`mt-10 grid gap-6 ${
            featured ? "grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          {placeholders.map((_, i) => (
            <article
              key={i}
              className="rounded-[24px] border border-dashed border-slate-300 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(2,6,23,0.08)]"
            >
              <div className="flex flex-col items-center justify-center gap-4 py-10">
                <div className="rounded-full border border-slate-300 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {eyebrow}
                </div>

                <h3 className="text-xl
 font-semibold text-black">
                  To Be Announced
                </h3>

                <p className="max-w-md text-base text-slate-400">
                  Official partners and sponsors for this category will be
                  announced soon. Stay tuned for updates.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}