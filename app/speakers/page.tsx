"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, CalendarDays, MapPin, X, Quote, Sparkles } from "lucide-react";
import { SectionShell } from "@/components/layout/section-shell";

type EditionKey = "Kigali" | "perth";

type Speaker = {
  name: string;
  role: string;
  organization: string;
  image: string;
  bio?: string;
};

type SpeakerGroup = {
  label: string;
  speakers: Speaker[];
};

// ─── Color system ───────────────────────────────────────────────────────────
// Kigali = blue (grid / East African power infrastructure)
// Perth  = emerald (green hydrogen / critical minerals)
// A blue→emerald gradient is used as a recurring "bridge" motif tying the
// two editions together, independent of which tab is active.

const ACCENTS: Record<
  EditionKey,
  { primary: string; dark: string; soft: string; ring: string }
> = {
  Kigali: {
    primary: "#1d4ed8", // blue-700
    dark: "#1e3a8a", // blue-900
    soft: "rgba(29, 78, 216, 0.09)",
    ring: "rgba(29, 78, 216, 0.35)",
  },
  perth: {
    primary: "#059669", // emerald-600
    dark: "#065f46", // emerald-800
    soft: "rgba(5, 150, 105, 0.09)",
    ring: "rgba(5, 150, 105, 0.35)",
  },
};

const BRIDGE_GRADIENT = "linear-gradient(90deg, #1d4ed8 0%, #059669 100%)";

// ─── Speaker Bio Modal ────────────────────────────────────────────────────────

function SpeakerModal({
  speaker,
  onClose,
}: {
  speaker: Speaker;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setMounted(false);
    // let the exit transition play before unmounting
    setTimeout(onClose, 180);
  };

  const paragraphs = speaker.bio ? speaker.bio.split(/\n\n/) : [];
  const wordCount = speaker.bio ? speaker.bio.trim().split(/\s+/).length : 0;
  const readMins = Math.max(1, Math.round(wordCount / 200));

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
      onClick={handleClose}
      style={{
        backgroundColor: mounted ? "rgba(2,2,20,0.75)" : "rgba(2,2,20,0)",
        backdropFilter: mounted ? "blur(8px)" : "blur(0px)",
        transition: "background-color 220ms ease-out, backdrop-filter 220ms ease-out",
      }}
    >
      <div
        className="relative flex w-full max-w-[1080px] flex-col overflow-hidden rounded-t-[32px] bg-white shadow-[0_50px_140px_rgba(2,2,50,0.55)] sm:max-h-[92vh] sm:rounded-[32px] lg:h-[88vh] lg:max-h-[820px] lg:flex-row"
        onClick={(e) => e.stopPropagation()}
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(28px) scale(0.96)",
          transition: "opacity 240ms ease-out, transform 240ms ease-out",
        }}
      >
        {/* ── Editorial photo panel — stays put while the bio scrolls ── */}
        <div
          className="relative h-72 w-full shrink-0 sm:h-96 lg:h-full lg:w-[40%]"
          style={{ backgroundColor: "var(--accent-soft)" }}
        >
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(2,2,50,0.45) 0%, rgba(2,2,50,0.02) 32%, rgba(2,2,50,0.05) 55%, var(--accent-dark) 100%)",
            }}
          />
          {/* decorative glow, echoes the bridge motif inside the photo panel */}
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
            style={{ background: BRIDGE_GRADIENT }}
          />

          {/* Close */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Name block, pinned to the base of the photo panel */}
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-9">
            <span
              className="inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: "rgba(255,255,255,0.18)", backdropFilter: "blur(6px)" }}
            >
              {speaker.organization}
            </span>
            <h3 className="font-heading mt-4 text-4xl font-extrabold leading-[1.04] tracking-[-0.02em] text-white sm:text-[2.75rem] lg:text-4xl xl:text-[2.75rem]">
              {speaker.name}
            </h3>
            <p className="mt-3 max-w-md text-[16px] leading-7 text-white/85">{speaker.role}</p>
          </div>
        </div>

        {/* Vertical bridge bar between panels on desktop */}
        <div className="hidden w-[5px] shrink-0 lg:block" style={{ background: BRIDGE_GRADIENT }} />
        {/* Horizontal bridge bar on mobile/tablet stacked layout */}
        <div className="h-[5px] w-full shrink-0 lg:hidden" style={{ background: BRIDGE_GRADIENT }} />

        {/* ── Bio panel ── */}
        <div className="relative flex-1 overflow-y-auto no-scrollbar" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; width: 0; height: 0; }`}</style>
          <div className="mx-auto max-w-2xl px-7 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            {paragraphs.length > 0 ? (
              <>
                {/* Byline / metadata strip */}
                <div className="mb-7 flex flex-wrap items-center gap-3 border-b border-gray-100 pb-6">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest"
                    style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
                  >
                    <Sparkles className="h-3 w-3" />
                    Full Biography
                  </span>
                  <span className="text-[13px] font-medium text-gray-400">
                    {readMins} min read
                  </span>
                </div>

                <div className="relative">
                  <Quote
                    className="pointer-events-none absolute -left-2 -top-8 h-20 w-20 sm:-left-4 sm:h-28 sm:w-28"
                    style={{ color: "var(--accent-soft)" }}
                  />
                  <div className="relative space-y-5">
                    {paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className={
                          i === 0
                            ? "text-[21px] font-medium leading-[1.65] text-gray-800"
                            : "text-[17px] leading-[1.9] text-gray-600"
                        }
                      >
                        {i === 0 && (
                          <span
                            aria-hidden
                            className="float-left mr-1 font-heading text-[4.2rem] font-extrabold leading-[0.8]"
                            style={{ color: "var(--accent)" }}
                          >
                            {para.charAt(0)}
                          </span>
                        )}
                        {(i === 0 ? para.slice(1) : para).replace(/\n/g, " ")}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-base italic text-gray-400">
                Full biography coming soon.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Speaker Card ─────────────────────────────────────────────────────────────

// Every other card leans emerald instead of the edition accent — keeps the
// grid from reading as one flat color field and gives each profile its own
// identity beyond just "next in the list".
const STRIPE_COLORS = ["var(--accent)", "#059669", "var(--accent)", "#1d4ed8"];

function SpeakerCard({ speaker, index = 0 }: { speaker: Speaker; index?: number }) {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const hasBio = Boolean(speaker.bio);
  const stripe = STRIPE_COLORS[index % STRIPE_COLORS.length];
  // Alternate which side the preview opens on so it doesn't consistently
  // run off the edge of the grid for cards in the rightmost column.
  const openLeft = index % 2 === 1;

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => hasBio && setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <article
          onClick={() => hasBio && setOpen(true)}
          className={`group relative overflow-hidden rounded-[28px] border-2 bg-white shadow-md transition-all duration-300
            ${hasBio ? "cursor-pointer hover:-translate-y-2.5 hover:shadow-[0_32px_70px_-12px_var(--accent-ring)]" : ""}`}
          style={{
            borderColor: hasBio ? "var(--accent-soft)" : "rgba(2,2,110,0.1)",
          }}
        >
          {/* Identity stripe — alternates blue/emerald so neighboring cards
              read as distinct even before you notice the photo */}
          <div className="h-[6px] w-full" style={{ backgroundColor: stripe }} />

          {/* Image */}
          <div className="relative aspect-[4/4.6] w-full overflow-hidden" style={{ backgroundColor: "var(--accent-soft)" }}>
            <Image
              src={speaker.image}
              alt={speaker.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-[1.05]"
            />
          </div>

          {/* Info */}
          <div className="p-7">
            {hasBio && (
              <span
                className="mb-3 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
              >
                Full Bio
              </span>
            )}
            <h3 className="font-heading text-xl font-bold leading-tight text-gray-900">
              {speaker.name}
            </h3>
            <p className="mt-2 text-[15px] leading-6 text-gray-500">{speaker.role}</p>
            <p className="mt-1.5 text-[15px] font-semibold" style={{ color: "var(--accent)" }}>
              {speaker.organization}
            </p>
          </div>

          {/* Bridge-gradient underline: always blue → emerald, regardless of edition */}
          {hasBio && (
            <div
              className="absolute bottom-0 left-0 h-[4px] w-0 transition-all duration-300 group-hover:w-full"
              style={{ background: BRIDGE_GRADIENT }}
            />
          )}
        </article>

        {/* Preview panel — fixed position off to the side of the card, so the
            photo stays fully visible and nothing moves while you hover */}
        {hasBio && (
          <div
            className={`pointer-events-none absolute top-8 z-30 w-72 rounded-2xl p-5 shadow-[0_24px_54px_rgba(2,2,110,0.4)] transition-[opacity,transform] duration-200 ease-out
              ${openLeft ? "right-full mr-4" : "left-full ml-4"}`}
            style={{
              transform: `translateX(${hovering ? "0" : openLeft ? "8px" : "-8px"})`,
              opacity: hovering ? 1 : 0,
              background: `linear-gradient(160deg, var(--accent) 0%, var(--accent-dark) 100%)`,
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/65">
              {speaker.organization}
            </p>
            <p className="mt-1 font-heading text-base font-bold leading-tight text-white">
              {speaker.name}
            </p>
            <p className="mt-2 text-[13px] leading-[1.55] text-white/85 line-clamp-5">
              {speaker.bio}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/70">
              Click for full bio →
            </span>
          </div>
        )}
      </div>

      {open && <SpeakerModal speaker={speaker} onClose={() => setOpen(false)} />}
    </>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const editions: Record<
  EditionKey,
  {
    label: string;
    date: string;
    location: string;
    intro: string;
    groups: SpeakerGroup[];
  }
> = {
  Kigali: {
    label: "Kigali Edition",
    date: "6–7 August 2026",
    location: "Kigali Marriott Hotel, Rwanda",
    intro:
      "The Kigali speaker programme is aligned to East Africa's energy transition, regional integration, climate finance, decentralized systems, clean mobility, and green industrialization.",
    groups: [
      {
        label: "Keynote Speakers",
        speakers: [
          {
            name: "Hon. Opiyo Wandayi",
            role: "Cabinet Secretary, Ministry of Petroleum and Energy",
            organization: "Government of Kenya",
            image: "/images/speakers/opiyo-wandayi.jpg",
            bio: "The Hon. James Opiyo Wandayi, EGH, is the Cabinet Secretary for Energy and Petroleum. Prior to joining elective politics, Mr. Wandayi had acquired extensive experience in strategic and operational management, and people leadership within a multinational business environment.",
          },

          {
            name: "Hon. Dr. Deborah Mulongo",
            role: "Cabinet Secretary, Ministry of Environment, Climate Change & Forestry",
            organization: "Government of Kenya",
            image: "/images/speakers/deborah-mulongo.jpg",
          },

          {
            name: "Rev. Dr. CPA CS Patrick Omutia, CBS",
            role: "Special Secretary Productivity, Office of the President",
            organization: "Government of Kenya",
            image: "/images/speakers/patrick-omutia.png",
            bio: "Rev. Dr. Omutia drives national productivity initiatives in the Office of Chief of Staff and Head of the Public Service, by developing and implementing strategies, programs, and mechanisms to enhance efficiency across the public sector, ensuring alignment with Kenya's broader public service reforms and performance goals and the BETA agenda.",
          },
          {
            name: "Umutoniwase Anitha",
            role: "Founder and CEO",
            organization: "EcoGreen Solutions Ltd",
            image: "/images/speakers/umutoniwase-anitha.jpeg",
            bio: "Umutoniwase Anitha is the Founder and CEO of EcoGreen Solutions Ltd, a Rwandan renewable energy company providing clean cooking technologies, including LPG systems, improved cookstoves, and biomass pellets. She is an experienced Project and Human Resource Manager, holding an MBA in Project Management, with over ten years of professional experience implementing peacebuilding and social justice initiatives.\n\nDriven by a strong commitment to climate action and human rights, Anitha founded EcoGreen Solutions Ltd to address the urgent need for clean, efficient, safe, and affordable cooking solutions for households across Rwanda. Through a market-based approach, she is contributing to reducing harmful emissions across the region.",
          },
          {
            name: "Tonny Mutuku",
            role: "Chief Executive Director",
            organization: "Rockwill Green Energy East Africa Ltd.",
            image: "/images/speakers/tonny-mutuku.jpg",
            bio: "Tonny Mutuku is the Chief Executive Director of Rockwill Green Energy East Africa Ltd., one of East Africa's leading Engineering, Procurement and Construction (EPC) companies specializing in commercial and industrial solar energy systems. Under his leadership, the company has grown into a major player in the region's renewable energy sector, delivering innovative clean energy solutions for businesses and industries while successfully securing a USD 15 million project revolving fund to accelerate large-scale solar deployment.\n\nTonny holds a Bachelor of Science in Clinical Biochemistry from Kenyatta University and has advanced training in Renewable Energy, specializing in Solar and Hydrogen technologies from the University of Western Europe, Germany. His multidisciplinary background combines scientific expertise with practical leadership in renewable energy engineering and project development.\n\nIn recognition of his outstanding contribution to the clean energy sector, Tonny was named the Future Energy Leader Under 40 Years 2026 by Firstview Intelligent Business Group and SolarQuarter. At just 37 years of age, he continues to champion the adoption of sustainable energy technologies, driving innovation, expanding access to commercial and industrial solar solutions, and supporting Africa's transition to a low-carbon, energy-secure future.",
          },
          {
            name: "Elison Karuhanga",
            role: "Partner",
            organization: "Kampala Associated Advocates",
            image: "/images/speakers/elison-karuhanga.jpg",
          },
          {
            name: "Jason Paul Brewer",
            role: "Chief Executive Officer",
            organization: "Marula Mining Plc",
            image: "/images/speakers/jason-brewer.jpg",
            bio: "Highly qualified mining engineer with an Honors Master's degree from Imperial College, London. Holds extensive experience in global mining, particularly in the UK, Australia, Canada, and South Africa. Formerly associated with major investment banks, specializing in financing mining projects, notably in Africa.\n\nFounder of Gathoni Muchai Investments, actively engaged in the mining and metals sector. Currently CEO of Marula Mining Plc, a London-listed company focusing on battery metals, lithium production, and copper and graphite projects.",
          },
          {
            name: "Dr. Eng. John M. Mativo",
            role: "Executive Director",
            organization: "Laser Infrastructure & Technology Solutions (LITES)",
            image: "/images/speakers/john-mativo.jpg",
            bio: "Dr. Eng. John M. Mativo currently works as the Executive Director of the Laser Infrastructure and Technology Solutions company (LITES), a subsidiary of CPF Group focusing on Infrastructure and ICT solutions.\n\nJohn is a Consulting Engineer with the Engineers Board of Kenya (EBK), a Fellow of the Institution of Engineers of Kenya (IEK) and a Certified Public Private Partnership Professional (CP3P). He has more than thirty (30) years of cumulative working and consulting experience in both public and private sectors in Kenya.\n\nEng. Mativo previously worked for the Kenya Electricity Transmission Company, rising from General Manager, Technical Services to Managing Director. During that period, he led the planning and construction of high voltage transmission infrastructure, increasing the national grid by 6,000km of transmission lines and 76 substations resulting in additional 6,400MWA transformation capacity.\n\nDr. Mativo finalized the commercial closure of seven transmission infrastructure projects valued at US$ 1 billion.",
          },
          {
            name: "Mr. Paulin Mburano",
            role: "Founder and Managing Director",
            organization: "Waste Power Plant Limited",
            image: "/images/speakers/paulin-mburano.png",
          },
          {
            name: "Jacktone Mboya",
            role: "Chief Executive Officer",
            organization: "Hung Pump Kenya",
            image: "/images/speakers/jacktone-mboya.jpg",
            bio: "Jacktone is the Chief Executive Officer of Hung Pump Kenya, a pioneering agroforestry firm established in 2017 that transforms climate action into high-yield commercial opportunities. He holds a Bachelor's degree in Marketing, is a Chartered Marketer, and is currently pursuing his Master's degree in Sustainable Development Studies.\n\nUnder his leadership, the firm designs and manages large-scale, nature-based projects integrating agriculture, forestry, and technology to mitigate climate change while driving rural economic growth. With deep expertise in the restoration economy, Jacktone specializes in unlocking the financial viability of regenerative value chains.\n\nAt the Africa-Australia Clean Energy Conference 2026, Jacktone highlights how nature-based solutions and Carbon Capture, Utilization, and Storage (CCUS) serve as vital mechanisms for the mining and energy sectors to offset hard-to-abate emissions and secure social license to operate. His insights provide global energy and extraction leaders with actionable frameworks for integrating carbon trade markets, agroforestry, and landscape restoration into their ESG strategies—ensuring a just, inclusive, and profitable transition to net-zero.",
          },
  {
  name: "Jean Pierre Muhire",
  role: "Chief Executive Officer",
  organization: "RENERG (Renewable Energy Rwanda) Ltd",
  image: "/images/speakers/jean-pierre-muhire.jpg",
  bio: "Jean Pierre Muhire is the Chief Executive Officer and Founder of RENERG (Renewable Energy Rwanda) Ltd, a renewable energy engineering company established in 2012 to provide affordable, clean, and reliable energy solutions that improve livelihoods while promoting environmental sustainability. Under his leadership, RENERG has grown into one of Rwanda's leading solar engineering companies, delivering innovative renewable energy solutions for residential, commercial, industrial, agricultural, and institutional clients across Africa.\n\nRENERG specializes in the design, engineering, supply, installation, and maintenance of photovoltaic (PV) solar systems. The company delivers both grid-connected and off-grid solutions, including rooftop solar installations, commercial and industrial solar power plants, solar backup systems, automated green buildings, solar street lighting, solar home systems, solar-powered cooling and heating, water pumping systems, and solar irrigation solutions. The company also provides renewable energy consultancy, system design, project implementation, and imports high-quality solar equipment.\n\nUnder Jean Pierre's leadership, RENERG has successfully completed numerous landmark renewable energy projects across the region. These include a 25 kW solar power installation at Ma Campagne Resort Hotel in Rwanda, a 75 kW solar-powered water pumping system in Kirehe District, Rwanda, a 15 kW solar installation for LNDS Burundi, and multiple solar power systems for hospitality and institutional facilities in Malawi. The company continues to deliver clean energy projects for NGOs, churches, hotels, healthcare facilities, private investors, businesses, and households throughout Africa.\n\nJean Pierre is passionate about expanding access to sustainable energy through innovative engineering solutions that reduce energy costs, improve energy security, and accelerate Africa's clean energy transition. His areas of expertise include commercial and industrial solar systems, agrivoltaics, solar irrigation, renewable energy engineering, and integrated energy solutions that support sustainable agriculture, climate resilience, and economic development across the continent."
},

          {
            name: "Munyemana Jean Pierre",
            role: "Chief Executive Officer",
            organization: "Egera Umuhinzi Initiative",
            image: "/images/speakers/munyemana-jean-pierre.jpg",
            bio: "Jean Pierre Munyemana is an agronomist and the founder of Egera Umuhinzi Initiative, a platform bridging agricultural research, policy, and on-the-ground farmer adoption in Rwanda. He is also the Managing Director of SMARTFARM Solutions Ltd, where he leads the deployment of practical, climate-smart agricultural solutions aimed at improving productivity and resilience for smallholder farmers.\n\nWith experience spanning regenerative agriculture, agroforestry, and farmer extension, Jean Pierre has worked with institutions including MINAGRI and RAB to translate policy into actionable practices at scale. His work focuses on integrating agriculture and energy systems through circular economy models, converting agricultural waste into organic fertilizers and biogas to reduce costs and improve sustainability for farmers.\n\nThrough his leadership, he continues to champion innovative approaches that strengthen food security, environmental stewardship, and rural economic development across Rwanda and the wider region.",
          },
          {
            name: "Professor George Kimathi",
            role: "Professor of Applied Mathematics and Higher Education Leader",
            organization: "To be confirmed",
            image: "/images/speakers/george-kimathi.jpg",
            bio: "Professor George Kimathi is a distinguished academic, researcher, and higher education leader with extensive experience in teaching, research, university administration, and institutional governance. He holds a Doctor of Philosophy (PhD) in Applied Mathematics and a Master of Science in Applied Mathematics from the University of Nairobi, as well as a Bachelor of Science in Mathematics with Education (Physics and Chemistry) from the University of Eastern Africa, Baraton, where he graduated summa cum laude. He also holds a Postgraduate Certificate in Academic Practice from York St. John's University in the United Kingdom and is a Fellow of the Higher Education Academy (UK).\n\nA Certified Bioethicist, Professor Kimathi has played a key role in establishing and managing Institutional Scientific Research Ethics Review Boards, ensuring the highest ethical standards throughout research processes. His scholarly work spans multiple disciplines, including Applied Mathematics, Psychology, Ecology, Dynamical Systems, Disease Modelling, Species Competition, and the application of Artificial Intelligence in teaching and learning. He has published extensively and presented research at numerous international conferences.\n\nThroughout his distinguished career, Professor Kimathi has held several senior leadership positions, including Acting Vice Chancellor, Deputy Vice Chancellor, University Registrar, Faculty Dean, Head of Department, and University Examinations Officer. In these roles, he has successfully led initiatives that enhanced institutional effectiveness, academic quality, governance, and operational efficiency across higher education institutions.\n\nProfessor Kimathi is deeply committed to mentorship and academic development, having supervised numerous Master's and PhD students to successful completion. His innovative teaching methods, dedication to student success, and passion for research have earned him widespread recognition within the academic community.\n\nIn addition to his academic leadership, Professor Kimathi is a highly skilled data analyst with expertise in big data analytics and business intelligence platforms, including Power BI. His ability to transform complex datasets into actionable insights has supported evidence-based decision-making and strengthened research outcomes across diverse fields.\n\nRecognized for his contributions to education, research, and institutional leadership, Professor Kimathi continues to be a respected voice in higher education, research ethics, data analytics, and academic innovation, inspiring students, scholars, and professionals across the region and beyond.",
          },
          {
            name: "Jean Paul Ndayisabye",
            role: "Climate Finance, Carbon Markets & Renewable Energy Expert",
            organization: "Founder & Lead Consultant",
            image: "/images/speakers/jean-paul-ndayisabye.jpg",
            bio: "Jean Paul Ndayisabye is a Climate Finance, Carbon Market, Renewable Energy, and Environmental & Social Safeguards expert with more than 17 years of professional experience across Rwanda, Uganda, Tanzania, Kenya, Germany, the United States, the United Kingdom, China, South Korea, and India. He is proficient in Kinyarwanda, English, French, Kiswahili, and Luganda, with a working knowledge of German.\n\nHe is the Founder and Lead Consultant of an environmental and climate advisory firm specializing in Environmental and Social Impact Assessments (ESIA), Environmental and Social Management Frameworks (ESMF), Environmental, Social and Governance (ESG) advisory services, climate change adaptation, spatial planning, emission reduction frameworks, carbon market project development, and renewable energy initiatives.\n\nFor the past six years, Jean Paul has worked with GOPA Worldwide Consultants, a German-based international consultancy, providing technical support to Rwanda's Local Administrative Entities Development Agency (LODA). In this role, he has assessed environmental, social, governance, and climate resilience compliance for infrastructure projects financed by KfW, AFD, and LuxDev, covering roads, water supply systems, healthcare facilities, schools, administrative buildings, and electricity infrastructure. Throughout these assignments, he has actively championed the integration of renewable and low-carbon energy solutions into public infrastructure development.\n\nOver the past decade, Jean Paul has led or contributed to more than 80 Environmental and Social Impact Assessments and Environmental Audits across Rwanda and the wider East African region. He also possesses extensive expertise in carbon markets and climate finance, having managed a Clean Development Mechanism (CDM) programme for seven years, first as Programme Coordinator and later as Country Director. The programme generated and traded Certified Emission Reductions (CERs) through the distribution of improved cookstoves to rural communities, enabling more than 800,000 households to transition from traditional three-stone cooking methods while delivering measurable environmental and social benefits. He is currently leading the development of a carbon market project focused on Rwanda's avocado plantations, creating new opportunities for climate finance and sustainable land management.\n\nJean Paul has developed particular expertise in waste-to-energy and circular economy solutions. During his professional training in Renewable Energy and Climate Finance at the Frankfurt School of Finance and Management in Germany, he undertook technical visits to advanced waste management and resource recovery facilities, gaining practical experience in landfill gas recovery, methane emission reduction, waste-to-energy technologies, renewable energy generation, circular economy systems, and carbon credit development.\n\nHe holds a Master of Science in Biodiversity Conservation from the University of Rwanda and is a Certified Expert in Renewable Energy and Climate Finance from the Frankfurt School of Finance and Management. He is an Accredited Environmental Assessor and Practitioner certified by the Rwanda Association of Professional Environmental Practitioners (RAPEP), an Accredited Mediator trained by the Edwards Mediation Academy (USA), and serves as the Founder Member and Chairperson of RAPEP, the national professional body representing approximately 347 environmental professionals and more than 100 consulting firms.\n\nJean Paul's multidisciplinary expertise in climate finance, carbon markets, renewable energy, waste-to-energy, landfill gas recovery, ESG, and environmental safeguards positions him as a leading advisor in developing innovative projects that transform waste into clean energy while delivering sustainable environmental, social, and economic impact.",
          },

          {
            name: "Eng. Kazawadi Papias Dedeki",
            role: "Founder & Managing Director",
            organization: "TASKS AFRICA CBC",
            image: "/images/speakers/kazawadi-papias-dedeki.jpeg",
            bio: "Eng. Kazawadi Papias Dedeki is a distinguished professional engineer, institutional leader, and innovation advocate with more than 25 years of experience in engineering, infrastructure development, sustainability, and private sector entrepreneurship across Africa. As the Founder and Managing Director of TASKS AFRICA CBC, a Community Benefit Company, he leads initiatives focused on catalyzing talent, strengthening engineering leadership, and building sustainable solutions for Africa's future.\n\nThroughout his career, Eng. Kazawadi has held several influential leadership positions within the engineering profession. He is the Immediate Past President of the Federation of African Engineering Organizations (FAEO) and the Past President of the Institute of Engineering Rwanda (IER). He also served as Chair of the Anti-Corruption Committee of the World Federation of Engineering Organizations (WFEO) from 2019 to 2023, where he championed integrity, transparency, and ethical governance within the global engineering community.\n\nA respected thought leader in engineering innovation and institutional development, Eng. Kazawadi is the inventor of the HAIRSTEIC framework—a transformative model integrating strategy, ethics, leadership, and disciplined execution to develop resilient professionals and sustainable enterprises. As Co-Chair of the A3P Accord, he actively promotes Pan-African and Global South engineering collaboration, advancing initiatives that contribute to the implementation of the African Union's Agenda 2063.\n\nHis professional achievements have earned international recognition through fellowships with the International Academy of Project Management (IAPM), the Academy of Engineering and Technology for the Developing World (AETDEW), and the ASEAN Academy of Engineering and Technology (AAET). He is also a Senior Member of the Institute of Engineering Rwanda, a Member of the Chartered Institute of Arbitrators (MCIArb), an accredited Mediator, a member of WISE, and a listed member of the Kigali International Arbitration Centre (KIAC).\n\nThrough his leadership, Eng. Kazawadi continues to bridge engineering, governance, ethics, and innovation, empowering professionals, institutions, and communities to drive sustainable infrastructure development, strengthen engineering excellence, and build a prosperous and resilient Africa.",
          },

         {
  name: "Donatille Nkunzi",
  role: "Founder & Chief Executive Officer",
  organization: "Heldis Green Solutions (HGS-Eco)",
  image: "/images/speakers/donatille-nkunzi.jpg",
  bio: "Donatille Nkunzi is the Founder and Chief Executive Officer of Heldis Green Solutions (HGS-Eco), a clean energy company dedicated to developing green hydrogen and hydrogen derivative projects that support Africa's transition to sustainable, secure, and low-carbon energy systems. Through HGS-Eco, she leads the development of innovative hydrogen value chains, identifies strategic investment opportunities, and advances clean energy solutions that contribute to industrial decarbonization, sustainable mobility, and inclusive economic growth across the continent.\n\nWith a multidisciplinary background spanning conventional energy, renewable energy, and hydrogen technologies, Donatille combines technical expertise with strategic insight into the development of emerging clean energy industries. She holds three Master's degrees in Petroleum Engineering, Renewable Energy, and Hydrogen Project Engineering, giving her a comprehensive understanding of energy resources, renewable technologies, and the engineering and implementation of hydrogen projects.\n\nBefore founding HGS-Eco, Donatille gained valuable experience in Rwanda's petroleum and gas sector, working on energy resource development and infrastructure. She later expanded her expertise in France, where she contributed to the engineering and development of green hydrogen and hydrogen derivative projects, supporting feasibility studies, project engineering, and strategic planning for next-generation clean energy solutions.\n\nDonatille is also an active researcher and co-author of the paper, \"Evaluation of the Potential of Green Hydrogen from Wind Energy for Heavy Mobility in Reunion Island,\" which explores the application of renewable hydrogen in sustainable transport systems. Her work demonstrates a strong commitment to translating renewable energy potential into practical solutions that strengthen energy security, accelerate industrial transformation, and address global climate challenges.\n\nBeyond her entrepreneurial leadership, Donatille actively contributes to the international hydrogen ecosystem as a member of the Women in Green Hydrogen Network and has served as a mentor supporting knowledge sharing, professional development, and greater participation of women in the clean energy transition.\n\nPassionate about positioning Africa as a global leader in the hydrogen economy, Donatille specializes in green hydrogen project development, hydrogen value chains, renewable energy integration, clean energy investment, and strategies that accelerate Africa's sustainable energy transformation. Through HGS-Eco and her international collaborations, she continues to foster partnerships between governments, investors, industry leaders, and innovators to unlock the continent's immense clean energy potential."
},
{
  name: "Mercy Thuo",
  role: "Executive Director",
  organization: "CPF Capital & Advisory Limited",
  image: "/images/speakers/mercy-thuo.png",
  bio: "Mercy Thuo is the Executive Director of CPF Capital & Advisory Limited, a Capital Markets Authority (CMA) licensed investment firm, where she provides executive leadership for the firm's capital markets, corporate finance, transaction advisory, and alternative investment businesses. She also serves as the Group Head of Projects at CPF Group, leading the origination, structuring, and execution of strategic investment and infrastructure projects across multiple sectors. In addition, she serves on the Board of Directors of CPF Capital & Advisory (Rwanda), a CMA-licensed Investment Bank, providing strategic oversight for the firm's regional growth and capital markets initiatives.\n\nWith more than 17 years of professional experience spanning capital markets, banking, pensions, and the built environment, Mercy is a distinguished capital markets and infrastructure finance executive. She is recognized for structuring innovative financing solutions that mobilize institutional and private capital for transformative investments across Africa. Her expertise includes project finance, capital raising, structured finance, public-private partnerships (PPPs), Real Estate Investment Trusts (REITs), and transaction advisory, advising governments, institutional investors, development finance institutions, and private sector clients on complex investment and infrastructure transactions.\n\nMercy has served on the National Treasury Committee of Experts on Mobilising Local Financial Markets for Infrastructure Financing, contributing to policy initiatives that strengthen domestic capital markets and unlock long-term financing for strategic infrastructure projects. She also serves on the East Africa Advisory Board of the Royal Institution of Chartered Surveyors (RICS), where she provides strategic guidance on professional standards and industry development across the region.\n\nShe is an alumna of the Executive Leadership Programme at the Saïd Business School, University of Oxford, holds a Master of Science degree from the United Kingdom, is a Certified International Wealth & Investment Manager (CISI), and is a member of the Kenya Association of Stockbrokers and Investment Banks (KASIB).\n\nA passionate advocate for innovative financing mechanisms, Mercy continues to champion the mobilization of long-term capital for infrastructure, energy, and sustainable development. Her work focuses on connecting institutional investment with high-impact projects that drive economic growth, regional integration, and Africa's transition to a more resilient and sustainable future."
},

{
  name: "Prof. Ayub N. Gitau",
  role: "Vice-Chancellor",
  organization: "University of Nairobi",
  image: "/images/speakers/ayub-gitau.jpeg",
  bio: "Prof. Ayub N. Gitau is the Vice-Chancellor of the University of Nairobi, Kenya's premier institution of higher learning and one of Africa's leading research universities. An accomplished academic and institutional leader, he has dedicated his career to advancing excellence in higher education, research, innovation, and strategic university governance.\n\nThroughout his distinguished academic career, Prof. Gitau has held numerous leadership and administrative positions, contributing significantly to the growth of the University of Nairobi and the broader higher education sector. His leadership has focused on strengthening academic quality, expanding research capacity, promoting interdisciplinary collaboration, and fostering partnerships between academia, industry, government, and international institutions.\n\nAs Vice-Chancellor, Prof. Gitau is committed to positioning the University of Nairobi as a globally competitive institution that drives innovation, entrepreneurship, and sustainable development. Under his leadership, the university continues to advance cutting-edge research, nurture future leaders, and provide solutions to national, regional, and global challenges through education, science, technology, and innovation.\n\nProf. Gitau is a strong advocate for knowledge-driven development, recognizing the critical role of universities in supporting economic transformation, industrialization, climate resilience, and Africa's sustainable development agenda. His work continues to strengthen the University's contribution to policy development, technological advancement, and the cultivation of highly skilled professionals who will shape the continent's future."
},

{
  name: "Dr. Yousif Mohamed Ahmed",
  role: "Oil and Gas Expert",
  organization: "Rwanda Mines, Petroleum and Gas Board (RMB)",
  image: "/images/speakers/yousif-mohamed-ahmed.jpeg",
  bio: "Dr. Yousif Mohamed Ahmed is a highly accomplished geoscientist and energy executive with more than 30 years of international experience in the exploration, development, and production of petroleum and mineral resources. Throughout his distinguished career, he has held senior leadership positions across the energy and mining sectors, providing strategic direction in resource development, business planning, asset valuation, and operational management while building strong multidisciplinary and cross-cultural teams.\n\nSince August 2024, Dr. Ahmed has served as an Oil and Gas Expert at the Rwanda Mines, Petroleum and Gas Board (RMB), where he contributes to the development and sustainable management of Rwanda's petroleum and gas resources. His expertise includes petroleum exploration, hydrocarbon production, concession and production agreements, contract negotiations, and energy resource management. He is also actively involved in overseeing methane gas production from Lake Kivu and is a strong advocate for expanding clean energy through renewable energy and natural gas utilization.\n\nPrior to joining RMB, Dr. Ahmed held several executive leadership roles, including General Manager of the Sudanese Mineral Resources Company, President of StarOil Company (Block 17, Sudan), Vice President of the Greater Nile Petroleum Operating Company, General Manager of Sudapet National Oil Company, and Manager at Ansan Wikfs Investment Company in Dubai. Across these positions, he successfully led upstream petroleum operations, mining projects, commercial negotiations, and strategic resource development initiatives.\n\nDr. Ahmed holds both Master of Science and Doctor of Philosophy (PhD) degrees in Geology from the University of Tokyo, Japan, and earned a Bachelor of Science (Honours) in Geology from the University of Khartoum, Sudan. His extensive technical expertise, executive leadership, and deep understanding of the global energy sector continue to support responsible resource development, energy security, and sustainable economic growth across Africa."
},
{
  name: "Alice Umuhorakeye",
  role: "Mining Extraction and Inspection Division Manager",
  organization: "Rwanda Mines, Petroleum and Gas Board (RMB)",
  image: "/images/speakers/alice-umuhorakeye.jpeg",
  bio: "Alice Umuhorakeye is the Mining Extraction and Inspection Division Manager at the Rwanda Mines, Petroleum and Gas Board (RMB), where she leads national efforts to promote sustainable mineral resource management, strengthen regulatory compliance, and advance responsible mining practices. Since her appointment by the Cabinet of Rwanda in March 2026, she has played a key role in ensuring the country's mining sector supports both economic growth and environmental sustainability.\n\nWith more than a decade of experience in environmental management, Alice has built a distinguished career in natural resource protection, environmental impact assessment, climate change adaptation, and sustainable development. Prior to joining RMB, she served as a Technical Advisor at GIZ Rwanda from 2024 to 2026, where she contributed to the implementation of Rwanda's Nationally Determined Contributions (NDCs), aligning national climate commitments with policy priorities while supporting climate financing and strategic partnerships.\n\nEarlier in her career, Alice served as a Water Quality Specialist at the Rwanda Water Resources Board from 2021 to 2024 and as an Environmental Protection Specialist with the City of Kigali from 2015 to 2021. In these roles, she contributed to strengthening water quality management, environmental compliance, urban sustainability, and the protection of Rwanda's natural resources.\n\nAlice holds a Master's degree in Environmental Economics and Natural Resources Management and a Bachelor's degree in Environmental Chemistry. She is also a certified Project Management Professional (PMP)®, combining technical expertise with internationally recognized project management skills.\n\nAn accomplished public speaker and advocate for climate action, Alice moderated Rwanda's first Climate Science Symposium in May 2025, bringing together scientists, policymakers, and industry leaders to strengthen collaboration on climate resilience and sustainable development. Fluent in Kinyarwanda, English, and French, she is recognized for her ability to communicate across diverse audiences and lead multidisciplinary teams.\n\nDriven by a passion for environmental stewardship and sustainable resource management, Alice continues to champion responsible mining, climate resilience, and policies that support Rwanda's long-term economic prosperity while safeguarding its natural environment for future generations."
},

{
  name: "Dr. Ronald Kwena",
  role: "Associate Deputy Vice Chancellor, Research, Innovation & Enterprise",
  organization: "University of Kigali",
  image: "/images/speakers/ronald-kwena.png",
  bio: "Dr. Ronald Kwena is the Associate Deputy Vice Chancellor for Research, Innovation, and Enterprise at the University of Kigali, Rwanda, where he provides strategic leadership in research excellence, innovation, sustainability, and industry engagement. With more than 15 years of experience in higher education, research governance, and institutional capacity development, he has built a distinguished career leading multidisciplinary research, innovation ecosystems, and strategic partnerships that advance sustainable development and the green transition across Africa.\n\nDr. Kwena holds a PhD in Project Management and has previously served as Director of Research and Innovation and Dean of the Graduate School at the University of Kigali. He is the Editor-in-Chief of the Journal of Financial and Management Sciences and serves as the Board Chair of the International Conference on Green and Sustainable Development, a platform that promotes cutting-edge research and collaboration on green energy transitions, sustainability, and climate innovation.\n\nHis research and professional interests span renewable energy integration, sustainable infrastructure, climate finance, green entrepreneurship, circular economy systems, innovation management, and the role of research in achieving the United Nations Sustainable Development Goals (SDGs). Throughout his career, Dr. Kwena has led numerous high-impact projects focused on climate resilience, sustainable waste management, low-carbon development, and evidence-based policy for Africa's green economy.\n\nDr. Kwena currently serves as the Principal Investigator of a European Union-funded Waste Analysis and Characterization Study in Rwanda's Lake Kivu Basin. Implemented in partnership with the Spanish Red Cross, the Rwanda Red Cross Society, and the University of Lay Adventists of Kigali (UNILAK), the project supports circular economy solutions by generating evidence to improve waste management, resource recovery, environmental protection, and sustainable livelihoods.\n\nHe has also made significant contributions to policy and climate governance through research on political and regulatory incentives for increasing private sector participation in climate action under Rwanda's Nationally Determined Contributions (NDCs). His work has informed evidence-based discussions on mobilizing investment and accelerating Rwanda's transition to a resilient, low-carbon, and green economy.\n\nBeyond his research leadership, Dr. Kwena is actively involved in developing the next generation of African scholars. He serves as a Mentor, PhD Supervisor, and Scientific Committee Member for the PhD Hub for Africa—an initiative of the North-West University Business School in South Africa that supports doctoral researchers addressing the Sustainable Development Goals. Through his academic leadership, research, and international collaborations, Dr. Kwena continues to advance innovation, sustainability, and knowledge-driven solutions that contribute to Africa's economic transformation and clean energy future."
},
{
  name: "Raymond Mugisha Mpora",
  role: "Business & Management Consultant",
  organization: "Independent Consultant",
  image: "/images/speakers/raymond-mugisha-mpora.jpeg",
  bio: "Raymond Mugisha Mpora is a Business and Management Consultant specializing in enterprise risk management, climate risk, sustainability, ESG, and economic resilience. He is a Chartered Risk Analyst, Certified Climate Risk Professional, GRI Certified Sustainability Professional, and a Certificated Professional Banker whose work focuses on advancing resilient economic pathways and sustainable development across Africa.\n\nWith over 20 years of cross-sector experience spanning Uganda, Rwanda, Zambia, Zimbabwe, Nigeria, Botswana, and Malawi, Raymond has advised governments, financial institutions, regulators, development partners, and private sector organizations on enterprise risk management, disaster risk financing, climate governance, ESG strategy and reporting, and corporate resilience. His multidisciplinary expertise enables institutions to strengthen governance frameworks while supporting the transition toward low-carbon and climate-resilient economies.\n\nRaymond holds a Master of Arts in Economic Policy Management and a Bachelor of Science in Agricultural Engineering from Makerere University. He is currently pursuing a PhD in Management and Business, where his research focuses on developing a framework for sequencing the green transition to balance climate action with fiscal sustainability and macroeconomic stability in developing economies.\n\nThroughout his consulting career, Raymond has undertaken numerous assignments for the United Nations Development Programme (UNDP), including feasibility assessments of government climate responses to strengthen risk governance and insurance integration, mapping technical institutions for climate-related insurance development, and formulating national disaster risk financing strategies. He has also led enterprise-wide risk assessments for humanitarian programmes, developed disaster risk management mainstreaming frameworks for national budgeting processes, and designed comprehensive enterprise risk management systems incorporating governance structures, policies, business continuity planning, and organizational risk registers.\n\nPrior to his consulting career, Raymond served in senior leadership positions across the banking and insurance sectors, including Head of Risk and Group Enterprise Risk Manager, where he designed enterprise risk frameworks, advised executive leadership, trained senior management teams, and embedded opportunity-focused risk management practices that enhanced long-term organizational resilience. He has also contributed to value-for-money reviews, project appraisals, and institutional capacity-building initiatives with international development partners.\n\nHis professional qualifications include Chartered Risk Analyst, Certified Climate Risk Professional, GRI Certified Sustainability Professional, Certificated Professional Banker, Diploma in Risk Management, Diploma in Sustainable Development, and Diploma in Environmental Quality Monitoring and Analysis. He has further strengthened his expertise through specialized United Nations and World Bank training in gender-responsive climate action, green economy principles, sustainable consumption, biodiversity reporting, and climate disclosure standards.\n\nThrough his work, Raymond continues to support governments, businesses, and development institutions in integrating climate resilience, ESG principles, disaster risk financing, and sustainable investment strategies into policy and decision-making, helping build stronger regional value chains, resilient financial systems, and inclusive economic growth across Africa."
},

{
  name: "Winnie Pertet",
  role: "Chief Executive Officer & Lead Consultant",
  organization: "Serian Consulting Limited",
  image: "/images/speakers/winnie-pertet.jpeg",
  bio: "Winnie Pertet is a seasoned executive leader, corporate governance expert, and strategic advisor with more than 25 years of experience driving organizational transformation, human capital strategy, leadership development, and sustainable culture change across East and Central Africa. Throughout her career, she has built a strong reputation for helping organizations strengthen governance, enhance performance, and navigate complex business transformation initiatives.\n\nShe currently serves as the Chief Executive Officer and Lead Consultant at Serian Consulting Limited, where she advises organizations on governance, leadership effectiveness, organizational development, and strategic transformation. Winnie also serves as Chair of the Human Resources Committee at the Kenya Network Information Centre (KeNIC) and as an Independent Non-Executive Director at Britam General Insurance, providing oversight on governance, strategy, and organizational performance.\n\nWinnie's extensive board leadership experience includes serving as a Non-Executive Director at KenGen, Africa's largest power producer, where she chaired both the Strategy Committee and the Human Resources & Nominations Committee. In these roles, she guided long-term corporate strategy, executive succession planning, leadership development, and organizational alignment. She also served as the founding Board Chairperson of the National Employment Authority, Chairperson of the Association of Retirement Benefits Schemes (ARBS), and Trustee of the Management University of Africa.\n\nAcross senior executive positions with leading multinational organizations including Diageo, Coca-Cola Sabco, and UAP/Old Mutual, Winnie successfully led high-impact initiatives in organizational design, post-merger integration, culture transformation, change management, performance management, and talent development. Her expertise in building resilient organizations and high-performing teams has contributed significantly to business growth and long-term institutional success.\n\nWinnie holds an MBA in Strategic Human Resource Management, a Bachelor's degree in Education from Kenyatta University, and a Higher National Diploma in Human Resource Management. She is also a certified Executive Coach through the Academy of Executive Coaching (AOEC), further strengthening her ability to mentor leaders and support executive development.\n\nA respected voice in governance, leadership, and organizational transformation, Winnie continues to champion effective leadership, strong corporate governance, and people-centered strategies that drive sustainable growth, innovation, and long-term impact across Africa."
},
        ],
      },
    ],
  },

  perth: {
    label: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    location: "Novotel Hotel Perth, Western Australia",
    intro:
      "The Perth speaker programme is aligned to capital markets, mining technology, green hydrogen, energy storage, ESG leadership, and Africa–Australia investment and policy collaboration.",
    groups: [
      {
        label: "Australia Edition Leadership",
        speakers: [
          {
  name: "Warner Priest",
  role: "Midstream Director",
  organization: "InterContinental Energy",
  image: "/images/speakers/warner-priest.jpg",
  bio: "Warner Priest is the Midstream Director at InterContinental Energy, a global pioneer in large-scale green hydrogen development. With more than 30 years of experience in the energy sector, he leads the engineering and delivery of midstream infrastructure across the company's global portfolio of green hydrogen projects, guiding projects from concept through execution and operation.\n\nAt InterContinental Energy, Warner draws on extensive expertise in power transmission, electricity distribution systems, microgrids, and integrated energy infrastructure to develop scalable hydrogen solutions that support the global transition to clean energy. His technical leadership has contributed to groundbreaking renewable energy initiatives, including the development of South Australia's first megawatt-scale hydrogen solution, establishing him as a recognized authority in integrated hydrogen value chains and next-generation energy systems.\n\nInterContinental Energy has established itself as a global leader in green hydrogen development through a portfolio of flagship projects that have attracted partnerships with some of the world's largest energy companies. Under Warner's engineering leadership, the company continues to develop large-scale projects designed to accelerate the production, transportation, and commercialization of green hydrogen worldwide.\n\nBeyond project development, Warner contributes to advancing innovation through InterContinental Energy's proprietary P2(H2)Node™ architecture, a pioneering technology platform that optimizes the production and integration of green hydrogen at scale. His work reflects a strong commitment to delivering commercially viable hydrogen infrastructure that supports decarbonization, energy security, and the transition to a sustainable global energy economy."
},
          {
            name: "To be announced",
            role: "Institutional Leadership Speaker",
            organization: "Australia–Africa Cooperation Platform",
            image: "/images/speakers/speaker-13.jpg",
          },
        ],
      },
      {
        label: "Capital Markets / Investment Voices",
        speakers: [
          {
            name: "To be announced",
            role: "Capital Markets Speaker",
            organization: "Investment / Advisory Group",
            image: "/images/speakers/speaker-14.jpg",
          },
          {
            name: "To be announced",
            role: "Energy Finance Leader",
            organization: "Infrastructure / Energy Fund",
            image: "/images/speakers/speaker-15.jpg",
          },
          {
            name: "To be announced",
            role: "Development / Investment Specialist",
            organization: "Institutional Finance Platform",
            image: "/images/speakers/speaker-16.jpg",
          },
        ],
      },
      {
        label: "Mining / Technology / Hydrogen",
        speakers: [
          {
            name: "To be announced",
            role: "Mining Technology Executive",
            organization: "Advanced Mining Solutions",
            image: "/images/speakers/speaker-17.jpg",
          },
          {
            name: "To be announced",
            role: "Hydrogen / Storage Specialist",
            organization: "Clean Technology Company",
            image: "/images/speakers/speaker-18.jpg",
          },
          {
            name: "To be announced",
            role: "Critical Minerals Speaker",
            organization: "Resources / Processing Platform",
            image: "/images/speakers/speaker-19.jpg",
          },
        ],
      },
      {
        label: "Policy / ESG / Moderators",
        speakers: [
          {
            name: "To be announced",
            role: "ESG Leadership Speaker",
            organization: "Sustainability Advisory Platform",
            image: "/images/speakers/speaker-20.jpg",
          },
          {
            name: "To be announced",
            role: "Policy Dialogue Representative",
            organization: "Government / Institutional Body",
            image: "/images/speakers/speaker-21.jpg",
          },
          {
            name: "To be announced",
            role: "Conference Moderator",
            organization: "Industry / Media / Advisory Network",
            image: "/images/speakers/speaker-22.jpg",
          },
        ],
      },
    ],
  },
};

const editionOrder: EditionKey[] = ["Kigali", "perth"];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SpeakersPage() {
  const [activeEdition, setActiveEdition] = useState<EditionKey>("Kigali");
  const current = useMemo(() => editions[activeEdition], [activeEdition]);
  const accent = ACCENTS[activeEdition];

  return (
    <main
      className="pt-24 bg-white"
      style={
        {
          "--accent": accent.primary,
          "--accent-dark": accent.dark,
          "--accent-soft": accent.soft,
          "--accent-ring": accent.ring,
        } as React.CSSProperties
      }
    >
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[#02026e]/20 bg-white">
        <div className="absolute inset-0">
          {/* Blue blob (Kigali) */}
          <div className="absolute left-[-120px] top-[-120px] h-[300px] w-[300px] rounded-full bg-blue-600/10 blur-3xl transition-colors duration-500" />
          {/* Emerald blob (Perth) */}
          <div className="absolute right-[-100px] top-[60px] h-[260px] w-[260px] rounded-full bg-emerald-500/12 blur-3xl transition-colors duration-500" />
          <div className="absolute left-[30%] bottom-[-140px] h-[220px] w-[220px] rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-12 md:px-6 lg:py-16">
          <div className="mb-6 flex flex-wrap items-center gap-2 text-base text-gray-500">
            <Link href="/" className="transition hover:text-[var(--accent)]">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-700">Speakers</span>
          </div>

          <div className="max-w-4xl">
            <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.22em] text-[#02026e]">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} />
              Speakers
            </p>
            <h1 className="font-heading mt-3 text-4xl font-extrabold tracking-[-0.03em] text-gray-900 sm:text-5xl">
              Conference speakers
            </h1>
            {/* Signature bridge rule: blue → emerald, symbolizing the two host editions */}
            <div
              className="mt-5 h-[4px] w-24 rounded-full"
              style={{ background: BRIDGE_GRADIENT }}
            />
            <p className="mt-5 max-w-3xl text-xl leading-8 text-gray-600">
              Meet the confirmed speakers for each 2026 edition. Click any card with a{" "}
              <span
                className="inline-flex items-center rounded-full px-2 py-0.5 text-sm font-semibold"
                style={{ backgroundColor: "var(--accent-soft)", color: "var(--accent)" }}
              >
                Full Bio
              </span>{" "}
              badge to read their full profile.
            </p>
          </div>

          {/* Edition switcher */}
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {editionOrder.map((editionKey) => {
              const edition = editions[editionKey];
              const isActive = activeEdition === editionKey;
              const cardAccent = ACCENTS[editionKey];
              return (
                <button
                  key={editionKey}
                  type="button"
                  onClick={() => setActiveEdition(editionKey)}
                  className="relative overflow-hidden rounded-[24px] border p-5 text-left transition-all duration-300"
                  style={{
                    borderColor: isActive ? "transparent" : `${cardAccent.primary}33`,
                    background: isActive
                      ? `linear-gradient(135deg, ${cardAccent.primary}, ${cardAccent.dark})`
                      : "white",
                    boxShadow: isActive
                      ? `0 18px 36px ${cardAccent.primary}38`
                      : "0 1px 2px rgba(2,2,110,0.04)",
                    color: isActive ? "white" : "#111827",
                  }}
                >
                  {/* Always-visible identity stripe, even when inactive */}
                  <span
                    className="absolute left-0 top-0 h-full w-[4px]"
                    style={{ backgroundColor: cardAccent.primary }}
                  />
                  <p
                    className="text-[13px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: isActive ? "rgba(255,255,255,0.72)" : cardAccent.primary }}
                  >
                    {edition.label}
                  </p>
                  <div className="mt-4 grid gap-2 text-base">
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        className="h-4 w-4"
                        style={{ color: isActive ? "white" : cardAccent.primary }}
                      />
                      <span>{edition.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin
                        className="h-4 w-4"
                        style={{ color: isActive ? "white" : cardAccent.primary }}
                      />
                      <span>{edition.location}</span>
                    </div>
                  </div>
                  <p
                    className="mt-4 text-base leading-7"
                    style={{ color: isActive ? "rgba(255,255,255,0.85)" : "#4b5563" }}
                  >
                    {edition.intro}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Speaker groups ── */}
      {current.groups.map((group, index) => (
        <SectionShell key={group.label} muted={index % 2 === 1}>
          <div className="max-w-4xl">
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <p
                className="text-[13px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "var(--accent)" }}
              >
                {current.label}
              </p>
            </div>
            <h2 className="font-heading mt-3 text-3xl font-bold tracking-[-0.02em] text-gray-900">
              {group.label}
            </h2>
          </div>

          {/* Breaks out of the section's text-column width so the grid can
              breathe across more of the viewport — cards keep their size,
              more of them just fit per row. */}
          <div
            className="relative mt-10 w-screen px-4 sm:px-8 lg:px-12"
            style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
          >
            <div className="mx-auto max-w-[1800px]">
              <div
                className="grid justify-center gap-x-8 gap-y-10"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(360px, 440px))" }}
              >
                {group.speakers.map((speaker, i) => (
                  <SpeakerCard
                    key={`${group.label}-${speaker.name}`}
                    speaker={speaker}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionShell>
      ))}

      {/* ── CTA ── */}
      <SectionShell>
        <div
          className="relative overflow-hidden rounded-[28px] px-6 py-8 text-white shadow-[0_18px_50px_rgba(2,2,110,0.22)] md:px-10 md:py-10"
          style={{
            background:
              "linear-gradient(115deg, #0a0a3d 0%, #1d4ed8 55%, #059669 120%)",
          }}
        >
          {/* subtle glows to reinforce both brand colors */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-emerald-400/25 blur-3xl" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                Speaker updates
              </p>
              <h2 className="font-heading mt-2 text-2xl font-bold tracking-[-0.02em] md:text-3xl">
                More speakers to be announced
              </h2>
              <p className="mt-3 text-base leading-7 text-white/80">
                The full speaker lineup is being finalised. Register your interest
                or get in touch to enquire about speaking opportunities.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full bg-white px-6 py-3 text-base font-semibold text-[#02026e] transition hover:bg-white/90"
              >
                Speaker Enquiry
              </Link>
              <a
                href="/get-tickets"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/40 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </SectionShell>
    </main>
  );
}