"use client";

import Link from "next/link";
import {
  ChevronRight,
  Handshake,
  Building2,
  Globe2,
  CheckCircle2,
} from "lucide-react";

export default function BecomeASponsorPage() {
  return (
    <main className="bg-white pt-24">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,white_72%,#f8fafc_100%)]" />

        <div className="relative w-full flex justify-center px-6 py-12 lg:py-16">
          <div className="w-full max-w-[1400px]">
            <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-black">
              <Link href="/" className="transition hover:text-[#003994]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/partners" className="transition hover:text-[#003994]">
                Partners
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-black">Become a Sponsor</span>
            </div>

            {/* ── Top two-column grid ── */}
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="max-w-3xl">
                <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#003994]">
                  Sponsorship Opportunities
                </p>

                <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-[-0.03em] text-black sm:text-5xl">
                  Become a sponsor of the Clean Energy Conference 2026
                </h1>

                <p className="mt-5 max-w-2xl text-xl leading-8 text-black">
                  Position your brand alongside senior decision-makers, investors,
                  project developers, technology providers, and public sector leaders
                  shaping the clean energy transition in Africa and Australia.
                </p>

                <div className="mt-5 grid gap-4">
                  <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#003994]/5 text-[#003994]">
                        <Handshake className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-black">
                          Strategic visibility
                        </p>
                        <p className="mt-1 text-base leading-7 text-black">
                          Showcase your company to a high-value audience through
                          branding, speaking visibility, exhibition presence, and
                          direct stakeholder engagement.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#003994]/5 text-[#003994]">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-black">
                          Access the right audience
                        </p>
                        <p className="mt-1 text-base leading-7 text-black">
                          Connect with policymakers, utilities, developers,
                          financiers, EPCs, technology partners, and corporate energy
                          stakeholders across both editions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#003994]/5 text-[#003994]">
                        <Globe2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-base font-semibold text-black">
                          Kigali and Perth editions
                        </p>
                        <p className="mt-1 text-base leading-7 text-black">
                          Explore sponsorship for Kigali, Perth, or a combined 2026
                          conference partnership package.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Sticky sidebar ── */}
              <div className="sticky top-28 flex h-fit flex-col items-center justify-start rounded-[28px] border border-slate-200 bg-white p-6 text-center shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#003994]/10 text-[#003994]">
                  <Handshake className="h-8 w-8" />
                </div>

                <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#003994]">
                  Partner With Us
                </p>

                <h2 className="mt-2 font-heading text-3xl font-bold tracking-[-0.02em] text-black">
                  Sponsorship opportunities available
                </h2>

                <p className="mt-3 max-w-md text-base leading-7 text-black">
                  We are partnering with leading organizations, investors,
                  technology providers, and industry stakeholders to shape the
                  future of clean energy across Africa and Australia.
                </p>

                <div className="mt-5 w-full max-w-md rounded-[24px] border border-slate-200 bg-slate-50 p-6 text-left">
                  <p className="text-base font-semibold text-black">
                    Sponsorship categories
                  </p>

                  <ul className="mt-4 space-y-3">
                    {[
                      "Bronze Sponsorship",
                      "Industry/Session Sponsorship",
                      "Silver Sponsorship",
                      "Gold Sponsorship",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#003994]" />
                        <span className="text-base leading-7 text-black">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/partners"
                    className="rounded-2xl border border-slate-200 px-5 py-3 text-base font-semibold text-black transition hover:border-[#003994] hover:text-[#003994]"
                  >
                    Back to Partners
                  </Link>

                  <Link
                    href="/contact"
                    className="rounded-2xl bg-[#003994] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#002b6f]"
                  >
                    Contact Our Team
                  </Link>
                </div>
              </div>
            </div>
            {/* ── End two-column grid ── */}

            {/* ── Full-width centered section ── */}
            <div className="mt-12 flex flex-col items-center">

              {/* Sponsor Categories Table */}
              <div className="w-full overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 bg-[#003994] px-6 py-5">
                  <h2 className="font-heading text-2xl font-bold text-white">
                    Sponsor Categories
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-[900px] w-full border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-left">
                        <th className="border-b border-r border-slate-200 px-5 py-5 text-base font-bold uppercase text-black">
                          Sponsor Categories
                        </th>

                        {[
                          { name: "Bronze",           price: "$10,000.00" },
                          { name: "Industry/Session", price: "$11,000.00" },
                          { name: "Silver",           price: "$15,000.00" },
                          { name: "Gold",             price: "$20,500.00" },
                        ].map((tier) => (
                          <th
                            key={tier.name}
                            className="border-b border-r border-slate-200 px-5 py-5 text-center"
                          >
                            <p className="text-base font-bold uppercase tracking-wide text-black">
                              {tier.name}
                            </p>
                            <div className="mx-auto mt-4 h-[2px] w-full bg-red-500" />
                            <p className="mt-5 text-base font-bold text-black">
                              {tier.price}
                            </p>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {[
                        { feature: "Exclusive",                                    values: ["4",   true,  true,  true]  },
                        { feature: "Logo on the Conference Portal",                values: [true,  true,  true,  true]  },
                        { feature: "Logo on Social Media pages advertising event", values: [true,  true,  true,  true]  },
                        { feature: "Mention at the event",                         values: [false, true,  true,  true]  },
                        { feature: "Online Exhibition",                            values: [false, false, true,  true]  },
                        { feature: "Exhibition Booth",                             values: [false, false, false, false] },
                        { feature: "Roll-up Banner(s)",                            values: ["1",   "2",   "3",   "3"]  },
                        { feature: "Conference Pass",                              values: [true,  true,  true,  true]  },
                        { feature: "Speaking Slot",                                values: [true,  true,  true,  true]  },
                        { feature: "Promotional Material Souvenir insert",         values: [false, false, false, false] },
                        { feature: "Full Page Advert",                             values: [false, false, false, false] },
                        { feature: "Spotlight during the session",                 values: [false, false, false, false] },
                      ].map((row) => (
                        <tr key={row.feature} className="border-b border-slate-200 bg-white">
                          <td className="border-r border-slate-200 px-5 py-4 text-base font-medium text-black">
                            {row.feature}
                          </td>
                          {row.values.map((value, index) => (
                            <td key={index} className="border-r border-slate-200 px-5 py-4 text-center">
                              {typeof value === "boolean" ? (
                                value ? (
                                  <span className="text-xl font-bold text-green-600">✓</span>
                                ) : (
                                  <span className="text-xl font-bold text-red-500">⊖</span>
                                )
                              ) : (
                                <span className="text-base font-semibold text-black">{value}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Become a Sponsor CTA */}
              <div className="mt-8 flex w-full justify-center">
                <Link
                  href="/contact"
                  className="rounded-2xl bg-[#003994] px-10 py-4 text-base font-semibold text-white transition hover:bg-[#002b6f]"
                >
                  Become a Sponsor
                </Link>
              </div>

              {/* Why Sponsor */}
              <div className="mt-8 w-full rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-[#003994]">
                  Why sponsor
                </p>

                <ul className="mt-4 space-y-3">
                  {[
                    "Strengthen brand credibility in the clean energy market",
                    "Support dialogue around energy transition, investment, and innovation",
                    "Build commercial relationships with high-level attendees",
                    "Gain tailored visibility through curated sponsorship packages",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#003994]" />
                      <span className="text-base leading-7 text-black">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
            {/* ── End full-width section ── */}

          </div>
        </div>
      </section>
    </main>
  );
}