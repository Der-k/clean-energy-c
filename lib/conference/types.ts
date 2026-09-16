export interface ConferenceEvent {
  id: number;
  name: string;
  slug: string;
  location: string | null;
  startDate: string | null;
  endDate: string | null;
  currency: string;
  status: string;
}

export interface TicketTypeOption {
  id: number;
  eventId: number;
  name: string;
  description: string | null;
  price: number;
  currency: string;
  available: number | null; // null = unlimited
  soldOut: boolean;
}

export interface AttendeeDetails {
  fullName: string;
  email: string;
  phone: string;
  organisation: string;
  jobTitle: string;
  country: string;
}

export interface RegistrationResult {
  registrationId: number;
  registrationNumber: string;
}

export interface OrderResult {
  orderNumber: string;
  invoiceNumber: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  status: string;
}

export interface OrderStatus {
  orderNumber: string;
  status: "pending" | "paid" | "failed" | "cancelled" | "refunded";
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  invoiceNumber: string | null;
  invoiceStatus: string | null;
  paymentStatus: string | null;
  ticketNumber: string | null;
  ticketStatus: string | null;
}

export interface TicketDetails {
  ticketNumber: string;
  attendeeName: string;
  ticketType: string | null;
  event: string;
  eventLocation: string | null;
  startDate: string | null;
  endDate: string | null;
  status: "active" | "cancelled" | "checked_in";
  checkedInAt: string | null;
  qrToken: string;
}
