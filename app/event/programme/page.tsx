"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Download, FileText, CheckCircle2, BookOpen } from "lucide-react";
import { useRole } from "@/context/RoleContext";

type EventOption = "Kigali" | "perth" | "both";

type FormState = {
  firstName: string;
  secondName: string;
  email: string;
  organization: string;
  eventChoice: EventOption;
  includeProspectus: boolean;
};

const programmeFiles: Record<EventOption, { label: string; href: string }> = {
  Kigali: {
    label: "Kigali Edition Programme",
    href: "/documents/conference programme Kigali Rwanda.pdf",
  },
  perth: {
    label: "Perth Edition Programme",
     href: "/documents/clean-energy-conference-programme-2026.pdf",
  },
  both: {
    label: "Combined Programme (Kigali + Perth)",
    href: "/documents/clean-energy-conference-programme-2026.pdf",
  },
};

const prospectusFile = {
  label: "Event Prospectus",
  href: "/documents/1CEE Master Presentation_.pptx",
};

function triggerDownload(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = "";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export default function ProgrammePage() {
  const { visitorUuid } = useRole();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    secondName: "",
    email: "",
    organization: "",
    eventChoice: "both",
    includeProspectus: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [prospectusDownloaded, setProspectusDownloaded] = useState(false);

  const selectedProgramme = useMemo(
    () => programmeFiles[form.eventChoice],
    [form.eventChoice]
  );

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

    if (!form.organization.trim()) {
      nextErrors.organization = "Organization is required.";
    }

    if (!form.eventChoice) {
      nextErrors.eventChoice = "Please choose an event.";
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
      const response = await fetch("/api/programme-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          visitorUuid: visitorUuid ?? null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        if (result?.errors) {
          setErrors((prev) => ({
            ...prev,
            firstName:    result.errors.firstName?.[0]    ?? "",
            secondName:   result.errors.secondName?.[0]   ?? "",
            email:        result.errors.email?.[0]        ?? "",
            organization: result.errors.organization?.[0] ?? "",
            eventChoice:  result.errors.eventChoice?.[0]  ?? "",
          }));
        }
        setSubmitError(result?.message || "Something went wrong. Please try again.");
        return;
      }

      setIsSubmitted(true);

      const programme = programmeFiles[form.eventChoice];
      triggerDownload(programme.href);

      if (form.includeProspectus) {
        setTimeout(() => {
          triggerDownload(prospectusFile.href);
          setProspectusDownloaded(true);
        }, 300);
      }
    } catch (error) {
      console.error("Programme request failed:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleDownloadProspectus() {
    triggerDownload(prospectusFile.href);
    setProspectusDownloaded(true);
  }

  return (
    <main className="bg-white pt-24">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,white_70%,#f8fafc_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/event" className="hover:text-[#02026e]">Event</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Programme</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
                Programme Access
              </p>
              <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
                Request the conference programme
              </h1>
              <p className="mt-5 max-w-2xl text-xl leading-8 text-[color:var(--text-main)]-600">
                Select the edition you are interested in, submit your details,
                and access the relevant programme document for the conference.
              </p>

              <div className="mt-8 space-y-4">
                <div className="hover-glow-soft rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#02026e]/5 text-[#02026e]">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[color:var(--text-main)]-900">Available programme options</p>
                      <p className="mt-1 text-base leading-7 text-[color:var(--text-main)]-600">
                        Kigali Edition, Perth Edition, or both programmes downloaded together.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hover-glow-soft rounded-[20px] border border-emerald-200 bg-emerald-50/60 p-5 shadow-[0_10px_28px_rgba(6,95,70,0.06)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600/10 text-emerald-700">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-emerald-900">Event prospectus, optional</p>
                      <p className="mt-1 text-base leading-7 text-emerald-800/80">
                        Add the full event prospectus to your request, or download it separately after submitting.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hover-glow-soft rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#02026e]/5 text-[#02026e]">
                      <Download className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[color:var(--text-main)]-900">Download after submission</p>
                      <p className="mt-1 text-base leading-7 text-[color:var(--text-main)]-600">
                        Once submitted, the selected programme file(s) will open or download automatically.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_18px_48px_rgba(15,23,42,0.08)] md:p-8">
              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-[#02026e]">Request Form</p>
                    <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                      Get the programme schedule
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="mb-2 block text-base font-medium text-[color:var(--text-main)]-800">First name</label>
                        <input id="firstName" type="text" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter first name" />
                        {errors.firstName && <p className="mt-2 text-xs text-red-600">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label htmlFor="secondName" className="mb-2 block text-base font-medium text-[color:var(--text-main)]-800">Second name</label>
                        <input id="secondName" type="text" value={form.secondName} onChange={(e) => updateField("secondName", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter second name" />
                        {errors.secondName && <p className="mt-2 text-xs text-red-600">{errors.secondName}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="mb-2 block text-base font-medium text-[color:var(--text-main)]-800">Email</label>
                      <input id="email" type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        placeholder="Enter email address" />
                      {errors.email && <p className="mt-2 text-xs text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="organization" className="mb-2 block text-base font-medium text-[color:var(--text-main)]-800">Organization</label>
                      <input id="organization" type="text" value={form.organization} onChange={(e) => updateField("organization", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        placeholder="Enter organization" />
                      {errors.organization && <p className="mt-2 text-xs text-red-600">{errors.organization}</p>}
                    </div>

                    <div>
                      <label htmlFor="eventChoice" className="mb-2 block text-base font-medium text-[color:var(--text-main)]-800">Which event do you want?</label>
                      <select id="eventChoice" value={form.eventChoice} onChange={(e) => updateField("eventChoice", e.target.value as EventOption)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-base outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100">
                        <option value="Kigali">Kigali Edition</option>
                        <option value="perth">Perth Edition</option>
                        <option value="both">Both Editions</option>
                      </select>
                      {errors.eventChoice && <p className="mt-2 text-xs text-red-600">{errors.eventChoice}</p>}
                    </div>

                    <div>
                      <span className="mb-2 block text-base font-medium text-[color:var(--text-main)]-800">
                        Want the prospectus too?
                      </span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={form.includeProspectus}
                        onClick={() => updateField("includeProspectus", !form.includeProspectus)}
                        className={[
                          "flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition",
                          form.includeProspectus
                            ? "border-emerald-500 bg-emerald-50 shadow-[0_10px_28px_rgba(6,95,70,0.12)]"
                            : "border-emerald-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/40",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition",
                            form.includeProspectus
                              ? "border-emerald-600 bg-emerald-600 text-white"
                              : "border-emerald-300 bg-white text-transparent",
                          ].join(" ")}
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="block text-base font-semibold text-emerald-900">
                             Send me the event prospectus
                          </span>
                          <span className="mt-1 block text-base leading-6 text-emerald-800/70">
                            A full overview of the conference, themes, and partnership details.
                          </span>
                        </span>
                      </button>
                    </div>

                    <div className="rounded-[20px] border border-[#02026e]/20 bg-[#02026e]/5 px-4 py-4">
                      <p className="text-base font-semibold text-[color:var(--text-main)]-900">
                        Selected file{form.eventChoice === "both" || form.includeProspectus ? "s" : ""}
                      </p>
                      <p className="mt-1 text-base text-[color:var(--text-main)]-600">
                        {selectedProgramme.label}
                        {form.includeProspectus ? (
                          <span className="font-semibold text-emerald-700"> + {prospectusFile.label}</span>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>

                    {submitError && <p className="text-base text-red-600">{submitError}</p>}

                    <button type="submit" disabled={isSubmitting}
                      className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-base font-semibold text-white bg-[#020266] border border-[#020266] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-out hover:border-[#020266]/60 hover:scale-[1.04] hover:shadow-[0_18px_50px_rgba(2,2,102,0.25)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] focus:outline-none focus:ring-2 focus:ring-[#020266]/25 focus:ring-offset-2 focus:ring-offset-white"
                    >
                      <span className="absolute inset-0 overflow-hidden rounded-full">
                        <span className="absolute left-0 top-0 h-full w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
                      </span>
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-[#020266]">
                        {isSubmitting ? "Submitting..." : "Submit and Get Programme"}
                      </span>
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#02026e]/5 text-[#02026e]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h2 className="font-heading mt-6 text-2xl font-bold text-[color:var(--text-main)]-900">
                    Programme request submitted
                  </h2>
                  <p className="mt-3 max-w-md text-base leading-7 text-[color:var(--text-main)]-600">
                    Thank you, {form.firstName}. Your selected programme{form.eventChoice === "both" ? "s" : ""} should begin downloading automatically.
                    {form.includeProspectus ? " The event prospectus is on its way too." : ""}
                  </p>

                  <div className="mt-6 rounded-[20px] border border-slate-200 bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                    <p className="text-base font-semibold text-[color:var(--text-main)]-900">
                      Downloaded file{form.eventChoice === "both" ? "s" : ""}
                    </p>
                    <p className="mt-1 text-base text-[color:var(--text-main)]-600">{selectedProgramme.label}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a href={selectedProgramme.href} download
                      className="btn-outline-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-[color:var(--text-main)]-900"
                    >
                      Download again
                      <Download className="h-4 w-4" />
                    </a>
                    <button type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setSubmitError("");
                        setErrors({});
                        setProspectusDownloaded(false);
                        setForm({ firstName: "", secondName: "", email: "", organization: "", eventChoice: "both", includeProspectus: false });
                      }}
                      className="btn-glow rounded-full px-6 py-3 text-base font-semibold text-white"
                    >
                      Submit another request
                    </button>
                  </div>

                  {/* Additional download option once a programme request has already been submitted. */}
                  <div className="mt-8 w-full rounded-[20px] border border-emerald-300 bg-emerald-50 px-5 py-5 text-left shadow-[0_10px_28px_rgba(6,95,70,0.08)]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700 shadow-sm">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-base font-semibold text-emerald-900">
                          Want the full event prospectus too?
                        </p>
                        <p className="mt-1 text-base leading-7 text-emerald-800/70">
                          {prospectusDownloaded
                            ? "Sent — grab it again below any time."
                            : "You've already given us your details, so this one's a single click."}
                        </p>
                        <button
                          type="button"
                          onClick={handleDownloadProspectus}
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-base font-semibold text-white transition hover:scale-[1.03] hover:bg-emerald-700 hover:shadow-[0_12px_30px_rgba(6,95,70,0.3)]"
                        >
                          {prospectusDownloaded ? "Download prospectus again" : "Download the prospectus"}
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
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