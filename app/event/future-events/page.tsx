import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  ArrowRight,
} from "lucide-react";

const events = [
  {
    title: "AfriFueling EXPO 2025",
    subtitle: "Clean Energy Events Around the World",
    date: "05 Sep, 2025",
    location: "Kigali, Rwanda",
    venue: "Kigali Expo Centre",
    description:
      "A sector-focused expo bringing together fuel distribution, renewable energy, logistics, infrastructure, and transition-related stakeholders.",
    image: "/images/future-events/afrifueling-expo.jpg",
    href: "/event/future-events/afrifueling-expo-2025",
  },
  {
    title: "Africa Energy Forum",
    subtitle: "Clean Energy Events Around the World",
    date: "17 Jun, 2026",
    location: "Cape Town, South Africa",
    venue: "Cape Town International Convention Centre",
    description:
      "A major regional gathering exploring investment, infrastructure, energy transition, policy, and project development opportunities.",
    image: "/images/future-events/africa-energy-forum.jpg",
    href: "/event/future-events/africa-energy-forum",
  },
  {
    title: "Clean Energy Conference Australia Africa",
    subtitle: "Clean Energy Events Around the World",
    date: "06 Aug, 2026",
    location: "Kigali, Rwanda",
    venue: "Kigali Marriott Hotel",
    description:
      "A two-day conference and exhibition focused on clean energy, responsible mining, climate finance, ESG, innovation, and regional collaboration.",
    image: "/images/future-events/clean-energy-aa.jpg",
    href: "/event/future-events/clean-energy-conference-australia-africa",
  },
  {
    title: "Open Source in Energy Access Symposium",
    subtitle: "Clean Energy Events Around the World",
    date: "11 Jun, 2025",
    location: "Nairobi, Kenya",
    venue: "Nairobi",
    description:
      "A convening around open technology, distributed systems, innovation, and energy access solutions.",
    image: "/images/future-events/open-source-energy.jpg",
    href: "/event/future-events/open-source-energy-access-symposium",
  },
  {
    title: "Africa Down Under (ADU)",
    subtitle: "Clean Energy Events Around the World",
    date: "03 Sep, 2026",
    location: "Perth, Australia",
    venue: "Perth, WA",
    description:
      "An Australia-Africa business and investment event with strong links to resources, infrastructure, and future-facing energy opportunity.",
    image: "/images/future-events/africa-down-under.jpg",
    href: "/event/future-events/africa-down-under",
  },
];

export default function FutureEventsPage() {
  return (
    <main className="bg-[#02026d]">
      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 lg:py-12">
        <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-blue-100/80">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/event" className="hover:text-white">
            Event
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white">Future Events</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-[-0.02em] text-white md:text-4xl">
            Events
          </h1>
          <p className="mt-1 text-base font-semibold text-white">
            Clean Energy Events Around the World
          </p>
        </div>

        <div className="space-y-2">
          {events.map((event) => (
            <article
              key={event.title}
              className="overflow-hidden border border-white/10 bg-white"
            >
              <div className="grid md:grid-cols-[1.1fr_1fr]">
                <div className="relative min-h-[180px] md:min-h-[150px]">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-between p-4 md:p-5">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[color:var(--text-main)]-500">
                      <CalendarDays className="h-3.5 w-3.5 text-[#e06b56]" />
                      <span>{event.date}</span>
                    </div>

                    <h2 className="text-base font-semibold text-[color:var(--text-main)]-900 md:text-xl
">
                      {event.title}
                    </h2>

                    <p className="mt-3 text-base leading-6 text-[color:var(--text-main)]-600">
                      {event.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[color:var(--text-main)]-500">
                      <MapPin className="h-3.5 w-3.5 text-[#e06b56]" />
                      <span>
                        {event.location} · {event.venue}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--text-main)]-400">
                      Event Details
                    </span>

                    <Link
                      href={event.href}
                      className="inline-flex items-center gap-2 rounded-full bg-[#02026d] px-4 py-2 text-base font-semibold text-white transition hover:bg-blue-700"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl bg-white p-4 shadow-sm md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-base font-semibold text-[#02026d]">
                Be part of the movement
              </p>
              <p className="mt-1 text-base text-[color:var(--text-main)]-600">
                Shape the future of sustainability
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded bg-emerald-500 px-5 py-2 text-base font-semibold text-white transition hover:bg-emerald-600"
            >
              Join Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}