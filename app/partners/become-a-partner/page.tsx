"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import {
  ChevronRight, ChevronDown, Upload, Check,
  Trophy, Medal, Globe, Tag, Building2, Mic, Ticket, Contact, Share2, BarChart3,
  Utensils, Briefcase, Crown, ShoppingBag, Coffee, Flag, Mountain, GraduationCap,
  type LucideIcon,
} from "lucide-react";
import CountryCodePicker from "@/components/CountryCodePicker";

function Ico({ icon: Icon }: { icon: LucideIcon }) {
  return <Icon className="h-6 w-6 shrink-0 text-black" strokeWidth={1.75} aria-hidden="true" />;
}

/* ───────────── Content (Updated from Concept Note & Sponsorship Brochure) ───────────── */

const STATS = [
  { value: "~170", label: "ASX-listed companies active in about 35 African countries (Australian Mining Review, Mar 2026)" },
  { value: "A$60bn", label: "Australian mining investment in Africa (DFAT, 2024)" },
  { value: "$200-240B", label: "Africa's required annual clean-energy investment by 2030 (IEA)" },
];

const EDITIONS = [
  { city: "Kigali", dates: "25–28 May 2027", venue: "Kigali International Convention Centre, Rwanda", role: "Prepare the opportunity: government priorities, project qualification & DFI clinics" },
  { city: "Perth", dates: "30 Aug – 2 Sep 2027", venue: "Perth, Western Australia", role: "Mobilise capital and delivery: mining finance, grid technology & institutional capital" },
];

const BENEFITS = [
  "Meet ministers, financiers, DFIs and project owners through receptions, roundtables and pre-booked meetings",
  "Branding across both editions: onsite, in print and on every digital channel",
  "Speaking slots, panel seats and masterclass sessions inside the programme",
  "Access to screened African energy and critical-mineral project pipelines",
];

const PRICES = [
  { tier: "Title / Lead Partner", icon: Trophy, perth: "US$35,000", kigali: "US$35,000", both: "US$79,000", row: "bg-white", price: "text-black" },
  { tier: "Platinum", icon: Trophy, perth: "US$50,000", kigali: "US$50,000", both: "US$50,000", row: "bg-white", price: "text-black" },
  { tier: "Gold", icon: Medal, perth: "US$25,000", kigali: "US$25,000", both: "US$45,000", row: "bg-white", price: "text-black" },
  { tier: "Silver / Bronze", icon: Medal, perth: "US$15,000", kigali: "US$15,000", both: "Bronze: US$20,650", row: "bg-white", price: "text-black" },
];

const TIER_COLS = [
  { name: "Lead", icon: Trophy, head: "bg-slate-100 text-black", bar: "bg-red-500" },
  { name: "Platinum", icon: Trophy, head: "bg-slate-100 text-black", bar: "bg-red-500" },
  { name: "Gold", icon: Medal, head: "bg-slate-100 text-black", bar: "bg-red-500" },
  { name: "Silver", icon: Medal, head: "bg-slate-100 text-black", bar: "bg-red-500" },
  { name: "Bronze", icon: Globe, head: "bg-slate-100 text-black", bar: "bg-red-500" },
];

const INCLUDES: { icon: LucideIcon; item: string; values: string[] }[] = [
  { icon: Tag, item: "Logo on branding and signage", values: ["Title partner", "Top-tier logo", "High-prominence logo", "Medium logo", "Logo listing"] },
  { icon: Building2, item: "Exhibition footprint", values: ["18 sqm prime", "12 sqm", "9 sqm", "6 sqm", "Logo only"] },
  { icon: Mic, item: "Speaking allocation", values: ["Opening keynote", "Plenary keynote", "Session chair", "Panel seat", "Panel seat"] },
  { icon: Ticket, item: "VIP delegate passes", values: ["12 passes", "8 passes", "6 passes", "4 passes", "2 passes"] },
  { icon: Contact, item: "Directory print ad", values: ["Double page", "Full page", "Full page", "Half page", "—"] },
  { icon: Globe, item: "Programme book profile", values: ["Executive profile", "500 words", "300 words", "200 words", "Logo only"] },
  { icon: Share2, item: "B2B Deal Room status", values: ["Dedicated VIP", "Priority access", "Priority access", "Standard", "Standard"] },
  { icon: BarChart3, item: "Venue banner allocation", values: ["6 banners", "4 banners", "3 banners", "2 banners", "—"] },
];

const ADDONS = [
  { icon: Utensils, name: "Networking Luncheon Partner", price: "US$15,000", note: "Exclusive branding in the ballroom at the busiest point of the day.", tone: "bg-white", pill: "text-black" },
  { icon: Briefcase, name: "Thematic Session Partner (Power, Solar, ESG, Finance)", price: "US$11,000", note: "Branding of a chosen session, speaking slot, logo, event mention and brochure insert.", tone: "bg-white", pill: "text-black" },
  { icon: Crown, name: "Cocktail Reception Sponsor", price: "US$12,000", note: "Welcome remarks of 3-5 minutes, banners, corporate video on screen, private introductions.", tone: "bg-white", pill: "text-black" },
  { icon: ShoppingBag, name: "Delegate Bag Sponsor", price: "US$5,000", note: "Your logo on the bag every delegate receives at registration. Exclusive.", tone: "bg-white", pill: "text-black" },
  { icon: Coffee, name: "Coffee Break Sponsor", price: "US$4,000", note: "Branded refreshment stations during networking breaks. 3 available, one per day.", tone: "bg-white", pill: "text-black" },
  { icon: Flag, name: "Aisle Banners Sponsor", price: "US$2,500", note: "Branded banners above the exhibition aisles, seen by every delegate. Exclusive.", tone: "bg-white", pill: "text-black" },
  { icon: Mountain, name: "Lake Kivu / Perth Site Visit Sponsor", price: "US$2,500", note: "Day 4 site visit including transport, itinerary and signage recognition.", tone: "bg-white", pill: "text-black" },
  { icon: Contact, name: "Lanyard Sponsor", price: "US$2,200", note: "Your logo on every delegate and speaker lanyard for all four days. Exclusive.", tone: "bg-white", pill: "text-black" },
  { icon: GraduationCap, name: "Technical Masterclass Training", price: "US$1,500", note: "Presenting sponsorship of the full training day at either edition. Per-delegate rate: US$546/day.", tone: "bg-white", pill: "text-black" },
];

const REPORTING = [
  ["DFIs and multilaterals", "Projects that entered Project Clinics, and readiness notes shared", "bg-white"],
  ["Mining and energy companies", "Pre-booked meetings held and showcase slots delivered", "bg-white"],
  ["Technology and engineering firms", "Technical showcase delivered and introductions logged", "bg-white"],
  ["Banks, law firms and advisers", "Roundtable seats and conversations logged", "bg-white"],
  ["Universities and training bodies", "Skills pairing sessions held and agreements signed", "bg-white"],
];

const SPONSOR_OPTIONS = [
  { value: "lead", label: "Title / Lead Partner" },
  { value: "platinum", label: "Platinum" },
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" },
  { value: "bronze", label: "Bronze" },
  { value: "addon", label: "Exhibition or event add-on only" },
];

const EDITION_OPTIONS = [
  { value: "kigali", label: "Kigali (25–28 May 2027)" },
  { value: "perth", label: "Perth (30 Aug – 2 Sep 2027)" },
  { value: "both", label: "Both editions (Global Corridor package)" },
];

/* ───────────── Form ───────────── */

type SponsorForm = {
  companyName: string; website: string; description: string;
  edition: string; sponsorType: string;
  firstName: string; lastName: string; email: string; designation: string; phone: string;
};

const initialForm: SponsorForm = {
  companyName: "", website: "", description: "", edition: "", sponsorType: "",
  firstName: "", lastName: "", email: "", designation: "", phone: "",
};

const input =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-black placeholder:text-slate-400 focus:border-[#020266] focus:outline-none focus:ring-2 focus:ring-[#020266]/15";
const label = "mb-1.5 block text-sm font-medium text-black";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];

export default function BecomeASponsorPage() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [countryCode, setCountryCode] = useState("+254");
  const [form, setForm] = useState<SponsorForm>(initialForm);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof SponsorForm>(k: K, v: SponsorForm[K]) =>
    setForm((p) => ({ ...p, [k]: v }));

  function setFile(file: File) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      alert("Invalid file type. Upload a JPG, PNG, GIF or WEBP file.");
      return;
    }
    if (file.size > 30 * 1024 * 1024) {
      alert("Maximum file size is 30 MB.");
      return;
    }
    setLogoFile(file);
    setFileName(file.name);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("contactCompany", form.companyName);
      fd.append("countryCode", countryCode);
      if (logoFile) fd.append("logo", logoFile);

      const res = await fetch("/api/sponsorship-request", { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      await res.json();

      setStatus("success");
      setForm(initialForm);
      setLogoFile(null);
      setFileName(null);
      setCountryCode("+254");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-white pt-24">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 py-6 text-sm text-slate-600">
          <Link href="/" className="hover:text-[#020266]">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/partners" className="hover:text-[#020266]">Partners</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-black">Become a sponsor</span>
        </nav>

        {/* Hero + form */}
        <section className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-black sm:text-5xl">
              Sponsor the Clean Energy Conference Africa Australia 2027
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-700">
              Connecting Australian capital, technology and delivery expertise with Africa&apos;s energy and critical-mineral opportunities across Kigali and Perth.
            </p>

            <dl className="mt-14 grid gap-10 border-y border-slate-200 py-10 sm:grid-cols-3">
              {STATS.map((s) => (
                <div key={s.value}>
                  <dt className="font-heading text-3xl font-extrabold text-[#020266]">{s.value}</dt>
                  <dd className="mt-1 text-sm leading-6 text-slate-600">{s.label}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-14 grid gap-12 sm:grid-cols-2">
              {EDITIONS.map((ed) => (
                <div key={ed.city}>
                  <h2 className="font-heading text-xl font-bold text-black">{ed.city}</h2>
                  <p className="mt-1 text-base font-medium text-[#020266]">{ed.dates}</p>
                  <p className="mt-1 text-sm text-slate-600">{ed.venue}</p>
                  <p className="mt-2 text-sm text-black">{ed.role}</p>
                </div>
              ))}
            </div>

            <h2 className="mt-16 font-heading text-xl font-bold text-black">Why sponsor</h2>
            <ul className="mt-6 space-y-5">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3 text-base leading-7 text-black">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[#020266]" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div id="request" className="rounded-2xl border border-slate-200 bg-white lg:sticky lg:top-28">
            <div className="rounded-t-2xl bg-[#020266] px-6 py-4">
              <h2 className="font-heading text-lg font-bold text-white">Request sponsorship details</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 p-8">
              <div>
                <label htmlFor="companyName" className={label}>Company name <span className="text-red-600">*</span></label>
                <input id="companyName" required className={input} value={form.companyName} onChange={(e) => set("companyName", e.target.value)} />
              </div>

              <div>
                <label htmlFor="website" className={label}>Website</label>
                <input id="website" type="url" autoComplete="url" className={input} placeholder="https://yourcompany.com" value={form.website} onChange={(e) => set("website", e.target.value)} />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="edition" className={label}>Edition <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select id="edition" required value={form.edition} onChange={(e) => set("edition", e.target.value)} className={`${input} appearance-none pr-9`}>
                      <option value="" disabled>Select edition</option>
                      {EDITION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="sponsorType" className={label}>Sponsorship <span className="text-red-600">*</span></label>
                  <div className="relative">
                    <select id="sponsorType" required value={form.sponsorType} onChange={(e) => set("sponsorType", e.target.value)} className={`${input} appearance-none pr-9`}>
                      <option value="" disabled>Select tier</option>
                      {SPONSOR_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className={label}>Your goals</label>
                <textarea id="description" rows={3} className={`${input} resize-none`} placeholder="What do you want to achieve as a sponsor?" value={form.description} onChange={(e) => set("description", e.target.value)} />
              </div>

              <div>
                <label htmlFor="logoUpload" className={label}>Company logo</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files?.[0]; if (f) setFile(f); }}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 py-3 text-sm ${dragOver ? "border-[#020266] bg-[#020266]/5" : "border-slate-300 hover:border-[#020266]/50"}`}
                >
                  <Upload className="h-5 w-5 shrink-0 text-slate-400" />
                  <span className={fileName ? "font-medium text-[#020266]" : "text-slate-600"}>
                    {fileName ?? "Drop a file or click to upload (JPG, PNG, GIF, WEBP, up to 30 MB)"}
                  </span>
                </div>
                <input id="logoUpload" ref={fileInputRef} type="file" accept=".jpg,.jpeg,.png,.gif,.webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) setFile(f); }} />
              </div>

              <fieldset className="space-y-6 border-t border-slate-200 pt-7">
                <legend className="sr-only">Contact details</legend>
                <p className="text-sm font-semibold text-black">Contact details</p>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={label}>First name <span className="text-red-600">*</span></label>
                    <input id="firstName" required autoComplete="given-name" className={input} value={form.firstName} onChange={(e) => set("firstName", e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={label}>Last name</label>
                    <input id="lastName" autoComplete="family-name" className={input} value={form.lastName} onChange={(e) => set("lastName", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className={label}>Email <span className="text-red-600">*</span></label>
                  <input id="email" type="email" required autoComplete="email" className={input} placeholder="you@company.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
                </div>
                <div>
                  <label htmlFor="designation" className={label}>Job title</label>
                  <input id="designation" autoComplete="organization-title" className={input} value={form.designation} onChange={(e) => set("designation", e.target.value)} />
                </div>
                <div>
                  <label htmlFor="phone" className={label}>Phone</label>
                  <div className="flex items-stretch gap-2">
                    <CountryCodePicker value={countryCode} onChange={setCountryCode} />
                    <input id="phone" type="tel" autoComplete="tel" className={input} placeholder="700 000 000" value={form.phone} onChange={(e) => set("phone", e.target.value)} />
                  </div>
                </div>
              </fieldset>

              <button type="submit" disabled={submitting} className="w-full rounded-lg bg-[#020266] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#03038f] focus:outline-none focus:ring-2 focus:ring-[#020266]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                {submitting ? "Sending…" : "Send request"}
              </button>

              {status === "success" && (
                <p role="status" className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                  Request sent. Our sponsorship team will be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                  We couldn&apos;t send your request. Try again, or contact us directly.
                </p>
              )}
            </form>
          </div>
        </section>

        {/* Pricing */}
        <section className="mt-32">
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-black">Sponsorship tiers</h2>
          <p className="mt-4 max-w-2xl text-base text-slate-700">
            Sponsor one edition, or carry a single partnership across both with the Global Corridor package:
            one negotiation, with recognition, speaking rights and delegate passes at Kigali and Perth.
          </p>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 border-t-4 border-t-[#020266]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead className="bg-slate-100 text-sm text-black">
                <tr>
                  <th className="px-6 py-5 font-semibold">Tier</th>
                  <th className="px-6 py-5 font-semibold">Perth (USD)</th>
                  <th className="px-6 py-5 font-semibold">Kigali (USD)</th>
                  <th className="px-6 py-5 font-semibold">Global Corridor, both editions (USD)</th>
                </tr>
              </thead>
              <tbody className="text-base text-black">
                {PRICES.map((p) => (
                  <tr key={p.tier} className={`border-t border-slate-200 ${p.row}`}>
                    <th scope="row" className="px-6 py-5 font-semibold"><span className="flex items-center gap-2"><Ico icon={p.icon} />{p.tier}</span></th>
                    <td className={`px-6 py-5 font-bold ${p.price}`}>{p.perth}</td>
                    <td className={`px-6 py-5 font-bold ${p.price}`}>{p.kigali}</td>
                    <td className={`px-6 py-5 font-bold ${p.price}`}>{p.both}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600">
            Global Corridor tiers: Lead US$79,000, Platinum US$50,000, Gold US$45,000, Bronze US$20,650. Exhibition space: Turnkey booth (shell scheme) US$4,000; Custom or raw space US$545 per sqm.
          </p>
        </section>

        {/* Inclusions */}
        <section className="mt-28">
          <h2 className="font-heading text-2xl font-bold text-black">What each tier includes</h2>
          <p className="mt-4 max-w-2xl text-sm text-slate-600">
            Applied at each edition across onsite branding, delegate materials and digital platforms. Exact pass
            allocations and placements are confirmed at contracting.
          </p>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 border-t-4 border-t-[#020266]">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead className="text-sm">
                <tr>
                  <th className="bg-slate-100 px-6 py-5 font-semibold text-black">Deliverable</th>
                  {TIER_COLS.map((c) => (
                    <th key={c.name} className={`px-5 pb-0 pt-5 text-center font-bold ${c.head}`}>
                      <span className="flex items-center justify-center gap-2"><Ico icon={c.icon} />{c.name}</span>
                      <div className={`mt-5 h-[3px] w-full ${c.bar}`} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-sm text-black">
                {INCLUDES.map((row, r) => (
                  <tr key={row.item} className={`border-t border-slate-200 ${"bg-white"}`}>
                    <th scope="row" className="px-6 py-5 font-medium"><span className="flex items-center gap-2.5"><Ico icon={row.icon} />{row.item}</span></th>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-5 py-5 text-center">
                        {v === "Yes" ? <span className="text-xl font-bold text-green-600" aria-label="Included">✓</span>
                          : v === "—" ? <span className="text-xl font-bold text-red-500" aria-label="Not included">⊖</span>
                          : <span className="font-semibold text-black">{v}</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Add-ons */}
        <section className="mt-28">
          <h2 className="font-heading text-2xl font-bold text-black">Exhibition and event add-ons</h2>
          <p className="mt-4 max-w-2xl text-sm text-slate-600">
            Available on top of a sponsorship tier or on their own.
          </p>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-slate-200 border-t-4 border-t-[#020266]">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-slate-100 text-sm text-black">
                <tr>
                  <th className="px-6 py-5 font-semibold">Add-on</th>
                  <th className="px-6 py-5 font-semibold">What you get</th>
                  <th className="px-6 py-5 font-semibold">Price</th>
                </tr>
              </thead>
              <tbody className="text-sm text-black">
                {ADDONS.map((a) => (
                  <tr key={a.name} className={`border-t border-slate-200 align-top ${a.tone}`}>
                    <th scope="row" className="px-6 py-5 font-semibold"><span className="flex items-center gap-2.5"><Ico icon={a.icon} />{a.name}</span></th>
                    <td className="px-6 py-5 text-slate-700">{a.note}</td>
                    <td className="whitespace-nowrap px-6 py-5">
                      <span className={`font-bold ${a.pill}`}>{a.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-600">
            Sending staff to the technical masterclass instead? The per-delegate rate is US$546 per day.
          </p>
        </section>

        {/* Reporting */}
        <section className="mt-28 grid gap-12 border-t border-slate-200 pt-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="font-heading text-2xl font-bold text-black">What we report back</h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">Every sponsor receives a post-event report built on what CEAA can verify.</p>
          </div>
          <dl className="overflow-hidden rounded-2xl border border-slate-200 text-sm">
            {REPORTING.map(([who, what, tone]) => (
              <div key={who} className={`grid gap-1 border-b border-slate-200 px-6 py-5 last:border-b-0 sm:grid-cols-[1fr_1.4fr] ${tone}`}>
                <dt className="font-semibold text-black">{who}</dt>
                <dd className="text-slate-700">{what}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}