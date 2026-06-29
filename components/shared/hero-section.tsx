"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";

// ─── types ─────────────────────────────────────────────────────────────────────
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

type CardsSlide = {
  kind: "cards";
  id: number;
  eyebrow: string;
  headline: string;
  sub: string;
  accent: string;
  editions: { name: string; date: string; venue: string; country: string; href: string; color: string }[];
  buttons: { label: string; href: string }[];
};

type Slide = TextSlide | CardsSlide;

// ─── slide data ────────────────────────────────────────────────────────────────
const slides: Slide[] = [
  {
    kind: "text",
    id: 0,
    eyebrow: "Africa · Australia · 2026",
    headline: "Clean Energy\nConference\n2026",
    sub: "Kigali & Perth editions bringing together policymakers, investors, and industry leaders to accelerate clean energy transition.",
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
      { name: "Kigali Edition", date: "6–7 August 2026", venue: "Kigali Marriott Hotel, Rwanda", country: "RWA", href: "/conference?edition=kigali", color: "#a5b4fc" },
      { name: "Perth Edition", date: "31 Aug – 1 Sept 2026", venue: "Novotel Hotel Perth, Australia", country: "AUS", href: "/conference?edition=perth", color: "#6ee7b7" },
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
    sub: "Three focused tracks covering the sectors driving Africa and Australia's energy future.",
    cta: "View Programme",
    href: "/event/programme",
    accent: "#6ee7b7",
  },
  {
    kind: "text",
    id: 3,
    eyebrow: "World-Class Speakers",
    headline: "80+ Speakers\n40+\nCountries",
    sub: "World-class keynotes, panel debates and executive dialogues shaping the clean energy agenda.",
    cta: "See Speakers",
    href: "/speakers",
    accent: "#fad202",
  },
  {
    kind: "text",
    id: 4,
    eyebrow: "Networking · 2026",
    headline: "Unrivalled\nNetworking\nOpportunities",
    sub: "Two days of high-level meetings, deal-making sessions and networking events across both editions.",
    cta: "Register Now",
    href: "/get-tickets",
    accent: "#f9a8d4",
  },
  {
    kind: "text",
    id: 5,
    eyebrow: "Partnership · 2026",
    headline: "Become a\nConference\nPartner",
    sub: "Align your brand with Africa and Australia's most important clean energy gathering of 2026.",
    cta: "Partner With Us",
    href: "/partners/become-a-partner",
    accent: "#fbbf24",
  },
  {
    kind: "text",
    id: 6,
    eyebrow: "Global Collaboration",
    headline: "Africa ×\nAustralia\nEnergy",
    sub: "Building bridges between two continents to accelerate the global clean energy transition.",
    cta: "Learn More",
    href: "/about",
    accent: "#6ee7b7",
  },
  {
    kind: "text",
    id: 7,
    eyebrow: "2,000+ Delegates Expected",
    headline: "Join\nLeaders\nWorldwide",
    sub: "Join government ministers, CEOs, and investors from across the clean energy value chain.",
    cta: "Register Now",
    href: "/get-tickets",
    accent: "#fad202",
  },
];

// ─── helpers ───────────────────────────────────────────────────────────────────
function useAutoAdvance(count: number, interval = 6000) {
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const jumpTo = (next: number) => {
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
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [count, interval]);

  return { active, setActive: jumpTo };
}

// ─── 👇 Change this path to match your video file in /public ──────────────────
const VIDEO_SRC = "/videos/c_banner.mp4";
// ──────────────────────────────────────────────────────────────────────────────

// ─── component ─────────────────────────────────────────────────────────────────
export function HeroSection() {
  const videoSrc = VIDEO_SRC;
  const { active, setActive } = useAutoAdvance(slides.length);
  const slide = slides[active];

  const contentRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Toggle video sound
  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted((m) => !m);
    }
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
    >
      {/* ── background: video (if provided) OR gradient fallback ── */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(135deg, #02026e 0%, #1140c4 50%, #02026e 100%)",
          }}
        />
      )}

      {/* ── dark scrim so text stays readable over any video ── */}
      <div className="absolute inset-0 z-[1] bg-black/35" />

      {/* ── subtle vignette at edges ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* ── noise grain ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.06]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      {/* ── nav (logo + sun dot only — no nav links as requested) ── */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 md:px-14">
        <span
          className="text-white text-xl font-semibold"
          style={{ letterSpacing: "-0.02em" }}
        >
          {/* Replace with your logo/wordmark */}
          Clean Energy Conference
        </span>

        {/* pulsing accent dot */}
        <motion.div
          className="absolute left-1/2 top-5 -translate-x-1/2 rounded-full"
          style={{ background: slide.accent, width: 14, height: 14 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Register CTA in nav */}
        <a
          href="/get-tickets"
          className="hidden md:inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: slide.accent,
            color: "#0a0800",
            letterSpacing: "0.04em",
          }}
        >
          Register Now
        </a>
      </nav>

      {/* ── white-bordered adaptive wrapper ── */}
      <div className="relative z-10 flex-1 flex items-center justify-start px-4 pb-10 md:px-14">
        <motion.div
          className="w-full max-w-lg rounded-3xl border-2 border-white"
          style={{ background: "rgba(0,0,0,0.08)" }}
          layout
          transition={{ layout: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } }}
        >
          <div ref={contentRef} className="p-8 md:p-14">

            {/* eyebrow */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`eye-${active}`}
                className="text-xs uppercase tracking-[0.18em] mb-5"
                style={{ color: slide.accent }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
              >
                {slide.eyebrow}
              </motion.p>
            </AnimatePresence>

            {/* headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`h-${active}`}
                className="text-white font-bold leading-[1.05] mb-8"
                style={{
                  fontSize: "clamp(2.4rem, 6vw, 5rem)",
                  letterSpacing: "-0.03em",
                  whiteSpace: "pre-line",
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {slide.headline}
              </motion.h1>
            </AnimatePresence>

            {/* ── CARDS slide content ── */}
            {slide.kind === "cards" ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cards-${active}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {/* sub */}
                  <p className="text-white/70 text-sm leading-relaxed mb-5 max-w-[340px]">
                    {slide.sub}
                  </p>

                  {/* edition cards */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    {slide.editions.map((ed) => (
                      <a
                        key={ed.name}
                        href={ed.href}
                        className="relative flex flex-col rounded-xl px-4 py-3 transition-all duration-200 hover:scale-[1.03]"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          minWidth: "160px",
                          flex: 1,
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)";
                        }}
                      >
                        {/* top colour accent */}
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

                  {/* action buttons */}
                  <div className="flex flex-wrap gap-2">
                    {slide.buttons.map((btn) => (
                      <a
                        key={btn.label}
                        href={btn.href}
                        className="inline-block px-7 py-3 rounded-xl border text-sm font-medium text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                        style={{
                          borderColor: slide.accent,
                          background: "rgba(255,255,255,0.08)",
                        }}
                      >
                        {btn.label}
                      </a>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              /* ── TEXT slide content ── */
              <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`cta-${active}`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                  >
                    <a
                      href={slide.href}
                      className="inline-block px-7 py-3 rounded-xl border text-sm font-medium text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                      style={{
                        borderColor: slide.accent,
                        background: "rgba(255,255,255,0.08)",
                      }}
                    >
                      {slide.cta}
                    </a>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`sub-${active}`}
                    className="text-white/70 text-sm leading-relaxed max-w-[260px]"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                  >
                    {slide.sub}
                  </motion.p>
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── bottom bar ── */}
      <div className="relative z-20 flex items-center justify-between px-8 md:px-14 pb-8">
        {/* progress dots */}
        <div className="flex items-center gap-3">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
              style={{
                width: active === i ? 40 : 16,
                background: "rgba(255,255,255,0.25)",
              }}
            >
              {active === i && (
                <motion.span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{ background: slide.accent }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* slide counter */}
        <div className="flex items-center gap-6">
          <span
            className="text-white/40 text-xs font-mono"
            style={{ letterSpacing: "0.18em" }}
          >
            {String(active + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(slides.length).padStart(2, "0")}
          </span>

          {/* sound toggle — only active when a video is provided */}
          <button
            onClick={videoSrc ? toggleSound : undefined}
            className="flex items-center gap-3 text-white/60 text-xs hover:text-white/90 transition-colors"
            style={{ cursor: videoSrc ? "pointer" : "default" }}
          >
            <span>Sound</span>
            <div className="w-10 h-[2px] rounded-full bg-white/30 relative overflow-hidden">
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
              className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors"
              style={{
                borderColor: muted || !videoSrc ? "rgba(255,255,255,0.2)" : slide.accent,
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      </div>
    </section>
  );
}