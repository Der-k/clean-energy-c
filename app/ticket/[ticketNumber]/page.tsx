"use client";

import { use, useEffect, useState } from "react";
import type { TicketDetails } from "@/lib/conference/types";

export default function TicketPage({
  params,
}: {
  params: Promise<{ ticketNumber: string }>;
}) {
  const { ticketNumber } = use(params);
  const [ticket, setTicket] = useState<TicketDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/conference/tickets/${ticketNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setTicket(data.ticket);
        else setError(data.message ?? "Ticket not found.");
      })
      .catch(() => setError("Could not load ticket."))
      .finally(() => setLoading(false));
  }, [ticketNumber]);

  if (loading) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16">
        <p className="text-muted">Loading ticket…</p>
      </main>
    );
  }

  if (error || !ticket) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
          {error ?? "Ticket not found."}
        </div>
      </main>
    );
  }

  const qrData =
    typeof window !== "undefined" ? `${window.location.origin}/ticket/${ticket.ticketNumber}` : ticket.ticketNumber;

  return (
    <main className="max-w-xl mx-auto px-4 py-16">
      <div className="surface-card-strong rounded-2xl p-8 text-center grid gap-4">
        <span
          className={`mx-auto text-xs font-semibold uppercase tracking-wide rounded-full px-3 py-1 ${
            ticket.status === "active"
              ? "bg-green-100 text-green-700"
              : ticket.status === "checked_in"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
          }`}
        >
          {ticket.status.replace("_", " ")}
        </span>

        <h1>{ticket.event}</h1>
        {ticket.eventLocation && <p className="text-muted">{ticket.eventLocation}</p>}
        {(ticket.startDate || ticket.endDate) && (
          <p className="text-muted text-sm">
            {ticket.startDate}
            {ticket.endDate ? ` – ${ticket.endDate}` : ""}
          </p>
        )}

        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrData)}`}
          alt="Ticket QR code"
          className="mx-auto rounded-xl border border-[var(--border-soft)]"
          width={240}
          height={240}
        />

        <div className="grid gap-2 text-left mt-2">
          <Row label="Attendee" value={ticket.attendeeName} />
          <Row label="Ticket type" value={ticket.ticketType ?? "—"} />
          <Row label="Ticket number" value={ticket.ticketNumber} />
        </div>
      </div>
    </main>
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
