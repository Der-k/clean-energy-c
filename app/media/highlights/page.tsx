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

// ── Card helper ──────────────────────────────────────────────────────────────
function Card({
  children,
  color,
  className = "",
}: {
  children: React.ReactNode;
  color: typeof C[keyof typeof C];
  className?: string;
}) {
  return (
    <div
      className={`rounded-[22px] p-5 shadow-sm transition ${className}`}
      style={{
        background: `rgba(${color.rgb}, 0.08)`,
        border: `1px solid rgba(${color.rgb}, 0.22)`,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ─────────────────────────────────────────────────────────────────────
type EditionKey = "kigali" | "perth";

const editions = {
  kigali: {
    key: "kigali" as EditionKey,
    label: "Kigali Edition",
    date: "6–7 August 2026",
    location: "Kigali Marriott Hotel, Rwanda",
    theme:
      "East Africa energy transition, regional integration, geothermal, climate finance, clean mobility, and decentralized systems.",
    heroImage: "/images/highlights/kigali-highlight-hero.jpeg",
    spotlightTitle: "Programme highlights from the Kigali edition",
    spotlightText:
      "The Kigali edition emphasizes East Africa's energy transition and Rwanda's position as a hub for clean mobility, innovation-led policy, regional integration, and climate-focused energy growth.",
    color: C.orange,
    cards: [
      { title: "High-Level Plenaries", text: "Discussions on renewable energy policy, regional cooperation, and frameworks for grid integration.", icon: Landmark },
      { title: "Technical Workshops", text: "Sessions on energy storage, financing models, critical minerals, and regulatory reform.", icon: Lightbulb },
      { title: "Innovation Expo", text: "An exhibition showcasing renewable energy technologies from Africa and Australia.", icon: Sparkles },
      { title: "Investor Roundtables", text: "Targeted engagement connecting project developers with financiers and development institutions.", icon: Handshake },
    ],
    featuredBlocks: [
      { title: "Regional integration focus", text: "Highlights cross-border energy cooperation, regional power pools, and stronger East African institutional partnerships." },
      { title: "Climate finance and green industrialization", text: "Focuses on financing pathways and industrial opportunities that support long-term low-carbon growth." },
      { title: "Innovation-led clean mobility", text: "Reflects Rwanda's growing visibility in clean mobility, sustainable urban systems, and policy-led innovation." },
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
    heroImage: "/images/highlights/perth-highlight-hero.jpeg",
    spotlightTitle: "Programme highlights from the Perth edition",
    spotlightText:
      "The Perth edition is positioned as a strategic bridge between African clean energy priorities and Australian finance, mining innovation, hydrogen expertise, storage capability, and ESG leadership frameworks.",
    color: C.teal,
    cards: [
      { title: "Capital & Investment Lens", text: "Connects African clean energy priorities to Australian capital markets and investment ecosystems.", icon: Landmark },
      { title: "Mining & Critical Minerals", text: "Highlights advanced mining technologies and the role of minerals in future clean energy value chains.", icon: Lightbulb },
      { title: "Green Hydrogen & Storage", text: "Brings focus to next-generation hydrogen and storage innovation relevant to long-term transition planning.", icon: Sparkles },
      { title: "ESG Leadership Frameworks", text: "Explores governance, sustainability, and responsible industry models shaping future partnerships.", icon: Handshake },
    ],
    featuredBlocks: [
      { title: "Australia–Africa policy dialogue", text: "Strengthens long-term cooperation and policy exchange between African priorities and Australian market capability." },
      { title: "Investment and value-chain positioning", text: "Frames East African opportunity inside broader global critical minerals and renewable energy value chains." },
      { title: "Technology and market access", text: "Spotlights practical commercial links between mining technology, storage, hydrogen, and project development." },
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HighlightsPage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("kigali");
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

      {/* ── HERO ── teal accent ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ borderBottom: `1px solid rgba(${C.teal.rgb}, 0.2)` }}
      >
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full blur-3xl"
               style={{ background: `rgba(${C.teal.rgb}, 0.18)` }} />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full blur-3xl"
               style={{ background: `rgba(${C.orange.rgb}, 0.14)` }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-white/50">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span>Media</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white/80">Highlights</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em]"
               style={{ color: C.teal.hex }}>
              Highlights
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">
              Edition highlights and featured moments
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-white/70">
              Explore key highlights from the 2026 Kigali and Perth editions,
              including programme emphasis, showcase formats, and expected strategic outcomes.
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

      {/* ── SPOTLIGHT ── edition accent color ───────────────────────────────── */}
      <Section color={accent} intensity={0.06}>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em]"
               style={{ color: accent.hex }}>
              Spotlight
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
              {current.spotlightTitle}
            </h2>
            <p className="mt-5 text-base leading-8 text-white/70">{current.spotlightText}</p>

            <div className="mt-8 flex flex-wrap gap-3">
  <a
    href="/event/programme"
    className="rounded-full px-6 py-3 text-base font-semibold text-white transition hover:opacity-80"
    style={{
      border: `1px solid rgba(${accent.rgb}, 0.5)`,
      background: `rgba(${accent.rgb}, 0.12)`,
    }}
  >
    Download Programme
  </a>

  <a
    href="/get-tickets"
   
    className="rounded-full px-6 py-3 text-base font-semibold text-white transition hover:opacity-90"
    style={{ background: accent.hex }}
  >
    Register Now
  </a>
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

      {/* ── HIGHLIGHT FORMATS ── gold ────────────────────────────────────────── */}
      <Section color={C.gold} intensity={0.07}>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.22em]"
             style={{ color: C.gold.hex }}>
            Highlight Formats
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
            Featured programme elements
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
                  boxShadow: "0 0 0 0 transparent",
                }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 16px 36px rgba(${C.gold.rgb}, 0.14)`)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
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

      {/* ── FOCUS AREAS ── olive ─────────────────────────────────────────────── */}
      <Section color={C.olive} intensity={0.06}>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em]"
               style={{ color: C.olive.hex }}>
              Focus Areas
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
              Edition-specific highlight areas
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

      {/* ── STRATEGIC OUTPUTS ── pink ────────────────────────────────────────── */}
      <Section color={C.pink} intensity={0.07}>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em]"
               style={{ color: C.pink.hex }}>
              Strategic Outputs
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-white">
              Expected highlight outcomes
            </h2>
            <p className="mt-5 text-base leading-8 text-white/70">
              The concept note frames the conference as a platform for high-level dialogue,
              investment conversations, technical exchange, policy continuity, and partnership
              formation across the two editions.
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
                A flagship platform connecting governments, investors, utilities, innovators,
                and industry stakeholders.
              </p>
            </div>

            <div
              className="flex gap-3 rounded-[18px] p-4"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid rgba(${C.pink.rgb}, 0.2)` }}
            >
              <FileText className="mt-0.5 h-5 w-5 shrink-0" style={{ color: C.pink.hex }} />
              <p className="text-base leading-7 text-white/80">
                A platform for formal reports, policy dialogue, and structured cooperation mechanisms.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── CTA ── purple ────────────────────────────────────────────────────── */}
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
  <a
    href="/event/programme"
    className="rounded-full px-6 py-3 text-base font-semibold transition hover:opacity-90"
    style={{
      background: "rgba(255,255,255,0.15)",
      border: "1px solid rgba(255,255,255,0.3)",
      color: "#fff",
    }}
  >
    Download Programme
  </a>

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