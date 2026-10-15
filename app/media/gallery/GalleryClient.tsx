"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

type Category = "Conference" | "Networking" | "Exhibition" | "Speakers" | "Moments";

export type EventName = "Kigali" | "Perth";

export type GalleryItem = {
  src: string;
  alt: string;
  category: Category;
  event: EventName;
};

type Item = Omit<GalleryItem, "event">;

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, offset) => String(start + offset).padStart(3, "0"));

const galleryPaths = (
  day: "DAY1" | "DAY2",
  imageType: string,
  numbers: string[],
  category: Category,
  alt: string,
): Item[] =>
  numbers.map((number) => ({
    src: `/images/gallery/${day}/clean-energy-conference-${imageType}-${number}.jpg`,
    alt,
    category,
  }));

// Near-duplicate photos removed (folder-relative paths). Every group keeps one photo.
const removedFiles = new Set<string>([
  "DAY1/clean-energy-conference-audience-002.jpg",
  "DAY1/clean-energy-conference-audience-007.jpg",
  "DAY1/clean-energy-conference-audience-008.jpg",
  "DAY1/clean-energy-conference-audience-009.jpg",
  "DAY1/clean-energy-conference-audience-010.jpg",
  "DAY1/clean-energy-conference-audience-011.jpg",
  "DAY1/clean-energy-conference-audience-013.jpg",
  "DAY1/clean-energy-conference-audience-014.jpg",
  "DAY1/clean-energy-conference-audience-016.jpg",
  "DAY1/clean-energy-conference-audience-018.jpg",
  "DAY1/clean-energy-conference-audience-019.jpg",
  "DAY1/clean-energy-conference-audience-020.jpg",
  "DAY1/clean-energy-conference-audience-021.jpg",
  "DAY1/clean-energy-conference-audience-022.jpg",
  "DAY1/clean-energy-conference-audience-023.jpg",
  "DAY1/clean-energy-conference-audience-024.jpg",
  "DAY1/clean-energy-conference-audience-025.jpg",
  "DAY1/clean-energy-conference-audience-026.jpg",
  "DAY1/clean-energy-conference-audience-027.jpg",
  "DAY1/clean-energy-conference-audience-028.jpg",
  "DAY1/clean-energy-conference-audience-029.jpg",
  "DAY1/clean-energy-conference-audience-030.jpg",
  "DAY1/clean-energy-conference-audience-031.jpg",
  "DAY1/clean-energy-conference-audience-032.jpg",
  "DAY1/clean-energy-conference-audience-034.jpg",
  "DAY1/clean-energy-conference-audience-035.jpg",
  "DAY1/clean-energy-conference-audience-037.jpg",
  "DAY1/clean-energy-conference-audience-038.jpg",
  "DAY1/clean-energy-conference-exhibition-002.jpg",
  "DAY1/clean-energy-conference-exhibition-003.jpg",
  "DAY1/clean-energy-conference-exhibition-005.jpg",
  "DAY1/clean-energy-conference-exhibition-006.jpg",
  "DAY1/clean-energy-conference-exhibition-007.jpg",
  "DAY1/clean-energy-conference-exhibition-009.jpg",
  "DAY1/clean-energy-conference-exhibition-011.jpg",
  "DAY1/clean-energy-conference-exhibition-012.jpg",
  "DAY1/clean-energy-conference-exhibition-017.jpg",
  "DAY1/clean-energy-conference-group-photo-001.jpg",
  "DAY1/clean-energy-conference-group-photo-002.jpeg",
  "DAY1/clean-energy-conference-group-photo-003.jpg",
  "DAY1/clean-energy-conference-group-photo-005.jpg",
  "DAY1/clean-energy-conference-group-photo-006.jpg",
  "DAY1/clean-energy-conference-group-photo-007.jpg",
  "DAY1/clean-energy-conference-group-photo-008.jpg",
  "DAY1/clean-energy-conference-keynote-001.jpg",
  "DAY1/clean-energy-conference-keynote-002.jpg",
  "DAY1/clean-energy-conference-keynote-003.jpg",
  "DAY1/clean-energy-conference-keynote-004.jpg",
  "DAY1/clean-energy-conference-keynote-005.jpg",
  "DAY1/clean-energy-conference-keynote-006.jpg",
  "DAY1/clean-energy-conference-keynote-007.jpg",
  "DAY1/clean-energy-conference-keynote-008.jpg",
  "DAY1/clean-energy-conference-keynote-009.jpg",
  "DAY1/clean-energy-conference-keynote-011.jpg",
  "DAY1/clean-energy-conference-keynote-012.jpg",
  "DAY1/clean-energy-conference-keynote-014.jpg",
  "DAY1/clean-energy-conference-keynote-016.jpg",
  "DAY1/clean-energy-conference-keynote-017.jpg",
  "DAY1/clean-energy-conference-keynote-018.jpg",
  "DAY1/clean-energy-conference-keynote-019.jpg",
  "DAY1/clean-energy-conference-keynote-020.jpg",
  "DAY1/clean-energy-conference-keynote-021.jpg",
  "DAY1/clean-energy-conference-keynote-022.jpg",
  "DAY1/clean-energy-conference-keynote-023.jpg",
  "DAY1/clean-energy-conference-keynote-024.jpg",
  "DAY1/clean-energy-conference-keynote-025.jpg",
  "DAY1/clean-energy-conference-networking-004.jpg",
  "DAY1/clean-energy-conference-networking-006.jpg",
  "DAY1/clean-energy-conference-networking-007.jpg",
  "DAY1/clean-energy-conference-networking-010.jpg",
  "DAY1/clean-energy-conference-networking-011.jpg",
  "DAY1/clean-energy-conference-networking-013.jpg",
  "DAY1/clean-energy-conference-networking-015.jpg",
  "DAY1/clean-energy-conference-networking-021.jpg",
  "DAY1/clean-energy-conference-networking-023.jpg",
  "DAY1/clean-energy-conference-networking-024.jpg",
  "DAY1/clean-energy-conference-networking-025.png",
  "DAY1/clean-energy-conference-other-001.jpg",
  "DAY1/clean-energy-conference-panel-discussion-001.jpg",
  "DAY1/clean-energy-conference-panel-discussion-002.jpg",
  "DAY1/clean-energy-conference-panel-discussion-005.jpg",
  "DAY1/clean-energy-conference-panel-discussion-006.jpg",
  "DAY1/clean-energy-conference-panel-discussion-009.jpg",
  "DAY1/clean-energy-conference-panel-discussion-010.jpg",
  "DAY1/clean-energy-conference-panel-discussion-011.jpg",
  "DAY1/clean-energy-conference-panel-discussion-012.jpg",
  "DAY1/clean-energy-conference-panel-discussion-013.jpg",
  "DAY1/clean-energy-conference-panel-discussion-015.jpg",
  "DAY1/clean-energy-conference-panel-discussion-016.jpg",
  "DAY1/clean-energy-conference-panel-discussion-017.jpg",
  "DAY1/clean-energy-conference-panel-discussion-018.jpg",
  "DAY1/clean-energy-conference-panel-discussion-019.jpg",
  "DAY1/clean-energy-conference-panel-discussion-020.jpg",
  "DAY1/clean-energy-conference-panel-discussion-021.jpg",
  "DAY1/clean-energy-conference-panel-discussion-022.jpg",
  "DAY1/clean-energy-conference-panel-discussion-023.jpg",
  "DAY1/clean-energy-conference-panel-discussion-024.jpg",
  "DAY1/clean-energy-conference-panel-discussion-025.jpg",
  "DAY1/clean-energy-conference-panel-discussion-026.jpg",
  "DAY1/clean-energy-conference-panel-discussion-027.jpg",
  "DAY1/clean-energy-conference-session-001.jpg",
  "DAY1/clean-energy-conference-session-005.jpg",
  "DAY1/clean-energy-conference-session-006.jpg",
  "DAY1/clean-energy-conference-session-007.jpg",
  "DAY1/clean-energy-conference-session-008.jpg",
  "DAY1/clean-energy-conference-session-009.jpg",
  "DAY1/clean-energy-conference-session-010.jpg",
  "DAY1/clean-energy-conference-session-011.jpg",
  "DAY1/clean-energy-conference-session-012.jpg",
  "DAY1/clean-energy-conference-session-013.jpg",
  "DAY1/clean-energy-conference-session-014.jpg",
  "DAY1/clean-energy-conference-session-016.jpg",
  "DAY1/clean-energy-conference-session-018.jpg",
  "DAY1/clean-energy-conference-session-019.jpg",
  "DAY1/clean-energy-conference-session-020.jpg",
  "DAY1/clean-energy-conference-session-021.jpg",
  "DAY1/clean-energy-conference-session-022.jpg",
  "DAY1/clean-energy-conference-session-024.jpg",
  "DAY1/clean-energy-conference-venue-003.jpg",
  "DAY1/clean-energy-conference-venue-008.jpg",
  "DAY2/clean-energy-conference-audience-043.jpg",
  "DAY2/clean-energy-conference-audience-044.jpg",
  "DAY2/clean-energy-conference-audience-049.jpg",
  "DAY2/clean-energy-conference-audience-050.jpg",
  "DAY2/clean-energy-conference-audience-052.jpg",
  "DAY2/clean-energy-conference-group-photo-009.jpg",
  "DAY2/clean-energy-conference-group-photo-011.jpg",
  "DAY2/clean-energy-conference-group-photo-014.jpg",
  "DAY2/clean-energy-conference-group-photo-015.jpg",
  "DAY2/clean-energy-conference-group-photo-018.jpg",
  "DAY2/clean-energy-conference-group-photo-019.jpg",
  "DAY2/clean-energy-conference-group-photo-020.jpg",
  "DAY2/clean-energy-conference-group-photo-021.jpg",
  "DAY2/clean-energy-conference-group-photo-022.jpg",
  "DAY2/clean-energy-conference-keynote-028.jpg",
  "DAY2/clean-energy-conference-keynote-029.jpg",
  "DAY2/clean-energy-conference-keynote-031.jpg",
  "DAY2/clean-energy-conference-keynote-034.jpg",
  "DAY2/clean-energy-conference-keynote-036.jpg",
  "DAY2/clean-energy-conference-keynote-037.jpg",
  "DAY2/clean-energy-conference-keynote-038.jpg",
  "DAY2/clean-energy-conference-keynote-039.jpg",
  "DAY2/clean-energy-conference-keynote-042.jpg",
  "DAY2/clean-energy-conference-keynote-043.jpg",
  "DAY2/clean-energy-conference-keynote-047.jpg",
  "DAY2/clean-energy-conference-keynote-052.jpg",
  "DAY2/clean-energy-conference-networking-027.jpg",
  "DAY2/clean-energy-conference-networking-028.jpg",
  "DAY2/clean-energy-conference-networking-031.jpg",
  "DAY2/clean-energy-conference-networking-032.jpg",
  "DAY2/clean-energy-conference-networking-037.jpg",
  "DAY2/clean-energy-conference-networking-039.jpg",
  "DAY2/clean-energy-conference-networking-042.jpg",
  "DAY2/clean-energy-conference-networking-045.jpg",
  "DAY2/clean-energy-conference-networking-046.jpg",
  "DAY2/clean-energy-conference-panel-discussion-029.jpg",
  "DAY2/clean-energy-conference-panel-discussion-030.jpg",
  "DAY2/clean-energy-conference-panel-discussion-031.jpg",
  "DAY2/clean-energy-conference-panel-discussion-035.jpg",
  "DAY2/clean-energy-conference-panel-discussion-036.jpg",
  "DAY2/clean-energy-conference-panel-discussion-037.jpg",
  "DAY2/clean-energy-conference-panel-discussion-041.jpg",
  "DAY2/clean-energy-conference-session-027.jpg",
  "DAY2/clean-energy-conference-session-029.jpg",
  "DAY2/clean-energy-conference-session-030.jpg",
  "DAY2/clean-energy-conference-session-035.jpg",
  "DAY2/clean-energy-conference-session-037.jpg",
  "DAY2/clean-energy-conference-session-043.jpg",
  "DAY2/clean-energy-conference-session-048.jpg",
  "DAY2/clean-energy-conference-session-049.jpg",
  "DAY2/clean-energy-conference-session-054.jpg",
  "DAY2/clean-energy-conference-session-055.jpg",
  "DAY2/clean-energy-conference-session-056.jpg",
  "DAY2/clean-energy-conference-session-059.jpg",
  "DAY2/clean-energy-conference-session-060.jpg",
  "DAY2/clean-energy-conference-session-061.jpg",
]);

// Match on folder + file name (DAY1/name.jpg), case-insensitive, so same-named
// files in different folders are never confused with each other
const removedLower = new Set(Array.from(removedFiles, (n) => n.toLowerCase()));
const galleryKey = (src: string) => src.replace("/images/gallery/", "").toLowerCase();

const rawGalleryItems: Item[] = [
  ...galleryPaths("DAY1", "audience", range(1, 38), "Conference", "Audience at the Clean Energy Conference"),
  ...galleryPaths("DAY1", "panel-discussion", range(1, 27), "Conference", "Panel discussion at the Clean Energy Conference"),
  ...galleryPaths("DAY1", "session", range(1, 25), "Conference", "Conference session in Kigali"),
  ...galleryPaths("DAY1", "other", range(1, 1), "Conference", "Clean Energy Conference moment"),
  ...galleryPaths("DAY2", "audience", range(39, 53), "Conference", "Audience at the Clean Energy Conference"),
  ...galleryPaths("DAY2", "panel-discussion", range(28, 53), "Conference", "Panel discussion at the Clean Energy Conference"),
  ...galleryPaths("DAY2", "session", range(26, 61), "Conference", "Conference session in Kigali"),
  ...galleryPaths("DAY1", "networking", range(1, 24), "Networking", "Conference networking"),
  { src: "/images/gallery/DAY1/clean-energy-conference-networking-025.png", alt: "Conference networking", category: "Networking" },
  ...galleryPaths("DAY2", "networking", range(26, 46), "Networking", "Conference networking"),
  ...galleryPaths("DAY1", "exhibition", range(1, 18), "Exhibition", "Conference exhibition"),
  ...galleryPaths("DAY1", "venue", range(1, 10), "Exhibition", "Clean Energy Conference venue"),
  ...galleryPaths("DAY1", "keynote", range(1, 25), "Speakers", "Keynote speaker at the Clean Energy Conference"),
  ...galleryPaths("DAY2", "keynote", range(26, 54), "Speakers", "Keynote speaker at the Clean Energy Conference"),
  ...galleryPaths("DAY1", "group-photo", ["001", "003", "004", "005", "006", "007", "008"], "Moments", "Conference group photo"),
  { src: "/images/gallery/DAY1/clean-energy-conference-group-photo-002.jpeg", alt: "Conference group photo", category: "Moments" },
  ...galleryPaths("DAY2", "group-photo", range(9, 23), "Moments", "Conference group photo"),
];

// Kigali photos without the similar-looking duplicates
const baseItems: GalleryItem[] = rawGalleryItems
  .filter((item) => !removedLower.has(galleryKey(item.src)))
  .map((item) => ({ ...item, event: "Kigali" as const }));

const filters = ["All", "Conference", "Networking", "Exhibition", "Speakers", "Moments"] as const;
type Filter = (typeof filters)[number];

// Logo-inspired color per filter
const filterColors: Record<Filter, string> = {
  "All":         "#E8471C", // orange
  "Conference":  "#2BB5B8", // teal
  "Networking":  "#F5A623", // gold
  "Exhibition":  "#7B8C35", // olive green
  "Speakers":    "#F06292", // pink
  "Moments":  "#8B5EA4", // purple
};

const events: { name: EventName; place: string; color: string }[] = [
  { name: "Kigali", place: "Rwanda", color: "#2BB5B8" },
  { name: "Perth", place: "Western Australia", color: "#E8471C" },
];

export default function GalleryPage({ perthItems = [] }: { perthItems?: GalleryItem[] }) {
  const [eventName, setEventName] = useState<EventName>("Kigali");
  const [active, setActive] = useState<Filter>("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const allItems = useMemo(() => [...baseItems, ...perthItems], [perthItems]);

  const eventItems = useMemo(
    () => allItems.filter((i) => i.event === eventName),
    [allItems, eventName],
  );

  // Cover photo + count for each event card
  const eventInfo = useMemo(() => {
    const info = {} as Record<EventName, { cover?: string; count: number }>;
    for (const e of events) {
      const items = allItems.filter((i) => i.event === e.name);
      const cover = (items.find((i) => i.category === "Moments") ?? items[0])?.src;
      info[e.name] = { cover, count: items.length };
    }
    return info;
  }, [allItems]);

  const availableFilters = filters.filter(
    (f) => f === "All" || eventItems.some((i) => i.category === f),
  );

  const filtered = useMemo(() => {
    if (active === "All") return eventItems;
    return eventItems.filter((i) => i.category === active);
  }, [active, eventItems]);

  const selectEvent = (name: EventName) => {
    setEventName(name);
    setActive("All");
  };

  return (
    <div
      className="min-h-screen text-white pt-[96px]"
      style={{
        background: `
          radial-gradient(ellipse at 0% 0%, rgba(43,181,184,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 0%, rgba(232,71,28,0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 60%, rgba(245,166,35,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 0% 100%, rgba(123,140,53,0.3) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 100%, rgba(240,98,146,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, rgba(139,94,164,0.15) 0%, transparent 60%),
          linear-gradient(160deg, #0a0a14 0%, #0f0a08 40%, #080f10 70%, #0a080f 100%)
        `,
      }}
    >

      {/* HERO */}
      <section className="relative pt-24 pb-12 px-6 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <p className="uppercase tracking-[0.3em] text-white/60 text-xs">
            Event Gallery
          </p>
          <h1 className="text-4xl md:text-6xl font-semibold mt-3">
            Captured Moments
          </h1>
          <p className="text-white/60 mt-5 text-sm md:text-base">
            Explore memories across all event experiences.
          </p>
        </div>
      </section>

      {/* EVENT TABS (big cards) */}
      <section className="px-4 md:px-6 pb-10 border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" role="tablist">
          {events.map((e) => {
            const isActive = eventName === e.name;
            const { cover, count } = eventInfo[e.name];
            return (
              <button
                key={e.name}
                role="tab"
                aria-selected={isActive}
                onClick={() => selectEvent(e.name)}
                className="group relative h-48 md:h-72 rounded-3xl overflow-hidden text-left transition-all duration-300"
                style={{
                  border: `2px solid ${isActive ? e.color : "rgba(255,255,255,0.12)"}`,
                  boxShadow: isActive ? `0 0 40px ${e.color}55` : "none",
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {cover && (
                  <Image
                    src={cover}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 55%, ${e.color}33 100%)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="uppercase tracking-[0.3em] text-xs" style={{ color: e.color }}>
                    {e.place}
                  </p>
                  <h2 className="text-4xl md:text-6xl font-semibold mt-1">{e.name}</h2>
                  <p className="text-white/70 text-sm mt-2">{count} photos</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FILTER BAR */}
      <div
        className="sticky top-0 z-20 backdrop-blur-md border-b border-white/10 px-6"
        style={{ background: "rgba(10, 8, 12, 0.75)" }}
      >
        <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
          {availableFilters.map((filter) => {
            const color = filterColors[filter];
            const isActive = active === filter;
            return (
              <button
                key={filter}
                onClick={() => setActive(filter)}
                className="px-4 py-2 rounded-full text-sm whitespace-nowrap transition border"
                style={{
                  backgroundColor: isActive ? color : "transparent",
                  borderColor: color,
                  color: isActive ? "#fff" : color,
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </div>

      {/* FULL-BLEED GRID */}
      <main className="w-full px-4 md:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img) => (
            <div
              key={img.src}
              onClick={() => setSelectedImage(img.src)}
              className="relative group cursor-pointer overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition" />
            </div>
          ))}
        </div>
      </main>

      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-6"
        >
          <div className="max-w-6xl w-full">
            <Image
              src={selectedImage}
              alt="preview"
              width={1600}
              height={1000}
              className="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
