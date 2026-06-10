"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronRight, CalendarDays, MapPin, X, Quote } from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

type EditionKey = "kigali" | "perth";

type Speaker = {
  name: string;
  role: string;
  organization: string;
  image: string;
  bio?: string;
};

type SpeakerGroup = {
  label: string;
  speakers: Speaker[];
};

// ─── Speaker Bio Modal ────────────────────────────────────────────────────────

function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-[32px] bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#02026e]/8 text-[#02026e] transition hover:bg-[#02026e]/15"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header */}
        <div className="flex gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#02026e]/8">
            <Image
              src={speaker.image}
              alt={speaker.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-gray-900 leading-tight">
              {speaker.name}
            </h3>
            <p className="mt-1 text-sm leading-5 text-gray-500">{speaker.role}</p>
            <p className="mt-0.5 text-sm font-semibold text-[#02026e]">
              {speaker.organization}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-100" />

        {/* Bio */}
        {speaker.bio ? (
          <div className="relative">
            <Quote className="absolute -left-1 -top-1 h-6 w-6 text-[#02026e]/15" />
            <div className="max-h-[300px] overflow-y-auto pr-2 pl-6">
              {speaker.bio.split(/\n\n/).map((para, i) => (
                <p key={i} className="mb-3 text-base leading-7 text-gray-600 last:mb-0">
                  {para.replace(/\n/g, " ")}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-base text-gray-400 italic">
            Full biography coming soon.
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Speaker Card ─────────────────────────────────────────────────────────────

function SpeakerCard({ speaker }: { speaker: Speaker }) {
  const [open, setOpen] = useState(false);
  const hasBio = Boolean(speaker.bio);

  return (
    <>
      <article
        onClick={() => hasBio && setOpen(true)}
        className={`group relative overflow-hidden rounded-[22px] border border-[#02026e]/15 bg-white shadow-sm transition-all duration-300
          ${hasBio ? "cursor-pointer hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(2,2,110,0.13)] hover:border-[#02026e]/30" : ""}`}
      >
        {/* Image */}
        <div className="relative aspect-[4/4.2] w-full overflow-hidden bg-[#02026e]/5">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-[1.04]"
          />
         {hasBio && (
  <div className="absolute inset-0 bg-gradient-to-t from-[#02026e]/92 via-[#02026e]/55 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4 gap-2">
    <p className="text-[12px] leading-[1.55] text-white/88 line-clamp-3">
      {speaker.bio}
    </p>
    <span className="text-[11px] font-bold uppercase tracking-widest text-white flex items-center gap-1">
      Read full bio →
    </span>
  </div>
)}
        </div>

        {/* Info */}
        <div className="p-5">
          {hasBio && (
            <span className="mb-2 inline-block rounded-full bg-[#02026e]/8 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#02026e]">
              Full Bio
            </span>
          )}
          <h3 className="font-heading text-[1.05rem] font-bold leading-tight text-gray-900">
            {speaker.name}
          </h3>
          <p className="mt-1.5 text-sm leading-5 text-gray-500">{speaker.role}</p>
          <p className="mt-1 text-sm font-semibold text-[#02026e]">
            {speaker.organization}
          </p>
        </div>

        {hasBio && (
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#02026e] to-[#3535c4] transition-all duration-300 group-hover:w-full" />
        )}
      </article>

      {open && <SpeakerModal speaker={speaker} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

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
        label: "Keynote Speakers",
        speakers: [
          {
            name: "Hon. Dr. Jimmy Gasore",
            role: "Minister of Infrastructure",
            organization: "Government of Rwanda",
            image: "/images/speakers/jimmy-gasore.jpg",
            bio: "Dr. Jimmy Gasore is the Minister of Infrastructure. Dr. Gasore holds a Ph.D. degree in Atmospheric Sciences from Massachusetts Institute of Technology (MIT) and is a former lecturer at the University of Rwanda.\n\nSince 2013, Dr. Gasore has led the establishment of the Rwanda Climate Observatory; a comprehensive field station that monitors atmospheric composition related to climate change, air pollution, and ozone depletion. The first and only one of its kind on the African continent.",
          },
          {
            name: "Hon. Opiyo Wandayi",
            role: "Cabinet Secretary, Ministry of Petroleum and Energy",
            organization: "Government of Kenya",
            image: "/images/speakers/opiyo-wandayi.jpg",
            bio: "The Hon. James Opiyo Wandayi, EGH, is the Cabinet Secretary for Energy and Petroleum. Prior to joining elective politics, Mr. Wandayi had acquired extensive experience in strategic and operational management, and people leadership within a multinational business environment.",
          },

          {
            name: "Hon. Dr. Deborah Mulongo",
            role: "Cabinet Secretary, Ministry of Environment, Climate Change & Forestry",
            organization: "Government of Kenya",
            image: "/images/speakers/deborah-mulongo.jpg",
          },
          
          {
            name: "Rev. Dr. CPA CS Patrick Omutia, CBS",
            role: "Special Secretary Productivity, Office of the President",
            organization: "Government of Kenya",
            image: "/images/speakers/patrick-omutia.jpg",
            bio: "Rev. Dr. Omutia drives national productivity initiatives in the Office of Chief of Staff and Head of the Public Service, by developing and implementing strategies, programs, and mechanisms to enhance efficiency across the public sector, ensuring alignment with Kenya's broader public service reforms and performance goals and the BETA agenda.",
          },
          {
            name: "Umutoniwase Anitha",
            role: "Founder and CEO",
            organization: "EcoGreen Solutions Ltd",
            image: "/images/speakers/umutoniwase-anitha.jpeg",
            bio: "Umutoniwase Anitha is the Founder and CEO of EcoGreen Solutions Ltd, a Rwandan renewable energy company providing clean cooking technologies, including LPG systems, improved cookstoves, and biomass pellets. She is an experienced Project and Human Resource Manager, holding an MBA in Project Management, with over ten years of professional experience implementing peacebuilding and social justice initiatives.\n\nDriven by a strong commitment to climate action and human rights, Anitha founded EcoGreen Solutions Ltd to address the urgent need for clean, efficient, safe, and affordable cooking solutions for households across Rwanda. Through a market-based approach, she is contributing to reducing harmful emissions across the region.",
          },
          {
            name: "Tonny Mutuku",
            role: "Chief Executive Director",
            organization: "Rockwill Green Energy East Africa Ltd.",
            image: "/images/speakers/tonny-mutuku.jpg",
          },
          {
            name: "Elison Karuhanga",
            role: "Partner",
            organization: "Kampala Associated Advocates",
            image: "/images/speakers/elison-karuhanga.jpg",
          },
          {
            name: "Jason Paul Brewer",
            role: "Chief Executive Officer",
            organization: "Marula Mining Plc",
            image: "/images/speakers/jason-brewer.jpg",
            bio: "Highly qualified mining engineer with an Honors Master's degree from Imperial College, London. Holds extensive experience in global mining, particularly in the UK, Australia, Canada, and South Africa. Formerly associated with major investment banks, specializing in financing mining projects, notably in Africa.\n\nFounder of Gathoni Muchai Investments, actively engaged in the mining and metals sector. Currently CEO of Marula Mining Plc, a London-listed company focusing on battery metals, lithium production, and copper and graphite projects.",
          },
          {
            name: "Dr. Eng. John M. Mativo",
            role: "Executive Director",
            organization: "Laser Infrastructure & Technology Solutions (LITES)",
            image: "/images/speakers/john-mativo.jpg",
            bio: "Dr. Eng. John M. Mativo currently works as the Executive Director of the Laser Infrastructure and Technology Solutions company (LITES), a subsidiary of CPF Group focusing on Infrastructure and ICT solutions.\n\nJohn is a Consulting Engineer with the Engineers Board of Kenya (EBK), a Fellow of the Institution of Engineers of Kenya (IEK) and a Certified Public Private Partnership Professional (CP3P). He has more than thirty (30) years of cumulative working and consulting experience in both public and private sectors in Kenya.\n\nEng. Mativo previously worked for the Kenya Electricity Transmission Company, rising from General Manager, Technical Services to Managing Director. During that period, he led the planning and construction of high voltage transmission infrastructure, increasing the national grid by 6,000km of transmission lines and 76 substations resulting in additional 6,400MWA transformation capacity.\n\nDr. Mativo finalized the commercial closure of seven transmission infrastructure projects valued at US$ 1 billion.",
          },
          {
            name: "Mr. Paulin Mburano",
            role: "Founder and Managing Director",
            organization: "Waste Power Plant Limited",
            image: "/images/speakers/paulin-mburano.jpg",
          },
          {
            name: "Jacktone Mboya",
            role: "Chief Executive Officer",
            organization: "Hung Pump Kenya",
            image: "/images/speakers/jacktone-mboya.jpg",
            bio: "Jacktone is the Chief Executive Officer of Hung Pump Kenya, a pioneering agroforestry firm established in 2017 that transforms climate action into high-yield commercial opportunities. He holds a Bachelor's degree in Marketing, is a Chartered Marketer, and is currently pursuing his Master's degree in Sustainable Development Studies.\n\nUnder his leadership, the firm designs and manages large-scale, nature-based projects integrating agriculture, forestry, and technology to mitigate climate change while driving rural economic growth. With deep expertise in the restoration economy, Jacktone specializes in unlocking the financial viability of regenerative value chains.\n\nAt the Africa-Australia Clean Energy Conference 2026, Jacktone highlights how nature-based solutions and Carbon Capture, Utilization, and Storage (CCUS) serve as vital mechanisms for the mining and energy sectors to offset hard-to-abate emissions and secure social license to operate. His insights provide global energy and extraction leaders with actionable frameworks for integrating carbon trade markets, agroforestry, and landscape restoration into their ESG strategies—ensuring a just, inclusive, and profitable transition to net-zero.",
          },
          {
  name: "Munyemana Jean Pierre",
  role: "Chief Executive Officer",
  organization: "Egera Umuhinzi Initiative",
  image: "/images/speakers/munyemana-jean-pierre.jpg",
  bio: "Jean Pierre Munyemana is an agronomist and the founder of Egera Umuhinzi Initiative, a platform bridging agricultural research, policy, and on-the-ground farmer adoption in Rwanda. He is also the Managing Director of SMARTFARM Solutions Ltd, where he leads the deployment of practical, climate-smart agricultural solutions aimed at improving productivity and resilience for smallholder farmers.\n\nWith experience spanning regenerative agriculture, agroforestry, and farmer extension, Jean Pierre has worked with institutions including MINAGRI and RAB to translate policy into actionable practices at scale. His work focuses on integrating agriculture and energy systems through circular economy models, converting agricultural waste into organic fertilizers and biogas to reduce costs and improve sustainability for farmers.\n\nThrough his leadership, he continues to champion innovative approaches that strengthen food security, environmental stewardship, and rural economic development across Rwanda and the wider region."
}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SpeakersPage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);

  return (
    <main className="pt-24 bg-white">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-gray-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-700">Speakers</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Speakers
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-5xl">
              Conference speakers
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-600">
              Meet the confirmed speakers for each 2026 edition. Click any card with a{" "}
              <span className="inline-flex items-center rounded-full bg-[#02026e]/8 px-2 py-0.5 text-sm font-semibold text-[#02026e]">
                Full Bio
              </span>{" "}
              badge to read their full profile.
            </p>
          </div>

          {/* Edition switcher */}
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {editionOrder.map((editionKey) => {
              const edition = editions[editionKey];
              const isActive = activeEdition === editionKey;
              return (
                <button
                  key={editionKey}
                  type="button"
                  onClick={() => setActiveEdition(editionKey)}
                  className={`rounded-[24px] border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#02026e] bg-gradient-to-br from-[#02026e] to-[#010150] text-white shadow-[0_18px_36px_rgba(2,2,110,0.22)]"
                      : "border-[#02026e]/20 bg-white text-gray-900 shadow-sm hover:border-[#02026e]/40 hover:shadow-[0_16px_36px_rgba(2,2,110,0.10)]"
                  }`}
                >
                  <p className={`text-[13px] font-semibold uppercase tracking-[0.18em] ${isActive ? "text-white/70" : "text-[#02026e]"}`}>
                    {edition.label}
                  </p>
                  <div className="mt-4 grid gap-2 text-base">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4" />
                      <span>{edition.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{edition.location}</span>
                    </div>
                  </div>
                  <p className={`mt-4 text-base leading-7 ${isActive ? "text-white/80" : "text-gray-600"}`}>
                    {edition.intro}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Speaker groups ── */}
      {current.groups.map((group, index) => (
        <SectionShell key={group.label} muted={index % 2 === 1}>
          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              {current.label}
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-gray-900">
              {group.label}
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {group.speakers.map((speaker) => (
              <SpeakerCard
                key={`${group.label}-${speaker.name}`}
                speaker={speaker}
              />
            ))}
          </div>
        </SectionShell>
      ))}

      {/* ── CTA ── */}
      <SectionShell>
        <div className="rounded-[28px] border border-[#02026e]/30 bg-gradient-to-r from-[#02026e] to-[#010150] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.22)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Speaker updates
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                More speakers to be announced
              </h2>
              <p className="mt-3 text-base leading-7 text-white/80">
                The full speaker lineup is being finalised. Register your interest
                or get in touch to enquire about speaking opportunities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[#02026e] transition hover:bg-white/90"
              >
                Speaker Enquiry
              </Link>
              <a
                href="/get-tickets"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
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