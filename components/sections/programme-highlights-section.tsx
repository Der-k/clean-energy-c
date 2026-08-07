"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const GOLD = "#E1BB00";
const GREEN = "#05714F";

type Session = {
  time: string;
  tag: string;
  title: string;
  blurb?: string;
};

type Day = {
  id: string;
  label: string;
  date: string;
  sessions: Session[];
};

const DAYS: Day[] = [
  {
    id: "day-1",
    label: "Day One",
    date: "Thu, 6 Aug 2026",
    sessions: [
      { time: "8:00 – 8:45", tag: "Registration", title: "Welcome Refreshments & Registration" },
      {
        time: "8:45 – 9:00",
        tag: "Opening",
        title: "Opening Remarks",
        blurb: "Stephen Kuria, Executive Chairman, Australia Kenya Chamber of Commerce.",
      },
      {
        time: "9:00 – 10:00",
        tag: "Session 1",
        title: "Keynote & Fireside Chat: The Geopolitics of Energy",
        blurb:
          "Ministerial keynotes and a fireside chat on shifting supply chains and the macroeconomic forces shaping Africa's energy landscape.",
      },
      { time: "10:00 – 10:30", tag: "Break", title: "Networking Break & Exhibition Visit" },
      {
        time: "10:30 – 11:30",
        tag: "Session 2",
        title: "The Energy Paradox: Can East Africa Leapfrog to a Net-Zero Future?",
        blurb: "Reconciling affordable, reliable energy with the push to decarbonize.",
      },
      {
        time: "11:30 – 12:30",
        tag: "Session 3",
        title: "Next-Generation Geothermal: Hybrid Systems & Industrial Applications",
      },
      { time: "12:30 – 13:20", tag: "Break", title: "Lunch & Sponsor Showcase" },
      { time: "13:30 – 14:30", tag: "Session 4", title: "The Energy Crossroads: Innovation, Extraction, or Illusion?" },
      {
        time: "14:30 – 15:30",
        tag: "Session 5",
        title: "Breakout Rooms: Critical Minerals Mining & the Circular Economy",
        blurb:
          "Two parallel tracks — artisanal mining in Rwanda's energy transition, and embedding ESG into investment portfolios.",
      },
      {
        time: "15:30 – 16:30",
        tag: "Session 6",
        title: "The Deal Room: Where Vision Hits the Bottom Line",
        blurb: "Entrepreneurs and investors stress-test bankability across four sectors.",
      },
      { time: "16:30", tag: "Networking", title: "Evening Tea & Networking" },
    ],
  },
  {
    id: "day-2",
    label: "Day Two",
    date: "Fri, 7 Aug 2026",
    sessions: [
      { time: "8:00 – 8:45", tag: "Registration", title: "Welcome Refreshments & Registration" },
      { time: "8:45 – 9:00", tag: "Opening", title: "Welcome & Recap of Day One" },
      {
        time: "9:00 – 10:00",
        tag: "Session 7",
        title: "Keynote: The Capital Paradox",
        blurb: "Why Africa's energy transition isn't moving as fast as the climate-finance rhetoric suggests.",
      },
      { time: "10:00 – 10:30", tag: "Break", title: "Networking Break & Exhibition Visit" },
      { time: "10:30 – 11:30", tag: "Session 8", title: "The Critical Nexus: Balancing Growth, Water & Global Standards" },
      {
        time: "11:30 – 12:00",
        tag: "Session 9",
        title: "The Human & Resource Crisis: Building the Future on Shaky Ground?",
        blurb: "The water-energy-mining nexus meets a widening skills gap.",
      },
      { time: "12:00 – 12:30", tag: "Session 10", title: "From Garbage to Gold: Is Waste-to-Energy a Breakthrough or a Band-Aid?" },
      { time: "12:30 – 13:20", tag: "Break", title: "Lunch & Roundtable Discussions" },
      { time: "13:30 – 14:30", tag: "Session 11", title: "The Smart City Mirage: Progress or Privilege?" },
      {
        time: "14:30 – 15:30",
        tag: "Session 12",
        title: "The Agri-Energy Paradox: Feeding the Future or Fueling the Grid?",
        blurb: "Agrivoltaics, solar irrigation and the trade-offs of the water-energy-food nexus.",
      },
      { time: "15:30 – 16:30", tag: "Session 13", title: "The Innovation Gap: Breakthrough or Just Hype?" },
      {
        time: "16:30 – 17:00",
        tag: "Session 14",
        title: "The Road Ahead: From Consensus to Concrete Action",
        blurb: "Launching the Pan-African Green Energy Roadmap and the Climate Transition Network.",
      },
    ],
  },
];

const ROTATE_MS = 4500;

export function ProgrammeHighlightsSection() {
  const [activeDay, setActiveDay] = useState(DAYS[0].id);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const day = useMemo(() => DAYS.find((d) => d.id === activeDay) ?? DAYS[0], [activeDay]);
  const session = day.sessions[index];

  useEffect(() => {
    setIndex(0);
  }, [activeDay]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % day.sessions.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, [playing, day.sessions.length]);

  const goTo = (i: number) =>
    setIndex(((i % day.sessions.length) + day.sessions.length) % day.sessions.length);

  return (
    <section className="py-12" id="programme">
      <div className="mx-auto max-w-xl px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#05714F]">
              Kigali Edition · 6–7 Aug 2026
            </span>
            <h2 className="font-heading mt-1 text-2xl font-bold text-[var(--foreground)]">
              Conference Programme
            </h2>
          </div>

          {/* Day toggle */}
          <div className="flex shrink-0 gap-1 rounded-full border border-[var(--border-soft)] bg-[var(--surface-muted)] p-1">
            {DAYS.map((d) => {
              const isActive = d.id === activeDay;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveDay(d.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive ? "bg-[#05714F] text-white" : "text-[var(--text-muted)] hover:bg-white"
                  }`}
                >
                  {d.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Rotating card */}
        <div className="surface-card relative overflow-hidden rounded-2xl p-6" style={{ borderColor: `${GOLD}55` }}>
          {/* top accent bar */}
          <div
            className="absolute left-0 top-0 h-1.5 w-full"
            style={{ background: `linear-gradient(90deg, ${GREEN}, ${GOLD})` }}
          />

          <div className="flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.08em]"
              style={{ background: `${GOLD}22`, color: "#8a6d00" }}
            >
              {session.tag}
            </span>
            <span className="text-sm font-semibold" style={{ color: GREEN }}>
              {session.time}
            </span>
          </div>

          <h3
            key={`${day.id}-${index}-title`}
            className="mt-4 min-h-[3.4rem] text-xl font-semibold leading-snug text-[var(--foreground)]"
          >
            {session.title}
          </h3>

          {session.blurb ? (
            <p className="text-muted mt-2 min-h-[2.6rem] text-sm leading-relaxed">{session.blurb}</p>
          ) : (
            <div className="min-h-[2.6rem]" />
          )}

          {/* controls */}
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                aria-label="Previous session"
                onClick={() => goTo(index - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                style={{ border: `1px solid ${GREEN}55`, color: GREEN }}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                aria-label={playing ? "Pause rotation" : "Play rotation"}
                onClick={() => setPlaying((p) => !p)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                style={{ border: `1px solid ${GOLD}88`, color: "#8a6d00" }}
              >
                {playing ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <button
                aria-label="Next session"
                onClick={() => goTo(index + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                style={{ border: `1px solid ${GREEN}55`, color: GREEN }}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            {/* dots */}
            <div className="flex items-center gap-1.5">
              {day.sessions.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to session ${i + 1}`}
                  onClick={() => goTo(i)}
                  className="h-1.5 rounded-full transition-all"
                  style={{
                    width: i === index ? "18px" : "6px",
                    background: i === index ? GREEN : "var(--border-soft)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* footer link */}
        <div className="mt-5 flex items-center justify-between">
          <p className="text-muted text-xs">
            {index + 1} of {day.sessions.length} · {day.date}
          </p>
          <Link
            href="/programme"
            className="text-xs font-bold underline underline-offset-4"
            style={{ color: GREEN }}
          >
            View full programme →
          </Link>
        </div>
      </div>
    </section>
  );
}