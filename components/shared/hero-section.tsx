"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

const carouselImages = [
  { src: "/images/hero-carousel-1.jpg", alt: "Delegates networking" },
  { src: "/images/hero-carousel-2.jpg", alt: "Panel session" },
  { src: "/images/hero-carousel-3.jpg", alt: "Audience keynote" },
  { src: "/images/hero-carousel-4.jpg", alt: "Exhibition area" },
  { src: "/images/hero-carousel-5.jpg", alt: "Speaker presentation" },
  { src: "/images/hero-carousel-6.jpg", alt: "Networking event" },
  { src: "/images/hero-carousel-7.jpg", alt: "Conference hall" },
  { src: "/images/hero-carousel-8.jpg", alt: "Energy discussion" },
];

const editions = [
  {
    name: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    accent: "text-blue-600",
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

const stats = [
  { value: "2", label: "2026 editions" },
  { value: "600+", label: "Delegates targeted" },
  { value: "5000+", label: "Past participants" },
];

export function HeroSection() {
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const currentOffsetRef = useRef(0);
  const targetOffsetRef = useRef(0);
  const [imageOffset, setImageOffset] = useState(0);

  useEffect(() => {
    const updateTarget = () => {
      const el = imageWrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      const nextTarget = Math.max(Math.min(distanceFromCenter * 0.28, 180), -180);
      targetOffsetRef.current = nextTarget;
    };

    const animate = () => {
      currentOffsetRef.current +=
        (targetOffsetRef.current - currentOffsetRef.current) * 0.08;
      setImageOffset(currentOffsetRef.current);
      frameRef.current = window.requestAnimationFrame(animate);
    };

    updateTarget();
    frameRef.current = window.requestAnimationFrame(animate);
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white min-h-[calc(100vh-96px)]">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,white_62%,#f8fafc_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-slate-200" />

      {/* ── ROW 1: heading + image ── */}
      <div className="relative mx-auto max-w-7xl px-4 pt-6 md:px-6 lg:pt-8">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-10">

          {/* LEFT: heading, description, buttons, edition cards */}
          <div className="max-w-3xl pt-2">
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-blue-700 shadow-[0_6px_18px_rgba(15,23,42,0.05)]">
              Africa × Australia · Two 2026 Conference Editions
            </div>

            <h1 className="font-heading mt-4 max-w-4xl text-4xl font-extrabold leading-[0.96] tracking-[-0.045em] text-[color:var(--text-main)]-950 sm:text-[3.25rem] lg:text-[3.8rem]">
              Driving the Future of
              <span className="mt-2 block text-blue-600">Clean Energy</span>
             
            </h1>

            <p className="mt-4 max-w-2xl text-[17px] leading-7 text-[color:var(--text-main)]-700 sm:text-lg">
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
                href="/documents/clean-energy-conference-programme-2026.pdf"
                className="btn-outline-glow inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
              >
                View Programme
              </a>
              <Link
                href="/partners/become-a-partner"
                className="btn-outline-glow inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
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
                  <div className="mt-4 space-y-3 text-sm text-[color:var(--text-main)]-700">
                    <div className="flex items-start gap-2.5">
                      <CalendarDays className="mt-0.5 h-4 w-4 text-blue-600" />
                      <span>{edition.date}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 text-blue-600" />
                      <span>{edition.venue}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm font-medium text-[color:var(--text-main)]-700">
                    <span>View details</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT: parallax image with floating cards */}
          <div className="relative lg:pt-2">
            <div className="relative">
              <div
                ref={imageWrapRef}
                className="relative overflow-hidden rounded-[32px] border border-slate-200 shadow-[0_30px_90px_rgba(15,23,42,0.18)]"
              >
                <div className="relative aspect-[4/4.7] w-full overflow-hidden">
                  <div
                    className="absolute inset-0 will-change-transform"
                    style={{ transform: `translate3d(0, ${imageOffset}px, 0) scale(1.22)` }}
                  >
                    <Image
                      src="/images/S-energy.png"
                      alt="Clean Energy Conference Africa Australia"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Kigali floating card */}
              <div className="hover-glow-card-strong absolute -left-2 top-8 hidden w-48 rounded-[8px] border border-slate-200 bg-white p-1 shadow-[0_10px_24px_rgba(15,23,42,0.1)] xl:block">
                <p className="floating-card-label text-blue-600">Kigali Edition</p>
                <p className="floating-card-body">
                  East Africa energy, climate finance & regional partnerships.
                </p>
              </div>

              {/* Perth floating card */}
              <div className="hover-glow-card-strong absolute -right-2 bottom-8 hidden w-52 rounded-[8px] border border-slate-200 bg-white p-1 shadow-[0_10px_24px_rgba(15,23,42,0.1)] xl:block">
                <p className="floating-card-label text-emerald-600">Perth Edition</p>
                <p className="floating-card-body">
                  Capital markets, clean tech, hydrogen & investment at scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>{/* ── end row 1 container ── */}

      {/* ── CONFERENCE MOMENTS — true full-width, right after edition cards ── */}
      <div className="relative w-full mt-10 overflow-hidden bg-[#003994]">
        {/* Label bar */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/60">
              Conference Moments
            </span>
            <span className="h-px w-8 bg-white/20" />
            <span className="hidden sm:block text-[10px] text-white/40">
              Highlights from previous editions and industry gatherings
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Live 2026</span>
          </div>
        </div>

        {/* Cinematic marquee */}
        <div className="relative">
          <div
            id="moments-track"
            className="flex gap-0 overflow-x-auto"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="hero-marquee-slow flex w-max gap-0">
              {[...carouselImages, ...carouselImages].map((image, index) => (
                <div
                  key={`${image.src}-${index}`}
                  className="relative h-[220px] w-[340px] shrink-0 overflow-hidden sm:h-[280px] sm:w-[420px] lg:h-[340px] lg:w-[520px]"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 520px"
                    className="object-cover brightness-90"
                  />
                  <div className="absolute inset-y-0 right-0 w-4 bg-gradient-to-r from-transparent to-[#003994]/60" />
                </div>
              ))}
            </div>
          </div>

          {/* Left fade + arrow */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#003994] to-transparent" />
          <button
            onClick={() => {
              const el = document.getElementById("moments-track");
              if (el) el.scrollBy({ left: -520, behavior: "smooth" });
            }}
            className="pointer-events-auto absolute left-8 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#003994] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition hover:scale-110 hover:shadow-[0_6px_28px_rgba(0,0,0,0.4)]"
            aria-label="Scroll left"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right fade + arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-[#003994] to-transparent" />
          <button
            onClick={() => {
              const el = document.getElementById("moments-track");
              if (el) el.scrollBy({ left: 520, behavior: "smooth" });
            }}
            className="pointer-events-auto absolute right-8 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#003994] shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition hover:scale-110 hover:shadow-[0_6px_28px_rgba(0,0,0,0.4)]"
            aria-label="Scroll right"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      
    </section>
  );
}