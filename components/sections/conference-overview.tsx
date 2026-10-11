/* =======================================================================
   CONFERENCE OVERVIEW: UPDATES FROM THE 2027 CONCEPT NOTE + EXHIBITION PAGE
   Paste the constants below the existing EDITIONS_2027 block, replace
   CONVERGENCE_STATS with the one here, then paste each JSX section into
   ConferenceOverview() where indicated. Uses the existing SectionKicker,
   STAT_COLORS, Link and ArrowRight already in the file. No sponsorship
   content is included (that lives on the Become a Sponsor page).
   ======================================================================= */

/* ───────── 1. REPLACE the existing CONVERGENCE_STATS ───────── */

const CONVERGENCE_STATS = [
  { value: "60%", label: "of the world's best solar resources are in Africa" },
  { value: "USD 200–240B", label: "Africa's required annual clean-energy investment by 2030 (IEA)" },
  { value: "~2–3%", label: "of global clean-energy investment goes to Africa, despite 20% of the world's population (IEA)" },
  { value: "30%+", label: "of global green-tech critical minerals are held by Africa (East Asia Forum)" },
  { value: "~170", label: "ASX-listed companies operate across about 35 African countries, mostly in mining (Australian Mining Review, March 2026)" },
  { value: "~A$60B", label: "Australia's mining investment in Africa (DFAT, 2024)" },
];

/* ───────── 2. ADD these new constants ───────── */

// Why attend: every reason maps to something the programme actually delivers.
const WHY_ATTEND = [
  {
    title: "Be in the room with the people who decide",
    body: "Ministers, regulators, development-finance institutions, investors and project owners from Africa and Australia, in structured meetings rather than corridor chance.",
  },
  {
    title: "See qualified projects, not pitches",
    body: "Every project in the Project Showcase uses a standard template and has been screened. Project Clinics add technical and financial review, and each project leaves with a Readiness Note.",
  },
  {
    title: "Meet by appointment",
    body: "Investor and partner meetings are pre-booked through the pipeline register, so your time goes to the conversations that can move a project toward financial close.",
  },
  {
    title: "Two cities, one pipeline, real follow-through",
    body: "Kigali prepares the opportunity and Perth mobilises capital and delivery. Progress is tracked at 30, 90 and 180 days, and partnerships are announced only when every party has confirmed in writing.",
  },
  {
    title: "Act on a corridor that is already moving",
    body: "About 170 ASX-listed companies operate across roughly 35 African countries and Australian mining investment in Africa is about A$60B. The opening now is energy, processing and grid infrastructure.",
  },
  {
    title: "Shape the rules that unlock investment",
    body: "Closed regulatory working sessions put permits, market rules and barriers on the table. The output is a barrier log that feeds the next edition.",
  },
  {
    title: "Build the skills behind delivery",
    body: "Skills gaps are identified project by project and answered with institutional pairings, grid-operator training and metallurgy and processing courses.",
  },
];

const CONFERENCE_OBJECTIVES = [
  { title: "Showcase viable clean-energy opportunities", body: "A platform for governments and developers to present bankable solar, wind, geothermal and green hydrogen projects to local and international investors." },
  { title: "Advance sustainable and responsible development", body: "ESG practices that make energy projects benefit local communities, support regional grid stability and align with Africa's climate-resilience and net-zero goals." },
  { title: "Facilitate direct investor engagement", body: "Investors engage regulators, developers and industry stakeholders through structured networking and deal-making sessions to accelerate project financing." },
  { title: "Promote local manufacturing and regional value chains", body: "Investment in local manufacturing of renewable components, e-mobility and storage, using AfCFTA frameworks to grow jobs and cut reliance on energy imports." },
  { title: "Strengthen strategic partnerships", body: "Aligning national energy priorities with development partners, financial institutions and the private sector to mobilise capital, technology and expertise." },
  { title: "Facilitate knowledge exchange and innovation", body: "Best practice on cross-border grid integration, regional energy pooling, digitalisation and policy harmonisation." },
];

const ATTENDEE_GROUPS = [
  { title: "Government & policy leaders", body: "Ministries, regulators and agencies across Rwanda, Kenya and Australia shaping energy, mining, trade and investment policy." },
  { title: "Energy & minerals executives", body: "C-suite leadership across renewables, oil and gas, mining and critical minerals." },
  { title: "Technology & service providers", body: "Grid, storage, renewable and mining-technology firms, plus banks, law firms and advisers seeking named-project introductions." },
  { title: "Investors, DFIs & project developers", body: "Development-finance institutions, private capital and developers moving screened projects toward financial close." },
  { title: "Technical & project delivery teams", body: "Engineers, project managers and specialists building the value chain from mine to megawatt." },
  { title: "Academic & research partners", body: "Universities and training institutions in Africa and Australia supporting the skills and research behind delivery." },
];

const DIPLOMACY = [
  { title: "Australia partnership", body: "Deepen bilateral energy cooperation through technology transfer, capacity building and joint project development, including access to concessional finance under Australia's $2 billion International Climate Finance commitment." },
  { title: "African Union integration", body: "Support AU energy initiatives such as the Continental Power System Master Plan and the African Single Electricity Market, and position Rwanda as a clean-energy hub." },
  { title: "Development finance leverage", body: "Engage the World Bank, AfDB and other multilateral banks on blended finance, risk mitigation and other instruments that speed renewable deployment." },
];

const ORGANISERS = [
  "Kenya's Ministry of Energy & Petroleum",
  "Rwanda's Ministry of Infrastructure",
  "Kenya-Australia Chamber of Commerce",
  "AAEMI",
  "KRATOS Energy",
  "Caleb Partners International",
];

/* ───────── 3. ADD this as the FIRST section inside ConferenceOverview's wrapper <div>,
   directly above SECTION 1 (the hero). Because it now sits at the very top, it carries
   the nav clearance (pt-28). Then change the hero <section> padding from
   "pb-16 pt-20 sm:pb-20 sm:pt-24" to "pb-16 pt-16 sm:pb-20 sm:pt-20". ───────── */

/*
<section className="relative overflow-hidden bg-[#020266] pb-16 pt-28 text-white sm:pb-24 sm:pt-32">
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,153,102,0.35),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(242,203,1,0.18),transparent_40%)]" />
  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#F2CB01]">
      <span className="h-px w-10 bg-[#F2CB01]" />
      Kigali 25–28 May 2027 · Perth 30 Aug – 2 Sep 2027
    </p>

    <h2 className="mt-6 max-w-5xl text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]">
      Why attend <span className="text-[#F2CB01]">CEAA 2027</span>
    </h2>
    <p className="mt-6 max-w-3xl text-xl leading-9 text-white/85 sm:text-2xl sm:leading-10">
      The opportunity is real. This is where it gets moved to capital.
    </p>
    <p className="mt-4 max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
      CEAA is the Africa–Australia platform that moves clean-energy and critical-mineral projects from
      opportunity to capital. Attend to meet the right people, see projects that are ready, and leave
      with introductions that are followed through.
    </p>

    <div className="mt-8 flex flex-wrap gap-4">
      <Link href="/conference" className="inline-flex items-center gap-2 rounded-full bg-[#F2CB01] px-7 py-3.5 text-base font-bold text-[#020266] transition hover:scale-[1.03]">
        Explore the conference <ArrowRight className="h-4 w-4" />
      </Link>
      <Link href="/event/exhibition" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-[#020266]">
        Exhibit at CEAA 2027
      </Link>
    </div>

    <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 sm:grid-cols-3">
      {[
        ["~170", "ASX-listed companies across about 35 African countries"],
        ["~A$60B", "Australian mining investment in Africa (DFAT, 2024)"],
        ["USD 200–240B", "Africa's annual clean-energy investment need by 2030 (IEA)"],
      ].map(([v, l]) => (
        <div key={v} className="bg-[#020266] p-6">
          <dt className="text-3xl font-extrabold text-[#F2CB01] sm:text-4xl">{v}</dt>
          <dd className="mt-1 text-sm leading-6 text-white/75">{l}</dd>
        </div>
      ))}
    </dl>

    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {WHY_ATTEND.map((w, i) => (
        <div
          key={w.title}
          className={`rounded-[24px] border border-white/15 bg-white/5 p-6 ${i === 0 ? "lg:col-span-2" : ""}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F2CB01] text-sm font-bold text-[#020266]">{i + 1}</span>
          <h3 className="mt-4 text-xl font-semibold">{w.title}</h3>
          <p className="mt-2 text-sm leading-6 text-white/80 sm:text-base sm:leading-7">{w.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>
*/

/* ───────── 4. ADD after "Why now" (SECTION 3): conference objectives ───────── */

/*
<section className="border-t border-zinc-200 bg-white py-16 sm:py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <SectionKicker index="04" label="Objectives" heading="What the conference is built to achieve" accent="#009966" />
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {CONFERENCE_OBJECTIVES.map((o, i) => (
        <div key={o.title} className="rounded-[24px] border border-zinc-200 p-6 shadow-sm">
          <p className="text-3xl font-bold" style={{ color: STAT_COLORS[i % STAT_COLORS.length] }}>{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-950">{o.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{o.body}</p>
        </div>
      ))}
    </div>
  </div>
</section>
*/

/* ───────── 5. ADD before the News section: who you'll meet + diplomacy + organisers ───────── */

/*
<section className="border-t border-[#020266]/10 bg-[#F5F6FB] py-16 sm:py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <SectionKicker
      index="08"
      label="Who you'll meet"
      heading="The people who move projects from proposal to delivery"
      intro="Across the mining, energy and infrastructure value chain, at both editions."
      accent="#020266"
    />
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {ATTENDEE_GROUPS.map((g) => (
        <div key={g.title} className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#020266]">{g.title}</h3>
          <p className="mt-2 text-sm leading-6 text-zinc-700">{g.body}</p>
        </div>
      ))}
    </div>

    <h3 className="mt-16 text-2xl font-semibold text-zinc-950">Economic diplomacy and strategic partnerships</h3>
    <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-700">
      A strategic economic-diplomacy initiative that uses Rwanda's convening power to bring ministers,
      ambassadors and senior officials from Africa and Australia together. Energy partnerships formed here can
      grow into wider cooperation on trade, investment, technology transfer and knowledge exchange.
    </p>
    <div className="mt-8 grid gap-5 md:grid-cols-3">
      {DIPLOMACY.map((d) => (
        <div key={d.title} className="rounded-[24px] bg-white p-6 shadow-sm">
          <h4 className="text-lg font-semibold text-zinc-950">{d.title}</h4>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{d.body}</p>
        </div>
      ))}
    </div>

    <p className="mt-14 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">Strategic organisers &amp; partners</p>
    <div className="mt-4 flex flex-wrap gap-3">
      {ORGANISERS.map((o) => (
        <span key={o} className="rounded-full border border-[#020266]/20 bg-white px-4 py-2 text-sm font-medium text-[#020266]">{o}</span>
      ))}
    </div>
  </div>
</section>
*/

/* ───────── 6. SMALL EDITS to existing code ─────────
   a) "Why now" SectionKicker intro: keep as is, then add after the first
      paragraph: "Australia's renewables already account for more than 42.7%
      of national electricity generation."
   b) Renumber the later kickers so the order reads:
      Why attend (top, unnumbered), hero, 02 In focus, 03 Why now,
      04 Objectives, 05 Fit, 06 Deal room, 07 Pillars, 08 Who you'll meet
      (already set), 09 Latest insights, 10 2027 editions.
   c) Section 2 "In focus" has heading="" which renders an empty <h2>;
      give it a heading such as "The sectors driving the agenda".
   d) Hero secondary CTA: add { href: "/event/exhibition", label: "Exhibit" }
      if you want a direct exhibitor path from the overview.
*/