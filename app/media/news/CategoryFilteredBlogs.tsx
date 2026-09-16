"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import type { BlogData } from "../../data/blogs"; // 👈 adjust this path if your file structure differs

type Group = {
  category: string;
  posts: { slug: string; blog: BlogData }[];
};

export default function CategoryFilteredBlogs({ groups }: { groups: Group[] }) {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");

  // If someone lands here via a link like /media/blog?category=Policy,
  // pre-select that tab. Otherwise default to "All".
  const initialCategory =
    categoryFromUrl && groups.some((g) => g.category === categoryFromUrl)
      ? categoryFromUrl
      : "All";

  const [active, setActive] = useState<string>(initialCategory);

  const tabs = ["All", ...groups.map((g) => g.category)];
  const visibleGroups = active === "All" ? groups : groups.filter((g) => g.category === active);

  return (
    <>
      {/* --- CATEGORY FILTER TABS --- */}
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                active === tab
                  ? "bg-[#02026e] text-white shadow-[0_10px_24px_rgba(2,2,110,0.24)]"
                  : "border border-[#02026e]/20 bg-white text-[#02026e] hover:bg-[#02026e]/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* --- ONE SECTION PER VISIBLE CATEGORY --- */}
      {visibleGroups.map(({ category, posts }) => (
        <section
          key={category}
          className="mx-auto max-w-7xl px-4 py-12 md:px-6 border-t border-b border-slate-100 bg-slate-50/50 rounded-[32px] my-6"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Regional Spotlights
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900 mt-2">
              {category}
            </h2>
            <p className="mt-4 text-base leading-8 text-[color:var(--text-main)]-600">
              Critical analysis and structural summaries directly connected to operations, forums, and clean technology acceleration milestones.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {posts.map(({ slug, blog }) => (
              <article
                key={slug}
                className="group overflow-hidden rounded-[22px] border border-[#02026e]/15 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(2,2,110,0.08)]"
              >
                <div className="relative aspect-[4/2.7] w-full overflow-hidden bg-slate-100">
                  <Image
                    src={blog.heroImage}
                    alt={blog.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="p-5 flex flex-col justify-between min-h-[220px]">
                  <div>
                    <div className="inline-flex items-center gap-2 text-base text-[color:var(--text-main)]-500">
                      <CalendarDays className="h-4 w-4 text-[#02026e]" />
                      <span>{blog.publishedAt}</span>
                    </div>

                    <h3 className="mt-4 text-lg font-semibold leading-7 text-[color:var(--text-main)]-900 group-hover:text-[#02026e] transition-colors line-clamp-3">
                      {blog.title}
                    </h3>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={`/media/blogs/${slug}`}
                      className="inline-flex items-center gap-2 text-base font-semibold text-[#02026e] transition hover:text-[#010150]"
                    >
                      View Analysis
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}