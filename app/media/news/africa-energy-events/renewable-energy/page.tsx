import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const blog = {
  category: "Renewable Energy Guide",
  title:
    "Renewable Energy Conferences in Africa: The Essential Guide for Industry Professionals",
  excerpt:
    "A practical guide to leading renewable energy conferences in Africa, with recommendations for investors, developers, utilities, government representatives, researchers, and clean technology companies.",
  author: "Clean Energy Conference Editorial Team",
  publishedAt: "[Insert Date]",
  updatedAt: "[Insert Date]",
  readTime: "9 min read",
  location: "Africa and Australia",
  heroImage: "/images/clean-energy-collage.png",
  imageAlt: "Clean energy infrastructure and conference delegates",
};

const tableOfContents = [
  "Why Renewable Energy Conferences Matter",
  "What to Look for in a Renewable Energy Conference",
  "Leading Renewable Energy Conferences in Africa",
  "Which Conference Is Right for You?",
  "Emerging Trends Discussed at Renewable Energy Conferences",
  "Frequently Asked Questions",
];

const selectionCriteria = [
  "Government participation",
  "Investor networking",
  "Technical workshops",
  "Exhibition opportunities",
  "Project showcases",
  "B2B meetings",
  "Startup engagement",
  "International delegates",
  "Industry-leading speakers",
];

const industryDevelopments = [
  "New financing opportunities",
  "Updated government policies",
  "Emerging technologies",
  "Battery storage innovations",
  "Grid modernization projects",
  "Green hydrogen developments",
  "Carbon market initiatives",
  "International investment partnerships",
];

const conferences = [
  {
    name: "Clean Energy Conference Australia-Africa",
    location: "[Insert Location]",
    date: "[Insert Date]",
    registration: "[Insert Link]",
    overview:
      "Designed to strengthen partnerships between Australia and Africa while accelerating renewable energy investment, innovation, technology transfer, and sustainable development.",
    topics: [
      "Renewable Energy",
      "Climate Finance",
      "Critical Minerals",
      "Battery Storage",
      "Green Hydrogen",
      "Sustainable Mining",
      "Grid Modernization",
      "Energy Innovation",
      "Public-Private Partnerships",
      "Investment Opportunities",
    ],
    audience: [
      "Government agencies",
      "Renewable energy developers",
      "Investors",
      "Utilities",
      "Mining companies",
      "EPC contractors",
      "Technology providers",
      "Researchers",
      "Universities",
      "Financial institutions",
    ],
    note:
      "The conference places particular emphasis on Australia-Africa collaboration, helping organizations build strategic partnerships that support Africa's long-term energy transition.",
  },
  {
    name: "Intersolar Africa",
    location: "Nairobi, Kenya",
    date: "February 3-4, 2026",
    dateNote: "Verify before publishing",
    overview:
      "One of Africa's dedicated solar and energy storage exhibitions, bringing together manufacturers, developers, EPC contractors, utilities, investors, policymakers, and technology companies.",
    topics: [
      "Solar PV",
      "Battery Energy Storage",
      "Grid Integration",
      "Smart Energy",
      "E-Mobility",
      "Commercial Solar",
      "Financing Solutions",
    ],
    note:
      "For organizations operating in the solar value chain, Intersolar Africa provides an excellent opportunity to explore new technologies and build regional partnerships.",
  },
  {
    name: "Enlit Africa",
    location: "Cape Town, South Africa",
    date: "[Insert Date]",
    overview:
      "One of the continent's largest conferences focused on power generation, utilities, renewable energy, transmission, distribution, digitalisation, and smart infrastructure.",
    topics: [
      "Renewable Generation",
      "Grid Modernization",
      "Battery Storage",
      "AI in Energy",
      "Water Security",
      "Digital Utilities",
      "Energy Investment",
      "Infrastructure Development",
    ],
    note:
      "The conference attracts thousands of delegates from utilities, governments, engineering firms, investors, and technology companies across Africa.",
  },
  {
    name: "African Energy Week",
    location: "Cape Town, South Africa",
    date: "[Insert Date]",
    overview:
      "One of the largest energy investment gatherings on the continent. Although it covers the broader energy sector, renewable energy has become an increasingly important part of the programme.",
    audience: [
      "Ministers",
      "Regulators",
      "Investors",
      "National energy companies",
      "Renewable developers",
      "Infrastructure funds",
      "Financial institutions",
    ],
    note:
      "The conference is particularly valuable for professionals seeking investment opportunities and high-level policy discussions.",
  },
];

const recommendations = [
  {
    title: "Investors",
    text: "Both events provide access to governments, project developers, financial institutions, and investment opportunities.",
    picks: ["Clean Energy Conference Australia-Africa", "African Energy Week"],
  },
  {
    title: "Renewable Energy Developers",
    text: "These events create opportunities to meet project owners, EPC companies, financiers, and technology providers.",
    picks: [
      "Clean Energy Conference Australia-Africa",
      "Intersolar Africa",
      "Enlit Africa",
    ],
  },
  {
    title: "Government Representatives",
    text: "Government officials benefit from conferences that emphasize policy, infrastructure, regional cooperation, and sustainable development.",
    picks: [
      "Clean Energy Conference Australia-Africa",
      "African Energy Week",
      "Enlit Africa",
    ],
  },
  {
    title: "Utilities",
    text: "Utilities responsible for generation and distribution should prioritize smart grids, transmission, digital utilities, storage, and reliability.",
    picks: ["Enlit Africa"],
  },
  {
    title: "Researchers and Universities",
    text: "Researchers can benefit from technical sessions, innovation showcases, industry case studies, and collaborative research opportunities.",
    picks: ["Clean Energy Conference Australia-Africa"],
  },
];

const trends = [
  {
    title: "Battery Energy Storage",
    text: "Battery storage is becoming increasingly important for integrating renewable energy into national electricity grids.",
  },
  {
    title: "Green Hydrogen",
    text: "Several African countries are investing in green hydrogen projects to support industrial development and future export opportunities.",
  },
  {
    title: "Critical Minerals",
    text: "Africa's reserves of lithium, graphite, manganese, cobalt, copper, and rare earth elements continue to attract global investment as demand for clean energy technologies grows.",
  },
  {
    title: "Climate Finance",
    text: "Access to sustainable finance remains one of the most important drivers of renewable energy development across Africa.",
  },
  {
    title: "Grid Modernization",
    text: "Utilities are investing in smart grids, digital infrastructure, AI-powered operations, and advanced transmission systems to improve reliability and integrate renewable generation.",
  },
];

const conferenceTips = [
  "Study the programme before arriving.",
  "Schedule meetings in advance.",
  "Research speakers and exhibitors.",
  "Bring digital business cards.",
  "Attend networking events.",
  "Participate in technical sessions.",
  "Follow up with new contacts within a few days after the conference.",
];

const faqs = [
  {
    question: "Which is the best renewable energy conference in Africa?",
    answer:
      "The answer depends on your objectives. Some conferences focus on solar technologies, while others emphasize investment, infrastructure, utilities, or policy.",
  },
  {
    question: "Are renewable energy conferences only for engineers?",
    answer:
      "No. These events attract professionals from finance, government, policy, research, technology, manufacturing, consulting, project development, and investment.",
  },
  {
    question: "Why should investors attend renewable energy conferences?",
    answer:
      "Conferences provide opportunities to meet project developers, government representatives, technology companies, and financial institutions while identifying emerging investment opportunities.",
  },
  {
    question: "Are these conferences suitable for startups?",
    answer:
      "Yes. Many conferences include startup showcases, innovation sessions, networking events, and opportunities to connect with investors and strategic partners.",
  },
];

const relatedPosts = [
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
  {
    title: "How clean energy finance is changing across Africa",
    meta: "Investment",
    href: "/blogs/clean-energy-finance-africa",
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

            <h1 className="font-heading max-w-4xl text-balance text-[#02026e]">
              {blog.title}
            </h1>

            <p className="mt-6 max-w-3xl text-[19px] leading-8 text-slate-700 lg:text-[21px]">
              {blog.excerpt}
            </p>

            <div className="mt-8 grid gap-3 border-l-2 border-[var(--primary)] pl-5 text-base text-slate-700 sm:grid-cols-3 sm:border-l-0 sm:pl-0">
              <MetaItem label="Author" value={blog.author} />
              <MetaItem label="Published" value={blog.publishedAt} />
              <MetaItem label="Last updated" value={blog.updatedAt} />
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
                <Stat value="4" label="Featured conferences" />
                <Stat value="5" label="Key trends" />
                <Stat value={blog.readTime} label="Guide length" />
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
            <h3 className="mt-3 text-xl font-bold text-[#02026e]">
              Clean Energy Conference Australia-Africa
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-700">
              Renewable energy, investment, innovation, policy, and
              Australia-Africa collaboration in one platform.
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
          <div className="prose prose-slate max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8 prose-a:font-semibold prose-a:text-[var(--primary)]">
            <p>
              Africa is rapidly emerging as one of the world's most exciting
              renewable energy markets. Governments are accelerating the
              transition toward cleaner energy systems, investors are backing
              large-scale infrastructure projects, and innovative technologies
              are making renewable power more accessible than ever before.
            </p>
            <p>
              As this transformation continues, renewable energy conferences
              have become essential platforms for bringing together
              policymakers, investors, developers, utilities, researchers,
              financiers, manufacturers, and technology providers to discuss the
              future of Africa's energy landscape.
            </p>
            <p>
              Whether you are looking to secure investment, discover emerging
              technologies, understand new regulations, or build strategic
              partnerships, attending the right conference can provide
              significant value.
            </p>

            <SectionTitle id="why-renewable-energy-conferences-matter">
              Why Renewable Energy Conferences Matter
            </SectionTitle>
            <p>
              The renewable energy industry is evolving rapidly. Industry
              conferences allow professionals to stay ahead of these
              developments while building relationships that often lead to
              long-term collaborations.
            </p>
          </div>

          <div className="mt-6">
            <BulletPanel title="Every year brings" items={industryDevelopments} />
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="what-to-look-for-in-a-renewable-energy-conference">
              What to Look for in a Renewable Energy Conference
            </SectionTitle>
            <p>
              Not every conference serves the same purpose. The best conferences
              combine knowledge sharing with genuine business opportunities.
              Before registering, consider whether the event offers strong
              participation, networking, technical content, and access to the
              people shaping the market.
            </p>
          </div>

          <div className="mt-6">
            <BulletPanel
              title="Before registering, look for"
              items={selectionCriteria}
            />
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="leading-renewable-energy-conferences-in-africa">
              Leading Renewable Energy Conferences in Africa
            </SectionTitle>
          </div>

          <div className="mt-8 grid gap-6">
            {conferences.map((conference, index) => (
              <ConferenceCard
                key={conference.name}
                conference={conference}
                index={index + 1}
              />
            ))}
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="which-conference-is-right-for-you">
              Which Conference Is Right for You?
            </SectionTitle>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {recommendations.map((recommendation) => (
              <RecommendationCard
                key={recommendation.title}
                recommendation={recommendation}
              />
            ))}
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="emerging-trends-discussed-at-renewable-energy-conferences">
              Emerging Trends Discussed at Renewable Energy Conferences
            </SectionTitle>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trends.map((trend) => (
              <InsightCard key={trend.title} title={trend.title} text={trend.text} />
            ))}
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8">
            <h2 className="font-heading text-[#02026e]">
              Tips for Making the Most of a Renewable Energy Conference
            </h2>
            <p>
              The strongest business relationships often begin with a simple
              conversation at an industry event. A little preparation can turn a
              conference pass into a long-term opportunity.
            </p>
          </div>

          <div className="mt-6">
            <BulletPanel
              title="To maximize the value of your attendance"
              items={conferenceTips}
            />
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8">
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
              Final thoughts
            </p>
            <h2 className="font-heading mt-3 text-[#02026e]">
              Ready to join the conversation?
            </h2>
            <p className="mt-4 text-[20px] leading-8 text-slate-700">
              Africa's renewable energy sector is entering a period of
              unprecedented growth. If you are looking for an event that
              combines renewable energy, investment, innovation, policy, and
              Australia-Africa collaboration, the Clean Energy Conference
              Australia-Africa provides a unique platform where ideas become
              partnerships and partnerships become projects.
            </p>
            <div className="mt-6 grid gap-3 text-base font-semibold text-slate-800 sm:grid-cols-2">
              <span>Event Date: [Insert Date]</span>
              <span>Location: [Insert Venue]</span>
              <span>Registration: [Insert Registration Link]</span>
              <span>Learn More: [Insert Website]</span>
            </div>
            <Link
              href="/contact"
              className="btn-glow mt-7 inline-flex rounded-md px-6 py-3 text-sm font-bold text-white"
            >
              Register interest
            </Link>
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
      <strong className="block text-2xl font-black text-[#02026e]">
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
    <h2 id={id} className="scroll-mt-28">
      {children}
    </h2>
  );
}

function ConferenceCard({
  conference,
  index,
}: {
  conference: (typeof conferences)[number];
  index: number;
}) {
  return (
    <section
      className="surface-card hover-glow-card rounded-lg p-6"
      style={lightCardStyle}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--primary)]">
            {String(index).padStart(2, "0")}
          </p>
          <h3 className="font-heading mt-2 text-2xl text-[#02026e]">
            {conference.name}
          </h3>
        </div>
        <div className="grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2 md:min-w-[280px]">
          <span>Location: {conference.location}</span>
          <span>
            Date: {conference.date}
            {"dateNote" in conference && conference.dateNote
              ? ` (${conference.dateNote})`
              : ""}
          </span>
        </div>
      </div>

      <p className="mt-5 text-[18px] leading-8 text-slate-700">
        {conference.overview}
      </p>

      {"registration" in conference && conference.registration && (
        <div className="mt-4 text-sm font-semibold text-slate-700">
          Registration: {conference.registration}
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {"topics" in conference && conference.topics && (
          <TagGroup title="Key topics" items={conference.topics} />
        )}
        {"audience" in conference && conference.audience && (
          <TagGroup title="Ideal for" items={conference.audience} />
        )}
      </div>

      <blockquote className="mt-6 border-l-4 border-[var(--primary)] bg-[#f8fafc] px-5 py-4 text-[18px] font-semibold leading-8 text-[#02026e]">
        {conference.note}
      </blockquote>
    </section>
  );
}

function TagGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
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

function RecommendationCard({
  recommendation,
}: {
  recommendation: (typeof recommendations)[number];
}) {
  return (
    <div
      className="surface-card hover-glow-soft rounded-lg p-5"
      style={lightCardStyle}
    >
      <h3 className="font-heading text-xl text-[#02026e]">
        {recommendation.title}
      </h3>
      <p className="mt-3 text-base leading-7 text-slate-700">
        {recommendation.text}
      </p>
      <div className="mt-4 grid gap-2">
        {recommendation.picks.map((pick) => (
          <span
            key={pick}
            className="rounded-md border border-[var(--border-soft)] bg-[#f8fafc] px-3 py-2 text-sm font-bold text-slate-800"
          >
            {pick}
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
      <h3 className="font-heading text-xl text-[#02026e]">{title}</h3>
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
      <h3 className="font-heading text-2xl text-[#02026e]">{title}</h3>
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
      <summary className="cursor-pointer list-none font-heading text-xl font-bold text-[#02026e]">
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
            Share this guide
          </p>
          <p className="mt-1 text-base text-slate-700">
            Help your network find the right renewable energy conference in
            Africa.
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
      className="btn-outline-glow inline-flex rounded-md px-4 py-2 text-sm font-bold text-[#02026e]"
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
            <h2 className="font-heading mt-3 text-[#02026e]">
              More from Clean Energy Conference
            </h2>
          </div>
          <Link
            href="/blogs"
            className="btn-outline-glow inline-flex w-fit rounded-md px-5 py-3 text-sm font-bold text-[#02026e]"
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
              <h3 className="mt-4 text-2xl text-[#02026e]">{post.title}</h3>
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
