"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@/lib/conference/types";

type PaymentMethod = "card" | "bank_transfer" | "mobile_money";

const PAYMENT_METHODS: { id: PaymentMethod; label: string; description: string }[] = [
  { id: "card", label: "Credit / Debit Card", description: "Visa, Mastercard, Amex" },
  { id: "bank_transfer", label: "Bank Transfer", description: "Direct transfer via your bank" },
  { id: "mobile_money", label: "Mobile Money", description: "M-Pesa and similar wallets" },
];

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
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

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
    if (!selectedMethod) {
      setError("Choose a payment method first.");
      return;
    }
    setConfirming(true);
    setError(null);
    try {
      const res = await fetch("/api/conference/payments/manual-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderNumber, paymentMethod: selectedMethod }),
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
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">{error}</div>
      )}

      {order?.status === "pending" ? (
        <>
          <h3 className="mb-3">Choose a payment method</h3>
          <div className="grid gap-3 mb-6">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`surface-card hover-glow-card rounded-2xl p-4 text-left flex items-center justify-between ${
                  selectedMethod === method.id ? "border-[var(--primary)]" : ""
                }`}
                style={
                  selectedMethod === method.id
                    ? { borderColor: "var(--primary)", boxShadow: "var(--glow-blue-medium)" }
                    : undefined
                }
              >
                <div>
                  <p className="font-medium">{method.label}</p>
                  <p className="text-muted text-sm">{method.description}</p>
                </div>
                <span
                  className={`h-4 w-4 rounded-full border-2 shrink-0 ${
                    selectedMethod === method.id ? "bg-[var(--primary)]" : "bg-transparent"
                  }`}
                  style={{ borderColor: "var(--primary)" }}
                />
              </button>
            ))}
          </div>

          <div className="rounded-2xl border-2 border-dashed border-[var(--border-strong)] p-6">
            <p className="text-sm text-muted mb-3">
              Development mode — no live payment gateway is connected yet for {" "}
              {selectedMethod
                ? PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.label.toLowerCase()
                : "the method you choose"}
              . Use this to simulate a successful payment and test the rest of the flow.
            </p>
            <button
              onClick={handleManualConfirm}
              disabled={confirming || !selectedMethod}
              className="btn-outline-glow rounded-xl px-6 py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {confirming ? "Confirming…" : "Simulate payment (dev only)"}
            </button>
          </div>
        </>
      ) : (
        <p className="text-muted">This order is already {order?.status}.</p>
      )}
    </main>
  );
}