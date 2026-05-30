"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { CinematicHeroVisual } from "@/components/ui/CinematicHeroVisual";

const categoryImages = {
  solar: [
    { src: "/gifs/solar-1.gif", alt: "Solar energy" },
    { src: "/gifs/solar-2.gif", alt: "Solar panels" },
    { src: "/gifs/solar-3.gif", alt: "Solar farm" },
    { src: "/gifs/solar-4.gif", alt: "Solar farm" },
  ],

  geothermal: [
    { src: "/gifs/geo-1.gif", alt: "Geothermal energy" },
    { src: "/gifs/geo-2.gif", alt: "Hydrothermal plant" },
    { src: "/gifs/geo-3.gif", alt: "Geothermal steam" },
    { src: "/gifs/geo-4.gif", alt: "Geothermal steam" },
  ],

  mining: [
    { src: "/gifs/mining-1.gif", alt: "Mining operations" },
    { src: "/gifs/mining-2.gif", alt: "Mine site" },
    { src: "/gifs/mining-3.gif", alt: "Clean mining" },
    { src: "/gifs/mining-4.gif", alt: "Clean mining" },
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

// ─── Inject Ken Burns keyframes once, client-side only ────────────────────────
const injectSlotStyles = (() => {
  let done = false;
  return () => {
    if (done || typeof document === "undefined") return;
    done = true;
    const el = document.createElement("style");
    el.id = "__slot-styles";
    el.textContent = [
      "@keyframes kb0{0%{transform:scale(1) translate(0%,0%)}100%{transform:scale(1.09) translate(-1.6%,-1.6%)}}",
      "@keyframes kb1{0%{transform:scale(1) translate(0%,0%)}100%{transform:scale(1.09) translate( 1.6%, 1.6%)}}",
      "@keyframes kb2{0%{transform:scale(1) translate(0%,0%)}100%{transform:scale(1.09) translate( 1.6%,-1.6%)}}",
    ].join("");
    document.head.appendChild(el);
  };
})();

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



// ─── ConferenceMomentsCarousel ─────────────────────────────────────────────────
const MARQUEE_BASE_SPEED = 0.7;
const MOMENTUM_DECAY     = 0.90;
const MIN_VELOCITY       = 0.15;

function ConferenceMomentsCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const dotsRef    = useRef<HTMLDivElement>(null);

  const nudgeRef = useRef<(dir: "prev" | "next") => void>(() => {});

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const strip   = marqueeRef.current;
    const dotsCtr = dotsRef.current;
    if (!wrapper || !strip || !dotsCtr) return;

    let pos        = 0;
    let vel        = 0;
    let dragging   = false;
    let lastX      = 0;
    let lastT      = 0;
    let halfW      = 0;
    let cardW      = 0;
    let activeIdx  = 0;
    let raf: number;

    const measure = () => {
      halfW = strip.scrollWidth / 2;
      if (strip.children.length >= 2) {
        const a = strip.children[0] as HTMLElement;
        const b = strip.children[1] as HTMLElement;
        cardW = b.offsetLeft - a.offsetLeft;
      }
    };
    requestAnimationFrame(measure);

    const updateDots = (idx: number) => {
      const dots = dotsCtr.children;
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i] as HTMLElement;
        d.style.width      = i === idx ? "22px" : "6px";
        d.style.background = i === idx ? "white" : "rgba(255,255,255,0.3)";
      }
    };

    const tick = () => {
      if (!halfW) measure();
      vel = Math.abs(vel) > MIN_VELOCITY ? vel * MOMENTUM_DECAY : 0;
      if (!dragging) pos -= MARQUEE_BASE_SPEED + vel;
      if (pos <= -halfW) pos += halfW;
      if (pos > 0)       pos -= halfW;
      strip.style.transform = `translateX(${pos}px)`;
      if (cardW > 0) {
        const n   = carouselImages.length;
        const raw = Math.round((-pos + window.innerWidth / 2 - cardW / 2) / cardW);
        const idx = ((raw % n) + n) % n;
        if (idx !== activeIdx) { activeIdx = idx; updateDots(idx); }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    nudgeRef.current = (dir) => { vel = dir === "prev" ? 6 : -6; };

    const onTouchStart = (e: TouchEvent) => {
      dragging = true; lastX = e.touches[0].clientX; lastT = performance.now(); vel = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx  = e.touches[0].clientX - lastX;
      pos += dx; vel = -(dx / Math.max(now - lastT, 1)) * 16;
      lastX = e.touches[0].clientX; lastT = now;
    };
    const onTouchEnd = () => { dragging = false; };

    const onMouseDown = (e: MouseEvent) => {
      dragging = true; lastX = e.clientX; lastT = performance.now(); vel = 0;
      wrapper.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx  = e.clientX - lastX;
      pos += dx; vel = -(dx / Math.max(now - lastT, 1)) * 16;
      lastX = e.clientX; lastT = now;
    };
    const onMouseUp = () => { dragging = false; wrapper.style.cursor = "grab"; };

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

  return (
    
    <div className="relative w-full mt-10 overflow-hidden bg-[#003994]">

      <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 border-b border-white/10">
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

     <div
  ref={wrapperRef}
  className="relative pt-2 pb-1"
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

      <div ref={dotsRef} className="flex justify-center items-center gap-1.5 pb-1">
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
    <section className="relative overflow-hidden bg-white">

{/* Decorative background layer */}
<div className="absolute inset-x-0 top-0 h-[78%] z-[1] pointer-events-none overflow-hidden">

  {/* TOP LEFT */}
  <div className="absolute -top-20 -left-32">
    <div className="relative h-[700px] w-[700px] opacity-[0.08]">
      <Image
        src="/images/logo.png"
        alt="Background Logo"
        fill
        priority
        className="object-contain"
      />
    </div>
  </div>

  {/* BOTTOM RIGHT */}
  <div className="absolute bottom-10 right-[-80px]">
    <div className="relative h-[420px] w-[420px] opacity-[0.07]">
      <Image
        src="/images/bg_1.png"
        alt="Background Accent"
        fill
        className="object-contain"
      />
    </div>
  </div>

</div>
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

      {/* ── ROW 1: heading + image ── */}
      <div className="relative z-20 mx-auto max-w-[1700px] px-4 pt-4 md:px-6 lg:px-10 lg:pt-5">
        <div className="flex flex-col lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(720px,1fr)] lg:gap-14 items-start gap-8">

          {/* LEFT */}
       <div className="max-w-3xl pt-2 flex flex-col">
           <div className="order-1 inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.24em] text-[#010150] shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
              Africa × Australia · Two 2026 Conference Editions
            </div>

          <h1 className="order-2 font-heading mt-3 max-w-2xl text-[1.75rem] sm:text-[2.1rem] lg:text-[2.4rem] font-extrabold leading-[1.08] tracking-[-0.035em] text-slate-950">
  <span className="text-[#02026e]"> Clean Energy Conference</span>
</h1>
            <p className="order-5 lg:order-3 mt-3 max-w-xl text-[15px] leading-6 text-black/80">
  Kigali & Perth editions bringing together policymakers, investors, and
  industry leaders to accelerate clean energy transition and regional collaboration.
</p>

     <div className="order-3 lg:order-4 mt-5 grid grid-cols-2 gap-3">
  {editions.map((edition) => (
    <Link
      key={edition.name}
      href={edition.href}
    className={`
  group relative block rounded-xl bg-white px-4 py-2.5
  border transition-all duration-300
  hover:scale-[1.02]

  ${
    edition.name.includes("Perth")
      ? "border-emerald-200 shadow-[0_10px_28px_rgba(16,185,129,0.14)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.30)]"
      : "border-[#93a4ff] shadow-[0_10px_28px_rgba(17,64,196,0.16)] hover:shadow-[0_20px_60px_rgba(17,64,196,0.32)]"
  }
`}>
       {/* Header row */}
      <div className="flex items-center justify-between">
        <p
          className={`
            text-[10px] font-bold uppercase tracking-[0.25em]
            ${edition.accent}
          `}
        >
          {edition.name.split(" ")[0]}
        </p>

        <span className="text-[12px] text-slate-400">
          {edition.name.includes("Kigali") ? "RWA" : "AUS"}
        </span>
      </div>

      {/* Compact details */}
      <div className="mt-2 space-y-1 text-[13px] text-black/80 leading-snug">
        <div className="truncate">{edition.date}</div>
        <div className="truncate text-slate-500">{edition.venue.split(",")[0]}</div>
      </div>

      {/* Footer */}
      <div className="mt-2 flex items-center justify-between text-[12px] font-medium text-black/80">
        <span>Details</span>
        <span className="text-[#1140c4] transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </div>
    </Link>
  ))}
</div>

            
           <div className="order-4 lg:order-5 mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">

  {/* PRIMARY CTA */}
  <a
    href="/get-tickets"
    target="_blank"
    rel="noopener noreferrer"
    className="
      group relative inline-flex items-center justify-center gap-2
      rounded-full px-5 py-2.5 text-base font-semibold text-white

      bg-gradient-to-r from-[#02026e] via-[#1140c4] to-[#02026e]
      bg-[length:200%_100%] bg-left

      shadow-[0_12px_35px_rgba(2,2,110,0.35)]
      transition-all duration-500 ease-out

      hover:bg-right hover:shadow-[0_18px_60px_rgba(17,64,196,0.45)]
      hover:scale-[1.05]

      active:scale-[0.97]

      focus:outline-none focus:ring-2 focus:ring-[#1140c4]/60 focus:ring-offset-2
    "
  >
    {/* subtle light sweep */}
    <span className="absolute inset-0 overflow-hidden rounded-full">
      <span className="absolute -left-[120%] top-0 h-full w-[60%] rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover:left-[120%]" />
    </span>

    <span className="relative z-10">Register Now</span>
    <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
  </a>

 {/* SECONDARY CTA */}
  <a
    href="/event/programme"
    className="
      group relative inline-flex items-center justify-center gap-2
      rounded-full px-5 py-2.5 text-base font-semibold

      text-[#02026e]
      bg-white/70 backdrop-blur-md

      border border-[#02026e]/20
      shadow-[0_10px_30px_rgba(2,2,110,0.12)]

      transition-all duration-300

      hover:bg-white
      hover:border-[#02026e]/40
      hover:shadow-[0_14px_45px_rgba(2,2,110,0.18)]
      hover:scale-[1.04]

      active:scale-[0.98]

      focus:outline-none focus:ring-2 focus:ring-[#02026e]/40 focus:ring-offset-2
    "
  >
    View Programme
  </a>


  {/* TERTIARY CTA */}
<Link
  href="/partners/become-a-partner"
  className="
    group relative inline-flex items-center justify-center gap-2
    rounded-full px-5 py-2.5 text-base font-semibold text-[#1f1f1f]

    bg-gradient-to-r from-[#d4af00] via-[#fad202] to-[#d4af00]
    bg-[length:200%_100%] bg-left

    shadow-[0_12px_35px_rgba(250,210,2,0.30)]

    transition-all duration-500 ease-out

    hover:bg-right
    hover:shadow-[0_18px_60px_rgba(250,210,2,0.42)]
    hover:scale-[1.05]

    active:scale-[0.97]

    focus:outline-none
    focus:ring-2
    focus:ring-[#fad202]/50
    focus:ring-offset-2
  "
>
  {/* subtle light sweep */}
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span
      className="
        absolute -left-[120%] top-0
        h-full w-[60%]
        rotate-12
        bg-white/25 blur-md
        transition-all duration-700
        group-hover:left-[120%]
      "
    />
  </span>

  <span className="relative z-10">Become a Partner</span>

  <ArrowRight
    className="
      relative z-10 h-4 w-4
      transition-transform duration-300
      group-hover:translate-x-1
    "
  />
</Link>

</div>
          </div>

      <div className="relative flex justify-center lg:justify-end lg:pt-2">
 <div className="w-full max-w-[700px]">
  <CinematicHeroVisual />
</div>
</div>

        </div>
      </div>

      {/* ── CONFERENCE MOMENTS ── */}
      <div className="-mt-2 lg:-mt-6">
  <ConferenceMomentsCarousel />
</div>

    </section>
  );
}