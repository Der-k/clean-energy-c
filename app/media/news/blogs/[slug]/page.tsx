// app/media/blogs/[slug]/page.tsx

import { blogsData } from "../../../../data/blogs";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const lightCardStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#0f172a",
};

export default async function DynamicBlogPage({ params }: Props) {
  const { slug } = await params;
  const blog = blogsData[slug];

  if (!blog) {
    notFound();
  }

  const {
    tableOfContents,
    investmentAreas,
    drivers,
    focusSectors,
    countries,
    investorConsiderations,
    partnershipGroups,
    conferenceBenefits,
    featuredEventAudience,
    featuredEventTopics,
    faqs,
    relatedPosts,
  } = blog;

  return (
    <main className="bg-white text-[#0f172a]">
      <section className="relative isolate overflow-hidden border-b border-slate-200 bg-[#f8fafc]">
        <div className="absolute inset-0 -z-10 opacity-[0.08]">
          <div className="energy-bg h-full w-full" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Link
              href="/blogs"
              className="mb-8 inline-flex w-fit items-center text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary,##2563eb)]"
            >
              Blogs and Articles
            </Link>

            <div className="mb-5 flex flex-wrap gap-2 text-sm font-semibold text-[var(--primary,##2563eb)]">
              {/* 👇 Shows primaryCategory (e.g. "Investment", "Policy")
                  and links back to the listing page pre-filtered to that
                  category tab. */}
              <Link
                href={`/media/news?category=${encodeURIComponent(blog.primaryCategory)}`}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 transition hover:bg-[#f8fafc]"
              >
                {blog.primaryCategory}
              </Link>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                {blog.location}
              </span>
            </div>

            <h1 className="font-heading max-w-4xl text-balance text-3xl font-bold text-slate-950 sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            <p className="mt-6 max-w-3xl text-[19px] leading-8 text-slate-700 lg:text-[21px]">
              {blog.excerpt}
            </p>

            <div className="mt-8 grid gap-3 border-l-2 border-[var(--primary,##2563eb)] pl-5 text-base text-slate-700 sm:grid-cols-3 sm:border-l-0 sm:pl-0">
              <MetaItem label="Author" value={blog.author} />
              <MetaItem label="Published" value={blog.publishedAt} />
              <MetaItem label="Reading time" value={blog.readTime} />
            </div>
          </div>

          <div className="relative">
            <div
              className="overflow-hidden rounded-lg border border-slate-200 shadow-sm"
              style={lightCardStyle}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={blog.heroImage}
                  alt={blog.imageAlt || blog.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 divide-x divide-slate-200 bg-white text-center">
                <Stat value={String(drivers?.length || 0)} label="Investment drivers" />
                <Stat value={String(countries?.length || 0)} label="Markets to watch" />
                <Stat value="2026" label="Defining year" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-lg border border-slate-200 p-5 shadow-sm" style={lightCardStyle}>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary,##2563eb)]">
              In this guide
            </p>
            <nav className="mt-4 grid gap-3">
              {tableOfContents?.map((item) => (
                <a
                  key={item}
                  href={`#${slugify(item)}`}
                  className="rounded-md border border-transparent px-3 py-2 text-[15px] font-semibold text-slate-700 transition hover:border-slate-200 hover:bg-[#f8fafc] hover:text-[var(--primary,##2563eb)]"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 p-5 shadow-sm" style={lightCardStyle}>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Featured event
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-950">
              Clean Energy Conference Australia-Africa
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-700">
              A forum for investment, innovation, and collaboration across Africa and Australia.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-md bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
            >
              Register interest
            </Link>
          </div>
        </aside>

        <article className="min-w-0">
          <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8 prose-a:font-semibold prose-a:text-[var(--primary,##2563eb)]">
            <p>Africa is entering a new era of energy investment.</p>
            <p>
              Growing electricity demand, rapid urbanisation, favourable renewable energy resources, expanding regional power markets, and increasing international interest are creating significant opportunities across the continent.
            </p>

            <SectionTitle id="why-africa-is-becoming-an-energy-investment-destination">
              Why Africa Is Becoming an Energy Investment Destination
            </SectionTitle>
            <p>
              Africa has one of the fastest-growing populations in the world, alongside rising industrialisation and increasing electricity demand.
            </p>
          </div>

          {investmentAreas && (
            <div className="mt-6">
              <BulletPanel title="Many countries are investing heavily in" items={investmentAreas} />
            </div>
          )}

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="key-drivers-of-energy-investment">
              Key Drivers of Energy Investment
            </SectionTitle>
          </div>

          {drivers && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {drivers.map((driver) => (
                <InsightCard key={driver.title} title={driver.title} text={driver.text} />
              ))}
            </div>
          )}

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="where-investors-are-focusing">
              Where Investors Are Focusing
            </SectionTitle>
          </div>

          {focusSectors && (
            <div className="mt-8 grid gap-6">
              {focusSectors.map((sector, index) => (
                <InvestmentCard key={sector.title} sector={sector} index={index + 1} lightCardStyle={lightCardStyle} />
              ))}
            </div>
          )}

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="countries-to-watch">Countries to Watch</SectionTitle>
            <p>
              Investment opportunities exist across the continent, but several countries continue to receive increasing attention due to supportive policies.
            </p>
          </div>

          {countries && (
            <div className="mt-6">
              <TagPanel title="Examples include" items={countries} lightCardStyle={lightCardStyle} />
            </div>
          )}

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="challenges-investors-should-consider">
              Challenges Investors Should Consider
            </SectionTitle>
          </div>

          <div className="mt-6">
            <BulletPanel title="Common considerations include" items={investorConsiderations || []} />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <BulletPanel title="Why partnerships matter" items={partnershipGroups || []} />
            <BulletPanel title="Conferences help organisations" items={conferenceBenefits || []} />
          </div>

          <div id="featured-event" className="mt-12 scroll-mt-28 rounded-lg border border-slate-200 p-6 shadow-sm md:p-8" style={lightCardStyle}>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--primary,##2563eb)]">
              Featured event
            </p>
            <h2 className="font-heading mt-3 text-2xl font-bold text-slate-950">
              Clean Energy Conference Australia-Africa
            </h2>
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <TagGroup title="Who attends" items={featuredEventAudience || []} />
              <TagGroup title="Topics include" items={featuredEventTopics || []} />
            </div>
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="frequently-asked-questions">
              Frequently Asked Questions
            </SectionTitle>
          </div>

          {faqs && (
            <div className="mt-6 grid gap-4">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} faq={faq} lightCardStyle={lightCardStyle} />
              ))}
            </div>
          )}
        </article>
      </section>

      {relatedPosts && (
        <RelatedArticles relatedPosts={relatedPosts} lightCardStyle={lightCardStyle} />
      )}
    </main>
  );
}

// ==========================================
// SUB-COMPONENTS
// ==========================================
function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</span>
      <span className="mt-1 block font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-4">
      <strong className="block text-2xl font-black text-slate-950">{value}</strong>
      <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</span>
    </div>
  );
}

function SectionTitle({ id, children }: { id: string; children: ReactNode }) {
  return <h2 id={id} className="scroll-mt-28 font-heading text-2xl font-bold text-slate-950 mt-8 mb-4">{children}</h2>;
}

function InvestmentCard({ sector, index, lightCardStyle }: { sector: any; index: number; lightCardStyle: any }) {
  return (
    <section className="rounded-lg border border-slate-200 p-6 shadow-sm" style={lightCardStyle}>
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--primary,##2563eb)]">{String(index).padStart(2, "0")}</p>
      <h3 className="font-heading mt-2 text-2xl font-bold text-slate-950">{sector.title}</h3>
      <p className="mt-4 text-[18px] leading-8 text-slate-700">{sector.text}</p>
      <TagGroup title="Investment opportunities" items={sector.opportunities || []} />
    </section>
  );
}

function TagGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">{title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-slate-200 bg-[#f8fafc] px-3 py-1 text-sm font-semibold text-slate-700">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function TagPanel({ title, items, lightCardStyle }: { title: string; items: string[]; lightCardStyle: any }) {
  return (
    <div className="rounded-lg border border-slate-200 p-6 shadow-sm" style={lightCardStyle}>
      <h3 className="font-heading text-2xl font-bold text-slate-950">{title}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <span key={item} className="rounded-md border border-slate-200 bg-[#f8fafc] px-3 py-3 text-center text-sm font-bold text-slate-800">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function InsightCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-slate-200 p-5 shadow-sm bg-white">
      <h3 className="font-heading text-xl font-bold text-slate-950">{title}</h3>
      <p className="mt-3 text-base font-medium leading-7 text-slate-700">{text}</p>
    </div>
  );
}

function BulletPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-200 p-6 shadow-sm bg-white">
      <h3 className="font-heading text-2xl font-bold text-slate-950">{title}</h3>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-base font-medium text-slate-800">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary,##2563eb)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqItem({ faq, lightCardStyle }: { faq: any; lightCardStyle: any }) {
  return (
    <details className="group rounded-lg border border-slate-200 p-5 shadow-sm bg-white" style={lightCardStyle}>
      <summary className="cursor-pointer list-none font-heading text-xl font-bold text-slate-950 flex justify-between items-center">
        {faq.question}
        <span className="transition group-open:rotate-180">
          <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <p className="mt-3 text-base leading-7 text-slate-700 border-t border-slate-100 pt-3">{faq.answer}</p>
    </details>
  );
}

function RelatedArticles({ relatedPosts, lightCardStyle }: { relatedPosts: any[]; lightCardStyle: any }) {
  return (
    <section className="border-t border-slate-200 bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="font-heading text-3xl font-bold text-slate-950 mb-8">Related Articles</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {relatedPosts.map((post) => (
            <Link key={post.title} href={post.href} className="rounded-lg border border-slate-200 p-6 shadow-sm bg-white block hover:border-blue-500 transition-colors" style={lightCardStyle}>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary,##2563eb)]">{post.meta}</p>
              <h3 className="mt-4 text-2xl font-bold text-slate-950 line-clamp-2">{post.title}</h3>
              <span className="mt-6 inline-flex text-sm font-bold text-slate-700 group-hover:text-blue-600">Read article &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}