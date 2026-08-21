"use client";

// Save this file as: app/event/get-tickets/page.tsx (replacing the existing one)
// This single page replaces the previous two-page (get-tickets -> payment-options) flow.

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  CalendarDays,
  MapPin,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Landmark,
  Copy,
  Check,
  Mail,
} from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

const editionOptions = [
  {
    key: "kigali",
    title: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    image: "/images/conference/perth ticket.jpg",
    zohoHref:
      "https://clean-energy.zohobackstage.com/Kigali#/buyTickets/selectTickets?lang=en",
    description:
      "Join East Africa’s leading clean energy dialogue focused on regional integration, climate finance, and decentralized systems.",
  },
  {
    key: "perth",
    title: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    image: "/images/conference/kigali ticket.jpg",
    zohoHref:
      "https://clean-energy.zohobackstage.com/australia#/buyTickets/selectTickets?lang=en",
    description:
      "Engage with global investors, mining leaders, and clean technology innovators connecting Africa to international capital and expertise.",
  },
] as const;

type EditionKey = (typeof editionOptions)[number]["key"];
type PaymentKey = "card" | "bank";

const bankInfo = {
  swift: "CTBAAU2S",
  bsb: "066 164",
  account: "1057 4029",
  beneficiaryName: "Australia Africa Energy and Mineral Institute",
  beneficiaryAddress: "25 Bursaria Crescent, Ferndale 6148",
  beneficiaryContact: "+61 421 800 071",
};

type EditionOption = (typeof editionOptions)[number];

function CopyIconButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can fail silently in unsupported contexts.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${label}`}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#02026e]/20 text-[#02026e] transition hover:bg-[#02026e]/5"
    >
      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

/**
 * A wire-transfer instruction card styled like a ticket stub — a routing
 * "counterfoil" up top, a perforated tear line, then the beneficiary
 * details below. Echoes the conference-ticket theme of the page it lives on.
 */
function WireTransferPanel({ edition }: { edition: EditionOption }) {
  const [copiedAll, setCopiedAll] = useState(false);

  const fullDetails = [
    `Beneficiary: ${bankInfo.beneficiaryName}`,
    `Address: ${bankInfo.beneficiaryAddress}`,
    `Contact: ${bankInfo.beneficiaryContact}`,
    `SWIFT/BIC: ${bankInfo.swift}`,
    `BSB: ${bankInfo.bsb}`,
    `Account Number: ${bankInfo.account}`,
    `Reference: ${edition.title}`,
  ].join("\n");

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(fullDetails);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 1800);
    } catch {
      // Clipboard access can fail silently in unsupported contexts.
    }
  };

  const routingFields = [
    { label: "SWIFT / BIC", value: bankInfo.swift },
    { label: "BSB Number", value: bankInfo.bsb },
    { label: "Account Number", value: bankInfo.account },
  ];

  return (
    <div className="rounded-[28px] border border-[#02026e]/15 bg-white shadow-[0_10px_30px_rgba(2,2,110,0.08)]">
      {/* Header ribbon */}
      <div className="flex items-center justify-between gap-4 rounded-t-[28px] bg-gradient-to-r from-[#02026e] to-[#010150] px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 text-white">
            <Landmark className="h-5 w-5" />
          </span>
          <div>
            <p className="text-base font-bold text-white">
              Wire Transfer Instructions
            </p>
            <p className="text-sm text-white/70">{edition.title} registration</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleCopyAll}
          className="hidden shrink-0 items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20 sm:flex"
        >
          {copiedAll ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copiedAll ? "Copied" : "Copy all details"}
        </button>
      </div>

      {/* Routing codes */}
      <div className="px-6 pt-6 md:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {routingFields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between gap-2 rounded-2xl border border-[#02026e]/15 bg-[#02026e]/[0.035] px-4 py-3.5"
            >
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-main)]-500">
                  {field.label}
                </p>
                <p className="mt-1 truncate font-mono text-lg font-semibold tracking-wide text-[#02026e]">
                  {field.value}
                </p>
              </div>
              <CopyIconButton value={field.value} label={field.label} />
            </div>
          ))}
        </div>
      </div>

      {/* Perforated tear line — ticket-stub motif */}
      <div className="relative mx-6 my-6 md:mx-8">
        <div className="border-t border-dashed border-[#02026e]/25" />
        <span className="absolute left-[-33px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-[#02026e]/15 bg-white md:left-[-41px]" />
        <span className="absolute right-[-33px] top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border border-[#02026e]/15 bg-white md:right-[-41px]" />
      </div>

      <div className="px-6 pb-6 md:px-8 md:pb-8">
        {/* Beneficiary block */}
        <div className="rounded-2xl border border-[#02026e]/15 bg-[#02026e]/[0.02] px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-main)]-500">
                Beneficiary
              </p>
              <p className="mt-1 text-base font-semibold text-[color:var(--text-main)]-900">
                {bankInfo.beneficiaryName}
              </p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--text-main)]-600">
                {bankInfo.beneficiaryAddress}
              </p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--text-main)]-600">
                {bankInfo.beneficiaryContact}
              </p>
            </div>
            <CopyIconButton
              value={`${bankInfo.beneficiaryName}\n${bankInfo.beneficiaryAddress}\n${bankInfo.beneficiaryContact}`}
              label="beneficiary details"
            />
          </div>
        </div>

        {/* Payment reference */}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-dashed border-[#02026e]/30 bg-white px-5 py-3.5">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--text-main)]-500">
            Payment reference
          </span>
          <span className="text-base font-medium text-[color:var(--text-main)]-900">
            Your full name — {edition.title}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-[color:var(--text-main)]-500">
            Transfers can take 1–3 business days to clear. Your place is
            confirmed once payment is matched to your reference.
          </p>
          <a
            href={`mailto:registrations@aaemi.org?subject=Bank%20Transfer%20Payment%20Confirmation%20-%20${encodeURIComponent(
              edition.title
            )}`}
            className="inline-flex shrink-0 items-center gap-2 text-base font-semibold text-[#02026e] hover:text-[#010150]"
          >
            <Mail className="h-4 w-4" />
            Email proof of payment
          </a>
        </div>

        <button
          type="button"
          onClick={handleCopyAll}
          className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full border border-[#02026e]/20 px-4 py-2.5 text-sm font-semibold text-[#02026e] transition hover:bg-[#02026e]/5 sm:hidden"
        >
          {copiedAll ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copiedAll ? "Copied" : "Copy all details"}
        </button>
      </div>
    </div>
  );
}

export default function GetTicketsPage() {
  const [selectedEdition, setSelectedEdition] = useState<EditionKey | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentKey | null>(null);

  const edition = editionOptions.find((e) => e.key === selectedEdition) ?? null;
  const bothSelected = Boolean(edition && selectedPayment);

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
            <span className="text-[color:var(--text-main)]-700">
              Get Tickets
            </span>
          </div>

          {/* Heading */}
          <div className="max-w-4xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Registration
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Register for the conference
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-[color:var(--text-main)]-600">
              Choose your edition and how you&apos;d like to pay. We&apos;ll
              show you the right checkout step below.
            </p>
          </div>
        </div>
      </section>

      {/* STEP 1: EDITION */}
      <SectionShell>
        <div className="mb-6 flex items-baseline gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#02026e] text-sm font-bold text-white">
            1
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            Choose your edition
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {editionOptions.map((item) => {
            const isSelected = selectedEdition === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setSelectedEdition(item.key)}
                aria-pressed={isSelected}
                className={`group block overflow-hidden rounded-[28px] border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.12)] ${
                  isSelected
                    ? "border-[#02026e] ring-2 ring-[#02026e]"
                    : "border-[#02026e]/20"
                }`}
              >
                {/* Image */}
                <div className="relative h-[220px] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
                  {isSelected && (
                    <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#02026e] text-white">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-[color:var(--text-main)]-600">
                    {item.description}
                  </p>

                  <div className="mt-5 space-y-2 text-base text-[color:var(--text-main)]-700">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#02026e]" />
                      <span>{item.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#02026e]" />
                      <span>{item.venue}</span>
                    </div>
                  </div>

                  <div
                    className={`mt-6 inline-flex items-center gap-2 text-base font-semibold ${
                      isSelected
                        ? "text-[#02026e]"
                        : "text-[color:var(--text-main)]-400"
                    }`}
                  >
                    {isSelected ? "Selected" : "Select this edition"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </SectionShell>

      {/* STEP 2: PAYMENT METHOD */}
      <SectionShell>
        <div className="mb-6 flex items-baseline gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#02026e] text-sm font-bold text-white">
            2
          </span>
          <h2 className="font-heading text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            Choose how to pay
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* CARD / ZOHO */}
          <button
            type="button"
            onClick={() => setSelectedPayment("card")}
            aria-pressed={selectedPayment === "card"}
            className={`group flex flex-col overflow-hidden rounded-[28px] border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.12)] ${
              selectedPayment === "card"
                ? "border-[#02026e] ring-2 ring-[#02026e]"
                : "border-[#02026e]/20"
            }`}
          >
            <div className="relative h-[180px] w-full overflow-hidden">
              <Image
                src="/images/conference/card-payment.jpg"
                alt="Pay online by credit or debit card"
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
              <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#02026e]">
                <CreditCard className="h-5 w-5" />
              </div>
              {selectedPayment === "card" && (
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#02026e] text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                Pay online by card
              </h3>
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
            </div>
          </button>

          {/* BANK TRANSFER */}
          <button
            type="button"
            onClick={() => setSelectedPayment("bank")}
            aria-pressed={selectedPayment === "bank"}
            className={`group flex flex-col overflow-hidden rounded-[28px] border bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(2,2,110,0.12)] ${
              selectedPayment === "bank"
                ? "border-[#02026e] ring-2 ring-[#02026e]"
                : "border-[#02026e]/20"
            }`}
          >
            <div className="relative h-[180px] w-full overflow-hidden">
              <Image
                src="/images/conference/bank-transfer.jpg"
                alt="Pay by direct bank transfer"
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/30 to-transparent" />
              <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#02026e]">
                <Landmark className="h-5 w-5" />
              </div>
              {selectedPayment === "bank" && (
                <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#02026e] text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>

            <div className="p-6">
              <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                Direct bank transfer
              </h3>
              <p className="mt-3 text-base leading-7 text-[color:var(--text-main)]-600">
                Transfer your registration fee directly to our account.
                Use your full name and conference edition as the payment
                reference.
              </p>
              <ul className="mt-5 space-y-2 text-base text-[color:var(--text-main)]-700">
                <li>No card fees</li>
                <li>Details shown once selected below</li>
                <li>Confirmed once payment is matched</li>
              </ul>
            </div>
          </button>
        </div>
      </SectionShell>

      {/* STEP 3: ACTION — driven by both selections */}
      <SectionShell>
        <div className="rounded-[28px] border border-[#02026e]/20 bg-[#02026e]/[0.03] p-6 md:p-8">
          {!bothSelected && (
            <p className="text-base leading-7 text-[color:var(--text-main)]-600">
              Select an edition and a payment method above to see your
              checkout details.
            </p>
          )}

          {bothSelected && selectedPayment === "card" && edition && (
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#02026e]">
                  {edition.title} · Pay by card
                </p>
                <p className="mt-2 text-base leading-7 text-[color:var(--text-main)]-600">
                  You&apos;ll be redirected to our secure Zoho Backstage
                  checkout to complete your registration.
                </p>
              </div>
              <a
                href={edition.zohoHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#02026e] px-6 py-3 text-base font-semibold text-white transition hover:bg-[#010150]"
              >
                Proceed to secure checkout
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          )}

          {bothSelected && selectedPayment === "bank" && edition && (
            <WireTransferPanel edition={edition} />
          )}
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell>
        <div className="rounded-[26px] border border-[#02026e]/30 bg-gradient-to-r from-[#02026e] to-[#010150] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.22)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Need more information?
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Explore the full conference programme
              </h2>
              <p className="mt-3 text-base leading-7 text-white/80 md:text-base">
                Review session formats, speakers, and thematic focus areas before
                securing your place.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/event/programme"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[#02026e] transition hover:bg-white/90"
              >
                View Programme
              </Link>

              <Link
                href="/conference"
                className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Conference Overview
              </Link>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}