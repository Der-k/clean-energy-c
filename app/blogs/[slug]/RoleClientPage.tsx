// app/blogs/[slug]/RoleClientPage.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { rolesContent, editions } from "@/data/rolesData";

interface RoleClientPageProps {
  slug: string;
}

export default function RoleClientPage({ slug }: RoleClientPageProps) {
  // Lookup happens client-side now, so icon components (functions) never
  // need to be serialized across the server -> client boundary.
  const data = rolesContent[slug];

  if (!data) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-16 px-6 max-w-7xl mx-auto space-y-16">
      
      {/* 1. Dynamic Hero Intro block */}
      <header className="space-y-4 max-w-3xl">
        <span className="text-xs font-bold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full">
          {data.eyebrow}
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-slate-900">
          {data.heading}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {data.paragraph}
        </p>
      </header>

      {/* 2. Highlights Dynamic Grid Mapping */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.highlights.map((highlight, idx) => {
          const HighlightIcon = highlight.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="p-2 w-fit bg-emerald-50 rounded-lg text-emerald-600">
                <HighlightIcon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-800">{highlight.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{highlight.description}</p>
            </motion.div>
          );
        })}
      </section>

      {/* 3. Metrics & Key Outcomes Matrix */}
      <section className="grid gap-8 lg:grid-cols-2 border-t border-slate-200 pt-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">{data.whyMattersSubheading}</h2>
          <ul className="space-y-3">
            {data.outcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Numeric Badges */}
        <div className="grid gap-6 sm:grid-cols-2 h-fit">
          {data.stats.map((stat, idx) => (
            <div key={idx} className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl space-y-2">
              <span className="text-4xl font-black tracking-tight block text-emerald-400">{stat.value}</span>
              <p className="text-xs text-slate-300 leading-normal">{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Target Demographics Loop */}
      <section className="space-y-6 border-t border-slate-200 pt-12">
        <h2 className="text-xl font-bold text-slate-900">{data.audienceLabel}</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.audience.map((item, idx) => {
            const AudienceIcon = item.icon;
            return (
              <div key={idx} className="flex gap-4 p-4 bg-slate-100 rounded-lg items-start">
                <div className="p-2 bg-white rounded-md text-slate-700 shadow-xs shrink-0">
                  <AudienceIcon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-800">{item.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Fixed Event Logistics Block */}
      <section className="border-t border-slate-200 pt-12 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Upcoming Editions</h2>
          <p className="text-slate-500 text-sm">Consistent touchpoints established across both global frameworks.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {editions.map((edition, idx) => (
            <div key={idx} className={`p-6 rounded-xl border bg-gradient-to-b ${edition.accent} space-y-3`}>
              <h3 className="font-bold text-lg text-slate-900">{edition.name}</h3>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CalendarDays className="w-4 h-4 text-slate-500" />
                <span>{edition.date}</span>
              </div>
              <p className="text-xs text-slate-500">{edition.venue}</p>
              <p className="text-sm text-slate-600 leading-relaxed pt-2">{edition.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}