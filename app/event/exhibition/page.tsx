"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { BadgeCheck, Building2, CheckCircle2, Globe2, Send, Upload, X } from "lucide-react";
import { useRole } from "@/context/RoleContext";

type FormState = {
  edition: string;
  selectedPackage: string;
  customSqm: string;
  companyName: string;
  websiteUrl: string;
  companyDescription: string;
  companyLogo: File | null;
  firstName: string;
  lastName: string;
  email: string;
  contactCompanyName: string;
  designation: string;
  phone: string;
  phoneCountryCode: string;
};

const initialForm: FormState = {
  edition: "both",
  selectedPackage: "turnkey",
  customSqm: "",
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

const editions = [
  { id: "kigali", label: "Kigali", detail: "25–28 May 2027 · Kigali International Convention Centre, Rwanda" },
  { id: "perth", label: "Perth", detail: "30 Aug – 2 Sep 2027 · Perth, Western Australia (venue TBA)" },
  { id: "both", label: "Both editions", detail: "Exhibit across the full Africa–Australia pipeline" },
];

const exhibitionPackages = [
  {
    id: "turnkey",
    price: "US$4,000",
    label: "Turnkey booth (shell scheme)",
    benefits: [
      "3m × 3m booth · 12 available",
      "Logo on the conference portal and marketing",
      "Mention at the event",
      "2 conference passes",
    ],
  },
  {
    id: "custom",
    price: "US$545 / sqm",
    label: "Custom / raw space",
    benefits: ["Build your own stand to your design", "Tell us the floor area you need below"],
  },
];

const stats = [
  { value: "~170", label: "ASX-listed companies operating across about 35 African countries (Australian Mining Review, Mar 2026)" },
  { value: "A$60bn", label: "Estimated Australian mining investment in Africa (DFAT, 2024)" },
  { value: "$200–240bn", label: "Africa's required annual clean-energy investment by 2030 (IEA)" },
  { value: "~600m", label: "Africans still without electricity (IEA, 2025)" },
];

const pillars = [
  { title: "Investable projects", text: "Project preparation in Kigali; investor response and matched meetings in Perth." },
  { title: "Future power systems", text: "Grids, storage, distributed systems and resilience, matched with Australian expertise." },
  { title: "Critical mineral value chains", text: "Processing, manufacturing, value-addition policy, mining finance and METS technology." },
  { title: "Skills and capacity", text: "Skills gaps answered with institutional pairings and training partnerships." },
];

const pathway = [
  { stage: "Kigali · 25–28 May 2027", title: "Prepare the opportunity", points: ["Ministerial working sessions on investment barriers", "Screened projects in a standard format", "Project Clinics with DFIs, engineers and advisers"] },
  { stage: "Bridge", title: "Test and match", points: ["Published pipeline of qualified projects", "Readiness note for each project", "Technical and financial review"] },
  { stage: "Perth · 30 Aug – 2 Sep 2027", title: "Mobilise capital and delivery", points: ["Pre-booked investor and partner meetings", "Technical showcases for technology and delivery firms", "Announcements confirmed in writing by every party"] },
  { stage: "Tracking", title: "30 · 90 · 180 days", points: ["Published progress report", "Partnerships confirmed in writing", "Meetings held and follow-ups logged"] },
];

const dealRoom = [
  { space: "Project Showcase", job: "Structured 15-minute presentations of pipeline projects" },
  { space: "Project Clinics", job: "Technical and financial review, by invitation" },
  { space: "Investor Lounge", job: "Matched meetings by appointment" },
  { space: "Regulatory Working Sessions", job: "Barriers, permits and market rules in a closed format" },
];

const audience = [
  "Government & policy leaders",
  "Energy & minerals executives",
  "Technology & service providers",
  "Investors, DFIs & project developers",
  "Technical & project delivery teams",
  "Academic & research partners",
];

const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE_MB = 30;

const inputCls =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10";

export default function ExhibitionPage() {
  const { visitorUuid } = useRole();

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
    } else if (!/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/.test(form.websiteUrl.trim())) {
      nextErrors.websiteUrl = "Enter a valid website URL.";
    }
    if (form.selectedPackage === "custom" && !(Number(form.customSqm) > 0)) {
      nextErrors.customSqm = "Enter the floor area you need in sqm.";
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
        if (value instanceof File) formData.append(key, value);
        else if (value !== null) formData.append(key, value as string);
      });
      if (visitorUuid) formData.append("visitorUuid", visitorUuid);

      const response = await fetch("/api/exhibitor-interest", { method: "POST", body: formData });
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
          <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.03em] sm:text-5xl">
            Exhibit where the Africa–Australia corridor gets built
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Clean Energy Conference Africa Australia 2027: Kigali, 25–28 May and Perth, 30 Aug – 2 Sep. Connecting
            Australian capital, technology and delivery expertise with Africa&apos;s energy and critical-mineral opportunities.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#register" className="rounded-2xl bg-white px-5 py-3 text-base font-semibold text-[#02026e]">Register exhibitor interest</a>
            <a href="#packages" className="rounded-2xl border border-white/40 px-5 py-3 text-base font-semibold text-white">View booth options</a>
          </div>
        </div>
      </section>

      {/* Why now */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-[-0.02em] text-black">Why this convergence matters now</h2>
        <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-700">
          Africa holds 60% of the world&apos;s best solar resources and critical minerals global markets need. Australia
          brings capital, mining expertise and clean-tech maturity. CEAA moves projects from opportunity to capital: African
          governments and developers present qualified projects in Kigali, Australian investors and delivery partners respond
          in Perth, and every introduction is followed through.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.value} className="rounded-2xl border border-slate-200 p-5">
              <p className="text-3xl font-bold text-[#02026e]">{s.value}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pathway */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold tracking-[-0.02em] text-black">One pipeline, two stages</h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-700">
            Kigali prepares the opportunity. Perth mobilises capital and delivery. The months between are a working period:
            projects are tested, matched and made ready before investors meet them.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pathway.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <p className="text-sm font-semibold text-[#02026e]">{p.stage}</p>
                <h3 className="mt-2 text-xl font-semibold text-black">{p.title}</h3>
                <ul className="mt-3 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-zinc-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#009966]" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="mt-14 text-2xl font-bold text-black">Four programme pillars</h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h4 className="text-lg font-semibold text-black">{p.title}</h4>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{p.text}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-14 text-2xl font-bold text-black">Where exhibitors meet the pipeline</h3>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-sm">
              <tbody>
                {dealRoom.map((d) => (
                  <tr key={d.space} className="border-b border-slate-100 last:border-0">
                    <th className="px-5 py-3 font-semibold text-black">{d.space}</th>
                    <td className="px-5 py-3 text-zinc-700">{d.job}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-3xl font-bold tracking-[-0.02em] text-black">Who you&apos;ll reach</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-700">
          The people who move projects from proposal to delivery across mining, energy and infrastructure, at both editions.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          {audience.map((a) => (
            <span key={a} className="rounded-full border border-[#02026e]/20 bg-[#02026e]/5 px-4 py-2 text-sm font-medium text-[#02026e]">{a}</span>
          ))}
        </div>
      </section>

      {/* Form Section */}
      <section id="register" className="mx-auto max-w-7xl px-4 py-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left info panel */}
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">Exhibition Enquiry</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-black">Register your interest as an exhibitor</h2>
            <p className="mt-4 text-base leading-8 text-black">
              Choose your edition and booth type. Turnkey booths are limited to 12 per edition. Our team will confirm
              availability and next steps.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { Icon: BadgeCheck, t: "Priority booth allocation", d: "Registered companies hear first about booth placement and floor plans." },
                { Icon: Building2, t: "In front of decision-makers", d: "Ministers, financiers, project owners and technical buyers working on screened African energy and critical-mineral projects." },
                { Icon: Globe2, t: "Kigali, Perth or both", d: "Exhibit at one edition or across the full corridor." },
              ].map(({ Icon, t, d }) => (
                <div key={t} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#02026e]" />
                  <div>
                    <p className="text-base font-semibold text-black">{t}</p>
                    <p className="mt-1 text-base leading-7 text-black">{d}</p>
                  </div>
                </div>
              ))}
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
                  Thank you for registering your exhibition interest. Our team will contact you to confirm your booth and next steps.
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
                  <p className="mt-2 text-base leading-7 text-black">Complete the form below and our team will be in touch.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Edition */}
                  <div>
                    <h4 className="mb-3 text-lg font-semibold text-black">Edition</h4>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {editions.map((ed) => (
                        <label key={ed.id} className={`cursor-pointer rounded-2xl border-2 p-4 transition ${form.edition === ed.id ? "border-[#02026e] bg-[#02026e]/5" : "border-slate-200 hover:border-slate-300"}`}>
                          <input type="radio" name="edition" value={ed.id} checked={form.edition === ed.id} onChange={() => updateField("edition", ed.id)} className="sr-only" />
                          <p className="text-base font-semibold text-black">{ed.label}</p>
                          <p className="mt-1 text-xs leading-5 text-zinc-600">{ed.detail}</p>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Package */}
                  <div id="packages">
                    <h4 className="mb-3 text-lg font-semibold text-black">Exhibition Package</h4>
                    <div className="space-y-3">
                      {exhibitionPackages.map((pkg) => (
                        <label key={pkg.id} className={`block cursor-pointer rounded-2xl border-2 p-5 transition ${form.selectedPackage === pkg.id ? "border-[#02026e] bg-[#02026e]/5" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                          <input type="radio" name="selectedPackage" value={pkg.id} checked={form.selectedPackage === pkg.id} onChange={() => updateField("selectedPackage", pkg.id)} className="sr-only" />
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
                            <span className="text-right text-xl font-bold text-[#02026e]">{pkg.price}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {form.selectedPackage === "custom" && (
                      <div className="mt-4">
                        <label className="mb-2 block text-base font-medium text-black">Floor area needed (sqm) <span className="text-red-500">*</span></label>
                        <input type="number" min="1" placeholder="e.g. 18" value={form.customSqm} onChange={(e) => updateField("customSqm", e.target.value)} className={inputCls} />
                        {errors.customSqm && <p className="mt-2 text-xs text-red-600">{errors.customSqm}</p>}
                      </div>
                    )}
                  </div>

                  {/* Exhibitor Information */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-black">Exhibitor Information</h4>
                    <div className="space-y-5">
                      <div>
                        <label className="mb-2 block text-base font-medium text-black">Company Name <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="Enter company name" value={form.companyName} onChange={(e) => updateField("companyName", e.target.value)} className={inputCls} />
                        {errors.companyName && <p className="mt-2 text-xs text-red-600">{errors.companyName}</p>}
                      </div>
                      <div>
                        <label className="mb-2 block text-base font-medium text-black">Website URL <span className="text-red-500">*</span></label>
                        <input type="text" placeholder="https://yourcompany.com" value={form.websiteUrl} onChange={(e) => updateField("websiteUrl", e.target.value)} className={inputCls} />
                        {errors.websiteUrl && <p className="mt-2 text-xs text-red-600">{errors.websiteUrl}</p>}
                      </div>
                      <div>
                        <label className="mb-2 block text-base font-medium text-black">Company Short Description</label>
                        <textarea rows={3} placeholder="Brief description of your company and what you do" value={form.companyDescription} onChange={(e) => updateField("companyDescription", e.target.value)} className={inputCls} />
                      </div>

                      <div>
                        <label className="mb-2 block text-base font-medium text-black">Company Logo <span className="text-red-500">*</span></label>
                        <p className="mb-3 text-sm text-zinc-500">File size: Up to {MAX_FILE_SIZE_MB} MB · Supported: JPG, JPEG, PNG, GIF, WEBP</p>
                        {form.companyLogo ? (
                          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#02026e]/10">
                              <Upload className="h-5 w-5 text-[#02026e]" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-black">{form.companyLogo.name}</p>
                              <p className="text-xs text-zinc-500">{(form.companyLogo.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button type="button" aria-label="Remove logo" onClick={() => updateField("companyLogo", null)} className="rounded-full p-1 text-zinc-400 transition hover:bg-slate-200 hover:text-zinc-700">
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div
                            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`cursor-pointer rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${isDragging ? "border-[#02026e] bg-[#02026e]/5" : "border-slate-300 bg-slate-50 hover:border-[#02026e]/50 hover:bg-[#02026e]/5"}`}
                          >
                            <Upload className="mx-auto h-8 w-8 text-slate-400" />
                            <p className="mt-2 text-sm font-medium text-black">Drop or upload your logo here</p>
                          </div>
                        )}
                        <input ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.gif,.webp" className="sr-only"
                          onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileSelect(file); e.target.value = ""; }} />
                        {errors.companyLogo && <p className="mt-2 text-xs text-red-600">{errors.companyLogo}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div>
                    <h4 className="mb-4 text-lg font-semibold text-black">Contact Details</h4>
                    <div className="space-y-5">
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-base font-medium text-black">First Name <span className="text-red-500">*</span></label>
                          <input type="text" placeholder="First name" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} className={inputCls} />
                          {errors.firstName && <p className="mt-2 text-xs text-red-600">{errors.firstName}</p>}
                        </div>
                        <div>
                          <label className="mb-2 block text-base font-medium text-black">Last Name</label>
                          <input type="text" placeholder="Last name" value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-base font-medium text-black">Email <span className="text-red-500">*</span></label>
                        <input type="email" placeholder="your@email.com" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={inputCls} />
                        {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-base font-medium text-black">Company Name</label>
                          <input type="text" placeholder="Company name" value={form.contactCompanyName} onChange={(e) => updateField("contactCompanyName", e.target.value)} className={inputCls} />
                        </div>
                        <div>
                          <label className="mb-2 block text-base font-medium text-black">Designation</label>
                          <input type="text" placeholder="e.g. CEO, Marketing Manager" value={form.designation} onChange={(e) => updateField("designation", e.target.value)} className={inputCls} />
                        </div>
                      </div>
                      <div>
                        <label className="mb-2 block text-base font-medium text-black">Phone</label>
                        <div className="flex gap-2">
                          <select value={form.phoneCountryCode} onChange={(e) => updateField("phoneCountryCode", e.target.value)} className="w-28 shrink-0 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-base text-black outline-none transition focus:border-[#02026e] focus:ring-4 focus:ring-[#02026e]/10">
                            {["+254", "+1", "+44", "+61", "+27", "+234", "+255", "+256", "+250", "+49", "+33", "+91", "+86"].map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          <input type="tel" placeholder="700 000 000" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={`flex-1 ${inputCls}`} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">{submitError}</div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl border border-[#020266] bg-[#020266] px-5 py-3.5 text-base font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out hover:scale-[1.04] hover:shadow-[0_18px_50px_rgba(2,2,102,0.25)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-[#020266]/25 focus:ring-offset-2"
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