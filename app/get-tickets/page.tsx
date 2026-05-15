"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

const ticketOptions = [
  {
    key: "kigali",
    title: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    image: "/images/conference/perth ticket.jpg",
    href: "https://clean-energy.zohobackstage.com/kigali#/buyTickets/selectTickets?lang=en",
    description:
      "Join East Africa’s leading clean energy dialogue focused on regional integration, climate finance, and decentralized systems.",
  },
  {
    key: "perth",
    title: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    image: "/images/conference/kigali ticket.jpg",
    href: "https://clean-energy.zohobackstage.com/australia#/buyTickets/selectTickets?lang=en",
    description:
      "Engage with global investors, mining leaders, and clean technology innovators connecting Africa to international capital and expertise.",
  },
];

export default function GetTicketsPage() {
  return (
    <main className="pt-24 bg-white">
      {/* HERO / HEADER */}
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">
              Get Tickets
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Registration
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Select your conference edition
            </h1>
            <p className="mt-5 max-w-3xl text-xl
 leading-8 text-[color:var(--text-main)]-600">
              Choose the edition you wish to attend. You will be redirected to
              the official registration platform to complete your ticket
              purchase securely.
            </p>
          </div>
        </div>
      </section>

      {/* TICKET SELECTION */}
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-2">
          {ticketOptions.map((item) => (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-[28px] border border-[#02026e]/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.12)]"
            >
              {/* Image */}
              <div className="relative h-[260px] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                  {item.title}
                </h2>

                <p className="mt-3 text-base leading-7 text-[color:var(--text-main)]-600">
                  {item.description}
                </p>

                <div className="mt-5 space-y-2 text-base text-[color:var(--text-main)]-700">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-[#02026e]" />
                    <span>{item.date}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#02026e]" />
                    <span>{item.venue}</span>
                  </div>
                </div>

                <div className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-[#02026e] group-hover:text-[#010150]">
                  Proceed to registration
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell>
        <div className="rounded-[26px] border border-[#02026e]/30 bg-gradient-to-r from-[#02026e] to-[#010150] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.22)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Need more information?
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Explore the full conference programme
              </h2>
              <p className="mt-3 text-base leading-7 text-white/80 md:text-base">
                Review session formats, speakers, and thematic focus areas before
                securing your place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/event/programme"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[#02026e] transition hover:bg-white/90"
              >
                View Programme
              </Link>

              <Link
                href="/conference"
                className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Conference Overview
              </Link>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}