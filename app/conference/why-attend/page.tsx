"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";

type AudienceKey =
  | "sponsors"
  | "exhibitors"
  | "delegates"
  | "learning-institutions";

const audienceContent: Record<
  AudienceKey,
  {
    label: string;
    title: string;
    image: string;
    alt: string;
    intro: string;
    benefits: string[];
  }
> = {
  sponsors: {
    label: "Sponsors",
    title: "Sponsors",
    image: "/images/conference/why-attend-sponsors.jpg",
    alt: "Sponsors and business leaders networking",
    intro:
      "Position your brand at the centre of Africa and Australia's clean energy transition, with visibility and access designed around senior decision-makers from both regions.",
    benefits: [
      "Brand visibility across the Conference Portal, online marketing materials, social media, and on-site signage seen by 600+ delegates.",
      "Direct engagement with government ministries, investors, policy influencers, and Fortune 500 firms shaping Africa's energy future.",
      "Thought-leadership platforms through speaking slots, panel sessions, and themed sponsorships aligned to your sector expertise.",
      "Flagship moments available, including Lead, Platinum, and Cocktail Reception sponsorships offering exclusive recognition and high-level engagement time.",
      "Reach beyond the room via 20,000+ email subscribers, 6,000+ social followers, and 100,000+ annual website views.",
    ],
  },

  exhibitors: {
    label: "Exhibitors",
    title: "Exhibitors",
    image: "/images/conference/why-attend-exhibitors.jpg",
    alt: "Exhibition booths at a conference",
    intro:
      "Showcase your technology, products, and services on the Innovation Expo floor, in front of buyers, project developers, and policymakers actively sourcing clean energy solutions.",
    benefits: [
      "Present innovations directly to decision-makers and project owners across renewable energy, mining, and critical minerals.",
      "Generate qualified leads in a growing market — 91% of past exhibitors call exhibiting vital to connecting with industry leaders.",
      "Connect with over 1,000 attendees, including government officials, Fortune 500 companies, and industry innovators.",
      "Network through structured B2B meetings, deal rooms, and partnership sessions built into the programme.",
      "Gain priority listing on the conference website and in the post-event directory, plus free entry to the opening cocktail.",
    ],
  },

  delegates: {
    label: "Delegates",
    title: "Delegates",
    image: "/images/conference/why-attend-delegates.jpg",
    alt: "Conference delegates in discussion",
    intro:
      "Get senior-level insight into renewable energy, grid modernisation, and critical minerals — and leave with the contacts and intelligence to act on it.",
    benefits: [
      "Hear from high-level plenaries and government ministries on energy diversification, green hydrogen, and regional cooperation.",
      "Go deep in technical workshops covering energy storage, financing models, critical minerals, and regulatory reform.",
      "Take part in investor roundtables and deal rooms connecting project developers directly with financiers.",
      "Take home the Australia-Africa Clean Energy Report 2026, a full analysis of opportunities, challenges, and investment trends.",
      "Build lasting relationships at a conference rated 90% for visitor satisfaction by past attendees.",
    ],
  },

  "learning-institutions": {
    label: "Learning Institutions",
    title: "Learning Institutions",
    image: "/images/conference/why-attend-learning.jpg",
    alt: "Academic and research participation at a conference",
    intro:
      "Bring research, talent, and innovation into direct conversation with the governments and companies building Africa's clean energy sector.",
    benefits: [
      "Present technical and research findings through dedicated Technical & Research Presentation sessions on energy, mining tech, and digital twins.",
      "Connect students, faculty, and researchers to investors, policymakers, and industry practitioners shaping the sector.",
      "Contribute to sessions on critical mineral research, including mineralization, resource mapping, and innovation.",
      "Support capacity-building goals aligned with Rwanda's Vision 2050 and the conference's long-term workforce objectives.",
      "Build institutional partnerships around technology transfer, talent development, and applied research.",
    ],
  },
};

const tabs: AudienceKey[] = [
  "sponsors",
  "exhibitors",
  "delegates",
  "learning-institutions",
];

export default function WhyAttendPage() {
  const [activeTab, setActiveTab] = useState<AudienceKey>("sponsors");
  const current = audienceContent[activeTab];

  return (
    <main className="min-h-screen bg-[#f4f6f8]">
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="flex flex-wrap items-center gap-2 text-base text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#009966]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/conference" className="hover:text-[#009966]">
              Conference
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Why Attend</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <h1 className="text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
          Why Attend
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-[color:var(--text-main)]-600">
          The Clean Energy Conference Africa Australia means something
          different depending on why you're in the room. Choose your role
          below to see what's in it for you.
        </p>

        <div className="mt-8 rounded-sm border border-slate-200 bg-white p-0 shadow-sm">
          <div className="overflow-x-auto border-b border-slate-200">
            <div className="flex min-w-max">
              {tabs.map((tab) => {
                const item = audienceContent[tab];
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`border-r border-slate-200 px-6 py-4 text-base font-semibold transition ${
                      isActive
                        ? "bg-[#009966] text-white"
                        : "bg-white text-[color:var(--text-main)]-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[420px_1fr] lg:gap-10">
            <div className="relative">
              <div className="absolute left-[-10px] top-[12px] hidden h-[85%] w-[18px] bg-[#009966] md:block" />
              <div className="relative overflow-hidden bg-slate-100">
                <div className="relative aspect-[4/5.8] w-full">
                  <Image
                    src={current.image}
                    alt={current.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 420px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="pt-1">
              <h2 className="text-3xl font-semibold text-[color:var(--text-main)]-900">
                {current.title}
              </h2>

              <p className="mt-4 max-w-3xl text-base leading-8 text-[color:var(--text-main)]-600">
                {current.intro}
              </p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {current.benefits.map((benefit) => (
                  <div key={benefit} className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#009966]" />
                    <p className="text-base leading-7 text-[color:var(--text-main)]-700">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {/* REGISTER NOW */}
                <Link
                  href="/tickets"
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    overflow-hidden

                    rounded-full px-6 py-3 text-base font-semibold text-white

                    bg-gradient-to-r from-[#007a55] via-[#009966] to-[#00b377]
                    bg-[length:200%_100%] bg-left

                    shadow-[0_12px_35px_rgba(0,153,102,0.28)]

                    transition-all duration-500 ease-out

                    hover:bg-right
                    hover:shadow-[0_18px_55px_rgba(0,153,102,0.35)]
                    hover:scale-[1.05]

                    active:scale-[0.97]

                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#009966]/40
                    focus:ring-offset-2
                  "
                >
                  <span className="relative z-10">Register Now</span>
                </Link>

                {/* EXPLORE OPPORTUNITIES */}
                <Link
                  href="/partners"
                  className="
                    group relative inline-flex items-center justify-center gap-2
                    overflow-hidden

                    rounded-full px-6 py-3 text-base font-semibold

                    text-[#02026e]
                    bg-white

                    border border-[#02026e]/30

                    shadow-[0_10px_25px_rgba(15,23,42,0.10)]

                    transition-all duration-500 ease-out

                    hover:text-white
                    hover:border-[#009966]

                    hover:shadow-[0_18px_55px_rgba(0,153,102,0.25)]
                    hover:scale-[1.05]

                    active:scale-[0.97]

                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#009966]/35
                    focus:ring-offset-2
                  "
                >
                  {/* white sweep */}
                  <span className="absolute inset-0 overflow-hidden rounded-full">
                    <span
                      className="
                        absolute left-0 top-0 h-full w-0

                        bg-white

                        transition-all duration-500 ease-out

                        group-hover:w-full
                      "
                    />
                  </span>

                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#02026e]">
                    Explore Opportunities
                  </span>

                  <ArrowRight
                    className="
                      relative z-10 h-4 w-4
                      transition-all duration-300
                      group-hover:translate-x-1
                      group-hover:text-[#02026e]
                    "
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}