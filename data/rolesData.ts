// data/rolesData.ts
import {
  Globe,
  Zap,
  Users,
  Leaf,
  Landmark,
  Building2,
  Lightbulb,
  GraduationCap,
  TrendingUp,
  BookOpen,
  Star,
  Monitor,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export type Highlight = {
  icon: LucideIcon;
  /** Required — highlight cards always show a custom image/logo, not the icon. */
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description: string;
};

export type Stat = {
  value: string;
  description: string;
  /** Optional hex/CSS color for this card's background. */
  color?: string;
};

export type AudienceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Optional hex/CSS color for this card's background. */
  color?: string;
  /** Optional hex/CSS color for the hover accent bar (defaults to cycling palette). */
  sweepColor?: string;
};

export type RoleContent = {
  eyebrow: string;
  heading: string;
  paragraph: string;
  // Any number of highlight cards — 3, 4, 6, however many make sense.
  highlights: Highlight[];
  whyMattersSubheading: string;
  // Any number of outcome lines — the shuffling stack handles any length.
  outcomes: string[];
  // Any number of stat cards — 2, 3, 4...
  stats: Stat[];
  audienceLabel: string;
  // Any number of audience cards.
  audience: AudienceItem[];
  ctaWords: string[];
  bannerParagraph: string;
};

// Static logistics data
export const editions = [
  {
    name: "Kigali Edition",
    date: "6–7 August 2026",
    venue: "Kigali Marriott Hotel, Rwanda",
    description:
      "Focused on East Africa's energy transition — regional power grids, clean mobility, climate finance and decentralised energy.",
    accent: "from-blue-600/15 to-cyan-400/10 border-blue-200",
  },
  {
    name: "Perth Edition",
    date: "31 Aug – 1 Sept 2026",
    venue: "Novotel Hotel Perth, Western Australia",
    description:
      "Connecting African priorities with Australian capital, mining technology, green hydrogen and energy storage.",
    accent: "from-emerald-600/15 to-teal-400/10 border-emerald-200",
  },
];

// Role-specific content dictionary
export const rolesContent: Record<string, RoleContent> = {
  default: {
    eyebrow: "Conference Overview",
    heading: "A clean energy platform connecting Africa and Australia",
    paragraph:
      "Africa's energy transition is entering a defining decade. The conference brings together governments, investors, utilities and innovators to turn ideas into partnerships — and partnerships into real projects. Hosted in Kigali, Rwanda and Perth, Australia, it connects Africa's renewable energy potential with Australia's technology and investment expertise.",
    highlights: [
      {
        imageSrc: "/images/highlights/africa-australia.jpg",
        imageAlt: "Africa Australia partnership",
        icon: Globe,
        title: "Africa–Australia platform",
        description: "A meeting point for governments, investors, utilities and innovators working to speed up Africa's clean energy transition."
      },
      {
        imageSrc: "/images/highlights/default-energy-mining-infrastructure.jpg",
        imageAlt: "Energy, mining and infrastructure",
        icon: Zap,
        title: "Energy, mining & infrastructure",
        description: "Covering renewable energy, critical minerals, grid modernisation, green hydrogen and sustainable infrastructure."
      },
      {
        imageSrc: "/images/highlights/default-real-connections.jpg",
        imageAlt: "Networking and connections",
        icon: Users,
        title: "Real connections",
        description: "Meet ministers, regulators, investors, utilities and technology leaders shaping the region's energy future."
      },
      {
        imageSrc: "/images/highlights/default-practical-outcomes.jpg",
        imageAlt: "Practical industry outcomes",
        icon: Leaf,
        title: "Practical outcomes",
        description: "Built around investment, partnerships, capacity building and long-term growth — not just discussion."
      },
    ],
    whyMattersSubheading: "Connecting the leaders building tomorrow's energy systems",
    outcomes: [
      "Accelerate investment into renewable energy, sustainable infrastructure, critical minerals and emerging clean technologies.",
      "Strengthen Africa–Australia partnerships through policy dialogue, technology exchange and institutional collaboration.",
      "Support national and regional energy strategies that improve energy security and expand electricity access.",
      "Connect governments, investors, businesses and innovators capable of turning ideas into investment-ready projects.",
    ],
    stats: [
      {
        value: "600M+",
        description: "People across Africa still without reliable electricity access — the scale of the opportunity ahead.",
        color: "bg-amber-500/10 text-amber-600 border-amber-200"
      },
      {
        value: "2",
        description: "Strategic 2026 editions in Kigali and Perth, connecting Africa's resources with Australia's expertise.",
        color: "bg-blue-500/10 text-blue-600 border-blue-200"
      },
    ],
    audienceLabel: "Who should attend",
  audience: [
  {
    icon: Landmark,
    title: "Government & policymakers",
    description:
      "Ministers, regulators and public agencies shaping energy policy.",
    color: "#FFFFFF",
    sweepColor: "#2563EB",
  },
  {
    icon: Building2,
    title: "Investors & utilities",
    description:
      "Financial institutions, energy companies and project developers.",
    color: "#FFFFFF",
    sweepColor: "#10B981",
  },
  {
    icon: Lightbulb,
    title: "Innovators & startups",
    description:
      "Technology providers building the next generation of energy solutions.",
    color: "#FFFFFF",
    sweepColor: "#F59E0B",
  },
  {
    icon: GraduationCap,
    title: "Researchers & students",
    description:
      "Academia, young professionals and development partners.",
    color: "#FFFFFF",
    sweepColor: "#8B5CF6",
  },
],
    ctaWords: ["Investment", "Technology", "Partnership", "Growth"],
    bannerParagraph:
      "Through strategic partnerships, investment mobilisation, knowledge exchange and collaborative leadership, the 2026 editions are committed to building resilient energy systems, unlocking new economic opportunities and delivering a cleaner, more sustainable future for both regions.",
  },

 "government-policymakers": {
  eyebrow: "Government & Policymakers",

  heading:
    "Leading Africa's energy transition through policy, partnership and sustainable development",

  paragraph:
    "The Clean Energy Conference Africa Australia is a strategic platform for ministers, regulators, government agencies, utilities and development finance institutions committed to building resilient, secure and investment-ready energy systems. Bringing together public and private sector leaders from Africa and Australia, the conference focuses on the policies, partnerships and practical solutions needed to transform national energy ambitions into long-term economic and social development.",

  highlights: [
    {
      imageSrc: "/images/highlights/gov-ministerial-dialogue-platform.jpg",
      icon: Landmark,
      title: "Ministerial dialogue platform",
      description:
        "Engage directly with governments, investors, development partners and industry leaders accelerating renewable energy deployment and regional cooperation.",
    },
    {
      imageSrc: "/images/highlights/gov-policy-regulatory-reform.jpg",
      icon: Zap,
      title: "Policy & regulatory reform",
      description:
        "Explore regulatory reform, energy market development, climate finance and infrastructure planning that create investment-ready environments.",
    },
    {
      imageSrc: "/images/highlights/gov-public-private-partnerships.jpg",
      icon: Users,
      title: "Public-private partnerships",
      description:
        "Learn how successful PPP models reduce implementation risk while accelerating delivery of critical energy infrastructure.",
    },
    {
      imageSrc: "/images/highlights/gov-regional-energy-cooperation.jpg",
      icon: Globe,
      title: "Regional energy cooperation",
      description:
        "Strengthen cross-border collaboration, regional power integration and institutional partnerships supporting long-term energy security.",
    },
    {
      imageSrc: "/images/highlights/gov-best-practice-exchange.jpg",
      icon: BookOpen,
      title: "International best practice",
      description:
        "Gain practical insights from governments, utilities and industry leaders delivering measurable progress across renewable energy and electricity market reform.",
    },
    {
      imageSrc: "/images/highlights/gov-policy-to-delivery.jpg",
      icon: Leaf,
      title: "From policy to delivery",
      description:
        "Move beyond ambitious targets through coordinated governance, strategic investment and practical implementation.",
    },
  ],

  whyMattersSubheading:
    "Building policies that deliver long-term national impact",

  outcomes: [
    "Develop policies that create stable, transparent and investment-ready regulatory environments.",
    "Strengthen national energy security through resilient infrastructure, diversified energy systems and regional power cooperation.",
    "Engage development finance institutions and international investors supporting national clean energy priorities.",
    "Explore public-private partnership models that accelerate infrastructure delivery while reducing implementation risk.",
    "Learn from governments delivering measurable progress in renewable energy deployment, electricity market reform and climate finance.",
    "Build regional partnerships that strengthen cross-border collaboration and shared economic growth.",
    "Connect with utilities, technology providers and project developers capable of supporting national implementation.",
    "Transform policy into measurable national outcomes through collaboration, investment and practical delivery.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Delegates from government, regulatory bodies, development finance institutions and industry.",
    },
    {
      value: "2",
      description:
        "Strategic 2026 editions connecting African policymakers with Australian expertise.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: Landmark,
      title: "Government ministers",
      description:
        "Leaders responsible for Energy, Environment, Climate Change, Mining, Infrastructure, Finance and Economic Development.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: Building2,
      title: "Government ministries & agencies",
      description:
        "Departments and agencies responsible for energy planning, regulation and implementation.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: Lightbulb,
      title: "Energy regulators",
      description:
        "National and regional regulators overseeing electricity markets and sector governance.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: Zap,
      title: "Utilities & state-owned energy companies",
      description:
        "Utility executives, electricity authorities, transmission and distribution operators.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: Globe,
      title: "Regional organisations",
      description:
        "Power pools, regional institutions and organisations advancing cross-border energy cooperation.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: Users,
      title: "Municipal & local government",
      description:
        "Leaders overseeing local energy, infrastructure and sustainable development programmes.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: TrendingUp,
      title: "Public investment authorities",
      description:
        "Government investment agencies and project implementation authorities driving strategic infrastructure.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: BookOpen,
      title: "Development partners",
      description:
        "Government representatives working with development finance institutions and international development organisations.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
  ],

  ctaWords: [
    "Policy",
    "Governance",
    "Investment",
    "Partnership",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference empowers governments to move beyond policy discussions toward practical implementation. By connecting policymakers, investors, utilities and development partners, it accelerates governance, strategic investment and regional collaboration that deliver measurable national outcomes.',
},

  "investors-financial": {
  eyebrow: "Investors & Financial Institutions",

  heading:
    "Investing in Africa's next generation of clean energy opportunities",

  paragraph:
    "The Clean Energy Conference Africa Australia connects investors, financial institutions, governments and project developers through a strategic marketplace designed to accelerate investment across Africa's clean energy sector. Bringing together capital, policy and industry leaders from Africa and Australia, the conference provides direct access to investment-ready projects, market intelligence and long-term commercial partnerships.",

highlights: [
  {
    imageSrc: "https://source.unsplash.com/1200x800/?renewable-energy,solar,investment",
    icon: TrendingUp,
    title: "Investment-ready projects",
    description:
      "Discover bankable opportunities across renewable energy, transmission, storage, green hydrogen, sustainable mining and critical minerals.",
  },
  {
    imageSrc: "https://source.unsplash.com/1200x800/?government,business,meeting",
    icon: Landmark,
    title: "Direct government engagement",
    description:
      "Meet policymakers creating investment-ready regulatory environments and accelerating project development.",
  },
  {
    imageSrc: "https://source.unsplash.com/1200x800/?solar-farm,wind-farm,infrastructure",
    icon: Building2,
    title: "Project showcases",
    description:
      "Engage with developers advancing infrastructure projects and seeking strategic capital for implementation.",
  },
  {
    imageSrc: "https://source.unsplash.com/1200x800/?finance,business,investment",
    icon: Globe,
    title: "Finance & investment structures",
    description:
      "Explore blended finance, climate finance, ESG frameworks and public-private partnership models that improve project bankability.",
  },
  {
    imageSrc: "https://source.unsplash.com/1200x800/?analytics,data,business",
    icon: BookOpen,
    title: "Market intelligence",
    description:
      "Gain insight into emerging market trends, regulatory developments and investment strategies shaping Africa's energy economy.",
  },
  {
    imageSrc: "https://source.unsplash.com/1200x800/?business,partnership,handshake",
    icon: Users,
    title: "Africa–Australia partnerships",
    description:
      "Connect African project opportunities with Australian investment expertise, technology and commercial partnerships.",
  },
],

  whyMattersSubheading:
    "Turning capital into sustainable growth",

  outcomes: [
    "Discover investment-ready renewable energy, infrastructure and sustainable development projects across Africa.",
    "Meet governments implementing policies that strengthen investor confidence and accelerate project development.",
    "Evaluate opportunities in renewable energy, transmission, battery storage, hydrogen, sustainable mining and critical minerals.",
    "Build relationships with project developers, utilities and technology providers seeking strategic capital.",
    "Understand evolving regulatory frameworks, ESG expectations and financing mechanisms influencing African markets.",
    "Explore blended finance, climate finance and public-private partnership models that improve project bankability.",
    "Gain first-hand market intelligence from policymakers, industry leaders and international organisations.",
    "Deploy capital with greater confidence through direct engagement with decision-makers and project sponsors.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Senior delegates including investors, governments, developers, utilities and financial institutions.",
    },
    {
      value: "2",
      description:
        "Strategic conference editions connecting African opportunities with Australian capital and expertise.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: TrendingUp,
      title: "Infrastructure investors & funds",
      description:
        "Infrastructure funds and investment firms financing large-scale energy and infrastructure projects.",
      color: "#F0FDF4",
      sweepColor: "#16A34A",
    },
    {
      icon: Building2,
      title: "Private equity & venture capital",
      description:
        "Private equity and venture capital firms investing in energy, infrastructure and clean technologies.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: Globe,
      title: "Development finance institutions",
      description:
        "DFIs, multilateral development banks and international finance organisations.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: Landmark,
      title: "Commercial & investment banks",
      description:
        "Commercial banks, investment banks and project finance institutions.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: TrendingUp,
      title: "Institutional investors",
      description:
        "Sovereign wealth funds, pension funds and institutional asset managers.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: Users,
      title: "Impact & climate finance",
      description:
        "Impact investors, climate finance organisations and blended finance initiatives.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: Leaf,
      title: "Green finance organisations",
      description:
        "Green investment funds, sustainable finance institutions and ESG-focused organisations.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: BookOpen,
      title: "Financial advisors & consultants",
      description:
        "Investment advisors, project finance specialists and financial consultants.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
    {
      icon: Building2,
      title: "Corporate investment leaders",
      description:
        "Corporate investment, strategy and business development executives expanding into African markets.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: Zap,
      title: "Project opportunity seekers",
      description:
        "Organisations seeking investment-ready clean energy and infrastructure opportunities across Africa.",
      color: "#EEF2FF",
      sweepColor: "#4F46E5",
    },
  ],

  ctaWords: [
    "Capital",
    "Investment",
    "Deal Flow",
    "Growth",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference connects capital with policy, innovation and project development. By bringing together investors, governments, developers and financial institutions, it helps transform investment opportunities into commercially successful projects that accelerate Africa\'s clean energy transition.',
},

"energy-companies-utilities": {
  eyebrow: "Energy Companies & Utilities",

  heading:
    "Powering Africa's energy transition through innovation, infrastructure and strategic partnership",

  paragraph:
    "The Clean Energy Conference Africa Australia brings together utilities, independent power producers, renewable energy developers, EPC contractors, infrastructure companies and government leaders driving Africa's next generation of energy infrastructure. Connecting Africa's rapidly expanding clean energy market with Australian expertise, the conference creates opportunities for collaboration, project development, technology adoption and long-term commercial growth.",

  highlights: [
    {
      imageSrc: "/images/highlights/energy-infrastructure-projects.jpg",
      icon: Zap,
      title: "Future energy infrastructure",
      description:
        "Discover upcoming renewable energy, transmission, distribution and large-scale infrastructure projects across Africa.",
    },
    {
      imageSrc: "/images/highlights/energy-grid-modernisation.jpg",
      icon: Globe,
      title: "Grid modernisation",
      description:
        "Explore smart grids, battery storage, digitalisation and advanced energy management systems strengthening network resilience.",
    },
    {
      imageSrc: "/images/highlights/energy-industry-partnerships.jpg",
      icon: Users,
      title: "Strategic partnerships",
      description:
        "Connect with governments, investors, project developers and technology providers shaping Africa's energy future.",
    },
    {
      imageSrc: "/images/highlights/energy-renewable-integration.jpg",
      icon: Leaf,
      title: "Renewable integration",
      description:
        "Learn practical approaches to integrating renewable generation while improving operational efficiency and energy security.",
    },
    {
      imageSrc: "/images/highlights/energy-emerging-technologies.jpg",
      icon: Lightbulb,
      title: "Emerging technologies",
      description:
        "Explore hydrogen, sustainable mining, critical minerals and next-generation clean energy technologies transforming the sector.",
    },
    {
      imageSrc: "/images/highlights/energy-commercial-growth.jpg",
      icon: TrendingUp,
      title: "Commercial growth",
      description:
        "Identify procurement opportunities, infrastructure investment priorities and partnerships that support long-term business expansion.",
    },
  ],

  whyMattersSubheading:
    "Building the infrastructure that powers sustainable growth",

  outcomes: [
    "Discover renewable energy, transmission, distribution and infrastructure projects across Africa.",
    "Build strategic partnerships with governments, investors, developers and technology providers.",
    "Explore technologies improving grid resilience, operational efficiency and renewable energy integration.",
    "Learn how utilities are modernising electricity networks through digitalisation, battery storage and smart grids.",
    "Understand regulatory developments, procurement opportunities and infrastructure investment priorities across African markets.",
    "Identify opportunities in decarbonisation, sustainable mining, green hydrogen and industrial energy solutions.",
    "Exchange operational knowledge and best practice with utilities and industry leaders from Africa and Australia.",
    "Position your organisation for participation in the next generation of clean energy infrastructure projects.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Industry leaders, utilities, developers, governments and technology providers attending across both editions.",
    },
    {
      value: "2",
      description:
        "Strategic conference editions connecting African energy markets with Australian expertise and innovation.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: Zap,
      title: "Electric utilities & national power companies",
      description:
        "Public and private utilities responsible for electricity generation, transmission and distribution.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: Building2,
      title: "Independent Power Producers",
      description:
        "IPPs and renewable energy developers delivering utility-scale clean energy projects.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: Globe,
      title: "Transmission & grid operators",
      description:
        "Transmission companies, distribution network operators and system operators modernising electricity networks.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: Landmark,
      title: "EPC & infrastructure developers",
      description:
        "Engineering, procurement, construction firms and infrastructure developers delivering major energy projects.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: Leaf,
      title: "Energy infrastructure companies",
      description:
        "Organisations building, operating and maintaining critical energy infrastructure across the value chain.",
      color: "#F0FDF4",
      sweepColor: "#16A34A",
    },
    {
      icon: TrendingUp,
      title: "Industrial & mining energy operators",
      description:
        "Mining companies and industrial energy users investing in reliable, sustainable energy solutions.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: Lightbulb,
      title: "Energy service & engineering firms",
      description:
        "ESCOs, engineering consultancies and technical specialists supporting project delivery and operational performance.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: Users,
      title: "Utility executives & technical leaders",
      description:
        "Executives, operational leaders, engineers and technical specialists driving energy transformation.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
    {
      icon: BookOpen,
      title: "Project developers & asset owners",
      description:
        "Developers and owners seeking partnerships, financing and technology for new infrastructure projects.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: Leaf,
      title: "Energy transition organisations",
      description:
        "Oil & gas companies and established energy businesses expanding into renewable and low-carbon technologies.",
      color: "#EEF2FF",
      sweepColor: "#4F46E5",
    },
  ],

  ctaWords: [
    "Infrastructure",
    "Innovation",
    "Partnership",
    "Growth",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference brings together utilities, developers, infrastructure companies and technology leaders to accelerate collaboration, modernise energy systems and deliver the projects powering Africa\'s clean energy future.',
},

"researchers-academia": {
  eyebrow: "Researchers & Academia",

  heading:
    "Advancing knowledge that shapes Africa's clean energy future",

  paragraph:
    "The Clean Energy Conference Africa Australia brings together researchers, universities, research institutions and academic leaders with governments, industry, investors and development partners to transform research into practical solutions. Connecting Africa's growing clean energy sector with Australia's globally recognised expertise, the conference creates opportunities for scientific collaboration, policy influence and technology innovation across both regions.",

  highlights: [
    {
      imageSrc: "/images/highlights/research-policy-impact.jpg",
      icon: BookOpen,
      title: "Research influencing policy",
      description:
        "Share evidence-based research that informs energy policy, infrastructure planning and sustainable development strategies.",
    },
    {
      imageSrc: "/images/highlights/research-global-collaboration.jpg",
      icon: Globe,
      title: "International collaboration",
      description:
        "Build long-term research partnerships connecting African and Australian universities, institutes and innovation centres.",
    },
    {
      imageSrc: "/images/highlights/research-commercialisation.jpg",
      icon: TrendingUp,
      title: "Research to commercialisation",
      description:
        "Connect with industry partners seeking applied research, technology development and commercial innovation.",
    },
    {
      imageSrc: "/images/highlights/research-emerging-technologies.jpg",
      icon: Lightbulb,
      title: "Emerging technologies",
      description:
        "Explore renewable energy, battery storage, hydrogen, smart grids, sustainable mining and digital energy systems.",
    },
    {
      imageSrc: "/images/highlights/research-knowledge-exchange.jpg",
      icon: Users,
      title: "Knowledge exchange",
      description:
        "Participate in technical forums, expert panels and collaborative workshops with leading researchers and industry experts.",
    },
    {
      imageSrc: "/images/highlights/research-workforce-development.jpg",
      icon: GraduationCap,
      title: "Future workforce development",
      description:
        "Support the next generation of clean energy professionals through collaboration, education and capacity building.",
    },
  ],

  whyMattersSubheading:
    "Transforming research into real-world impact",

  outcomes: [
    "Share research with policymakers, industry leaders and international stakeholders shaping Africa's clean energy future.",
    "Build collaborative partnerships with universities, research institutes and innovation centres across Africa and Australia.",
    "Connect with industry to accelerate technology development, commercialisation and applied research.",
    "Engage governments seeking evidence-based solutions to national energy, climate and infrastructure challenges.",
    "Explore funding opportunities through research programmes, development partners and international collaborations.",
    "Exchange knowledge on renewable energy, hydrogen, battery storage, smart grids, sustainable mining and critical minerals.",
    "Strengthen academic networks supporting research collaboration, student exchange and scientific partnerships.",
    "Contribute to developing the skilled workforce and innovative solutions required for Africa's long-term energy transformation.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Researchers, policymakers, industry leaders and innovation partners collaborating across both conference editions.",
    },
    {
      value: "2",
      description:
        "International editions connecting African research excellence with Australian scientific expertise.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: GraduationCap,
      title: "Universities & higher education",
      description:
        "Universities, colleges and higher education institutions advancing clean energy education and research.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: BookOpen,
      title: "Academic researchers",
      description:
        "Researchers, lecturers and faculty members across energy, engineering and environmental disciplines.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: Building2,
      title: "Research institutes & think tanks",
      description:
        "Independent research organisations and policy institutes driving scientific innovation.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: Leaf,
      title: "Climate & sustainability experts",
      description:
        "Researchers specialising in climate change, sustainability and environmental resilience.",
      color: "#F0FDF4",
      sweepColor: "#16A34A",
    },
    {
      icon: Lightbulb,
      title: "Engineering & technology researchers",
      description:
        "Electrical, mechanical, civil and energy engineering specialists developing next-generation technologies.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: Globe,
      title: "Mining & critical minerals researchers",
      description:
        "Experts advancing sustainable mining, geology and critical minerals research.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: TrendingUp,
      title: "Innovation hubs & technology transfer",
      description:
        "Innovation centres and technology transfer offices supporting commercialisation and entrepreneurship.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: Users,
      title: "Research leaders & academic networks",
      description:
        "Programme directors, faculty leaders and international research collaborations building global partnerships.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: GraduationCap,
      title: "Postgraduate researchers",
      description:
        "Masters, PhD candidates and early-career researchers developing future clean energy solutions.",
      color: "#EEF2FF",
      sweepColor: "#4F46E5",
    },
    {
      icon: Star,
      title: "Scientific innovation organisations",
      description:
        "Organisations supporting scientific research, knowledge exchange and clean energy innovation.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
  ],

  ctaWords: [
    "Research",
    "Innovation",
    "Collaboration",
    "Impact",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference connects research with policy, industry and investment. By bringing together leading academic institutions, governments and businesses, it transforms scientific knowledge into practical solutions that accelerate Africa\'s clean energy transition.',
},

"startups-entrepreneurs": {
  eyebrow: "Startups & Entrepreneurs",

  heading:
    "Turning innovation into commercial impact across Africa's clean energy sector",

  paragraph:
    "The Clean Energy Conference Africa Australia connects startups, entrepreneurs and emerging technology companies with governments, investors, utilities and industry leaders accelerating Africa's clean energy transition. Bridging Africa's rapidly expanding energy markets with Australia's globally recognised innovation ecosystem, the conference creates opportunities for investment, partnerships, market expansion and commercial growth.",

  highlights: [
    {
      imageSrc: "/images/highlights/startups-investor-access.jpg",
      icon: TrendingUp,
      title: "Investor access",
      description:
        "Connect with investors and funding partners actively seeking scalable clean energy technologies and innovative businesses.",
    },
    {
      imageSrc: "/images/highlights/startups-market-expansion.jpg",
      icon: Globe,
      title: "Regional market expansion",
      description:
        "Access new African markets while building strategic partnerships with Australian organisations and international stakeholders.",
    },
    {
      imageSrc: "/images/highlights/startups-technology-showcase.jpg",
      icon: Lightbulb,
      title: "Technology showcase",
      description:
        "Present products, platforms and solutions directly to governments, utilities, project developers and industry leaders.",
    },
    {
      imageSrc: "/images/highlights/startups-commercial-partnerships.jpg",
      icon: Users,
      title: "Commercial partnerships",
      description:
        "Build relationships with organisations capable of supporting pilot projects, commercial deployments and long-term business growth.",
    },
    {
      imageSrc: "/images/highlights/startups-industry-insights.jpg",
      icon: BookOpen,
      title: "Industry & market insights",
      description:
        "Gain valuable insight into regulatory developments, customer needs, investment priorities and emerging clean energy markets.",
    },
    {
      imageSrc: "/images/highlights/startups-scale-innovation.jpg",
      icon: Zap,
      title: "Scaling innovation",
      description:
        "Explore opportunities across renewable energy, AI, smart grids, battery storage, hydrogen, mobility and sustainable infrastructure.",
    },
  ],

  whyMattersSubheading:
    "Building the partnerships that help innovation scale",

  outcomes: [
    "Connect with investors actively seeking innovative clean energy businesses and scalable technologies.",
    "Meet governments, utilities and industry leaders looking for solutions to real-world energy challenges.",
    "Showcase products, technologies and services to decision-makers responsible for major energy and infrastructure projects.",
    "Explore partnership opportunities with established companies, research institutions and international organisations.",
    "Gain insight into renewable energy, smart grids, battery storage, hydrogen, digital energy platforms and sustainable infrastructure markets.",
    "Learn from successful founders, business leaders and industry experts who have scaled energy ventures.",
    "Build relationships supporting pilot projects, commercial deployments and long-term business growth.",
    "Expand into Africa's rapidly growing clean energy ecosystem while developing international partnerships with Australian organisations.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Investors, governments, utilities, corporations and innovators creating commercial partnership opportunities.",
    },
    {
      value: "2",
      description:
        "International conference editions connecting African innovation with Australian expertise and investment.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: Lightbulb,
      title: "Clean energy startups",
      description:
        "Startups developing innovative renewable energy products, technologies and services.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: Leaf,
      title: "Climate technology companies",
      description:
        "Businesses advancing climate solutions, sustainability technologies and environmental innovation.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: Zap,
      title: "Energy software & digital platforms",
      description:
        "Companies building software, digital platforms and smart energy management solutions.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: Monitor,
      title: "AI, IoT & smart energy innovators",
      description:
        "Developers creating AI, IoT and intelligent technologies for modern energy systems.",
      color: "#EEF2FF",
      sweepColor: "#4F46E5",
    },
    {
      icon: Building2,
      title: "Battery & energy storage companies",
      description:
        "Startups focused on battery technologies, storage systems and energy management solutions.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: Globe,
      title: "Electric mobility & hydrogen ventures",
      description:
        "Businesses developing EV infrastructure, charging networks, hydrogen and emerging clean technologies.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: Users,
      title: "Entrepreneurs & SMEs",
      description:
        "Early-stage founders, growth-stage companies and SMEs expanding within the clean energy sector.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: GraduationCap,
      title: "Innovation hubs & accelerators",
      description:
        "Incubators, accelerators and entrepreneurship programmes supporting startup growth.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: TrendingUp,
      title: "Businesses seeking investment",
      description:
        "Companies pursuing strategic investment, commercial partnerships and regional expansion opportunities.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
  ],

  ctaWords: [
    "Innovation",
    "Investment",
    "Partnership",
    "Growth",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference connects entrepreneurs with investors, governments, utilities and industry leaders to accelerate commercial growth, strategic partnerships and the deployment of innovative clean energy solutions across Africa and Australia.',
},

"development-partners-ngos": {
  eyebrow: "Development Partners & NGOs",

  heading:
    "Driving sustainable development through partnership, innovation and lasting impact",

  paragraph:
    "The Clean Energy Conference Africa Australia brings together development partners, NGOs, multilateral organisations, philanthropic institutions and international cooperation agencies with governments, investors, utilities and industry leaders to accelerate sustainable energy development across Africa. Connecting Africa's development priorities with Australia's expertise in sustainable infrastructure, technical cooperation and innovation, the conference creates opportunities for partnerships that deliver measurable social, environmental and economic impact.",

  highlights: [
    {
      imageSrc: "/images/highlights/dev-cross-sector-partnerships.jpg",
      icon: Users,
      title: "Cross-sector partnerships",
      description:
        "Collaborate with governments, investors, utilities and industry leaders delivering Africa's clean energy transition.",
    },
    {
      imageSrc: "/images/highlights/dev-energy-access.jpg",
      icon: Globe,
      title: "Energy access & inclusion",
      description:
        "Support programmes expanding reliable energy access, community development and inclusive economic growth.",
    },
    {
      imageSrc: "/images/highlights/dev-climate-finance.jpg",
      icon: TrendingUp,
      title: "Climate & development finance",
      description:
        "Explore blended finance, concessional funding and project preparation mechanisms that improve implementation.",
    },
    {
      imageSrc: "/images/highlights/dev-capacity-building.jpg",
      icon: GraduationCap,
      title: "Capacity building",
      description:
        "Strengthen institutions, workforce development and technical capabilities supporting long-term energy transition.",
    },
    {
      imageSrc: "/images/highlights/dev-policy-collaboration.jpg",
      icon: Landmark,
      title: "Policy & institutional support",
      description:
        "Share expertise on policy reform, institutional strengthening and sustainable programme delivery.",
    },
    {
      imageSrc: "/images/highlights/dev-lasting-impact.jpg",
      icon: Leaf,
      title: "Sustainable impact",
      description:
        "Develop programmes that improve livelihoods, climate resilience and long-term economic development.",
    },
  ],

  whyMattersSubheading:
    "Creating partnerships that deliver sustainable development",

  outcomes: [
    "Build strategic partnerships with governments, development finance institutions, investors and industry leaders.",
    "Identify projects aligned with national development priorities and international sustainability goals.",
    "Support programmes improving energy access, climate resilience, gender inclusion and workforce development.",
    "Explore blended finance, technical assistance and project preparation facilities that strengthen implementation.",
    "Exchange best practices in policy implementation, institutional strengthening and sustainable programme delivery.",
    "Collaborate with research institutions, technology providers and private sector organisations accelerating innovation.",
    "Strengthen regional cooperation and cross-border initiatives supporting Africa's clean energy transition.",
    "Deliver measurable social, environmental and economic outcomes through coordinated partnerships and sustainable programmes.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Development organisations, governments, investors and industry leaders collaborating across both conference editions.",
    },
    {
      value: "2",
      description:
        "International editions connecting African development priorities with Australian expertise and global partnerships.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: Globe,
      title: "Multilateral organisations",
      description:
        "Global development organisations supporting sustainable infrastructure and economic development.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: Landmark,
      title: "Bilateral development agencies",
      description:
        "Government development agencies delivering international cooperation programmes.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: Users,
      title: "International development partners",
      description:
        "Organisations working alongside governments to deliver long-term development initiatives.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: Globe,
      title: "UN agencies & international organisations",
      description:
        "United Nations agencies and affiliated international organisations supporting sustainable development.",
      color: "#EEF2FF",
      sweepColor: "#4F46E5",
    },
    {
      icon: Leaf,
      title: "NGOs & environmental organisations",
      description:
        "International, regional and community organisations advancing climate resilience and sustainability.",
      color: "#F0FDF4",
      sweepColor: "#16A34A",
    },
    {
      icon: TrendingUp,
      title: "Foundations & development finance",
      description:
        "Philanthropic foundations, development finance providers and technical assistance organisations.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: GraduationCap,
      title: "Capacity-building organisations",
      description:
        "Institutions supporting workforce development, education and technical capacity programmes.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: BookOpen,
      title: "Research & policy organisations",
      description:
        "Research-for-development institutes, policy organisations and knowledge partners.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: Users,
      title: "Civil society organisations",
      description:
        "Civil society groups working across energy, climate, sustainability and community development.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: Star,
      title: "Development professionals",
      description:
        "Programme managers, development specialists and international cooperation professionals.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
  ],

  ctaWords: [
    "Impact",
    "Partnership",
    "Development",
    "Collaboration",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference brings together development partners, governments, investors and industry to strengthen collaboration, mobilise resources and deliver programmes that improve energy access, climate resilience and sustainable development across Africa and Australia.',
},

"industry-associations-chambers": {
  eyebrow: "Industry Associations & Chambers",

  heading:
    "Strengthening industry collaboration to accelerate Africa's clean energy transition",

  paragraph:
    "The Clean Energy Conference Africa Australia brings together industry associations, professional bodies and chambers of commerce with governments, investors, utilities, technology providers and project developers to strengthen collaboration across Africa's clean energy sector. By connecting Africa's expanding energy markets with Australia's expertise in renewable technologies, engineering, mining and infrastructure, the conference helps industry organisations create partnerships that benefit their members while supporting sustainable economic growth.",

  highlights: [
    {
      imageSrc: "/images/highlights/associations-industry-networking.jpg",
      icon: Users,
      title: "Industry collaboration",
      description:
        "Connect industry associations, business chambers and professional bodies with key decision-makers across the clean energy ecosystem.",
    },
    {
      imageSrc: "/images/highlights/associations-policy-dialogue.jpg",
      icon: Landmark,
      title: "Policy & industry dialogue",
      description:
        "Engage directly with policymakers, regulators and industry leaders shaping the future of Africa's energy sector.",
    },
    {
      imageSrc: "/images/highlights/associations-cross-border-partnerships.jpg",
      icon: Globe,
      title: "Cross-border partnerships",
      description:
        "Strengthen collaboration between African and Australian businesses, institutions and industry organisations.",
    },
    {
      imageSrc: "/images/highlights/associations-business-growth.jpg",
      icon: TrendingUp,
      title: "Member business growth",
      description:
        "Help members access new markets, investment opportunities and strategic commercial partnerships.",
    },
    {
      imageSrc: "/images/highlights/associations-best-practice.jpg",
      icon: BookOpen,
      title: "Knowledge & best practice",
      description:
        "Exchange insights on regulation, standards, workforce development, innovation and sustainable industry growth.",
    },
    {
      imageSrc: "/images/highlights/associations-industry-advocacy.jpg",
      icon: Building2,
      title: "Industry advocacy",
      description:
        "Strengthen industry representation while supporting policies that encourage investment and long-term competitiveness.",
    },
  ],

  whyMattersSubheading:
    "Creating stronger industries through strategic collaboration",

  outcomes: [
    "Build strategic partnerships with governments, investors and international industry organisations.",
    "Represent member organisations within high-level policy, regulatory and industry discussions.",
    "Identify emerging market opportunities across the clean energy value chain.",
    "Facilitate cross-border collaboration between African and Australian businesses and institutions.",
    "Support members in accessing new markets, partnerships and investment opportunities.",
    "Exchange best practices on regulation, workforce development, standards, innovation and industrial growth.",
    "Promote collaboration between businesses, research institutions, government agencies and development organisations.",
    "Strengthen regional industry ecosystems that improve competitiveness, encourage innovation and accelerate clean energy deployment.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Business leaders, policymakers, investors and industry stakeholders creating opportunities for collaboration.",
    },
    {
      value: "2",
      description:
        "International conference editions connecting African industry with Australian expertise and global partnerships.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: Building2,
      title: "Chambers of commerce",
      description:
        "National and regional chambers supporting business growth, investment and international trade.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: Leaf,
      title: "Renewable energy associations",
      description:
        "Industry bodies representing renewable energy companies and clean technology businesses.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: Zap,
      title: "Power & electricity associations",
      description:
        "Organisations representing utilities, electricity providers and power sector stakeholders.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: Globe,
      title: "Mining & industrial associations",
      description:
        "Associations supporting mining, critical minerals, manufacturing and industrial development.",
      color: "#EEF2FF",
      sweepColor: "#4F46E5",
    },
    {
      icon: Users,
      title: "Engineering & construction bodies",
      description:
        "Professional organisations representing engineering, EPC and construction industries.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: Lightbulb,
      title: "Technology & innovation organisations",
      description:
        "Associations promoting technology innovation, digital transformation and emerging energy solutions.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: Leaf,
      title: "Sustainability organisations",
      description:
        "Industry groups advancing sustainability, climate action and responsible business practices.",
      color: "#F0FDF4",
      sweepColor: "#16A34A",
    },
    {
      icon: BookOpen,
      title: "Professional institutions & councils",
      description:
        "Engineering institutions, export councils, business councils and trade promotion organisations.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: Users,
      title: "Industry networks & alliances",
      description:
        "Business membership organisations, sector alliances and collaborative industry networks.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: TrendingUp,
      title: "Association leaders",
      description:
        "Association executives, policy directors and business development leaders driving industry growth.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
  ],

  ctaWords: [
    "Collaboration",
    "Advocacy",
    "Growth",
    "Partnership",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference empowers industry associations and chambers to strengthen advocacy, expand international partnerships and create collaborative ecosystems that accelerate clean energy investment, innovation and sustainable economic growth across Africa and Australia.',
},

"media-communications": {
  eyebrow: "Media & Communications",

  heading:
    "Telling the stories driving Africa's clean energy future",

  paragraph:
    "The Clean Energy Conference Africa Australia brings together journalists, editors, broadcasters and communications professionals with ministers, policymakers, investors, utilities, technology leaders and researchers shaping Africa's energy transition. Hosted in Kigali and Perth, the conference provides direct access to the announcements, partnerships and industry developments influencing the future of clean energy across Africa and Australia.",

  highlights: [
    {
      imageSrc: "/images/highlights/media-exclusive-access.jpg",
      icon: Newspaper,
      title: "Exclusive access",
      description:
        "Meet ministers, CEOs, policymakers, investors and industry leaders driving Africa's clean energy transformation.",
    },
    {
      imageSrc: "/images/highlights/media-breaking-announcements.jpg",
      icon: Landmark,
      title: "Policy & investment announcements",
      description:
        "Report on major policy reforms, investment commitments and strategic partnerships announced throughout the conference.",
    },
    {
      imageSrc: "/images/highlights/media-energy-innovation.jpg",
      icon: Lightbulb,
      title: "Emerging technologies",
      description:
        "Discover innovations in renewable energy, hydrogen, battery storage, AI, smart grids and sustainable infrastructure.",
    },
    {
      imageSrc: "/images/highlights/media-global-perspectives.jpg",
      icon: Globe,
      title: "Africa–Australia collaboration",
      description:
        "Cover the partnerships connecting African opportunities with Australian expertise in clean energy, mining and infrastructure.",
    },
    {
      imageSrc: "/images/highlights/media-interviews-networking.jpg",
      icon: Users,
      title: "Interviews & networking",
      description:
        "Build relationships with government leaders, researchers, utilities and businesses for future reporting and collaboration.",
    },
    {
      imageSrc: "/images/highlights/media-storytelling-impact.jpg",
      icon: BookOpen,
      title: "Stories that matter",
      description:
        "Capture the people, partnerships and projects driving Africa's clean energy transition beyond the headlines.",
    },
  ],

  whyMattersSubheading:
    "Connecting media with the leaders shaping the energy transition",

  outcomes: [
    "Conduct interviews with ministers, policymakers, CEOs, investors and internationally recognised industry experts.",
    "Report on policy announcements, investment commitments and strategic partnerships emerging from the conference.",
    "Discover renewable energy projects, infrastructure developments and clean technology innovations transforming African markets.",
    "Gain expert insight into renewable energy, climate finance, hydrogen, critical minerals and sustainable mining.",
    "Access evidence-based perspectives that strengthen reporting and industry analysis.",
    "Build long-term relationships with organisations seeking trusted media and communications partners.",
    "Produce compelling stories highlighting innovation, collaboration and sustainable development.",
    "Expand professional networks with media organisations, communications specialists and industry stakeholders.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Decision-makers, policymakers, investors and industry experts available for interviews and coverage.",
    },
    {
      value: "2",
      description:
        "International conference editions connecting African and Australian clean energy leaders.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: Newspaper,
      title: "Journalists & reporters",
      description:
        "Energy, infrastructure, business and environmental journalists covering the sector.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: BookOpen,
      title: "Editors & news organisations",
      description:
        "Editorial teams and publishers delivering news and industry analysis.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: Monitor,
      title: "Broadcast & digital media",
      description:
        "Television, radio, podcast and digital media professionals.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: TrendingUp,
      title: "Business & financial media",
      description:
        "Journalists covering investment, finance, infrastructure and economic development.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: Leaf,
      title: "Climate & sustainability media",
      description:
        "Professionals reporting on climate action, renewable energy and environmental issues.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: Users,
      title: "Communications professionals",
      description:
        "Corporate communications, public relations and stakeholder engagement specialists.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: Globe,
      title: "Government communications",
      description:
        "Public sector communications teams supporting policy and infrastructure initiatives.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: Lightbulb,
      title: "Content creators & filmmakers",
      description:
        "Documentary producers, creators and storytellers showcasing innovation and impact.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
  ],

  ctaWords: [
    "Stories",
    "Insight",
    "Access",
    "Impact",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference gives media professionals a front-row seat to the people, partnerships and projects transforming Africa\'s clean energy future, enabling accurate reporting, stronger industry connections and meaningful storytelling.',
},
};