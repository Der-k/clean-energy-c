"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Landmark,
  DollarSign,
  Building2,
  Rocket,
  GraduationCap,
  Leaf,
  ArrowRight,
  Check,
} from "lucide-react";

const visitors = [
  {
    id: "government",
    label: "Government",
    icon: Landmark,
    title: "Government & Policymakers",
    subtitle: "Shape the future of clean energy policy.",
    points: [
      "Join ministerial and regulatory dialogues.",
      "Strengthen Africa–Australia cooperation.",
      "Explore renewable energy and critical minerals policy.",
      "Build partnerships that accelerate national energy goals.",
    ],
  },
  {
    id: "investors",
    label: "Investors",
    icon: DollarSign,
    title: "Investors & Development Finance",
    subtitle: "Discover investment-ready opportunities.",
    points: [
      "Meet project developers seeking capital.",
      "Join investor roundtables and deal rooms.",
      "Explore geothermal, hydrogen, solar and storage projects.",
      "Connect directly with governments and DFIs.",
    ],
  },
  {
    id: "companies",
    label: "Companies",
    icon: Building2,
    title: "Energy & Mining Companies",
    subtitle: "Grow your business across two continents.",
    points: [
      "Showcase products and technologies.",
      "Meet utilities and procurement teams.",
      "Generate qualified business leads.",
      "Build strategic commercial partnerships.",
    ],
  },
  {
    id: "innovators",
    label: "Innovators",
    icon: Rocket,
    title: "Startups & Innovators",
    subtitle: "Turn innovation into opportunity.",
    points: [
      "Present breakthrough technologies.",
      "Meet investors and venture partners.",
      "Network with utilities and governments.",
      "Discover collaboration opportunities.",
    ],
  },
  {
    id: "research",
    label: "Researchers",
    icon: GraduationCap,
    title: "Academia & Research",
    subtitle: "Drive the next generation of innovation.",
    points: [
      "Present research alongside industry leaders.",
      "Connect with universities worldwide.",
      "Explore collaborative research projects.",
      "Share knowledge shaping energy transition.",
    ],
  },
  {
    id: "development",
    label: "NGOs",
    icon: Leaf,
    title: "NGOs & Development Partners",
    subtitle: "Accelerate sustainable development.",
    points: [
      "Collaborate on climate initiatives.",
      "Support community energy projects.",
      "Meet governments and funding partners.",
      "Drive inclusive clean energy transition.",
    ],
  },
];

export default function WhyAttend() {
  const [selected, setSelected] = useState(visitors[0]);
  const SelectedIcon = selected.icon;

  return (
  <section className="bg-white pt-24">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">

        {/* Heading */}
        <div className="text-center">
          <div className="inline-block">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#185FA5]">
              Why Attend
            </p>
            <div className="mt-2 h-[2px] w-full rounded-full bg-[#06895b]" />
          </div>

          <h2 className="font-heading mt-4 text-4xl font-bold text-[#02026e]">
            Find Opportunities Tailored To You
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-500">
            Whether you're shaping policy, investing in emerging technologies,
            building infrastructure or driving research, discover the people,
            insights and partnerships accelerating Africa's clean energy future.
          </p>
        </div>

        {/* Visitor Selector */}
        <div className="mt-16 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-2 p-2">
            {visitors.map((visitor) => {
              const Icon = visitor.icon;
              const active = selected.id === visitor.id;

              return (
                <motion.button
                  key={visitor.id}
                  onClick={() => setSelected(visitor)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative"
                >
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35,
                      }}
                      className="absolute inset-0 rounded-full bg-[#06895b]"
                    />
                  )}

                  <span
                    className={`
                      relative z-10 flex items-center gap-2
                      rounded-full border px-5 py-2.5
                      text-sm font-medium
                      transition-colors
                      ${
                        active
                          ? "border-[#06895b] text-white"
                          : "border-gray-200 text-gray-600 hover:border-[#06895b] hover:text-[#06895b]"
                      }
                    `}
                  >
                    <Icon className="h-4 w-4" />
                    {visitor.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Featured Card */}
        <div className="mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.97, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -8 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden rounded-[28px] border border-gray-200"
            >
              <div className="grid lg:grid-cols-[0.95fr_1.05fr]">

                {/* LEFT — dark blue panel */}
                <div className="relative overflow-hidden bg-[#02026e] p-10 lg:p-14">

                  {/* Decorative blobs */}
                  <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-[#06895b]/15" />
                  <div className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/5" />

                  <div className="relative">
                    <motion.div
                      key={selected.id}
                      initial={{ scale: 0.7, rotate: -15, opacity: 0 }}
                      animate={{ scale: 1, rotate: 0, opacity: 1 }}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        stiffness: 180,
                      }}
                      className="
                        flex h-16 w-16
                        items-center justify-center
                        rounded-[16px]
                        bg-[#06895b]
                      "
                    >
                      <SelectedIcon className="h-8 w-8 text-white" />
                    </motion.div>

                    <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#5dcaa5]">
                      Designed For
                    </p>

                    <h3 className="font-heading mt-3 text-3xl font-bold leading-tight text-white">
                      {selected.title}
                    </h3>

                    <p className="mt-5 max-w-sm text-base leading-7 text-white/70">
                      {selected.subtitle}
                    </p>
                  </div>
                </div>

                {/* RIGHT — white panel */}
                <div className="bg-gray-50 p-10 lg:p-14">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#06895b]">
                    What You'll Gain
                  </p>
                  <div className="mt-2 h-[2px] w-12 rounded-full bg-[#06895b]" />

                  <div className="mt-8 space-y-5">
                    {selected.points.map((point, index) => (
                      <motion.div
                        key={point}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.07, duration: 0.3 }}
                        className="flex gap-4"
                      >
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#e1f5ee]">
                          <Check className="h-4 w-4 text-[#06895b]" />
                        </div>
                        <p className="text-base leading-7 text-gray-600">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="
                      group mt-10 inline-flex items-center gap-3
                      rounded-full bg-[#02026e]
                      px-7 py-3.5
                      text-sm font-semibold text-white
                      transition-colors
                      hover:bg-[#010150]
                    "
                  >
                    Explore Opportunities
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.button>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}