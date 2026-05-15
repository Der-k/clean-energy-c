"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock3, MapPin } from "lucide-react";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
  isPast: boolean;
};

type EventItem = {
  name: string;
  location: string;
  venue: string;
  dateLabel: string;
  startsAt: string;
  accent: "blue" | "green";
};

const events: EventItem[] = [
  {
    name: "Kigali Edition",
    location: "Kigali, Rwanda",
    venue: "Kigali Marriott Hotel",
    dateLabel: "6–7 August 2026",
    startsAt: "2026-08-06T08:00:00+02:00",
    accent: "blue",
  },
  {
    name: "Perth Edition",
    location: "Perth, Western Australia",
    venue: "Novotel Hotel Perth",
    dateLabel: "31 Aug – 1 Sept 2026",
    startsAt: "2026-08-31T08:00:00+08:00",
    accent: "green",
  },
];

function getCountdown(targetDate: string): CountdownParts {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const difference = target - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLive: false,
      isPast: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isLive: false,
    isPast: false,
  };
}

function TimeCard({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent: "blue" | "green";
}) {
  const accentClasses =
    accent === "blue"
      ? "border-blue-200 bg-blue-50 text-[#003994]"
      : "border-emerald-200 bg-emerald-50 text-[#009966]";

  return (
    <div
      className={`rounded-2xl border px-4 py-5 text-center shadow-sm ${accentClasses}`}
    >
      <div className="text-3xl font-semibold sm:text-4xl">
        {String(value).padStart(2, "0")}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-600">
        {label}
      </div>
    </div>
  );
}

function EventCountdownCard({ event }: { event: EventItem }) {
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdown(event.startsAt)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown(event.startsAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [event.startsAt]);

  const isBlue = event.accent === "blue";

  return (
    <div
      className={`rounded-[28px] border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.2)] sm:p-8 ${
        isBlue ? "border-blue-100" : "border-emerald-100"
      }`}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p
            className={`text-base font-semibold uppercase tracking-[0.18em] ${
              isBlue ? "text-[#003994]" : "text-[#009966]"
            }`}
          >
            Countdown to event
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-zinc-950 sm:text-3xl">
            {event.name}
          </h3>
        </div>

        <div
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
            isBlue
              ? "bg-blue-50 text-[#003994]"
              : "bg-emerald-50 text-[#009966]"
          }`}
        >
          {countdown.isPast ? "Event date passed" : "Upcoming"}
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        <TimeCard value={countdown.days} label="Days" accent={event.accent} />
        <TimeCard value={countdown.hours} label="Hours" accent={event.accent} />
        <TimeCard
          value={countdown.minutes}
          label="Minutes"
          accent={event.accent}
        />
        <TimeCard
          value={countdown.seconds}
          label="Seconds"
          accent={event.accent}
        />
      </div>

      <div className="mt-6 space-y-3 text-base text-zinc-600">
        <div className="flex items-center gap-3">
          <CalendarDays className="h-4 w-4 text-zinc-400" />
          <span>{event.dateLabel}</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="h-4 w-4 text-zinc-400" />
          <span>
            {event.venue}, {event.location}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Clock3 className="h-4 w-4 text-zinc-400" />
          <span>Countdown updates in real time</span>
        </div>
      </div>
    </div>
  );
}

export function EventCountdown() {
  return (
    <section className="relative overflow-hidden bg-[#020266] py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,153,102,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_32%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Event Countdown
          </div>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Countdown to Kigali and Perth 2026
          </h2>
          <p className="mt-5 text-base leading-8 text-white/70 sm:text-xl
">
            Join the next editions of The Clean Energy Conference & Exhibition
            as Africa and Australia connect around renewable energy, critical
            minerals, innovation, investment, and sustainable infrastructure.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {events.map((event) => (
            <EventCountdownCard key={event.name} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}