import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Download,
  FileCheck,
  Globe2,
  Mail,
  MapPin,
  ShieldCheck,
} from "lucide-react";

const australiaVisaGuideHref = "/documents/australia-visa-application-guide.pdf";

const editions = [
  {
    name: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    location: "Kigali, Rwanda",
    accent: "border-[#003994]/20 bg-[#003994]/[0.03]",
    button:
      "bg-[#003994] text-white hover:shadow-[0_0_30px_rgba(0,57,148,0.22)]",
    href: "/conference?edition=kigali",
    visaText:
      "Kenyan citizens do not need a visa to travel to Kigali, Rwanda for short business or conference travel. As EAC citizens, Kenyans can enter Rwanda for up to 6 months using a valid passport, national ID, or temporary Interstate Pass. Carry your invitation letter, accommodation details, return ticket, and yellow fever certificate where applicable.",
  },
  {
    name: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    location: "Perth, Western Australia",
    accent: "border-[#009966]/20 bg-[#009966]/[0.04]",
    button:
      "bg-[#009966] text-white hover:shadow-[0_0_30px_rgba(0,153,102,0.22)]",
    href: "/conference?edition=perth",
    visaText:
      "Delegates travelling to Perth should prepare for the Australia visa application process early. Download the Australia visa guide below for help with ImmiAccount setup, Temporary Activity Visa Subclass 408 selection, host details, supporting documents, payment, and biometrics steps.",
  },
];

const planningSteps = [
  {
    title: "Check your visa pathway early",
    description:
      "Review the visitor, business, conference, or short-stay visa option that applies to your country of passport and travel purpose. Requirements differ by nationality and destination.",
    icon: Globe2,
  },
  {
    title: "Register for the conference",
    description:
      "Keep your registration confirmation, payment receipt, and edition details ready. These are commonly useful when preparing a visa application or requesting a supporting letter.",
    icon: BadgeCheck,
  },
  {
    title: "Prepare core travel documents",
    description:
      "Have a valid passport, accommodation details, flight plan, proof of funds, travel insurance if required, and any employer or organization support letter where relevant.",
    icon: FileCheck,
  },
  {
    title: "Request supporting documentation if needed",
    description:
      "If your application requires proof of attendance, contact the conference team early to request any supporting conference documentation you may need.",
    icon: Mail,
  },
];

const checklist = [
  "Valid passport with sufficient validity beyond travel dates",
  "Conference registration confirmation",
  "Accommodation booking confirmation",
  "Flight reservation or travel itinerary",
  "Proof of financial support or company sponsorship where required",
  "Travel insurance, if required for your visa route",
  "Employer letter or organization introduction letter if attending in a professional capacity",
  "Any transit visa documentation for connecting countries",
];

const timeline = [
  {
    label: "8–12 weeks before travel",
    text: "Confirm the edition you will attend, review visa requirements for your nationality, and begin gathering documents.",
  },
  {
    label: "6–8 weeks before travel",
    text: "Submit your visa application where processing times require advance filing, and secure hotel and flight planning documents.",
  },
  {
    label: "3–4 weeks before travel",
    text: "Check application status, confirm conference registration details, and prepare both printed and digital copies of key documents.",
  },
  {
    label: "1 week before travel",
    text: "Recheck passport, visa approval, flight details, hotel confirmation, and arrival information for your conference city.",
  },
];

export default function VisaPage() {
  return (
    <main className="bg-white pt-24">
      <section className="border-b border-zinc-200 bg-gradient-to-b from-[#003994]/[0.05] via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-[#003994]/15 bg-white px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#003994] shadow-sm">
              Visa Planning
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-[-0.03em] text-zinc-950 sm:text-5xl">
              Plan your visa and travel for the 2026 conference editions
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600 sm:text-xl
">
              This page helps delegates prepare early for travel to the Kigali and
              Perth editions of the Clean Energy Conference & Exhibition. Use it as
              a planning guide for timelines, supporting documents, and conference
              details that may be useful during your travel preparation.
            </p>

            <div className="mt-6 rounded-[22px] border border-amber-200 bg-amber-50 px-5 py-4 text-base leading-7 text-amber-900">
              Visa rules depend on your passport, country of residence, and travel
              route. Always confirm the latest requirements with the relevant embassy,
              consulate, or official immigration website before booking final travel.
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#009966]/25 bg-gradient-to-br from-[#009966]/[0.08] via-white to-[#003994]/[0.06] p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full bg-[#009966] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                Australia visa guide available
              </div>

              <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#009966]">
                Perth edition travel support
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
                Travelling to Australia? Download the visa application guide
              </h2>

              <p className="mt-4 text-base leading-8 text-zinc-700">
                Delegates attending the Perth Edition can download this guide to
                help understand the Australia visa application process. It covers
                creating an ImmiAccount, selecting the Temporary Activity Visa
                Subclass 408, entering host and event details, uploading supporting
                documents, payment, and biometrics guidance.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={australiaVisaGuideHref}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-[#009966] px-6 py-3 text-base font-semibold text-white transition hover:shadow-[0_0_32px_rgba(0,153,102,0.28)]"
                >
                  <Download className="h-4 w-4" />
                  Download Australia visa guide
                </Link>

                <a
                  href="mailto:info@cleanenergyconference.com.au"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3 text-base font-semibold text-zinc-950 transition hover:border-[#009966]/40 hover:text-[#009966]"
                >
                  <Mail className="h-4 w-4" />
                  Ask for support
                </a>
              </div>
            </div>

            <div className="rounded-[26px] border border-zinc-200 bg-white p-5 shadow-sm">
              <p className="text-base font-bold text-zinc-950">
                The guide helps with:
              </p>

              <div className="mt-4 space-y-3">
                {[
                  "Creating or accessing your ImmiAccount",
                  "Selecting Temporary Activity Visa Subclass 408",
                  "Entering host organization and event details",
                  "Preparing invitation, ticket, passport, financial, and health insurance documents",
                  "Understanding payment and biometrics next steps",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#009966]" />
                    <span className="text-base leading-6 text-zinc-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-base leading-6 text-amber-900">
                This guide is for delegate preparation. Always confirm current visa
                rules through official Australian immigration channels before applying.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
  <div className="rounded-[32px] border border-[#003994]/20 bg-gradient-to-br from-[#003994]/[0.06] via-white to-white p-6 shadow-sm sm:p-8 lg:p-10">
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div>
        <div className="inline-flex rounded-full bg-[#003994] px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
          Kigali visa guidance
        </div>

        <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#003994]">
          Kigali edition travel support
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-zinc-950 sm:text-4xl">
          Kenyan citizens do not need a visa for short travel to Rwanda
        </h2>

        <p className="mt-4 text-base leading-8 text-zinc-700">
          Kenyan citizens can travel to Kigali, Rwanda without applying for a visa
          for short business, conference, or visitor travel. As members of the East
          African Community, Kenyans may enter Rwanda for up to 6 months using a
          valid passport, national ID, or temporary Interstate Pass.
        </p>

        <p className="mt-4 text-base leading-8 text-zinc-700">
          This applies to conference attendance, business meetings, signing
          contracts, and exploring investment opportunities. However, it does not
          replace a work permit or residence permit if someone intends to take up
          employment or run a business in Rwanda permanently.
        </p>
      </div>

      <div className="rounded-[26px] border border-zinc-200 bg-white p-5 shadow-sm">
        <p className="text-base font-bold text-zinc-950">
          What Kenyan delegates should carry:
        </p>

        <div className="mt-4 space-y-3">
          {[
            "Valid passport, national ID, or temporary Interstate Pass",
            "Conference invitation letter or proof of event attendance",
            "Accommodation details for your stay in Kigali",
            "Return or onward ticket showing planned departure",
            "Proof of sufficient funds if requested at entry",
            "Yellow fever certificate where applicable",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#003994]" />
              <span className="text-base leading-6 text-zinc-700">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-base leading-6 text-amber-900">
          Entry requirements can change. Delegates should confirm current travel
          rules with the Rwanda High Commission in Kenya, Kenya High Commission in
          Kigali, or official immigration channels before travelling.
        </div>
      </div>
    </div>
  </div>
</section>

      
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-[30px] border border-zinc-200 bg-zinc-50 p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#003994]">
              Recommended process
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] text-zinc-950">
              How to prepare your visa application
            </h2>
            <p className="mt-4 text-base leading-8 text-zinc-600">
              Start early and treat your visa preparation as part of your overall
              conference planning. The steps below are designed to work for both
              editions without assuming country-specific immigration rules.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {planningSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#003994]/10 text-[#003994]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="mt-4 text-xl
 font-semibold text-zinc-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-zinc-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-zinc-200 bg-white p-7 shadow-sm">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#003994]">
              Document checklist
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-zinc-950">
              Keep these items ready
            </h2>

            <div className="mt-6 space-y-3">
              {checklist.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#009966]" />
                  <span className="text-base leading-7 text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-zinc-200 bg-white p-7 shadow-sm">
            <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-[#009966]">
              Suggested timeline
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-zinc-950">
              Work backwards from your edition date
            </h2>

            <div className="mt-6 space-y-4">
              {timeline.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-5"
                >
                  <p className="text-base font-semibold text-zinc-950">
                    {item.label}
                  </p>
                  <p className="mt-2 text-base leading-7 text-zinc-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

<section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {editions.map((edition) => (
            <div
              key={edition.name}
              className={`rounded-[28px] border p-7 shadow-sm ${edition.accent}`}
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Conference Edition
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-[-0.02em] text-zinc-950">
                {edition.name}
              </h2>

              <div className="mt-5 space-y-3 text-base text-zinc-700">
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                  <span>{edition.date}</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500" />
                  <span>{edition.venue}</span>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-zinc-600">
                {edition.visaText}
              </p>

              <div className="mt-6">
                <Link
                  href={edition.href}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-base font-semibold transition ${edition.button}`}
                >
                  View {edition.name}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="rounded-[30px] border border-[#003994]/20 bg-gradient-to-r from-[#003994] to-[#001b6e] px-6 py-8 text-white shadow-[0_18px_50px_rgba(0,57,148,0.22)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Need conference support?
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Request documentation early and keep your application moving
              </h2>
              <p className="mt-3 text-base leading-7 text-white/80 md:text-base">
                Ticket guidance in the concept note shows early bird registration at
                USD 770 until 1 March 2026, with regular tickets at USD 800. Secure
                your place early so your conference registration can support your
                travel planning.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:info@cleanenergyconference.com.au"
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-base font-semibold text-[#003994] transition hover:bg-white/90"
              >
                <Mail className="h-4 w-4" />
                Contact conference team
              </a>

              <Link
                href="/tickets"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                View tickets
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}