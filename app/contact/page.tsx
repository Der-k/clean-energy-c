"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Mail,
  Phone,
  Users,
  Mic,
  Handshake,
  Newspaper,
  Ticket,
  MapPin,
  Globe,
  CheckCircle2,
  Send,
} from "lucide-react";

type EnquiryType =
  | "general"
  | "speaker"
  | "partnership"
  | "media"
  | "delegate"
  | "venue";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  enquiryType: EnquiryType | "";
  message: string;
};

const contactCards = [
  {
    title: "General Enquiries",
    description:
      "For general questions about the conference, event details, attendance, or logistics.",
    person: "Conference Team",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: Users,
  },
  {
    title: "Speaker Enquiries",
    description:
      "If you are interested in speaking at the event, submit your speaking enquiry to the team.",
    person: "Speaker Relations",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: Mic,
  },
  {
    title: "Sponsorship / Partnership Enquiries",
    description:
      "For sponsorship packages, exhibition opportunities, and partnership discussions.",
    person: "Partnerships Team",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: Handshake,
  },
  {
    title: "Media Partnership / Press Enquiries",
    description:
      "For media partnerships, press accreditation, publicity enquiries, or interviews.",
    person: "Media Relations",
    email: "info@cleanenergyconference.com.au",
    phone: "",
    icon: Newspaper,
  },
  {
    title: "Delegate / Exhibition Enquiries",
    description:
      "For delegate registrations, exhibition questions, and participation-related assistance.",
    person: "Delegate Services",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: Ticket,
  },
  {
    title: "Venue / Event Location Enquiries",
    description:
      "For questions related to venue access, location information, and event arrival planning.",
    person: "Event Logistics",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: MapPin,
  },
];

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  enquiryType: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialForm);
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

    if (!form.fullName.trim()) nextErrors.fullName = "Full name is required.";

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.subject.trim()) nextErrors.subject = "Subject is required.";
    if (!form.enquiryType) nextErrors.enquiryType = "Please select an enquiry type.";
    if (!form.message.trim()) nextErrors.message = "Message is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSubmitError("");

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact-enquiry", {
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
            fullName: result.errors.fullName?.[0] ?? "",
            email: result.errors.email?.[0] ?? "",
            phone: result.errors.phone?.[0] ?? "",
            subject: result.errors.subject?.[0] ?? "",
            enquiryType: result.errors.enquiryType?.[0] ?? "",
            message: result.errors.message?.[0] ?? "",
          }));
        }

        setSubmitError(
          result?.message || "Something went wrong. Please try again."
        );
        return;
      }

      setIsSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Contact enquiry failed:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-white pt-24">
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[50px] h-[240px] w-[240px] rounded-full bg-[#02026e]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-700">Contact Us</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Contact Us
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-5xl">
              Get in touch with the conference team
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Reach the right team for enquiries related to speakers, partnerships,
              media, delegates, venue information, or general conference support.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-[22px] border border-[#02026e]/20 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#02026e]/5 text-[#02026e]">
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-slate-900">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {card.description}
                </p>

                <div className="mt-5 space-y-3 text-sm">
                  <p className="font-medium text-slate-800">{card.person}</p>

                  <div className="flex items-start gap-3 text-slate-700">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#02026e]" />
                    <a href={`mailto:${card.email}`} className="hover:text-[#02026e]">
                      {card.email}
                    </a>
                  </div>

                  {card.phone ? (
                    <div className="flex items-start gap-3 text-slate-700">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#02026e]" />
                      <a href={`tel:${card.phone}`} className="hover:text-[#02026e]">
                        {card.phone}
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#02026e]">
                Send an Enquiry
              </p>
              <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-slate-900">
                Contact form
              </h2>
              <p className="mt-5 text-base leading-8 text-slate-600">
                Use the form to send a message to the conference team and we will
                direct it to the right department.
              </p>

              <div className="mt-8 rounded-[20px] border border-[#02026e]/20 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#02026e]">
                  Primary Contact
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">Phone:</span>{" "}
                    +254 725 707 557
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Email:</span>{" "}
                    dorah.simiyu@cleanenergyconference.com.au
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Website:</span>{" "}
                    www.cleanenergyconference.com.au
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#02026e]/20 bg-white p-6 shadow-sm md:p-8">
              {isSubmitted ? (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#02026e]/10 text-[#02026e]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h3 className="mt-6 text-2xl font-bold text-slate-900">
                    Enquiry sent successfully
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-slate-600">
                    Thank you for contacting the conference team. We will review
                    your message and get back to you shortly.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmitError("");
                      setErrors({});
                    }}
                    className="mt-8 rounded-full bg-[#02026e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#010150]"
                  >
                    Send another enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={form.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#02026e]/40 focus:bg-white"
                      />
                      {errors.fullName && (
                        <p className="mt-2 text-xs text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#02026e]/40 focus:bg-white"
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#02026e]/40 focus:bg-white"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        placeholder="Subject"
                        value={form.subject}
                        onChange={(e) => updateField("subject", e.target.value)}
                        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-[#02026e]/40 focus:bg-white"
                      />
                      {errors.subject && (
                        <p className="mt-2 text-xs text-red-600">{errors.subject}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <select
                      value={form.enquiryType}
                      onChange={(e) =>
                        updateField("enquiryType", e.target.value as EnquiryType)
                      }
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none transition focus:border-[#02026e]/40 focus:bg-white"
                    >
                      <option value="">Enquiry Type</option>
                      <option value="general">General Enquiry</option>
                      <option value="speaker">Speaker Enquiry</option>
                      <option value="partnership">Sponsorship / Partnership</option>
                      <option value="media">Media / Press</option>
                      <option value="delegate">Delegate / Exhibition</option>
                      <option value="venue">Venue / Logistics</option>
                    </select>
                    {errors.enquiryType && (
                      <p className="mt-2 text-xs text-red-600">{errors.enquiryType}</p>
                    )}
                  </div>

                  <div>
                    <textarea
                      rows={6}
                      placeholder="Your Message"
                      value={form.message}
                      onChange={(e) => updateField("message", e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#02026e]/40 focus:bg-white"
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

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="rounded-[28px] border border-[#02026e]/30 bg-gradient-to-r from-[#02026e] to-[#010150] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.22)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Follow our social network
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Stay connected with the conference
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/80 md:text-base">
                Follow the conference across social channels for updates,
                announcements, programme news, and speaker releases.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://cleanenergyconference.com.au"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <Globe className="h-4 w-4" />
                Visit Website
              </a>
              <a
                href="mailto:info@cleanenergyconference.com.au"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}