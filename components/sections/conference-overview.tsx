"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays, Globe, Leaf, Users, Zap } from "lucide-react";

const highlights = [
  {
    icon: Globe,
    title: "Africa–Australia platform",
    description:
      "A cross-continental meeting point for governments, investors, utilities, innovators, and industry leaders shaping the clean energy future.",
  },
  {
    icon: Zap,
    title: "Energy, mining and infrastructure",
    description:
      "Focused on renewable energy, critical minerals, grid modernization, green industrialization, climate innovation, and sustainable infrastructure.",
  },
  {
    icon: Users,
    title: "High-level connections",
    description:
      "Designed to accelerate partnerships, policy dialogue, investment matchmaking, and knowledge exchange across Africa and Australia.",
  },
  {
    icon: Leaf,
    title: "Practical outcomes",
    description:
      "Built around investment commitments, strategic collaboration, capacity building, and long-term sector growth.",
  },
];

const editions = [
  {
    name: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    description:
      "Focused on East Africa’s energy transition, regional integration, decentralized energy systems, climate finance, clean mobility, and innovation-led policy.",
    accent: "from-blue-600/15 to-cyan-400/10 border-blue-200",
  },
  {
    name: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    description:
      "Connecting African priorities to Australian capital markets, advanced mining technologies, green hydrogen, storage innovation, and ESG leadership.",
    accent: "from-emerald-600/15 to-teal-400/10 border-emerald-200",
  },
];

const outcomes = [
  "Secure investment momentum across solar, wind, hydrogen, storage, and grid development.",
  "Strengthen Africa–Australia cooperation through partnerships, policy dialogue, and institutional collaboration.",
  "Create a premium platform for technology showcase, investor engagement, and sector matchmaking.",
];

/* ----------------------------------------------------------------------- */
/* Stacked "deck of cards" shuffle for the outcomes list                   */
/* ----------------------------------------------------------------------- */

const STACK_OFFSET_Y = 14; // px between each card in the resting stack
const STACK_OFFSET_X = [0, -64, 72]; // px sideways fan per depth
const STACK_SCALE_STEP = 0.05; // size reduction per depth
const STACK_ROTATIONS = [0, -6, 7]; // subtle natural tilt per depth
const SHUFFLE_INTERVAL = 3600; // ms between automatic shuffles
const SHUFFLE_DURATION = 0.7; // seconds for the leaving card's journey
const SETTLE_DURATION = 0.6; // seconds for cards settling into a new spot

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

        return (
          <motion.div
            key={originalIndex}
            className="col-start-1 row-start-1 flex items-start gap-5 rounded-[24px] border border-zinc-200 bg-white p-6 sm:p-7"
            style={{
              zIndex: isLeaving ? 1 : target.zIndex,
              transformOrigin: "50% 100%",
            }}
            animate={
              isLeaving
                ? {
                    x: [0, 34, 34, target.x],
                    y: [0, -26, -26, target.y],
                    rotate: [0, 7, 7, target.rotate],
                    scale: [1, 1.02, 1.02, target.scale],
                    boxShadow: [
                      "0 20px 45px rgba(0,57,148,0.15), 0 6px 14px rgba(0,57,148,0.08)",
                      "0 30px 55px rgba(0,57,148,0.2), 0 10px 18px rgba(0,57,148,0.1)",
                      "0 30px 55px rgba(0,57,148,0.2), 0 10px 18px rgba(0,57,148,0.1)",
                      "0 10px 24px rgba(2,6,23,0.08)",
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
                    times: [0, 0.35, 0.55, 1],
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

function HighlightCard({
  item,
  index,
  fromLeft,
  autoGenerate = false,
}: {
  item: (typeof highlights)[number];
  index: number;
  fromLeft: boolean;
  autoGenerate?: boolean;
}) {
  const Icon = item.icon;
  const [runId, setRunId] = useState(0);
  const started = runId > 0;

  useEffect(() => {
    if (!autoGenerate) return;
    setRunId((prev) => (prev === 0 ? 1 : prev));
  }, [autoGenerate]);

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

      <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-blue-100 to-blue-50 text-[#020266] shadow-[0_12px_30px_rgba(0,57,148,0.14)] ring-1 ring-blue-100 transition duration-300 group-hover:scale-105 group-hover:shadow-[0_18px_40px_rgba(0,57,148,0.2)]">
        <Icon className="h-8 w-8 stroke-[2.2]" />
      </div>
      <h3 className="mt-4 text-xl font-semibold text-[#020266]">{item.title}</h3>

      <div className="mt-3 min-h-[6.5rem] sm:min-h-[5.5rem]">
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

export function ConferenceOverview() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,57,148,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,153,102,0.08),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Conference Overview
            </div>

            <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              A flagship clean energy platform linking Africa and Australia
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-700 sm:text-xl
">
              The Clean Energy Conference & Exhibition brings together policy leaders,
              investors, utilities, project developers, innovators, and development
              partners to accelerate renewable energy, critical minerals, climate
              innovation, and sustainable infrastructure. The 2026 editions are positioned
              to deepen regional collaboration, unlock investment, and support practical
              energy transition outcomes across both markets.
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

    <p className="text-base font-semibold uppercase tracking-[0.22em] text-[#020266] sm:text-xl
">
      Why it matters
    </p>
  </div>

  <div className="mt-8">
    <OutcomeCardStack items={outcomes} />
  </div>

  <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
    <motion.div
      initial={{ x: -72, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 60, damping: 18, mass: 1, delay: 0 }}
      className="rounded-[28px] bg-[#020266] p-7 text-white shadow-[0_18px_40px_rgba(0,57,148,0.24)]"
    >
      <p className="text-5xl font-bold tracking-tight">600+</p>
      <p className="mt-3 text-base leading-7 text-blue-100">
        Expected delegates from government, investment, energy, mining,
        infrastructure, and climate sectors.
      </p>
    </motion.div>

    <motion.div
      initial={{ x: 72, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 60, damping: 18, mass: 1, delay: 0.5 }}
      className="rounded-[28px] bg-[#009966] p-7 text-white shadow-[0_18px_40px_rgba(0,153,102,0.22)]"
    >
      <p className="text-5xl font-bold tracking-tight">2</p>
      <p className="mt-3 text-base leading-7 text-emerald-100">
        Strategic 2026 editions connecting African priorities with Australian
        innovation, capital, and technology.
      </p>
    </motion.div>
  </div>
</div>
        </div>

        <div
          className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          style={{ perspective: "1400px" }}
        >

          {highlights.map((item, index) => (
            <HighlightCard
              key={item.title}
              item={item}
              index={index}
              fromLeft={index % 2 === 0}
              autoGenerate={index === 0}
            />
          ))}
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
              <RotatingWord
                words={["Investment", "Technology", "Partnership", "Growth"]}
                className="text-[#009966]"
              />
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
              The 2026 editions focus on delivering measurable outcomes through
              investment-ready projects, regional cooperation, technology transfer,
              clean energy deployment, and sustainable infrastructure development
              across Africa and Australia.
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
              <h3 className="mt-3 text-2xl font-semibold text-zinc-950">
                {edition.name}
              </h3>
              <p className="mt-4 text-base font-medium text-zinc-800">{edition.date}</p>
              <p className="mt-1 text-base text-zinc-600">{edition.venue}</p>
              <p className="mt-5 text-base leading-7 text-zinc-700">{edition.description}</p>
            </div>



          ))}
        </div>

      </div>


    </section>
  );
}