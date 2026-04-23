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
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.companyName.trim()) {
      nextErrors.companyName = "Company name is required.";
    }

    if (!form.contactName.trim()) {
      nextErrors.contactName = "Contact name is required.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!form.country.trim()) {
      nextErrors.country = "Country is required.";
    }

    if (!form.sector.trim()) {
      nextErrors.sector = "Sector is required.";
    }

    if (!form.editionInterest.trim()) {
      nextErrors.editionInterest = "Please select an edition.";
    }

    if (!form.boothPreference.trim()) {
      nextErrors.boothPreference = "Please select a booth preference.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please include a short message.";
    }

    if (form.website.trim()) {
      const websitePattern =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
      if (!websitePattern.test(form.website.trim())) {
        nextErrors.website = "Enter a valid website URL.";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/exhibitor-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      let result: any = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok || !result?.ok) {
        if (result?.errors) {
          setErrors((prev) => ({
            ...prev,
            companyName: result.errors.companyName?.[0] ?? "",
            contactName: result.errors.contactName?.[0] ?? "",
            email: result.errors.email?.[0] ?? "",
            phone: result.errors.phone?.[0] ?? "",
            country: result.errors.country?.[0] ?? "",
            website: result.errors.website?.[0] ?? "",
            sector: result.errors.sector?.[0] ?? "",
            editionInterest: result.errors.editionInterest?.[0] ?? "",
            boothPreference: result.errors.boothPreference?.[0] ?? "",
            message: result.errors.message?.[0] ?? "",
          }));
        }

        setSubmitError(
          result?.message || "Something went wrong. Please try again."
        );
        return;
      }

      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Exhibitor interest submission failed:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-white pt-24">
      <section className="bg-[#02026e] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/event" className="transition hover:text-white">
              Event
            </Link>
            <span>/</span>
            <span className="text-white">Exhibition</span>
          </div>

          <h1 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            Exhibition Opportunities (To Be Announced)
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Register your interest to exhibit at the Clean Energy Conference
            Kigali &amp; Perth 2026.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3">
        {infoCards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 p-6 shadow-sm"
          >
            <Lightbulb className="h-6 w-6 text-[#02026e]" />
            <h3 className="mt-3 text-lg font-semibold text-slate-900">
              {card.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-600">{card.description}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Who Should Exhibit</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {exhibitorProfiles.map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#009966]">Benefits</h2>
          <div className="mt-6 space-y-3">
            {benefits.map((item) => (
              <div
                key={item}
                className="flex items-start gap-2 text-sm text-slate-700"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#009966]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
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
                  onClick={() => {
                    setSubmitted(false);
                    setSubmitError("");
                    setErrors({});
                  }}
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
                        type="text"
                        placeholder="Enter company name"
                        value={form.companyName}
                        onChange={(e) => updateField("companyName", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                      />
                      {errors.companyName && (
                        <p className="mt-2 text-xs text-red-600">
                          {errors.companyName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Contact name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter contact name"
                        value={form.contactName}
                        onChange={(e) => updateField("contactName", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                      />
                      {errors.contactName && (
                        <p className="mt-2 text-xs text-red-600">
                          {errors.contactName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Email address
                      </label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Phone number
                      </label>
                      <input
                        type="text"
                        placeholder="Enter phone number"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Country
                      </label>
                      <input
                        type="text"
                        placeholder="Enter country"
                        value={form.country}
                        onChange={(e) => updateField("country", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                      />
                      {errors.country && (
                        <p className="mt-2 text-xs text-red-600">{errors.country}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Website
                      </label>
                      <input
                        type="text"
                        placeholder="Enter website"
                        value={form.website}
                        onChange={(e) => updateField("website", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                      />
                      {errors.website && (
                        <p className="mt-2 text-xs text-red-600">{errors.website}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Sector
                      </label>
                      <select
                        value={form.sector}
                        onChange={(e) => updateField("sector", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                      >
                        <option value="">Select sector</option>
                        <option value="renewable-energy">Renewable Energy</option>
                        <option value="ev-battery">EV / Battery Technology</option>
                        <option value="critical-minerals">Critical Minerals</option>
                        <option value="epc-engineering">EPC / Engineering</option>
                        <option value="storage-grid-hydrogen">
                          Storage / Smart Grid / Hydrogen
                        </option>
                        <option value="esg-sustainability">
                          ESG / Sustainability / Climate Solutions
                        </option>
                        <option value="research-startup">
                          Research / University / Startup
                        </option>
                        <option value="other">Other</option>
                      </select>
                      {errors.sector && (
                        <p className="mt-2 text-xs text-red-600">{errors.sector}</p>
                      )}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-slate-800">
                        Edition interest
                      </label>
                      <select
                        value={form.editionInterest}
                        onChange={(e) =>
                          updateField("editionInterest", e.target.value)
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                      >
                        <option value="">Select edition</option>
                        <option value="kigali">Kigali Edition</option>
                        <option value="perth">Perth Edition</option>
                        <option value="both">Both Editions</option>
                      </select>
                      {errors.editionInterest && (
                        <p className="mt-2 text-xs text-red-600">
                          {errors.editionInterest}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800">
                      Booth preference
                    </label>
                    <select
                      value={form.boothPreference}
                      onChange={(e) =>
                        updateField("boothPreference", e.target.value)
                      }
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                    >
                      <option value="">Select preference</option>
                      <option value="small-booth">Small Booth</option>
                      <option value="standard-booth">Standard Booth</option>
                      <option value="premium-booth">Premium Booth</option>
                      <option value="custom-space">Custom Space</option>
                      <option value="unsure">Not Sure Yet</option>
                    </select>
                    {errors.boothPreference && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.boothPreference}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-800">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your company, what you would like to exhibit, and any preferences."
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                    />
                    {errors.message && (
                      <p className="mt-2 text-xs text-red-600">{errors.message}</p>
                    )}
                  </div>

                  {submitError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#02026e] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#010150] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <Send className="h-4 w-4" />
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit exhibition interest"}
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