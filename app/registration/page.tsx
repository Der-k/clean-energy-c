"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/RoleContext"; // adjust import path to match your project
import type { AttendeeDetails, ConferenceEvent, TicketTypeOption } from "@/lib/conference/types";

type Step = "event" | "ticket" | "attendee" | "review";

const EMPTY_ATTENDEE: AttendeeDetails = {
  fullName: "",
  email: "",
  phone: "",
  organisation: "",
  jobTitle: "",
  country: "",
};

export default function RegistrationPage() {
  const router = useRouter();
  const { visitorUuid } = useRole();

  const [step, setStep] = useState<Step>("event");
  const [events, setEvents] = useState<ConferenceEvent[]>([]);
  const [ticketTypes, setTicketTypes] = useState<TicketTypeOption[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<ConferenceEvent | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketTypeOption | null>(null);
  const [attendee, setAttendee] = useState<AttendeeDetails>(EMPTY_ATTENDEE);

  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/conference/events")
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setEvents(data.events);
        else setError(data.message ?? "Could not load events.");
      })
      .catch(() => setError("Could not load events."))
      .finally(() => setLoadingEvents(false));
  }, []);

  function selectEvent(event: ConferenceEvent) {
    setSelectedEvent(event);
    setSelectedTicket(null);
    setError(null);
    setLoadingTickets(true);
    fetch(`/api/conference/tickets?eventId=${event.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setTicketTypes(data.ticketTypes);
        else setError(data.message ?? "Could not load ticket types.");
      })
      .catch(() => setError("Could not load ticket types."))
      .finally(() => setLoadingTickets(false));
    setStep("ticket");
  }

  function selectTicket(ticket: TicketTypeOption) {
    setSelectedTicket(ticket);
    setStep("attendee");
  }

  function handleAttendeeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setStep("review");
  }

  async function handleConfirm() {
    if (!selectedEvent || !selectedTicket) return;
    setSubmitting(true);
    setError(null);

    try {
      const regRes = await fetch("/api/conference/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: selectedEvent.id,
          ticketTypeId: selectedTicket.id,
          fullName: attendee.fullName,
          email: attendee.email,
          phone: attendee.phone,
          organisation: attendee.organisation,
          jobTitle: attendee.jobTitle,
          country: attendee.country,
          visitorUuid,
        }),
      });
      const regData = await regRes.json();
      if (!regData.ok) {
        setError(regData.message ?? "Could not create registration.");
        setSubmitting(false);
        return;
      }

      const orderRes = await fetch("/api/conference/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          registrationId: regData.registration.registrationId,
          ticketTypeId: selectedTicket.id,
        }),
      });
      const orderData = await orderRes.json();
      if (!orderData.ok) {
        setError(orderData.message ?? "Could not create order.");
        setSubmitting(false);
        return;
      }

      router.push(`/registration/payment/${orderData.order.orderNumber}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="mb-2">Register for the Clean Energy Conference</h1>
      <p className="text-muted mb-10">
        Select your event and ticket, tell us about yourself, then review before payment.
      </p>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error}
        </div>
      )}

      {step === "event" && (
        <section className="grid gap-4">
          {loadingEvents && <p className="text-muted">Loading events…</p>}
          {!loadingEvents && events.length === 0 && (
            <p className="text-muted">No events are open for registration right now.</p>
          )}
          {events.map((event) => (
            <button
              key={event.id}
              onClick={() => selectEvent(event)}
              className="surface-card hover-glow-card rounded-2xl p-6 text-left"
            >
              <h3 className="mb-1">{event.name}</h3>
              <p className="text-muted text-sm">
                {event.location}
                {event.startDate ? ` · ${event.startDate}` : ""}
                {event.endDate ? ` – ${event.endDate}` : ""}
              </p>
            </button>
          ))}
        </section>
      )}

      {step === "ticket" && selectedEvent && (
        <section>
          <button onClick={() => setStep("event")} className="text-sm text-muted mb-4 underline">
            ← Change event
          </button>
          <h3 className="mb-4">Choose your ticket — {selectedEvent.name}</h3>
          <div className="grid gap-4">
            {loadingTickets && <p className="text-muted">Loading ticket types…</p>}
            {!loadingTickets && ticketTypes.length === 0 && (
              <p className="text-muted">No ticket types are available for this event.</p>
            )}
            {ticketTypes.map((ticket) => (
              <button
                key={ticket.id}
                disabled={ticket.soldOut}
                onClick={() => selectTicket(ticket)}
                className="surface-card hover-glow-card rounded-2xl p-6 text-left disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-between">
                  <h3>{ticket.name}</h3>
                  <span className="font-heading font-semibold">
                    {ticket.currency} {ticket.price.toFixed(2)}
                  </span>
                </div>
                {ticket.description && <p className="text-muted text-sm mt-1">{ticket.description}</p>}
                {ticket.soldOut && <p className="text-sm mt-2 text-red-600">Sold out</p>}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === "attendee" && selectedTicket && (
        <section>
          <button onClick={() => setStep("ticket")} className="text-sm text-muted mb-4 underline">
            ← Change ticket
          </button>
          <h3 className="mb-4">Attendee details</h3>
          <form onSubmit={handleAttendeeSubmit} className="surface-card rounded-2xl p-6 grid gap-4">
            <Field
              label="Full Name"
              value={attendee.fullName}
              required
              onChange={(v) => setAttendee({ ...attendee, fullName: v })}
            />
            <Field
              label="Email"
              type="email"
              value={attendee.email}
              required
              onChange={(v) => setAttendee({ ...attendee, email: v })}
            />
            <Field label="Phone" value={attendee.phone} onChange={(v) => setAttendee({ ...attendee, phone: v })} />
            <Field
              label="Organisation"
              value={attendee.organisation}
              onChange={(v) => setAttendee({ ...attendee, organisation: v })}
            />
            <Field
              label="Job Title"
              value={attendee.jobTitle}
              onChange={(v) => setAttendee({ ...attendee, jobTitle: v })}
            />
            <Field label="Country" value={attendee.country} onChange={(v) => setAttendee({ ...attendee, country: v })} />

            <button type="submit" className="btn-glow text-white rounded-xl px-6 py-3 mt-2">
              Review order
            </button>
          </form>
        </section>
      )}

      {step === "review" && selectedEvent && selectedTicket && (
        <section>
          <button onClick={() => setStep("attendee")} className="text-sm text-muted mb-4 underline">
            ← Edit details
          </button>
          <h3 className="mb-4">Review your registration</h3>
          <div className="surface-card-strong rounded-2xl p-6 grid gap-3">
            <Row label="Event" value={selectedEvent.name} />
            <Row label="Ticket" value={`${selectedTicket.name} (${selectedTicket.currency} ${selectedTicket.price.toFixed(2)})`} />
            <Row label="Attendee" value={attendee.fullName} />
            <Row label="Email" value={attendee.email} />
            {attendee.organisation && <Row label="Organisation" value={attendee.organisation} />}

            <p className="text-muted text-sm mt-2">
              Final subtotal, tax and total will be confirmed by the server on the next step.
            </p>

            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="btn-glow text-white rounded-xl px-6 py-3 mt-2 disabled:opacity-60"
            >
              {submitting ? "Creating order…" : "Confirm and continue to payment"}
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[var(--border-soft)] px-3 py-2 outline-none focus:border-[var(--primary)]"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border-soft)] pb-2 last:border-0 last:pb-0">
      <span className="text-muted text-sm">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
