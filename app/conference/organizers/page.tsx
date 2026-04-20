import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, Phone } from "lucide-react";

type Organizer = {
  name: string;
  role: string;
  organization: string;
  image: string;
};

const coreOrganizers: Organizer[] = [
  {
    name: "Sarah Thompson",
    role: "Conference Director",
    organization: "Clean Energy Conference",
    image: "/images/organizers/organizer-1.jpg",
  },
  {
    name: "David Mwangi",
    role: "Head of Strategic Partnerships",
    organization: "Clean Energy Conference",
    image: "/images/organizers/organizer-2.jpg",
  },
  {
    name: "Emily Carter",
    role: "Programme Lead",
    organization: "Clean Energy Conference",
    image: "/images/organizers/organizer-3.jpg",
  },
  {
    name: "Josephine Ndlovu",
    role: "Operations & Delegate Experience Lead",
    organization: "Clean Energy Conference",
    image: "/images/organizers/organizer-4.jpg",
  },
];

const advisoryCommittee: Organizer[] = [
  {
    name: "Dr. Michael Bennett",
    role: "Advisory Committee Chair",
    organization: "Energy Transition Advisory Group",
    image: "/images/organizers/advisory-1.jpg",
  },
  {
    name: "Eng. Ruth Achieng",
    role: "Technical Advisory Member",
    organization: "Renewable Infrastructure Network",
    image: "/images/organizers/advisory-2.jpg",
  },
  {
    name: "Peter van Zyl",
    role: "Industry Advisory Member",
    organization: "GreenGrid Capital",
    image: "/images/organizers/advisory-3.jpg",
  },
  {
    name: "Claire Mensah",
    role: "Policy Advisory Member",
    organization: "Regional Energy Dialogue Forum",
    image: "/images/organizers/advisory-4.jpg",
  },
  {
    name: "Daniel Okeke",
    role: "Investment Advisory Member",
    organization: "Clean Growth Partners",
    image: "/images/organizers/advisory-5.jpg",
  },
  {
    name: "Amelia Foster",
    role: "International Partnerships Advisor",
    organization: "Sustainable Energy Exchange",
    image: "/images/organizers/advisory-6.jpg",
  },
];

const supportTeam: Organizer[] = [
  {
    name: "Grace Wanjiku",
    role: "Marketing & Communications",
    organization: "Clean Energy Conference",
    image: "/images/organizers/support-1.jpg",
  },
  {
    name: "Brian Ochieng",
    role: "Sponsorship Relations",
    organization: "Clean Energy Conference",
    image: "/images/organizers/support-2.jpg",
  },
  {
    name: "Mia Robertson",
    role: "Delegate Services",
    organization: "Clean Energy Conference",
    image: "/images/organizers/support-3.jpg",
  },
  {
    name: "Kelvin Dube",
    role: "Event Logistics Coordinator",
    organization: "Clean Energy Conference",
    image: "/images/organizers/support-4.jpg",
  },
];

export default function OrganizersPage() {
  return (
    <main className="pt-24 bg-white">
      <section className="relative overflow-hidden border-b border-[#02026e]/20
 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-[#02026e]/5
/10 blur-3xl" />
          <div className="absolute right-[-80px] top-[50px] h-[240px] w-[240px] rounded-full bg-[#02026e]/5
/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[color:var(--text-main)]-500">
            <Link href="/" className="hover:text-[#02026e]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/conference" className="hover:text-[#02026e]">
              Conference
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-[color:var(--text-main)]-700">Organizers</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Event Organizers
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Meet the organizers behind the conference
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
              A curated team of conference leaders, advisors, and support staff
              working across programme development, partnerships, delegate
              engagement, and event delivery.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <SectionHeader
          eyebrow="Core Team"
          title="Conference leadership"
          description="The primary team responsible for strategy, programme direction, sponsorship coordination, and event execution."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {coreOrganizers.map((person) => (
            <OrganizerCard key={person.name} person={person} featured />
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
          <SectionHeader
            eyebrow="Advisory Committee"
            title="Industry and policy advisors"
            description="A broader group of experts helping shape the conference’s relevance, credibility, and strategic direction."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {advisoryCommittee.map((person) => (
              <OrganizerCard key={person.name} person={person} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <SectionHeader
          eyebrow="Support Team"
          title="Delivery and engagement team"
          description="The operational team supporting communications, logistics, sponsorship liaison, and attendee coordination."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {supportTeam.map((person) => (
            <OrganizerCard key={person.name} person={person} compact />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:pb-20">
        <div className="rounded-[26px] border border-[#02026e]/20
 bg-gradient-to-r from-blue-600 to-#02026e-500 px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Contact the team
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Reach out for partnerships, delegate enquiries, or event support
              </h2>
              <p className="mt-3 text-sm leading-7 text-blue-50 md:text-base">
                Get in touch with the organizing team for sponsorship, attendance,
                or event coordination matters.
              </p>
            </div>

            <div className="grid gap-3 text-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3">
                <Mail className="h-4 w-4" />
                <span>info@cleanenergyconference.com</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-3">
                <Phone className="h-4 w-4" />
                <span>+61 000 000 000</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#02026e]">
        {eyebrow}
      </p>
      <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">{description}</p>
    </div>
  );
}

function OrganizerCard({
  person,
  featured = false,
  compact = false,
}: {
  person: Organizer;
  featured?: boolean;
  compact?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-[22px] border border-[#02026e]/20
 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.10)] ${
        featured ? "p-0" : compact ? "p-4" : "p-5"
      }`}
    >
      <div className={featured ? "" : "space-y-4"}>
        <div
          className={`relative overflow-hidden bg-[#02026e]/5
 ${
            featured
              ? "aspect-[4/4.5] w-full"
              : compact
              ? "aspect-[4/4.2] w-full rounded-[18px]"
              : "aspect-[4/4.6] w-full rounded-[18px]"
          }`}
        >
          <Image
            src={person.image}
            alt={person.name}
            fill
            sizes={
              featured
                ? "(max-width: 1280px) 50vw, 25vw"
                : "(max-width: 1024px) 50vw, 25vw"
            }
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </div>

        <div className={featured ? "p-5" : ""}>
          <h3 className="font-heading text-xl font-semibold text-[color:var(--text-main)]-900">{person.name}</h3>
          <p className="mt-2 text-sm leading-6 text-[color:var(--text-main)]-600">{person.role}</p>
          <p className="mt-1 text-sm font-medium text-[#02026e]">
            {person.organization}
          </p>
        </div>
      </div>
    </article>
  );
}