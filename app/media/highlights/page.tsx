"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  ArrowRight,
  Sparkles,
  Landmark,
  Lightbulb,
  Handshake,
  FileText,
  Users,
  CheckCircle2, // ✅ ADD THIS
} from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

type EditionKey = "kigali" | "perth";

const editions = {
  kigali: {
    key: "kigali" as EditionKey,
    label: "Kigali Edition",
    date: "6–7 August 2026",
    location: "Kigali Marriott Hotel, Rwanda",
    theme:
      "East Africa energy transition, regional integration, geothermal, climate finance, clean mobility, and decentralized systems.",
    heroImage: "/images/highlights/kigali-highlight-hero.jpg",
    spotlightTitle: "Programme highlights from the Kigali edition",
    spotlightText:
      "The Kigali edition emphasizes East Africa’s energy transition and Rwanda’s position as a hub for clean mobility, innovation-led policy, regional integration, and climate-focused energy growth.",
    cards: [
      {
        title: "High-Level Plenaries",
        text: "Discussions on renewable energy policy, regional cooperation, and frameworks for grid integration.",
        icon: Landmark,
      },
      {
        title: "Technical Workshops",
        text: "Sessions on energy storage, financing models, critical minerals, and regulatory reform.",
        icon: Lightbulb,
      },
      {
        title: "Innovation Expo",
        text: "An exhibition showcasing renewable energy technologies from Africa and Australia.",
        icon: Sparkles,
      },
      {
        title: "Investor Roundtables",
        text: "Targeted engagement connecting project developers with financiers and development institutions.",
        icon: Handshake,
      },
    ],
    featuredBlocks: [
      {
        title: "Regional integration focus",
        text: "Highlights cross-border energy cooperation, regional power pools, and stronger East African institutional partnerships.",
      },
      {
        title: "Climate finance and green industrialization",
        text: "Focuses on financing pathways and industrial opportunities that support long-term low-carbon growth.",
      },
      {
        title: "Innovation-led clean mobility",
        text: "Reflects Rwanda’s growing visibility in clean mobility, sustainable urban systems, and policy-led innovation.",
      },
    ],
    outcomeCards: [
      "Australia-Africa Clean Energy Report 2026",
      "Policy Dialogue Framework",
      "Partnership and MoU opportunities",
      "Government, investor, and innovator matchmaking",
    ],
  },

  perth: {
    key: "perth" as EditionKey,
    label: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    location: "Novotel Hotel Perth, Western Australia",
    theme:
      "Capital markets, mining technology, green hydrogen, storage innovation, ESG leadership, and Africa–Australia investment ties.",
    heroImage: "/images/highlights/perth-highlight-hero.jpg",
    spotlightTitle: "Programme highlights from the Perth edition",
    spotlightText:
      "The Perth edition is positioned as a strategic bridge between African clean energy priorities and Australian finance, mining innovation, hydrogen expertise, storage capability, and ESG leadership frameworks.",
    cards: [
      {
        title: "Capital & Investment Lens",
        text: "Connects African clean energy priorities to Australian capital markets and investment ecosystems.",
        icon: Landmark,
      },
      {
        title: "Mining & Critical Minerals",
        text: "Highlights advanced mining technologies and the role of minerals in future clean energy value chains.",
        icon: Lightbulb,
      },
      {
        title: "Green Hydrogen & Storage",
        text: "Brings focus to next-generation hydrogen and storage innovation relevant to long-term transition planning.",
        icon: Sparkles,
      },
      {
        title: "ESG Leadership Frameworks",
        text: "Explores governance, sustainability, and responsible industry models shaping future partnerships.",
        icon: Handshake,
      },
    ],
    featuredBlocks: [
      {
        title: "Australia–Africa policy dialogue",
        text: "Strengthens long-term cooperation and policy exchange between African priorities and Australian market capability.",
      },
      {
        title: "Investment and value-chain positioning",
        text: "Frames East African opportunity inside broader global critical minerals and renewable energy value chains.",
      },
      {
        title: "Technology and market access",
        text: "Spotlights practical commercial links between mining technology, storage, hydrogen, and project development.",
      },
    ],
    outcomeCards: [
      "Australia-Africa Clean Energy Report 2026",
      "Strategic investor and policy conversations",
      "Partnership and MoU opportunities",
      "Market access and value-chain positioning",
    ],
  },
};

const editionOrder: EditionKey[] = ["kigali", "perth"];

export default function HighlightsPage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);

  return (
    <main className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-cyan-100/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-500">Media</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Highlights</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Highlights
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Edition highlights and featured moments
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
              Explore key highlights from the 2026 Kigali and Perth editions,
              including programme emphasis, showcase formats, and expected
              strategic outcomes.
            </p>
          </div>

          <div className="mt-10 grid gap-4">
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
                      ? "border-blue-500 bg-blue-600 text-white shadow-[0_18px_36px_rgba(37,99,235,0.18)]"
                      : "border-blue-100 bg-white text-[color:var(--text-main)]-900 shadow-sm hover:border-blue-200 hover:bg-blue-50/50"
                  }`}
                >
                  <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div>
                      <p
                        className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${
                          isActive ? "text-blue-100" : "text-blue-600"
                        }`}
                      >
                        {edition.label}
                      </p>

                      <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em]">
                        {edition.location}
                      </h2>

                      <p
                        className={`mt-3 text-sm leading-7 ${
                          isActive ? "text-blue-50" : "text-[color:var(--text-main)]-600"
                        }`}
                      >
                        {edition.theme}
                      </p>
                    </div>

                    <div
                      className={`grid gap-2 text-sm ${
                        isActive ? "text-blue-50" : "text-[color:var(--text-main)]-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" />
                        <span>{edition.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{edition.location}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Spotlight
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              {current.spotlightTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
              {current.spotlightText}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/documents/clean-energy-conference-programme-2026.pdf"
                className="btn-outline-glow rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
              >
                Download Programme
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
          </div>

          <div className="overflow-hidden rounded-[24px] border border-blue-100 bg-white shadow-[0_20px_50px_rgba(37,99,235,0.08)]">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={current.heroImage}
                alt={current.label}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell muted>
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
            Highlight Formats
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            Featured programme elements
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {current.cards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-[22px] border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-heading mt-5 text-xl font-semibold text-[color:var(--text-main)]-900">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[color:var(--text-main)]-600">
                  {card.text}
                </p>
              </article>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Focus Areas
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              Edition-specific highlight areas
            </h2>
          </div>

          <div className="grid gap-4">
            {current.featuredBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-[20px] border border-blue-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-heading text-xl font-semibold text-[color:var(--text-main)]-900">
                  {block.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[color:var(--text-main)]-600">
                  {block.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionShell>

      <SectionShell muted>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Strategic Outputs
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
              Expected highlight outcomes
            </h2>
            <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
              The concept note frames the conference as a platform for
              high-level dialogue, investment conversations, technical exchange,
              policy continuity, and partnership formation across the two editions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.outcomeCards.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[18px] border border-blue-100 bg-white p-4 shadow-sm"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <p className="text-sm leading-7 text-[color:var(--text-main)]-700">{item}</p>
              </div>
            ))}

            <div className="flex gap-3 rounded-[18px] border border-blue-100 bg-white p-4 shadow-sm">
              <Users className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <p className="text-sm leading-7 text-[color:var(--text-main)]-700">
                A flagship platform connecting governments, investors, utilities,
                innovators, and industry stakeholders.
              </p>
            </div>

            <div className="flex gap-3 rounded-[18px] border border-blue-100 bg-white p-4 shadow-sm">
              <FileText className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <p className="text-sm leading-7 text-[color:var(--text-main)]-700">
                A platform for formal reports, policy dialogue, and structured
                cooperation mechanisms.
              </p>
            </div>
          </div>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Discover more
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Explore the full programme or browse the gallery
              </h2>
              <p className="mt-3 text-sm leading-7 text-blue-50 md:text-base">
                Move from headline highlights to the full programme flow and the
                wider event experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="/documents/clean-energy-conference-programme-2026.pdf"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Download Programme
              </a>
              <Link
                href="/media/gallery"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}