"use client";

import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, Users } from "lucide-react";

const carouselImages = [
  {
    src: "/images/hero-carousel-1.jpg",
    alt: "Delegates networking at the conference",
  },
  {
    src: "/images/hero-carousel-2.jpg",
    alt: "Panel session during the conference",
  },
  {
    src: "/images/hero-carousel-3.jpg",
    alt: "Conference audience during keynote",
  },
  {
    src: "/images/hero-carousel-4.jpg",
    alt: "Exhibition and partner engagement area",
  },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-blue-200/50 blur-3xl" />
        <div className="absolute right-[-100px] top-[60px] h-[260px] w-[260px] rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute bottom-[-140px] left-[20%] h-[280px] w-[280px] rounded-full bg-blue-100/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 md:px-6 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-700 shadow-sm">
              Two 2026 Conference Editions
            </div>

            <h1 className="font-heading max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.03em] text-slate-900 sm:text-5xl lg:text-6xl">
              Driving the Future of
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Clean Energy Innovation
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Join policymakers, investors, innovators, and industry stakeholders
              across two 2026 editions in Kigali and Perth, designed to strengthen
              clean energy collaboration between Africa and Australia.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[20px] border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Kigali Edition
                </p>

                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  <div className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    <span>6–7 August 2026</span>
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>Kigali Marriott Hotel, Rwanda</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[20px] border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Perth Edition
                </p>

                <div className="mt-3 space-y-3 text-sm text-slate-700">
                  <div className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-blue-600" />
                    <span>31 Aug – 1 Sept 2026</span>
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span>Novotel Hotel Perth, Western Australia</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://eventbrite.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                Register Now
              </a>

              <a
                href="/documents/clean-energy-conference-programme-2026.pdf"
                className="btn-outline-glow rounded-full px-6 py-3 text-sm font-semibold text-slate-900"
              >
                View Programme
              </a>

              <Link
                href="/partners/become-a-partner"
                className="btn-outline-glow rounded-full px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Become a Partner
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 border-t border-blue-100 pt-6 sm:grid-cols-3">
              <div>
                <p className="font-heading text-2xl font-bold text-slate-900">
                  2
                </p>
                <p className="mt-1 text-sm text-slate-600">2026 editions</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-slate-900">
                  600+
                </p>
                <p className="mt-1 text-sm text-slate-600">Delegates targeted</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-slate-900">
                  5000+
                </p>
                <p className="mt-1 text-sm text-slate-600">Past participants</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              <div className="relative aspect-[4/4.6] w-full">
                <Image
                  src="/images/hero-conference.jpg"
                  alt="Clean Energy Conference Africa Australia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent p-6">
                <div className="max-w-sm rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300">
                    Conference Focus
                  </p>
                  <p className="mt-2 font-heading text-lg font-semibold text-white">
                    Two editions connecting African energy priorities with Australian innovation, capital, and partnerships.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 top-6 hidden w-56 rounded-2xl border border-blue-100 bg-white p-4 shadow-xl md:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Kigali Edition
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-900">
                East Africa energy transition, climate finance, regional integration
              </p>
            </div>

            <div className="absolute -bottom-6 right-4 hidden w-60 rounded-2xl border border-blue-100 bg-white p-4 shadow-xl md:block">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Perth Edition
              </p>
              <p className="mt-2 text-sm text-slate-700">
                Capital markets, mining technology, green hydrogen, storage, and ESG leadership
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="overflow-hidden rounded-[18px] border border-blue-100 bg-white p-4 shadow-sm">
            <div className="mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-600">
                Conference Moments
              </p>
              <p className="mt-1 text-sm text-slate-600">
                Highlights from previous editions
              </p>
            </div>

            <div className="relative overflow-hidden">
              <div className="hero-marquee flex w-max gap-4">
                {[...carouselImages, ...carouselImages].map((image, index) => (
                  <div
                    key={`${image.src}-${index}`}
                    className="relative h-[200px] w-[280px] shrink-0 overflow-hidden rounded-[12px] border border-blue-100 bg-slate-100"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="280px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-[24px] border border-blue-100 bg-white px-6 py-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                Trusted by partners and participants
              </p>
              <p className="mt-1 text-sm text-slate-600">
                A professional platform for dialogue, collaboration, and industry visibility.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="flex h-14 w-28 items-center justify-center rounded-xl border border-blue-100 bg-slate-50 text-xs font-semibold text-slate-500">
                Partner Logo
              </div>
              <div className="flex h-14 w-28 items-center justify-center rounded-xl border border-blue-100 bg-slate-50 text-xs font-semibold text-slate-500">
                Sponsor Logo
              </div>
              <div className="flex h-14 w-28 items-center justify-center rounded-xl border border-blue-100 bg-slate-50 text-xs font-semibold text-slate-500">
                Exhibitor Logo
              </div>
              <div className="flex h-14 w-28 items-center justify-center rounded-xl border border-blue-100 bg-slate-50 text-xs font-semibold text-slate-500">
                Media Logo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}