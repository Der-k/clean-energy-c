"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe2,
  Lightbulb,
  Send,
} from "lucide-react";

type FormState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  sector: string;
  editionInterest: string;
  boothPreference: string;
  message: string;
};

const initialForm: FormState = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  country: "",
  website: "",
  sector: "",
  editionInterest: "",
  boothPreference: "",
  message: "",
};

const exhibitorProfiles = [
  "Renewable energy developers",
  "EV and battery technology providers",
  "Mining and critical minerals companies",
  "Engineering, procurement and construction firms",
  "Energy storage, smart grid and hydrogen companies",
  "ESG, sustainability and climate solution providers",
  "Universities, research institutions and startups",
  "Supporting industries and service providers",
];

const benefits = [
  "Present innovations to decision-makers and project owners",
  "Gain qualified leads in the growing clean energy market",
  "Meet investors and policy influencers",
  "Build brand credibility through sector visibility",
  "Access networking, deal rooms, and partnership sessions",
  "Receive conference website and event exposure",
];

const infoCards = [
  {
    title: "Exhibition opportunities",
    description:
      "The exhibition programme is currently being finalized. Exhibitors and showcases will be announced soon.",
  },
  {
    title: "Who should exhibit",
    description:
      "Ideal for companies in renewable energy, clean tech, critical minerals, mobility, infrastructure, and sustainability.",
  },
  {
    title: "Why register now",
    description:
      "Early registration ensures priority updates and early access to booth allocations once released.",
  },
];

export default function ExhibitionPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Form:", form);
    setSubmitted(true);
    setForm(initialForm);
  }

  return (
    <main className="bg-white pt-24">
      {/* HERO */}
      <section className="bg-[#02026e] text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">
            Exhibition Opportunities (To Be Announced)
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl">
            Register your interest to exhibit at the Clean Energy Conference
            Kigali &amp; Perth 2026.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {infoCards.map((card) => (
          <div
            key={card.title}
            className="border rounded-2xl p-6 shadow-sm"
          >
            <Lightbulb className="h-6 w-6 text-[#02026e]" />
            <h3 className="mt-3 font-semibold text-lg">{card.title}</h3>
            <p className="text-sm mt-2 text-zinc-600">
              {card.description}
            </p>
          </div>
        ))}
      </section>

      {/* PROFILES + BENEFITS */}
      <section className="max-w-7xl mx-auto px-4 pb-16 grid lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold">Who Should Exhibit</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {exhibitorProfiles.map((item) => (
              <div
                key={item}
                className="border rounded-lg px-4 py-3 text-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#009966]">
            Benefits
          </h2>
          <div className="mt-6 space-y-3">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex gap-2 items-start text-sm"
              >
                <CheckCircle2 className="h-4 w-4 text-[#009966]" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Exhibition Enquiry
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-slate-900">
              Register your interest as an exhibitor
            </h2>

            <p className="mt-4 text-base leading-8 text-slate-600">
              The exhibition programme is still being finalized, but you can register
              your interest now to receive early updates, booth information, and
              priority communication when exhibition opportunities are released.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Early access to exhibition updates
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    Get notified when exhibition categories, pricing, and booth
                    allocations are announced.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Strong sector visibility
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    Position your company alongside clean energy stakeholders,
                    investors, developers, and decision-makers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Kigali and Perth editions
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-600">
                    Indicate whether you are interested in Kigali, Perth, or both
                    editions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:p-8">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#02026e]/10 text-[#02026e]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  Interest received
                </h3>

                <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                  Thank you for registering your exhibition interest. We will reach
                  out once exhibition opportunities and booth options are available.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-8 rounded-2xl bg-[#02026e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#010150]"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#02026e]">
                    Register Now
                  </p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-slate-900">
                    Exhibitor interest form
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    Complete the form below and our team will keep you informed.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Company name
                      </label>
                      <input
                        placeholder="Enter company name"
                        value={form.companyName}
                        onChange={(e) =>
                          setForm({ ...form, companyName: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Contact name
                      </label>
                      <input
                        placeholder="Enter contact name"
                        value={form.contactName}
                        onChange={(e) =>
                          setForm({ ...form, contactName: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Email address
                      </label>
                      <input
                        placeholder="Enter email address"
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Phone number
                      </label>
                      <input
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Country
                      </label>
                      <input
                        placeholder="Enter country"
                        value={form.country}
                        onChange={(e) =>
                          setForm({ ...form, country: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Website
                      </label>
                      <input
                        placeholder="Enter website"
                        value={form.website}
                        onChange={(e) =>
                          setForm({ ...form, website: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Sector
                      </label>
                      <input
                        placeholder="e.g. Solar, Hydrogen, Storage"
                        value={form.sector}
                        onChange={(e) =>
                          setForm({ ...form, sector: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Edition interest
                      </label>
                      <select
                        value={form.editionInterest}
                        onChange={(e) =>
                          setForm({ ...form, editionInterest: e.target.value })
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                        required
                      >
                        <option value="">Select edition</option>
                        <option value="Kigali Edition">Kigali Edition</option>
                        <option value="Perth Edition">Perth Edition</option>
                        <option value="Both Editions">Both Editions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800">
                      Booth preference
                    </label>
                    <select
                      value={form.boothPreference}
                      onChange={(e) =>
                        setForm({ ...form, boothPreference: e.target.value })
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                    >
                      <option value="">Select booth preference</option>
                      <option value="Standard Booth">Standard Booth</option>
                      <option value="Premium Booth">Premium Booth</option>
                      <option value="Startup Showcase">Startup Showcase</option>
                      <option value="Technology Demo Area">Technology Demo Area</option>
                      <option value="Custom Package">Custom Package</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800">
                      Message
                    </label>
                    <textarea
                      placeholder="What would you like to exhibit?"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      rows={5}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e]/40 focus:ring-4 focus:ring-[#02026e]/10"
                    />
                  </div>

                  <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#02026e] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#010150]">
                    Submit enquiry
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}