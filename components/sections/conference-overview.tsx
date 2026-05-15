import Link from "next/link";
import { ArrowRight, CalendarDays, Globe, Leaf, Users, Zap } from "lucide-react";

const highlights = [
  {
    icon: Globe,
    title: "Africa–Australia platform",
    description:
      "A cross-continental meeting point for governments, investors, utilities, innovators, and industry leaders shaping the clean energy future.",
  },
  {
    icon: Zap,
    title: "Energy, mining and infrastructure",
    description:
      "Focused on renewable energy, critical minerals, grid modernization, green industrialization, climate innovation, and sustainable infrastructure.",
  },
  {
    icon: Users,
    title: "High-level connections",
    description:
      "Designed to accelerate partnerships, policy dialogue, investment matchmaking, and knowledge exchange across Africa and Australia.",
  },
  {
    icon: Leaf,
    title: "Practical outcomes",
    description:
      "Built around investment commitments, strategic collaboration, capacity building, and long-term sector growth.",
  },
];

const editions = [
  {
    name: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    description:
      "Focused on East Africa’s energy transition, regional integration, decentralized energy systems, climate finance, clean mobility, and innovation-led policy.",
    accent: "from-blue-600/15 to-cyan-400/10 border-blue-200",
  },
  {
    name: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    description:
      "Connecting African priorities to Australian capital markets, advanced mining technologies, green hydrogen, storage innovation, and ESG leadership.",
    accent: "from-emerald-600/15 to-teal-400/10 border-emerald-200",
  },
];

const outcomes = [
  "Secure investment momentum across solar, wind, hydrogen, storage, and grid development.",
  "Strengthen Africa–Australia cooperation through partnerships, policy dialogue, and institutional collaboration.",
  "Create a premium platform for technology showcase, investor engagement, and sector matchmaking.",
];

export function ConferenceOverview() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,57,148,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(0,153,102,0.08),transparent_35%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              Conference Overview
            </div>

            <h2 className="mt-6 max-w-3xl text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              A flagship clean energy platform linking Africa and Australia
            </h2>

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-700 sm:text-xl
">
              The Clean Energy Conference & Exhibition brings together policy leaders,
              investors, utilities, project developers, innovators, and development
              partners to accelerate renewable energy, critical minerals, climate
              innovation, and sustainable infrastructure. The 2026 editions are positioned
              to deepen regional collaboration, unlock investment, and support practical
              energy transition outcomes across both markets.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/conference"
                className="inline-flex items-center gap-2 rounded-full bg-[#003994] px-6 py-3 text-base font-semibold text-white transition hover:shadow-[0_0_30px_rgba(0,57,148,0.25)]"
              >
                Explore the conference
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/event/programme"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-900 transition hover:border-[#003994] hover:text-[#003994]"
              >
                <CalendarDays className="h-4 w-4" />
                View programme
              </Link>
            </div>
          </div>

         <div className="rounded-[32px] border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-8 shadow-[0_20px_60px_rgba(2,6,23,0.08)] sm:p-10 lg:p-12">
  <div className="flex items-center gap-3">
    <div className="h-3 w-3 rounded-full bg-[#003994]" />
    <p className="text-base font-semibold uppercase tracking-[0.22em] text-[#003994] sm:text-xl
">
      Why it matters
    </p>
  </div>

  <div className="mt-8 space-y-5">
    {outcomes.map((item, index) => (
      <div
        key={item}
        className="group flex items-start gap-5 rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#003994]/20 hover:shadow-[0_18px_40px_rgba(0,57,148,0.08)] sm:p-7"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#003994] text-xl
 font-semibold text-white shadow-[0_10px_24px_rgba(0,57,148,0.22)]">
          {index + 1}
        </div>

        <p className="text-base leading-8 text-zinc-700 sm:text-xl
 sm:leading-9">
          {item}
        </p>
      </div>
    ))}
  </div>

  <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
    <div className="rounded-[28px] bg-[#003994] p-7 text-white shadow-[0_18px_40px_rgba(0,57,148,0.24)]">
      <p className="text-5xl font-bold tracking-tight">600+</p>
      <p className="mt-3 text-base leading-7 text-blue-100">
        Expected delegates from government, investment, energy, mining,
        infrastructure, and climate sectors.
      </p>
    </div>

    <div className="rounded-[28px] bg-[#009966] p-7 text-white shadow-[0_18px_40px_rgba(0,153,102,0.22)]">
      <p className="text-5xl font-bold tracking-tight">2</p>
      <p className="mt-3 text-base leading-7 text-emerald-100">
        Strategic 2026 editions connecting African priorities with Australian
        innovation, capital, and technology.
      </p>
    </div>
  </div>
</div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(2,6,23,0.08)]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-[22px] bg-gradient-to-br from-blue-100 to-blue-50 text-[#003994] shadow-[0_12px_30px_rgba(0,57,148,0.14)] ring-1 ring-blue-100 transition duration-300 group-hover:scale-105 group-hover:shadow-[0_18px_40px_rgba(0,57,148,0.2)]">
  <Icon className="h-8 w-8 stroke-[2.2]" />
</div>
                <h3 className="mt-4 text-xl
 font-semibold text-zinc-950">{item.title}</h3>
                <p className="mt-3 text-base leading-7 text-zinc-600">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {editions.map((edition) => (
            <div
              key={edition.name}
              className={`rounded-[28px] border bg-gradient-to-br ${edition.accent} p-7 shadow-sm`}
            >
              <p className="text-base font-semibold uppercase tracking-[0.18em] text-zinc-600">
                2026 Edition
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-zinc-950">
                {edition.name}
              </h3>
              <p className="mt-4 text-base font-medium text-zinc-800">{edition.date}</p>
              <p className="mt-1 text-base text-zinc-600">{edition.venue}</p>
              <p className="mt-5 text-base leading-7 text-zinc-700">{edition.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}