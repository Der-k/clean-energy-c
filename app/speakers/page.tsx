"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, CalendarDays, MapPin } from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

type EditionKey = "kigali" | "perth";

type Speaker = {
  name: string;
  role: string;
  organization: string;
  image: string;
};

type SpeakerGroup = {
  label: string;
  speakers: Speaker[];
};

const editions: Record<
  EditionKey,
  {
    label: string;
    date: string;
    location: string;
    intro: string;
    groups: SpeakerGroup[];
  }
> = {
  kigali: {
    label: "Kigali Edition",
    date: "6–7 August 2026",
    location: "Kigali Marriott Hotel, Rwanda",
    intro:
      "The Kigali speaker programme is aligned to East Africa's energy transition, regional integration, climate finance, decentralized systems, clean mobility, and green industrialization.",
    groups: [
      {
        label: "Host Government / Institutional Leadership",
        speakers: [
          {
            name: "To be announced",
            role: "Senior Government Representative",
            organization: "Government of Rwanda",
            image: "/images/speakers/speaker-1.jpg",
          },
          {
            name: "To be announced",
            role: "Regional Energy Leadership",
            organization: "East African Energy Institution",
            image: "/images/speakers/speaker-2.jpg",
          },
        ],
      },
      {
        label: "Ministers / Policymakers",
        speakers: [
          {
            name: "To be announced",
            role: "Minister / State Department Representative",
            organization: "Energy & Climate Portfolio",
            image: "/images/speakers/speaker-3.jpg",
          },
          {
            name: "To be announced",
            role: "Policy & Regulation Lead",
            organization: "Regional Energy Authority",
            image: "/images/speakers/speaker-4.jpg",
          },
          {
            name: "To be announced",
            role: "Public Sector Strategy Speaker",
            organization: "Infrastructure / Power Institution",
            image: "/images/speakers/speaker-5.jpg",
          },
        ],
      },
      {
        label: "Investors / DFIs / Industry Leaders",
        speakers: [
          {
            name: "To be announced",
            role: "Investment Director",
            organization: "Development Finance Institution",
            image: "/images/speakers/speaker-6.jpg",
          },
          {
            name: "To be announced",
            role: "Energy Investment Partner",
            organization: "Private Capital / Infrastructure Fund",
            image: "/images/speakers/speaker-7.jpg",
          },
          {
            name: "To be announced",
            role: "Utility / Project Executive",
            organization: "Regional Energy Company",
            image: "/images/speakers/speaker-8.jpg",
          },
        ],
      },
      {
        label: "Innovation / Research / Moderators",
        speakers: [
          {
            name: "To be announced",
            role: "Clean Technology Innovator",
            organization: "Energy Innovation Platform",
            image: "/images/speakers/speaker-9.jpg",
          },
          {
            name: "To be announced",
            role: "Academic / Research Lead",
            organization: "University / Research Institution",
            image: "/images/speakers/speaker-10.jpg",
          },
          {
            name: "To be announced",
            role: "Conference Moderator",
            organization: "Industry / Media / Policy Forum",
            image: "/images/speakers/speaker-11.jpg",
          },
        ],
      },
    ],
  },

  perth: {
    label: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    location: "Novotel Hotel Perth, Western Australia",
    intro:
      "The Perth speaker programme is aligned to capital markets, mining technology, green hydrogen, energy storage, ESG leadership, and Africa–Australia investment and policy collaboration.",
    groups: [
      {
        label: "Australia Edition Leadership",
        speakers: [
          {
            name: "To be announced",
            role: "Senior Industry Representative",
            organization: "Australian Energy / Mining Platform",
            image: "/images/speakers/speaker-12.jpg",
          },
          {
            name: "To be announced",
            role: "Institutional Leadership Speaker",
            organization: "Australia–Africa Cooperation Platform",
            image: "/images/speakers/speaker-13.jpg",
          },
        ],
      },
      {
        label: "Capital Markets / Investment Voices",
        speakers: [
          {
            name: "To be announced",
            role: "Capital Markets Speaker",
            organization: "Investment / Advisory Group",
            image: "/images/speakers/speaker-14.jpg",
          },
          {
            name: "To be announced",
            role: "Energy Finance Leader",
            organization: "Infrastructure / Energy Fund",
            image: "/images/speakers/speaker-15.jpg",
          },
          {
            name: "To be announced",
            role: "Development / Investment Specialist",
            organization: "Institutional Finance Platform",
            image: "/images/speakers/speaker-16.jpg",
          },
        ],
      },
      {
        label: "Mining / Technology / Hydrogen",
        speakers: [
          {
            name: "To be announced",
            role: "Mining Technology Executive",
            organization: "Advanced Mining Solutions",
            image: "/images/speakers/speaker-17.jpg",
          },
          {
            name: "To be announced",
            role: "Hydrogen / Storage Specialist",
            organization: "Clean Technology Company",
            image: "/images/speakers/speaker-18.jpg",
          },
          {
            name: "To be announced",
            role: "Critical Minerals Speaker",
            organization: "Resources / Processing Platform",
            image: "/images/speakers/speaker-19.jpg",
          },
        ],
      },
      {
        label: "Policy / ESG / Moderators",
        speakers: [
          {
            name: "To be announced",
            role: "ESG Leadership Speaker",
            organization: "Sustainability Advisory Platform",
            image: "/images/speakers/speaker-20.jpg",
          },
          {
            name: "To be announced",
            role: "Policy Dialogue Representative",
            organization: "Government / Institutional Body",
            image: "/images/speakers/speaker-21.jpg",
          },
          {
            name: "To be announced",
            role: "Conference Moderator",
            organization: "Industry / Media / Advisory Network",
            image: "/images/speakers/speaker-22.jpg",
          },
        ],
      },
    ],
  },
};

const editionOrder: EditionKey[] = ["kigali", "perth"];

export default function SpeakersPage() {
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
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Speakers</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Speakers
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Conference speakers
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
              Explore the speaker structure for each 2026 edition. Final speaker
              names can be dropped into the grouped layout once confirmations are complete.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {editionOrder.map((editionKey) => {
              const edition = editions[editionKey];
              const isActive = activeEdition === editionKey;

              return (
                <button
                  key={editionKey}
                  type="button"
                  onClick={() => setActiveEdition(editionKey)}
                  className={`rounded-[24px] border p-5 text-left transition ${
                    isActive
                      ? "border-[#02026e] bg-gradient-to-br from-[#02026e] to-[#010150] text-white shadow-[0_18px_36px_rgba(2,2,110,0.22)]"
                      : "border-[#02026e]/20 bg-white text-[color:var(--text-main)]-900 shadow-sm hover:border-[#02026e]/40 hover:shadow-[0_16px_36px_rgba(2,2,110,0.10)]"
                  }`}
                >
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isActive ? "text-white/70" : "text-[#02026e]"
                    }`}
                  >
                    {edition.label}
                  </p>

                  <div className="mt-4 grid gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>{edition.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{edition.location}</span>
                    </div>
                  </div>

                  <p
                    className={`mt-4 text-sm leading-7 ${
                      isActive ? "text-white/80" : "text-[color:var(--text-main)]-600"
                    }`}
                  >
                    {edition.intro}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {current.groups.map((group, index) => (
        <SectionShell key={group.label} muted={index % 2 === 1}>
          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              {current.label}
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              {group.label}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.speakers.map((speaker) => (
              <article
                key={`${group.label}-${speaker.name}-${speaker.role}`}
                className="group overflow-hidden rounded-[22px] border border-[#02026e]/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.10)]"
              >
                <div className="relative aspect-[4/4.6] w-full overflow-hidden bg-[#02026e]/5">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-xl font-semibold text-[color:var(--text-main)]-900">
                    {speaker.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-main)]-600">
                    {speaker.role}
                  </p>
                  <p className="mt-1 text-sm font-medium text-[#02026e]">
                    {speaker.organization}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </SectionShell>
      ))}

      <SectionShell>
        <div className="rounded-[28px] border border-[#02026e]/30 bg-gradient-to-r from-[#02026e] to-[#010150] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.22)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Speaker updates
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Final speaker announcements can be added here
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/80 md:text-base">
                This page is structured to match a grouped conference speaker directory,
                with category-led sections and reusable speaker cards.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#02026e] transition hover:bg-white/90"
              >
                Speaker Enquiry
              </Link>
              <a
                href="https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}