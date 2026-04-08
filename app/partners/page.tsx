import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";

type Partner = {
  name: string;
  logo: string;
  description: string;
  website?: string;
};

const premiumPartner: Partner[] = [
  {
    name: "Central Energy Fund",
    logo: "/images/partners/cef.png",
    description:
      "A major national energy entity operating across oil, gas, coal, renewable, and clean energy initiatives, with strategic partnerships and a broad mandate across the energy sector.",
    website: "https://www.cefgroup.co.za",
  },
];

const platinumSponsors: Partner[] = [
  {
    name: "Edison Power",
    logo: "/images/partners/edison-power.png",
    description:
      "A leading provider of smart energy and infrastructure upgrade solutions with strong experience in renewable energy, smart metering, utility services, and transmission systems.",
    website: "https://www.edisonpower.co.za",
  },
];

const goldSponsors: Partner[] = [
  {
    name: "Rompco",
    logo: "/images/partners/rompco.png",
    description:
      "A cross-border gas infrastructure company supporting regional energy transport and broader market development.",
    website: "https://www.rompco.co.za",
  },
  {
    name: "Eskom",
    logo: "/images/partners/eskom.png",
    description:
      "A major electricity utility operating across generation, transmission, and distribution with strong regional relevance.",
    website: "https://www.eskom.co.za",
  },
  {
    name: "Development Bank of Southern Africa",
    logo: "/images/partners/dbsa.png",
    description:
      "A development finance institution focused on infrastructure delivery and impactful investment across Africa.",
    website: "https://www.dbsa.org",
  },
  {
    name: "EWSETA",
    logo: "/images/partners/ewseta.png",
    description:
      "A sector authority supporting skills development in the energy, renewable energy, gas, and water sectors.",
    website: "https://ewseta.org.za",
  },
];

const silverSponsors: Partner[] = [
  {
    name: "ECIC",
    logo: "/images/partners/ecic.png",
    description:
      "An export credit agency supporting trade, market access, and project confidence in international markets.",
    website: "https://www.ecic.co.za",
  },
  {
    name: "Barloworld Power",
    logo: "/images/partners/barloworld-power.png",
    description:
      "A provider of integrated power and energy solutions for critical industries across Southern Africa.",
    website: "https://www.barloworld.com",
  },
  {
    name: "Allied Talent Partners",
    logo: "/images/partners/atp.png",
    description:
      "A talent marketplace connecting experienced professionals to energy access and sustainable development opportunities.",
    website: "https://alliedtalentpartners.org",
  },
  {
    name: "Telkom",
    logo: "/images/partners/telkom.png",
    description:
      "An ICT services provider with initiatives that support connectivity, digital development, and innovation.",
    website: "https://www.telkom.co.za",
  },
];

export default function PartnersPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-[-80px] top-[40px] h-[240px] w-[240px] rounded-full bg-cyan-100/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-700">Partners & Sponsors</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Partnerships
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-5xl">
              Partners & Sponsors
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Explore the organizations supporting the Clean Energy Conference
              through partnership, sponsorship, strategic visibility, and sector collaboration.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/partners/become-a-partner"
                className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                Become a Partner
              </Link>

              <Link
                href="/contact"
                className="btn-outline-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PartnerSection
        eyebrow="Premium Partner"
        title="Premium Partner"
        partners={premiumPartner}
        featured
      />

      <PartnerSection
        eyebrow="Platinum Sponsor"
        title="Platinum Sponsor"
        partners={platinumSponsors}
      />

      <PartnerSection
        eyebrow="Gold Sponsors"
        title="Gold Sponsors"
        partners={goldSponsors}
        muted
      />

      <PartnerSection
        eyebrow="Silver Sponsors"
        title="Silver Sponsors"
        partners={silverSponsors}
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:pb-20">
        <div className="rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Partnership Opportunities
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Position your brand within the clean energy conversation
              </h2>
              <p className="mt-3 text-sm leading-7 text-blue-50 md:text-base">
                Join the conference as a sponsor or partner and connect with
                delegates, policymakers, investors, and industry leaders.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/partners/become-a-partner"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Become a Partner
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact the Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function PartnerSection({
  eyebrow,
  title,
  partners,
  featured = false,
  muted = false,
}: {
  eyebrow: string;
  title: string;
  partners: Partner[];
  featured?: boolean;
  muted?: boolean;
}) {
  return (
    <section className={muted ? "bg-slate-50" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            {eyebrow}
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-slate-900">
            {title}
          </h2>
        </div>

        <div
          className={`mt-10 grid gap-6 ${
            featured ? "grid-cols-1" : "md:grid-cols-2"
          }`}
        >
          {partners.map((partner) => (
            <article
              key={partner.name}
              className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex shrink-0 items-center justify-center rounded-[18px] border border-blue-100 bg-blue-50 p-6 lg:w-56">
                  <div className="relative h-20 w-full">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      sizes="224px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-slate-900">
                    {partner.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {partner.description}
                  </p>

                  {partner.website && (
                    <div className="mt-5">
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Visit Website
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}