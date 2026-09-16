"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import type { OrderStatus } from "@/lib/conference/types";

export default function RegistrationSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const resolvedSearchParams = use(searchParams);
  const orderNumber = resolvedSearchParams.order ?? "";
  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      return;
    }
    fetch(`/api/conference/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setOrder(data.order);
      })
      .finally(() => setLoading(false));
  }, [orderNumber]);

  if (!orderNumber) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16">
        <p className="text-muted">No order reference was provided.</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16">
        <p className="text-muted">Loading…</p>
      </main>
    );
  }

  const isPaid = order?.status === "paid" && order.ticketNumber;

  return (
    <main className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="mb-4">{isPaid ? "Registration confirmed" : "Registration received"}</h1>

      <div className="surface-card-strong rounded-2xl p-8 grid gap-4">
        <div className="flex justify-between">
          <span className="text-muted">Order</span>
          <span className="font-medium">{orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted">Payment</span>
          <span className="font-medium">{isPaid ? "Paid" : "Pending"}</span>
        </div>

        {isPaid ? (
          <>
            <div className="flex justify-between">
              <span className="text-muted">Ticket</span>
              <span className="font-medium">{order!.ticketNumber}</span>
            </div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                `${typeof window !== "undefined" ? window.location.origin : ""}/ticket/${order!.ticketNumber}`
              )}`}
              alt="Ticket QR code"
              className="mx-auto rounded-xl border border-[var(--border-soft)]"
              width={220}
              height={220}
            />
            <Link href={`/ticket/${order!.ticketNumber}`} className="btn-glow text-white rounded-xl px-6 py-3">
              View your ticket
            </Link>
          </>
        ) : (
          <p className="text-muted">Your ticket will be issued after payment is confirmed.</p>
        )}
      </div>
    </main>
  );
}
