"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

// TODO: rename the actual files in /public/images to match these paths
// exactly (case-sensitive), or update the paths below to match your files.
// Filenames + alt text are written as descriptive, keyword-rich SEO strings
// rather than generic "hero-carousel-N" names.
// Images stay grouped by category (for the on-card label) but all live in
// one single carousel — no tabs, no filtering.
const galleryImages: { src: string; alt: string; category: string }[] = [
  {
    src: "/images/energy-conference-delegates-networking.jpg",
    alt: "Energy conference delegates networking between sessions",
    category: "Delegates",
  },
  {
    src: "/images/energy-summit-delegates-networking-event.jpg",
    alt: "Delegates connecting at the energy summit networking event",
    category: "Delegates",
  },
  {
    src: "/images/conference-delegates-group-discussion.jpg",
    alt: "Conference delegates in a group discussion",
    category: "Delegates",
  },
  {
    src: "/images/delegates-registration-desk-check-in.jpg",
    alt: "Delegates checking in at the conference registration desk",
    category: "Delegates",
  },
  {
    src: "/images/energy-conference-panel-session-speakers.jpg",
    alt: "Industry speakers on a panel session at the energy conference",
    category: "Speakers",
  },
  {
    src: "/images/keynote-speaker-presentation-energy-summit.jpg",
    alt: "Keynote speaker presenting at the energy summit",
    category: "Speakers",
  },
  {
    src: "/images/keynote-speaker-on-stage-conference-hall.jpg",
    alt: "Keynote speaker addressing delegates from the conference stage",
    category: "Speakers",
  },
  {
    src: "/images/conference-speaker-audience-qa-session.jpg",
    alt: "Conference speaker taking audience questions in a Q&A session",
    category: "Speakers",
  },
  {
    src: "/images/conference-audience-keynote-address.jpg",
    alt: "Conference audience listening to a keynote address",
    category: "Conference",
  },
  {
    src: "/images/energy-conference-exhibition-area.jpg",
    alt: "Exhibition area at the energy conference showcasing industry partners",
    category: "Conference",
  },
  {
    src: "/images/energy-conference-hall-main-venue.jpg",
    alt: "Main conference hall during the energy industry gathering",
    category: "Conference",
  },
  {
    src: "/images/conference-registration-desk-welcome.jpg",
    alt: "Welcome and registration desk at the energy conference",
    category: "Conference",
  },
  {
    src: "/images/energy-industry-panel-discussion-highlight.jpg",
    alt: "Highlight moment from an energy industry panel discussion",
    category: "Highlights",
  },
  {
    src: "/images/energy-conference-highlight-moment.jpg",
    alt: "Memorable highlight moment from the energy conference",
    category: "Highlights",
  },
  {
    src: "/images/conference-award-ceremony-moment.jpg",
    alt: "Award ceremony moment at the energy conference",
    category: "Highlights",
  },
  {
    src: "/images/energy-summit-closing-ceremony.jpg",
    alt: "Closing ceremony at the energy summit",
    category: "Highlights",
  },
];

// Leads the loop — sits first in the set, then cycles back around like any
// other card once the marquee wraps.
const introImage = {
  src: "/images/energy-conference-welcome-intro.jpg",
  alt: "Welcome to the energy conference — opening highlight reel",
  category: "Intro",
};

// One single set: intro card first, then every gallery image, grouped by
// category. Still just one carousel — no tabs, no filtering.
const images = [introImage, ...galleryImages];

const MARQUEE_BASE_SPEED = 0.7;
const MOMENTUM_DECAY = 0.9;
const MIN_VELOCITY = 0.15;

export function ProgrammeCtaSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const nudgeRef = useRef<(dir: "prev" | "next") => void>(() => {});

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const strip = marqueeRef.current;
    const dotsCtr = dotsRef.current;
    if (!wrapper || !strip || !dotsCtr) return;

    let pos = 0;
    let vel = 0;
    let dragging = false;
    let lastX = 0;
    let lastT = 0;
    let halfW = 0;
    let cardW = 0;
    let activeIdx = 0;
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
        d.style.width = i === idx ? "22px" : "6px";
        d.style.background = i === idx ? "white" : "rgba(255,255,255,0.3)";
      }
    };

    // Keeps pos inside (-halfW, 0] no matter how large a single jump was —
    // a single conditional +=/-= step isn't enough for fast drags/flicks.
    const wrap = () => {
      if (!halfW) return;
      pos = ((pos % halfW) + halfW) % halfW;
      if (pos > 0) pos -= halfW;
    };

    const tick = () => {
      if (!halfW) measure();
      vel = Math.abs(vel) > MIN_VELOCITY ? vel * MOMENTUM_DECAY : 0;
      if (!dragging) pos -= MARQUEE_BASE_SPEED + vel;
      wrap();
      strip.style.transform = `translateX(${pos}px)`;
      if (cardW > 0) {
        const n = images.length;
        const raw = Math.round((-pos + window.innerWidth / 2 - cardW / 2) / cardW);
        const idx = ((raw % n) + n) % n;
        if (idx !== activeIdx) {
          activeIdx = idx;
          updateDots(idx);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    nudgeRef.current = (dir) => {
      vel = dir === "prev" ? 6 : -6;
    };

    const onTouchStart = (e: TouchEvent) => {
      dragging = true;
      lastX = e.touches[0].clientX;
      lastT = performance.now();
      vel = 0;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.touches[0].clientX - lastX;
      pos += dx;
      wrap();
      vel = -(dx / Math.max(now - lastT, 1)) * 16;
      lastX = e.touches[0].clientX;
      lastT = now;
    };
    const onTouchEnd = () => {
      dragging = false;
    };

    const onMouseDown = (e: MouseEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastT = performance.now();
      vel = 0;
      wrapper.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      pos += dx;
      wrap();
      vel = -(dx / Math.max(now - lastT, 1)) * 16;
      lastX = e.clientX;
      lastT = now;
    };
    const onMouseUp = () => {
      dragging = false;
      wrapper.style.cursor = "grab";
    };

    wrapper.addEventListener("touchstart", onTouchStart, { passive: true });
    wrapper.addEventListener("touchmove", onTouchMove, { passive: true });
    wrapper.addEventListener("touchend", onTouchEnd, { passive: true });
    wrapper.addEventListener("touchcancel", onTouchEnd, { passive: true });
    wrapper.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener("touchstart", onTouchStart);
      wrapper.removeEventListener("touchmove", onTouchMove);
      wrapper.removeEventListener("touchend", onTouchEnd);
      wrapper.removeEventListener("touchcancel", onTouchEnd);
      wrapper.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <section className="bg-[#020266]">
      <div className="relative w-full overflow-hidden">
        {/* Header row */}
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

        {/* Marquee carousel — every image, one continuous loop */}
        <div ref={wrapperRef} className="relative pt-2 pb-1">
          <div className="overflow-hidden">
            <div
              ref={marqueeRef}
              className="flex w-max will-change-transform"
              style={{ gap: "clamp(10px, 1.5vw, 16px)", paddingLeft: 16, paddingRight: 16 }}
            >
              {[...images, ...images].map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative shrink-0 overflow-hidden rounded-2xl bg-[#050533]"
                  style={{ width: "clamp(400px, 55vw, 780px)", height: "clamp(267px, 36.7vw, 520px)" }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 780px"
                    className="object-contain pointer-events-none"
                    draggable={false}
                    priority={index < 3}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm text-[9px] font-semibold text-white/90 tracking-widest uppercase pointer-events-none">
                    {image.category}
                  </span>
                  <span className="absolute bottom-2.5 left-3.5 text-[10px] font-semibold text-white/75 tracking-widest uppercase pointer-events-none">
                    {image.alt}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 w-14 sm:w-20 bg-gradient-to-r from-[#020266] to-transparent z-10" />
          <button
            onClick={() => nudgeRef.current("prev")}
            aria-label="Previous"
            className="pointer-events-auto absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20
              hidden sm:flex h-11 w-11 items-center justify-center rounded-full
              bg-white text-[#020266] shadow-[0_4px_20px_rgba(0,0,0,0.4)]
              transition-all duration-150 active:scale-90 hover:scale-110 touch-manipulation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="pointer-events-none absolute inset-y-0 right-0 w-14 sm:w-20 bg-gradient-to-l from-[#020266] to-transparent z-10" />
          <button
            onClick={() => nudgeRef.current("next")}
            aria-label="Next"
            className="pointer-events-auto absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20
              hidden sm:flex h-11 w-11 items-center justify-center rounded-full
              bg-white text-[#020266] shadow-[0_4px_20px_rgba(0,0,0,0.4)]
              transition-all duration-150 active:scale-90 hover:scale-110 touch-manipulation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div ref={dotsRef} className="flex justify-center items-center gap-1.5 pb-1 flex-wrap px-4">
          {images.map((_, i) => (
            <button
              key={`dot-${i}`}
              aria-label={`Image ${i + 1}`}
              className="touch-manipulation"
              style={{
                width: i === 0 ? "22px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background: i === 0 ? "white" : "rgba(255,255,255,0.3)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                flexShrink: 0,
                transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), background 0.25s ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}