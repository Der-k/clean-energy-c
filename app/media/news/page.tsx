import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CalendarDays, ArrowRight } from "lucide-react";

const featuredArticle = {
  title: "How Clean Energy Finance is Reshaping Investment Strategies Across Africa",
  date: "March 2026",
  excerpt:
    "From blended finance to green bonds, a new generation of capital is flowing into Africa's energy transition. We explore the mechanisms, the players, and what it means for the continent's future.",
  image: "/images/blog/blog-featured.jpg",
  href: "/media/blog/how-clean-energy-finance-is-reshaping-investment-strategies-across-africa",
};

const articles = [
  {
    title: "The Case for Geothermal: Africa's Untapped Power Source",
    date: "March 2026",
    image: "/images/blog/blog-1.jpg",
    href: "/media/blog/the-case-for-geothermal-africas-untapped-power-source",
  },
  {
    title: "ESG in Practice: What Investors Are Really Looking For",
    date: "March 2026",
    image: "/images/blog/blog-2.jpg",
    href: "/media/blog/esg-in-practice-what-investors-are-really-looking-for",
  },
  {
    title: "Responsible Mining and the Clean Energy Supply Chain",
    date: "February 2026",
    image: "/images/blog/blog-3.jpg",
    href: "/media/blog/responsible-mining-and-the-clean-energy-supply-chain",
  },
  {
    title: "Smart Mobility in East Africa: Progress, Challenges, and Opportunity",
    date: "February 2026",
    image: "/images/blog/blog-4.jpg",
    href: "/media/blog/smart-mobility-in-east-africa-progress-challenges-and-opportunity",
  },
  {
    title: "Building Resilient Grids: Lessons from the Front Lines of Energy Transition",
    date: "January 2026",
    image: "/images/blog/blog-5.jpg",
    href: "/media/blog/building-resilient-grids-lessons-from-the-front-lines-of-energy-transition",
  },
  {
    title: "Why Cross-Regional Energy Collaboration Is More Urgent Than Ever",
    date: "January 2026",
    image: "/images/blog/blog-6.jpg",
    href: "/media/blog/why-cross-regional-energy-collaboration-is-more-urgent-than-ever",
  },
  {
    title: "Circular Economy Principles and Their Role in Sustainable Energy Systems",
    date: "January 2026",
    image: "/images/blog/blog-7.jpg",
    href: "/media/blog/circular-economy-principles-and-their-role-in-sustainable-energy-systems",
  },
  {
    title: "From Policy to Project: Translating Climate Commitments into Action",
    date: "December 2025",
    image: "/images/blog/blog-8.jpg",
    href: "/media/blog/from-policy-to-project-translating-climate-commitments-into-action",
  },
];

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

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#02026e]">
            Editor's Pick
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            Featured article
          </h2>
        </div>

        <article className="mt-8 overflow-hidden rounded-[26px] border border-[#02026e]/20 bg-white shadow-[0_18px_50px_rgba(37,99,235,0.08)]">
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
                <div className="inline-flex items-center gap-2 rounded-full border border-[#02026e]/20 bg-[#02026e]/5 px-4 py-2 text-base text-[color:var(--text-main)]-700">
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
            More blogs and articles
          </h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-main)]-600">
            Browse our latest writing on energy transition, investment, policy, and innovation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.title}
              className="group overflow-hidden rounded-[22px] border border-[#02026e]/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(37,99,235,0.10)]"
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
                    className="inline-flex items-center gap-2 text-base font-semibold text-[#02026e] transition hover:text-[#010150]"
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
          <button className="rounded-full border border-[#02026e]/20 bg-white px-4 py-2 text-base font-semibold text-[color:var(--text-main)]-700 hover:bg-[#02026e]/5">
            2
          </button>
          <button className="rounded-full border border-[#02026e]/20 bg-white px-4 py-2 text-base font-semibold text-[color:var(--text-main)]-700 hover:bg-[#02026e]/5">
            3
          </button>
          <button className="rounded-full border border-[#02026e]/20 bg-white px-4 py-2 text-base font-semibold text-[color:var(--text-main)]-700 hover:bg-[#02026e]/5">
            Next
          </button>
        </div>
      </section>

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