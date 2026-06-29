"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";



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

const MARQUEE_BASE_SPEED = 0.7;
const MOMENTUM_DECAY     = 0.90;
const MIN_VELOCITY       = 0.15;

export function ProgrammeCtaSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const dotsRef    = useRef<HTMLDivElement>(null);
  const nudgeRef   = useRef<(dir: "prev" | "next") => void>(() => {});

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const strip   = marqueeRef.current;
    const dotsCtr = dotsRef.current;
    if (!wrapper || !strip || !dotsCtr) return;

    let pos       = 0;
    let vel       = 0;
    let dragging  = false;
    let lastX     = 0;
    let lastT     = 0;
    let halfW     = 0;
    let cardW     = 0;
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
    <section className="bg-[#020266]">
      {/* CAROUSEL */}
      <div className="relative w-full overflow-hidden">
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

        <div ref={wrapperRef} className="relative pt-2 pb-1">
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
                  style={{ width: "clamp(400px, 55vw, 780px)", height: "clamp(267px, 36.7vw, 520px)" }}
                >
                  <Image
                    src={image.src} alt={image.alt} fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 780px"
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

    
    </section>
  );
}