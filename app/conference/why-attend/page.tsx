import Link from "next/link";
import {
  Globe2,
  Sun,
  Handshake,
  Megaphone,
  Camera,
  Landmark,
  Zap,
  FlaskConical,
  BatteryCharging,
  Coins,
  ShieldCheck,
  Users2,
  Building2,
  MapPin,
  CalendarDays,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

export const metadata = {
  title: "Why Attend | Clean Energy Conference Australia Africa",
  description:
    "600 million Africans still lack electricity. See why ministers, financiers and project developers are converging on Kigali and Perth in 2026.",
};

function Eyebrow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[var(--primary)]/8 px-4 py-1.5">
      <Icon className="h-4 w-4 text-[var(--primary)]" strokeWidth={2.25} />
      <span className="text-xs font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
        {label}
      </span>
    </div>
  );
}

const matters = [
  {
    icon: Globe2,
    title: "Global momentum has a destination",
    body: "COP28's pledge to triple renewable capacity by 2030 unlocked climate finance at a scale the continent has never seen. The IEA puts the annual investment emerging economies need at $1.8 trillion — and Africa is the largest slice of that market still waiting to be built.",
  },
  {
    icon: Sun,
    title: "Africa's cost curve has flipped",
    body: "Solar costs have fallen 85% since 2010, making renewables the cheapest new power on the continent. Rwanda, Kenya and South Africa are already writing the policy playbook — what's missing is a room where it gets shared.",
  },
  {
    icon: Handshake,
    title: "Australia brings what Africa needs",
    body: "Deployment expertise, capital markets access and world-leading renewable technology meet Africa's solar resource, growing demand and critical minerals. Rwanda's governance track record makes Kigali the natural table for both sides to sit at.",
  },
];

const objectives = [
  {
    icon: Megaphone,
    title: "Global visibility",
    detail:
      "Financial Times Energy, Bloomberg NEF and African Business Magazine are covering the summit, alongside a digital strategy built to carry the story past the delegates in the room.",
  },
  {
    icon: Camera,
    title: "Proof, not pitch decks",
    detail:
      "Site visits to Nyabarongo and Rusumo hydropower, Rwanda's off-grid solar rollout, and Kigali's green-city planning — case studies delegates can lift and adapt at home.",
  },
  {
    icon: Landmark,
    title: "Deals with a path to close",
    detail:
      "Direct access to AU energy leadership, the World Bank, AfDB and Australia's $2B climate finance commitment — the people who set financing terms, in the same building as the people who need them.",
  },
];

const tracks = [
  {
    icon: Zap,
    name: "Renewable Energy Technologies",
    copy: "Solar, wind and hydro project development, grid integration, and distributed-energy lessons from Australia applied to African conditions.",
  },
  {
    icon: FlaskConical,
    name: "Green Hydrogen Economy",
    copy: "Where Australia's hydrogen export strategy and Africa's renewable resource base start to look like the same supply chain.",
  },
  {
    icon: BatteryCharging,
    name: "Energy Storage Solutions",
    copy: "Batteries and pumped hydro for grids that need to hold a high share of variable renewable power.",
  },
  {
    icon: Coins,
    name: "Climate Finance & ESG",
    copy: "Blended finance, de-risking instruments and the governance frameworks investors are actually asking for.",
  },
  {
    icon: ShieldCheck,
    name: "Climate Resilience",
    copy: "Building generation and transmission that survives the climate it's meant to help fix.",
  },
];

const audience = [
  "Ministers & policymakers",
  "Government officials",
  "Institutional & private investors",
  "Project developers",
  "Multilateral & development finance",
  "Energy & mining executives",
];

const institutions = [
  {
    name: "AAEMI",
    detail:
      "Research, training and technical credibility from Australia's energy and mining sector.",
  },
  {
    name: "Kenya & Australia Chamber of Commerce",
    detail: "Cross-continent stakeholder networks.",
  },
  {
    name: "Rwanda Ministry of Infrastructure",
    detail: "Local knowledge and national policy alignment.",
  },
  {
    name: "Private sector partners",
    detail: "The implementation experience that turns policy into projects.",
  },
];

const stats = [
  { value: "20,000+", label: "Social media audience" },
  { value: "100,000+", label: "Annual website views" },
  { value: "6,000+", label: "Email subscribers" },
  { value: "90%", label: "Visitor satisfaction" },
  { value: "91%", label: "Say it's vital to connect with industry leaders" },
];

export default function WhyAttendPage() {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="hero-section relative overflow-hidden">
        <div
          className="energy-bg energy-bg-2 absolute inset-0 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="hover-glow-soft surface-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-[var(--primary)]">
              <MapPin className="h-4 w-4" strokeWidth={2.25} />
              Kigali Marriott Hotel, Rwanda
              <span className="text-[var(--primary)]/40">·</span>
              <CalendarDays className="h-4 w-4" strokeWidth={2.25} />
              6–7 Aug 2026
            </span>
            <span className="hover-glow-soft surface-card inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-[var(--primary)]">
              <MapPin className="h-4 w-4" strokeWidth={2.25} />
              Novotel Hotel, Perth
              <span className="text-[var(--primary)]/40">·</span>
              <CalendarDays className="h-4 w-4" strokeWidth={2.25} />
              31 Aug–1 Sept 2026
            </span>
          </div>

          <h1 className="font-heading text-[var(--foreground)] max-w-4xl">
            Why Attend
          </h1>
          <p className="max-w-2xl text-muted mt-2">
            600 million Africans still lack electricity, and the continent's
            demand for power is set to triple by 2030. The partnerships that
            get built this year decide whether that demand is met with clean
            power or fossil fuel imports. This is the room where that gets
            decided.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/register"
              className="btn-glow inline-flex items-center gap-2 rounded-full px-7 py-3 text-white font-semibold"
            >
              Register to attend
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <Link
              href="/prospectus"
              className="btn-outline-glow rounded-full px-7 py-3 font-semibold text-[var(--primary)]"
            >
              Download the prospectus
            </Link>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS NOW */}
      <section className="section-tight">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow icon={Globe2} label="The context" />
          <h2 className="font-heading text-[var(--foreground)] mt-4">
            Why this conference matters now
          </h2>
          <p className="text-muted max-w-2xl mt-2">
            Three forces are converging on the same two years — this summit
            is where they get pointed in the same direction.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {matters.map((m) => (
              <div
                key={m.title}
                className="hover-glow-card-strong surface-card-strong rounded-2xl p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                  <m.icon
                    className="h-6 w-6 text-[var(--primary)]"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="font-heading mt-4 text-[var(--foreground)]">
                  {m.title}
                </h3>
                <p className="text-muted mt-3">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section
        className="section-tight relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--primary), var(--primary-dark))",
        }}
      >
        <div
          className="energy-bg absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-luminosity"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-3xl md:text-4xl text-white">
                  {s.value}
                </div>
                <div className="mt-2 text-sm text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="section-tight bg-[var(--surface-muted)]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow icon={ShieldCheck} label="The outcome" />
          <h2 className="font-heading text-[var(--foreground)] mt-4">
            What you leave with
          </h2>
          <p className="text-muted max-w-2xl mt-2">
            Every track ties back to one of three outcomes for delegates.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {objectives.map((o) => (
              <div
                key={o.title}
                className="hover-glow-card surface-card rounded-2xl p-7"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                  <o.icon
                    className="h-6 w-6 text-[var(--primary)]"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="font-heading mt-4 text-[var(--foreground)]">
                  {o.title}
                </h3>
                <p className="text-muted mt-3">{o.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRACKS */}
      <section className="section-tight">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow icon={Zap} label="The agenda" />
          <h2 className="font-heading text-[var(--foreground)] mt-4">
            Five tracks, one agenda
          </h2>
          <p className="text-muted max-w-2xl mt-2">
            Ministerial policy sessions, technical panels, private-sector
            roundtables and site visits run through each theme below.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((t) => (
              <div
                key={t.name}
                className="hover-glow-card surface-card rounded-xl p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                    <t.icon
                      className="h-5 w-5 text-[var(--primary)]"
                      strokeWidth={2}
                    />
                  </div>
                  <h3 className="font-heading text-lg text-[var(--foreground)]">
                    {t.name}
                  </h3>
                </div>
                <p className="text-muted mt-3 text-base">{t.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO YOU'LL MEET */}
      <section className="section-tight bg-[var(--surface-muted)]">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Eyebrow icon={Users2} label="The room" />
          <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-[var(--foreground)]">
                Who's in the room
              </h2>
              <p className="text-muted mt-3">
                The summit is built around policymakers and financiers first
                — the people who set the terms everyone else builds around —
                alongside the developers and operators putting projects on
                the ground.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {audience.map((a) => (
                  <span
                    key={a}
                    className="hover-glow-soft surface-card rounded-full px-4 py-2 text-sm font-medium text-[var(--foreground)]"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="hover-glow-card-strong surface-card-strong rounded-2xl p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary)]/10">
                  <Building2
                    className="h-5 w-5 text-[var(--primary)]"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="font-heading text-[var(--foreground)]">
                  Backed by institutions that open doors
                </h3>
              </div>
              <ul className="mt-5 space-y-4">
                {institutions.map((inst) => (
                  <li key={inst.name} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                    <p className="text-muted">
                      <span className="font-semibold text-[var(--foreground)]">
                        {inst.name} —
                      </span>{" "}
                      {inst.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 text-center"
            style={{
              background:
                "linear-gradient(135deg, var(--primary), var(--primary-dark))",
            }}
          >
            <div
              className="energy-bg absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-luminosity"
              aria-hidden="true"
            />
            <div className="relative">
              <h2 className="font-heading text-white">
                Two cities. One agenda for Africa's energy future.
              </h2>
              <p className="text-white/75 max-w-xl mx-auto mt-3">
                Seats for the ministerial sessions and roundtables are
                limited. Register now to secure your place in Kigali or
                Perth.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 font-semibold bg-white text-[var(--primary)] hover:-translate-y-0.5 transition-transform"
                >
                  Register to attend
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/contact"
                  className="rounded-full px-7 py-3 font-semibold border border-white/40 text-white hover:-translate-y-0.5 transition-transform"
                >
                  Talk to the team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}