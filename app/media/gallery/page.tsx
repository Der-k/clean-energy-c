"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Camera, Images } from "lucide-react";

type GalleryItem = {
  src: string;
  alt: string;
  category: "Conference" | "Networking" | "Exhibition" | "Speakers";
};

const galleryItems: GalleryItem[] = [
  {
    src: "/images/gallery/gallery-1.jpg",
    alt: "Conference keynote session",
    category: "Conference",
  },
  {
    src: "/images/gallery/gallery-2.jpg",
    alt: "Delegates networking",
    category: "Networking",
  },
  {
    src: "/images/gallery/gallery-3.jpg",
    alt: "Exhibition floor interaction",
    category: "Exhibition",
  },
  {
    src: "/images/gallery/gallery-4.jpg",
    alt: "Speaker panel discussion",
    category: "Speakers",
  },
  {
    src: "/images/gallery/gallery-5.jpg",
    alt: "Audience during conference session",
    category: "Conference",
  },
  {
    src: "/images/gallery/gallery-6.jpg",
    alt: "Business networking conversation",
    category: "Networking",
  },
  {
    src: "/images/gallery/gallery-7.jpg",
    alt: "Sponsor and exhibitor stand",
    category: "Exhibition",
  },
  {
    src: "/images/gallery/gallery-8.jpg",
    alt: "Featured speaker on stage",
    category: "Speakers",
  },
  {
    src: "/images/gallery/gallery-9.jpg",
    alt: "Clean energy conference audience",
    category: "Conference",
  },
  {
    src: "/images/gallery/gallery-10.jpg",
    alt: "Delegates at networking session",
    category: "Networking",
  },
  {
    src: "/images/gallery/gallery-11.jpg",
    alt: "Exhibition booth and branding",
    category: "Exhibition",
  },
  {
    src: "/images/gallery/gallery-12.jpg",
    alt: "Panel speaker session",
    category: "Speakers",
  },
];

const filters = [
  "All",
  "Conference",
  "Networking",
  "Exhibition",
  "Speakers",
  "Highlights",
] as const;
type Filter = (typeof filters)[number];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return galleryItems;
    return galleryItems.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-cyan-100/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-500">Media</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-700">Gallery & Highlights</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
  Gallery & Highlights
</p>

<h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-5xl">
  Conference gallery and highlights
</h1>

<p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
  Explore selected moments and highlights from the conference, including
  keynote sessions, networking, exhibitions, speaker appearances, and
  major event activities.
</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                  <Images className="h-4 w-4 text-blue-600" />
                  <span>{galleryItems.length} gallery images</span>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm">
                  <Camera className="h-4 w-4 text-blue-600" />
                  <span>Conference moments</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
              <div className="grid grid-cols-2 gap-2 p-2">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[18px]">
                  <Image
                    src="/images/gallery/gallery-1.jpg"
                    alt="Conference keynote session"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="grid gap-2">
                  <div className="relative aspect-[4/2.45] overflow-hidden rounded-[18px]">
                    <Image
                      src="/images/gallery/gallery-2.jpg"
                      alt="Delegates networking"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-[4/2.45] overflow-hidden rounded-[18px]">
                    <Image
                      src="/images/gallery/gallery-3.jpg"
                      alt="Exhibition floor"
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    : "border border-blue-100 bg-white text-slate-700 hover:bg-blue-50"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:pb-20">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item, index) => (
            <article
              key={`${item.src}-${index}`}
              className="group overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-4">
                <div className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                  {item.category}
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">{item.alt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}