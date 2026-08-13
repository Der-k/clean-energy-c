"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { ROLE_NAV_TRIGGER_ID } from "@/components/layout/role-subnav"; // adjust to wherever RoleSubNav lives

// ─── STATS BAR ─────────────────────────────────────────────────────────────────

const stats = [
  { value: "600+", label: "Expected Delegates" },
  { value: "5,000+", label: "Past Participants" },
  { value: "8", label: "Successful Editions" },
  { value: "USD 2.2T", label: "Global Clean Energy Investment" },
  { value: "585 GW", label: "2024 Renewable Capacity Added" },
  { value: "600M", label: "Africans Without Electricity" },
  { value: "90%", label: "Rwanda Renewable Target by 2030" },
  { value: "$16B", label: "Rwanda Energy Investment Pipeline" },
];

export function StatsBar() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;

    const interval = setInterval(() => {
      scrollAmount += 0.5;

      container.scrollTo({
        left: scrollAmount,
        behavior: "auto",
      });

      if (scrollAmount > container.scrollWidth / 2) {
        scrollAmount = 0;
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#020266] text-white">
      <div
        ref={scrollRef}
        className="relative flex gap-8 md:gap-12 overflow-x-auto whitespace-nowrap px-4 md:px-6 py-4 md:py-5 scrollbar-none"
      >
        {[...stats, ...stats].map((stat, index) => (
          <div
            key={index}
            className="flex min-w-max items-center gap-3 md:gap-4 border-r border-white/15 pr-8 md:pr-12"
          >
            <span className="text-lg md:text-2xl font-extrabold text-emerald-300">
              {stat.value}
            </span>

            <span className="text-xs md:text-base font-semibold uppercase tracking-[0.14em] md:tracking-[0.18em] text-white/75">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── HERO SECTION ──────────────────────────────────────────────────────────────

type TextSlide = {
  kind: "text";
  id: number;
  eyebrow: string;
  headline: string;
  sub: string;
  cta: string;
  href: string;
  accent: string;
};

type Edition = {
  name: string;
  date: string;
  venue: string;
  country: string;
  href: string;
  color: string;
};

type CardsSlide = {
  kind: "cards";
  id: number;
  eyebrow: string;
  headline: string;
  sub: string;
  accent: string;
  editions: Edition[];
  buttons: { label: string; href: string }[];
};

type Slide = TextSlide | CardsSlide;

const slides: Slide[] = [
  {
    kind: "text",
    id: 0,
    eyebrow: "Africa · Australia · 2026",
    headline: "Clean Energy\nConference\n2026",
    sub: "Kigali & Perth editions bringing together policymakers, investors, and industry leaders to accelerate Africa's clean energy transition.",
    cta: "Register Now",
    href: "/get-tickets",
    accent: "#fad202",
  },
  {
    kind: "cards",
    id: 1,
    eyebrow: "Two Editions · One Mission",
    headline: "Two Editions.\nOne Mission.",
    sub: "Choose your destination and be part of Africa and Australia's leading clean energy event.",
    accent: "#a5b4fc",
    editions: [
      {
        name: "Kigali Edition",
        date: "6–7 August 2026",
        venue: "Kigali Marriott Hotel, Rwanda",
        country: "RWA",
        href: "/conference?edition=Kigali",
        color: "#a5b4fc",
      },
      {
        name: "Perth Edition",
        date: "31 Aug – 1 Sept 2026",
        venue: "Novotel Hotel Perth, Australia",
        country: "AUS",
        href: "/conference?edition=perth",
        color: "#6ee7b7",
      },
    ],
    buttons: [
      { label: "Register Now", href: "/get-tickets" },
      { label: "View Programme", href: "/event/programme" },
      { label: "Become a Partner", href: "/partners/become-a-partner" },
    ],
  },
  {
    kind: "text",
    id: 2,
    eyebrow: "Programme · 2026",
    headline: "Solar,\nGeothermal\n& Clean Mining",
    sub: "Focused tracks covering renewable energy, critical minerals, green hydrogen, and sustainable infrastructure across Africa and Australia.",
    cta: "View Programme",
    href: "/event/programme",
    accent: "#6ee7b7",
  },
  {
    kind: "text",
    id: 3,
    eyebrow: "World-Class Speakers",
    headline: "Governments.\nInvestors.\nInnovators.",
    sub: "High-level plenaries, technical workshops, investor roundtables, and panel discussions shaping Africa's clean energy agenda.",
    cta: "See Speakers",
    href: "/speakers",
    accent: "#fad202",
  },
  {
    kind: "text",
    id: 4,
    eyebrow: "Networking · 2026",
    headline: "Unrivalled\nNetworking\nOpportunities",
    sub: "Deal rooms, B2B meetings, investor roundtables, and partnership sessions across both the Kigali and Perth editions.",
    cta: "Register Now",
    href: "/get-tickets",
    accent: "#f9a8d4",
  },
  {
    kind: "text",
    id: 5,
    eyebrow: "Partnership · 2026",
    headline: "Become a\nConference\nPartner",
    sub: "Gain visibility across African and Australian energy networks, access curated investment matchmaking, and help shape Africa's clean energy agenda.",
    cta: "Partner With Us",
    href: "/partners/become-a-partner",
    accent: "#fbbf24",
  },
  {
    kind: "text",
    id: 6,
    eyebrow: "Rwanda's Vision 2050",
    headline: "Rwanda:\nClean Energy\nHub",
    sub: "Rwanda's Vision 2050 targets 90% renewable energy by 2030 — Kigali is emerging as the continent's leading hub for clean energy and innovation.",
    cta: "Learn More",
    href: "/about",
    accent: "#6ee7b7",
  },
  {
    kind: "text",
    id: 7,
    eyebrow: "600+ Delegates Expected",
    headline: "Join\nLeaders\nWorldwide",
    sub: "Join government ministers, Fortune 500 firms, investors, utility companies, and innovators from across the clean energy value chain.",
    cta: "Register Now",
    href: "/get-tickets",
    accent: "#fad202",
  },
];

const TICKER_ITEMS = [
  "Join us for the Clean Energy 2026 Conference",
  "Connecting minds, powering a cleaner future",
  "Building solar infrastructure across continents",
  "Collaboration between engineers and investors driving solar adoption",
  "Preserving Africa's wildlife through sustainable energy",
  "Celebrating nature's power — water as a renewable resource",
  "Global leaders driving clean energy conversations",
  "Powering future cities with clean, reliable energy",
  "Harnessing hydrothermal potential across Africa and Australia",
  "Inclusive discussions on diversity and clean energy innovation",
  "Solar energy transforming rural and urban landscapes",
  "Training the next generation of solar engineers",
  "Empowering communities for a brighter, cleaner tomorrow",
  "Harnessing the wind for Africa–Australia energy needs",
  "Smart cities powered by clean tech solutions",
  "Transforming transportation for a net-zero future",
  "Africa's cities embracing clean energy innovation",
  "Networking for climate action and energy collaboration",
  "A global gathering for a clean energy future",
];

function useAutoAdvance(count: number, interval = 6000) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const jumpTo = (next: number): void => {
    if (timer.current) clearInterval(timer.current);
    setActive(next);
    timer.current = setInterval(
      () => setActive((p) => (p + 1) % count),
      interval
    );
  };

  useEffect(() => {
    timer.current = setInterval(
      () => setActive((p) => (p + 1) % count),
      interval
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [count, interval]);

  return { active, setActive: jumpTo };
}

interface RotatingTickerProps {
  accent: string;
  active: number;
  total: number;
  muted: boolean;
  videoSrc: boolean;
  onToggleSound: () => void;
}

function RotatingTicker({
  accent,
  active,
  total,
  muted,
  videoSrc,
  onToggleSound,
}: RotatingTickerProps) {
  // Advances strictly in order from index 0 — caption 0 = opening image, rest follow video scenes.
  const indexRef = useRef(0);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % TICKER_ITEMS.length;
        setIndex(indexRef.current);
        setVisible(true);
      }, 500);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute z-20 bottom-4 inset-x-4 md:inset-x-auto md:bottom-8 md:right-14 flex flex-col items-end gap-2 md:gap-4">
      <div className="flex items-center gap-4 md:gap-6">
        <span
          className="text-white/40 text-[10px] md:text-xs font-mono"
          style={{ letterSpacing: "0.18em" }}
        >
          {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
        </span>

        <button
          onClick={onToggleSound}
          className="flex items-center gap-2 md:gap-3 text-white/60 text-[10px] md:text-xs hover:text-white/90 transition-colors"
          style={{ cursor: videoSrc ? "pointer" : "default" }}
        >
          <span className="hidden sm:inline">Sound</span>
          <div className="w-8 md:w-10 h-[2px] rounded-full bg-white/30 relative overflow-hidden">
            {!muted && videoSrc && (
              <motion.span
                className="absolute inset-y-0 left-0 bg-white/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            )}
          </div>
          <div
            className="w-6 h-6 md:w-7 md:h-7 rounded-full border flex items-center justify-center transition-colors shrink-0"
            style={{
              borderColor: muted || !videoSrc ? "rgba(255,255,255,0.2)" : accent,
            }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {muted || !videoSrc ? (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </>
              ) : (
                <>
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </>
              )}
            </svg>
          </div>
        </button>
      </div>

      <div className="flex flex-col items-end gap-2 md:gap-3 pointer-events-none w-full">
        <AnimatePresence mode="wait">
          {visible && (
            <motion.span
              key={TICKER_ITEMS[index]}
              className="text-white font-black text-right ml-auto"
              style={{
                fontSize: "clamp(0.95rem, 3.6vw, 2rem)",
                letterSpacing: "-0.015em",
                lineHeight: 1.2,
                whiteSpace: "pre-line",
                textAlign: "right",
                textTransform: "none",
                textShadow: "0 2px 40px rgba(0,0,0,0.5)",
                maxWidth: "min(100%, 500px)",
              }}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {TICKER_ITEMS[index]}
            </motion.span>
          )}
        </AnimatePresence>

        <motion.div
          key={`line-${index}`}
          style={{ height: 3, background: accent, borderRadius: 2, alignSelf: "stretch" }}
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 3.5, ease: "linear" }}
        />
      </div>
    </div>
  );
}

export function HeroSection() {
  const { active, setActive } = useAutoAdvance(slides.length);
  const currentAccent = slides[active].accent;

  const contentRef = useRef<HTMLDivElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [sweeping, setSweeping] = useState(false);
  const [sweepDone, setSweepDone] = useState(false);
  const [imageVisible, setImageVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setImageVisible(false);
      setSweeping(true);
      setShowVideo(true);
    }, 3000);
    const t2 = setTimeout(() => setSweepDone(true), 6500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted((m) => !m);
    }
  };

  return (
    <section
      id={ROLE_NAV_TRIGGER_ID}
      className="relative w-full min-h-screen overflow-hidden flex flex-col -mt-[90px] md:-mt-[152px]"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ opacity: imageVisible ? 1 : 0 }}
        transition={{ duration: 1.0, ease: "easeInOut" }}
        style={{
          backgroundImage: "url('/images/hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <motion.video
        ref={videoRef}
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 z-[1] w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: showVideo ? 1 : 0 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        <source media="(max-width: 768px)" src="/videos/c_banner-mobile.mp4" type="video/mp4" />
        <source src="/videos/c_banner.webm" type="video/webm" />
        <source src="/videos/c_banner-compressed.mp4" type="video/mp4" />
      </motion.video>

      <AnimatePresence>
        {sweeping && !sweepDone && (
          <motion.div
            className="absolute inset-0 z-[3] pointer-events-none overflow-hidden"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: "200%", left: "-50%", display: "flex", flexDirection: "row" }}
          >
            <div style={{ flex: 1, background: "#0F0F76" }} />
            <div style={{ width: 1, background: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
            <div style={{ flex: 1, background: "#009966" }} />
            <div style={{ width: 1, background: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
            <div style={{ flex: 1, background: "#F2CB01" }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-[2] bg-black/35" />

      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)" }}
      />

      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* Nav is now a 3-col grid so the pulsing dot centers itself relative to
          this row's own height, instead of a hardcoded pixel `top` that only
          matched the desktop nav height. */}
      <nav className="relative z-20 grid grid-cols-[1fr_auto_1fr] items-center px-4 pt-[90px] pb-4 md:px-14 md:pt-[168px] md:pb-6">
        <span
          className="text-white text-base md:text-xl font-semibold truncate"
          style={{ letterSpacing: "-0.02em" }}
        >
          Clean Energy Conference
        </span>

        <motion.div
          className="rounded-full justify-self-center"
          style={{ background: currentAccent, width: 10, height: 10 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <div />
      </nav>

      {/*
        FIX FOR NAVBAR FLICKER
        -----------------------
        Previously this card used `layout` + swapped one slide's DOM in/out for
        another (AnimatePresence mode="wait"). Because the "cards" slide is a
        lot taller than the plain text slides, Framer Motion smoothly animated
        the card's HEIGHT every time `active` changed (every 6s). That
        animated the total page height while the hero sits above the fold,
        which shifted window scroll position and kept re-triggering the
        scroll-direction logic that hides/shows the header (and the
        ROLE_NAV_TRIGGER_ID observer), causing the collapse/expand flicker.

        Fix: mount ALL slides at once, stacked in the same CSS grid cell
        (gridArea: "1 / 1"), and only crossfade opacity between the active
        one. A grid stack auto-sizes to its tallest child, and since every
        slide is always present that height is constant for the entire
        lifetime of the component — it never animates or reflows again.
      */}
      <div className="relative z-10 flex-1 flex items-center justify-start px-4 pb-40 md:px-14 md:pb-10">
        <div
          className="w-full md:w-fit md:min-w-[280px] max-w-full sm:max-w-md md:max-w-xl lg:max-w-2xl rounded-2xl md:rounded-3xl border-2 border-white overflow-hidden"
          style={{ background: "rgba(0,0,0,0.08)" }}
        >
          <div ref={contentRef} className="relative grid p-5 md:p-14">
            {slides.map((s, i) => {
              const isActive = active === i;
              return (
                <motion.div
                  key={s.id}
                  style={{ gridArea: "1 / 1", pointerEvents: isActive ? "auto" : "none" }}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                  aria-hidden={!isActive}
                >
                  <p
                    className="text-[10px] md:text-xs uppercase tracking-[0.14em] md:tracking-[0.18em] mb-3 md:mb-5"
                    style={{ color: s.accent }}
                  >
                    {s.eyebrow}
                  </p>

                  <h1
                    className="text-white font-bold leading-[1.1] md:leading-[1.05] mb-5 md:mb-8"
                    style={{ fontSize: "clamp(1.8rem, 8vw, 5rem)", letterSpacing: "-0.03em" }}
                  >
                    {s.headline.replace(/\n/g, " ")}
                  </h1>

                  {s.kind === "cards" ? (
                    <div>
                      <p className="text-white/70 text-sm leading-relaxed mb-4 md:mb-5 max-w-full md:max-w-[420px]">
                        {s.sub}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 mb-4 md:mb-5">
                        {s.editions.map((ed) => (
                          <a
                            key={ed.name}
                            href={ed.href}
                            className="relative flex flex-col rounded-xl px-4 py-3 transition-all duration-200 hover:scale-[1.03] w-full sm:min-w-[160px] sm:flex-1"
                            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                            }}
                          >
                            <span
                              style={{
                                position: "absolute",
                                top: 0,
                                left: "12px",
                                right: "12px",
                                height: "2px",
                                background: ed.color,
                                borderRadius: "0 0 2px 2px",
                                opacity: 0.8,
                              }}
                            />
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: ed.color }}>
                                {ed.name.replace(" Edition", "")}
                              </span>
                              <span className="text-[10px] font-mono" style={{ color: "rgba(255,255,255,0.35)" }}>
                                {ed.country}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 text-[12px] font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
                              <CalendarDays className="h-3 w-3 shrink-0" style={{ color: "rgba(255,255,255,0.45)" }} />
                              {ed.date}
                            </div>
                            <div className="mt-0.5 flex items-center gap-1.5 text-[11px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                              <MapPin className="h-3 w-3 shrink-0" />
                              {ed.venue.split(",")[0]}
                            </div>
                            <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold" style={{ color: ed.color }}>
                              Details <ArrowRight className="h-3 w-3" />
                            </div>
                          </a>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {s.buttons.map((btn) => (
                          <a
                            key={btn.label}
                            href={btn.href}
                            className="inline-block px-5 md:px-7 py-2.5 md:py-3 rounded-xl border text-xs md:text-sm font-medium text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                            style={{ borderColor: s.accent, background: "rgba(255,255,255,0.08)" }}
                          >
                            {btn.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-16">
                      <div>
                        <a
                          href={s.href}
                          className="inline-block px-5 md:px-7 py-2.5 md:py-3 rounded-xl border text-xs md:text-sm font-medium text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                          style={{ borderColor: s.accent, background: "rgba(255,255,255,0.08)" }}
                        >
                          {s.cta}
                        </a>
                      </div>

                      <p className="text-white/70 text-sm leading-relaxed max-w-full md:max-w-[320px]">
                        {s.sub}
                      </p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative z-20 flex items-center px-4 md:px-14 pb-6 md:pb-8">
        <div className="flex items-center gap-2 md:gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
              style={{ width: active === i ? 40 : 16, background: "rgba(255,255,255,0.25)" }}
            >
              {active === i && (
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: currentAccent }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <RotatingTicker
        accent={currentAccent}
        active={active}
        total={slides.length}
        muted={muted}
        videoSrc={true}
        onToggleSound={toggleSound}
      />
    </section>
  );
}