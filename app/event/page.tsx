"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";
import {
  KigaliProgramme,
  perthProgramme,
} from "@/lib/event-programmes";

type EditionKey = "Kigali" | "perth";

const editions = {
  Kigali: {
    key: "Kigali" as EditionKey,
    tabLabel: "Kigali Edition",
    title: "Kigali Event Overview",
    subtitle:
      "A four-day edition where African governments and developers present qualified clean-energy and Critical-Mineral projects, and prepare them for investment.",
    tagline: "Where Africa prepares the opportunity",
    date: "25–28 May 2027",
    venue: "Kigali International Convention Centre, Rwanda",
    duration: "4-Day Programme",
    tabImage: "/images/event/kigali-tab.jpg",
    heroImage: "/images/event/kigali-hero.png",
    floatingLabel: "Location",
    floatingValue: "Kigali International Convention Centre, Rwanda",
    summaryTitle: "A concise overview of the Kigali edition",
    summaryParagraphs: [
      "Kigali is where the shared Africa–Australia project pipeline begins. African governments and project developers present qualified projects, and the edition tests them against regulatory conditions, regional infrastructure needs and investor expectations.",
      "Sessions cover project preparation and qualification, development-finance participation, project-owner and investor matching, and local manufacturing and workforce development, leveraging AfCFTA frameworks.",
      "Hosted with the support of Rwanda's Ministry of Infrastructure and Kenya's Ministry of Energy & Petroleum, the edition also advances Rwanda's role in AU energy initiatives such as the Continental Power System Master Plan and the African Single Electricity Market.",
    ],
    stats: [
      { value: "4", label: "Conference Days" },
      { value: "60%", label: "Of the world's best solar resources are in Africa" },
      { value: "USD 200–240B", label: "Annual clean-energy investment Africa needs by 2030 (IEA)" },
      { value: "~2–3%", label: "Share of global clean-energy investment Africa attracts today (IEA)" },
    ],
    focusAreas: [
      "African government priorities and regulatory conditions",
      "Regional infrastructure needs",
      "Project preparation and qualification",
      "Development-finance participation",
      "Project-owner and investor matching",
      "Local manufacturing and workforce development",
    ],
    dayThemes: KigaliProgramme,
    sessionTypes: [
      "Project Showcase: structured 15-minute pipeline presentations",
      "Project Clinics: technical and financial review (by invitation)",
      "Investor Lounge: pre-booked matched meetings",
      "Regulatory Working Sessions: closed-format barrier log",
      "Government ministries dialogue",
      "Development finance and DFI roundtables",
      "Keynote on energy security and geopolitical change",
      "Local manufacturing and workforce sessions",
      "Networking breaks and exhibition visits",
      "Conference summary and call to action",
    ],
  },

  perth: {
    key: "perth" as EditionKey,
    tabLabel: "Perth Edition",
    title: "Perth Event Overview",
    subtitle:
      "A four-day Australia edition where investors, technology providers and delivery partners respond to the projects introduced in Kigali.",
    tagline: "Where Australia helps move the opportunity forward",
    date: "30 Aug – 2 Sept 2027",
    venue: "Perth, Western Australia (venue TBA)",
    duration: "4-Day Programme",
    tabImage: "/images/event/perth-tab.jpg",
    heroImage: "/images/event/perth-hero.png",
    floatingLabel: "Location",
    floatingValue: "Perth, Western Australia (venue TBA)",
    summaryTitle: "A concise overview of the Perth edition",
    summaryParagraphs: [
      "Perth is where Australian capital, mining expertise and clean-tech maturity respond to the pipeline built in Kigali. Projects are tested, matched and tracked so that every introduction is followed through.",
      "The edition covers mining and Critical-Mineral investment, Australian technology, storage and grid expertise, engineering and project delivery, institutional capital, and research and skills partnerships.",
      "Australia brings renewables at more than 42.7% of national electricity generation, the third-largest utility-scale battery market, and about 170 ASX-listed companies active across roughly 35 African countries.",
    ],
    stats: [
      { value: "4", label: "Conference Days" },
      { value: "42.7%+", label: "Of Australian electricity generation is renewable" },
      { value: "~170", label: "ASX-listed companies operating in about 35 African countries" },
      { value: "A$4.5T", label: "Invested overseas by Australian institutions (DFAT, end-2025)" },
    ],
    focusAreas: [
      "Mining and Critical-Mineral investment",
      "Australian technology, storage and grid expertise",
      "Engineering and project delivery",
      "Institutional capital",
      "Research and skills partnerships",
      "Structured responses to projects introduced in Kigali",
    ],
    dayThemes: perthProgramme,
    sessionTypes: [
      "Investor Lounge: matched meetings by appointment",
      "Structured responses to Kigali pipeline projects",
      "Project Clinics: technical and financial review",
      "Regulatory Working Sessions",
      "Critical-Mineral value chain breakout",
      "Mining-energy and hybrid solar-storage sessions",
      "Storage, grid and C&I battery sessions",
      "Reaching financial close: co-investment with DFIs",
      "Research and skills partnership sessions",
      "Keynote on energy security and geopolitical change",
    ],
  },
};

const capabilityFit = [
  {
    strength: "Mining finance",
    detail: "ASX-listed miners active in about 35 African countries",
    need: "Capital for processing and downstream steps at existing mines",
    fit: "Processing-stage joint ventures and offtake-linked finance",
  },
  {
    strength: "Mining-energy technology",
    detail:
      "WA miners run large off-grid renewable systems; Fortescue reports 480 km of transmission built and a 2 to 3 GW target by 2030",
    need: "Mines dependent on diesel or unreliable grids",
    fit: "Hybrid solar-storage at operating mines, with the mine as anchor load for a wider renewable project",
  },
  {
    strength: "Storage and grid",
    detail: "Third-largest utility-scale battery market (Clean Energy Council, 2026)",
    need: "Grids absorbing fast-growing distributed solar",
    fit: "Storage pilots, C&I batteries, grid-planning technical assistance",
  },
  {
    strength: "Engineering and project delivery",
    detail: "Feasibility, owner's engineer and PMO expertise",
    need: "The project-preparation gap",
    fit: "Feasibility, owner's engineer and PMO contracts funded by DFI preparation facilities",
  },
  {
    strength: "Institutional capital",
    detail: "A$4.5 trillion invested overseas (DFAT, end-2025)",
    need: "About 3% of global energy investment; capital costs at least double those in advanced economies",
    fit: "Co-investment alongside DFIs with guarantees. Institutions arrive after de-risking.",
  },
  {
    strength: "Research and skills",
    detail: "Universities, Australia Awards short courses",
    need: "About 2% of the renewable workforce",
    fit: "Institutional pairings, grid-operator training, metallurgy and processing courses",
  },
];

const dealRoom = [
  {
    space: "Project Showcase",
    job: "Structured 15-minute presentations of pipeline projects",
    rule: "Standard template. Qualified projects only.",
  },
  {
    space: "Project Clinics",
    job: "Technical and financial interrogation",
    rule: "By invitation. Output is the Readiness Note.",
  },
  {
    space: "Investor Lounge",
    job: "Matched meetings by appointment",
    rule: "Pre-booked through the pipeline register.",
  },
  {
    space: "Regulatory Working Sessions",
    job: "Barriers, permits, market rules",
    rule: "Closed format. Output is the barrier log.",
  },
];

const editionOrder: EditionKey[] = ["Kigali", "perth"];

export default function EventOverviewPage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("Kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);

  return (
    <main className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/8 blur-3xl" />
          <div className="absolute bottom-[-120px] left-[25%] h-[220px] w-[220px] rounded-full bg-[#02026e]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Event</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              From Minerals to Megawatts
            </p>

            <h1 className="font-heading mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Explore the 2027 event editions
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-8 text-[color:var(--text-main)]-600">
              Two continents, one clean-energy decade. CEAA 2027 is staged in
              Kigali and Perth, with one shared project and partnership
              pipeline connecting both cities. Select an edition to view its
              dates, location, focus and session formats.
            </p>
          </div>

          {/* EDITION SELECTOR */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {editionOrder.map((editionKey) => {
              const edition = editions[editionKey];
              const isActive = activeEdition === editionKey;

              return (
                <button
                  key={editionKey}
                  type="button"
                  onClick={() => setActiveEdition(editionKey)}
                  className="group relative text-left"
                >
                  {isActive && (
                    <div className="absolute -inset-2 -z-10 rounded-[32px] bg-gradient-to-br from-[#02026e]/25 via-[#06895b]/20 to-transparent blur-xl" />
                  )}

                  <div
                    className={`relative overflow-hidden rounded-[28px] transition-all duration-500 ${
                      isActive
                        ? "ring-2 ring-[#02026e] shadow-[0_25px_60px_rgba(2,2,110,0.28)]"
                        : "border border-[#02026e]/20 shadow-sm hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(2,2,110,0.16)]"
                    }`}
                  >
                    <div className="relative h-[340px] w-full sm:h-[380px] md:h-[420px]">
                      <Image
                        src={edition.tabImage}
                        alt={edition.tabLabel}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className={`object-cover transition-transform duration-700 ease-out ${
                          isActive ? "scale-[1.04]" : "group-hover:scale-[1.06]"
                        }`}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/5" />

                      <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                        <div
                          className={`mb-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md ${
                            isActive
                              ? "border-[#06895b]/50 bg-[#06895b]/90 text-white"
                              : "border-white/20 bg-white/10 text-white/80"
                          }`}
                        >
                          {isActive ? "Selected Edition" : "Select Edition"}
                        </div>

                        <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
                          {edition.tabLabel}
                        </h2>

                        <p className="mt-2 text-base text-white/80">
                          {edition.tagline}
                        </p>

                        <div className="mt-4 space-y-2 text-base text-white/85">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-white/60" />
                            <span>{edition.date}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-white/60" />
                            <span>{edition.venue}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-white/60" />
                            <span>{edition.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
                {current.tabLabel}
              </p>

              <h2 className="font-heading mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
                {current.title}
              </h2>

              <p className="mt-5 max-w-3xl text-xl leading-8 text-[color:var(--text-main)]-600">
                {current.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-base text-[color:var(--text-main)]-700">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#02026e]/20 bg-white px-4 py-2 shadow-sm">
                  <CalendarDays className="h-4 w-4 text-[#02026e]" />
                  <span>{current.date}</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[#02026e]/20 bg-white px-4 py-2 shadow-sm">
                  <MapPin className="h-4 w-4 text-[#02026e]" />
                  <span>{current.venue}</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-[#02026e]/20 bg-white px-4 py-2 shadow-sm">
                  <Clock3 className="h-4 w-4 text-[#02026e]" />
                  <span>{current.duration}</span>
                </div>
              </div>
            </div>

            {/* HERO IMAGE */}
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[30px] bg-gradient-to-br from-[#02026e]/20 via-[#06895b]/15 to-transparent blur-2xl" />
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-[24px] border-2 border-[#06895b]/30" />

              <div className="overflow-hidden rounded-[24px] border border-[#02026e]/20 bg-white shadow-[0_30px_70px_rgba(2,2,110,0.18)]">
                <div className="relative aspect-[4/4.4] w-full">
                  <Image
                    src={current.heroImage}
                    alt={`${current.tabLabel} conference session`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="absolute -bottom-6 left-6 hidden rounded-2xl border border-[#02026e]/20 bg-white px-5 py-4 shadow-xl md:block">
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#02026e]">
                  {current.floatingLabel}
                </p>
                <p className="mt-2 text-base font-medium text-[color:var(--text-main)]-700">
                  {current.floatingValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITION FOCUS AREAS */}
      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              {current.tabLabel}
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              {current.tagline}
            </h2>
            <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
              One shared project and partnership pipeline connects Kigali
              (25–28 May 2027) and Perth (30 Aug – 2 Sept 2027). Projects
              introduced in Kigali receive structured responses in Perth.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.focusAreas.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[18px] border border-[#02026e]/20 bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#06895b]" />
                <p className="text-base leading-7 text-[color:var(--text-main)]-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell muted>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
            Event Programme
          </p>

          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900 md:text-4xl">
            Explore the live conference schedule
          </h2>

          <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
            Each event day automatically cycles through the conference
            programme, highlighting key sessions, networking moments, investor
            discussions, exhibitions, and technical presentations.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {current.dayThemes.map((item) => (
            <ProgrammeCard
              key={item.day}
              day={item.day}
              title={item.title}
              programme={item.programme}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <CtaBanner />
      </SectionShell>

      {/* SUMMARY + STATS */}
      <SectionShell className="bg-gradient-to-br from-[#02026e] via-[#0b0b8f] to-[#010150] text-white">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-block">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white">
                Summary
              </p>
              <div className="mt-2 h-[2px] w-full rounded-full bg-[#06895b]" />
            </div>

            <div className="mt-3 inline-block">
              <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] text-white">
                {current.summaryTitle}
              </h2>
              <div className="mt-3 h-[3px] w-24 rounded-full bg-[#06895b]" />
            </div>

            <div className="mt-6 space-y-5 text-base leading-8 text-white/90">
              {current.summaryParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.stats.map((item) => (
              <div
                key={item.label}
                className="group relative overflow-hidden rounded-3xl border border-[#06895b]/30 bg-[#06895b] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#7fffd4]/40 hover:bg-[#079c67]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative z-10">
                  <p className="text-3xl font-bold tracking-tight text-white">
                    {item.value}
                  </p>
                  <div className="mt-3 h-[2px] w-12 rounded-full bg-white/70" />
                  <p className="mt-4 text-sm leading-6 text-white/90">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* WHAT TO EXPECT */}
      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              What to Expect
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              Main session and engagement formats
            </h2>
            <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
              The programme is built as a deal room, not a talking shop. Formal
              sessions feed structured investor engagement, and each space
              produces a defined output.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.sessionTypes.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[18px] border border-[#02026e]/20 bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                <p className="text-base leading-7 text-[color:var(--text-main)]-700">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      {/* DEAL ROOM */}
      <SectionShell muted>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
            The Deal Room
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900 md:text-4xl">
            Four spaces, each with a defined job and output
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {dealRoom.map((item) => (
            <div
              key={item.space}
              className="rounded-[24px] border border-[#02026e]/15 bg-white p-6 shadow-[0_15px_45px_rgba(2,2,110,0.08)]"
            >
              <h3 className="font-heading text-xl font-bold text-[#02026e]">
                {item.space}
              </h3>
              <p className="mt-3 text-base leading-7 text-[color:var(--text-main)]-700">
                {item.job}
              </p>
              <div className="mt-4 h-[2px] w-12 rounded-full bg-[#06895b]" />
              <p className="mt-4 text-sm font-medium leading-6 text-[color:var(--text-main)]-600">
                {item.rule}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      {/* CAPABILITY FIT */}
      <SectionShell>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
            Why This Convergence Matters
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900 md:text-4xl">
            Where Australian capability fits African need
          </h2>
          <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
            Africa holds 60% of the world&apos;s best solar resources and over
            30% of green-tech critical minerals, and demand for magnetic rare
            earths alone is set to triple by 2035. Australia brings capital,
            mining expertise and clean-tech maturity.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-[24px] border border-[#02026e]/15 shadow-sm">
          <table className="w-full min-w-[820px] border-collapse bg-white text-left">
            <thead>
              <tr className="bg-[#02026e] text-white">
                <th className="px-5 py-4 text-sm font-semibold">Australian strength</th>
                <th className="px-5 py-4 text-sm font-semibold">African need</th>
                <th className="px-5 py-4 text-sm font-semibold">Fastest fit</th>
              </tr>
            </thead>
            <tbody>
              {capabilityFit.map((row, i) => (
                <tr
                  key={row.strength}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#02026e]/[0.03]"}
                >
                  <td className="align-top px-5 py-4 text-sm leading-6 text-[color:var(--text-main)]-700">
                    <span className="block font-semibold text-[#02026e]">
                      {row.strength}
                    </span>
                    {row.detail}
                  </td>
                  <td className="align-top px-5 py-4 text-sm leading-6 text-[color:var(--text-main)]-700">
                    {row.need}
                  </td>
                  <td className="align-top px-5 py-4 text-sm font-medium leading-6 text-[#06895b]">
                    {row.fit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionShell>

      <SectionShell>
        <CtaBanner />
      </SectionShell>
    </main>
  );
}

function CtaBanner() {
  return (
    <div className="rounded-[28px] border border-[#02026e]/30 bg-gradient-to-r from-[#02026e] to-[#010150] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.22)] md:px-10 md:py-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Next step
          </p>
          <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
            Explore the full programme or secure your place
          </h2>
          <p className="mt-3 text-base leading-7 text-white/80 md:text-base">
            Review the session flow in more detail or move straight to
            registration.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {/* REGISTER NOW */}
          <a
            href="/get-tickets"
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden rounded-full px-6 py-3 text-base font-semibold
              text-[#02026e] bg-white border border-white/30
              shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              transition-all duration-500 ease-out
              hover:text-white hover:border-[#009966]
              hover:shadow-[0_18px_50px_rgba(0,153,102,0.30)]
              hover:scale-[1.05] active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-[#009966]/35
              focus:ring-offset-2 focus:ring-offset-[#02026e]
            "
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span
                className="
                  absolute left-0 top-0 h-full w-0
                  bg-gradient-to-r from-[#007a55] via-[#009966] to-[#00b377]
                  transition-all duration-500 ease-out
                  group-hover:w-full
                "
              />
            </span>
            <span className="relative z-10">Register Now</span>
          </a>

          {/* REQUEST PROGRAMME */}
          <a
            href="/event/programme"
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden rounded-full px-6 py-3 text-base font-semibold
              text-white bg-white/5 backdrop-blur-sm border border-white/25
              shadow-[0_10px_30px_rgba(0,0,0,0.10)]
              transition-all duration-500 ease-out
              hover:border-white/60
              hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]
              hover:scale-[1.05] active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-white/30
              focus:ring-offset-2 focus:ring-offset-[#02026e]
            "
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span
                className="
                  absolute left-0 top-0 h-full w-0 bg-white
                  transition-all duration-500 ease-out
                  group-hover:w-full
                "
              />
            </span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">
              Request Programme
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ProgrammeCard({
  day,
  title,
  programme,
}: {
  day: string;
  title: string;
  programme: {
    time: string;
    activity: string;
  }[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((prev) => (prev === programme.length - 1 ? 0 : prev + 1));
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? programme.length - 1 : prev - 1));
  };

  // AUTO-SWITCH
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === programme.length - 1 ? 0 : prev + 1));
    }, 3200);

    return () => clearInterval(interval);
  }, [programme.length]);

  const activeItem = programme[activeIndex];

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[#02026e]/15 bg-white p-7 shadow-[0_15px_45px_rgba(2,2,110,0.08)]">
      <div className="absolute right-[-50px] top-[-50px] h-[160px] w-[160px] rounded-full bg-[#02026e]/5 blur-3xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              {day}
            </p>

            <h3 className="font-heading mt-3 max-w-[420px] text-2xl font-bold leading-tight text-[color:var(--text-main)]-900">
              {title}
            </h3>
          </div>

          <div className="rounded-2xl bg-[#02026e] px-4 py-3 text-white shadow-lg">
            <Clock3 className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-10 rounded-[24px] border border-[#02026e]/10 bg-gradient-to-br from-[#02026e] to-[#010150] p-7 text-white">
          <div className="text-sm uppercase tracking-[0.18em] text-white/60">
            Current Programme Slot
          </div>

          <div className="mt-4 text-5xl font-black tracking-[-0.04em]">
            {activeItem.time}
          </div>

          <div className="mt-5 text-xl font-medium leading-9 text-white/90">
            {activeItem.activity}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={goPrev}
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden rounded-full px-4 py-2 text-sm font-semibold
              text-[#020266] bg-white border border-[#020266]/20 shadow-sm
              transition-all duration-500 ease-out
              hover:border-[#020266]/60 hover:scale-[1.04]
              hover:shadow-[0_18px_50px_rgba(2,2,102,0.18)]
              active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-[#020266]/25
              focus:ring-offset-2 focus:ring-offset-white
            "
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute left-0 top-0 h-full w-0 bg-[#020266] transition-all duration-500 ease-out group-hover:w-full" />
            </span>

            <ChevronRight className="relative z-10 h-4 w-4 rotate-180 transition-colors duration-300 group-hover:text-white" />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Previous
            </span>
          </button>

          <button
            onClick={goNext}
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden rounded-full px-4 py-2 text-sm font-semibold
              text-[#020266] bg-white border border-[#020266]/20 shadow-sm
              transition-all duration-500 ease-out
              hover:border-[#020266]/60 hover:scale-[1.04]
              hover:shadow-[0_18px_50px_rgba(2,2,102,0.18)]
              active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-[#020266]/25
              focus:ring-offset-2 focus:ring-offset-white
            "
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute left-0 top-0 h-full w-0 bg-[#020266] transition-all duration-500 ease-out group-hover:w-full" />
            </span>

            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              Next
            </span>

            <ChevronRight className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}