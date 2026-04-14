"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  MapPin,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

type EditionKey = "kigali" | "perth";

const editions = {
  kigali: {
    key: "kigali" as EditionKey,
    tabLabel: "Kigali Edition",
    eyebrow: "2026 Edition",
    title: "Kigali Edition Overview",
    subtitle:
      "A high-level platform for East Africa’s clean energy transition, regional integration, and investment dialogue.",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    heroImage: "/images/conference/kigali-hero.jpg",
    tabImage: "/images/conference/kigali-tab.jpg",
    gallery: [
      "/images/conference/conference-1.jpg",
      "/images/conference/conference-2.jpg",
      "/images/conference/conference-3.jpg",
      "/images/conference/conference-4.jpg",
      "/images/conference/conference-5.jpg",
      "/images/conference/conference-6.jpg",
    ],
    overviewTitle:
      "East Africa-focused clean energy dialogue, investment, and collaboration",
    overviewParagraphs: [
      "The Kigali Edition will focus strongly on East Africa’s energy transition, highlighting regional integration, geothermal and renewable expansion, decentralized energy systems, green industrialization, and climate finance mobilization.",
      "It also recognizes Rwanda’s growing leadership in clean mobility, sustainable urban systems, and innovation-driven energy policy.",
      "The platform creates space to deepen Kenya–Rwanda collaboration in cross-border power trade, regional power pools, clean technology ecosystems, and institutional partnerships.",
    ],
    stats: [
      { value: "600+", label: "Delegates targeted" },
      { value: "2", label: "Conference days" },
      { value: "8+", label: "Programme formats" },
      { value: "Africa", label: "Regional focus" },
    ],
    reasonsToAttend: [
      "Connect with policymakers, investors, regulators, and innovators shaping East Africa’s energy transition.",
      "Gain insight into regional integration, decentralized energy systems, and green industrialization.",
      "Explore climate finance mobilization and practical implementation opportunities.",
      "Build institutional and commercial relationships across clean technology and cross-border energy ecosystems.",
      "Learn from discussions tied closely to Rwanda’s and the region’s energy priorities.",
    ],
    sectors: [
      "Renewable Energy",
      "Geothermal",
      "Decentralized Energy Systems",
      "Climate Finance",
      "Clean Mobility",
      "Sustainable Urban Systems",
      "Regional Power Trade",
      "Green Industrialization",
      "Energy Policy",
      "Critical Minerals",
      "Grid & Transmission",
      "Technology & Innovation",
    ],
    audienceBreakdown: [
      { label: "Government & Institutional Stakeholders", value: "18%" },
      { label: "Investors / DFIs / Venture Capital", value: "16%" },
      { label: "Energy & Mining Companies", value: "16%" },
      { label: "Renewable Energy Innovators", value: "12%" },
      { label: "Utilities / Policy Developers", value: "10%" },
      { label: "Academia & Development Partners", value: "10%" },
      { label: "Clean Technology Providers", value: "9%" },
      { label: "Civil Society & Youth Networks", value: "9%" },
    ],
  },

  perth: {
    key: "perth" as EditionKey,
    tabLabel: "Perth Edition",
    eyebrow: "2026 Edition",
    title: "Perth Edition Overview",
    subtitle:
      "A strategic Australia-facing edition linking African energy priorities to capital, mining technology, green hydrogen, storage, and ESG leadership.",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    heroImage: "/images/conference/perth-hero.jpg",
    tabImage: "/images/conference/perth-tab.jpg",
    gallery: [
      "/images/conference/conference-1.jpg",
      "/images/conference/conference-2.jpg",
      "/images/conference/conference-3.jpg",
      "/images/conference/conference-4.jpg",
      "/images/conference/conference-5.jpg",
      "/images/conference/conference-6.jpg",
    ],
    overviewTitle:
      "A bridge between African opportunity and Australian clean energy capability",
    overviewParagraphs: [
      "The Perth Edition will connect African energy priorities to Australian capital markets, advanced mining technologies, green hydrogen expertise, energy storage innovation, and ESG leadership frameworks.",
      "As a global mining and clean energy investment hub, Perth presents a strategic opportunity to position Kenya and the broader East African region within global critical minerals and renewable energy value chains.",
      "The event is designed to strengthen Africa–Australia policy dialogue, investment relationships, and long-term institutional partnerships.",
    ],
    stats: [
      { value: "600+", label: "Delegates targeted" },
      { value: "2", label: "Conference days" },
      { value: "Global", label: "Investment outlook" },
      { value: "AU–AF", label: "Partnership focus" },
    ],
    reasonsToAttend: [
      "Connect African clean energy priorities to Australian capital markets and investor networks.",
      "Explore advanced mining technologies, green hydrogen, and storage innovation.",
      "Engage with ESG leadership frameworks relevant to global energy and minerals markets.",
      "Position organizations within critical minerals and renewable value chains.",
      "Strengthen Africa–Australia policy, investment, and technology partnerships.",
    ],
    sectors: [
      "Capital Markets",
      "Critical Minerals",
      "Advanced Mining Technology",
      "Green Hydrogen",
      "Energy Storage",
      "ESG Leadership",
      "Renewable Energy",
      "Investment & Finance",
      "Grid Modernization",
      "Clean Technology",
      "Policy & Governance",
      "Cross-Border Partnerships",
    ],
    audienceBreakdown: [
      { label: "Investors / Financial Representatives", value: "20%" },
      { label: "Energy & Mining Companies", value: "18%" },
      { label: "Government & Policy Stakeholders", value: "14%" },
      { label: "Project Developers", value: "12%" },
      { label: "Technology & Innovation Providers", value: "12%" },
      { label: "Consultants / Advisors", value: "10%" },
      { label: "Academia & Research Institutions", value: "7%" },
      { label: "Development Partners", value: "7%" },
    ],
  },
};

const editionOrder: EditionKey[] = ["kigali", "perth"];

export default function ConferenceOverviewPage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);

  return (
    <main className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-cyan-100/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Conference</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Conference Overview
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Explore the 2026 conference editions
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
              Select an edition below to view location-specific event details,
              themes, priorities, audience value, and programme context.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {editionOrder.map((editionKey) => {
              const edition = editions[editionKey];
              const isActive = activeEdition === editionKey;

              return (
                <button
                  key={editionKey}
                  type="button"
                  onClick={() => setActiveEdition(editionKey)}
                  className={`group relative overflow-hidden rounded-[28px] text-left transition ${
                    isActive
                      ? "ring-2 ring-blue-500 shadow-[0_18px_40px_rgba(37,99,235,0.20)]"
                      : "border border-blue-100 shadow-sm hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.10)]"
                  }`}
                >
                  <div className="relative h-[280px] w-full">
                    <Image
                      src={edition.tabImage}
                      alt={edition.tabLabel}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-slate-950/10" />

                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                      <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100 backdrop-blur-md">
                        {isActive ? "Selected Edition" : "Select Edition"}
                      </div>

                      <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                        {edition.tabLabel}
                      </h2>

                      <div className="mt-4 space-y-2 text-sm text-blue-50">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-blue-300" />
                          <span>{edition.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-300" />
                          <span>{edition.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                {current.eyebrow}
              </p>

              <h2 className="font-heading mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
                {current.title}
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
                {current.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-[color:var(--text-main)]-700">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
                  <CalendarDays className="h-4 w-4 text-blue-600" />
                  <span>{current.date}</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span>{current.venue}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
                >
                  Register to Attend
                </a>

                <a
                  href="/documents/clean-energy-conference-programme-2026.pdf"
                  className="btn-outline-glow rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
                >
                  View Programme
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={current.heroImage}
                    alt={`${current.title} delegates`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Event Overview
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              {current.overviewTitle}
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--text-main)]-600">
              {current.overviewParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {current.stats.map((item) => (
              <StatCard key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      </SectionShell>

      <section className="mx-auto max-w-7xl px-4 pb-10 md:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {current.gallery.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`relative overflow-hidden rounded-[18px] border border-blue-100 bg-blue-50 ${
                index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative aspect-[1.35/1] w-full">
                <Image
                  src={src}
                  alt={`${current.title} gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Why Attend
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              Connect, learn, and build meaningful industry relationships
            </h2>

            <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
              Each edition is tailored to its regional context while maintaining
              the conference’s broader goal of connecting government, industry,
              investors, innovators, and development partners around clean energy
              opportunity.
            </p>

            <div className="mt-8">
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Explore partnership opportunities
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {current.reasonsToAttend.map((reason) => (
              <div
                key={reason}
                className="rounded-[18px] border border-blue-100 bg-white p-5 shadow-sm"
              >
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <p className="text-sm leading-7 text-[color:var(--text-main)]-700">{reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Sectors Represented
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              Cross-sector participation across the clean energy ecosystem
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {current.sectors.map((sector) => (
                <div
                  key={sector}
                  className="rounded-[16px] border border-blue-100 bg-white px-4 py-3 text-sm text-[color:var(--text-main)]-700 shadow-sm"
                >
                  {sector}
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Who Attends
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              A senior-level audience with strong decision-making influence
            </h2>

            <div className="mt-8 space-y-4">
              {current.audienceBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[18px] border border-blue-100 bg-white p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="text-sm font-medium text-[color:var(--text-main)]-700">
                      {item.label}
                    </span>
                    <span className="text-base font-bold text-blue-600">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-blue-50">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                      style={{ width: item.value }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="rounded-[26px] border border-blue-100 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Ready to participate?
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Secure your place at the {current.tabLabel.toLowerCase()}
              </h2>
              <p className="mt-3 text-sm leading-7 text-blue-50 md:text-base">
                Register early, explore the programme, and position your
                organization for visibility, networking, and strategic engagement.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Register Now
              </a>
              <a
                href="/documents/clean-energy-conference-programme-2026.pdf"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Request Programme
              </a>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[22px] border border-blue-100 bg-gradient-to-b from-white to-blue-50 p-6 shadow-sm">
      <p className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900">
        {value}
      </p>
      <p className="mt-2 text-sm text-[color:var(--text-main)]-600">{label}</p>
    </div>
  );
}