"use client";

import Image from "next/image";
import Link from "next/link";
import { Quote, Star, ArrowRight } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Angela Mbeki",
    role: "Director, Sustainable Infrastructure Forum",
    company: "SIF Global",
    image: "/images/testimonials/testimonial-1.jpg",
    quote:
      "The conference created a rare environment where policy, investment, and implementation conversations all happened in one place.",
  },
  {
    name: "Michael Oduor",
    role: "Managing Partner",
    company: "EastGrid Capital",
    image: "/images/testimonials/testimonial-2.jpg",
    quote:
      "We connected directly with decision-makers and explored serious partnership opportunities within a very short time.",
  },
  {
    name: "Claire Bennett",
    role: "Head of Energy Transition",
    company: "BlueArc Advisory",
    image: "/images/testimonials/testimonial-3.jpg",
    quote:
      "Highly relevant programme with strong networking and real value for professionals in the sector.",
  },
];

export function TestimonialsPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:py-16">
        {/* HEADER */}
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
            Testimonials
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-[color:var(--text-main)]-900">
            What attendees say about the conference
          </h2>
          <p className="mt-4 text-base leading-8 text-[color:var(--text-main)]-600">
            Feedback from senior delegates, investors, and industry professionals who have participated in previous editions.
          </p>
        </div>

        {/* CARDS */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.name}
              className="hover-glow-card rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_12px_34px_rgba(15,23,42,0.06)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Quote className="h-4 w-4" />
                </div>
              </div>

              <p className="mt-5 text-sm leading-7 text-[color:var(--text-main)]-700">
                “{item.quote}”
              </p>

              <div className="mt-5">
                <p className="font-medium text-[color:var(--text-main)]-900">{item.name}</p>
                <p className="text-sm text-[color:var(--text-main)]-600">{item.role}</p>
                <p className="text-sm font-medium text-blue-600">
                  {item.company}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-amber-500">
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/conference/testimonials"
            className="btn-outline-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-[color:var(--text-main)]-900"
          >
            View all testimonials
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}