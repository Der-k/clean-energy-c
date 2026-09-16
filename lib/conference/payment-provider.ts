// Payment provider abstraction.
//
// No real gateway is implemented yet. When one is chosen (Stripe,
// Paystack, Flutterwave, eWAY, Pesapal, ...), implement PaymentProvider
// for it and swap the return value of getPaymentProvider() — nothing in
// the registration/order/ticket architecture needs to change.

export interface OrderRef {
  orderNumber: string;
  total: number;
  currency: string;
}

export interface PaymentResult {
  ok: boolean;
  status: "pending" | "paid" | "failed" | "refunded";
  reference?: string;
  message?: string;
}

export interface PaymentProvider {
  createPayment(order: OrderRef): Promise<PaymentResult>;
  verifyPayment(reference: string): Promise<PaymentResult>;
  refundPayment(reference: string): Promise<PaymentResult>;
}

/**
 * Development-only provider. The pending payment row is already created
 * by POST /api/conference/orders, so createPayment() has nothing to do
 * yet — confirmation happens via the manual-confirm endpoint, which is
 * gated separately and never exposed as a normal customer flow.
 */
class ManualDevPaymentProvider implements PaymentProvider {
  async createPayment(order: OrderRef): Promise<PaymentResult> {
    return { ok: true, status: "pending", reference: order.orderNumber };
  }

  async verifyPayment(reference: string): Promise<PaymentResult> {
    const res = await fetch(`/api/conference/orders/${encodeURIComponent(reference)}`);
    const data = await res.json();

    if (!data.ok) {
      return { ok: false, status: "failed", message: data.message };
    }

    return { ok: true, status: data.order.status, reference };
  }

  async refundPayment(): Promise<PaymentResult> {
    return {
      ok: false,
      status: "failed",
      message: "Refunds are not supported by the manual development payment provider.",
    };
  }
}

export function getPaymentProvider(): PaymentProvider {
  return new ManualDevPaymentProvider();
}
