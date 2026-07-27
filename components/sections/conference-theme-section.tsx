"use client";

import { useEffect, useRef, useState } from "react";
import { useRole } from "@/context/RoleContext";
import { rolesContent } from "@/data/rolesData";
import { RotatingWord } from "@/components/shared/rotating-word";

type AgendaTopic = {
  id: string;
  title: string;
  image: string;
  alt: string;
  agendaImage: string;
  agendaAlt: string;
  description: string;
  card1Title: string;
  card1Items: string[];
  card2Title: string;
  card2Description?: string;
  card2ListHeader1?: string;
  card2List1?: string[];
  card2ListHeader2?: string;
  card2List2?: string[];
  card3Title: string;
  card3Items: string[];
};

const agendaTopics: AgendaTopic[] = [
  {
    id: "accelerating-transition",
    title: "1. Accelerating Africa's Energy Transition",
    image: "/images/theme-image-1.jpg",
    alt: "Renewable energy infrastructure",
    agendaImage: "/images/agenda-image-1.jpg",
    agendaAlt: "Close-up of solar panels and wind turbines powering the grid",
    description:
      "The conference exists to accelerate the deployment of renewable energy across Africa by bringing together the public and private sectors needed to move projects from planning to implementation.",
    card1Title: "Core Focus Areas",
    card1Items: [
      "Renewable energy deployment",
      "Grid modernization",
      "Energy access",
      "Energy security",
      "Decarbonization",
      "Sustainable infrastructure",
    ],
    card2Title: "Strategic Impact",
    card2Description:
      "Moving beyond traditional discussions to create actionable roadmaps that upgrade infrastructure, improve grid reliability, and ensure equitable energy access across target markets.",
    card3Title: "Enabling Conditions",
    card3Items: ["Policy alignment", "Grid interconnection", "Local manufacturing capacity", "Skilled workforce pipeline", "Regulatory certainty"],
  },
  {
    id: "mobilising-investment",
    title: "2. Mobilising Investment",
    image: "/images/theme-image-2.jpg",
    alt: "Investment and partnership discussions",
    agendaImage: "/images/agenda-image-2.jpg",
    agendaAlt: "Investors and project developers reviewing financing terms",
    description:
      "Perhaps the strongest theme throughout the documents. The conference isn't simply discussing energy—it's trying to attract capital into Africa.",
    card1Title: "Investment Topics",
    card1Items: [
      "Infrastructure investment",
      "Climate finance",
      "Project finance",
      "Public-private partnerships",
      "Development finance",
      "Bankable projects",
      "Investment readiness",
      "Blended finance",
    ],
    card2Title: "Capital Attraction",
    card2Description:
      "Bridging the gap between institutional investors and shovel-ready projects by deploying de-risking mechanisms, blended capital frameworks, and structured financial instruments.",
    card3Title: "Risk Mitigation Tools",
    card3Items: ["Political risk insurance", "Currency hedging", "Credit guarantees", "First-loss capital", "Multilateral co-financing"],
  },
  {
    id: "africa-australia-cooperation",
    title: "3. Strengthening Africa–Australia Cooperation",
    image: "/images/theme-image-3.jpg",
    alt: "Sustainable growth across Africa and Australia",
    agendaImage: "/images/agenda-image-3.jpg",
    agendaAlt: "Australian and African delegates shaking hands at a signing",
    description:
      "This is what makes the conference unique. Most energy conferences focus on one region. This conference intentionally connects two ecosystems to turn complementary strengths into long-term partnerships.",
    card1Title: "Key Strategic Pillar",
    card1Items: [
      "Cross-border joint ventures",
      "Critical minerals trade",
      "Technology transfer",
      "Institutional investment",
      "Research & development",
    ],
    card2Title: "Ecosystem Contributions",
    card2ListHeader1: "Australia Contributes:",
    card2List1: [
      "Mining expertise",
      "Renewable technology",
      "Project delivery",
      "Institutional investment",
      "Research & engineering",
    ],
    card2ListHeader2: "Africa Contributes:",
    card2List2: [
      "Renewable resources",
      "Critical minerals",
      "Growing energy markets",
      "Industrial opportunity",
      "Large infrastructure demand",
    ],
    card3Title: "Delivery Mechanisms",
    card3Items: ["Bilateral trade agreements", "Joint venture structures", "Government-to-government MOUs", "Industry working groups"],
  },
  {
    id: "innovation-technology",
    title: "4. Driving Innovation & Technology Adoption",
    image: "/images/theme-image-4.jpg",
    alt: "Clean energy technology deployment",
    agendaImage: "/images/agenda-image-4.jpg",
    agendaAlt: "Engineers testing battery storage and smart grid technology",
    description:
      "Another recurring theme. Not just discussing technology—actually helping governments and utilities discover technologies they can deploy.",
    card1Title: "Technologies Explored",
    card1Items: [
      "Battery storage",
      "Smart grids",
      "AI & digital energy",
      "Green hydrogen",
      "Critical minerals processing",
      "EV infrastructure",
      "Emerging clean technologies",
    ],
    card2Title: "Deployment & Scaling",
    card2Description:
      "Demonstrating market-ready innovations directly to policymakers, grid operators, and enterprise leaders to accelerate pilot-to-scale technology transfer.",
    card3Title: "Adoption Pathways",
    card3Items: ["Pilot programs", "Technology demonstrations", "Local capacity building", "Standards & interoperability"],
  },
  {
    id: "building-collaboration",
    title: "5. Building Regional Collaboration",
    image: "/images/theme-image-5.jpg",
    alt: "Africa Australia partnership discussion",
    agendaImage: "/images/agenda-image-5.jpg",
    agendaAlt: "Multi-stakeholder roundtable discussion between sectors",
    description:
      "The documents repeatedly emphasize collaboration across sectors. The conference is specifically designed to remove operational silos.",
    card1Title: "Cross-Sector Stakeholders",
    card1Items: [
      "Governments & Ministries",
      "Utilities & Grid Operators",
      "Global Investors & Financiers",
      "Researchers & Academics",
      "Industry & Enterprises",
      "Development Partners",
      "Technology Companies & Startups",
    ],
    card2Title: "Silo Removal",
    card2Description:
      "Fostering transparent, multi-stakeholder dialogues where public policy aligns directly with commercial requirements and technical feasibility.",
    card3Title: "Collaboration Formats",
    card3Items: ["Cross-sector working groups", "Joint task forces", "Shared data platforms", "Cross-border committees"],
  },
  {
    id: "industrial-development",
    title: "6. Supporting Sustainable Industrial Development",
    image: "/images/theme-image-6.jpg",
    alt: "Grid infrastructure and transmission lines",
    agendaImage: "/images/agenda-image-6.jpg",
    agendaAlt: "Industrial mineral processing facility powered by clean energy",
    description:
      "The conference isn't only about electricity—it's about economic transformation.",
    card1Title: "Economic Drivers",
    card1Items: [
      "Green manufacturing",
      "Critical minerals value chains",
      "Sustainable mining practices",
      "Clean industrialization",
      "Job creation",
      "Skills development",
      "Local content integration",
    ],
    card2Title: "Economic Transformation",
    card2Description:
      "Leveraging abundant clean energy to power local value addition, mineral processing, and industrial expansion rather than exporting raw commodities.",
    card3Title: "Value Chain Priorities",
    card3Items: ["Mineral beneficiation", "Local content requirements", "Export processing zones", "Skills transfer programs"],
  },
  {
    id: "policy-implementation",
    title: "7. Turning Policy Into Implementation",
    image: "/images/theme-image-7.jpg",
    alt: "Community engagement and sustainable local development",
    agendaImage: "/images/agenda-image-7.jpg",
    agendaAlt: "Officials reviewing a signed partnership agreement on stage",
    description:
      "This is probably the biggest differentiator. Many conferences stop at discussions. This conference wants real, tangible outcomes.",
    card1Title: "Target Outcomes",
    card1Items: [
      "Signed partnerships",
      "Investment commitments",
      "New capital projects",
      "Procurement opportunities",
      "Technology adoption",
      "Regional agreements",
      "Knowledge transfer",
    ],
    card2Title: "Action Orientation",
    card2Description:
      "Establishing clear accountability frameworks, deal rooms, and implementation timelines to ensure commitments made on stage translate to active sites.",
    card3Title: "Accountability Measures",
    card3Items: ["Milestone tracking", "Public progress reporting", "Independent audits", "Follow-up conference commitments"],
  },
];

const AUTOPLAY_MS = 8000;

export function ConferenceThemeSection() {
  const { role } = useRole();
  const c = rolesContent[role ?? "default"] ?? rolesContent.default;

  // displayIndex is what's actually rendered; index is the target the user/
  // autoplay asked for. They diverge for the duration of the exit animation,
  // so the old content has time to slide off to the left before the new
  // content (driven by displayIndex) mounts and slides in from the right.
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exiting" | "entering">("idle");

  // Refs mirror the state above so goTo() and the autoplay interval always
  // read the *current* values, never a stale one captured by an old closure.
  // (Previously the autoplay interval was recreated once when `index`
  // changed, capturing displayIndex/phase at that exact mid-transition
  // moment — then never refreshed again, so every later guard check read
  // those frozen stale values and silently no-op'd forever after one tick.)
  const indexRef = useRef(index);
  const displayIndexRef = useRef(displayIndex);
  const phaseRef = useRef(phase);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);
  useEffect(() => {
    displayIndexRef.current = displayIndex;
  }, [displayIndex]);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  // Lets the user pause autoplay just by hovering the content — no button
  // needed, it's the natural "I'm reading this" signal. A ref (not state)
  // so the interval tick below always reads it live without needing to be
  // torn down and recreated (same reasoning as the other refs above).
  const pausedRef = useRef(false);
  const pauseAutoplay = () => {
    pausedRef.current = true;
  };
  const resumeAutoplay = () => {
    pausedRef.current = false;
  };

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const enterTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const thumbRowRef = useRef<HTMLDivElement | null>(null);

  // Must be >= the slowest element's exit duration below (the cards, 700ms)
  // so nothing gets swapped out mid-flight.
  const EXIT_MS = 700;
  // Tiny pause after swapping content so the browser paints the new,
  // off-screen-right "entering" position before we animate it back to rest.
  const ENTER_SETTLE_MS = 30;

  const goTo = (next: number) => {
    const total = agendaTopics.length;
    const target = ((next % total) + total) % total;
    if (target === displayIndexRef.current || phaseRef.current !== "idle") return;

    indexRef.current = target;
    phaseRef.current = "exiting";
    setIndex(target);
    setPhase("exiting");

    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => {
      displayIndexRef.current = target;
      phaseRef.current = "entering";
      setDisplayIndex(target);
      setPhase("entering");

      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
      enterTimerRef.current = setTimeout(() => {
        phaseRef.current = "idle";
        setPhase("idle");
      }, ENTER_SETTLE_MS);
    }, EXIT_MS);
  };

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    };
  }, []);

  // Keep the active theme image in view as the agenda advances (autoplay,
  // dot navigation, or clicking a thumbnail directly). We scroll the row's
  // own scrollLeft directly rather than using scrollIntoView, because
  // scrollIntoView can also drag the page's vertical scroll position to
  // bring the element into the viewport — which we never want here.
  useEffect(() => {
    const row = thumbRowRef.current;
    const thumb = thumbRefs.current[index];
    if (!row || !thumb) return;

    const targetLeft =
      thumb.offsetLeft - row.clientWidth / 2 + thumb.clientWidth / 2;

    row.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  }, [index]);

  // One persistent interval for the component's whole lifetime — it never
  // gets torn down and recreated mid-transition, so it can't end up bound
  // to a stale closure. Each tick reads indexRef.current fresh.
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (pausedRef.current) return;
      goTo(indexRef.current + 1);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeTopic = agendaTopics[displayIndex];
  // Use the site's real primary color (matches --primary in globals.css)
  // instead of an invented rotating palette, so this section reads as part
  // of the same design system as the rest of the site.
  const PRIMARY = "#02026e";
  // Card backgrounds reuse the same navy/emerald/gold brand colors already
  // used for the outer conic-gradient frame, so the multicolor cards tie
  // back into an identity that already exists elsewhere in this component.
  const NAVY = "#0F0F76";
  const EMERALD = "#009966";
  const GOLD = "#F2CB01";
  const themeNumber = String(displayIndex + 1).padStart(2, "0");
  const totalThemes = String(agendaTopics.length).padStart(2, "0");
  const titleWithoutNumber = activeTopic.title.replace(/^\d+\.\s*/, "");

  // Sideways slide classes: exits move left and off-screen, entries start
  // off-screen right and settle at 0. Each element gets its own duration so
  // some move much faster than others (title = quick snap, cards = slow,
  // gradual drift) even though they all travel the same distance.
  const slide = (durationClass: string) => {
    if (phase === "exiting") return `${durationClass} -translate-x-20 opacity-0`;
    if (phase === "entering") return `${durationClass} translate-x-20 opacity-0`;
    return `${durationClass} translate-x-0 opacity-100`;
  };

  return (
    <>
      <style jsx>{`
        .thumb-scroll {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* old Edge/IE */
        }
        .thumb-scroll::-webkit-scrollbar {
          display: none; /* Chrome, Safari, new Edge */
        }
      `}</style>
      <div
      className="w-full p-[6px] shadow-[0_18px_50px_rgba(0,57,148,0.15)]"
      style={{
        background:
          "conic-gradient(#0F0F76 0deg 40deg, #009966 40deg 80deg, #F2CB01 80deg 120deg, #0F0F76 120deg 160deg, #009966 160deg 200deg, #F2CB01 200deg 240deg, #0F0F76 240deg 280deg, #009966 280deg 320deg, #F2CB01 320deg 360deg)",
      }}
    >
      <div className="relative bg-white px-4 py-14 sm:px-6 lg:px-8">
        {/* Ambient wash — a soft navy glow that echoes the site's existing
            hover-glow-card treatment, so this section feels lit the same
            way the rest of the site does rather than sitting flat. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full blur-3xl"
            style={{ backgroundColor: PRIMARY, opacity: 0.07 }}
          />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
              2026 Conference Theme
            </p>
            <h2 className="mt-3 text-[17px] font-semibold tracking-tight text-zinc-950">
              Turning Ambition Into Action
            </h2>
            <h2 className="mt-3 text-[17px] font-semibold text-zinc-800">
              With{" "}
              <RotatingWord words={c.ctaWords} className="text-[#009966]" />
            </h2>
          </div>

          {/* ===== 7 THEME IMAGES GRID ===== */}
          <div
            className="mt-10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <div
              ref={thumbRowRef}
              className="thumb-scroll flex gap-5 px-4 overflow-x-auto sm:px-6 lg:px-8"
            >
              {agendaTopics.map((topic, i) => {
                const isActive = i === index;
                return (
                  <div
                    key={topic.id}
                    ref={(el) => {
                      thumbRefs.current[i] = el;
                    }}
                    onClick={() => goTo(i)}
                    className={`relative flex-1 min-w-[420px] cursor-pointer overflow-hidden rounded-2xl transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_0_70px_18px_rgba(0,153,102,0.65)] ${
                      isActive ? "z-20 shadow-[0_0_70px_18px_rgba(0,153,102,0.65)]" : "z-0 shadow-[var(--shadow-soft)]"
                    }`}
                  >
                    <img
                      src={topic.image}
                      alt={topic.alt}
                      className={`relative block h-96 sm:h-[28rem] lg:h-[34rem] w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-110 ${
                        isActive ? "scale-110" : ""
                      }`}
                    />
                    <div
                      className={`absolute inset-x-0 bottom-0 h-[3px] bg-white transition-opacity duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Prev / next controls, styled to match the site's soft navy
                glow system instead of relying on the raw scrollbar. */}
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous theme"
              className="absolute left-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 sm:left-6"
              style={{ border: "1px solid var(--border-soft)", boxShadow: "var(--shadow-soft)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="#02026e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next theme"
              className="absolute right-4 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 backdrop-blur transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 sm:right-6"
              style={{ border: "1px solid var(--border-soft)", boxShadow: "var(--shadow-soft)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="#02026e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Numbered progress readout */}
            <div
              className="absolute bottom-4 right-4 z-30 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur sm:right-6"
              style={{ color: "#02026e", border: "1px solid var(--border-soft)" }}
            >
              {String(index + 1).padStart(2, "0")} / {String(agendaTopics.length).padStart(2, "0")}
            </div>
          </div>
          {/* ===== END THEME IMAGES ===== */}

          {/* ===== AGENDA OVERVIEW & THIN-BORDERED CARDS ===== */}
          <div
            className="mt-24 px-2 py-6 sm:px-6 lg:px-8"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
          >
            <div className="relative overflow-hidden">
              {/* Ambient glow for this block specifically — centered behind
                  the title/image/cards so the whole agenda area feels lit
                  from within, on top of the page-wide wash above. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
              >
                <div
                  className="h-[34rem] w-[60rem] rounded-full blur-[100px]"
                  style={{ backgroundColor: PRIMARY, opacity: 0.08 }}
                />
              </div>
              <div>
                {/* GIANT TITLE & OVERVIEW PARAGRAPH + IMAGE */}
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-24">
                  <div
                    className={`relative text-left ${slide("transition-all duration-[280ms]")}`}
                  >
                    <span
                      className="text-xs font-bold uppercase tracking-[0.2em]"
                      style={{ color: PRIMARY }}
                    >
                      Theme {themeNumber} / {totalThemes}
                    </span>
                    <h3 className="font-heading relative !mt-8 !text-4xl !font-bold !tracking-tight !text-zinc-950 sm:!text-5xl lg:!text-6xl !leading-[1.1]">
                      {titleWithoutNumber}
                    </h3>
                    <div
                      className="mt-8 h-1.5 w-20 rounded-full"
                      style={{
                        backgroundColor: PRIMARY,
                        boxShadow: "0 4px 16px rgba(2, 2, 110, 0.35)",
                      }}
                    />
                    <p className="relative mt-9 max-w-4xl text-lg leading-relaxed text-zinc-600 font-normal">
                      {activeTopic.description}
                    </p>
                  </div>

                  <div
                    className={slide("transition-all duration-[450ms]")}
                  >
                    <div
                      className="hover-glow-card rounded-3xl p-6 sm:p-8"
                      style={{
                        backgroundColor: "var(--surface)",
                        border: "5px solid #000000",
                        boxShadow: "var(--shadow-soft)",
                      }}
                    >
                      <div className="overflow-hidden rounded-2xl">
                        <img
                          src={activeTopic.agendaImage}
                          alt={activeTopic.agendaAlt}
                          className="h-64 w-full object-cover sm:h-72 lg:h-[22rem]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3 CARDS WITH DETAILED INFORMATION */}
                <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-3 max-w-5xl mx-auto">
                  {/* CARD 1 */}
                  <div className={slide("transition-all duration-[650ms]")}>
                    <div
                      className="hover-glow-card-strong flex min-h-[380px] flex-col rounded-2xl p-6 text-left"
                      style={{
                        backgroundColor: NAVY,
                        border: "5px solid #000000",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <h4 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
                        {activeTopic.card1Title}
                      </h4>
                      <ul className="mt-5 grid grid-cols-1 gap-3 text-base sm:text-lg text-white">
                        {activeTopic.card1Items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: GOLD }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CARD 2 */}
                  <div className={slide("transition-all duration-[700ms]")}>
                    <div
                      className="hover-glow-card-strong flex min-h-[380px] flex-col rounded-2xl p-6 text-left"
                      style={{
                        backgroundColor: EMERALD,
                        border: "5px solid #000000",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <h4 className="font-heading text-lg font-bold uppercase tracking-wide text-white">
                        {activeTopic.card2Title}
                      </h4>

                      {activeTopic.card2Description && (
                        <p className="mt-4 text-base sm:text-lg leading-relaxed text-white/90">
                          {activeTopic.card2Description}
                        </p>
                      )}

                      {activeTopic.card2List1 && (
                        <div className="mt-5 grid grid-cols-1 gap-4 text-base sm:text-lg lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-white/20">
                          <div className="lg:pr-6">
                            <p className="font-semibold text-white mb-2">
                              {activeTopic.card2ListHeader1}
                            </p>
                            <ul className="space-y-1.5 text-white/85">
                              {activeTopic.card2List1.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <span
                                    className="h-1.5 w-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: GOLD }}
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="lg:pl-6">
                            <p className="font-semibold text-white mb-2">
                              {activeTopic.card2ListHeader2}
                            </p>
                            <ul className="space-y-1.5 text-white/85">
                              {activeTopic.card2List2?.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <span
                                    className="h-1.5 w-1.5 rounded-full shrink-0"
                                    style={{ backgroundColor: GOLD }}
                                  />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CARD 3 */}
                  <div className={slide("transition-all duration-[750ms]")}>
                    <div
                      className="hover-glow-card-strong flex min-h-[380px] flex-col rounded-2xl p-6 text-left"
                      style={{
                        backgroundColor: GOLD,
                        border: "5px solid #000000",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <h4 className="font-heading text-lg font-bold uppercase tracking-wide text-black">
                        {activeTopic.card3Title}
                      </h4>
                      <ul className="mt-5 grid grid-cols-1 gap-3 text-base sm:text-lg text-black">
                        {activeTopic.card3Items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: NAVY }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Dots */}
            <div className="mt-10 flex justify-center gap-2">
              {agendaTopics.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${t.title}`}
                  className={`h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === index ? "w-8" : "w-2 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  style={
                    i === index
                      ? {
                          backgroundColor: "#02026e",
                          boxShadow: "0 0 0 3px rgba(2, 2, 110, 0.12)",
                        }
                      : undefined
                  }
                />
              ))}
            </div>
          </div>
          {/* ===== END AGENDA SECTION ===== */}

        </div>
      </div>
    </div>
    </>
  );
}