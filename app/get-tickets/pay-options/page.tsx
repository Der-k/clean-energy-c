"use client";

// Save this file as: app/event/payment-options/page.tsx
// (wrap the component below in a <Suspense> boundary if your Next.js
// version requires it for useSearchParams — see note at bottom of file)

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  Landmark,
  CreditCard,
  Copy,
  Check,
  Mail,
} from "lucide-react";
import { useState } from "react";
import { SectionShell } from "@/components/layout/section-shell";

const editions = {
  kigali: {
    title: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    zohoHref:
      "https://clean-energy.zohobackstage.com/Kigali#/buyTickets/selectTickets?lang=en",
  },
  perth: {
    title: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    zohoHref:
      "https://clean-energy.zohobackstage.com/australia#/buyTickets/selectTickets?lang=en",
  },
} as const;

type EditionKey = keyof typeof editions;

const bankDetails = [
  { label: "SWIFT / BIC Code", value: "CTBAAU2S" },
  { label: "BSB Number", value: "066 164" },
  { label: "Account Number", value: "1057 4029" },
  {
    label: "Beneficiary",
    value: "Australia Africa Energy and Mineral Institute",
  },
  { label: "Beneficiary Address", value: "25 Bursaria Crescent, Ferndale 6148" },
  { label: "Beneficiary Contact", value: "+61 421 800 071" },
];

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can fail silently in unsupported contexts.
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#02026e]/10 py-3 last:border-b-0">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--text-main)]-500">
          {label}
        </p>
        <p className="mt-1 text-base font-medium text-[color:var(--text-main)]-900">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        className="flex shrink-0 items-center gap-1.5 rounded-full border border-[#02026e]/20 px-3 py-1.5 text-sm font-semibold text-[#02026e] transition hover:bg-[#02026e]/5"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" />
            Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}

export default function PaymentOptionsPage() {
  const searchParams = useSearchParams();
  const editionParam = searchParams.get("edition") as EditionKey | null;
  const edition = editionParam && editions[editionParam] ? editions[editionParam] : null;

  return (
    <main className="pt-24 bg-white">
      {/* HERO / HEADER */}
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-[#02026e]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          {/* Breadcrumb */}
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/event/get-tickets" className="hover:text-[#02026e]">
              Get Tickets
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">
              Payment Options
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Registration
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Choose how you&apos;d like to pay
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-[color:var(--text-main)]-600">
              Pay securely online in a few minutes, or settle your
              registration by direct bank transfer. Both options confirm
              your place at the conference.
            </p>

            {edition && (
              <div className="mt-6 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-[#02026e]/15 bg-[#02026e]/5 px-5 py-3 text-base text-[color:var(--text-main)]-700">
                <span className="font-semibold text-[#02026e]">
                  {edition.title}
                </span>
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-[#02026e]" />
                  {edition.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#02026e]" />
                  {edition.venue}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PAYMENT METHOD OPTIONS */}
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ZOHO / CARD PAYMENT */}
          <div className="group flex flex-col overflow-hidden rounded-[28px] border border-[#02026e]/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.12)]">
            <div className="relative h-[200px] w-full overflow-hidden">
              <Image
                src="/images/payment/card-payment.jpg"
                alt="Pay online by credit or debit card"
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
              <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#02026e]">
                <CreditCard className="h-5 w-5" />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                Pay online by card
              </h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--text-main)]-600">
                Complete your registration instantly through our secure
                checkout. Accepts major credit and debit cards, with an
                immediate confirmation and e-ticket.
              </p>

              <ul className="mt-5 space-y-2 text-base text-[color:var(--text-main)]-700">
                <li>Instant confirmation</li>
                <li>Secure checkout hosted by Zoho Backstage</li>
                <li>E-ticket sent straight to your inbox</li>
              </ul>

              <a
                href={edition ? edition.zohoHref : editions.kigali.zohoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-2 pt-6 text-base font-semibold text-[#02026e] group-hover:text-[#010150]"
              >
                Proceed to secure checkout
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* BANK TRANSFER */}
          <div className="group flex flex-col overflow-hidden rounded-[28px] border border-[#02026e]/20 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.12)]">
            <div className="relative h-[200px] w-full overflow-hidden">
              <Image
                src="/images/payment/bank-transfer.jpg"
                alt="Pay by direct bank transfer"
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
              <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#02026e]">
                <Landmark className="h-5 w-5" />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                Direct bank transfer
              </h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--text-main)]-600">
                Transfer your registration fee directly to our account
                below. Please use your full name and conference edition as
                the payment reference.
              </p>

              <div className="mt-5 rounded-2xl border border-[#02026e]/15 bg-[#02026e]/[0.03] px-5">
                {bankDetails.map((row) => (
                  <CopyRow key={row.label} label={row.label} value={row.value} />
                ))}
              </div>

              <a
                href="mailto:registrations@aaemi.org?subject=Bank%20Transfer%20Payment%20Confirmation"
                className="mt-6 inline-flex items-center gap-2 text-base font-semibold text-[#02026e] group-hover:text-[#010150]"
              >
                <Mail className="h-4 w-4" />
                Email your proof of payment
              </a>
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm leading-6 text-[color:var(--text-main)]-500">
          Bank transfers can take 1–3 business days to clear. Your place is
          confirmed once payment is received and matched to your
          registration reference — you&apos;ll get an email as soon as it
          is.
        </p>
      </SectionShell>

      {/* CTA */}
      <SectionShell>
        <div className="rounded-[26px] border border-[#02026e]/30 bg-gradient-to-r from-[#02026e] to-[#010150] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.22)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Not sure which edition to pick?
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Compare the Kigali and Perth editions
              </h2>
              <p className="mt-3 text-base leading-7 text-white/80 md:text-base">
                Review dates, venues, and themes before you complete your
                registration.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/event/get-tickets"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[#02026e] transition hover:bg-white/90"
              >
                Back to editions
              </Link>

              <Link
                href="/event/programme"
                className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View Programme
              </Link>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}

/*
  Note on useSearchParams:
  In Next.js App Router, a component that calls useSearchParams() must be
  rendered inside a <Suspense> boundary or the production build will error.
  If you hit that, split this file into:

    app/event/payment-options/page.tsx        (server component, wraps in Suspense)
    app/event/payment-options/payment-options-client.tsx  (this component)

  e.g.:

    import { Suspense } from "react";
    import PaymentOptionsClient from "./payment-options-client";

    export default function Page() {
      return (
        <Suspense fallback={null}>
          <PaymentOptionsClient />
        </Suspense>
      );
    }
*/