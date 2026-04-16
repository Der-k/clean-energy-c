"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  MapPin,
  Building2,
  CalendarDays,
  ArrowRight,
  Plane,
  Hotel,
} from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

type EditionKey = "kigali" | "perth";

const editions = {
  kigali: {
    key: "kigali" as EditionKey,
    tabLabel: "Kigali",
    city: "Kigali, Rwanda",
    venueName: "Kigali Marriott Hotel",
    date: "6–7 August 2026",
    summary:
      "A polished conference setting in Kigali designed for executive dialogue, networking, and formal event delivery.",
    descriptionTitle: "A premium venue in the heart of Kigali",
    descriptionParagraphs: [
      "The Kigali edition will be hosted at Kigali Marriott Hotel, providing a professional setting for conference sessions, networking, exhibition access, and delegate engagement.",
      "The venue aligns well with the event's positioning as a high-level gathering focused on clean energy transition, climate finance, innovation, responsible mining, and regional collaboration.",
      "Its setting supports keynote sessions, panel discussions, sponsor visibility, and executive networking in a polished business environment.",
    ],
    venueSummary: [
      { label: "Venue", value: "Kigali Marriott Hotel" },
      { label: "Location", value: "Kigali, Rwanda" },
      { label: "Event Dates", value: "6–7 August 2026" },
      { label: "Edition", value: "Kigali Edition" },
    ],
    images: [
      "/images/venue/kigali-1.jpg",
      "/images/venue/kigali-2.jpg",
      "/images/venue/kigali-3.jpg",
      "/images/venue/kigali-4.jpg",
      "/images/venue/kigali-5.jpg",
    ],
    mapEmbed:
      "https://www.google.com/maps?q=Kigali%20Marriott%20Hotel%20Rwanda&z=15&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Kigali+Marriott+Hotel+Rwanda",
    arrivalNotes: [
      "Central Kigali location suitable for local and international delegates.",
      "Professional hospitality setting for multi-session event delivery.",
      "Well suited for networking, exhibitions, and executive meetings.",
    ],
  },

  perth: {
    key: "perth" as EditionKey,
    tabLabel: "Perth",
    city: "Perth, Western Australia",
    venueName: "Novotel Hotel Perth",
    date: "31 Aug – 1 Sept 2026",
    summary:
      "A business-friendly Perth venue aligned with the edition's focus on investment, mining technology, and Australia–Africa energy collaboration.",
    descriptionTitle: "A strategic Perth base for the Australia edition",
    descriptionParagraphs: [
      "The Perth edition will take place at Novotel Hotel Perth, offering a practical and professional venue for conference sessions, networking, and partner engagement.",
      "Perth's role as a global mining and clean energy investment hub makes it a strong location for discussions around capital markets, critical minerals, green hydrogen, storage innovation, and ESG leadership.",
      "The venue supports the edition's Australia-facing emphasis while maintaining the conference's broader Africa–Australia collaboration focus.",
    ],
    venueSummary: [
      { label: "Venue", value: "Novotel Hotel Perth" },
      { label: "Location", value: "Perth, Western Australia" },
      { label: "Event Dates", value: "31 Aug – 1 Sept 2026" },
      { label: "Edition", value: "Perth Edition" },
    ],
    images: [
      "/images/venue/perth-1.jpg",
      "/images/venue/perth-2.jpg",
      "/images/venue/perth-3.jpg",
      "/images/venue/perth-4.jpg",
      "/images/venue/perth-5.jpg",
    ],
    mapEmbed:
      "https://www.google.com/maps?q=Novotel%20Perth%20Western%20Australia&z=15&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Novotel+Perth+Western+Australia",
    arrivalNotes: [
      "Perth location aligns with investor, mining, and clean technology conversations.",
      "Strong fit for Australia-facing partnerships and business engagement.",
      "Supports both formal sessions and professional networking activity.",
    ],
  },
};

const editionOrder: EditionKey[] = ["kigali", "perth"];

export default function VenuePage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);

  return (
    <main className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-blue-500/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-blue-50/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-blue-50/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/event" className="hover:text-[#02026e]">
              Event
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Venue</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Venue
            </p>

            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Venue and location details
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
              Switch between the two 2026 editions to view their venue details,
              location context, imagery, and map information.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {editionOrder.map((editionKey) => {
              const edition = editions[editionKey];
              const isActive = activeEdition === editionKey;

              return (
                <button
                  key={editionKey}
                  type="button"
                  onClick={() => setActiveEdition(editionKey)}
                  className={`rounded-[26px] border p-6 text-left transition ${
                    isActive
                      ? "border-blue-500 bg-gradient-to-br from-blue-600 to-#02026e-500 text-white shadow-[0_18px_40px_rgba(2,2,110,0.22)]"
                      : "border-blue-500/20 bg-white text-[color:var(--text-main)]-900 shadow-sm hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(2,2,110,0.12)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                          isActive ? "text-blue-100" : "text-[#02026e]"
                        }`}
                      >
                        {edition.tabLabel} Edition
                      </p>

                      <h2 className="font-heading mt-3 text-2xl font-bold tracking-[-0.02em]">
                        {edition.venueName}
                      </h2>

                      <div
                        className={`mt-4 space-y-2 text-sm ${
                          isActive ? "text-blue-50" : "text-[color:var(--text-main)]-600"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          <span>{edition.date}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{edition.city}</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "bg-blue-50/8 text-[#02026e]"
                      }`}
                    >
                      <Building2 className="h-5 w-5" />
                    </div>
                  </div>

                  <p
                    className={`mt-5 text-sm leading-7 ${
                      isActive ? "text-blue-50" : "text-[color:var(--text-main)]-600"
                    }`}
                  >
                    {edition.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              About the Venue
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              {current.descriptionTitle}
            </h2>

            <div className="mt-6 space-y-5 text-base leading-8 text-[color:var(--text-main)]-600">
              {current.descriptionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-[20px] border border-blue-500/20 bg-gradient-to-b from-white to-blue-50 p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#02026e]">
                Venue Summary
              </p>

              <div className="mt-4 space-y-3 text-sm text-[color:var(--text-main)]-700">
                {current.venueSummary.map((item) => (
                  <p key={item.label}>
                    <span className="font-semibold text-[color:var(--text-main)]-900">
                      {item.label}:
                    </span>{" "}
                    {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.images.map((image, index) => (
              <div
                key={image}
                className={`overflow-hidden rounded-[20px] border border-blue-500/20 bg-blue-50 shadow-sm ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={image}
                    alt={`${current.venueName} image ${index + 1}`}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                        : "(max-width: 640px) 100vw, 50vw"
                    }
                    className="object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell muted>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Arrival & Access
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              Practical location notes
            </h2>

            <div className="mt-6 grid gap-4">
              {current.arrivalNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[18px] border border-blue-500/20 bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-3">
                    <Plane className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                    <p className="text-sm leading-7 text-[color:var(--text-main)]-700">{note}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-[18px] border border-blue-500/20 bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <Hotel className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                  <p className="text-sm leading-7 text-[color:var(--text-main)]-700">
                    The venue is intended to support conference sessions,
                    networking, partner visibility, and professional delegate
                    experience for the selected edition.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="venue-map"
            className="overflow-hidden rounded-[24px] border border-blue-500/20 bg-white shadow-[0_20px_50px_rgba(2,2,110,0.08)]"
          >
            <div className="aspect-[16/10] w-full">
              <iframe
                title={`${current.venueName} map`}
                src={current.mapEmbed}
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={current.mapLink}
            target="_blank"
            rel="noreferrer"
            className="btn-outline-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
          >
            Open in Google Maps
            <ArrowRight className="h-4 w-4" />
          </a>

          <a
            href="https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
          >
            Register Now
          </a>
        </div>
      </SectionShell>
    </main>
  );
}