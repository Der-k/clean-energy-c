import { Suspense } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBlogsGroupedByCategory } from "../../data/blogs"; // 👈 adjust this path if your file structure differs
import CategoryFilteredBlogs from "./CategoryFilteredBlogs"; // 👈 place this file alongside page.tsx, or adjust the path

// ✅ Built directly from data/blogs — every blog you add there,
// under whatever primaryCategory you give it, automatically shows
// up in its own section below. No more duplicating titles, images,
// or hrefs by hand, and no more manually creating new sections.
const categorizedBlogs = getBlogsGroupedByCategory();

export default function BlogPage() {
  return (
    <main className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/5 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-500">Media</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Blogs & Articles</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Blogs & Articles
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Insights, perspectives, and expert commentary
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-[color:var(--text-main)]-600">
              In-depth articles, thought leadership, and analysis covering clean
              energy, climate finance, sustainable development, and the forces
              shaping Africa's energy future.
            </p>
          </div>
        </div>
      </section>

      {/* --- CATEGORY FILTER TABS + ONE SECTION PER CATEGORY --- */}
      <Suspense fallback={null}>
        <CategoryFilteredBlogs groups={categorizedBlogs} />
      </Suspense>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
          <div className="rounded-[28px] border border-[#02026e]/20 bg-gradient-to-r from-blue-600 to-[#02026e] px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Stay informed
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                  Want to contribute or stay up to date?
                </h2>
                <p className="mt-3 text-base leading-7 text-blue-50 md:text-base">
                  Reach out to pitch an article, request a topic, or sign up for the latest content from our editorial team.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[#010150] transition hover:bg-[#02026e]/5"
                >
                  Contact Us
                </Link>
                <Link
                  href="/media/gallery"
                  className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  View Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}