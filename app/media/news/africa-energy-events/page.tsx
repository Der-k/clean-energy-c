import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const blog = {
  category: "Energy Events Guide",
  title:
    "Top Africa Energy Events in 2026: The Ultimate Guide to Clean Energy Conferences, Summits & Investment Forums",
  excerpt:
    "A practical guide to the leading Africa energy events in 2026, with recommendations for investors, policymakers, renewable energy companies, utilities, and clean technology leaders.",
  author: "Clean Energy Conference Editorial Team",
  publishedAt: "January 2026",
  readTime: "10 min read",
  location: "Africa and Australia",
  heroImage: "/images/clean-energy-collage.png",
  imageAlt: "Clean energy infrastructure and conference delegates",
};

const tableOfContents = [
  "Why Attend Africa Energy Events?",
  "How We Selected These Events",
  "Top Africa Energy Events in 2026",
  "Which Conference Should You Attend?",
  "Key Trends Shaping Africa's Energy Sector",
  "Frequently Asked Questions",
];

const events = [
  {
    name: "Clean Energy Conference Australia-Africa",
    location: "[City, Country]",
    date: "[Insert Date]",
    website: "[Insert Website]",
    registration: "[Insert Registration Link]",
    overview:
      "Designed to strengthen collaboration between Australia and Africa while accelerating investment, innovation, and sustainable development across the energy sector.",
    themes: [
      "Renewable Energy",
      "Critical Minerals",
      "Climate Finance",
      "Energy Investment",
      "Battery Storage",
      "Green Hydrogen",
      "Sustainable Mining",
      "Grid Modernization",
      "Energy Innovation",
      "Public-Private Partnerships",
    ],
    audience: [
      "Government agencies",
      "Investors",
      "Utilities",
      "Renewable energy developers",
      "Mining companies",
      "Financial institutions",
      "EPC contractors",
      "Technology providers",
      "Researchers and universities",
      "Development organizations",
    ],
    standout:
      "Its defining strength is Australia-Africa collaboration, creating space for knowledge exchange, investment partnerships, technology transfer, and long-term cooperation.",
  },
  {
    name: "African Energy Week",
    location: "[Insert Location]",
    date: "[Insert Date]",
    overview:
      "One of the continent's flagship energy conferences, attracting ministers, regulators, investors, operators, financiers, and service providers from across Africa and beyond.",
    audience: [
      "Investors",
      "Government leaders",
      "Oil and gas executives",
      "Renewable developers",
      "International energy companies",
    ],
  },
  {
    name: "Africa Energy Indaba",
    location: "[Insert Location]",
    date: "[Insert Date]",
    overview:
      "A platform for industry leaders to discuss practical solutions to Africa's energy challenges through technical sessions, exhibitions, policy discussions, investment forums, and networking.",
    audience: [
      "Utilities",
      "Policymakers",
      "Technology companies",
      "Infrastructure developers",
      "Energy consultants",
    ],
  },
  {
    name: "Enlit Africa",
    location: "[Insert Location]",
    date: "[Insert Date]",
    overview:
      "Focused on the transformation of Africa's electricity sector, including generation, transmission, distribution, digitalization, and smart infrastructure.",
    audience: [
      "Utilities",
      "Grid operators",
      "Engineers",
      "Technology providers",
      "Energy planners",
    ],
  },
  {
    name: "Intersolar Africa",
    location: "[Insert Location]",
    date: "[Insert Date]",
    overview:
      "A strong fit for organizations involved in solar power and battery storage, with opportunities to explore emerging technologies and market trends.",
    themes: [
      "Solar PV",
      "Battery Storage",
      "Smart Energy Systems",
      "Commercial Solar",
      "Utility-Scale Projects",
      "Financing Solutions",
    ],
  },
];

const recommendations = [
  {
    title: "Best for Investors",
    text: "Look for conferences with strong participation from governments, project developers, financial institutions, and infrastructure funds.",
    picks: ["Clean Energy Conference Australia-Africa", "African Energy Week"],
  },
  {
    title: "Best for Government Officials",
    text: "Government representatives benefit from events focused on policy dialogue, regional cooperation, infrastructure planning, and public-private partnerships.",
    picks: ["Clean Energy Conference Australia-Africa", "Africa Energy Indaba"],
  },
  {
    title: "Best for Renewable Energy Companies",
    text: "Developers can gain valuable insight into project development, financing, technology innovation, and market entry.",
    picks: ["Clean Energy Conference Australia-Africa", "Intersolar Africa"],
  },
  {
    title: "Best for Utilities",
    text: "Utilities should prioritize events covering grid modernization, digital transformation, transmission, and distribution infrastructure.",
    picks: ["Enlit Africa", "Africa Energy Indaba"],
  },
];

const trends = [
  {
    title: "Renewable Energy Expansion",
    text: "Solar, wind, geothermal, and hydropower continue to attract investment as countries diversify their energy mix and improve electricity access.",
  },
  {
    title: "Battery Energy Storage",
    text: "Battery technologies are becoming increasingly important for grid reliability and higher levels of renewable energy integration.",
  },
  {
    title: "Green Hydrogen",
    text: "Several African countries are exploring green hydrogen production to support industrial development and future export markets.",
  },
  {
    title: "Climate Finance",
    text: "Access to climate finance remains one of the biggest drivers of renewable energy deployment across the continent.",
  },
  {
    title: "Critical Minerals",
    text: "Africa's lithium, graphite, cobalt, manganese, copper, and rare earth minerals continue to play a strategic role in the clean energy transition.",
  },
  {
    title: "Digital Energy",
    text: "Artificial intelligence, smart grids, predictive maintenance, digital twins, and data analytics are changing how energy systems are managed.",
  },
];

const networkingBenefits = [
  "Build strategic partnerships",
  "Meet project financiers",
  "Identify suppliers",
  "Understand market trends",
  "Explore new countries",
  "Learn from industry leaders",
];

const conferenceTips = [
  "Research the agenda.",
  "Identify speakers you want to meet.",
  "Schedule meetings in advance.",
  "Bring digital business cards.",
  "Prepare a concise introduction.",
  "Attend networking sessions.",
  "Follow up promptly after the conference.",
];

const faqs = [
  {
    question: "What is the biggest energy conference in Africa?",
    answer:
      "Several conferences attract international participation, each focusing on different areas such as investment, utilities, renewable energy, technology, and policy.",
  },
  {
    question: "Which conference is best for renewable energy companies?",
    answer:
      "Events with dedicated renewable energy tracks and strong government participation typically provide the greatest opportunities for developers and technology providers.",
  },
  {
    question: "Which conference is best for investors?",
    answer:
      "Investment-focused conferences that attract governments, project developers, infrastructure funds, and financial institutions are generally the best choice.",
  },
  {
    question: "Why attend a clean energy conference?",
    answer:
      "Attending a clean energy conference provides access to industry knowledge, policy updates, investment opportunities, technology showcases, and valuable networking.",
  },
];

const relatedPosts = [
  {
    title: "What to expect from the Kigali 2026 edition",
    meta: "Event Preview",
    href: "/blogs/Kigali-2026-edition",
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
                <Stat value="5" label="Featured events" />
                <Stat value="2026" label="Conference guide" />
                <Stat value="6" label="Key energy trends" />
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
              A platform designed to turn conversations into partnerships and
              ideas into action.
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
              Africa's energy sector is undergoing one of the most significant
              transformations in its history. Rapid investment in renewable
              energy, battery storage, critical minerals, transmission
              infrastructure, hydrogen, and climate finance is creating
              opportunities for governments, investors, developers, utilities,
              researchers, and technology providers.
            </p>
            <p>
              As countries work towards expanding energy access while reducing
              emissions, industry conferences have become essential meeting
              places for decision-makers to exchange ideas, showcase
              innovations, secure investment, and build strategic partnerships.
            </p>
            <p>
              Whether you are an investor looking for your next opportunity, a
              policymaker shaping national energy strategies, a developer
              seeking project partners, or a technology company exploring new
              markets, attending the right conference can provide invaluable
              insights and connections.
            </p>

            <SectionTitle id="why-attend-africa-energy-events">
              Why Attend Africa Energy Events?
            </SectionTitle>
            <p>
              Africa is home to some of the world's fastest-growing renewable
              energy markets. Governments across the continent are investing in
              utility-scale solar, wind power, geothermal energy, battery
              storage, green hydrogen, transmission infrastructure, and
              electrification initiatives.
            </p>
            <BulletPanel
              title="Energy conferences help you"
              items={[
                "Meet government officials and regulators",
                "Connect with project developers and EPC companies",
                "Discover new investment opportunities",
                "Learn about emerging technologies",
                "Build regional and international partnerships",
                "Network with investors, utilities, researchers, and innovators",
                "Stay informed about changing policies and market trends",
              ]}
            />

            <SectionTitle id="how-we-selected-these-events">
              How We Selected These Events
            </SectionTitle>
            <p>
              The conferences featured in this guide were selected based on
              industry influence, government participation, international
              attendance, investment opportunities, technology showcases,
              networking potential, speaker quality, and focus on Africa's
              energy transition.
            </p>

            <SectionTitle id="top-africa-energy-events-in-2026">
              Top Africa Energy Events in 2026
            </SectionTitle>
          </div>

          <div className="mt-8 grid gap-6">
            {events.map((event, index) => (
              <EventCard key={event.name} event={event} index={index + 1} />
            ))}
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8">
            <SectionTitle id="which-conference-should-you-attend">
              Which Conference Should You Attend?
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
            <SectionTitle id="key-trends-shaping-africa-s-energy-sector">
              Key Trends Shaping Africa's Energy Sector in 2026
            </SectionTitle>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {trends.map((trend) => (
              <InsightCard key={trend.title} title={trend.title} text={trend.text} />
            ))}
          </div>

          <div className="prose prose-slate mt-12 max-w-none prose-headings:font-heading prose-headings:text-[#02026e] prose-p:text-[20px] prose-p:leading-8">
            <h2 className="font-heading text-[#02026e]">
              Why Networking Matters
            </h2>
            <p>
              Many of the continent's largest renewable energy projects begin
              with conversations between governments, investors, developers,
              financiers, and technology companies. The relationships built
              during conferences often continue long after the event concludes.
            </p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <BulletPanel title="Networking can help you" items={networkingBenefits} />
            <BulletPanel
              title="Tips for getting the most out of an energy conference"
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
              Ready to Join the Conversation?
            </h2>
            <p className="mt-4 text-[20px] leading-8 text-slate-700">
              Africa's clean energy future is being shaped by collaboration,
              innovation, and investment. If you are looking to engage with
              leaders from government, industry, finance, research, and
              technology while exploring Australia-Africa collaboration, the
              Clean Energy Conference Australia-Africa offers a platform
              designed to turn conversations into partnerships and ideas into
              action.
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

function EventCard({
  event,
  index,
}: {
  event: (typeof events)[number];
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
            {event.name}
          </h3>
        </div>
        <div className="grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2 md:min-w-[260px]">
          <span>Location: {event.location}</span>
          <span>Date: {event.date}</span>
        </div>
      </div>

      <p className="mt-5 text-[18px] leading-8 text-slate-700">
        {event.overview}
      </p>

      {"registration" in event && (
        <div className="mt-4 grid gap-2 text-sm font-semibold text-slate-700 sm:grid-cols-2">
          <span>Registration: {event.registration}</span>
          <span>Website: {event.website}</span>
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {"themes" in event && event.themes && (
          <TagGroup title="Key themes" items={event.themes} />
        )}
        {"audience" in event && event.audience && (
          <TagGroup title="Ideal for" items={event.audience} />
        )}
      </div>

      {"standout" in event && event.standout && (
        <blockquote className="mt-6 border-l-4 border-[var(--primary)] bg-[#f8fafc] px-5 py-4 text-[18px] font-semibold leading-8 text-[#02026e]">
          {event.standout}
        </blockquote>
      )}
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
          <li key={item} className="flex gap-3 text-base font-semibold text-slate-800">
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
            Help your network find the right Africa energy event in 2026.
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
