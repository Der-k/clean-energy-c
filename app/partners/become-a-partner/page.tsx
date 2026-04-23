"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Handshake,
  Building2,
  Globe2,
  CheckCircle2,
} from "lucide-react";

type SponsorshipInterest =
  | "title"
  | "platinum"
  | "gold"
  | "silver"
  | "bronze"
  | "exhibition"
  | "custom";

type EventChoice = "kigali" | "perth" | "both";

type FormState = {
  firstName: string;
  secondName: string;
  email: string;
  phone: string;
  organization: string;
  jobTitle: string;
  interest: SponsorshipInterest;
  eventChoice: EventChoice;
  message: string;
};

export default function BecomeASponsorPage() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    organization: "",
    jobTitle: "",
    interest: "gold",
    eventChoice: "both",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!form.secondName.trim()) nextErrors.secondName = "Second name is required.";

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) nextErrors.phone = "Phone number is required.";

    if (!form.organization.trim()) {
      nextErrors.organization = "Organization is required.";
    }

    if (!form.jobTitle.trim()) {
      nextErrors.jobTitle = "Job title is required.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please include a short message.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/sponsorship-request", {
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
            firstName: result.errors.firstName?.[0] ?? "",
            secondName: result.errors.secondName?.[0] ?? "",
            email: result.errors.email?.[0] ?? "",
            phone: result.errors.phone?.[0] ?? "",
            organization: result.errors.organization?.[0] ?? "",
            jobTitle: result.errors.jobTitle?.[0] ?? "",
            interest: result.errors.interest?.[0] ?? "",
            eventChoice: result.errors.eventChoice?.[0] ?? "",
            message: result.errors.message?.[0] ?? "",
          }));
        }

        setSubmitError(
          result?.message || "Something went wrong. Please try again."
        );
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Sponsorship request failed:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-white pt-24">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,white_72%,#f8fafc_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-[#003994]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/partners" className="transition hover:text-[#003994]">
              Partners
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-700">Become a Sponsor</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#003994]">
                Sponsorship Opportunities
              </p>

              <h1 className="mt-3 font-heading text-4xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-5xl">
                Become a sponsor of the Clean Energy Conference 2026
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Position your brand alongside senior decision-makers, investors,
                project developers, technology providers, and public sector leaders
                shaping the clean energy transition in Africa and Australia.
              </p>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#003994]/5 text-[#003994]">
                      <Handshake className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Strategic visibility
                      </p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">
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
                      <p className="text-sm font-semibold text-slate-900">
                        Access the right audience
                      </p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">
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
                      <p className="text-sm font-semibold text-slate-900">
                        Kigali and Perth editions
                      </p>
                      <p className="mt-1 text-sm leading-7 text-slate-600">
                        Explore sponsorship for Kigali, Perth, or a combined 2026
                        conference partnership package.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#003994]">
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
                      <span className="text-sm leading-7 text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:p-8">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#003994]">
                      Sponsor Enquiry
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-slate-900">
                      Request sponsorship information
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Submit your details and our team will get in touch with the
                      relevant sponsorship options and partnership opportunities.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-slate-800"
                        >
                          First name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={form.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter first name"
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-xs text-red-600">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="secondName"
                          className="mb-2 block text-sm font-medium text-slate-800"
                        >
                          Second name
                        </label>
                        <input
                          id="secondName"
                          type="text"
                          value={form.secondName}
                          onChange={(e) => updateField("secondName", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter second name"
                        />
                        {errors.secondName && (
                          <p className="mt-2 text-xs text-red-600">{errors.secondName}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-2 block text-sm font-medium text-slate-800"
                        >
                          Email address
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="mb-2 block text-sm font-medium text-slate-800"
                        >
                          Phone number
                        </label>
                        <input
                          id="phone"
                          type="text"
                          value={form.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter phone number"
                        />
                        {errors.phone && (
                          <p className="mt-2 text-xs text-red-600">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="organization"
                          className="mb-2 block text-sm font-medium text-slate-800"
                        >
                          Organization
                        </label>
                        <input
                          id="organization"
                          type="text"
                          value={form.organization}
                          onChange={(e) => updateField("organization", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter organization"
                        />
                        {errors.organization && (
                          <p className="mt-2 text-xs text-red-600">
                            {errors.organization}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="jobTitle"
                          className="mb-2 block text-sm font-medium text-slate-800"
                        >
                          Job title
                        </label>
                        <input
                          id="jobTitle"
                          type="text"
                          value={form.jobTitle}
                          onChange={(e) => updateField("jobTitle", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter job title"
                        />
                        {errors.jobTitle && (
                          <p className="mt-2 text-xs text-red-600">{errors.jobTitle}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="interest"
                          className="mb-2 block text-sm font-medium text-slate-800"
                        >
                          Sponsorship interest
                        </label>
                        <select
                          id="interest"
                          value={form.interest}
                          onChange={(e) =>
                            updateField(
                              "interest",
                              e.target.value as SponsorshipInterest
                            )
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        >
                          <option value="title">Title Sponsor</option>
                          <option value="platinum">Platinum Sponsor</option>
                          <option value="gold">Gold Sponsor</option>
                          <option value="silver">Silver Sponsor</option>
                          <option value="bronze">Bronze Sponsor</option>
                          <option value="exhibition">Exhibition Sponsor</option>
                          <option value="custom">Custom Package</option>
                        </select>
                        {errors.interest && (
                          <p className="mt-2 text-xs text-red-600">{errors.interest}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="eventChoice"
                          className="mb-2 block text-sm font-medium text-slate-800"
                        >
                          Preferred edition
                        </label>
                        <select
                          id="eventChoice"
                          value={form.eventChoice}
                          onChange={(e) =>
                            updateField("eventChoice", e.target.value as EventChoice)
                          }
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        >
                          <option value="kigali">Kigali Edition</option>
                          <option value="perth">Perth Edition</option>
                          <option value="both">Both Editions</option>
                        </select>
                        {errors.eventChoice && (
                          <p className="mt-2 text-xs text-red-600">
                            {errors.eventChoice}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="mb-2 block text-sm font-medium text-slate-800"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        value={form.message}
                        onChange={(e) => updateField("message", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        placeholder="Tell us about your sponsorship goals, preferred package, or questions."
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
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-[#003994] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#002b6f] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting..." : "Submit sponsorship enquiry"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#003994]/10 text-[#003994]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h2 className="mt-6 font-heading text-2xl font-bold text-slate-900">
                    Sponsorship request received
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                    Thank you for your interest in sponsoring the Clean Energy
                    Conference 2026. Our team will review your enquiry and get in
                    touch with the relevant partnership information.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Link
                      href="/partners"
                      className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-[#003994] hover:text-[#003994]"
                    >
                      Back to Partners
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmitError("");
                        setErrors({});
                        setForm({
                          firstName: "",
                          secondName: "",
                          email: "",
                          phone: "",
                          organization: "",
                          jobTitle: "",
                          interest: "gold",
                          eventChoice: "both",
                          message: "",
                        });
                      }}
                      className="rounded-2xl bg-[#003994] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#002b6f]"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}