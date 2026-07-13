"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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
  editions,
  type Highlight,
  type AudienceItem,
} from "@/data/rolesData";

/* ----------------------------------------------------------------------- */
/* All role-specific copy (headings, highlights, stats, outcomes,          */
/* audience cards, CTA words, banner paragraph) and the edition logistics  */
/* now live in data/rolesData.ts. This file only handles rendering + the   */
/* interactive bits (the shuffling card stack, typewriter reveal, role     */
/* tabs, rotating word, etc). To add/edit a role's content, edit           */
/* rolesData.ts — nothing in this component needs to change.               */
/* ----------------------------------------------------------------------- */

/* ----------------------------------------------------------------------- */
/* Stacked "deck of cards" shuffle for the outcomes list                   */
/* ----------------------------------------------------------------------- */

const STACK_OFFSET_Y = 14; // px between each card in the resting stack
const STACK_OFFSET_X = [0, -64, 72]; // px sideways fan per depth
const STACK_SCALE_STEP = 0.05; // size reduction per depth
const STACK_ROTATIONS = [0, -6, 7]; // subtle natural tilt per depth
const SHUFFLE_INTERVAL = 3600; // ms between automatic shuffles
const SHUFFLE_DURATION = 0.95; // seconds for the leaving card's journey to the back
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
        const leavingTarget = stackTransform(VISIBLE_STACK_SIZE - 1, items.length);

        // Only render the front VISIBLE_STACK_SIZE cards; the rest wait
        // off-stage in the rotation until it's their turn, keeping the
        // stack looking tidy instead of a tall pile.
        if (depth >= VISIBLE_STACK_SIZE && !isLeaving) return null;

        // While leaving, the card must stay ABOVE the whole stack for the
        // entire rise/arc so it visually lifts off and flies over the top
        // cards. It only drops to its true (low) z-index right at the very
        // end, once it's back in the fanned position — otherwise it ducks
        // beneath the opaque front cards mid-flight and seems to vanish.
        const elevatedZIndex = items.length + 1;

        return (
          <motion.div
            key={originalIndex}
            className="col-start-1 row-start-1 flex items-start gap-5 rounded-[24px] border border-zinc-200 bg-white p-6 sm:p-7"
            style={{
              zIndex: isLeaving ? elevatedZIndex : target.zIndex,
              transformOrigin: "50% 100%",
            }}
            animate={
              isLeaving
                ? {
                    // Five sample points along a gentle swooping arc (rise,
                    // peak, begin descending, settle) instead of a sharp
                    // two-segment path — reads as one continuous curve
                    // rather than a card visibly changing direction.
                    //
                    // IMPORTANT: this must end at `leavingTarget`, not
                    // `target`. `target` is built from the card's real new
                    // depth after the shuffle (often far below/smaller than
                    // the visible stack once there are more than
                    // VISIBLE_STACK_SIZE items), so animating to it sent the
                    // card arcing down to an off-stage position that then
                    // vanished outright once the render after completion
                    // re-evaluated its (now off-stage) depth. `leavingTarget`
                    // is pinned to the last *visible* slot, which is exactly
                    // where the next card is already sitting, so the hand-off
                    // is seamless.
                    x: [0, 20, 34, 28, leavingTarget.x],
                    y: [0, -18, -30, -20, leavingTarget.y],
                    rotate: [0, 4, 8, 5, leavingTarget.rotate],
                    scale: [1, 1.015, 1.03, 1.015, leavingTarget.scale],
                    // Stay above the stack through the whole arc; only drop
                    // to the back-of-stack z-index on the final sample
                    // point, once it's actually settled into place. This is
                    // what keeps the card visible/on-top during the lift and
                    // arc instead of ducking under the stack early.
                    zIndex: [
                      elevatedZIndex,
                      elevatedZIndex,
                      elevatedZIndex,
                      elevatedZIndex,
                      leavingTarget.zIndex,
                    ],
                    boxShadow: [
                      "0 20px 45px rgba(0,57,148,0.15), 0 6px 14px rgba(0,57,148,0.08)",
                      "0 28px 55px rgba(0,57,148,0.2), 0 10px 18px rgba(0,57,148,0.1)",
                      "0 34px 62px rgba(0,57,148,0.24), 0 13px 22px rgba(0,57,148,0.13)",
                      "0 20px 40px rgba(0,57,148,0.15), 0 8px 16px rgba(0,57,148,0.08)",
                      "0 10px 24px rgba(2,6,23,0.08), 0 4px 8px rgba(2,6,23,0.04)",
                    ] as unknown as string,
                  }
                : {
                    x: target.x,
                    y: isFront && isHovered ? target.y - 8 : target.y,
                    rotate: target.rotate,
                    scale: target.scale,
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
                    times: [0, 0.25, 0.5, 0.75, 1],
                    ease: "easeInOut",
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
/* Click-triggered "generating" text reveal for the highlight cards        */
/* ----------------------------------------------------------------------- */

function GeneratingText({
  text,
  runId,
  className,
}: {
  text: string;
  runId: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (runId === 0) return;
    setCount(0);
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= text.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 14);
    return () => clearInterval(interval);
  }, [runId, text]);

  const started = runId > 0;
  const isDone = started && count >= text.length;

  return (
    <p className={className}>
      {started ? text.slice(0, count) : ""}
      {started && !isDone && (
        <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-[#020266]" />
      )}
    </p>
  );
}

const HIGHLIGHT_LOGOS = [
  "/images/highlight-logo-1.png",
  "/images/highlight-logo-2.png",
  "/images/highlight-logo-3.png",
  "/images/highlight-logo-4.png",
];

function HighlightCard({
  item,
  index,
  fromLeft,
  autoGenerate = false,
}: {
  item: Highlight;
  index: number;
  fromLeft: boolean;
  autoGenerate?: boolean;
}) {
  const logoSrc = (item as { logoSrc?: string }).logoSrc ?? HIGHLIGHT_LOGOS[index % HIGHLIGHT_LOGOS.length];
  const logoAlt = (item as { logoAlt?: string }).logoAlt ?? `${item.title} logo`;
  const [logoFailed, setLogoFailed] = useState(false);
  const [runId, setRunId] = useState(0);
  const started = runId > 0;

  // Re-arm the auto-generate + reset typed text whenever the item itself
  // changes (e.g. the visitor switched roles and this slot now shows
  // different copy).
  useEffect(() => {
    setRunId(autoGenerate ? 1 : 0);
    setLogoFailed(false);
  }, [item, autoGenerate]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: fromLeft ? -60 : 60,
        rotateY: fromLeft ? -55 : 55,
        scale: 0.82,
      }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 14,
        delay: index * 0.15,
      }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      style={{ transformStyle: "preserve-3d" }}
      onClick={() => setRunId((prev) => prev + 1)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setRunId((prev) => prev + 1);
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm outline-none transition-shadow duration-300 hover:border-[#020266]/30 hover:shadow-[0_18px_45px_rgba(2,6,23,0.1)] focus-visible:ring-2 focus-visible:ring-[#020266]/40"
    >
      {/* light sweep across the card once it lands */}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent"
        initial={{ x: "-120%" }}
        whileInView={{ x: "420%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.9,
          delay: index * 0.15 + 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      />
      <div className="relative -mx-6 -mt-6 mb-6 h-48 overflow-hidden rounded-t-[24px]">
        <img
          src={item.imageSrc}
          alt={item.imageAlt ?? item.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-[#020266]">{item.title}</h3>

      {/* No fixed/max height here on purpose — longer descriptions just
          grow the card instead of getting clipped or overflowing. */}
      <div className="mt-3 min-h-[3rem]">
        {started ? (
          <GeneratingText
            text={item.description}
            runId={runId}
            className="text-base leading-7 text-zinc-600"
          />
        ) : (
          <div className="flex h-full items-center">
            <ArrowRight className="h-10 w-10 stroke-[2.5] text-emerald-500 transition-transform duration-300 group-hover:translate-x-1.5" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ----------------------------------------------------------------------- */
/* Audience card — matches HighlightCard's spring entrance + accent reveal */
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

/* ----------------------------------------------------------------------- */

export function ConferenceOverview() {
  // The saved role from RoleSubNav still decides what shows by default —
  // picking a role there automatically swaps the content here, same as
  // before. On top of that, `previewId` lets anyone manually browse how
  // this section reads for a *different* role via plain text links,
  // without touching their actual saved role.
  const { role } = useRole();
  const [previewId, setPreviewId] = useState<string | null>(null);

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
    <section
      key={activeId}
      className="relative overflow-hidden bg-white py-20 sm:py-24"
      style={{ animation: "overviewFadeIn 500ms ease forwards" }}
    >
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

        <div
          className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          style={{ perspective: "1400px" }}
        >
          {c.highlights.map((item, index) => (
            <HighlightCard
              key={item.title}
              item={item}
              index={index}
              fromLeft={index % 2 === 0}
              autoGenerate={index === 0}
            />
          ))}
        </div>

        {/* Who this is for */}
        <div className="mt-14">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
            {c.audienceLabel}
          </p>
          <div className="mt-5">
            <AudienceCarousel items={c.audience} />
          </div>
        </div>
      </div>

      {/* Full-width banner with a static, hard-edged 3-color border */}
      <div
        className="mt-14 w-full overflow-hidden p-[6px] shadow-[0_18px_50px_rgba(0,57,148,0.15)]"
        style={{
          background:
            "conic-gradient(#0F0F76 0deg 40deg, #009966 40deg 80deg, #F2CB01 80deg 120deg, #0F0F76 120deg 160deg, #009966 160deg 200deg, #F2CB01 200deg 240deg, #0F0F76 240deg 280deg, #009966 280deg 320deg, #F2CB01 320deg 360deg)",
        }}
      >
        <div className="bg-white px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl text-center">
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

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {editions.map((edition) => (
            <div
              key={edition.name}
              className={`rounded-[28px] border bg-gradient-to-br ${edition.accent} p-7 shadow-sm`}
            >
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-zinc-600">
                2026 Edition
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-zinc-950">{edition.name}</h3>
              <p className="mt-4 text-base font-medium text-zinc-800">{edition.date}</p>
              <p className="mt-1 text-base text-zinc-600">{edition.venue}</p>
              <p className="mt-5 text-base leading-7 text-zinc-700">{edition.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes overviewFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}