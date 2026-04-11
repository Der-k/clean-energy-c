"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight, Download, FileText, CheckCircle2 } from "lucide-react";

type EventOption = "kigali" | "perth" | "both";

type FormState = {
  firstName: string;
  secondName: string;
  email: string;
  organization: string;
  eventChoice: EventOption;
};

const programmeFiles: Record<EventOption, { label: string; href: string }> = {
  kigali: {
    label: "Kigali Edition Programme",
    href: "/documents/programme-kigali-2026.pdf",
  },
  perth: {
    label: "Perth Edition Programme",
    href: "/documents/programme-perth-2026.pdf",
  },
  both: {
    label: "Full 2026 Programme",
    href: "/documents/clean-energy-conference-programme-2026.pdf",
  },
};

export default function ProgrammePage() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    secondName: "",
    email: "",
    organization: "",
    eventChoice: "both",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedProgramme = useMemo(
    () => programmeFiles[form.eventChoice],
    [form.eventChoice]
  );

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
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

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // BACKEND PLACEHOLDER
      // Later replace this block with your API call, for example:
      // await fetch("/api/programme-request", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(form),
      // });

      await new Promise((resolve) => setTimeout(resolve, 900));

      setIsSubmitted(true);

      // Trigger programme download
      const link = document.createElement("a");
      link.href = selectedProgramme.href;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Programme request failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,white_0%,white_70%,#f8fafc_100%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/event" className="hover:text-blue-600">
              Event
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Programme</span>
          </div>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                Programme Access
              </p>

              <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
                Request the conference programme
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[color:var(--text-main)]-600">
                Select the edition you are interested in, submit your details,
                and access the relevant programme document for the conference.
              </p>

              <div className="mt-8 space-y-4">
                <div className="hover-glow-soft rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[color:var(--text-main)]-900">
                        Available programme options
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[color:var(--text-main)]-600">
                        Kigali Edition, Perth Edition, or the combined 2026
                        programme document.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hover-glow-soft rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Download className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[color:var(--text-main)]-900">
                        Download after submission
                      </p>
                      <p className="mt-1 text-sm leading-7 text-[color:var(--text-main)]-600">
                        Once submitted, the selected programme file will open or
                        download automatically.
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
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-600">
                      Request Form
                    </p>
                    <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                      Get the programme schedule
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="mb-2 block text-sm font-medium text-[color:var(--text-main)]-800"
                        >
                          First name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={form.firstName}
                          onChange={(e) => updateField("firstName", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[color:var(--text-main)]-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter first name"
                        />
                        {errors.firstName && (
                          <p className="mt-2 text-xs text-red-600">{errors.firstName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="secondName"
                          className="mb-2 block text-sm font-medium text-[color:var(--text-main)]-800"
                        >
                          Second name
                        </label>
                        <input
                          id="secondName"
                          type="text"
                          value={form.secondName}
                          onChange={(e) => updateField("secondName", e.target.value)}
                          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[color:var(--text-main)]-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                          placeholder="Enter second name"
                        />
                        {errors.secondName && (
                          <p className="mt-2 text-xs text-red-600">{errors.secondName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-[color:var(--text-main)]-800"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[color:var(--text-main)]-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                        placeholder="Enter email address"
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="organization"
                        className="mb-2 block text-sm font-medium text-[color:var(--text-main)]-800"
                      >
                        Organization
                      </label>
                      <input
                        id="organization"
                        type="text"
                        value={form.organization}
                        onChange={(e) => updateField("organization", e.target.value)}
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[color:var(--text-main)]-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
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
                        htmlFor="eventChoice"
                        className="mb-2 block text-sm font-medium text-[color:var(--text-main)]-800"
                      >
                        Which event do you want?
                      </label>
                      <select
                        id="eventChoice"
                        value={form.eventChoice}
                        onChange={(e) =>
                          updateField("eventChoice", e.target.value as EventOption)
                        }
                        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-[color:var(--text-main)]-900 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
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

                    <div className="rounded-[20px] border border-blue-100 bg-blue-50 px-4 py-4">
                      <p className="text-sm font-semibold text-[color:var(--text-main)]-900">
                        Selected file
                      </p>
                      <p className="mt-1 text-sm text-[color:var(--text-main)]-600">
                        {selectedProgramme.label}
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-glow inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? "Submitting..." : "Submit and Get Programme"}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <h2 className="font-heading mt-6 text-2xl font-bold text-[color:var(--text-main)]-900">
                    Programme request submitted
                  </h2>

                  <p className="mt-3 max-w-md text-sm leading-7 text-[color:var(--text-main)]-600">
                    Thank you, {form.firstName}. Your selected programme should
                    begin downloading automatically.
                  </p>

                  <div className="mt-6 rounded-[20px] border border-slate-200 bg-white px-5 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
                    <p className="text-sm font-semibold text-[color:var(--text-main)]-900">
                      Downloaded file
                    </p>
                    <p className="mt-1 text-sm text-[color:var(--text-main)]-600">
                      {selectedProgramme.label}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <a
                      href={selectedProgramme.href}
                      download
                      className="btn-outline-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
                    >
                      Download again
                      <Download className="h-4 w-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setForm({
                          firstName: "",
                          secondName: "",
                          email: "",
                          organization: "",
                          eventChoice: "both",
                        });
                      }}
                      className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
                    >
                      Submit another request
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