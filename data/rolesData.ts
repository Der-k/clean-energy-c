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
        imageSrc: "/images/highlights/aa.png",
        imageAlt: "Africa Australia partnership",
        icon: Globe,
        title: "Africa–Australia platform",
        description: "A meeting point for governments, investors, utilities and innovators working to speed up Africa's clean energy transition."
      },
      {
        imageSrc: "/images/highlights/energy.png",
        imageAlt: "Energy, mining and infrastructure",
        icon: Zap,
        title: "Energy, mining & infrastructure",
        description: "Covering renewable energy, critical minerals, grid modernisation, green hydrogen and sustainable infrastructure."
      },
      {
        imageSrc: "/images/highlights/cooperation.png",
        imageAlt: "Networking and connections",
        icon: Users,
        title: "Real connections",
        description: "Meet ministers, regulators, investors, utilities and technology leaders shaping the region's energy future."
      },
      {
        imageSrc: "/images/highlights/future.png",
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
        color: "#020266"
      },
      {
        value: "2",
        description: "Strategic 2026 editions in Kigali and Perth, connecting Africa's resources with Australia's expertise.",
        color: "#009966"
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
      imageSrc:
      "/images/highlights/dialogue.png",
      icon: Landmark,
      title: "Ministerial dialogue platform",
      description:
        "Engage directly with governments, investors, development partners and industry leaders accelerating renewable energy deployment and regional cooperation.",
    },
    {
      imageSrc:
      "/images/highlights/policy.png", icon: Zap,
      title: "Policy & regulatory reform",
      description:
        "Explore regulatory reform, energy market development, climate finance and infrastructure planning that create investment-ready environments.",
    },
    {
      imageSrc:
      "/images/highlights/patnership.png",icon: Users,
      title: "Public-private partnerships",
      description:
        "Learn how successful PPP models reduce implementation risk while accelerating delivery of critical energy infrastructure.",
    },
    {
     imageSrc:
      "/images/highlights/cooperation.png", icon: Globe,
      title: "Regional energy cooperation",
      description:
        "Strengthen cross-border collaboration, regional power integration and institutional partnerships supporting long-term energy security.",
    },
    {
    imageSrc:
      "/images/highlights/int.png",  icon: BookOpen,
      title: "International best practice",
      description:
        "Gain practical insights from governments, utilities and industry leaders delivering measurable progress across renewable energy and electricity market reform.",
    },
    {
      imageSrc:
      "/images/highlights/target.png",icon: Leaf,
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
      color: "#020266",
    },
    {
      value: "2",
      description:
        "Strategic 2026 editions connecting African policymakers with Australian expertise.",
      color: "#009966",
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
       imageSrc:
      "/images/highlights/invesment.png",
      icon: TrendingUp,
      title: "Investment-ready projects",
      description:
        "Discover bankable opportunities across renewable energy, transmission, storage, green hydrogen, sustainable mining and critical minerals.",
    },
    {
     imageSrc:
      "/images/highlights/dialogue.png",icon: Landmark,
      title: "Direct government engagement",
      description:
        "Meet policymakers creating investment-ready regulatory environments and accelerating project development.",
    },
    {
    imageSrc:
      "/images/highlights/project.png",icon: Building2,
      title: "Project showcases",
      description:
        "Engage with developers advancing infrastructure projects and seeking strategic capital for implementation.",
    },
    {
      imageSrc:
      "/images/highlights/finance.png",  icon: Globe,
      title: "Finance & investment structures",
      description:
        "Explore blended finance, climate finance, ESG frameworks and public-private partnership models that improve project bankability.",
    },
    {
     imageSrc:
      "/images/highlights/intelligence.png",icon: BookOpen,
      title: "Market intelligence",
      description:
        "Gain insight into emerging market trends, regulatory developments and investment strategies shaping Africa's energy economy.",
    },
    {
     imageSrc:
      "/images/highlights/aa.png",icon: Users,
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
    imageSrc:
      "/images/highlights/energy.png", icon: Zap,
      title: "Future energy infrastructure",
      description:
        "Discover upcoming renewable energy, transmission, distribution and large-scale infrastructure projects across Africa.",
    },
    {
     imageSrc:
      "/images/highlights/grid.png", icon: Globe,
      title: "Grid modernisation",
      description:
        "Explore smart grids, battery storage, digitalisation and advanced energy management systems strengthening network resilience.",
    },
    {
    imageSrc:
      "/images/highlights/patnership.png", icon: Users,
      title: "Strategic partnerships",
      description:
        "Connect with governments, investors, project developers and technology providers shaping Africa's energy future.",
    },
    {
    imageSrc:
      "/images/highlights/renewable.png", icon: Leaf,
      title: "Renewable integration",
      description:
        "Learn practical approaches to integrating renewable generation while improving operational efficiency and energy security.",
    },
    {
      imageSrc:
      "/images/highlights/tech.png", icon: Lightbulb,
      title: "Emerging technologies",
      description:
        "Explore hydrogen, sustainable mining, critical minerals and next-generation clean energy technologies transforming the sector.",
    },
    {
      imageSrc:
      "/images/highlights/growth.png",icon: TrendingUp,
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
      imageSrc:
      "/images/highlights/research.png", icon: BookOpen,
      title: "Research influencing policy",
      description:
        "Share evidence-based research that informs energy policy, infrastructure planning and sustainable development strategies.",
    },
    {
    imageSrc:
      "/images/highlights/int.png", icon: Globe,
      title: "International collaboration",
      description:
        "Build long-term research partnerships connecting African and Australian universities, institutes and innovation centres.",
    },
    {
   imageSrc:
      "/images/highlights/research.png", icon: TrendingUp,
      title: "Research to commercialisation",
      description:
        "Connect with industry partners seeking applied research, technology development and commercial innovation.",
    },
    {
    imageSrc:
      "/images/highlights/tech.png",  icon: Lightbulb,
      title: "Emerging technologies",
      description:
        "Explore renewable energy, battery storage, hydrogen, smart grids, sustainable mining and digital energy systems.",
    },
    {
      imageSrc:
      "/images/highlights/knowledge.png",  icon: Users,
      title: "Knowledge exchange",
      description:
        "Participate in technical forums, expert panels and collaborative workshops with leading researchers and industry experts.",
    },
    {
      imageSrc:
      "/images/highlights/future.png", icon: GraduationCap,
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
    imageSrc:
      "/images/highlights/invesment.png", icon: TrendingUp,
      title: "Investor access",
      description:
        "Connect with investors and funding partners actively seeking scalable clean energy technologies and innovative businesses.",
    },
    {
     imageSrc:
      "/images/highlights/target.png",  icon: Globe,
      title: "Regional market expansion",
      description:
        "Access new African markets while building strategic partnerships with Australian organisations and international stakeholders.",
    },
    {
      imageSrc:
      "/images/highlights/tech.png", icon: Lightbulb,
      title: "Technology showcase",
      description:
        "Present products, platforms and solutions directly to governments, utilities, project developers and industry leaders.",
    },
    {
      imageSrc:
      "/images/highlights/patnership.png", icon: Users,
      title: "Commercial partnerships",
      description:
        "Build relationships with organisations capable of supporting pilot projects, commercial deployments and long-term business growth.",
    },
    {
      imageSrc:
      "/images/highlights/intelligence.png", icon: BookOpen,
      title: "Industry & market insights",
      description:
        "Gain valuable insight into regulatory developments, customer needs, investment priorities and emerging clean energy markets.",
    },
    {
      imageSrc:
      "/images/highlights/inn.png",icon: Zap,
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

"technology-solution-providers": {
  eyebrow: "Technology & Solution Providers",

  heading:
    "Delivering the technologies powering Africa's clean energy future",

  paragraph:
    "The Clean Energy Conference Africa Australia connects technology companies, equipment manufacturers, engineering firms, software developers and solution providers with governments, utilities, investors and infrastructure leaders driving Africa's energy transition. Hosted in Kigali and Perth, the conference creates opportunities to showcase innovation, establish strategic partnerships and expand into rapidly growing clean energy markets across Africa and Australia.",

  highlights: [
    {
      imageSrc: "/images/highlights/tech.png",
      icon: Lightbulb,
      title: "Next-generation technologies",
      description:
        "Discover and demonstrate solutions spanning renewable energy, battery storage, smart grids, AI, hydrogen and digital energy systems.",
    },
    {
      imageSrc: "/images/highlights/market.png",
      icon: Globe,
      title: "Market expansion",
      description:
        "Access high-growth African energy markets through direct engagement with governments, utilities and project developers.",
    },
    {
      imageSrc: "/images/highlights/patnership.png",
      icon: Users,
      title: "Commercial partnerships",
      description:
        "Build strategic relationships with investors, EPC contractors, engineering firms and infrastructure owners.",
    },
    {
      imageSrc: "/images/highlights/Procurement.png",
      icon: TrendingUp,
      title: "Procurement opportunities",
      description:
        "Gain insight into procurement pipelines, infrastructure priorities and technology investment trends across African markets.",
    },
    {
      imageSrc: "/images/highlights/globe.png",
      icon: Zap,
      title: "Real-world deployment",
      description:
        "Show how integrated technologies improve efficiency, reliability, operational performance and long-term infrastructure resilience.",
    },
    {
      imageSrc: "/images/highlights/growth.png",
      icon: BookOpen,
      title: "Long-term strategic growth",
      description:
        "Position your organisation as a trusted technology partner supporting national energy transition and sustainable industrial development.",
    },
  ],

  whyMattersSubheading:
    "Turning innovation into real-world deployment",

  outcomes: [
    "Showcase innovative technologies and integrated solutions to governments, utilities, investors and project developers.",
    "Connect directly with decision-makers responsible for procuring energy infrastructure and engineering solutions.",
    "Identify commercial opportunities across renewable energy, battery storage, hydrogen, transmission, distribution and smart grids.",
    "Build partnerships with EPC contractors, engineering firms, utilities, distributors and implementation partners.",
    "Understand procurement priorities, regulatory developments and technology trends shaping future infrastructure investment.",
    "Demonstrate how your solutions improve operational performance, increase efficiency and strengthen system resilience.",
    "Position your organisation as a trusted long-term technology partner supporting national energy transition goals.",
    "Expand into emerging African markets through collaboration with governments, investors and industry leaders.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Government, utility, investor and infrastructure leaders seeking proven clean energy technologies.",
    },
    {
      value: "2",
      description:
        "Strategic conference editions connecting African markets with Australian innovation and engineering expertise.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: Lightbulb,
      title: "Renewable technology companies",
      description:
        "Businesses developing renewable energy equipment and clean energy technologies.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: Zap,
      title: "Equipment manufacturers",
      description:
        "Solar, wind, hydro, battery storage and electrical equipment manufacturers.",
      color: "#ECFDF5",
      sweepColor: "#10B981",
    },
    {
      icon: Monitor,
      title: "Software & AI providers",
      description:
        "Energy software, AI platforms, digital solutions, IoT and analytics providers.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: Globe,
      title: "Smart grid specialists",
      description:
        "Grid automation, digital energy management and transmission technology providers.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: Building2,
      title: "Engineering & EPC firms",
      description:
        "Engineering, procurement, construction and technology integration organisations.",
      color: "#ECFEFF",
      sweepColor: "#0891B2",
    },
    {
      icon: Leaf,
      title: "Hydrogen & clean mobility",
      description:
        "Green hydrogen, EV charging, industrial automation and energy efficiency specialists.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
    {
      icon: TrendingUp,
      title: "Infrastructure solution providers",
      description:
        "System integrators, distributors and organisations delivering scalable energy infrastructure solutions.",
      color: "#FDF2F8",
      sweepColor: "#DB2777",
    },
    {
      icon: BookOpen,
      title: "Sustainability technology providers",
      description:
        "Environmental monitoring, climate technology and sustainability solution companies.",
      color: "#F3F4F6",
      sweepColor: "#4B5563",
    },
  ],

  ctaWords: [
    "Innovation",
    "Technology",
    "Deployment",
    "Growth",
  ],

  bannerParagraph:
    'Guided by the 2026 theme, "Turning Ambition into Action," the conference helps technology providers transform innovation into commercial deployment by connecting them with the governments, utilities, investors and infrastructure leaders building Africa\'s next generation of clean energy systems.',
},

"development-partners-ngos": {
  eyebrow: "Development Partners & NGOs",

  heading:
    "Driving sustainable development through partnership, innovation and lasting impact",

  paragraph:
    "The Clean Energy Conference Africa Australia brings together development partners, NGOs, multilateral organisations, philanthropic institutions and international cooperation agencies with governments, investors, utilities and industry leaders to accelerate sustainable energy development across Africa. Connecting Africa's development priorities with Australia's expertise in sustainable infrastructure, technical cooperation and innovation, the conference creates opportunities for partnerships that deliver measurable social, environmental and economic impact.",

  highlights: [
    {
       imageSrc: "/images/highlights/patnership.png",  icon: Users,
      title: "Cross-sector partnerships",
      description:
        "Collaborate with governments, investors, utilities and industry leaders delivering Africa's clean energy transition.",
    },
    {
        imageSrc: "/images/highlights/globe.png", icon: Globe,
      title: "Energy access & inclusion",
      description:
        "Support programmes expanding reliable energy access, community development and inclusive economic growth.",
    },
    {
        imageSrc: "/images/highlights/future.png",icon: TrendingUp,
      title: "Climate & development finance",
      description:
        "Explore blended finance, concessional funding and project preparation mechanisms that improve implementation.",
    },
    {
        imageSrc: "/images/highlights/Procurement.png", icon: GraduationCap,
      title: "Capacity building",
      description:
        "Strengthen institutions, workforce development and technical capabilities supporting long-term energy transition.",
    },
    {
       imageSrc: "/images/highlights/Procurement.png",icon: Landmark,
      title: "Policy & institutional support",
      description:
        "Share expertise on policy reform, institutional strengthening and sustainable programme delivery.",
    },
    {
       imageSrc: "/images/highlights/leaf.png",  icon: Leaf,
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
    imageSrc:
      "/images/highlights/cooperation.png",
    // Engineers inspecting wind turbines together
    icon: Users,
    title: "Industry collaboration",
    description:
      "Connect industry associations, business chambers and professional bodies with key decision-makers across the clean energy ecosystem.",
  },
  {
      imageSrc: "/images/highlights/dialogue.png",
    icon: Landmark,
    title: "Policy & industry dialogue",
    description:
      "Engage directly with policymakers, regulators and industry leaders shaping the future of Africa's energy sector.",
  },
  {
      imageSrc: "/images/highlights/globe.png",
    icon: Globe,
    title: "Cross-border partnerships",
    description:
      "Strengthen collaboration between African and Australian businesses, institutions and industry organisations.",
  },
  {
      imageSrc: "/images/highlights/future.png",
    icon: TrendingUp,
    title: "Member business growth",
    description:
      "Help members access new markets, investment opportunities and strategic commercial partnerships.",
  },
  {
     imageSrc: "/images/highlights/knowledge.png",
    icon: BookOpen,
    title: "Knowledge & best practice",
    description:
      "Exchange insights on regulation, standards, workforce development, innovation and sustainable industry growth.",
  },
  {
      imageSrc: "/images/highlights/industry.png",
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
    "Telling the stories driving the clean energy transition",

  paragraph:
    "The Clean Energy Conference brings together journalists, editors, broadcasters, and communications professionals with global ministers, policymakers, institutional investors, utilities, technology leaders, and researchers. The event provides direct access to the major announcements, international partnerships, and industrial developments defining the future of global renewable energy, infrastructure, and climate technology.",

  highlights: [
    {
       imageSrc: "/images/highlights/exc.png", icon: Newspaper,
      title: "Exclusive access",
      description:
        "Engage directly with global ministers, corporate executives, policymakers, and key institutional investors leading the energy transition.",
    },
    {
       imageSrc: "/images/highlights/policy.png",icon: Landmark,
      title: "Policy & investment announcements",
      description:
        "Break exclusive coverage on major policy reforms, capital allocations, and strategic cross-border partnerships announced live.",
    },
    {
      imageSrc: "/images/highlights/tech.png", icon: Lightbulb,
      title: "Emerging technologies",
      description:
        "Discover real-world applications of utility-scale renewables, hydrogen, battery storage solutions, smart grids, and AI integration.",
    },
    {
       imageSrc: "/images/highlights/globe.png",icon: Globe,
      title: "International collaboration",
      description:
        "Analyze the cross-border trade pipelines, supply chains, and international joint ventures scaling sustainable infrastructure globally.",
    },
    {
       imageSrc: "/images/highlights/cooperation.png",icon: Users,
      title: "Interviews & networking",
      description:
        "Establish direct channels with utility executives, public sector officials, and research directors for long-term reporting insights.",
    },
    {
        imageSrc: "/images/highlights/knowledge.png", icon: BookOpen,
      title: "Stories that matter",
      description:
        "Uncover complex, data-driven insights behind infrastructure scaling, climate finance deployments, and technological breakthroughs.",
    },
  ],

  whyMattersSubheading:
    "Connecting modern media with the executives shaping global infrastructure",

  outcomes: [
    "Conduct structured interviews with high-level ministers, energy CEOs, and institutional fund managers.",
    "Report on market-moving policy changes, major infrastructure projects, and strategic joint ventures.",
    "Gain exclusive insight into grid monetization, carbon markets, green hydrogen, and critical supply chain frameworks.",
    "Access verified, evidence-based research and technical analysis to strengthen editorial depth.",
    "Build resilient corporate connections with cross-industry communication teams and media leads.",
  ],

  stats: [
    {
      value: "600+",
      description:
        "Industry delegates, public officials, financial leaders, and sector experts accessible for targeted coverage.",
    },
    {
      value: "Enterprise",
      description:
        "An international forum designed to bridge global capital with scalable renewable energy projects.",
    },
  ],

  audienceLabel: "Who this is for",

  audience: [
    {
      icon: Newspaper,
      title: "Journalists & editors",
      description:
        "Energy, infrastructure, commodity markets, and climate technology reporters.",
      color: "#EFF6FF",
      sweepColor: "#2563EB",
    },
    {
      icon: Monitor,
      title: "Broadcast & digital networks",
      description:
        "Television, radio, corporate podcast networks, and financial news syndicates.",
      color: "#FFF7ED",
      sweepColor: "#F97316",
    },
    {
      icon: TrendingUp,
      title: "Financial & market analysts",
      description:
        "Industry analysts, institutional researchers, and market intelligence publishers.",
      color: "#F5F3FF",
      sweepColor: "#8B5CF6",
    },
    {
      icon: Users,
      title: "Communications directors",
      description:
        "Corporate public relations, utility communications teams, and investor relations officers.",
      color: "#FEFCE8",
      sweepColor: "#CA8A04",
    },
  ],

  ctaWords: [
    "Coverage",
    "Insights",
    "Access",
    "Analysis",
  ],

  bannerParagraph:
    'Anchored in the operational reality of moving "From Strategy to Execution," this event provides global media professionals, analysts, and enterprise communicators a front-row view into the capital investments and technical engineering defining the next era of clean energy infrastructure.',
}

};