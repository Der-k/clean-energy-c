"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Clock3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";
import {
  kigaliProgramme,
  perthProgramme,
} from "@/lib/event-programmes";


type EditionKey = "kigali" | "perth";

const editions = {
  kigali: {
    key: "kigali" as EditionKey,
    tabLabel: "Kigali Edition",
    title: "Kigali Event Overview",
    subtitle:
      "A two-day conference and exhibition centered on East Africa's clean energy transition, regional integration, investment, and practical collaboration.",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    duration: "2-Day Programme",
    tabImage: "/images/event/kigali-tab.jpg",
    heroImage: "/images/event/kigali-hero.png",
    floatingLabel: "Location",
    floatingValue: "Kigali Marriott Hotel, Rwanda",
    summaryTitle: "A concise overview of the Kigali edition",
    summaryParagraphs: [
      "The Kigali Edition is designed as a two-day industry platform focused on East Africa's energy transition, combining conference sessions, exhibition access, sponsor visibility, networking, and structured discussion.",
      "It highlights regional integration, geothermal and renewable expansion, decentralized energy systems, green industrialization, climate finance mobilization, and Rwanda's growing leadership in clean mobility and innovation-driven energy policy.",
      "The event creates space for stronger Kenya–Rwanda collaboration in cross-border power trade, regional power pools, clean technology ecosystems, and institutional partnerships.",
    ],
    stats: [
      { value: "2", label: "Conference Days" },
      { value: "600+", label: "Delegates Targeted" },
      { value: "8+", label: "Programme Formats" },
      { value: "EA", label: "Regional Focus" },
    ],
  dayThemes: kigaliProgramme,
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
    heroImage: "/images/event/perth-hero.png",
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
    dayThemes:perthProgramme,
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
              Event Overview
            </p>

            <h1 className="font-heading mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Explore the 2026 event editions
            </h1>

            <p className="mt-5 max-w-3xl text-xl
 leading-8 text-[color:var(--text-main)]-600">
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
                      ? "ring-2 ring-[#02026e] shadow-[0_18px_40px_rgba(2,2,110,0.22)]"
                      : "border border-[#02026e]/20 shadow-sm hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.12)]"
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
                      <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur-md">
                        {isActive ? "Selected Edition" : "Select Edition"}
                      </div>

                      <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-white md:text-3xl">
                        {edition.tabLabel}
                      </h2>

                      <div className="mt-4 space-y-2 text-base text-white/80">
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
                </button>
              );
            })}
          </div>



          <div className="mt-10 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
                {current.tabLabel}
              </p>

              <h2 className="font-heading mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
                {current.title}
              </h2>

              <p className="mt-5 max-w-3xl text-xl
 leading-8 text-[color:var(--text-main)]-600">
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


            <div className="relative">
              <div className="overflow-hidden rounded-[24px] border border-[#02026e]/20 bg-white shadow-[0_20px_50px_rgba(2,2,110,0.08)]">
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
 <SectionShell muted>
  <div className="max-w-3xl">
    <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
      Event Programme
    </p>

    <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900 md:text-4xl">
      Explore the live conference schedule
    </h2>

    <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
      Each event day automatically cycles through the conference programme,
      highlighting key sessions, networking moments, investor discussions,
      exhibitions, and technical presentations.
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
      overflow-hidden

      rounded-full px-6 py-3 text-base font-semibold

      text-[#02026e]
      bg-white

      border border-white/30

      shadow-[0_10px_30px_rgba(0,0,0,0.12)]

      transition-all duration-500 ease-out

      hover:text-white
      hover:border-[#009966]

      hover:shadow-[0_18px_50px_rgba(0,153,102,0.30)]
      hover:scale-[1.05]

      active:scale-[0.97]

      focus:outline-none
      focus:ring-2
      focus:ring-[#009966]/35
      focus:ring-offset-2
      focus:ring-offset-[#02026e]
    "
  >
    {/* emerald sweep */}
    <span className="absolute inset-0 overflow-hidden rounded-full">
      <span
        className="
          absolute left-0 top-0 h-full w-0

          bg-gradient-to-r
          from-[#007a55]
          via-[#009966]
          to-[#00b377]

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
      overflow-hidden

      rounded-full px-6 py-3 text-base font-semibold

      text-white
      bg-white/5 backdrop-blur-sm

      border border-white/25

      shadow-[0_10px_30px_rgba(0,0,0,0.10)]

      transition-all duration-500 ease-out

      hover:border-white/60
      hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]
      hover:scale-[1.05]

      active:scale-[0.97]

      focus:outline-none
      focus:ring-2
      focus:ring-white/30
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

    {/* text turns blue on sweep */}
    <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">
      Request Programme
    </span>
  </a>

</div>
          </div>
        </div>
      </SectionShell>
<SectionShell className="bg-gradient-to-br from-[#02026e] via-[#0b0b8f] to-[#010150] text-white">
  <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
    
    {/* Left Content */}
    <div>
      {/* Section Label */}
      <div className="inline-block">
        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white">
          Summary
        </p>

        <div className="mt-2 h-[2px] w-full rounded-full bg-[#06895b]" />
      </div>

      {/* Heading */}
      <div className="mt-3 inline-block">
        <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] text-white">
          {current.summaryTitle}
        </h2>

        <div className="mt-3 h-[3px] w-24 rounded-full bg-[#06895b]" />
      </div>

      {/* Paragraphs */}
      <div className="mt-6 space-y-5 text-base leading-8 text-white/90">
        {current.summaryParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>

    {/* Stats Grid */}
    <div className="grid gap-4 sm:grid-cols-2">
      {current.stats.map((item) => (
        <div
          key={item.label}
          className="
            group relative overflow-hidden rounded-3xl
            border border-[#06895b]/30
            bg-[#06895b]
            p-6
            transition-all duration-300
            hover:-translate-y-1
            hover:border-[#7fffd4]/40
            hover:bg-[#079c67]
          "
        >
          {/* subtle glow */}
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
              The programme combines formal sessions and networking-oriented
              moments so the event feels both informative and commercially useful.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.sessionTypes.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[18px] border border-[#02026e]/20 bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                <p className="text-base leading-7 text-[color:var(--text-main)]-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell>
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
      overflow-hidden

      rounded-full px-6 py-3 text-base font-semibold

      text-[#02026e]
      bg-white

      border border-white/30

      shadow-[0_10px_30px_rgba(0,0,0,0.12)]

      transition-all duration-500 ease-out

      hover:text-white
      hover:border-[#009966]

      hover:shadow-[0_18px_50px_rgba(0,153,102,0.30)]
      hover:scale-[1.05]

      active:scale-[0.97]

      focus:outline-none
      focus:ring-2
      focus:ring-[#009966]/35
      focus:ring-offset-2
      focus:ring-offset-[#02026e]
    "
  >
    {/* emerald sweep */}
    <span className="absolute inset-0 overflow-hidden rounded-full">
      <span
        className="
          absolute left-0 top-0 h-full w-0

          bg-gradient-to-r
          from-[#007a55]
          via-[#009966]
          to-[#00b377]

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
      overflow-hidden

      rounded-full px-6 py-3 text-base font-semibold

      text-white
      bg-white/5 backdrop-blur-sm

      border border-white/25

      shadow-[0_10px_30px_rgba(0,0,0,0.10)]

      transition-all duration-500 ease-out

      hover:border-white/60
      hover:shadow-[0_18px_50px_rgba(0,0,0,0.18)]
      hover:scale-[1.05]

      active:scale-[0.97]

      focus:outline-none
      focus:ring-2
      focus:ring-white/30
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

    {/* text turns blue on sweep */}
    <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">
      Request Programme
    </span>
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
    <div className="rounded-[22px] border border-[#02026e]/20 bg-gradient-to-b from-white to-[#02026e]/5 p-6 shadow-sm">
      <p className="font-heading text-3xl font-extrabold tracking-[-0.03em] text-[#02026e]">
        {value}
      </p>
      <p className="mt-2 text-base text-[color:var(--text-main)]-600">{label}</p>
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
    setActiveIndex((prev) =>
      prev === programme.length - 1 ? 0 : prev + 1
    );
  };

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? programme.length - 1 : prev - 1
    );
  };

  // AUTO-SWITCH (kept)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === programme.length - 1 ? 0 : prev + 1
      );
    }, 3200);

    return () => clearInterval(interval);
  }, [programme.length]);

  const activeItem = programme[activeIndex];

  return (
    <div className="relative overflow-hidden rounded-[30px] border border-[#02026e]/15 bg-white p-7 shadow-[0_15px_45px_rgba(2,2,110,0.08)]">
      <div className="absolute right-[-50px] top-[-50px] h-[160px] w-[160px] rounded-full bg-[#02026e]/5 blur-3xl" />

      <div className="relative">
        {/* Header */}
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

        {/* Active Slot */}
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

        {/* Navigation Controls */}
        <div className="mt-6 flex items-center justify-between">
         <button
  onClick={goPrev}
  className="
    group relative inline-flex items-center justify-center gap-2
    overflow-hidden

    rounded-full px-4 py-2 text-sm font-semibold

    text-[#020266]
    bg-white

    border border-[#020266]/20

    shadow-sm

    transition-all duration-500 ease-out

    hover:border-[#020266]/60
    hover:scale-[1.04]
    hover:shadow-[0_18px_50px_rgba(2,2,102,0.18)]

    active:scale-[0.97]

    focus:outline-none
    focus:ring-2
    focus:ring-[#020266]/25
    focus:ring-offset-2
    focus:ring-offset-white
  "
>
  {/* blue sweep */}
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span
      className="
        absolute left-0 top-0 h-full w-0
        bg-[#020266]
        transition-all duration-500 ease-out
        group-hover:w-full
      "
    />
  </span>

  <ChevronRight
    className="
      relative z-10 h-4 w-4 rotate-180
      transition-colors duration-300
      group-hover:text-white
    "
  />

  {/* text turns white */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    Previous
  </span>
</button>

<button
  onClick={goNext}
  className="
    group relative inline-flex items-center justify-center gap-2
    overflow-hidden

    rounded-full px-4 py-2 text-sm font-semibold

    text-[#020266]
    bg-white

    border border-[#020266]/20

    shadow-sm

    transition-all duration-500 ease-out

    hover:border-[#020266]/60
    hover:scale-[1.04]
    hover:shadow-[0_18px_50px_rgba(2,2,102,0.18)]

    active:scale-[0.97]

    focus:outline-none
    focus:ring-2
    focus:ring-[#020266]/25
    focus:ring-offset-2
    focus:ring-offset-white
  "
>
  {/* blue sweep */}
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span
      className="
        absolute left-0 top-0 h-full w-0
        bg-[#020266]
        transition-all duration-500 ease-out
        group-hover:w-full
      "
    />
  </span>

  {/* text turns white */}
  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
    Next
  </span>

  <ChevronRight
    className="
      relative z-10 h-4 w-4
      transition-all duration-300
      group-hover:translate-x-1
      group-hover:text-white
    "
  />
</button>
        </div>
      </div>
    </div>
  );
}