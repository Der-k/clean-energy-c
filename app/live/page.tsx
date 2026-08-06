"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

/**
 * app/live/page.tsx
 *
 * Public entry point for the livestream. Attendees enter the email +
 * ticket ID from their registration. On success we store a simple
 * localStorage flag and redirect to the protected /live/watch page.
 *
 * A support form is included below for attendees who can't get in.
 */

const CONFERENCE_NAME = "Clean Energy Conference 2026";
const CONFERENCE_DATES = "October 14–16, 2026 · Kigali Marriott Hotel, Kigali, Rwanda";

type AccessFormState = "idle" | "submitting" | "error";
type SupportFormState = "idle" | "submitting" | "success" | "error";

export default function LivePage() {
  const router = useRouter();

  // -------------------------------------------------------------
  // Access form state
  // -------------------------------------------------------------
  const [email, setEmail] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [accessState, setAccessState] = useState<AccessFormState>("idle");
  const [accessError, setAccessError] = useState<string | null>(null);

  async function handleAccessSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAccessError(null);
    setAccessState("submitting");

    try {
      const response = await fetch("/api/livestream-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ticketId }),
      });

      const data = await response.json();

      if (data.ok) {
        localStorage.setItem("livestream_access", "true");
        localStorage.setItem("livestream_access_email", email);
        router.push("/live/watch");
        return;
      }

      setAccessError(data.message || "Invalid email or ticket ID.");
      setAccessState("error");
    } catch {
      setAccessError("Something went wrong. Please try again shortly.");
      setAccessState("error");
    }
  }

  // -------------------------------------------------------------
  // Support form state
  // -------------------------------------------------------------
  const [supportName, setSupportName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [supportTicketId, setSupportTicketId] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [supportState, setSupportState] = useState<SupportFormState>("idle");
  const [supportFeedback, setSupportFeedback] = useState<string | null>(null);

  async function handleSupportSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSupportFeedback(null);
    setSupportState("submitting");

    try {
      const response = await fetch("/api/livestream-support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: supportName,
          email: supportEmail,
          ticketId: supportTicketId,
          message: supportMessage,
        }),
      });

      const data = await response.json();

      if (data.ok) {
        setSupportState("success");
        setSupportFeedback(
          data.message || "Your message has been sent to our support team."
        );
        setSupportName("");
        setSupportEmail("");
        setSupportTicketId("");
        setSupportMessage("");
        return;
      }

      setSupportState("error");
      setSupportFeedback(data.message || "Something went wrong. Please try again.");
    } catch {
      setSupportState("error");
      setSupportFeedback("Something went wrong. Please try again shortly.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ----------------------------------------------------------- */}
      {/* Hero / branding                                              */}
      {/* ----------------------------------------------------------- */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-emerald-950/40 to-slate-950 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            {CONFERENCE_NAME}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Livestream Access
          </h1>
          <p className="mt-4 text-slate-400">{CONFERENCE_DATES}</p>
          <p className="mx-auto mt-6 max-w-xl text-slate-300">
            Enter the email address and ticket ID from your registration
            confirmation to watch the conference live.
          </p>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* Access form                                                  */}
      {/* ----------------------------------------------------------- */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900/60 p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-slate-100">
            Access the Livestream
          </h2>

          <form className="mt-6 space-y-4" onSubmit={handleAccessSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="ticketId"
                className="block text-sm font-medium text-slate-300"
              >
                Ticket ID
              </label>
              <input
                id="ticketId"
                name="ticketId"
                type="text"
                required
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                placeholder="CEC-2026-00123"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {accessError && (
              <p className="text-sm text-red-400" role="alert">
                {accessError}
              </p>
            )}

            <button
              type="submit"
              disabled={accessState === "submitting"}
              className="w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {accessState === "submitting" ? "Checking…" : "Access Livestream"}
            </button>
          </form>
        </div>
      </section>

      {/* ----------------------------------------------------------- */}
      {/* Support form                                                 */}
      {/* ----------------------------------------------------------- */}
      <section className="border-t border-slate-800 px-6 py-16">
        <div className="mx-auto max-w-md rounded-xl border border-slate-800 bg-slate-900/40 p-8">
          <h2 className="text-lg font-semibold text-slate-100">
            Having trouble accessing the livestream?
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Send us a message and our support team will get back to you.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSupportSubmit}>
            <div>
              <label
                htmlFor="supportName"
                className="block text-sm font-medium text-slate-300"
              >
                Full Name
              </label>
              <input
                id="supportName"
                name="fullName"
                type="text"
                required
                value={supportName}
                onChange={(e) => setSupportName(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="supportEmail"
                className="block text-sm font-medium text-slate-300"
              >
                Email
              </label>
              <input
                id="supportEmail"
                name="email"
                type="email"
                required
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="supportTicketId"
                className="block text-sm font-medium text-slate-300"
              >
                Ticket ID
              </label>
              <input
                id="supportTicketId"
                name="ticketId"
                type="text"
                value={supportTicketId}
                onChange={(e) => setSupportTicketId(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="supportMessage"
                className="block text-sm font-medium text-slate-300"
              >
                Message
              </label>
              <textarea
                id="supportMessage"
                name="message"
                required
                rows={4}
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {supportFeedback && (
              <p
                className={`text-sm ${
                  supportState === "success" ? "text-emerald-400" : "text-red-400"
                }`}
                role="alert"
              >
                {supportFeedback}
              </p>
            )}

            <button
              type="submit"
              disabled={supportState === "submitting"}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-4 py-2 font-semibold text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {supportState === "submitting" ? "Sending…" : "Contact Support"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}