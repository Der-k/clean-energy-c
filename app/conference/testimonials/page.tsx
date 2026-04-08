import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Quote, Star } from "lucide-react";

const featuredTestimonials = [
  {
    name: "Dr. Angela Mbeki",
    role: "Director, Sustainable Infrastructure Forum",
    company: "SIF Global",
    image: "/images/testimonials/testimonial-1.jpg",
    quote:
      "The conference created a rare environment where policy, investment, and implementation conversations all happened in one place. The quality of delegates and strategic dialogue made it genuinely worthwhile.",
  },
  {
    name: "Michael Oduor",
    role: "Managing Partner",
    company: "EastGrid Capital",
    image: "/images/testimonials/testimonial-2.jpg",
    quote:
      "What stood out most was the calibre of attendees. We were able to connect directly with decision-makers, explore serious partnership opportunities, and gain practical market insight in a very short time.",
  },
  {
    name: "Claire Bennett",
    role: "Head of Energy Transition",
    company: "BlueArc Advisory",
    image: "/images/testimonials/testimonial-3.jpg",
    quote:
      "The programme was highly relevant, the networking was strong, and the event felt well positioned for professionals looking for meaningful engagement rather than generic conference traffic.",
  },
  {
    name: "Eng. David Njoroge",
    role: "Regional Technical Lead",
    company: "Clean Systems Africa",
    image: "/images/testimonials/testimonial-4.jpg",
    quote:
      "From the speaker sessions to the side conversations, the event delivered practical value. It was clear that the audience was there to engage seriously around projects, partnerships, and long-term opportunities.",
  },
];

const shortTestimonials = [
  {
    quote:
      "A highly relevant event for anyone serious about clean energy partnerships and sector insight.",
    author: "Delegate, Energy Investment Firm",
  },
  {
    quote:
      "Excellent mix of policy, commercial, and technical discussion in one environment.",
    author: "Attendee, Infrastructure Advisory Group",
  },
  {
    quote:
      "Very strong networking value and a professional delegate audience throughout.",
    author: "Exhibitor, Clean Tech Solutions Provider",
  },
  {
    quote:
      "A credible platform for organisations looking to build visibility in the sector.",
    author: "Sponsor Representative",
  },
  {
    quote:
      "The sessions were relevant, and the conversations outside the sessions were equally valuable.",
    author: "Conference Delegate",
  },
  {
    quote:
      "A strong event for discovering partnership opportunities and market direction.",
    author: "Industry Participant",
  },
];

export default function TestimonialsPage() {
  return (
    <main className="bg-white">
      <section className="relative overflow-hidden border-b border-blue-100 bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-[-120px] top-[-120px] h-[280px] w-[280px] rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute right-[-80px] top-[50px] h-[260px] w-[260px] rounded-full bg-cyan-100/60 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/conference" className="hover:text-blue-600">
              Conference
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-700">Testimonials</span>
          </div>

          <div className="max-w-4xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
              Testimonials
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-slate-900 sm:text-5xl">
              What attendees say about the conference experience
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              Hear from senior attendees, delegates, partners, and industry
              participants who found value in the conversations, visibility,
              networking, and practical market insight the conference delivered.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tickets"
                className="btn-glow rounded-full px-6 py-3 text-sm font-semibold text-white"
              >
                Register Now
              </Link>

              <Link
                href="/conference/why-attend"
                className="btn-outline-glow rounded-full px-6 py-3 text-sm font-semibold text-slate-900"
              >
                Why Attend
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Featured Testimonials
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-slate-900">
            Perspectives from senior and high-value attendees
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            These profile-based testimonials help build credibility by showing
            how respected attendees experienced the event and the kind of value
            they took from it.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {featuredTestimonials.map((item) => (
            <article
              key={item.name}
              className="rounded-[24px] border border-blue-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(37,99,235,0.10)]"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="shrink-0">
                  <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-heading text-xl font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">{item.role}</p>
                      <p className="text-sm font-medium text-blue-600">
                        {item.company}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                      <Quote className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-slate-700">
                    “{item.quote}”
                  </p>

                  <div className="mt-5 flex items-center gap-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              More Attendee Feedback
            </p>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-slate-900">
              Additional comments from delegates and participants
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              A lighter testimonial section for shorter attendee feedback without
              profile cards.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {shortTestimonials.map((item, index) => (
              <article
                key={`${item.author}-${index}`}
                className="rounded-[20px] border border-blue-100 bg-white p-5 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Quote className="h-4 w-4" />
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-700">
                  “{item.quote}”
                </p>

                <div className="mt-4 border-t border-blue-100 pt-4">
                  <p className="text-sm font-medium text-slate-900">
                    {item.author}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        <div className="rounded-[28px] border border-blue-100 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-8 text-white shadow-[0_18px_50px_rgba(37,99,235,0.18)] md:px-10 md:py-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-100">
                Join future attendees
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                Experience the conference for yourself
              </h2>
              <p className="mt-3 text-sm leading-7 text-blue-50 md:text-base">
                Register now and be part of the conversations, partnerships, and
                opportunities shaping the clean energy sector.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tickets"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Register Now
              </Link>
              <Link
                href="/conference/why-attend"
                className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Why Attend
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}