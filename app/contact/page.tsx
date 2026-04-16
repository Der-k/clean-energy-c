import Link from "next/link";
import {
  ChevronRight,
  Mail,
  Phone,
  Users,
  Mic,
  Handshake,
  Newspaper,
  Ticket,
  MapPin,
  Globe,
} from "lucide-react";

const contactCards = [
  {
    title: "General Enquiries",
    description:
      "For general questions about the conference, event details, attendance, or logistics.",
    person: "Conference Team",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: Users,
  },
  {
    title: "Speaker Enquiries",
    description:
      "If you are interested in speaking at the event, submit your speaking enquiry to the team.",
    person: "Speaker Relations",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: Mic,
  },
  {
    title: "Sponsorship / Partnership Enquiries",
    description:
      "For sponsorship packages, exhibition opportunities, and partnership discussions.",
    person: "Partnerships Team",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: Handshake,
  },
  {
    title: "Media Partnership / Press Enquiries",
    description:
      "For media partnerships, press accreditation, publicity enquiries, or interviews.",
    person: "Media Relations",
    email: "info@cleanenergyconference.com.au",
    phone: "",
    icon: Newspaper,
  },
  {
    title: "Delegate / Exhibition Enquiries",
    description:
      "For delegate registrations, exhibition questions, and participation-related assistance.",
    person: "Delegate Services",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: Ticket,
  },
  {
    title: "Venue / Event Location Enquiries",
    description:
      "For questions related to venue access, location information, and event arrival planning.",
    person: "Event Logistics",
    email: "info@cleanenergyconference.com.au",
    phone: "+254 725 707 557",
    icon: MapPin,
  },
];

export default function ContactPage() {
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
            <span className="text-[color:var(--text-main)]-700">Contact Us</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              Contact Us
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-[color:var(--text-main)]-900 sm:text-5xl">
              Get in touch with the conference team
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-main)]-600">
              Reach the right team for enquiries related to speakers, partnerships,
              media, delegates, venue information, or general conference support.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {contactCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-[22px] border border-[#02026e]/20
 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.10)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#02026e]/5
 text-[#02026e]">
                  <Icon className="h-5 w-5" />
                </div>

                <h2 className="mt-5 text-xl font-semibold text-[color:var(--text-main)]-900">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-[color:var(--text-main)]-600">
                  {card.description}
                </p>

                <div className="mt-5 space-y-3 text-sm">
                  <p className="font-medium text-[color:var(--text-main)]-800">{card.person}</p>

                  <div className="flex items-start gap-3 text-[color:var(--text-main)]-700">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#02026e]" />
                    <a
                      href={`mailto:${card.email}`}
                      className="hover:text-[#02026e]"
                    >
                      {card.email}
                    </a>
                  </div>

                  {card.phone ? (
                    <div className="flex items-start gap-3 text-[color:var(--text-main)]-700">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#02026e]" />
                      <a href={`tel:${card.phone}`} className="hover:text-[#02026e]">
                        {card.phone}
                      </a>
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#02026e]">
                Send an Enquiry
              </p>
              <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
                Contact form
              </h2>
              <p className="mt-5 text-base leading-8 text-[color:var(--text-main)]-600">
                Use the form to send a message to the conference team. You can
                wire it to your backend or email service later.
              </p>

              <div className="mt-8 rounded-[20px] border border-[#02026e]/20
 bg-white p-5 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#02026e]">
                  Primary Contact
                </p>
                <div className="mt-4 space-y-3 text-sm text-[color:var(--text-main)]-700">
                  <p>
                    <span className="font-semibold text-[color:var(--text-main)]-900">Phone:</span>{" "}
                    +254 725 707 557
                  </p>
                  <p>
                    <span className="font-semibold text-[color:var(--text-main)]-900">Email:</span>{" "}
                    dorah.simiyu@cleanenergyconference.com.au
                  </p>
                  <p>
                    <span className="font-semibold text-[color:var(--text-main)]-900">Website:</span>{" "}
                    www.cleanenergyconference.com.au
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#02026e]/20
 bg-white p-6 shadow-sm md:p-8">
              <form className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                  />
                </div>

                <select className="h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-[color:var(--text-main)]-500 outline-none transition focus:border-blue-400 focus:bg-white">
                  <option>Enquiry Type</option>
                  <option>General Enquiry</option>
                  <option>Speaker Enquiry</option>
                  <option>Sponsorship / Partnership</option>
                  <option>Media / Press</option>
                  <option>Delegate / Exhibition</option>
                  <option>Venue / Logistics</option>
                </select>

                <textarea
                  rows={6}
                  placeholder="Your Message"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
                  >
                    Send Enquiry
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="rounded-[28px] border border-[#02026e]/20
 bg-gradient-to-r from-blue-600 to-[#010150] px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Follow our social network
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Stay connected with the conference
              </h2>
              <p className="mt-3 text-sm leading-7 text-blue-50 md:text-base">
                Follow the conference across social channels for updates,
                announcements, and event news.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
  <a
    href="#"
    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
  >
    <Globe className="h-4 w-4" />
    LinkedIn
  </a>
  <a
    href="#"
    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
  >
    <Globe className="h-4 w-4" />
    Facebook
  </a>
  <a
    href="#"
    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
  >
    <Globe className="h-4 w-4" />
    Instagram
  </a>
</div>
          </div>
        </div>
      </section>
    </main>
  );
}