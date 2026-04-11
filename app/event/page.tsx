"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Clock3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

type EditionKey = "kigali" | "perth";

const editions = {
  kigali: {
    key: "kigali" as EditionKey,
    tabLabel: "Kigali Edition",
    title: "Kigali Event Overview",
    subtitle:
      "A two-day conference and exhibition centered on East Africa’s clean energy transition, regional integration, investment, and practical collaboration.",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    duration: "2-Day Programme",
    tabImage: "/images/event/kigali-tab.jpg",
    heroImage: "/images/event/kigali-hero.jpg",
    floatingLabel: "Location",
    floatingValue: "Kigali Marriott Hotel, Rwanda",
    summaryTitle: "A concise overview of the Kigali edition",
    summaryParagraphs: [
      "The Kigali Edition is designed as a two-day industry platform focused on East Africa’s energy transition, combining conference sessions, exhibition access, sponsor visibility, networking, and structured discussion.",
      "It highlights regional integration, geothermal and renewable expansion, decentralized energy systems, green industrialization, climate finance mobilization, and Rwanda’s growing leadership in clean mobility and innovation-driven energy policy.",
      "The event creates space for stronger Kenya–Rwanda collaboration in cross-border power trade, regional power pools, clean technology ecosystems, and institutional partnerships.",
    ],
    stats: [
      { value: "2", label: "Conference Days" },
      { value: "600+", label: "Delegates Targeted" },
      { value: "8+", label: "Programme Formats" },
      { value: "EA", label: "Regional Focus" },
    ],
    dayThemes: [
      {
        day: "Day 1",
        title: "Building Rwanda’s Clean Energy Future",
        summary:
          "Government dialogue, smart mobility, clean fuels, clean cooking, geothermal, carbon capture, responsible mining, circular economy, and investor-facing deal rooms.",
      },
      {
        day: "Day 2",
        title: "Climate Finance, ESG & Resilient Energy Systems",
        summary:
          "Climate finance, ESG, workforce transition, waste-to-energy, smart cities, agri-energy, research presentations, and conference close-out action points.",
      },
    ],
    sessionTypes: [
      "Registration and welcome refreshments",
      "Opening remarks and keynote sessions",
      "Government ministries dialogue",
      "Panel discussions",
      "Networking breaks and exhibition visits",
      "Lunch and sponsor showcase",
      "Breakout rooms",
      "Investor deal rooms",
      "Technical and research presentations",
      "Conference summary and call to action",
    ],
  },

  perth: {
    key: "perth" as EditionKey,
    tabLabel: "Perth Edition",
    title: "Perth Event Overview",
    subtitle:
      "A two-day Australia-facing edition connecting African energy priorities to capital markets, advanced mining technologies, green hydrogen, storage, and ESG leadership.",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    duration: "2-Day Programme",
    tabImage: "/images/event/perth-tab.jpg",
    heroImage: "/images/event/perth-hero.jpg",
    floatingLabel: "Location",
    floatingValue: "Novotel Hotel Perth, Western Australia",
    summaryTitle: "A concise overview of the Perth edition",
    summaryParagraphs: [
      "The Perth Edition is positioned as a strategic bridge between African clean energy opportunity and Australian capital, mining technology, and innovation capability.",
      "It focuses on connecting African energy priorities to Australian capital markets, advanced mining technologies, green hydrogen expertise, energy storage innovation, and ESG leadership frameworks.",
      "As a global mining and clean energy investment hub, Perth provides a platform to strengthen Africa–Australia policy dialogue, investment relationships, and value-chain partnerships.",
    ],
    stats: [
      { value: "2", label: "Conference Days" },
      { value: "600+", label: "Delegates Targeted" },
      { value: "AU–AF", label: "Partnership Focus" },
      { value: "Global", label: "Investment Outlook" },
    ],
    dayThemes: [
      {
        day: "Day 1",
        title: "Build Clean Energy Future in Australia",
        summary:
          "Government dialogue, smart mobility, clean fuels, clean cooking, geothermal, CCUS, renewable project finance, critical minerals, circularity, and entrepreneur-investor deal rooms.",
      },
      {
        day: "Day 2",
        title: "Site Visits and Extended Industry Engagement",
        summary:
          "The concept note includes Day 2 starting with mine site and recycling plant visits, extending the edition’s practical focus on mining, circularity, and industrial energy opportunity.",
      },
    ],
    sessionTypes: [
      "Registration and welcome refreshments",
      "Opening remarks and keynote sessions",
      "Government ministries dialogue",
      "Panel discussions",
      "Networking breaks and exhibition visits",
      "Lunch and sponsor showcase",
      "Critical minerals breakout room",
      "Renewable and circular economy discussions",
      "Entrepreneur pitching and deal rooms",
      "Mine site and recycling plant visits",
    ],
  },
};

const editionOrder: EditionKey[] = ["kigali", "perth"];

export default function EventOverviewPage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-cyan-100/60 blur-3xl" />
          <div className="absolute bottom-[-120px] left-[25%] h-[220px] w-[220px] rounded-full bg-blue-50/80 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Event</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Event Overview
            </p>

            <h1 className="font-heading mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Explore the 2026 event editions
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
              Select an edition below to view its dates, location, programme
              emphasis, and key session formats.
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

                        <div className="flex items-center gap-2">
                          <Clock3 className="h-4 w-4 text-blue-300" />
                          <span>{edition.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                {current.tabLabel}
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

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
                  <Clock3 className="h-4 w-4 text-blue-600" />
                  <span>{current.duration}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
                >
                  Register Now
                </a>

                <a
                  href="/documents/clean-energy-conference-programme-2026.pdf"
                  className="btn-outline-glow rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
                >
                  Download Programme
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
                <div className="relative aspect-[4/3.2] w-full">
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

              <div className="absolute -bottom-6 left-6 hidden rounded-2xl border border-blue-100 bg-white px-5 py-4 shadow-xl md:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  {current.floatingLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-[color:var(--text-main)]-700">
                  {current.floatingValue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Summary
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              {current.summaryTitle}
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--text-main)]-600">
              {current.summaryParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.stats.map((item) => (
              <StatCard key={item.label} value={item.value} label={item.label} />
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell muted>
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
            Day Themes
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            Two focused days with distinct themes
          </h2>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {current.dayThemes.map((item) => (
            <div
              key={item.day}
              className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                {item.day}
              </p>
              <h3 className="font-heading mt-3 text-2xl font-semibold text-[color:var(--text-main)]-900">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--text-main)]-600">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              What to Expect
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              Main session and engagement formats
            </h2>
            <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
              The programme combines formal sessions and networking-oriented
              moments so the event feels both informative and commercially useful.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.sessionTypes.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[18px] border border-blue-100 bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="text-sm leading-7 text-[color:var(--text-main)]-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Next step
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Explore the full programme or secure your place
              </h2>
              <p className="mt-3 text-sm leading-7 text-blue-50 md:text-base">
                Review the session flow in more detail or move straight to
                registration.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/documents/clean-energy-conference-programme-2026.pdf"
                download
                className="btn-outline-glow rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
              >
                Download Programme
              </a>
              <a
                href="https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Register Now
                <ArrowRight className="h-4 w-4" />
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