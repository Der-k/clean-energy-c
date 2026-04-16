"use client";

import Image from "next/image";
import Link from "next/link";

const featuredPartners = [
  {
    name: "AAEMI",
    logo: "/images/partners/cef.jpg",
  },
  {
    name: "Kratos sotions",
    logo: "/images/partners/kratos.jpg",
  },
  {
    name: "Calebb international",
    logo: "/images/partners/calebb.jpg",
  },
  
];

export function PartnersPreview() {
  return (
    <section className="bg-[#f8fafc]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
            Partnerships
          </p>

          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-4xl">
            Trusted Global Partners and Participants
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[color:var(--text-main)]-600">
            The conference is supported by organizations across energy,
            infrastructure, finance, utilities, skills development, and sector
            collaboration. These partnerships strengthen the event’s visibility,
            credibility, and industry relevance.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {featuredPartners.map((partner) => (
            <div
              key={partner.name}
              className="hover-glow-soft flex h-32 items-center justify-center rounded-[18px] border border-slate-200 bg-white px-5 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
            >
              <div className="relative h-16 w-full">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 180px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/partners"
            className="btn-glow rounded-full px-7 py-3 text-sm font-semibold text-white"
          >
            View All Partners
          </Link>
        </div>
      </div>
    </section>
  );
}