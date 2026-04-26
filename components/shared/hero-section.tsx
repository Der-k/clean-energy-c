"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

const categoryImages = {
  solar: [
    { src: "/images/solar-1.jpg", alt: "Solar energy" },
    { src: "/images/solar-2.jpg", alt: "Solar panels" },
    { src: "/images/solar-3.jpg", alt: "Solar farm" },
    { src: "/images/solar-4.jpg", alt: "Solar farm" },
  ],
  geothermal: [
    { src: "/images/geo-1.jpg", alt: "Geothermal energy" },
    { src: "/images/geo-2.jpg", alt: "Hydrothermal plant" },
    { src: "/images/geo-3.jpg", alt: "Geothermal steam" },
    { src: "/images/geo-4.jpg", alt: "Geothermal steam" },

  ],
  mining: [
    { src: "/images/mining-1.jpg", alt: "Mining operations" },
    { src: "/images/mining-2.jpg", alt: "Mine site" },
    { src: "/images/mining-3.jpg", alt: "Clean mining" },
    { src: "/images/mining-4.jpg", alt: "Clean mining" },
  ],
};

const carouselImages = [
  { src: "/images/hero-carousel-1.jpeg", alt: "Delegates networking" },
  { src: "/images/hero-carousel-2.jpeg", alt: "Panel session" },
  { src: "/images/hero-carousel-3.jpeg", alt: "Audience keynote" },
  { src: "/images/hero-carousel-4.jpeg", alt: "Exhibition area" },
  { src: "/images/hero-carousel-5.jpeg", alt: "Speaker presentation" },
  { src: "/images/hero-carousel-6.jpeg", alt: "Networking event" },
  { src: "/images/hero-carousel-7.jpeg", alt: "Conference hall" },
  { src: "/images/hero-carousel-8.jpeg", alt: "Energy discussion" },
];

const FLIP_DURATION = 1200;
const SLOT_GAP = 600;
const CYCLE_PAUSE = 5000;


const editions = [
  {
    name: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    accent: "text-[#02026e]",
    href: "/conference?edition=kigali",
  },
  {
    name: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    accent: "text-emerald-600",
    href: "/conference?edition=perth",
  },
];

// ─── Global coordinator ───────────────────────────────────────────────────────
const slotCallbacks: Array<(() => void) | null> = [null, null, null];
function registerSlot(index: number, cb: () => void) {
  slotCallbacks[index] = cb;
}

// ─── FlipImageSlot ────────────────────────────────────────────────────────────
function FlipImageSlot({
  images,
  slotIndex,
  label,
  cardPosition = "top-left",
}: {
  images: { src: string; alt: string }[];
  slotIndex: number;
  label: string;
  cardPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const [frontIdx, setFrontIdx] = useState(0);
  const [backIdx, setBackIdx] = useState(1);
  const [flipped, setFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  const doFlip = useCallback(() => {
    if (isFlipping) return;
    setIsFlipping(true);
    const nextImg = flipped
      ? (frontIdx + 1) % images.length
      : (backIdx + 1) % images.length;
    if (flipped) setFrontIdx(nextImg);
    else setBackIdx(nextImg);
    setTimeout(() => {
      setFlipped((f) => !f);
      setTimeout(() => setIsFlipping(false), FLIP_DURATION);
    }, 50);
  }, [isFlipping, flipped, frontIdx, backIdx, images.length]);

  useEffect(() => {
    registerSlot(slotIndex, doFlip);
  }, [slotIndex, doFlip]);

  useEffect(() => {
    if (slotIndex !== 0) return;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const runCycle = () => {
      if (cancelled) return;
      slotCallbacks.forEach((cb, i) => {
        const t = setTimeout(() => { if (!cancelled) cb?.(); }, i * (FLIP_DURATION + SLOT_GAP));
        timers.push(t);
      });
      const cycleLength = 3 * (FLIP_DURATION + SLOT_GAP) + CYCLE_PAUSE;
      timers.push(setTimeout(runCycle, cycleLength));
    };
    timers.push(setTimeout(runCycle, 1000));
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [slotIndex]);

  const positionStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 20,
    ...(cardPosition === "top-left"     && { top: 12, left: 12 }),
    ...(cardPosition === "top-right"    && { top: 12, right: 12 }),
    ...(cardPosition === "bottom-left"  && { bottom: 12, left: 12 }),
    ...(cardPosition === "bottom-right" && { bottom: 12, right: 12 }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ perspective: "1200px" }}>
      <div
        style={{
          position: "absolute", inset: 0,
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: isFlipping
            ? `transform ${FLIP_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`
            : "none",
        }}
      >
        <img src={images[frontIdx].src} alt={images[frontIdx].alt}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        />
        <img src={images[backIdx].src} alt={images[backIdx].alt}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "center",
            backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)" }}
        />
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: cardPosition.startsWith("bottom")
            ? "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 55%)",
        }}
      />
      <div style={{
        ...positionStyle,
        borderRadius: 6, padding: "4px 10px",
        background: "rgba(10, 13, 28, 0.72)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.12)",
        fontSize: 9, fontWeight: 700, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "white", maxWidth: 120, lineHeight: 1.4,
      }}>
        {label}
      </div>
    </div>
  );
}

// ─── ConferenceMomentsCarousel ─────────────────────────────────────────────────
// Continuous-scroll marquee on all screen sizes.
// • Images are taller (clamp height, 3:2 aspect ratio)
// • Touch/pointer drag works everywhere — velocity-based momentum
// • Prev/Next buttons nudge the scroll speed (feel: push the belt)
// • Dots derived from marquee position track which image is "centremost"

const MARQUEE_BASE_SPEED = 0.7;   // px per frame auto-scroll
const MOMENTUM_DECAY     = 0.90;  // drag release decay
const MIN_VELOCITY       = 0.15;  // below this → hand back to auto

function ConferenceMomentsCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null); // drag surface
  const marqueeRef = useRef<HTMLDivElement>(null); // the moving strip
  const dotsRef    = useRef<HTMLDivElement>(null);

  const nudgeRef = useRef<(dir: "prev" | "next") => void>(() => {});

  // ── All animation + interaction wired up with native listeners ──────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const strip   = marqueeRef.current;
    const dotsCtr = dotsRef.current;
    if (!wrapper || !strip || !dotsCtr) return;

    // ── state (plain vars, no React) ─────────────────────────────────────────
    let pos        = 0;
    let vel        = 0;
    let dragging   = false;
    let lastX      = 0;
    let lastT      = 0;
    let halfW      = 0;
    let cardW      = 0;
    let activeIdx  = 0;
    let raf: number;

    // ── measure once ─────────────────────────────────────────────────────────
    const measure = () => {
      halfW = strip.scrollWidth / 2;
      if (strip.children.length >= 2) {
        const a = strip.children[0] as HTMLElement;
        const b = strip.children[1] as HTMLElement;
        cardW = b.offsetLeft - a.offsetLeft;
      }
    };
    // defer so images have rendered
    requestAnimationFrame(measure);

    // ── dots ─────────────────────────────────────────────────────────────────
    const updateDots = (idx: number) => {
      const dots = dotsCtr.children;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i] as HTMLElement;
        d.style.width      = i === idx ? "22px" : "6px";
        d.style.background = i === idx ? "white" : "rgba(255,255,255,0.3)";
      }
    };

    // ── RAF tick ─────────────────────────────────────────────────────────────
    const tick = () => {
      if (!halfW) measure();

      // velocity decay
      vel = Math.abs(vel) > MIN_VELOCITY ? vel * MOMENTUM_DECAY : 0;

      if (!dragging) pos -= MARQUEE_BASE_SPEED + vel;

      // wrap
      if (pos <= -halfW) pos += halfW;
      if (pos > 0)       pos -= halfW;

      strip.style.transform = `translateX(${pos}px)`;

      // active dot via pure math
      if (cardW > 0) {
        const n   = carouselImages.length;
        const raw = Math.round((-pos + window.innerWidth / 2 - cardW / 2) / cardW);
        const idx = ((raw % n) + n) % n;
        if (idx !== activeIdx) { activeIdx = idx; updateDots(idx); }
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // expose nudge to button handlers (which are React onClick, that's fine —
    // clicks are infrequent and not on the hot path)
    nudgeRef.current = (dir) => { vel = dir === "prev" ? 6 : -6; };

    // ── native touch handlers — registered with passive:true so browser
    //    composites immediately without waiting for JS ───────────────────────
    const onTouchStart = (e: TouchEvent) => {
      dragging = true;
      lastX    = e.touches[0].clientX;
      lastT    = performance.now();
      vel      = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx  = e.touches[0].clientX - lastX;
      pos      += dx;
      vel       = -(dx / Math.max(now - lastT, 1)) * 16;
      lastX     = e.touches[0].clientX;
      lastT     = now;
    };

    const onTouchEnd = () => { dragging = false; };

    // mouse drag for desktop
    const onMouseDown = (e: MouseEvent) => {
      dragging = true; lastX = e.clientX; lastT = performance.now(); vel = 0;
      wrapper.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx  = e.clientX - lastX;
      pos      += dx;
      vel       = -(dx / Math.max(now - lastT, 1)) * 16;
      lastX     = e.clientX; lastT = now;
    };
    const onMouseUp = () => { dragging = false; wrapper.style.cursor = "grab"; };

    // passive:true = browser doesn't block composite thread waiting for preventDefault
    wrapper.addEventListener("touchstart",  onTouchStart, { passive: true });
    wrapper.addEventListener("touchmove",   onTouchMove,  { passive: true });
    wrapper.addEventListener("touchend",    onTouchEnd,   { passive: true });
    wrapper.addEventListener("touchcancel", onTouchEnd,   { passive: true });
    wrapper.addEventListener("mousedown",   onMouseDown);
    window.addEventListener("mousemove",    onMouseMove);
    window.addEventListener("mouseup",      onMouseUp);

    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener("touchstart",  onTouchStart);
      wrapper.removeEventListener("touchmove",   onTouchMove);
      wrapper.removeEventListener("touchend",    onTouchEnd);
      wrapper.removeEventListener("touchcancel", onTouchEnd);
      wrapper.removeEventListener("mousedown",   onMouseDown);
      window.removeEventListener("mousemove",    onMouseMove);
      window.removeEventListener("mouseup",      onMouseUp);
    };
  }, []);

  // ── Render — no event handlers on the hot path ──────────────────────────────
  return (
    <div className="relative w-full mt-10 overflow-hidden bg-[#003994]">

      {/* Header bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-white/60 shrink-0">
            Conference Moments
          </span>
          <span className="hidden sm:block h-px w-8 bg-white/20 shrink-0" />
          <span className="hidden md:block text-[10px] text-white/40 truncate">
            Highlights from previous editions and industry gatherings
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/50 uppercase tracking-widest">Live 2026</span>
        </div>
      </div>

      {/* Drag surface */}
      <div
        ref={wrapperRef}
        className="relative py-4"
        style={{ cursor: "grab", userSelect: "none", touchAction: "pan-y" }}
      >
        <div className="overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex w-max will-change-transform"
            style={{ gap: "clamp(10px, 1.5vw, 16px)", paddingLeft: 16, paddingRight: 16 }}
          >
            {[...carouselImages, ...carouselImages].map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className="relative shrink-0 overflow-hidden rounded-2xl"
                style={{ width: "clamp(260px, 38vw, 520px)", height: "clamp(174px, 25.3vw, 347px)" }}
              >
                <Image
                  src={image.src} alt={image.alt} fill
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 38vw, 520px"
                  className="object-cover pointer-events-none"
                  draggable={false}
                  priority={index < 3}
                />
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                <span className="absolute bottom-2.5 left-3.5 text-[10px] font-semibold text-white/75 tracking-widest uppercase pointer-events-none">
                  {image.alt}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Left fade + prev (desktop only) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-20 bg-gradient-to-r from-[#003994] to-transparent z-10" />
        <button
          onClick={() => nudgeRef.current("prev")}
          aria-label="Previous"
          className="pointer-events-auto absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20
            hidden sm:flex h-11 w-11 items-center justify-center rounded-full
            bg-white text-[#003994] shadow-[0_4px_20px_rgba(0,0,0,0.4)]
            transition-all duration-150 active:scale-90 hover:scale-110 touch-manipulation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right fade + next (desktop only) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-20 bg-gradient-to-l from-[#003994] to-transparent z-10" />
        <button
          onClick={() => nudgeRef.current("next")}
          aria-label="Next"
          className="pointer-events-auto absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20
            hidden sm:flex h-11 w-11 items-center justify-center rounded-full
            bg-white text-[#003994] shadow-[0_4px_20px_rgba(0,0,0,0.4)]
            transition-all duration-150 active:scale-90 hover:scale-110 touch-manipulation"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots — imperatively updated, never re-rendered */}
      <div ref={dotsRef} className="flex justify-center items-center gap-1.5 pb-4">
        {carouselImages.map((_, i) => (
          <button
            key={i}
            aria-label={`Image ${i + 1}`}
            className="touch-manipulation"
            style={{
              width: i === 0 ? "22px" : "6px", height: "6px",
              borderRadius: "3px",
              background: i === 0 ? "white" : "rgba(255,255,255,0.3)",
              border: "none", padding: 0, cursor: "pointer", flexShrink: 0,
              transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), background 0.25s ease",
            }}
          />
        ))}
      </div>

    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
export function HeroSection() {
  const slots = [
    { images: categoryImages.solar,      label: "Solar",                     cardPosition: "top-left"     as const },
    { images: categoryImages.geothermal, label: "Geothermal & Hydrothermal", cardPosition: "bottom-right" as const },
    { images: categoryImages.mining,     label: "Mining",                    cardPosition: "bottom-left"  as const },
  ];

  return (
    <section className="relative overflow-hidden bg-white min-h-[calc(100vh-96px)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,white_62%,#f8fafc_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

      {/* ── ROW 1: heading + image ── */}
      <div className="relative mx-auto max-w-7xl px-4 pt-6 md:px-6 lg:pt-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-10">

          {/* LEFT */}
          <div className="max-w-3xl pt-2">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#010150] shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
              Africa × Australia · Two 2026 Conference Editions
            </div>

            <h1 className="font-heading mt-4 max-w-4xl text-4xl font-extrabold leading-[0.96] tracking-[-0.045em] text-slate-950 sm:text-[3.25rem] lg:text-[3.8rem]">
              Driving the Future of
              <span className="mt-2 block text-[#02026e]">Clean Energy</span>
            </h1>

            <p className="mt-4 max-w-2xl text-[17px] leading-7 text-slate-700 sm:text-lg">
              Join policymakers, investors, project developers, innovators, and
              industry stakeholders across Kigali and Perth for a high-level
              platform focused on energy transition, climate finance, regional
              collaboration, and market opportunity.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://eventbrite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[#003994] bg-white transition
                  shadow-[0_10px_25px_rgba(255,255,255,0.25)]
                  hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25),0_0_20px_rgba(255,255,255,0.35),0_12px_30px_rgba(255,255,255,0.25)]
                  hover:scale-[1.02]"
              >
                Register Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/event/programme"
                className="btn-outline-glow inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-slate-900"
              >
                View Programme
              </a>
              <Link
                href="/partners/become-a-partner"
                className="btn-outline-glow inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Become a Partner
              </Link>
            </div>

            {/* Edition cards */}
            <div className="mt-6 flex flex-wrap gap-3">
              {editions.map((edition) => (
                <Link
                  key={edition.name}
                  href={edition.href}
                  className="hover-glow-card group block rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
                >
                  <p className={`text-[11px] font-semibold uppercase tracking-[0.2em] ${edition.accent}`}>
                    {edition.name}
                  </p>
                  <div className="mt-4 space-y-3 text-sm text-slate-700">
                    <div className="flex items-start gap-2.5">
                      <CalendarDays className="mt-0.5 h-4 w-4 text-[#02026e]" />
                      <span>{edition.date}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 text-[#02026e]" />
                      <span>{edition.venue}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm font-medium text-slate-700">
                    <span>View details</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: 3 stacked flip slots */}
          <div className="relative lg:pt-2">
            <div className="relative">
              <div className="relative rounded-[32px] border border-slate-200 shadow-[0_30px_90px_rgba(15,23,42,0.18)] overflow-hidden">
                <div className="flex flex-col" style={{ aspectRatio: "4 / 5.2" }}>
                  {slots.map((slot, i) => {
                    const skew = 48;
                    const isFirst = i === 0;
                    const isLast  = i === slots.length - 1;
                    const clipPath = isFirst
                      ? `polygon(0 0, 100% 0, 100% calc(100% - ${skew}px), 0 100%)`
                      : isLast
                      ? `polygon(0 0, 100% ${skew}px, 100% 100%, 0 100%)`
                      : `polygon(0 ${skew}px, 100% 0, 100% 100%, 0 calc(100% - ${skew}px))`;

                    return (
                      <div
                        key={i}
                        className="relative w-full"
                        style={{ flex: 1, clipPath, marginTop: i > 0 ? -skew : 0, zIndex: i + 1 }}
                      >
                        <FlipImageSlot
                          images={slot.images}
                          slotIndex={i}
                          label={slot.label}
                          cardPosition={slot.cardPosition}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── CONFERENCE MOMENTS ── */}
      <ConferenceMomentsCarousel />

    </section>
  );
}