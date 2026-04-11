"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";

const venues = [
  {
    name: "Kigali Marriott Hotel",
    edition: "Kigali Edition",
    location: "Kigali, Rwanda",
    date: "6–7 August 2026",
    image: "/images/venue/kigali-1.jpg",
    description:
      "A polished executive setting in Kigali designed for keynote sessions, partner engagement, networking, and high-level clean energy dialogue.",
  },
  {
    name: "Novotel Hotel Perth",
    edition: "Perth Edition",
    location: "Perth, Western Australia",
    date: "31 Aug – 1 Sept 2026",
    image: "/images/venue/perth-1.jpg",
    description:
      "A professional Perth venue aligned with the edition’s focus on investment, mining technology, green hydrogen, storage, and Australia–Africa collaboration.",
  },
];

export function VenuePreview() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Venue
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            Two strategic venues for two 2026 editions
          </h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-main)]-600">
            Each edition is hosted in a professional venue designed to support
            executive dialogue, partner visibility, networking, and strong
            delegate experience.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {venues.map((venue) => (
            <article
              key={venue.name}
              className="hover-glow-card group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
            >
              <div className="relative h-[280px] w-full overflow-hidden">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                  {venue.edition}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-white">
                    {venue.name}
                  </h3>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 text-sm text-[color:var(--text-main)]-700">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    <span>{venue.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>{venue.location}</span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-[color:var(--text-main)]-700">
                  {venue.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/event/venue"
            className="btn-outline-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
          >
            View full venue details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}