"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/lib/conference/types";

export default function PaymentPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = use(params);
  const router = useRouter();

  const [order, setOrder] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/conference/orders/${orderNumber}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setOrder(data.order);
        else setError(data.message ?? "Order not found.");
      })
      .catch(() => setError("Could not load order."))
      .finally(() => setLoading(false));
  }, [orderNumber]);

  async function handleManualConfirm() {
    setConfirming(true);
    setError(null);
    try {
      const res = await fetch("/api/conference/payments/manual-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber }),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.message ?? "Could not confirm payment.");
        setConfirming(false);
        return;
      }
      router.push(`/registration/success?order=${orderNumber}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setConfirming(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16">
        <p className="text-muted">Loading order…</p>
      </main>
    );
  }

  if (error && !order) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16">
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto px-4 py-16">
      <h1 className="mb-6">Payment</h1>

      <div className="surface-card-strong rounded-2xl p-6 grid gap-3 mb-6">
        <div className="flex justify-between">
          <span className="text-muted">Order</span>
          <span className="font-medium">{orderNumber}</span>
        </div>
        {order && (
          <div className="flex justify-between">
            <span className="text-muted">Amount</span>
            <span className="font-heading font-semibold">
              {order.currency} {order.total.toFixed(2)}
            </span>
          </div>
        )}
        <p className="text-muted text-sm mt-2">Payment provider integration will be added here.</p>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      )}

      {order?.status === "pending" ? (
        <div className="rounded-2xl border-2 border-dashed border-[var(--border-strong)] p-6">
          <p className="text-sm text-muted mb-3">
            Development mode — no live payment gateway is connected yet. Use this to simulate a
            successful payment and test the rest of the flow.
          </p>
          <button
            onClick={handleManualConfirm}
            disabled={confirming}
            className="btn-outline-glow rounded-xl px-6 py-3 disabled:opacity-60"
          >
            {confirming ? "Confirming…" : "Simulate payment (dev only)"}
          </button>
        </div>
      ) : (
        <p className="text-muted">This order is already {order?.status}.</p>
      )}
    </main>
  );
}
