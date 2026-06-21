"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

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

const editions = [
  {
    name: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    accent: "text-[#02026e]",
    border: "border-[#93a4ff] shadow-[0_8px_24px_rgba(17,64,196,0.13)]",
    href: "/conference?edition=kigali",
    flag: "RWA",
  },
  {
    name: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    accent: "text-emerald-600",
    border: "border-emerald-200 shadow-[0_8px_24px_rgba(16,185,129,0.13)]",
    href: "/conference?edition=perth",
    flag: "AUS",
  },
];

// ─── Mobile Carousel ──────────────────────────────────────────────────────────
function MobileCarousel() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = marqueeRef.current;
    if (!strip) return;

    let pos = 0;
    let raf: number;
    const SPEED = 0.6;

    const tick = () => {
      pos -= SPEED;
      const halfW = strip.scrollWidth / 2;
      if (pos <= -halfW) pos += halfW;
      strip.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full overflow-hidden bg-[#020266]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
          Conference Moments
        </span>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/50 uppercase tracking-widest">Live 2026</span>
        </div>
      </div>

      {/* Strip */}
      <div className="overflow-hidden py-2">
        <div
          ref={marqueeRef}
          className="flex w-max"
          style={{ gap: "10px", paddingLeft: 12, paddingRight: 12 }}
        >
          {[...carouselImages, ...carouselImages].map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="relative shrink-0 overflow-hidden rounded-xl"
              style={{ width: "240px", height: "160px" }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover pointer-events-none"
                draggable={false}
                priority={index < 3}
              />
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/55 to-transparent" />
              <span className="absolute bottom-2 left-3 text-[9px] font-semibold text-white/75 tracking-widest uppercase">
                {image.alt}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-[#020266] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#020266] to-transparent z-10" />
    </div>
  );
}

// ─── HeroSectionMobile ────────────────────────────────────────────────────────
export function HeroSectionMobile() {
  return (
    <section className="relative bg-white overflow-hidden">

      {/* Faint background logo */}
      <div className="absolute -top-10 -left-16 pointer-events-none z-0">
        <div className="relative h-[320px] w-[320px] opacity-[0.06]">
          <Image src="/images/logo.png" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="relative z-10 px-5 pt-6 pb-4 flex flex-col gap-5">

        {/* Badge */}
        <div className="inline-flex self-start items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-[#010150] shadow-sm">
          Africa × Australia · 2026
        </div>

        {/* Headline */}
        <div>
          <h1 className="font-heading text-[2.2rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#02026e]">
            Clean Energy Conference
          </h1>
          <p className="mt-3 text-[15px] leading-[1.65] text-black/75">
            Kigali & Perth editions bringing together policymakers, investors, and industry leaders
            to accelerate clean energy transition.
          </p>
        </div>

        {/* Edition cards */}
        <div className="grid grid-cols-2 gap-3">
          {editions.map((edition) => (
            <Link
              key={edition.name}
              href={edition.href}
              className={`group block rounded-2xl bg-white border px-4 py-3.5 transition-all duration-200 active:scale-[0.98] ${edition.border}`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className={`text-[11px] font-bold uppercase tracking-[0.22em] ${edition.accent}`}>
                  {edition.name.split(" ")[0]}
                </p>
                <span className="text-[11px] text-slate-400 font-medium">{edition.flag}</span>
              </div>
              <p className="text-[13px] font-semibold text-slate-800 leading-snug">{edition.date}</p>
              <p className="text-[12px] text-slate-500 mt-0.5 truncate">{edition.venue.split(",")[0]}</p>
              <div className="mt-2.5 flex items-center justify-between text-[12px] font-medium text-slate-600">
                <span>Details</span>
                <span className="text-[#1140c4] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <a
            href="/get-tickets"
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative inline-flex items-center justify-center gap-2
              w-full rounded-full px-6 py-3.5 text-[15px] font-semibold text-white
              bg-gradient-to-r from-[#02026e] via-[#1140c4] to-[#02026e]
              bg-[length:200%_100%] bg-left
              shadow-[0_10px_30px_rgba(2,2,110,0.32)]
              active:scale-[0.97] transition-all duration-300
            "
          >
            Register Now
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="/event/programme"
            className="
              inline-flex items-center justify-center gap-2
              w-full rounded-full px-6 py-3.5 text-[15px] font-semibold
              text-[#02026e] bg-white border border-[#02026e]/25
              shadow-[0_6px_20px_rgba(2,2,110,0.10)]
              active:scale-[0.97] transition-all duration-300
            "
          >
            View Programme
          </a>

          <Link
            href="/partners/become-a-partner"
            className="
              relative inline-flex items-center justify-center gap-2
              w-full rounded-full px-6 py-3.5 text-[15px] font-semibold text-[#1f1f1f]
              bg-gradient-to-r from-[#d4af00] via-[#fad202] to-[#d4af00]
              shadow-[0_10px_28px_rgba(250,210,2,0.28)]
              active:scale-[0.97] transition-all duration-300
            "
          >
            Become a Partner
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>

      {/* Carousel */}
      <MobileCarousel />

    </section>
  );
}