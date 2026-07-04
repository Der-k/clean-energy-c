"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const speakerQuotes = [
  {
    text: "Founder of Gathoni Muchai Investments, actively engaged in the mining and metals sector. Currently CEO of Marula Mining Plc, a London-listed company focusing on battery metals, lithium production, and copper and graphite projects.",
    name: "Jason Paul Brewer",
    role: "CEO, Marula Mining Plc",
  },
  {
    text: "Led the planning and construction of high voltage transmission infrastructure, increasing the national grid by 6,000km of transmission lines and 76 substations — resulting in an additional 6,400MVA transformation capacity.",
    name: "Dr. Eng. John M. Mativo",
    role: "Executive Director, LITES",
  },
  {
    text: "Driven by a strong commitment to climate action, founded EcoGreen Solutions to address the urgent need for clean, efficient, safe, and affordable cooking solutions for households across Rwanda.",
    name: "Umutoniwase Anitha",
    role: "Founder & CEO, EcoGreen Solutions Ltd",
  },
  {
    text: "Specialises in unlocking the financial viability of regenerative value chains — integrating agriculture, forestry, and technology to mitigate climate change while driving rural economic growth.",
    name: "Jacktone Mboya",
    role: "CEO, Hung Pump Kenya",
  },
  {
    text: "Managed a Clean Development Mechanism programme enabling more than 800,000 households to transition from traditional cooking methods while delivering measurable environmental and social benefits.",
    name: "Jean Paul Ndayisabye",
    role: "Climate Finance & Carbon Markets Expert",
  },
];

const featuredSpeakers = [
  {
    name: "Hon. Opiyo Wandayi",
    role: "Cabinet Secretary, Petroleum & Energy",
    organization: "Government of Kenya",
    image: "/images/speakers/opiyo-wandayi.jpg",
    edition: "Kigali",
  },

     {
            name: "Hon. Dr. Deborah Mulongo",
            role: "Cabinet Secretary, Ministry of Environment, Climate Change & Forestry",
            organization: "Government of Kenya",
            image: "/images/speakers/deborah-mulongo.jpg",
          },
  {
    name: "Jason Paul Brewer",
    role: "Chief Executive Officer",
    organization: "Marula Mining Plc",
    image: "/images/speakers/jason-brewer.jpg",
    edition: "Kigali",
  },
 {
  name: "Professor George Kimathi",
  role: "Professor of Applied Mathematics and Higher Education Leader",
  organization: "To be confirmed",
  image: "/images/speakers/george-kimathi.jpg",
  bio: "Professor George Kimathi is a distinguished academic, researcher, and higher education leader with extensive experience in teaching, research, university administration, and institutional governance."
},
  {
    name: "Umutoniwase Anitha",
    role: "Founder & CEO",
    organization: "EcoGreen Solutions Ltd",
    image: "/images/speakers/umutoniwase-anitha.jpeg",
    edition: "Kigali",
  },

];

const editions = [
  { label: "Kigali Edition", date: "6–7 Aug 2026", location: "Kigali Marriott Hotel, Rwanda" },
  { label: "Perth Edition", date: "31 Aug – 1 Sept 2026", location: "Novotel Hotel Perth, WA" },
];

function RotatingQuote() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % speakerQuotes.length);
        setVisible(true);
      }, 600);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const quote = speakerQuotes[index];

  return (
    <div className="relative border-t border-b border-white/10 py-20 my-16 overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -left-4 select-none font-serif leading-none text-white/20 md:-left-2"
        style={{ fontSize: "clamp(160px, 18vw, 280px)", lineHeight: 1 }}
      >
        &ldquo;
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-4 select-none font-serif leading-none text-white/20 md:-right-2"
        style={{ fontSize: "clamp(160px, 18vw, 280px)", lineHeight: 1 }}
      >
        &rdquo;
      </span>

      <div
        className="relative max-w-5xl mx-auto text-center px-8 md:px-16"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <p
          className="font-bold text-white"
          style={{
            fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
          }}
        >
          {quote.text}
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-[#10b981]" />
          <p className="text-base font-bold text-[#10b981]">{quote.name}</p>
          <span className="text-white/30">·</span>
          <p className="text-base text-white/55">{quote.role}</p>
          <span className="h-px w-10 bg-[#10b981]" />
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {speakerQuotes.map((_, i) => (
            <button
              key={i}
              onClick={() => { setVisible(false); setTimeout(() => { setIndex(i); setVisible(true); }, 600); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-[#10b981]" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Go to quote ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SpeakersPreview() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#020266] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#10b981]">
              Confirmed speakers
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
              Meet the 2026 speakers
            </h2>
            <p className="mt-4 text-base leading-8 text-white/75">
              Senior policymakers, investors, and clean energy innovators confirmed
              across both conference editions.
            </p>
          </div>

          <div className="flex flex-col gap-2 md:items-end shrink-0">
            {editions.map((e) => (
              <div
                key={e.label}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2"
              >
                <MapPin className="h-3.5 w-3.5 text-[#10b981] shrink-0" />
                <span className="text-[12px] font-medium text-white/80">
                  <span className="font-semibold text-white">{e.label}</span>
                  {" · "}
                  {e.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSpeakers.map((speaker, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && !isHovered;

            return (
              <article
                key={speaker.name}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative overflow-hidden rounded-2xl border bg-white/[0.06] transition-all duration-500 ease-out ${
                  isHovered
                    ? "z-10 -translate-y-2 scale-[1.04] border-[#10b981]/40 shadow-[0_28px_56px_rgba(0,0,0,0.5),0_0_0_1px_rgba(16,185,129,0.15)]"
                    : "border-white/10"
                } ${isDimmed ? "opacity-60 blur-[2px] scale-[0.98]" : "opacity-100"}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 70%)",
                    opacity: isHovered ? 1 : 0,
                  }}
                />

                {/* Image — grows and stays sharp when its own card is hovered */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.05]">
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover object-top transition-transform duration-500 ease-out ${
                      isHovered ? "scale-[1.12]" : "scale-100"
                    }`}
                  />

                  {/* Edition badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-block rounded-full border border-[#10b981]/25 bg-[#10b981]/15 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#10b981] backdrop-blur-sm">
                      {speaker.edition}
                    </span>
                  </div>
                </div>

                {/* Info — always visible, accent brightens when its card is hovered */}
                <div className="p-4">
                  <p className="text-[13px] font-bold leading-tight text-white">
                    {speaker.name}
                  </p>
                  <p className="mt-1 text-[11px] leading-snug text-white/55">
                    {speaker.role}
                  </p>
                  <p
                    className={`mt-1 text-[11px] font-semibold transition-colors duration-500 ${
                      isHovered ? "text-[#34d399]" : "text-[#10b981]"
                    }`}
                  >
                    {speaker.organization}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-[#10b981] to-[#34d399] transition-all duration-500 ease-out"
                  style={{ width: isHovered ? "100%" : "0%" }}
                />
              </article>
            );
          })}
        </div>

        <RotatingQuote />

        <div className="flex flex-wrap items-center justify-center gap-4">

          <Link
            href="/speakers"
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden rounded-full
              bg-white px-7 py-3.5
              text-[15px] font-semibold text-[#02026e]
              shadow-[0_8px_24px_rgba(255,255,255,0.12)]
              transition-all duration-300
              hover:shadow-[0_14px_36px_rgba(255,255,255,0.18)]
              hover:scale-[1.03]
              active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#020266]
            "
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 -translate-x-full bg-[#02026e] transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              View all speakers
            </span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
          </Link>

          <Link
            href="/contact"
            className="
              group relative inline-flex items-center justify-center gap-2
              overflow-hidden rounded-full
              border border-white/30 bg-white/[0.07]
              px-7 py-3.5
              text-[15px] font-semibold text-white
              backdrop-blur-sm
              transition-all duration-300
              hover:border-white/60
              hover:scale-[1.03]
              active:scale-[0.97]
              focus:outline-none focus:ring-2 focus:ring-white/25 focus:ring-offset-2 focus:ring-offset-[#020266]
            "
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
            </span>
            <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">
              Speaker enquiry
            </span>
          </Link>

        </div>
      </div>
    </section>
  );
}