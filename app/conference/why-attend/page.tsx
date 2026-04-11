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
      "Build visibility, strengthen brand positioning, and connect directly with decision-makers across the clean energy ecosystem.",
    benefits: [
      "Unmatched brand visibility by positioning your organisation at the forefront of clean energy dialogue and innovation.",
      "Targeted audience engagement with investors, policymakers, partners, and industry stakeholders.",
      "Corporate social responsibility alignment through support for sustainability, transition, and long-term energy impact.",
      "Thought leadership opportunities through speaking sessions, panels, workshops, and brand-led discussion spaces.",
      "High-value ROI through premium networking access, media visibility, and strategic sponsorship benefits.",
    ],
  },

  exhibitors: {
    label: "Exhibitors",
    title: "Exhibitors",
    image: "/images/conference/why-attend-exhibitors.jpg",
    alt: "Exhibition booths at a conference",
    intro:
      "Showcase your solutions directly to a qualified audience looking for technologies, services, and implementation partners.",
    benefits: [
      "Present products and services in a highly relevant clean energy business environment.",
      "Generate qualified leads from delegates, buyers, investors, and institutional stakeholders.",
      "Demonstrate innovation through live engagement and in-person product storytelling.",
      "Increase credibility by exhibiting alongside respected brands and sector leaders.",
      "Open doors to partnerships, procurement conversations, and long-term commercial opportunities.",
    ],
  },

  delegates: {
    label: "Delegates",
    title: "Delegates",
    image: "/images/conference/why-attend-delegates.jpg",
    alt: "Conference delegates in discussion",
    intro:
      "Access strategic insight, senior-level networking, and practical industry conversations that support better decision-making.",
    benefits: [
      "Gain direct insight into clean energy trends, investment priorities, and market developments.",
      "Learn from senior speakers, policymakers, and operators across the value chain.",
      "Build strong professional relationships with peers, partners, suppliers, and institutional actors.",
      "Discover new technologies, solutions, and business models shaping the energy transition.",
      "Leave with practical knowledge, useful contacts, and a stronger view of sector direction.",
    ],
  },

  "learning-institutions": {
    label: "Learning Institutions",
    title: "Learning Institutions",
    image: "/images/conference/why-attend-learning.jpg",
    alt: "Academic and research participation at a conference",
    intro:
      "Participate in the conference as a bridge between research, innovation, skills development, and industry application.",
    benefits: [
      "Showcase research, training programmes, and institutional initiatives to industry and policy stakeholders.",
      "Build relationships with companies, public institutions, and innovation partners.",
      "Connect students, faculty, and researchers to real market conversations and opportunities.",
      "Support thought leadership in sustainability, engineering, policy, and energy systems.",
      "Identify collaboration opportunities around talent development, innovation, and sector advancement.",
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
          <div className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
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
                    className={`border-r border-slate-200 px-6 py-4 text-sm font-semibold transition ${
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
                    <p className="text-sm leading-7 text-[color:var(--text-main)]-700">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tickets"
                  className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
                >
                  Register Now
                </Link>

                <Link
                  href="/partners"
                  className="btn-outline-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
                >
                  Explore Opportunities
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}