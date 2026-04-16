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

            <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-700 sm:text-lg">
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
                className="inline-flex items-center gap-2 rounded-full bg-[#003994] px-6 py-3 text-sm font-semibold text-white transition hover:shadow-[0_0_30px_rgba(0,57,148,0.25)]"
              >
                Explore the conference
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/event/programme"
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:border-[#003994] hover:text-[#003994]"
              >
                <CalendarDays className="h-4 w-4" />
                View programme
              </Link>
            </div>
          </div>

          <div className="rounded-[28px] border border-zinc-200 bg-zinc-50 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#003994]">
              Why it matters
            </p>
            <div className="mt-5 space-y-4">
              {outcomes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white bg-white p-4 text-sm leading-7 text-zinc-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-[#003994] p-5 text-white">
                <p className="text-3xl font-semibold">600+</p>
                <p className="mt-1 text-sm text-blue-100">Expected delegates</p>
              </div>
              <div className="rounded-2xl bg-[#009966] p-5 text-white">
                <p className="text-3xl font-semibold">2</p>
                <p className="mt-1 text-sm text-emerald-100">2026 editions</p>
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
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#003994]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-600">{item.description}</p>
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
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-600">
                2026 Edition
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-zinc-950">
                {edition.name}
              </h3>
              <p className="mt-4 text-sm font-medium text-zinc-800">{edition.date}</p>
              <p className="mt-1 text-sm text-zinc-600">{edition.venue}</p>
              <p className="mt-5 text-sm leading-7 text-zinc-700">{edition.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}