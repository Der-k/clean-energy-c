"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Lightbulb,
  MapPin,
  Send,
  Users,
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
      <section className="bg-[#003994] text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">
            Exhibition Opportunities (To Be Announced)
          </h1>
          <p className="mt-4 text-white/80 max-w-2xl">
            Register your interest to exhibit at the Clean Energy Conference
            Kigali & Perth 2026.
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
            <Lightbulb className="h-6 w-6 text-[#003994]" />
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
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="border rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6">
            Register as Exhibitor
          </h2>

          {submitted ? (
            <p className="text-green-600">
              Submission successful (connect backend next)
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-4">
              <input
                placeholder="Company Name"
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
                className="input"
                required
              />

              <input
                placeholder="Contact Name"
                value={form.contactName}
                onChange={(e) =>
                  setForm({ ...form, contactName: e.target.value })
                }
                className="input"
                required
              />

              <input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="input"
                required
              />

              <textarea
                placeholder="What would you like to exhibit?"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
                className="input"
              />

              <button className="bg-[#003994] text-white py-3 rounded-full flex items-center justify-center gap-2">
                Submit <Send className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}