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
  bio: "Professor George Kimathi is a distinguished academic, researcher, and higher education leader with extensive experience in teaching, research, university administration, and institutional governance. He holds a Doctor of Philosophy (PhD) in Applied Mathematics and a Master of Science in Applied Mathematics from the University of Nairobi, as well as a Bachelor of Science in Mathematics with Education (Physics and Chemistry) from the University of Eastern Africa, Baraton, where he graduated summa cum laude. He also holds a Postgraduate Certificate in Academic Practice from York St. John’s University in the United Kingdom and is a Fellow of the Higher Education Academy (UK).\n\nA Certified Bioethicist, Professor Kimathi has played a key role in establishing and managing Institutional Scientific Research Ethics Review Boards, ensuring the highest ethical standards throughout research processes. His scholarly work spans multiple disciplines, including Applied Mathematics, Psychology, Ecology, Dynamical Systems, Disease Modelling, Species Competition, and the application of Artificial Intelligence in teaching and learning. He has published extensively and presented research at numerous international conferences.\n\nThroughout his distinguished career, Professor Kimathi has held several senior leadership positions, including Acting Vice Chancellor, Deputy Vice Chancellor, University Registrar, Faculty Dean, Head of Department, and University Examinations Officer. In these roles, he has successfully led initiatives that enhanced institutional effectiveness, academic quality, governance, and operational efficiency across higher education institutions.\n\nProfessor Kimathi is deeply committed to mentorship and academic development, having supervised numerous Master's and PhD students to successful completion. His innovative teaching methods, dedication to student success, and passion for research have earned him widespread recognition within the academic community.\n\nIn addition to his academic leadership, Professor Kimathi is a highly skilled data analyst with expertise in big data analytics and business intelligence platforms, including Power BI. His ability to transform complex datasets into actionable insights has supported evidence-based decision-making and strengthened research outcomes across diverse fields.\n\nRecognized for his contributions to education, research, and institutional leadership, Professor Kimathi continues to be a respected voice in higher education, research ethics, data analytics, and academic innovation, inspiring students, scholars, and professionals across the region and beyond."
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

      {/* Opening quote mark — large, visible, top-left */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -left-4 select-none font-serif leading-none text-white/20 md:-left-2"
        style={{ fontSize: "clamp(160px, 18vw, 280px)", lineHeight: 1 }}
      >
        &ldquo;
      </span>

      {/* Closing quote mark — large, visible, bottom-right */}
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

        {/* Dot indicators */}
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
  return (
    <section className="bg-[#020266] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* ── Header ── */}
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

          {/* Edition pills */}
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

        {/* ── Speaker grid ── */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredSpeakers.map((speaker) => (
            <article
              key={speaker.name}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] transition-all duration-500 hover:-translate-y-2 hover:border-[#10b981]/40 hover:shadow-[0_28px_56px_rgba(0,0,0,0.5),0_0_0_1px_rgba(16,185,129,0.15)]"
            >
              {/* Emerald glow that blooms on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.12) 0%, transparent 70%)" }}
              />

              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white/[0.05]">
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                />

                {/* Dark scrim — only on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020266]/80 via-[#020266]/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Name + role slides up from bottom on hover */}
                <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[15px] font-bold leading-tight text-white drop-shadow">
                    {speaker.name}
                  </p>
                  <p className="mt-1 text-[12px] leading-snug text-white/75">
                    {speaker.role}
                  </p>
                  <p className="mt-1 text-[12px] font-semibold text-[#10b981]">
                    {speaker.organization}
                  </p>
                </div>

                {/* Edition badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-block rounded-full border border-[#10b981]/25 bg-[#10b981]/15 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[#10b981] backdrop-blur-sm">
                    {speaker.edition}
                  </span>
                </div>
              </div>

              {/* Info — visible at rest, fades out on hover */}
              <div className="p-4 transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-1">
                <p className="text-[13px] font-bold leading-tight text-white">
                  {speaker.name}
                </p>
                <p className="mt-1 text-[11px] leading-snug text-white/55">
                  {speaker.role}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-[#10b981]">
                  {speaker.organization}
                </p>
              </div>

              {/* Emerald bottom bar sweeps in on hover */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#10b981] to-[#34d399] transition-all duration-500 ease-out group-hover:w-full" />
            </article>
          ))}
        </div>

        {/* ── Rotating speaker quote ── */}
        <RotatingQuote />

        {/* ── CTAs ── */}
        <div className="flex flex-wrap items-center justify-center gap-4">

          {/* Primary — white fill with blue sweep */}
          <Link
            href="/conference/speakers"
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

          {/* Secondary — ghost with white sweep */}
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