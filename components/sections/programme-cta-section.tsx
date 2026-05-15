"use client";

import Link from "next/link";
import { ArrowRight, Download, Ticket } from "lucide-react";

const stats = [
  {
    value: "600+",
    label: "Expected Delegates",
  },
  {
    value: "40+",
    label: "Countries Represented",
  },
  {
    value: "120+",
    label: "Industry Speakers",
  },
  {
    value: "2",
    label: "International Editions",
  },
];

export function ProgrammeCtaSection() {
  return (
    <section className="relative overflow-hidden">
      {/* PARALLAX BACKGROUND */}
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.64), rgba(0,0,0,0.76)), url('/images/conference-stage.jpg')",
        }}
      />

      {/* LIGHT OVERLAYS */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,153,102,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(2,2,102,0.28),transparent_32%)]" />

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-[760px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* TAG */}
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-5 py-2 backdrop-blur-md">
            <span className="text-base font-semibold uppercase tracking-[0.22em] text-white/90">
              2026 Conference Experience
            </span>
          </div>

          {/* HEADING */}
          <h2 className="mt-8 text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            Be Part of the Future of Clean Energy
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/82 sm:text-2xl">
            Join policymakers, investors, utilities, mining leaders,
            infrastructure developers, innovators, and climate stakeholders as
            Africa and Australia connect around renewable energy, critical
            minerals, and sustainable industrial growth.
          </p>

          {/* EVENT PILLS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-base font-medium text-white backdrop-blur-sm">
              Kigali • 6–7 August 2026
            </div>

            <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-base font-medium text-white backdrop-blur-sm">
              Perth • 31 Aug – 1 Sept 2026
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-5">
            <a
              href="/documents/programme.pdf"
              download
              className="group inline-flex items-center gap-3 rounded-full bg-[#009966] px-8 py-5 text-xl
 font-semibold text-white shadow-[0_18px_45px_rgba(0,153,102,0.32)] transition duration-300 hover:scale-[1.02] hover:bg-[#00b377]"
            >
              <Download className="h-5 w-5" />
              Download Programme
            </a>

            <Link
              href="/get-tickets"
              className="group inline-flex items-center gap-3 rounded-full bg-[#ec0005] px-8 py-5 text-xl
 font-semibold text-white shadow-[0_18px_45px_rgba(236,0,5,0.32)] transition duration-300 hover:scale-[1.02] hover:bg-[#ff1a1f]"
            >
              <Ticket className="h-5 w-5" />
              Get Tickets
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="relative border-t border-white/10 bg-[#020266]/90 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl font-bold tracking-tight text-[#009966] sm:text-6xl">
                {stat.value}
              </p>

              <p className="mt-3 text-base font-medium leading-7 text-white/72">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}