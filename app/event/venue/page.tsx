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
    venueName: "Kigali International Convention Centre",
    date: "25–28 May 2027",
    summary:
      "Where Africa prepares the opportunity: African governments and developers present qualified clean-energy and critical-mineral projects to investors and development-finance partners.",
    descriptionTitle: "Kigali: where Africa prepares the opportunity",
    descriptionParagraphs: [
      "The Kigali edition will be hosted at the Kigali International Convention Centre, Rwanda. It is the first stage of one journey across two cities, where African governments and developers present qualified projects.",
      "Over four days, delegates cover African government priorities and regulatory conditions, regional infrastructure gaps, project preparation and qualification, development-finance participation, and project-owner and investor matching.",
      "The programme also puts local manufacturing and workforce development on the agenda, and runs structured deal-room spaces: Project Showcase, Project Clinics, Investor Lounge and Regulatory Working Sessions.",
    ],
    venueSummary: [
      { label: "Venue", value: "Kigali International Convention Centre" },
      { label: "Location", value: "Kigali, Rwanda" },
      { label: "Event Dates", value: "25–28 May 2027" },
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
      "https://www.google.com/maps?q=Kigali%20International%20Convention%20Centre%20Rwanda&z=15&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Kigali+International+Convention+Centre+Rwanda",
    arrivalNotes: [
      "Hosted in Kigali, with the support of Rwanda's Ministry of Infrastructure and Kenya's Ministry of Energy & Petroleum.",
      "Ministers, ambassadors and senior officials from Africa and Australia attend, alongside development finance institutions.",
      "Pre-booked investor meetings run through the pipeline register, so arrive with your appointments confirmed.",
    ],
    closingNote:
      "Projects presented in Kigali are tested, matched and tracked, then carried forward to the Perth edition for structured responses from Australian investors and delivery partners.",
  },

  perth: {
    key: "perth" as EditionKey,
    tabLabel: "Perth",
    city: "Perth, Western Australia",
    venueName: "Venue to be announced",
    date: "30 Aug – 2 Sept 2027",
    summary:
      "Where Australia helps move the opportunity forward: investors, technology providers and delivery partners respond to the projects introduced in Kigali.",
    descriptionTitle: "Perth: where Australia moves the opportunity forward",
    descriptionParagraphs: [
      "The Australia edition will take place in Perth, Western Australia, from 30 August to 2 September 2027. The venue is yet to be announced.",
      "Perth is the second stage of the journey. Australian investors, technology providers and delivery partners give structured responses to the projects introduced in Kigali.",
      "Sessions cover mining and critical-mineral investment, Australian technology, storage and grid expertise, engineering and project delivery, institutional capital, and research and skills partnerships.",
    ],
    venueSummary: [
      { label: "Venue", value: "To be announced" },
      { label: "Location", value: "Perth, Western Australia" },
      { label: "Event Dates", value: "30 Aug – 2 Sept 2027" },
      { label: "Edition", value: "Australia Edition" },
    ],
    images: [
      "/images/venue/perth-1.jpg",
      "/images/venue/perth-2.jpg",
      "/images/venue/perth-3.jpg",
      "/images/venue/perth-4.jpg",
      "/images/venue/perth-5.jpg",
    ],
    mapEmbed:
      "https://www.google.com/maps?q=Perth%20Western%20Australia&z=12&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Perth+Western+Australia",
    arrivalNotes: [
      "The venue will be confirmed soon. The map shows Perth while the location is finalised.",
      "Perth is home to WA miners and ASX-listed companies active across about 35 African countries.",
      "Matched investor meetings and the deal room follow the same format as Kigali.",
    ],
    closingNote:
      "Venue details for Perth will be published here as soon as they are confirmed.",
  },
};

const editionOrder: EditionKey[] = ["kigali", "perth"];

export default function VenuePage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);

  return (
    <main className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-[color:var(--text-main)]-500">
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
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Venue
            </p>

            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Venue and location details
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-8 text-[color:var(--text-main)]-600">
              One journey across two cities. Switch between the Kigali and
              Perth editions of CEAA 2027 to view venue details, location
              context, imagery, and map information.
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
                      ? "border-[#02026e] bg-gradient-to-br from-[#02026e] to-[#010150] text-white shadow-[0_18px_40px_rgba(2,2,110,0.22)]"
                      : "border-[#02026e]/20 bg-white text-[color:var(--text-main)]-900 shadow-sm hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(2,2,110,0.12)]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${
                          isActive ? "text-white/70" : "text-[#02026e]"
                        }`}
                      >
                        {edition.tabLabel} Edition
                      </p>

                      <h2 className="font-heading mt-3 text-2xl font-bold tracking-[-0.02em]">
                        {edition.venueName}
                      </h2>

                      <div
                        className={`mt-4 space-y-2 text-base ${
                          isActive ? "text-white/80" : "text-[color:var(--text-main)]-600"
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
                          : "bg-[#02026e]/8 text-[#02026e]"
                      }`}
                    >
                      <Building2 className="h-5 w-5" />
                    </div>
                  </div>

                  <p
                    className={`mt-5 text-base leading-7 ${
                      isActive ? "text-white/80" : "text-[color:var(--text-main)]-600"
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

      <SectionShell className="bg-gradient-to-br from-[#02026e] via-[#0b0b8f] to-[#010150] text-white">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* Left Content */}
          <div>
            {/* Section Label */}
            <div className="inline-block">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white">
                About the Venue
              </p>

              <div className="mt-2 h-[2px] w-full rounded-full bg-[#06895b]" />
            </div>

            {/* Heading */}
            <div className="mt-3 inline-block">
              <h2 className="font-heading text-3xl font-bold tracking-[-0.02em] text-white">
                {current.descriptionTitle}
              </h2>

              <div className="mt-3 h-[3px] w-24 rounded-full bg-[#06895b]" />
            </div>

            {/* Paragraphs */}
            <div className="mt-6 space-y-5 text-base leading-8 text-white/90">
              {current.descriptionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {/* Venue Summary Card (WHITE + BLUE TEXT) */}
            <div className="mt-8 rounded-[20px] border border-[#02026e]/15 bg-white p-5 shadow-sm">
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-[#02026e]">
                Venue Summary
              </p>

              <div className="mt-4 space-y-3 text-base text-[#02026e]/80">
                {current.venueSummary.map((item) => (
                  <p key={item.label}>
                    <span className="font-semibold text-[#02026e]">
                      {item.label}:
                    </span>{" "}
                    {item.value}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {current.images.map((image, index) => (
              <div
                key={image}
                className={`
                  overflow-hidden rounded-[20px]
                  border border-[#06895b]/25
                  bg-[#06895b]/10
                  shadow-sm
                  transition-all duration-300
                  hover:border-[#06895b]/50
                  hover:bg-[#06895b]/15
                  ${index === 0 ? "sm:col-span-2" : ""}
                `}
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
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Arrival & Access
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              Practical location notes
            </h2>

            <div className="mt-6 grid gap-4">
              {current.arrivalNotes.map((note) => (
                <div
                  key={note}
                  className="rounded-[18px] border border-[#02026e]/20 bg-white p-5 shadow-sm"
                >
                  <div className="flex gap-3">
                    <Plane className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                    <p className="text-base leading-7 text-[color:var(--text-main)]-700">{note}</p>
                  </div>
                </div>
              ))}

              <div className="rounded-[18px] border border-[#02026e]/20 bg-white p-5 shadow-sm">
                <div className="flex gap-3">
                  <Hotel className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                  <p className="text-base leading-7 text-[color:var(--text-main)]-700">
                    {current.closingNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            id="venue-map"
            className="overflow-hidden rounded-[24px] border border-[#02026e]/20 bg-white shadow-[0_20px_50px_rgba(2,2,110,0.08)]"
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
          {/* GOOGLE MAPS */}
          <a
            href={current.mapLink}
            target="_blank"
            rel="noreferrer"
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden
              rounded-full px-6 py-3 text-base font-semibold
              text-[#02026e]
              bg-white
              border border-white/30
              shadow-[0_10px_30px_rgba(0,0,0,0.10)]
              transition-all duration-500 ease-out
              hover:text-white
              hover:border-[#009966]
              hover:shadow-[0_18px_50px_rgba(0,153,102,0.25)]
              hover:scale-[1.05]
              active:scale-[0.97]
              focus:outline-none
              focus:ring-2
              focus:ring-[#009966]/35
              focus:ring-offset-2
              focus:ring-offset-[#02026e]
            "
          >
            {/* emerald sweep */}
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span
                className="
                  absolute left-0 top-0 h-full w-0
                  bg-gradient-to-r
                  from-[#007a55]
                  via-[#009966]
                  to-[#00b377]
                  transition-all duration-500 ease-out
                  group-hover:w-full
                "
              />
            </span>

            <span className="relative z-10">Open in Google Maps</span>

            <ArrowRight
              className="
                relative z-10 h-4 w-4
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </a>

          {/* REGISTER NOW (PRIMARY) */}
          <a
            href="/get-tickets"
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden
              rounded-full px-6 py-3 text-base font-semibold
              text-white
              bg-gradient-to-r from-[#007a55] via-[#009966] to-[#00b377]
              bg-[length:200%_100%]
              bg-left
              shadow-[0_12px_35px_rgba(0,153,102,0.30)]
              transition-all duration-500 ease-out
              hover:bg-right
              hover:shadow-[0_18px_55px_rgba(0,153,102,0.40)]
              hover:scale-[1.05]
              active:scale-[0.97]
              focus:outline-none
              focus:ring-2
              focus:ring-[#009966]/35
              focus:ring-offset-2
              focus:ring-offset-[#02026e]
            "
          >
            <span className="relative z-10">Register Now</span>

            <ArrowRight
              className="
                relative z-10 h-4 w-4
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </a>
        </div>
      </SectionShell>
    </main>
  );
}