"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  Sparkles,
  Landmark,
  Lightbulb,
  Handshake,
  FileText,
  Users,
  CheckCircle2,
} from "lucide-react";

// ── Logo-palette color map ───────────────────────────────────────────────────
const C = {
  teal:   { hex: "#2BB5B8", rgb: "43,181,184"  },
  orange: { hex: "#E8471C", rgb: "232,71,28"   },
  gold:   { hex: "#F5A623", rgb: "245,166,35"  },
  olive:  { hex: "#7B8C35", rgb: "123,140,53"  },
  pink:   { hex: "#F06292", rgb: "240,98,146"  },
  purple: { hex: "#8B5EA4", rgb: "139,94,164"  },
};

// ── Reusable inline section shell ────────────────────────────────────────────
function Section({
  children,
  color,
  intensity = 0.05,
  border = true,
}: {
  children: React.ReactNode;
  color: typeof C[keyof typeof C];
  intensity?: number;
  border?: boolean;
}) {
  return (
    <section
      className="py-16 md:py-20"
      style={{
        background: `rgba(${color.rgb}, ${intensity})`,
        borderTop: border ? `1px solid rgba(${color.rgb}, 0.18)` : undefined,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">{children}</div>
    </section>
  );
}

// ── Data ────────────────────────────────────────────────────────────────     
type EditionKey = "Kigali" | "perth";

const editions = {
  Kigali: {
    key: "Kigali" as EditionKey,
    label: "Kigali Edition",
    date: "25–28 May 2027",
    location: "Kigali International Convention Centre, Rwanda",
    theme:
      "Connecting Australian capital, technology and delivery expertise with Africa's energy and critical-mineral opportunities.",
    heroImage: "/images/highlights/Kigali-highlight-hero.jpeg",
    spotlightTitle: "Programme highlights from the Kigali edition",
    spotlightText:
      "Where Africa prepares the opportunity, focusing on African government priorities, regional infrastructure gaps identification, project preparation and qualification, and development-finance participation.",
    color: C.orange,
    cards: [
      { title: "Project Showcase", text: "Structured 15-minute presentations of pipeline projects using a standard template for qualified opportunities.", icon: Landmark },
      { title: "Project Clinics", text: "Technical and financial interrogation by invitation, outputting a formalized Readiness Note.", icon: Lightbulb },
      { title: "Regulatory Working Sessions", text: "Closed formats addressing barriers, permits, and market rules to produce a clear barrier log.", icon: Sparkles },
      { title: "Investor Matching", text: "Connecting project owners with development-finance participation and local manufacturing partners.", icon: Handshake },
    ],
    featuredBlocks: [
      { title: "African government priorities", text: "Aligns regulatory conditions and national frameworks with capital providers." },
      { title: "Project preparation and qualification", text: "Bridges the project-preparation gap through structured pipeline tracking." },
      { title: "Local manufacturing & workforce", text: "Drives employment, local manufacturing, and sustainable industrial development." },
    ],
    outcomeCards: [
      "Qualified project Readiness Notes",
      "Barrier logs from regulatory working sessions",
      "Development-finance participation frameworks",
      "Project-owner and investor matchmaking",
    ],
  },
  perth: {
    key: "perth" as EditionKey,
    label: "Perth Edition",
    date: "30 Aug – 2 Sept 2027",
    location: "Perth, Western Australia (venue TBA)",
    theme:
      "Where Australia helps move the opportunity forward through mining, technology, storage, and institutional capital.",
    heroImage: "/images/highlights/perth-highlight-hero.jpeg",
    spotlightTitle: "Programme highlights from the Perth edition",
    spotlightText:
      "Focuses on mining and critical-mineral investment, Australian technology, storage and grid expertise, engineering delivery, and institutional capital responses to projects introduced in Kigali.",
    color: C.teal,
    cards: [
      { title: "Mining & Critical Minerals", text: "Leverages ASX-listed miners and processing-stage joint ventures for critical mineral value chains.", icon: Landmark },
      { title: "Storage & Grid Expertise", text: "Utilizes Australia's battery market experience to address fast-growing distributed solar grids.", icon: Lightbulb },
      { title: "Engineering & Delivery", text: "Addresses the project-preparation gap via feasibility, owner's engineer, and PMO contracts.", icon: Sparkles },
      { title: "Institutional Capital", text: "Co-invests alongside DFIs with guarantees and risk mitigation strategies.", icon: Handshake },
    ],
    featuredBlocks: [
      { title: "Mining-energy technology", text: "Deploys hybrid solar-storage solutions at operating mines acting as anchor loads." },
      { title: "Institutional capital alignment", text: "Connects overseas investments with de-risked African renewable projects." },
      { title: "Research and skills partnerships", text: "Facilitates institutional pairings, grid-operator training, and metallurgy courses." },
    ],
    outcomeCards: [
      "Structured responses to Kigali projects",
      "Processing-stage joint venture agreements",
      "Engineering and PMO delivery contracts",
      "Institutional co-investment frameworks",
    ],
  },
};

const editionOrder: EditionKey[] = ["Kigali", "perth"];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HighlightsPage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("Kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);
  const accent = current.color;

  return (
    <main
      className="pt-24 text-white"
      style={{
        background: `
          radial-gradient(ellipse at 0% 0%,   rgba(43,181,184,0.30) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 0%,  rgba(232,71,28,0.25)  0%, transparent 50%),
          radial-gradient(ellipse at 100% 60%, rgba(245,166,35,0.20) 0%, transparent 45%),
          radial-gradient(ellipse at 0% 100%,  rgba(123,140,53,0.25) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 100%, rgba(240,98,146,0.20) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%,  rgba(139,94,164,0.12) 0%, transparent 60%),
          linear-gradient(160deg, #0a0a14 0%, #0f0a08 40%, #080f10 70%, #0a080f 100%)
        `,
      }}
    >
      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{ borderBottom: `1px solid rgba(${C.teal.rgb}, 0.2)` }}
      >
        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-white/50">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Media</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white/80">Highlights</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.teal.hex }}>
              Highlights
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">
              2027 Clean Energy Conference Highlights
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-white/70">
              Connecting Australian capital, technology, and delivery expertise with Africa's energy and critical-mineral opportunities[cite: 3].
            </p>
          </div>

          {/* Edition selector buttons */}
          <div className="mt-10 grid gap-4">
            {editionOrder.map((editionKey) => {
              const ed = editions[editionKey];
              const isActive = activeEdition === editionKey;
              return (
                <button
                  key={editionKey}
                  type="button"
                  onClick={() => setActiveEdition(editionKey)}
                  aria-pressed={isActive}
                  className="rounded-[24px] p-5 text-left transition"
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, rgba(${ed.color.rgb}, 0.35), rgba(${ed.color.rgb}, 0.15))`,
                          border: `1px solid rgba(${ed.color.rgb}, 0.6)`,
                          boxShadow: `0 18px 36px rgba(${ed.color.rgb}, 0.2)`,
                        }
                      : {
                          background: "rgba(255,255,255,0.04)",
                          border: `1px solid rgba(${ed.color.rgb}, 0.25)`,
                        }
                  }
                >
                  <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:items-center">
                    <div>
                      <p className="text-[13px] font-semibold uppercase tracking-[0.18em]"
                         style={{ color: isActive ? "rgba(255,255,255,0.7)" : ed.color.hex }}>
                        {ed.label}
                      </p>
                      <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-white">
                        {ed.location}
                      </h2>
                      <p className="mt-3 text-base leading-7 text-white/70">{ed.theme}</p>
                    </div>
                    <div className="grid gap-2 text-base text-white/60">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" style={{ color: ed.color.hex }} />
                        <span>{ed.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" style={{ color: ed.color.hex }} />
                        <span>{ed.location}</span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SPOTLIGHT ── */}
      <Section color={accent} intensity={0.06}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em]" style={{ color: accent.hex }}>
              Spotlight
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
              {current.spotlightTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/70">{current.spotlightText}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/event/programme"
                className="rounded-full px-6 py-3 text-base font-semibold text-white transition hover:opacity-80"
                style={{
                  border: `1px solid rgba(${accent.rgb}, 0.5)`,
                  background: `rgba(${accent.rgb}, 0.12)`,
                }}
              >
                Download Programme
              </Link>
              <Link
                href="/get-tickets"
                className="rounded-full px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
                style={{ background: accent.hex }}
              >
                Register Now
              </Link>
            </div>
          </div>

          <div
            className="overflow-hidden rounded-[24px]"
            style={{ border: `1px solid rgba(${accent.rgb}, 0.25)`, boxShadow: `0 20px 50px rgba(${accent.rgb}, 0.12)` }}
          >
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
      </Section>

      {/* ── HIGHLIGHT FORMATS ── */}
      <Section color={C.gold} intensity={0.07}>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.gold.hex }}>
            Highlight Formats
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
            Featured deal room elements
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {current.cards.map((card) => {
            const Icon = card.icon;
            return (
              <article
                key={card.title}
                className="rounded-[22px] p-6 shadow-sm transition hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${C.gold.rgb}, 0.22)`,
                }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ background: `rgba(${C.gold.rgb}, 0.15)` }}
                >
                  <Icon className="h-5 w-5" style={{ color: C.gold.hex }} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{card.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{card.text}</p>
              </article>
            );
          })}
        </div>
      </Section>

      {/* ── FOCUS AREAS ── */}
      <Section color={C.olive} intensity={0.06}>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.olive.hex }}>
              Focus Areas
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
              Edition-specific focus blocks
            </h2>
          </div>

          <div className="grid gap-4">
            {current.featuredBlocks.map((block) => (
              <div
                key={block.title}
                className="rounded-[20px] p-5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: `1px solid rgba(${C.olive.rgb}, 0.22)`,
                }}
              >
                <h3 className="text-xl font-semibold text-white">{block.title}</h3>
                <p className="mt-3 text-base leading-7 text-white/70">{block.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── STRATEGIC OUTPUTS ── */}
      <Section color={C.pink} intensity={0.07}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em]" style={{ color: C.pink.hex }}>
              Strategic Outputs
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
              Expected pipeline outcomes
            </h2>
            <p className="mt-5 text-base leading-8 text-white/70">
              Moving clean-energy and critical-mineral projects from opportunity to capital through a structured pipeline linking Kigali and Perth[cite: 3].
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {current.outcomeCards.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-[18px] p-4"
                style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(${C.pink.rgb}, 0.2)` }}
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" style={{ color: C.pink.hex }} />
                <p className="text-base leading-7 text-white/80">{item}</p>
              </div>
            ))}

            <div
              className="flex gap-3 rounded-[18px] p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(${C.pink.rgb}, 0.2)` }}
            >
              <Users className="mt-0.5 h-5 w-5 shrink-0" style={{ color: C.pink.hex }} />
              <p className="text-base leading-7 text-white/80">
                A unified project and collaborative pipeline connecting two cities.
              </p>
            </div>

            <div
              className="flex gap-3 rounded-[18px] p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(${C.pink.rgb}, 0.2)` }}
            >
              <FileText className="mt-0.5 h-5 w-5 shrink-0" style={{ color: C.pink.hex }} />
              <p className="text-base leading-7 text-white/80">
                Actionable tracking ensuring every introduction is followed through.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── CTA ── */}
      <Section color={C.purple} intensity={0.06}>
        <div
          className="rounded-[28px] px-6 py-8 text-white md:px-10 md:py-10"
          style={{
            background: `linear-gradient(135deg, rgba(${C.purple.rgb}, 0.45), rgba(${C.teal.rgb}, 0.25))`,
            border: `1px solid rgba(${C.purple.rgb}, 0.4)`,
            boxShadow: `0 18px 50px rgba(${C.purple.rgb}, 0.2)`,
          }}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Discover more
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Explore the full programme or browse the gallery
              </h2>
              <p className="mt-3 text-base leading-7 text-white/80">
                Move from headline highlights to the full programme flow and the wider event experience.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/event/programme"
                className="rounded-full px-6 py-3 text-base font-semibold transition hover:opacity-90"
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                }}
              >
                Download Programme
              </Link>

              <Link
                href="/media/gallery"
                className="rounded-full px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
                style={{ background: C.purple.hex }}
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}