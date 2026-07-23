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
  description: string;
  card1Title: string;
  card1Items: string[];
  card2Title: string;
  card2Description?: string;
  card2ListHeader1?: string;
  card2List1?: string[];
  card2ListHeader2?: string;
  card2List2?: string[];
};

const agendaTopics: AgendaTopic[] = [
  {
    id: "accelerating-transition",
    title: "1. Accelerating Africa's Energy Transition",
    image: "/images/theme-image-1.jpg",
    alt: "Renewable energy infrastructure",
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
  },
  {
    id: "mobilising-investment",
    title: "2. Mobilising Investment",
    image: "/images/theme-image-2.jpg",
    alt: "Investment and partnership discussions",
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
  },
  {
    id: "africa-australia-cooperation",
    title: "3. Strengthening Africa–Australia Cooperation",
    image: "/images/theme-image-3.jpg",
    alt: "Sustainable growth across Africa and Australia",
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
  },
  {
    id: "innovation-technology",
    title: "4. Driving Innovation & Technology Adoption",
    image: "/images/theme-image-4.jpg",
    alt: "Clean energy technology deployment",
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
  },
  {
    id: "building-collaboration",
    title: "5. Building Regional Collaboration",
    image: "/images/theme-image-5.jpg",
    alt: "Africa Australia partnership discussion",
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
  },
  {
    id: "industrial-development",
    title: "6. Supporting Sustainable Industrial Development",
    image: "/images/theme-image-6.jpg",
    alt: "Grid infrastructure and transmission lines",
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
  },
  {
    id: "policy-implementation",
    title: "7. Turning Policy Into Implementation",
    image: "/images/theme-image-7.jpg",
    alt: "Community engagement and sustainable local development",
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
  },
];

const AUTOPLAY_MS = 8000;

export function ConferenceThemeSection() {
  const { role } = useRole();
  const c = rolesContent[role ?? "default"] ?? rolesContent.default;

  const [index, setIndex] = useState(0);
  const [entering, setEntering] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = (next: number) => {
    const total = agendaTopics.length;
    const target = ((next % total) + total) % total;
    if (target === index) return;
    setEntering(true);
    setIndex(target);
  };

  useEffect(() => {
    const t = setTimeout(() => setEntering(false), 20);
    return () => clearTimeout(t);
  }, [index]);

  // Keep the active theme image in view as the agenda advances (autoplay,
  // dot navigation, or clicking a thumbnail directly).
  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [index]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      goTo(index + 1);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const activeTopic = agendaTopics[index];
  const accentPalette = ["#0F0F76", "#009966", "#F2CB01"];
  const accent = accentPalette[index % accentPalette.length];
  const accentAlt = accentPalette[(index + 1) % accentPalette.length];
  const themeNumber = String(index + 1).padStart(2, "0");
  const totalThemes = String(agendaTopics.length).padStart(2, "0");
  const titleWithoutNumber = activeTopic.title.replace(/^\d+\.\s*/, "");

  return (
    <div
      className="w-full overflow-hidden p-[6px] shadow-[0_18px_50px_rgba(0,57,148,0.15)]"
      style={{
        background:
          "conic-gradient(#0F0F76 0deg 40deg, #009966 40deg 80deg, #F2CB01 80deg 120deg, #0F0F76 120deg 160deg, #009966 160deg 200deg, #F2CB01 200deg 240deg, #0F0F76 240deg 280deg, #009966 280deg 320deg, #F2CB01 320deg 360deg)",
      }}
    >
      <div className="relative overflow-hidden bg-[#FBFAF7] px-4 py-14 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 10%, #0F0F76, transparent 38%), radial-gradient(circle at 85% 0%, #009966, transparent 35%), radial-gradient(circle at 50% 100%, #F2CB01, transparent 42%)",
          }}
        />
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
          <div className="mt-10 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
            <div className="flex gap-0 overflow-x-auto">
              {agendaTopics.map((topic, i) => {
                const isActive = i === index;
                const dotAccent = accentPalette[i % accentPalette.length];
                return (
                  <div
                    key={topic.id}
                    ref={(el) => {
                      thumbRefs.current[i] = el;
                    }}
                    onClick={() => goTo(i)}
                    className="relative flex-1 min-w-[420px] cursor-pointer overflow-hidden"
                  >
                    <img
                      src={topic.image}
                      alt={topic.alt}
                      className={`relative block h-96 sm:h-[28rem] lg:h-[34rem] w-full object-cover transition-transform duration-300 ease-out hover:z-20 hover:scale-105 hover:shadow-[0_18px_30px_rgba(2,6,23,0.3)] ${
                        isActive
                          ? "z-10 opacity-100 ring-4 ring-inset"
                          : "z-0 opacity-85 hover:opacity-100"
                      }`}
                      style={isActive ? { boxShadow: `inset 0 0 0 4px ${dotAccent}` } : undefined}
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />
                    <span
                      className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-xs font-bold tracking-wide text-white shadow-sm"
                      style={{ backgroundColor: isActive ? dotAccent : "rgba(15,15,20,0.55)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* ===== END THEME IMAGES ===== */}

          {/* ===== AGENDA OVERVIEW & THIN-BORDERED CARDS ===== */}
          <div className="mt-12 px-2 py-6 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden">
              <div
                key={activeTopic.id}
                className={`transition-all duration-500 ease-out ${
                  entering
                    ? "translate-x-6 opacity-0"
                    : "translate-x-0 opacity-100"
                }`}
              >
                {/* GIANT TITLE & OVERVIEW PARAGRAPH + IMAGE */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-center">
                  <div className="relative text-left">
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-8 left-0 select-none font-mono text-[7rem] font-black leading-none sm:-top-12 sm:text-[9rem] lg:-top-14 lg:text-[11rem]"
                      style={{ color: accent, opacity: 0.08 }}
                    >
                      {themeNumber}
                    </span>
                    <span
                      className="relative inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white"
                      style={{ backgroundColor: accent }}
                    >
                      Theme {themeNumber} / {totalThemes}
                    </span>
                    <h3 className="relative !mt-4 !text-4xl !font-black !tracking-tight !text-zinc-950 sm:!text-6xl lg:!text-7xl !leading-[1.05]">
                      {titleWithoutNumber}
                    </h3>
                    <p className="relative mt-5 max-w-4xl text-lg sm:text-xl leading-relaxed text-zinc-600 font-normal">
                      {activeTopic.description}
                    </p>
                  </div>

                  <div className="relative p-3 sm:p-4">
                    {/* Hand-drawn sketch frame, sits just outside the photo */}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 400 300"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-0 h-full w-full"
                    >
                      <path
                        d="M20,18 L380,20 L384,282 L18,284 L16,16 L26,14"
                        fill="none"
                        stroke={accent}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-zinc-200/80">
                      <img
                        src={activeTopic.image}
                        alt={activeTopic.alt}
                        className="h-64 w-full object-cover sm:h-72 lg:h-[22rem]"
                      />
                      <div
                        className="absolute inset-x-0 bottom-0 h-1.5"
                        style={{ backgroundColor: accent }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2 CARDS WITH DETAILED INFORMATION */}
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* CARD 1 */}
                  <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md text-left">
                    <div className="h-1.5 w-full" style={{ backgroundColor: accent }} />
                    <div className="p-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                        {activeTopic.card1Title}
                      </h4>
                      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-sm text-zinc-700">
                        {activeTopic.card1Items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span
                              className="mt-1 h-1.5 w-1.5 rounded-full shrink-0"
                              style={{ backgroundColor: accent }}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CARD 2 */}
                  <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md text-left">
                    <div className="h-1.5 w-full" style={{ backgroundColor: accentAlt }} />
                    <div className="p-6">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F0F76]">
                        {activeTopic.card2Title}
                      </h4>

                      {activeTopic.card2Description && (
                        <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                          {activeTopic.card2Description}
                        </p>
                      )}

                      {/* Conditional list for Africa-Australia regional contributions —
                          green & gold echo Australia's national colors, tying the
                          two-region theme to the accent system. */}
                      {activeTopic.card2List1 && (
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div className="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3">
                            <p className="font-semibold text-emerald-900 mb-2">
                              {activeTopic.card2ListHeader1}
                            </p>
                            <ul className="space-y-1.5 text-emerald-800/80">
                              {activeTopic.card2List1.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="rounded-lg border border-amber-100 bg-amber-50/60 p-3">
                            <p className="font-semibold text-amber-900 mb-2">
                              {activeTopic.card2ListHeader2}
                            </p>
                            <ul className="space-y-1.5 text-amber-800/80">
                              {activeTopic.card2List2?.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <span className="h-1 w-1 rounded-full bg-amber-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
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
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === index ? "w-10" : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                  }`}
                  style={
                    i === index
                      ? { background: "linear-gradient(90deg, #0F0F76, #009966, #F2CB01)" }
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
  );
}