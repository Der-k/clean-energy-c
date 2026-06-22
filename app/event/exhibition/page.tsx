"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe2,
  Lightbulb,
  Send,
  Upload,
  X,
} from "lucide-react";

type FormState = {
  // Package
  selectedPackage: string;
  // Exhibitor Info
  companyName: string;
  websiteUrl: string;
  companyDescription: string;
  companyLogo: File | null;
  // Contact Details
  firstName: string;
  lastName: string;
  email: string;
  contactCompanyName: string;
  designation: string;
  phone: string;
  phoneCountryCode: string;
};

const initialForm: FormState = {
  selectedPackage: "standard-3000",
  companyName: "",
  websiteUrl: "",
  companyDescription: "",
  companyLogo: null,
  firstName: "",
  lastName: "",
  email: "",
  contactCompanyName: "",
  designation: "",
  phone: "",
  phoneCountryCode: "+254",
};

const exhibitionPackages = [
  {
    id: "standard-3000",
    price: "$3,000",
    label: "Standard Exhibitor Package",
    benefits: [
      "Booth Dimensions: 10 ft × 10 ft",
      "2 Booth Members",
      "Logo on the Conference Portal",
      "Logo on Online Marketing Materials",
      "Logo on Social Media Pages advertising the Event",
      "Mention at the Event",
      "1 Conference Pass",
    ],
  },
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

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE_MB = 30;

export default function ExhibitionPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setSubmitError("");
  }

  function handleFileSelect(file: File) {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrors((prev) => ({ ...prev, companyLogo: "Unsupported file type. Please upload JPG, JPEG, PNG, GIF, or WEBP." }));
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, companyLogo: `File size must be under ${MAX_FILE_SIZE_MB} MB.` }));
      return;
    }
    updateField("companyLogo", file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(file);
  }

  function validateForm() {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.companyName.trim()) nextErrors.companyName = "Company name is required.";
    if (!form.websiteUrl.trim()) {
      nextErrors.websiteUrl = "Website URL is required.";
    } else {
      const websitePattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
      if (!websitePattern.test(form.websiteUrl.trim())) {
        nextErrors.websiteUrl = "Enter a valid website URL.";
      }
    }
    if (!form.companyLogo) nextErrors.companyLogo = "Company logo is required.";
    if (!form.firstName.trim()) nextErrors.firstName = "First name is required.";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
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
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== null) {
          formData.append(key, value as string);
        }
      });

      const response = await fetch("/api/exhibitor-interest", {
        method: "POST",
        body: formData,
      });

      let result: any = null;
      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok || !result?.ok) {
        setSubmitError(result?.message || "Something went wrong. Please try again.");
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
      {/* Hero */}
      <section className="bg-[#02026e] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-5 flex flex-wrap items-center gap-2 text-base text-white/70">
            <Link href="/" className="transition hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/event" className="transition hover:text-white">Event</Link>
            <span>/</span>
            <span className="text-white">Exhibition</span>
          </div>
          <h1 className="text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            Exhibition Opportunities (To Be Announced)
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Register your interest to exhibit at the Clean Energy Conference Kigali &amp; Perth 2026.
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3">
        {infoCards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 p-6 shadow-sm">
            <Lightbulb className="h-6 w-6 text-[#02026e]" />
            <h3 className="mt-3 text-xl font-semibold text-black">{card.title}</h3>
            <p className="mt-2 text-base text-zinc-600">{card.description}</p>
          </div>
        ))}
      </section>

      {/* Form Section */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left info panel */}
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Exhibition Enquiry
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-black">
              Register your interest as an exhibitor
            </h2>
            <p className="mt-4 text-base leading-8 text-black">
              The exhibition programme is still being finalized, but you can register your interest
              now to receive early updates, booth information, and priority communication when
              exhibition opportunities are released.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                <div>
                  <p className="text-base font-semibold text-black">Early access to exhibition updates</p>
                  <p className="mt-1 text-base leading-7 text-black">
                    Get notified when exhibition categories, pricing, and booth allocations are announced.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                <div>
                  <p className="text-base font-semibold text-black">Strong sector visibility</p>
                  <p className="mt-1 text-base leading-7 text-black">
                    Position your company alongside clean energy stakeholders, investors, developers, and decision-makers.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                <div>
                  <p className="text-base font-semibold text-black">Kigali and Perth editions</p>
                  <p className="mt-1 text-base leading-7 text-black">
                    Indicate whether you are interested in Kigali, Perth, or both editions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:p-8">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#02026e]/10 text-[#02026e]">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold text-black">Interest received</h3>
                <p className="mt-3 max-w-md text-base leading-7 text-black">
                  Thank you for registering your exhibition interest. We will reach out once exhibition
                  opportunities and booth options are available.
                </p>
                <button
                  type="button"
                  onClick={() => { setSubmitted(false); setSubmitError(""); setErrors({}); }}
                  className="mt-8 rounded-2xl bg-[#02026e] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#010150]"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#02026e]">Register Now</p>
                  <h3 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-black">Exhibitor interest form</h3>
                  <p className="mt-2 text-base leading-7 text-black">
                    Complete the form below and our team will keep you informed.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                  {/* ── Exhibition Package ── */}
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-black">Exhibition Package</h4>
                    <div className="space-y-3">
                      {exhibitionPackages.map((pkg) => (
                        <label
                          key={pkg.id}
                          className={`block cursor-pointer rounded-2xl border-2 p-5 transition ${
                            form.selectedPackage === pkg.id
                              ? "border-[#02026e] bg-[#02026e]/5"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="selectedPackage"
                            value={pkg.id}
                            checked={form.selectedPackage === pkg.id}
                            onChange={() => updateField("selectedPackage", pkg.id)}
                            className="sr-only"
                          />
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="text-base font-semibold text-black">{pkg.label}</p>
                              <ul className="mt-3 space-y-1.5">
                                {pkg.benefits.map((b) => (
                                  <li key={b} className="flex items-start gap-2 text-sm text-zinc-700">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#009966]" />
                                    {b}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-[#02026e]">{pkg.price}</span>
                              <div className={`mt-2 h-5 w-5 rounded-full border-2 ml-auto flex items-center justify-center ${
                                form.selectedPackage === pkg.id ? "border-[#02026e]" : "border-slate-300"
                              }`}>
                                {form.selectedPackage === pkg.id && (
                                  <div className="h-2.5 w-2.5 rounded-full bg-[#02026e]" />
                                )}
                              </div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* ── Exhibitor Information ── */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-black">Exhibitor Information</h4>
                    <div className="space-y-5">
                      <div>
                        <label className="mb-2 block text-base font-medium text-black">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          value={form.companyName}
                          onChange={(e) => updateField("companyName", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                        />
                        {errors.companyName && <p className="mt-2 text-xs text-red-600">{errors.companyName}</p>}
                      </div>

                      <div>
                        <label className="mb-2 block text-base font-medium text-black">
                          Website URL <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="https://yourcompany.com"
                          value={form.websiteUrl}
                          onChange={(e) => updateField("websiteUrl", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                        />
                        {errors.websiteUrl && <p className="mt-2 text-xs text-red-600">{errors.websiteUrl}</p>}
                      </div>

                      <div>
                        <label className="mb-2 block text-base font-medium text-black">
                          Company Short Description
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Brief description of your company and what you do"
                          value={form.companyDescription}
                          onChange={(e) => updateField("companyDescription", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                        />
                      </div>

                      {/* Logo Upload */}
                      <div>
                        <label className="mb-2 block text-base font-medium text-black">
                          Company Logo <span className="text-red-500">*</span>
                        </label>
                        <p className="mb-3 text-sm text-zinc-500">
                          File size: Up to {MAX_FILE_SIZE_MB} MB · Supported: JPG, JPEG, PNG, GIF, WEBP
                        </p>

                        {form.companyLogo ? (
                          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#02026e]/10">
                              <Upload className="h-5 w-5 text-[#02026e]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="truncate text-sm font-medium text-black">{form.companyLogo.name}</p>
                              <p className="text-xs text-zinc-500">{(form.companyLogo.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => updateField("companyLogo", null)}
                              className="rounded-full p-1 text-zinc-400 transition hover:bg-slate-200 hover:text-zinc-700"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${
                              isDragging
                                ? "border-[#02026e] bg-[#02026e]/5"
                                : "border-slate-300 bg-slate-50 hover:border-[#02026e]/50 hover:bg-[#02026e]/5"
                            }`}
                          >
                            <Upload className="mx-auto h-8 w-8 text-slate-400" />
                            <p className="mt-2 text-sm font-medium text-black">Drop or Upload Your File Here</p>
                            <p className="mt-1 text-xs text-zinc-500">Drop Here</p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".jpg,.jpeg,.png,.gif,.webp"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileSelect(file);
                            e.target.value = "";
                          }}
                        />
                        {errors.companyLogo && <p className="mt-2 text-xs text-red-600">{errors.companyLogo}</p>}
                      </div>
                    </div>
                  </div>

                  {/* ── Contact Details ── */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-black">Contact Details</h4>
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-base font-medium text-black">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="First name"
                            value={form.firstName}
                            onChange={(e) => updateField("firstName", e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                          />
                          {errors.firstName && <p className="mt-2 text-xs text-red-600">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="mb-2 block text-base font-medium text-black">Last Name</label>
                          <input
                            type="text"
                            placeholder="Last name"
                            value={form.lastName}
                            onChange={(e) => updateField("lastName", e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-base font-medium text-black">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                        />
                        {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-base font-medium text-black">Company Name</label>
                          <input
                            type="text"
                            placeholder="Company name"
                            value={form.contactCompanyName}
                            onChange={(e) => updateField("contactCompanyName", e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-base font-medium text-black">Designation</label>
                          <input
                            type="text"
                            placeholder="e.g. CEO, Marketing Manager"
                            value={form.designation}
                            onChange={(e) => updateField("designation", e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-base font-medium text-black">Phone</label>
                        <div className="flex gap-2">
                          <select
                            value={form.phoneCountryCode}
                            onChange={(e) => updateField("phoneCountryCode", e.target.value)}
                            className="w-28 shrink-0 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                          >
                            <option value="+254">+254</option>
                            <option value="+1">+1</option>
                            <option value="+44">+44</option>
                            <option value="+61">+61</option>
                            <option value="+27">+27</option>
                            <option value="+234">+234</option>
                            <option value="+255">+255</option>
                            <option value="+256">+256</option>
                            <option value="+250">+250</option>
                            <option value="+49">+49</option>
                            <option value="+33">+33</option>
                            <option value="+91">+91</option>
                            <option value="+86">+86</option>
                          </select>
                          <input
                            type="tel"
                            placeholder="700 000 000"
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      group relative inline-flex w-full items-center justify-center gap-2
                      overflow-hidden rounded-2xl px-5 py-3.5 text-base font-semibold
                      text-white bg-[#020266] border border-[#020266]
                      shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                      transition-all duration-500 ease-out
                      hover:border-[#020266]/60 hover:scale-[1.04]
                      hover:shadow-[0_18px_50px_rgba(2,2,102,0.25)]
                      active:scale-[0.97]
                      disabled:cursor-not-allowed disabled:opacity-70
                      disabled:hover:scale-100
                      disabled:hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                      focus:outline-none focus:ring-2 focus:ring-[#020266]/25
                      focus:ring-offset-2 focus:ring-offset-white
                    "
                  >
                    <span className="absolute inset-0 overflow-hidden rounded-2xl">
                      <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
                    </span>
                    <Send className="relative z-10 h-4 w-4 transition-colors duration-300 group-hover:text-[#020266]" />
                    <span className="relative z-10 transition-colors duration-300 group-hover:text-[#020266]">
                      {isSubmitting ? "Submitting..." : "Submit exhibition interest"}
                    </span>
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