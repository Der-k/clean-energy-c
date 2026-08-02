"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, CalendarDays, ChevronLeft, ChevronRight, Heart, MessageCircle } from "lucide-react";
import { SectionKicker } from "@/components/shared/section-kicker";
import { POSTS, type Post } from "@/app/media/social-wall/SocialWall";
import { SocialEmbed, SocialEmbedScripts } from "@/app/media/social-wall/SocialEmbed";
import { blogsData } from "@/app/data/blogs"; // 👈 adjust this import if your alias/path differs

// ────────────────────────────────────────────────────────────
// Controls which blog appears first on the landing-page carousel.
// Any blog slug NOT listed here still shows up automatically,
// appended at the end — so adding a new blog to data/blogs is
// always enough on its own; you only touch this list if you want
// to promote something to the front of the homepage carousel.
// ────────────────────────────────────────────────────────────
const FEATURED_ORDER: string[] = [
  "top-africa-energy-events-2026",
  "energy-investment-africa-2026",
  "renewable-energy-conferences-africa",
  "energy-policy-africa-2026",
  "renewable-energy-policy-africa",
  "green-hydrogen-africa-2026",
  "geothermal-energy-africa-2026",
  "global-clean-energy-destination",
];

function truncate(text: string, max: number) {
  return text.length <= max ? text : text.slice(0, max).trimEnd() + "…";
}

const orderedSlugs = [
  ...FEATURED_ORDER.filter((slug) => slug in blogsData),
  ...Object.keys(blogsData).filter((slug) => !FEATURED_ORDER.includes(slug)),
];

const CONFERENCE_INSIGHTS = orderedSlugs.map((slug) => {
  const blog = blogsData[slug];
  return {
    title: blog.title,
    date: blog.publishedAt,
    excerpt: truncate(blog.excerpt, 140),
    image: blog.heroImage,
    href: `/media/news/blogs/${slug}`,
  };
});

function platformLabel(platform: Post["platform"]) {
  return platform === "instagram" ? "Instagram" : platform === "linkedin" ? "LinkedIn" : "X";
}

function PlatformBadge({ platform }: { platform: Post["platform"] }) {
  const label = platform === "instagram" ? "IG" : platform === "linkedin" ? "LI" : "X";
  const bg =
    platform === "instagram"
      ? "linear-gradient(135deg, #020266, #009966)"
      : platform === "linkedin"
      ? "#009966"
      : "#020266";
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
      style={{ background: bg }}
    >
      {label}
    </div>
  );
}

function PostSlide({ post }: { post: Post }) {
  const [likes, comments] = post.stats.split("·").map((s) => s.trim());

  return (
    <article className="grid gap-0 overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-[0_16px_36px_rgba(2,6,23,0.1)] lg:grid-cols-[1fr_1fr]">
      <div className="relative bg-[#F5F6FB] p-4 sm:p-6">
        {post.embed ? (
          <div className="overflow-hidden rounded-[16px]">
            <SocialEmbed {...post.embed} />
          </div>
        ) : (
          <div
            className="aspect-[4/3] w-full rounded-[16px] bg-cover bg-center lg:aspect-auto lg:h-full lg:min-h-[320px]"
            style={{
              backgroundImage: post.mediaTint || "linear-gradient(160deg,#E4F5EE,#DDE0F5)",
            }}
          />
        )}
      </div>

      <div className="flex flex-col p-6 sm:p-8">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#020266]/15 bg-[#F5F6FB] px-3 py-1.5 text-xs font-medium text-[#020266]">
          From the community · {platformLabel(post.platform)}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <PlatformBadge platform={post.platform} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-900">{post.name}</p>
            <p className="truncate text-xs font-medium text-zinc-500">{post.handle}</p>
          </div>
        </div>

        <p className="mt-4 text-base leading-7 text-zinc-700 sm:text-lg">
          {post.caption} <span className="font-semibold text-[#009966]">#CleanEnergy2026</span>
        </p>

        <div className="mt-5 flex items-center gap-4 border-t border-zinc-100 pt-4 text-sm font-medium text-zinc-500">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-4 w-4" />
            {likes}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            {comments}
          </span>
          <span className="ml-auto">{post.time}</span>
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
          {post.permalink && (
            <Link
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#020266]"
            >
              View post
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
          <Link
            href="/media/social-wall"
            className="ml-auto inline-flex items-center gap-2 rounded-full border border-[#020266]/20 bg-white px-4 py-2 text-xs font-semibold text-[#020266] shadow-sm transition hover:border-[#020266] hover:bg-[#020266] hover:text-white"
          >
            See the full wall
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

const AUTOROTATE_INTERVAL = 7500; // ms between automatic slide changes

type NewsItem = (typeof CONFERENCE_INSIGHTS)[number];
type Slide = { kind: "news"; items: NewsItem[] } | { kind: "post"; post: Post };

function buildSlides(): Slide[] {
  // Chunk the blog list into pages of 3 (same grouping as before).
  const newsPages: NewsItem[][] = [];
  for (let i = 0; i < CONFERENCE_INSIGHTS.length; i += 3) {
    newsPages.push(CONFERENCE_INSIGHTS.slice(i, i + 3));
  }

  const posts = POSTS.slice(0, 3);

  // Interleave: news page, post, news page, post... so the carousel
  // switches between blog groups and single community posts.
  const slides: Slide[] = [];
  const max = Math.max(newsPages.length, posts.length);
  for (let i = 0; i < max; i++) {
    if (newsPages[i]) slides.push({ kind: "news", items: newsPages[i] });
    if (posts[i]) slides.push({ kind: "post", post: posts[i] });
  }
  return slides;
}

export function NewsInsightsSection() {
  const [slides] = useState<Slide[]>(() => buildSlides());
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideCount = slides.length;

  useEffect(() => {
    if (isHovered || slideCount <= 1) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slideCount);
    }, AUTOROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [isHovered, slideCount]);

  const slide = slides[index];

  const goPrev = () => setIndex((current) => (current - 1 + slideCount) % slideCount);
  const goNext = () => setIndex((current) => (current + 1) % slideCount);

  return (
    <section
      className="relative overflow-hidden border-b border-[#020266]/10 bg-[#F5F6FB] py-16 sm:py-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#020266]/5 blur-3xl" />
      <SocialEmbedScripts />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionKicker
            index="03"
            label="Latest insights"
            heading="News, ideas, and industry perspectives"
            intro="Explore the latest thinking on energy investment, policy, technology, and Africa's clean-energy future — plus what the community is saying live."
            accent="#020266"
          />
          <AnimatePresence mode="wait" initial={false}>
            {slide.kind === "post" ? (
              <motion.div
                key="cta-social"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 self-start sm:self-auto"
              >
                <Link
                  href="/media/social-wall"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#009966]/30 bg-white px-5 py-3 text-sm font-semibold text-[#009966] shadow-sm transition hover:border-[#009966] hover:bg-[#009966] hover:text-white"
                >
                  Visit our social channels
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="cta-news"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 self-start sm:self-auto"
              >
                <Link
                  href="/media/news"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#020266]/20 bg-white px-5 py-3 text-sm font-semibold text-[#020266] shadow-sm transition hover:border-[#020266] hover:bg-[#020266] hover:text-white"
                >
                  Explore all articles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative mt-9">
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ x: 56, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -56, opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {slide.kind === "post" ? (
                  <PostSlide post={slide.post} />
                ) : (
                  <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
                    <article className="group relative min-h-[360px] overflow-hidden rounded-[26px] bg-[#020266] shadow-[0_16px_36px_rgba(2,6,23,0.16)]">
                      <Image src={slide.items[0].image} alt={slide.items[0].title} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020266] via-[#020266]/65 to-transparent" />
                      <div className="relative flex min-h-[360px] flex-col justify-end p-6 text-white sm:p-8">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm"><CalendarDays className="h-3.5 w-3.5" />{slide.items[0].date}</div>
                        <h3 className="mt-4 text-2xl font-semibold leading-tight sm:text-3xl">{slide.items[0].title}</h3>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">{slide.items[0].excerpt}</p>
                        <Link href={slide.items[0].href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link>
                      </div>
                    </article>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                      {slide.items.slice(1).map((article) => (
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
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Big blue manual nav arrows, pinned to either side of the whole carousel */}
          {slideCount > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous"
                className="absolute left-0 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#020266] text-white shadow-[0_12px_28px_rgba(2,2,102,0.35)] transition hover:scale-105 hover:bg-[#02026e] sm:h-14 sm:w-14 lg:-left-7"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next"
                className="absolute right-0 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-[#020266] text-white shadow-[0_12px_28px_rgba(2,2,102,0.35)] transition hover:scale-105 hover:bg-[#02026e] sm:h-14 sm:w-14 lg:-right-7"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </>
          )}
        </div>

        <div className="relative mt-6 flex justify-center gap-2" aria-label="Carousel pages">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={s.kind === "post" ? `Show post by ${s.post.name}` : `Show news group ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? (s.kind === "post" ? "w-7 bg-[#009966]" : "w-7 bg-[#020266]") : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}