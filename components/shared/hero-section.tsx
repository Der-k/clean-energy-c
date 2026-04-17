"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

// Images grouped by category — add/remove files freely within each group
const categoryImages = {
  solar: [
    { src: "/images/solar-1.png", alt: "Solar energy" },
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

const FLIP_INTERVAL = 10000; // ms between flips per slot
const FLIP_HALF = 180;       // half the flip animation duration
const SLOT_STAGGER = 3000;   // ms between each slot firing

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
type FlipPhase = "idle" | "fold-out" | "fold-in";

function FlipImageSlot({
  images,
  slotIndex,
  label,
}: {
  images: { src: string; alt: string }[];
  slotIndex: number;
  label: string;
}) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState<FlipPhase>("idle");

  const doFlip = useCallback(() => {
    setPhase("fold-out");
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
      setPhase("fold-in");
    }, FLIP_HALF);
    setTimeout(() => setPhase("idle"), FLIP_HALF * 2);
  }, [images.length]);

  useEffect(() => {
    registerSlot(slotIndex, doFlip);
  }, [slotIndex, doFlip]);

  useEffect(() => {
    if (slotIndex !== 0) return; // slot 0 drives the master clock

    const masterTick = () => {
      slotCallbacks.forEach((cb, i) => {
        setTimeout(() => cb?.(), i * SLOT_STAGGER);
      });
    };

    const initial = setTimeout(() => {
      masterTick();
      const interval = setInterval(masterTick, FLIP_INTERVAL);
      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(initial);
  }, [slotIndex]);

  const currentImage = images[currentIdx];

  const panelStyle = (): React.CSSProperties => {
    if (phase === "fold-out")
      return {
        transform: "perspective(900px) rotateX(-90deg)",
        transition: `transform ${FLIP_HALF}ms cubic-bezier(0.4,0,1,1)`,
      };
    if (phase === "fold-in")
      return {
        transform: "perspective(900px) rotateX(0deg)",
        transition: `transform ${FLIP_HALF}ms cubic-bezier(0,0,0.6,1)`,
      };
    return { transform: "perspective(900px) rotateX(0deg)", transition: "none" };
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Category label */}
      <div className="absolute top-2 left-3 z-20">
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-white/70 drop-shadow-sm">
          {label}
        </span>
      </div>

      {/* Image — fills the entire slot with cover */}
      <div
        className="absolute inset-0"
        style={{ transformOrigin: "top center", ...panelStyle() }}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
      </div>

      {/* Crease shimmer */}
      {phase !== "idle" && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] z-10"
          style={{
            background:
              "linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.5) 50%,transparent 100%)",
          }}
        />
      )}
    </div>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────
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
      const nextTarget = Math.max(Math.min(distanceFromCenter * 0.28, 60), -60);
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

  const slots = [
    { images: categoryImages.solar, label: "Solar" },
    { images: categoryImages.geothermal, label: "Geothermal & Hydrothermal" },
    { images: categoryImages.mining, label: "Mining" },
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

            <h1 className="font-heading mt-4 max-w-4xl text-4xl font-extrabold leading-[0.96] tracking-[-0.045em] text-[color:var(--text-main)]-950 sm:text-[3.25rem] lg:text-[3.8rem]">
              Driving the Future of
              <span className="mt-2 block text-[#02026e]">Clean Energy</span>
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
                href="/event/programme"
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
                      <CalendarDays className="mt-0.5 h-4 w-4 text-[#02026e]" />
                      <span>{edition.date}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 text-[#02026e]" />
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

          {/* RIGHT: 3 stacked category slots */}
          <div className="relative lg:pt-2">
            <div className="relative">
              <div
                ref={imageWrapRef}
                className="relative rounded-[32px] border border-slate-200 shadow-[0_30px_90px_rgba(15,23,42,0.18)] overflow-hidden"
              >
                <div
                  className="absolute inset-0 will-change-transform"
                  style={{ transform: `translate3d(0, ${imageOffset}px, 0) scale(1.08)` }}
                >
                  <div className="flex flex-col" style={{ aspectRatio: "4 / 5.2" }}>
                    {slots.map((slot, i) => (
                      <div key={i} className="relative flex-1 w-full">
                        <FlipImageSlot
                          images={slot.images}
                          slotIndex={i}
                          label={slot.label}
                        />
                        {i < 2 && (
                          <div className="absolute inset-x-0 bottom-0 h-[2px] z-20 bg-white/20" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="aspect-[4/5.2] w-full" />
              </div>

              {/* Kigali floating card */}
              <div className="hover-glow-card-strong absolute -left-2 top-8 hidden w-48 rounded-[8px] border border-slate-200 bg-white p-1 shadow-[0_10px_24px_rgba(15,23,42,0.1)] xl:block">
                <p className="floating-card-label text-[#02026e]">Kigali Edition</p>
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
      </div>

      {/* ── CONFERENCE MOMENTS ── */}
      <div className="relative w-full mt-10 overflow-hidden bg-[#003994]">
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