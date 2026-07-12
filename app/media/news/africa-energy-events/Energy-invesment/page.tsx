import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const blog = {
  category: "Investment | Clean Energy | Africa",
  title:
    "Energy Investment in Africa: Opportunities, Trends and Why 2026 Could Be a Defining Year",
  excerpt:
    "A practical guide to the investment trends shaping Africa's energy sector, the technologies attracting capital, the risks investors should understand, and the partnerships that can unlock long-term opportunity.",
  author: "Clean Energy Conference Editorial Team",
  publishedAt: "[Insert Date]",
  readTime: "10 min read",
  location: "Africa and Australia",
  heroImage: "/images/clean-energy-collage.png",
  imageAlt: "Clean energy infrastructure and conference delegates",
};

const tableOfContents = [
  "Why Africa Is Becoming an Energy Investment Destination",
  "Key Drivers of Energy Investment",
  "Where Investors Are Focusing",
  "Countries to Watch",
  "Challenges Investors Should Consider",
  "Featured Event",
  "Frequently Asked Questions",
];

const investmentAreas = [
  "Renewable energy generation",
  "National transmission networks",
  "Rural electrification",
  "Battery energy storage",
  "Smart grid technologies",
  "Electric mobility",
  "Green hydrogen",
  "Energy efficiency",
  "Climate resilience",
];

const drivers = [
  {
    title: "Renewable Energy Expansion",
    text: "Solar, wind, hydro, geothermal, and biomass projects continue to attract investment due to falling technology costs and increasing electricity demand.",
  },
  {
    title: "Population Growth",
    text: "Africa's rapidly growing population is increasing demand for reliable electricity, industrial development, transportation, healthcare, education, and digital infrastructure.",
  },
  {
    title: "Regional Energy Integration",
    text: "Regional power pools and cross-border electricity trading initiatives are creating larger markets for investors and improving energy security.",
  },
  {
    title: "Climate Finance",
    text: "Development banks, climate funds, export credit agencies, and private investors are supporting projects that advance sustainable development and reduce emissions.",
  },
  {
    title: "Technology Innovation",
    text: "Battery storage, smart grids, artificial intelligence, predictive maintenance, digital monitoring, and energy management systems are improving project economics.",
  },
];

const focusSectors = [
  {
    title: "Utility-Scale Solar",
    text: "Large solar projects continue to receive significant investment across multiple African markets due to abundant solar resources and declining technology costs.",
    opportunities: [
      "Independent Power Producers (IPPs)",
      "Engineering Procurement and Construction (EPC)",
      "Equipment Manufacturing",
      "Operations and Maintenance",
      "Grid Integration",
      "Asset Management",
    ],
  },
  {
    title: "Wind Energy",
    text: "Several African regions possess excellent wind resources capable of supporting utility-scale projects.",
    opportunities: [
      "Project development",
      "Transmission infrastructure",
      "Equipment supply",
      "Operations",
      "Maintenance",
      "Financing",
    ],
  },
  {
    title: "Battery Energy Storage",
    text: "Battery storage has become increasingly important as renewable energy penetration grows.",
    opportunities: [
      "Utility-scale storage",
      "Commercial systems",
      "Industrial applications",
      "Grid stabilisation",
      "Hybrid renewable projects",
    ],
  },
  {
    title: "Green Hydrogen",
    text: "Africa's renewable resources create favourable conditions for green hydrogen production for domestic industry and future export markets.",
    opportunities: [
      "Production",
      "Transport",
      "Storage",
      "Infrastructure",
      "Engineering",
      "Export facilities",
    ],
  },
  {
    title: "Critical Minerals",
    text: "The global clean energy transition depends on minerals used in batteries, electric vehicles, renewable energy technologies, and modern electronics.",
    opportunities: [
      "Lithium",
      "Graphite",
      "Cobalt",
      "Copper",
      "Manganese",
      "Rare Earth Elements",
    ],
  },
];

const countries = [
  "Kenya",
  "Rwanda",
  "South Africa",
  "Namibia",
  "Zambia",
  "Tanzania",
  "Ghana",
  "Nigeria",
  "Egypt",
  "Morocco",
];

const investorConsiderations = [
  "Regulatory environments",
  "Grid infrastructure",
  "Permitting processes",
  "Currency risks",
  "Financing structures",
  "Political stability",
  "Local partnerships",
  "Skilled workforce availability",
];

const partnershipGroups = [
  "Governments",
  "Utilities",
  "Investors",
  "EPC contractors",
  "Technology providers",
  "Development finance institutions",
  "Universities",
  "Local communities",
  "Industry associations",
];

const conferenceBenefits = [
  "Explore investment opportunities",
  "Meet government officials",
  "Understand regulatory developments",
  "Discover new technologies",
  "Identify project partners",
  "Connect with financiers",
  "Build long-term business relationships",
];

const featuredEventTopics = [
  "Renewable Energy",
  "Climate Finance",
  "Critical Minerals",
  "Green Hydrogen",
  "Battery Storage",
  "Energy Policy",
  "Grid Modernisation",
  "Sustainable Mining",
  "Investment Partnerships",
  "Innovation",
];

const featuredEventAudience = [
  "Government leaders",
  "Renewable energy developers",
  "Investors",
  "Financial institutions",
  "Mining companies",
  "Utilities",
  "Researchers",
  "Technology providers",
  "Development organisations",
];

const faqs = [
  {
    question: "Why is Africa attracting energy investment?",
    answer:
      "Growing electricity demand, renewable energy resources, climate finance, policy reforms, and infrastructure development are making many African markets increasingly attractive to investors.",
  },
  {
    question: "Which renewable energy sectors offer the greatest opportunities?",
    answer:
      "Current investment activity is particularly strong in utility-scale solar, battery storage, transmission infrastructure, green hydrogen, smart grids, and critical minerals.",
  },
  {
    question: "Is Africa suitable for international investors?",
    answer:
      "Many African countries actively encourage international investment through public-private partnerships, investment incentives, and regulatory reforms. Investors should still conduct market-specific due diligence before making decisions.",
  },
  {
    question: "Why attend an energy investment conference?",
    answer:
      "Conferences provide access to policymakers, investors, project developers, financiers, technology providers, and industry experts while offering valuable opportunities for networking and collaboration.",
  },
];

const relatedPosts = [
  {
    title: "Renewable Energy Conferences in Africa",
    meta: "Conference Guide",
    href: "/blogs/renewable-energy-conferences-africa",
  },
  {
    title: "Top Africa Energy Events in 2026",
    meta: "Event Guide",
    href: "/blogs/top-africa-energy-events-2026",
  },
  {
    title: "Critical minerals and renewable infrastructure",
    meta: "Industry Analysis",
    href: "/blogs/critical-minerals-renewable-infrastructure",
  },
];

const lightCardStyle: CSSProperties = {
  backgroundColor: "#ffffff",
  color: "#0f172a",
};

export default function BlogDetailPage() {
  return (
    <main className="bg-white text-[#0f172a]">
      <section className="relative isolate overflow-hidden border-b border-[var(--border-soft)] bg-[#f8fafc]">
        <div className="absolute inset-0 -z-10 opacity-[0.08]">
          <div className="energy-bg h-full w-full" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <Link
              href="/blogs"
              className="mb-8 inline-flex w-fit items-center text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primary)]"
            >
              Blogs and Articles
            </Link>

            <div className="mb-5 flex flex-wrap gap-2 text-sm font-semibold text-[var(--primary)]">
              <span className="rounded-full border border-[var(--border-soft)] bg-white px-3 py-1">
                {blog.category}
              </span>
              <span className="rounded-full border border-[var(--border-soft)] bg-white px-3 py-1">
                {blog.location}
              </span>
            </div>

            <h1 className="font-heading max-w-4xl text-balance font-bold text-slate-950">
              {blog.title}
            </h1>

            <p className="mt-6 max-w-3xl text-[19px] leading-8 text-slate-700 lg:text-[21px]">
              {blog.excerpt}
            </p>

            <div className="mt-8 grid gap-3 border-l-2 border-[var(--primary)] pl-5 text-base text-slate-700 sm:grid-cols-3 sm:border-l-0 sm:pl-0">
              <MetaItem label="Author" value={blog.author} />
              <MetaItem label="Published" value={blog.publishedAt} />
              <MetaItem label="Reading time" value={blog.readTime} />
            </div>
          </div>

          <div className="relative">
            <div
              className="surface-card-strong overflow-hidden rounded-lg"
              style={lightCardStyle}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={blog.heroImage}
                  alt={blog.imageAlt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-3 divide-x divide-[var(--border-soft)] bg-white text-center">
                <Stat value="5" label="Investment drivers" />
                <Stat value="10" label="Markets to watch" />
                <Stat value="2026" label="Defining year" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8 lg:py-16">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="surface-card rounded-lg p-5" style={lightCardStyle}>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
              In this guide
            </p>
            <nav className="mt-4 grid gap-3">
              {tableOfContents.map((item) => (
                <a
                  key={item}
                  href={`#${slugify(item)}`}
                  className="rounded-md border border-transparent px-3 py-2 text-[15px] font-semibold text-slate-700 transition hover:border-[var(--border-soft)] hover:bg-[#f8fafc] hover:text-[var(--primary)]"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div
            className="surface-card mt-5 rounded-lg p-5"
            style={lightCardStyle}
          >
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
              Featured event
            </p>
            <h3 className="mt-3 text-xl font-bold text-slate-950">
              Clean Energy Conference Australia-Africa
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-700">
              A forum for investment, innovation, and collaboration across
              Africa and Australia.
            </p>
            <Link
              href="/contact"
              className="btn-glow mt-5 inline-flex rounded-md px-5 py-3 text-sm font-bold text-white"
            >
              Register interest
            </Link>
          </div>
        </aside>

        <article className="min-w-0">
          <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8 prose-a:font-semibold prose-a:text-[var(--primary)]">
            <p>Africa is entering a new era of energy investment.</p>
            <p>
              Growing electricity demand, rapid urbanisation, favourable
              renewable energy resources, expanding regional power markets, and
              increasing international interest are creating significant
              opportunities across the continent. Governments, development
              finance institutions, private investors, utilities, and technology
              companies are all playing a role in accelerating Africa's energy
              transition.
            </p>
            <p>
              At the same time, global demand for clean energy technologies has
              increased the strategic importance of Africa's renewable resources
              and critical minerals, positioning many African countries as key
              partners in the global transition to sustainable energy.
            </p>
            <p>
              For investors, the question is no longer whether Africa presents
              opportunities, but where those opportunities are emerging and how
              to participate successfully.
            </p>

            <SectionTitle id="why-africa-is-becoming-an-energy-investment-destination">
              Why Africa Is Becoming an Energy Investment Destination
            </SectionTitle>
            <p>
              Africa has one of the fastest-growing populations in the world,
              alongside rising industrialisation and increasing electricity
              demand. Governments are also implementing reforms aimed at
              improving investment environments, encouraging private-sector
              participation, and supporting long-term infrastructure
              development.
            </p>
          </div>

          <div className="mt-6">
            <BulletPanel
              title="Many countries are investing heavily in"
              items={investmentAreas}
            />
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="key-drivers-of-energy-investment">
              Key Drivers of Energy Investment
            </SectionTitle>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {drivers.map((driver) => (
              <InsightCard key={driver.title} title={driver.title} text={driver.text} />
            ))}
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="where-investors-are-focusing">
              Where Investors Are Focusing
            </SectionTitle>
          </div>

          <div className="mt-8 grid gap-6">
            {focusSectors.map((sector, index) => (
              <InvestmentCard key={sector.title} sector={sector} index={index + 1} />
            ))}
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="countries-to-watch">
              Countries to Watch
            </SectionTitle>
            <p>
              Investment opportunities exist across the continent, but several
              countries continue to receive increasing attention due to
              supportive policies, growing infrastructure, and renewable energy
              potential. Each market presents unique opportunities depending on
              regulatory frameworks, natural resources, grid infrastructure, and
              investment priorities.
            </p>
          </div>

          <div className="mt-6">
            <TagPanel title="Examples include" items={countries} />
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="challenges-investors-should-consider">
              Challenges Investors Should Consider
            </SectionTitle>
            <p>
              Although Africa presents considerable opportunities, successful
              investment requires understanding local market conditions.
              Comprehensive due diligence remains essential before entering any
              market.
            </p>
          </div>

          <div className="mt-6">
            <BulletPanel
              title="Common considerations include"
              items={investorConsiderations}
            />
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <BulletPanel title="Why partnerships matter" items={partnershipGroups} />
            <BulletPanel
              title="Conferences help organisations"
              items={conferenceBenefits}
            />
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <h2 className="font-heading font-bold text-slate-950">
              The Role of Conferences in Energy Investment
            </h2>
            <p>
              One of the most effective ways to build partnerships is through
              industry conferences. Energy conferences bring together
              decision-makers from across the value chain, and many successful
              infrastructure projects begin with conversations that take place
              during industry events.
            </p>
          </div>

          <div
            id="featured-event"
            className="surface-card-strong mt-12 scroll-mt-28 rounded-lg p-6 md:p-8"
            style={lightCardStyle}
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Featured event
            </p>
            <h2 className="font-heading mt-3 font-bold text-slate-950">
              Clean Energy Conference Australia-Africa
            </h2>
            <p className="mt-4 text-[20px] leading-8 text-slate-700">
              The Clean Energy Conference Australia-Africa provides a platform
              for organisations looking to strengthen partnerships between
              Africa and Australia while accelerating clean energy investment.
              Whether you are exploring new markets, seeking investment
              opportunities, or building strategic partnerships, the conference
              offers an environment designed to support meaningful
              collaboration.
            </p>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <TagGroup title="Who attends" items={featuredEventAudience} />
              <TagGroup title="Topics include" items={featuredEventTopics} />
            </div>

            <div className="mt-6 grid gap-3 text-base font-semibold text-slate-800 sm:grid-cols-3">
              <span>Event Date: [Insert Date]</span>
              <span>Location: [Insert Venue]</span>
              <span>Registration: [Insert Registration Link]</span>
            </div>

            <Link
              href="/contact"
              className="btn-glow mt-7 inline-flex rounded-md px-6 py-3 text-sm font-bold text-white"
            >
              Register interest
            </Link>
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-slate-950 prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="frequently-asked-questions">
              Frequently Asked Questions
            </SectionTitle>
          </div>

          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <FaqItem key={faq.question} faq={faq} />
            ))}
          </div>

          <div
            className="surface-card-strong mt-12 rounded-lg p-6 md:p-8"
            style={lightCardStyle}
          >
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Looking ahead
            </p>
            <h2 className="font-heading mt-3 font-bold text-slate-950">
              2026 could be a defining year
            </h2>
            <p className="mt-4 text-[20px] leading-8 text-slate-700">
              Africa's energy transition represents one of the most significant
              investment opportunities of the coming decades. As renewable
              technologies mature, infrastructure expands, and regional
              cooperation strengthens, investors who build strategic
              partnerships and understand local market dynamics will be well
              positioned to contribute to, and benefit from, the continent's
              evolving energy landscape.
            </p>
          </div>

          <ShareBar />
        </article>
      </section>

      <RelatedArticles />
    </main>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </span>
      <span className="mt-1 block font-semibold text-slate-950">{value}</span>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-4">
      <strong className="block text-2xl font-black text-slate-950">
        {value}
      </strong>
      <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
        {label}
      </span>
    </div>
  );
}

function SectionTitle({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="scroll-mt-28 font-bold text-slate-950">
      {children}
    </h2>
  );
}

function InvestmentCard({
  sector,
  index,
}: {
  sector: (typeof focusSectors)[number];
  index: number;
}) {
  return (
    <section
      className="surface-card hover-glow-card rounded-lg p-6"
      style={lightCardStyle}
    >
      <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--primary)]">
        {String(index).padStart(2, "0")}
      </p>
      <h3 className="font-heading mt-2 text-2xl font-bold text-slate-950">
        {sector.title}
      </h3>
      <p className="mt-4 text-[18px] leading-8 text-slate-700">{sector.text}</p>
      <TagGroup title="Investment opportunities" items={sector.opportunities} />
    </section>
  );
}

function TagGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--border-soft)] bg-[#f8fafc] px-3 py-1 text-sm font-semibold text-slate-700"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function TagPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      className="surface-card-strong rounded-lg p-6"
      style={lightCardStyle}
    >
      <h3 className="font-heading text-2xl font-bold text-slate-950">{title}</h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-[var(--border-soft)] bg-[#f8fafc] px-3 py-3 text-center text-sm font-bold text-slate-800"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function InsightCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="surface-card hover-glow-soft rounded-lg p-5"
      style={lightCardStyle}
    >
      <h3 className="font-heading text-xl font-bold text-slate-950">{title}</h3>
      <p className="mt-3 text-base font-semibold leading-7 text-slate-700">
        {text}
      </p>
    </div>
  );
}

function BulletPanel({ title, items }: { title: string; items: string[] }) {
  return (
    <div
      className="surface-card-strong rounded-lg p-6"
      style={lightCardStyle}
    >
      <h3 className="font-heading text-2xl font-bold text-slate-950">{title}</h3>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-base font-semibold text-slate-800"
          >
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FaqItem({ faq }: { faq: (typeof faqs)[number] }) {
  return (
    <details className="surface-card rounded-lg p-5" style={lightCardStyle}>
      <summary className="cursor-pointer list-none font-heading text-xl font-bold text-slate-950">
        {faq.question}
      </summary>
      <p className="mt-3 text-base leading-7 text-slate-700">{faq.answer}</p>
    </details>
  );
}

function ShareBar() {
  return (
    <div className="mt-12 border-t border-[var(--border-soft)] pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-500">
            Share this article
          </p>
          <p className="mt-1 text-base text-slate-700">
            Help your network understand Africa's energy investment opportunity.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ShareLink label="LinkedIn" href="#" />
          <ShareLink label="X" href="#" />
          <ShareLink label="Email" href="#" />
        </div>
      </div>
    </div>
  );
}

function ShareLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="btn-outline-glow inline-flex rounded-md px-4 py-2 text-sm font-bold text-slate-950"
    >
      {label}
    </a>
  );
}

function RelatedArticles() {
  return (
    <section className="border-t border-[var(--border-soft)] bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--primary)]">
              Related articles
            </p>
            <h2 className="font-heading mt-3 font-bold text-slate-950">
              More from Clean Energy Conference
            </h2>
          </div>
          <Link
            href="/blogs"
            className="btn-outline-glow inline-flex w-fit rounded-md px-5 py-3 text-sm font-bold text-slate-950"
          >
            View all articles
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {relatedPosts.map((post) => (
            <Link
              key={post.title}
              href={post.href}
              className="surface-card hover-glow-card rounded-lg p-6"
              style={lightCardStyle}
            >
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--primary)]">
                {post.meta}
              </p>
              <h3 className="mt-4 text-2xl font-bold text-slate-950">{post.title}</h3>
              <span className="mt-6 inline-flex text-sm font-bold text-slate-700">
                Read article
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
