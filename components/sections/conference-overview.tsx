"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { useRole, type RoleKey } from "@/context/RoleContext";
import {
  rolesContent,
  type Highlight,
  type AudienceItem,
} from "@/data/rolesData";

/* ----------------------------------------------------------------------- */
/* All role-specific copy (headings, highlights, stats, outcomes,          */
/* audience cards, CTA words, banner paragraph) lives in                   */
/* data/rolesData.ts. This file handles rendering + the interactive bits   */
/* (the shuffling card stack, role tabs, rotating word, etc).              */
/*                                                                         */
/* The 2027 concept-note content (editions, convergence stats, capability  */
/* fit table, deal room, pillars) is defined in this file below, so the    */
/* `editions` export in rolesData.ts is no longer used here.               */
/* ----------------------------------------------------------------------- */

/* ----------------------------------------------------------------------- */
/* CEAA 2027 concept-note content                                          */
/* ----------------------------------------------------------------------- */

type Edition = {
  name: string;
  date: string;
  venue: string;
  description: string;
  focus: string[];
  accent: string;
};

const EDITIONS_2027: Edition[] = [
  {
    name: "Kigali Edition",
    date: "25–28 May 2027",
    venue: "Kigali International Convention Centre, Rwanda",
    description:
      "Where Africa prepares the opportunity. African governments and developers present qualified projects to investors and development-finance partners.",
    focus: [
      "African government priorities and regulatory conditions",
      "Regional infrastructure needs",
      "Project preparation and qualification",
      "Development-finance participation",
      "Project-owner and investor matching",
      "Local manufacturing and workforce development",
    ],
    accent: "from-blue-50 to-white border-blue-200",
  },
  {
    name: "Australia Edition",
    date: "30 Aug – 2 Sept 2027",
    venue: "Perth, Western Australia (venue TBA)",
    description:
      "Where Australia helps move the opportunity forward. Investors, technology providers and delivery partners respond to the projects introduced in Kigali.",
    focus: [
      "Mining and Critical-Mineral investment",
      "Australian technology, storage and grid expertise",
      "Engineering and project delivery",
      "Institutional capital",
      "Research and skills partnerships",
      "Structured responses to projects introduced in Kigali",
    ],
    accent: "from-emerald-50 to-white border-emerald-200",
  },
];

const CONVERGENCE_STATS = [
  {
    value: "60%",
    label: "of the world's best solar resources are in Africa",
  },
  {
    value: "USD 200–240B",
    label: "Africa's required annual clean-energy investment by 2030 (IEA)",
  },
  {
    value: "~2–3%",
    label:
      "of global clean-energy investment goes to Africa, despite 20% of the world's population (IEA)",
  },
  {
    value: "30%+",
    label: "of global green-tech critical minerals are held by Africa (East Asia Forum)",
  },
  {
    value: "~170",
    label:
      "ASX-listed companies operate across about 35 African countries, mostly in mining (Australian Mining Review, March 2026)",
  },
  {
    value: "~A$60B",
    label: "Australia's mining investment in Africa",
  },
];

const FIT_ROWS: [string, string, string][] = [
  [
    "Mining finance. ASX-listed miners active in about 35 African countries.",
    "Capital for processing and downstream steps at existing mines.",
    "Processing-stage joint ventures and offtake-linked finance.",
  ],
  [
    "Mining-energy technology. WA miners run large off-grid renewable systems; Fortescue reports 480 km of transmission built and a 2 to 3 GW target by 2030.",
    "Mines dependent on diesel or unreliable grids.",
    "Hybrid solar-storage at operating mines, with the mine as anchor load for a wider renewable project.",
  ],
  [
    "Storage and grid. Third-largest utility-scale battery market (Clean Energy Council, 2026).",
    "Grids absorbing fast-growing distributed solar.",
    "Storage pilots, C&I batteries, grid-planning technical assistance.",
  ],
  [
    "Engineering and project delivery.",
    "The project-preparation gap.",
    "Feasibility, owner's engineer and PMO contracts funded by DFI preparation facilities.",
  ],
  [
    "Institutional capital. A$4.5 trillion invested overseas (DFAT, end-2025).",
    "About 3% of global energy investment; capital costs at least double those in advanced economies.",
    "Co-investment alongside DFIs with guarantees. Institutions arrive after de-risking.",
  ],
  [
    "Research and skills. Universities, Australia Awards short courses.",
    "About 2% of the renewable workforce.",
    "Institutional pairings, grid-operator training, metallurgy and processing courses.",
  ],
];

const DEAL_ROOM = [
  {
    space: "Project Showcase",
    job: "Structured 15-minute presentations of pipeline projects.",
    rule: "Standard template. Qualified projects only.",
  },
  {
    space: "Project Clinics",
    job: "Technical and financial interrogation.",
    rule: "By invitation. Output is the Readiness Note.",
  },
  {
    space: "Investor Lounge",
    job: "Matched meetings by appointment.",
    rule: "Pre-booked through the pipeline register.",
  },
  {
    space: "Regulatory Working Sessions",
    job: "Barriers, permits, market rules.",
    rule: "Closed format. Output is the barrier log.",
  },
];

const PILLARS = [
  {
    title: "Future power systems",
    body: "The next African power system. AI and energy infrastructure, and smart cities and mobility, are treated as demand drivers.",
  },
  {
    title: "Critical-Mineral value chains",
    body: "Critical minerals beyond extraction. Green hydrogen and manufacturing are included only where a named project or buyer exists.",
  },
  {
    title: "Investable projects",
    body: "Reaching financial close. Carbon markets are one element of a project's revenue stack.",
  },
  {
    title: "Skills and capacity",
    body: "The future workforce. ESG traceability is a cross-cutting eligibility criterion, not a session.",
  },
];

/* ----------------------------------------------------------------------- */
/* Stacked "deck of cards" shuffle for the outcomes list                   */
/* ----------------------------------------------------------------------- */

const STACK_OFFSET_Y = 14; // px between each card in the resting stack
const STACK_OFFSET_X = [0, -64, 72]; // px sideways fan per depth
const STACK_SCALE_STEP = 0.05; // size reduction per depth
const STACK_ROTATIONS = [0, -6, 7]; // subtle natural tilt per depth
const SHUFFLE_INTERVAL = 8000; // ms between automatic shuffles
const SHUFFLE_DURATION = 0.45; // seconds for the leaving card's clean exit
const SETTLE_DURATION = 0.6; // seconds for cards settling into a new spot
const VISIBLE_STACK_SIZE = 3; // max cards shown in the stack at once

function stackTransform(depth: number, total: number) {
  return {
    x: STACK_OFFSET_X[depth % STACK_OFFSET_X.length],
    y: depth * STACK_OFFSET_Y,
    scale: 1 - depth * STACK_SCALE_STEP,
    rotate: STACK_ROTATIONS[depth % STACK_ROTATIONS.length],
    zIndex: total - depth,
  };
}

function OutcomeCardStack({ items }: { items: string[] }) {
  const [order, setOrder] = useState<number[]>(items.map((_, i) => i));
  const [leavingIndex, setLeavingIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Reset the stack whenever the underlying item list changes (e.g. the
  // person switches roles and the outcomes text swaps out).
  useEffect(() => {
    setOrder(items.map((_, i) => i));
    setLeavingIndex(null);
  }, [items]);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setOrder((prev) => {
        const [first, ...rest] = prev;
        setLeavingIndex(first);
        return [...rest, first];
      });
    }, SHUFFLE_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered]);

  return (
    <div
      className="grid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {items.map((item, originalIndex) => {
        const depth = order.indexOf(originalIndex);
        const isFront = depth === 0;
        const isLeaving = leavingIndex === originalIndex;
        const target = stackTransform(depth, items.length);
        // While leaving, aim for the back-most *visible* slot rather than
        // the card's true new depth — with more items than VISIBLE_STACK_SIZE,
        // that true depth sits below/behind the visible stack, which made the
        // card visibly dip below the other cards right before it vanished.
        // Landing exactly on the last visible slot (where the next card is
        // already sitting) makes the hand-off invisible.
        // Only render the front VISIBLE_STACK_SIZE cards; the rest wait
        // off-stage in the rotation until it's their turn, keeping the
        // stack looking tidy instead of a tall pile.
        if (depth >= VISIBLE_STACK_SIZE && !isLeaving) return null;

        return (
          <motion.div
            key={originalIndex}
            className="col-start-1 row-start-1 flex items-start gap-5 rounded-[24px] border border-zinc-200 bg-white p-6 sm:p-7"
            style={{
              zIndex: isLeaving ? items.length + 1 : target.zIndex,
              transformOrigin: "50% 100%",
            }}
            animate={
              isLeaving
                ? {
                    // Five sample points along a gentle swooping arc (rise,
                    // peak, begin descending, settle) instead of a sharp
                    // two-segment path — reads as one continuous curve
                    // rather than a card visibly changing direction.
                    y: -16,
                    rotate: 1.5,
                    scale: 0.985,
                    opacity: 0,
                  }
                : {
                    x: target.x,
                    y: isFront && isHovered ? target.y - 8 : target.y,
                    rotate: target.rotate,
                    scale: target.scale,
                    opacity: 1,
                    boxShadow: isFront
                      ? isHovered
                        ? "0 30px 60px rgba(0,57,148,0.22), 0 10px 20px rgba(0,57,148,0.12)"
                        : "0 20px 45px rgba(0,57,148,0.15), 0 6px 14px rgba(0,57,148,0.08)"
                      : "0 10px 24px rgba(2,6,23,0.08)",
                  }
            }
            transition={
              isLeaving
                ? {
                    duration: SHUFFLE_DURATION,
                    ease: [0.22, 1, 0.36, 1],
                  }
                : { duration: SETTLE_DURATION, ease: [0.22, 1, 0.36, 1] }
            }
            onAnimationComplete={() => {
              if (isLeaving) setLeavingIndex(null);
            }}
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#020266] text-xl font-semibold text-white shadow-[0_10px_24px_rgba(0,57,148,0.22)]">
              {originalIndex + 1}
            </div>
            <p className="text-base leading-8 text-zinc-700 sm:text-xl sm:leading-9">
              {item}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Auto-triggered "generating" text reveal — types out on mount, so each   */
/* new card that flips into view automatically types its description       */
/* rather than needing a click.                                            */
/* ----------------------------------------------------------------------- */

function GeneratingText({ text, className }: { text: string; className?: string }) {
  return <p className={className}>{text}</p>;
}

/* ----------------------------------------------------------------------- */
/* Highlight flip carousel — shows one central highlight card at a time.   */
/* Every few seconds (or via the arrows/dots) it flips to the next card    */
/* like a page turning, looping back to the first after the last one.      */
/* ----------------------------------------------------------------------- */

const HIGHLIGHT_AUTOROTATE_INTERVAL = 9500; // ms between automatic flips
const HIGHLIGHT_FLIP_DURATION = 0.55; // seconds for the card transition

function HighlightFlipCarousel({ items }: { items: Highlight[] }) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Reset to the first card whenever the underlying item list changes (e.g.
  // the person switches roles and the highlights swap out).
  useEffect(() => {
    setIndex(0);
  }, [items]);

  useEffect(() => {
    if (isHovered || items.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, HIGHLIGHT_AUTOROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, items.length]);

  const goToPrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  const goToNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
  };
  const goToIndex = (target: number) => {
    setIndex(target);
  };

  const item = items[index];
  const hasMultiple = items.length > 1;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-full items-center gap-4">
        {hasMultiple && (
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Show previous highlight"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition-all duration-300 hover:border-[#020266] hover:bg-[#020266] hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div className="relative flex-1" style={{ perspective: "1600px" }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{
                duration: HIGHLIGHT_FLIP_DURATION,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: "transform, opacity" }}
              className="overflow-hidden rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <div className="relative -mx-6 -mt-6 mb-6 h-56 w-[calc(100%+3rem)] overflow-hidden sm:h-64">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.title}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="text-xl font-semibold text-[#020266]">{item.title}</h3>
              <GeneratingText
                text={item.description}
                className="mt-3 min-h-[5rem] text-base leading-7 text-zinc-600"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {hasMultiple && (
          <button
            type="button"
            onClick={goToNext}
            aria-label="Show next highlight"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition-all duration-300 hover:border-[#020266] hover:bg-[#020266] hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {hasMultiple && (
        <div className="mt-5 flex items-center justify-center gap-1.5">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goToIndex(i)}
              aria-label={`Go to highlight ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-[#020266]" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Audience card — colored block cards with icon, title, description */
/* ----------------------------------------------------------------------- */

// Solid "logo" brand colors for the card backgrounds — matches the tri-
// color banner elsewhere on the page (deep blue, green, gold).
const CARD_COLORS = ["#0F0F76", "#009966", "#B8860B"];
// Each card's sweep bar uses the *next* brand color in the sequence, so it
// always reads as a distinct accent against its own background.
const SWEEP_COLORS = ["#009966", "#F2CB01", "#0F0F76"];

// Default palette for the "Why it matters" stat cards. A role can override
// any individual stat's color in rolesData.ts via `color`; otherwise stats
// cycle through this palette in order.
const STAT_COLORS = ["#020266", "#009966", "#B8860B", "#0F0F76"];

const OVERVIEW_ANIMATION_VIDEOS = [
  {
    src: "/videos/mine2.mp4",
    title: "Critical",
    keyword: "Minerals & Sustainable Mining",
  },
  {
    src: "/videos/solar.mp4",
    title: "Accelerating",
    keyword: "Solar Energy",
  },
  {
    src: "/videos/turbine.mp4",
    title: "Harnessing",
    keyword: "Geothermal & Hydrothermal Energy",
  },
  {
    src: "/videos/join.mp4",
    title: "Join the",
    keyword: "Clean Energy Conference Africa Australia",
  },
];

const TITLE_TRANSITIONS = [
  { initial: { y: 56, opacity: 0 }, exit: { y: -56, opacity: 0 } },
  { initial: { y: -56, opacity: 0 }, exit: { y: 56, opacity: 0 } },
  { initial: { x: -80, opacity: 0 }, exit: { x: 80, opacity: 0 } },
  { initial: { x: 80, opacity: 0 }, exit: { x: -80, opacity: 0 } },
];

function OverviewAnimationPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const titleTransition = TITLE_TRANSITIONS[activeVideo % TITLE_TRANSITIONS.length];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => undefined);
  }, [activeVideo]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative z-10 -mx-4 -my-3 mb-6 overflow-hidden px-4 py-3 text-center sm:mb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h3
            key={OVERVIEW_ANIMATION_VIDEOS[activeVideo].src}
            initial={titleTransition.initial}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={titleTransition.exit}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="!text-3xl font-semibold leading-[1.05] tracking-tight !text-zinc-950 sm:!text-4xl lg:!text-5xl"
          >
            {OVERVIEW_ANIMATION_VIDEOS[activeVideo].title}{" "}
            <span className="text-[#009966]">
              {OVERVIEW_ANIMATION_VIDEOS[activeVideo].keyword}
            </span>
          </motion.h3>
        </AnimatePresence>
      </div>
      <div className="mx-auto w-full max-w-full rounded-[28px] bg-white px-4 py-10 shadow-[0_35px_80px_rgba(2,6,23,0.28)] sm:px-8 sm:py-14">
        <video
          ref={videoRef}
          key={OVERVIEW_ANIMATION_VIDEOS[activeVideo].src}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() =>
            setActiveVideo((current) =>
              (current + 1) % OVERVIEW_ANIMATION_VIDEOS.length
            )
          }
          className="mx-auto block h-auto max-h-[760px] w-auto max-w-full rounded-[16px] bg-transparent object-contain object-center"
        >
          <source src={OVERVIEW_ANIMATION_VIDEOS[activeVideo].src} type="video/mp4" />
          Your browser does not support MP4 playback.
        </video>
      </div>
    </div>
  );
}

function AudienceCard({ item, index }: { item: AudienceItem; index: number }) {
  const Icon = item.icon;
  // A role can set its own color/sweepColor per card in rolesData.ts; if it
  // doesn't, cards fall back to cycling through the default brand palette.
  const cardColor = item.color ?? CARD_COLORS[index % CARD_COLORS.length];
  const sweepColor = item.sweepColor ?? SWEEP_COLORS[index % SWEEP_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        type: "spring",
        stiffness: 90,
        damping: 18,
        delay: index * 0.06,
      }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-2xl border border-black p-5 shadow-[0_8px_22px_rgba(2,6,23,0.14)] transition-shadow duration-300 hover:shadow-[0_16px_34px_rgba(2,6,23,0.24)]"
      style={{ backgroundColor: cardColor }}
    >
      {/* accent bar sweeps in from the left on hover, in a contrasting color */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
        style={{ backgroundColor: sweepColor }}
      />

      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-black bg-white/15 text-black transition-transform duration-300 group-hover:scale-105">
        <Icon className="h-5 w-5 stroke-[2.2]" />
      </div>

      <h4 className="mt-3 text-base font-semibold leading-snug text-black">{item.title}</h4>
      <p className="mt-1.5 text-sm leading-5 text-black">{item.description}</p>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/* Audience carousel — keeps "who this is for" to a single horizontal row. */
/* If there are more cards than fit in that row, prev/next arrows and dots */
/* appear, and the row auto-advances through the extra cards on its own    */
/* (pausing while the person's mouse is over it).                         */
/* ----------------------------------------------------------------------- */

const AUDIENCE_CARDS_PER_PAGE_BREAKPOINTS = [
  { minWidth: 1280, count: 4 }, // xl
  { minWidth: 1024, count: 3 }, // lg
  { minWidth: 640, count: 2 }, // sm
  { minWidth: 0, count: 1 }, // mobile
];

function useAudienceCardsPerPage() {
  const [count, setCount] = useState(4);

  useEffect(() => {
    function updateCount() {
      const width = window.innerWidth;
      const match =
        AUDIENCE_CARDS_PER_PAGE_BREAKPOINTS.find((bp) => width >= bp.minWidth) ??
        AUDIENCE_CARDS_PER_PAGE_BREAKPOINTS[AUDIENCE_CARDS_PER_PAGE_BREAKPOINTS.length - 1];
      setCount(match.count);
    }
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return count;
}

const AUDIENCE_AUTOROTATE_INTERVAL = 4500; // ms between automatic page flips

function AudienceCarousel({ items }: { items: AudienceItem[] }) {
  const cardsPerPage = useAudienceCardsPerPage();
  const pageCount = Math.max(1, Math.ceil(items.length / cardsPerPage));
  const hasExcess = items.length > cardsPerPage;

  const [page, setPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Keep the current page in range whenever the item list or the number of
  // cards-per-row changes (e.g. the person resizes the window, or switches
  // roles and the new role has fewer/more audience cards).
  useEffect(() => {
    setPage((prev) => Math.min(prev, pageCount - 1));
  }, [pageCount]);

  // Auto-rotate through pages only when there's more than one row's worth
  // of cards, and pause while the person is interacting with the row.
  useEffect(() => {
    if (!hasExcess || isHovered) return;
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % pageCount);
    }, AUDIENCE_AUTOROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [hasExcess, isHovered, pageCount]);

  const goToPrevPage = () => setPage((prev) => (prev - 1 + pageCount) % pageCount);
  const goToNextPage = () => setPage((prev) => (prev + 1) % pageCount);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3">
        {hasExcess && (
          <button
            type="button"
            onClick={goToPrevPage}
            aria-label="Show previous audience cards"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition-all duration-300 hover:border-[#020266] hover:bg-[#020266] hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        )}

        <div className="flex-1 overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `-${page * 100}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="grid w-full shrink-0 gap-4"
                style={{ gridTemplateColumns: `repeat(${cardsPerPage}, minmax(0, 1fr))` }}
              >
                {items
                  .slice(pageIndex * cardsPerPage, pageIndex * cardsPerPage + cardsPerPage)
                  .map((item, i) => (
                    <AudienceCard
                      key={item.title}
                      item={item}
                      index={pageIndex * cardsPerPage + i}
                    />
                  ))}
              </div>
            ))}
          </motion.div>
        </div>

        {hasExcess && (
          <button
            type="button"
            onClick={goToNextPage}
            aria-label="Show more audience cards"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition-all duration-300 hover:border-[#020266] hover:bg-[#020266] hover:text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
      </div>

      {hasExcess && (
        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i)}
              aria-label={`Go to audience cards page ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === page ? "w-6 bg-[#020266]" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Rotating word swap                                                      */
/* ----------------------------------------------------------------------- */

function RotatingWord({
  words,
  interval = 2200,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [words]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <span
      className="relative inline-flex overflow-hidden align-baseline"
      style={{ height: "1.4em" }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={`inline-flex items-center ${className ?? ""}`}
          style={{ height: "1.4em" }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ----------------------------------------------------------------------- */
/* Section chrome — a small shared "kicker" (numbered eyebrow + heading)   */
/* used at the top of every major band below so each one reads as its own */
/* distinct section rather than one long undifferentiated scroll. Each    */
/* band gets its own accent color from the brand trio (navy/green/gold)   */
/* plus a short intro line.                                                */
/* ----------------------------------------------------------------------- */

function SectionKicker({
  index,
  label,
  heading,
  intro,
  accent,
}: {
  index: string;
  label: string;
  heading: string;
  intro?: string;
  accent: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3">
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
          style={{ backgroundColor: accent }}
        >
          {index}
        </span>
        <p
          className="text-xs font-semibold uppercase tracking-[0.24em]"
          style={{ color: accent }}
        >
          {label}
        </p>
      </div>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
        {heading}
      </h2>
      {intro && (
        <p className="mt-3 text-base leading-7 text-zinc-600 sm:text-lg">{intro}</p>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Text labels for the manual "read as a different role" switcher. Keeps   */
/* the automatic role-context behaviour as the default, but lets anyone    */
/* browse how this section reads for other roles without changing their   */
/* saved role in the nav.                                                  */
/*                                                                          */
/* IMPORTANT: only roles that currently have an entry in rolesData.ts are  */
/* listed here. Add a tab once its content is added to rolesContent.       */
/* ----------------------------------------------------------------------- */

const ROLE_TABS: { id: string; label: string }[] = [
  { id: "default", label: "Overview" },
  { id: "government-policymakers", label: "Government & Policymakers" },
  { id: "investors-financial", label: "Investors & Financial Institutions" },
  { id: "energy-companies-utilities", label: "Energy Companies & Utilities" },
  { id: "researchers-academia", label: "Researchers & Academia" },
  { id: "startups-entrepreneurs", label: "Startups & Entrepreneurs" },
  { id: "technology-solution-providers", label: "Technology & Solution Providers" },
  { id: "development-partners-ngos", label: "Development Partners & NGOs" },
  { id: "industry-associations-chambers", label: "Industry Associations & Chambers" },
  { id: "media-communications", label: "Media & Communications" },
];

// Keys that actually exist in rolesData.ts, used to validate the saved
// role from RoleContext against the content we actually have.
const AVAILABLE_ROLE_IDS = new Set(ROLE_TABS.map((tab) => tab.id));

const CONFERENCE_INSIGHTS = [
  {
    title: "Top Africa Energy Events in 2026: The Ultimate Guide to Clean Energy Conferences, Summits & Investment Forums",
    date: "January 2026",
    excerpt: "Your guide to the key events, forums, and investment conversations shaping Africa's energy future.",
    image: "/images/top-events-2026-hero.png",
    href: "/media/news/blogs/top-africa-energy-events-2026",
  },
  {
    title: "Energy Investment in Africa: Opportunities, Trends and Why 2026 Could Be a Defining Year",
    date: "July 2026",
    excerpt: "The market signals, capital flows, and opportunities shaping the year ahead.",
    image: "/images/clean-energy-collage.png",
    href: "/media/news/blogs/energy-investment-africa-2026",
  },
  {
    title: "Renewable Energy Conferences in Africa: The Essential Guide for Industry Professionals",
    date: "July 2026",
    excerpt: "The essential conference guide for clean-energy leaders and industry professionals.",
    image: "/images/conference-guide-hero.png",
    href: "/media/news/blogs/renewable-energy-conferences-africa",
  },
  {
    title: "Energy Policy in Africa: How Government Decisions Are Shaping the Future of Clean Energy",
    date: "July 2026",
    excerpt: "How policy decisions are influencing the region's clean-energy trajectory.",
    image: "/images/energy-policy-hero.png",
    href: "/media/news/blogs/energy-policy-africa-2026",
  },
  {
    title: "Renewable Energy Policy in Africa: How Governments Are Accelerating Clean Energy Growth",
    date: "July 2026",
    excerpt: "The policies accelerating renewable growth across the continent.",
    image: "/images/renewable-policy-growth.png",
    href: "/media/news/blogs/renewable-energy-policy-africa",
  },
  {
    title: "Green Hydrogen in Africa: Opportunities, Investment and the Future of a Clean Hydrogen Economy",
    date: "July 2026",
    excerpt: "A look at the opportunity, investment, and outlook for green hydrogen.",
    image: "/images/green-hydrogen-africa.png",
    href: "/media/news/blogs/green-hydrogen-africa-2026",
  },
  {
    title: "Geothermal Energy in Africa: Unlocking One of the Continent's Most Reliable Renewable Resources",
    date: "July 2026",
    excerpt: "Why geothermal is one of Africa's most dependable renewable energy resources.",
    image: "/images/geothermal-energy-africa.png",
    href: "/media/news/blogs/geothermal-energy-africa-2026",
  },
  {
    title: "Why Africa Is the Next Global Clean Energy Investment Destination",
    date: "July 2026",
    excerpt: "The forces placing Africa at the centre of global clean-energy investment.",
    image: "/images/global-investment-destination.png",
    href: "/media/news/blogs/global-clean-energy-destination",
  },
];

/* ----------------------------------------------------------------------- */

export function ConferenceOverview() {
  // The saved role from RoleSubNav still decides what shows by default —
  // picking a role there automatically swaps the content here, same as
  // before. On top of that, `previewId` lets anyone manually browse how
  // this section reads for a *different* role via plain text links,
  // without touching their actual saved role.
  const { role } = useRole();
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [newsPage, setNewsPage] = useState(0);
  const [isNewsHovered, setIsNewsHovered] = useState(false);
  const newsPageCount = Math.ceil(CONFERENCE_INSIGHTS.length / 3);
  const visibleNews = CONFERENCE_INSIGHTS.slice(newsPage * 3, newsPage * 3 + 3);

  useEffect(() => {
    if (isNewsHovered) return;
    const timer = setInterval(() => {
      setNewsPage((current) => (current + 1) % newsPageCount);
    }, 8500);
    return () => clearInterval(timer);
  }, [isNewsHovered, newsPageCount]);

  // If the person's saved role changes (e.g. they pick a new one in the
  // nav), drop any manual preview so the section snaps back to reflecting
  // their real selection.
  useEffect(() => {
    setPreviewId(null);
  }, [role]);

  // Fall back to "default" whenever the resolved id isn't one we actually
  // have content for yet (e.g. RoleContext still knows about a role that
  // hasn't been added to rolesData.ts).
  const rawActiveId: string = previewId ?? role ?? "default";
  const activeId = AVAILABLE_ROLE_IDS.has(rawActiveId) ? rawActiveId : "default";
  const isPreviewing = previewId !== null && previewId !== (role ?? "default");
  const c = rolesContent[activeId] ?? rolesContent.default;

  return (
    <div key={activeId} style={{ animation: "overviewFadeIn 500ms ease forwards" }}>
      {/* ================================================================= */}
      {/* SECTION 1 — HERO: role switcher, headline/CTA, and "why it       */}
      {/* matters" panel. White background, sits at the top of the page.   */}
      {/* ================================================================= */}
      <section className="relative overflow-hidden bg-white pb-16 pt-20 sm:pb-20 sm:pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,57,148,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,153,102,0.08),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5 text-sm">
            <span className="font-semibold text-zinc-500">Read this as:</span>
            {ROLE_TABS.map((tab, i) => {
              const isActive = tab.id === activeId;
              return (
                <span key={tab.id} className="flex items-baseline gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewId(tab.id)}
                    className={
                      isActive
                        ? "font-semibold text-[#020266] underline underline-offset-4"
                        : "text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition-colors hover:text-[#020266] hover:decoration-[#020266]"
                    }
                  >
                    {tab.label}
                  </button>
                  {i < ROLE_TABS.length - 1 && <span className="text-zinc-300">·</span>}
                </span>
              );
            })}

            {isPreviewing && (
              <button
                type="button"
                onClick={() => setPreviewId(null)}
                className="ml-1 font-semibold text-[#009966] underline underline-offset-4 hover:text-[#007a52]"
              >
                Back to your role
              </button>
            )}
          </div>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                {c.eyebrow}
              </div>

              <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
                {c.heading}
              </h2>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-700 sm:text-xl">
                {c.paragraph}
              </p>

              <div className="mt-8 max-w-2xl">
                <HighlightFlipCarousel items={c.highlights} />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/conference"
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    overflow-hidden

                    rounded-full px-6 py-3 text-base font-semibold

                    text-white
                    bg-[#020266]

                    border border-[#020266]

                    shadow-[0_10px_30px_rgba(0,0,0,0.12)]

                    transition-all duration-500 ease-out

                    hover:border-[#020266]/60
                    hover:scale-[1.04]
                    hover:shadow-[0_18px_50px_rgba(0,57,148,0.25)]

                    active:scale-[0.97]

                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#020266]/25
                    focus:ring-offset-2
                    focus:ring-offset-white
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
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#020266]">
                    Explore the conference
                  </span>

                  <ArrowRight
                    className="
                      relative z-10 h-4 w-4
                      transition-all duration-300
                      group-hover:translate-x-1
                      group-hover:text-[#020266]
                    "
                  />
                </Link>

                <Link
                  href="/event/programme"
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    overflow-hidden

                    rounded-full px-6 py-3 text-base font-semibold

                    text-zinc-900
                    bg-white

                    border border-zinc-300

                    shadow-[0_10px_30px_rgba(0,0,0,0.08)]

                    transition-all duration-500 ease-out

                    hover:border-[#020266]/60
                    hover:scale-[1.04]
                    hover:shadow-[0_18px_50px_rgba(0,57,148,0.18)]

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

                  <CalendarDays
                    className="
                      relative z-10 h-4 w-4
                      transition-colors duration-300
                      group-hover:text-white
                    "
                  />

                  {/* text turns white */}
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                    View programme
                  </span>
                </Link>
              </div>
            </div>

            <div className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.08)] sm:p-10 lg:p-12">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#020266]" />

                <p className="text-base font-semibold uppercase tracking-[0.22em] text-[#020266] sm:text-xl">
                  Why it matters
                </p>
              </div>

              <p className="mt-4 text-lg font-semibold text-zinc-900 sm:text-xl">
                {c.whyMattersSubheading}
              </p>

              <div
                className={`mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 ${
                  c.stats.length >= 3 ? "lg:grid-cols-3" : ""
                }`}
              >
                {c.stats.map((stat, index) => {
                  const fromLeft = index % 2 === 0;
                  const bg = stat.color ?? STAT_COLORS[index % STAT_COLORS.length];
                  return (
                    <motion.div
                      key={`${stat.value}-${index}`}
                      initial={{ x: fromLeft ? -72 : 72, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 60,
                        damping: 18,
                        mass: 1,
                        delay: index * 0.15,
                      }}
                      className="rounded-[28px] p-7 text-white shadow-[0_18px_40px_rgba(2,6,23,0.22)]"
                      style={{ backgroundColor: bg }}
                    >
                      <p className="text-5xl font-bold tracking-tight">{stat.value}</p>
                      <p className="mt-3 text-base leading-7 text-white/85">{stat.description}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-10">
                <OutcomeCardStack items={c.outcomes} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 2 — SPOTLIGHT: theme video player.                       */}
      {/* ================================================================= */}
      <section className="border-t border-zinc-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker
            index="02"
            label="In focus"
            heading=""
            intro="A running look at the sectors and themes driving this edition's agenda."
            accent="#009966"
          />

          <div className="mt-10 flex justify-center">
            <OverviewAnimationPlayer />
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 3 — WHY NOW: convergence stats from the 2027 concept     */}
      {/* note.                                                            */}
      {/* ================================================================= */}
      <section className="border-t border-zinc-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker
            index="03"
            label="Why now"
            heading="Why this convergence matters now"
            intro="Africa holds 60% of the world's best solar resources and critical minerals that global markets need. Australia brings capital, mining expertise and clean-tech maturity. CEAA 2027, staged in Kigali and Perth, is where that gap becomes investable opportunity."
            accent="#009966"
          />

          <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-700 sm:text-lg">
            CEAA is the Africa–Australia platform that moves clean-energy and Critical-Mineral
            projects from opportunity to capital. In Kigali, African governments and developers
            present qualified projects. In Perth, Australian investors, technology providers and
            delivery partners respond. Between the two, projects are tested, matched and tracked,
            so every introduction is followed through.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONVERGENCE_STATS.map((s, i) => (
              <div
                key={s.value}
                className="rounded-[24px] p-7 text-white shadow-[0_18px_40px_rgba(2,6,23,0.18)]"
                style={{ backgroundColor: STAT_COLORS[i % STAT_COLORS.length] }}
              >
                <p className="text-4xl font-bold tracking-tight">{s.value}</p>
                <p className="mt-3 text-base leading-7 text-white/85">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 4 — FIT: Australian capability vs African need.          */}
      {/* ================================================================= */}
      <section className="border-t border-[#020266]/10 bg-[#F5F6FB] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker
            index="04"
            label="Fit"
            heading="Where Australian capability fits African need"
            accent="#020266"
          />

          <div className="mt-10 overflow-x-auto rounded-[24px] border border-zinc-200 bg-white shadow-sm">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-[#020266] text-white">
                <tr>
                  <th className="p-4 font-semibold">Australian strength</th>
                  <th className="p-4 font-semibold">African need</th>
                  <th className="p-4 font-semibold">Fastest fit</th>
                </tr>
              </thead>
              <tbody>
                {FIT_ROWS.map((row) => (
                  <tr key={row[0]} className="border-t border-zinc-200 align-top">
                    {row.map((cell) => (
                      <td key={cell} className="p-4 leading-6 text-zinc-700">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 5 — DEAL ROOM: the four structured spaces.               */}
      {/* ================================================================= */}
      <section className="border-t border-zinc-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker
            index="05"
            label="The deal room"
            heading="Making the deal room precise"
            accent="#B8860B"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {DEAL_ROOM.map((d) => (
              <div
                key={d.space}
                className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-[#020266]">{d.space}</h3>
                <p className="mt-2 text-base leading-7 text-zinc-700">{d.job}</p>
                <p className="mt-3 text-sm font-medium text-zinc-500">{d.rule}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 6 — PILLARS: four pillars, defined outputs.              */}
      {/* ================================================================= */}
      <section className="border-t border-zinc-200 bg-white pb-16 pt-16 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker
            index="06"
            label="Programme"
            heading="Four pillars, defined outputs"
            accent="#009966"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <div
                key={p.title}
                className="rounded-2xl p-5 text-white shadow-[0_8px_22px_rgba(2,6,23,0.14)]"
                style={{ backgroundColor: STAT_COLORS[i % STAT_COLORS.length] }}
              >
                <h4 className="text-lg font-semibold leading-snug">{p.title}</h4>
                <p className="mt-2 text-sm leading-6 text-white/85">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* SECTION 7 — NEWS & INSIGHTS: latest articles, on a navy-tinted   */}
      {/* band.                                                            */}
      {/* ================================================================= */}
      <section
        className="relative overflow-hidden border-b border-[#020266]/10 bg-[#F5F6FB] py-16 sm:py-20"
        onMouseEnter={() => setIsNewsHovered(true)}
        onMouseLeave={() => setIsNewsHovered(false)}
      >
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#020266]/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionKicker
              index="07"
              label="Latest insights"
              heading="News, ideas, and industry perspectives"
              intro="Explore the latest thinking on energy investment, policy, technology, and Africa's clean-energy future."
              accent="#020266"
            />
            <Link
              href="/media/news"
              className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#020266]/20 bg-white px-5 py-3 text-sm font-semibold text-[#020266] shadow-sm transition hover:border-[#020266] hover:bg-[#020266] hover:text-white sm:self-auto"
            >
              Explore all articles
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="relative mt-9 overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={newsPage}
                initial={{ x: 56, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -56, opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
              >
                <article className="group relative min-h-[360px] overflow-hidden rounded-[26px] bg-[#020266] shadow-[0_16px_36px_rgba(2,6,23,0.16)]">
                  <Image src={visibleNews[0].image} alt={visibleNews[0].title} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020266] via-[#020266]/65 to-transparent" />
                  <div className="relative flex min-h-[360px] flex-col justify-end p-6 text-white sm:p-8">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"><CalendarDays className="h-3.5 w-3.5" />{visibleNews[0].date}</div>
                    <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">{visibleNews[0].title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">{visibleNews[0].excerpt}</p>
                    <Link href={visibleNews[0].href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                  </div>
                </article>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                  {visibleNews.slice(1).map((article) => (
                    <article key={article.href} className="group overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(2,6,23,0.12)] lg:grid lg:grid-cols-[150px_1fr]">
                      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 lg:aspect-auto"><Image src={article.image} alt={article.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                      <div className="flex flex-col p-5">
                        <p className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500"><CalendarDays className="h-3.5 w-3.5 text-[#009966]" />{article.date}</p>
                        <h3 className="mt-3 text-lg font-semibold leading-6 text-zinc-900 transition-colors group-hover:text-[#020266]">{article.title}</h3>
                        <Link href={article.href} className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-[#020266]">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                      </div>
                    </article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-6 flex justify-center gap-2" aria-label="News carousel pages">
            {Array.from({ length: newsPageCount }).map((_, index) => (
              <button key={index} type="button" onClick={() => setNewsPage(index)} aria-label={`Show news group ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === newsPage ? "w-7 bg-[#020266]" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"}`} />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* THEME BANNER: full-bleed, tri-color bordered slab. Kept as the   */}
      {/* page's single boldest moment.                                    */}
      {/* ================================================================= */}
      <div
        className="w-full overflow-hidden p-[6px] shadow-[0_18px_50px_rgba(0,57,148,0.15)]"
        style={{
          background:
            "conic-gradient(#0F0F76 0deg 40deg, #009966 40deg 80deg, #F2CB01 80deg 120deg, #0F0F76 120deg 160deg, #009966 160deg 200deg, #F2CB01 200deg 240deg, #0F0F76 240deg 280deg, #009966 280deg 320deg, #F2CB01 320deg 360deg)",
        }}
      >
        <div className="bg-white px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
              2027 Conference Theme
            </p>
            <h2 className="mt-3 text-[17px] font-semibold tracking-tight text-zinc-950">
              Turning Ambition Into Action
            </h2>
            <h2 className="mt-3 text-[17px] font-semibold text-zinc-800">
              With{" "}
              <RotatingWord words={c.ctaWords} className="text-[#009966]" />
            </h2>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4">
              {[
                { src: "/images/theme-image-1.jpg", alt: "Renewable energy infrastructure" },
                { src: "/images/theme-image-2.jpg", alt: "Investment and partnership discussions" },
                { src: "/images/theme-image-3.jpg", alt: "Sustainable growth across Africa and Australia" },
                { src: "/images/theme-image-4.jpg", alt: "Clean energy technology deployment" },
              ].map((image) => (
                <div key={image.src} className="relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="relative z-0 block w-full transition-transform duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:shadow-[0_18px_30px_rgba(2,6,23,0.25)]"
                  />
                </div>
              ))}
            </div>

            <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-zinc-700">
              {c.bannerParagraph}
            </p>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* SECTION 8 — EDITIONS: one journey, two cities. Gold-tinted band, */}
      {/* closing the page with dates, venues and focus areas for each     */}
      {/* 2027 edition.                                                    */}
      {/* ================================================================= */}
      <section className="border-t border-[#B8860B]/15 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionKicker
            index="08"
            label="2027 editions"
            heading="One journey, two cities"
            intro="One shared project and partnership pipeline connects both cities."
            accent="#B8860B"
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {EDITIONS_2027.map((edition) => (
              <div
                key={edition.name}
                className={`rounded-[28px] border bg-gradient-to-br ${edition.accent} p-7 shadow-[0_14px_34px_rgba(2,6,23,0.08)]`}
              >
                <p className="text-base font-semibold uppercase tracking-[0.18em] text-zinc-600">
                  2027 Edition
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-zinc-950">{edition.name}</h3>
                <p className="mt-4 text-base font-medium text-zinc-800">{edition.date}</p>
                <p className="mt-1 text-base text-zinc-600">{edition.venue}</p>
                <p className="mt-5 text-base leading-7 text-zinc-700">{edition.description}</p>
                <ul className="mt-5 space-y-2 text-base leading-7 text-zinc-700">
                  {edition.focus.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#009966]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes overviewFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}