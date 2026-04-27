"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Camera, Images, X, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
  category: "Conference" | "Networking" | "Exhibition" | "Speakers";
};

const galleryItems: GalleryItem[] = [
  // Conference
  { src: "/images/gallery/gallery-1.jpg", alt: "Conference opening session", category: "Conference" },
  { src: "/images/gallery/gallery-3.jpg", alt: "Conference exhibition display", category: "Conference" },
  { src: "/images/gallery/gallery-4.jpg", alt: "Conference audience session", category: "Conference" },
  { src: "/images/gallery/gallery-5.jpeg", alt: "Conference discussion session", category: "Conference" },
  { src: "/images/gallery/gallery-10.jpg", alt: "Conference delegates", category: "Conference" },


  // Networking
  { src: "/images/gallery/gallery-2.jpg", alt: "Delegates networking", category: "Networking" },
  { src: "/images/gallery/gallery-11.jpg", alt: "Delegates meeting at the conference", category: "Networking" },
  { src: "/images/gallery/gallery-11.jpeg", alt: "Networking and partner engagement", category: "Networking" },
  { src: "/images/gallery/hero-carousel-1.jpeg", alt: "Delegates networking", category: "Networking" },
  { src: "/images/gallery/hero-carousel-2.jpeg", alt: "Conference delegates in discussion", category: "Networking" },
  { src: "/images/gallery/hero-carousel-3.jpeg", alt: "Roundtable discussion", category: "Networking" },
  { src: "/images/gallery/hero-carousel-4.jpeg", alt: "Delegates seated during session", category: "Networking" },
  { src: "/images/gallery/hero-carousel-7.jpeg", alt: "Conference networking room", category: "Networking" },
  { src: "/images/gallery/hero-carousel-8.jpeg", alt: "Audience networking session", category: "Networking" },
  { src: "/images/gallery/hero-carousel-10.jpeg", alt: "Panel discussion and audience", category: "Networking" },

  // Exhibition
  { src: "/images/gallery/gallery-7.jpg", alt: "Exhibition booth and branding", category: "Exhibition" },
 
  { src: "/images/gallery/gallery-13.jpg", alt: "Exhibition stand", category: "Exhibition" },
  { src: "/images/gallery/hero-carousel-16.jpeg", alt: "Exhibition and event branding", category: "Exhibition" },

  // Speakers
  { src: "/images/gallery/hero-carousel-5.jpeg", alt: "Speaker at conference table", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-6.jpeg", alt: "Speaker presentation", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-9.jpg", alt: "Speaker addressing delegates", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-9 (2).jpeg", alt: "Speaker session", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-9 (3).jpeg", alt: "Speaker presentation session", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-9 (5).jpeg", alt: "Speaker keynote session", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-10.jpg", alt: "Speaker on stage", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-11.jpg", alt: "Speaker at podium", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-12.jpg", alt: "Panel speakers on stage", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-13.jpeg", alt: "Speaker presentation", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-14.jpeg", alt: "Award presentation", category: "Speakers" },
  { src: "/images/gallery/hero-carousel-15.jpeg", alt: "Speaker at podium", category: "Speakers" },
];

const filters = ["All", "Conference", "Networking", "Exhibition", "Speakers", "Highlights"] as const;
type Filter = (typeof filters)[number];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, showPrev, showNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <main className="pt-24 bg-white">
      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div
            className="relative mx-16 max-h-[90vh] max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[85vh] w-full overflow-hidden rounded-xl">
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].alt}
                fill
                sizes="(max-width: 1280px) 90vw, 1024px"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption + counter */}
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {filteredItems[lightboxIndex].category}
              </span>
              <span className="text-xs text-white/60">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>

          {/* Next */}
          <button
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition hover:bg-white/20"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            aria-label="Next image"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-blue-500/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-blue-50/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-blue-50/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-500">Media</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Gallery & Highlights</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
                Gallery & Highlights
              </p>
              <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
                Conference gallery and highlights
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
                Explore selected moments and highlights from the conference, including keynote sessions, networking, exhibitions, speaker appearances, and major event activities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white px-4 py-2 text-sm text-[color:var(--text-main)]-700 shadow-sm">
                  <Images className="h-4 w-4 text-[#02026e]" />
                  <span>{galleryItems.length} gallery images</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white px-4 py-2 text-sm text-[color:var(--text-main)]-700 shadow-sm">
                  <Camera className="h-4 w-4 text-[#02026e]" />
                  <span>Conference moments</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-blue-500/20 bg-white shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
                  <Image src="/images/gallery/hero-carousel-4.jpeg" alt="Conference keynote session" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" priority />
                </div>
                <div className="grid gap-2">
                  <div className="relative aspect-[4/2.45] overflow-hidden rounded-[18px]">
                    <Image src="/images/gallery/hero-carousel-1.jpeg" alt="Delegates networking" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                  </div>
                  <div className="relative aspect-[4/2.45] overflow-hidden rounded-[18px]">
                    <Image src="/images/gallery/hero-carousel-3.jpeg" alt="Exhibition floor" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters ── */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)]"
                    : "border border-blue-500/20 bg-white text-[color:var(--text-main)]-700 hover:bg-blue-50"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <article
              key={`${item.src}-${index}`}
              className="group cursor-pointer overflow-hidden rounded-[22px] border border-blue-500/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)]"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                {/* Category badge overlaid on image */}
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#02026e] backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}