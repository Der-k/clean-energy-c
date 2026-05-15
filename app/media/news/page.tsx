import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CalendarDays, ArrowRight } from "lucide-react";

const featuredArticle = {
  title: "Clean Energy Conference 2026 Announces Kigali Edition Programme Direction",
  date: "March 2026",
  excerpt:
    "The upcoming conference will bring together leaders across clean energy, climate finance, ESG, innovation, and market access for a two-day programme in Kigali, Rwanda.",
  image: "/images/news/news-featured.jpg",
  href: "/media/news/clean-energy-conference-2026-announces-kigali-edition-programme-direction",
};

const articles = [
  {
    title: "Clean Energy Conference 2026 Opens Registration for Kigali Edition",
    date: "March 2026",
    image: "/images/news/news-1.jpg",
    href: "/media/news/clean-energy-conference-2026-opens-registration",
  },
  {
    title: "Conference to Highlight Climate Finance, ESG, and Resilient Energy Transitions",
    date: "March 2026",
    image: "/images/news/news-2.jpg",
    href: "/media/news/conference-to-highlight-climate-finance-esg-and-resilient-energy-transitions",
  },
  {
    title: "Responsible Mining and Market Access Added to 2026 Conference Agenda",
    date: "February 2026",
    image: "/images/news/news-3.jpg",
    href: "/media/news/responsible-mining-and-market-access-added-to-2026-agenda",
  },
  {
    title: "Kigali Edition to Bring Together Investors, Policymakers, and Industry Leaders",
    date: "February 2026",
    image: "/images/news/news-4.jpg",
    href: "/media/news/kigali-edition-to-bring-together-investors-policymakers-and-industry-leaders",
  },
  {
    title: "What to Expect from the Clean Energy Conference & Exhibition 2026",
    date: "January 2026",
    image: "/images/news/news-5.jpg",
    href: "/media/news/what-to-expect-from-the-clean-energy-conference-exhibition-2026",
  },
  {
    title: "Why Cross-Regional Energy Collaboration Matters Now",
    date: "January 2026",
    image: "/images/news/news-6.jpg",
    href: "/media/news/why-cross-regional-energy-collaboration-matters-now",
  },
  {
    title: "Conference Sessions to Explore Smart Mobility, Geothermal, and Circular Economy",
    date: "January 2026",
    image: "/images/news/news-7.jpg",
    href: "/media/news/conference-sessions-to-explore-smart-mobility-geothermal-and-circular-economy",
  },
  {
    title: "Delegate Networking and Exhibition Access Confirmed for 2026 Programme",
    date: "December 2025",
    image: "/images/news/news-8.jpg",
    href: "/media/news/delegate-networking-and-exhibition-access-confirmed-for-2026-programme",
  },
];

export default function NewsPage() {
  return (
    <main className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-[#02026e]/20
 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/5
/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/5
/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-500">Media</span>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">News & Articles</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              News & Articles
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Latest news and conference updates
            </h1>
            <p className="mt-5 max-w-3xl text-xl
 leading-8 text-[color:var(--text-main)]-600">
              Explore press releases, event announcements, programme updates,
              and key stories related to the Clean Energy Conference.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#02026e]">
            Latest Press Releases and Event News
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            Featured update
          </h2>
        </div>

        <article className="mt-8 overflow-hidden rounded-[26px] border border-[#02026e]/20
 bg-white shadow-[0_18px_50px_rgba(37,99,235,0.08)]">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[280px]">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex items-center">
              <div className="p-6 md:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#02026e]/20
 bg-[#02026e]/5
 px-4 py-2 text-base text-[color:var(--text-main)]-700">
                  <CalendarDays className="h-4 w-4 text-[#02026e]" />
                  <span>{featuredArticle.date}</span>
                </div>

                <h3 className="mt-5 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                  {featuredArticle.title}
                </h3>

                <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
                  {featuredArticle.excerpt}
                </p>

                <div className="mt-8">
                  <Link
                    href={featuredArticle.href}
                    className="btn-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white"
                  >
                    Read Article
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 lg:pb-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            More news and articles
          </h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-main)]-600">
            Browse recent press releases, event stories, and conference-related updates.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group overflow-hidden rounded-[22px] border border-[#02026e]/20
 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)]"
            >
              <div className="relative aspect-[4/2.7] w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
              </div>

              <div className="p-5">
                <div className="inline-flex items-center gap-2 text-base text-[color:var(--text-main)]-500">
                  <CalendarDays className="h-4 w-4 text-[#02026e]" />
                  <span>{article.date}</span>
                </div>

                <h3 className="mt-4 text-xl font-semibold leading-8 text-[color:var(--text-main)]-900">
                  {article.title}
                </h3>

                <div className="mt-6">
                  <Link
                    href={article.href}
                    className="inline-flex items-center gap-2 text-base font-semibold text-[#02026e] transition hover:text-[#010150]
"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 md:px-6 lg:pb-16">
        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-full bg-blue-600 px-4 py-2 text-base font-semibold text-white shadow-[0_10px_24px_rgba(37,99,235,0.24)]">
            1
          </button>
          <button className="rounded-full border border-[#02026e]/20
 bg-white px-4 py-2 text-base font-semibold text-[color:var(--text-main)]-700 hover:bg-[#02026e]/5
">
            2
          </button>
          <button className="rounded-full border border-[#02026e]/20
 bg-white px-4 py-2 text-base font-semibold text-[color:var(--text-main)]-700 hover:bg-[#02026e]/5
">
            3
          </button>
          <button className="rounded-full border border-[#02026e]/20
 bg-white px-4 py-2 text-base font-semibold text-[color:var(--text-main)]-700 hover:bg-[#02026e]/5
">
            Next
          </button>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
          <div className="rounded-[28px] border border-[#02026e]/20
 bg-gradient-to-r from-blue-600 to-#02026e-500 px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Stay informed
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                  Want the latest conference updates?
                </h2>
                <p className="mt-3 text-base leading-7 text-blue-50 md:text-base">
                  Contact the team for announcements, media enquiries, and upcoming news.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[#010150]
 transition hover:bg-[#02026e]/5
"
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