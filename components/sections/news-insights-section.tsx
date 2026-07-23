"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { SectionKicker } from "@/components/shared/section-kicker";

const CONFERENCE_INSIGHTS = [
  {
    title: "Top Africa Energy Events in 2026: The Ultimate Guide to Clean Energy Conferences, Summits & Investment Forums",
    date: "January 2026",
    excerpt: "Your guide to the key events, forums, and investment conversations shaping Africa's energy future.",
    image: "/images/top-events-2026-hero.png",
    href: "/media/news/blogs/top-africa-energy-events-2026",
  },
  {
    title: "Energy Investment in Africa: Opportunities, Trends and Why 2026 Could Be a Defining Year",
    date: "July 2026",
    excerpt: "The market signals, capital flows, and opportunities shaping the year ahead.",
    image: "/images/clean-energy-collage.png",
    href: "/media/news/blogs/energy-investment-africa-2026",
  },
  {
    title: "Renewable Energy Conferences in Africa: The Essential Guide for Industry Professionals",
    date: "July 2026",
    excerpt: "The essential conference guide for clean-energy leaders and industry professionals.",
    image: "/images/conference-guide-hero.png",
    href: "/media/news/blogs/renewable-energy-conferences-africa",
  },
  {
    title: "Energy Policy in Africa: How Government Decisions Are Shaping the Future of Clean Energy",
    date: "July 2026",
    excerpt: "How policy decisions are influencing the region's clean-energy trajectory.",
    image: "/images/energy-policy-hero.png",
    href: "/media/news/blogs/energy-policy-africa-2026",
  },
  {
    title: "Renewable Energy Policy in Africa: How Governments Are Accelerating Clean Energy Growth",
    date: "July 2026",
    excerpt: "The policies accelerating renewable growth across the continent.",
    image: "/images/renewable-policy-growth.png",
    href: "/media/news/blogs/renewable-energy-policy-africa",
  },
  {
    title: "Green Hydrogen in Africa: Opportunities, Investment and the Future of a Clean Hydrogen Economy",
    date: "July 2026",
    excerpt: "A look at the opportunity, investment, and outlook for green hydrogen.",
    image: "/images/green-hydrogen-africa.png",
    href: "/media/news/blogs/green-hydrogen-africa-2026",
  },
  {
    title: "Geothermal Energy in Africa: Unlocking One of the Continent's Most Reliable Renewable Resources",
    date: "July 2026",
    excerpt: "Why geothermal is one of Africa's most dependable renewable energy resources.",
    image: "/images/geothermal-energy-africa.png",
    href: "/media/news/blogs/geothermal-energy-africa-2026",
  },
  {
    title: "Why Africa Is the Next Global Clean Energy Investment Destination",
    date: "July 2026",
    excerpt: "The forces placing Africa at the centre of global clean-energy investment.",
    image: "/images/global-investment-destination.png",
    href: "/media/news/blogs/global-clean-energy-destination",
  },
];

const NEWS_AUTOROTATE_INTERVAL = 8500; // ms between automatic page flips

export function NewsInsightsSection() {
  const [newsPage, setNewsPage] = useState(0);
  const [isNewsHovered, setIsNewsHovered] = useState(false);
  const newsPageCount = Math.ceil(CONFERENCE_INSIGHTS.length / 3);
  const visibleNews = CONFERENCE_INSIGHTS.slice(newsPage * 3, newsPage * 3 + 3);

  useEffect(() => {
    if (isNewsHovered) return;
    const timer = setInterval(() => {
      setNewsPage((current) => (current + 1) % newsPageCount);
    }, NEWS_AUTOROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isNewsHovered, newsPageCount]);

  return (
    <section
      className="relative overflow-hidden border-b border-[#020266]/10 bg-[#F5F6FB] py-16 sm:py-20"
      onMouseEnter={() => setIsNewsHovered(true)}
      onMouseLeave={() => setIsNewsHovered(false)}
    >
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#020266]/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionKicker
            index="03"
            label="Latest insights"
            heading="News, ideas, and industry perspectives"
            intro="Explore the latest thinking on energy investment, policy, technology, and Africa's clean-energy future."
            accent="#020266"
          />
          <Link
            href="/media/news"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#020266]/20 bg-white px-5 py-3 text-sm font-semibold text-[#020266] shadow-sm transition hover:border-[#020266] hover:bg-[#020266] hover:text-white sm:self-auto"
          >
            Explore all articles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="relative mt-9 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={newsPage}
              initial={{ x: 56, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -56, opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]"
            >
              <article className="group relative min-h-[360px] overflow-hidden rounded-[26px] bg-[#020266] shadow-[0_16px_36px_rgba(2,6,23,0.16)]">
                <Image src={visibleNews[0].image} alt={visibleNews[0].title} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020266] via-[#020266]/65 to-transparent" />
                <div className="relative flex min-h-[360px] flex-col justify-end p-6 text-white sm:p-8">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"><CalendarDays className="h-3.5 w-3.5" />{visibleNews[0].date}</div>
                  <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">{visibleNews[0].title}</h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">{visibleNews[0].excerpt}</p>
                  <Link href={visibleNews[0].href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                </div>
              </article>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {visibleNews.slice(1).map((article) => (
                  <article key={article.href} className="group overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(2,6,23,0.12)] lg:grid lg:grid-cols-[150px_1fr]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 lg:aspect-auto"><Image src={article.image} alt={article.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 22vw" className="object-cover transition duration-500 group-hover:scale-105" /></div>
                    <div className="flex flex-col p-5">
                      <p className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500"><CalendarDays className="h-3.5 w-3.5 text-[#009966]" />{article.date}</p>
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-zinc-900 transition-colors group-hover:text-[#020266]">{article.title}</h3>
                      <Link href={article.href} className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-[#020266]">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative mt-6 flex justify-center gap-2" aria-label="News carousel pages">
          {Array.from({ length: newsPageCount }).map((_, index) => (
            <button key={index} type="button" onClick={() => setNewsPage(index)} aria-label={`Show news group ${index + 1}`} className={`h-1.5 rounded-full transition-all ${index === newsPage ? "w-7 bg-[#020266]" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}