export interface BlogData {
  category: string;
  // Used to group blogs into sections on the listing page.
  // e.g. "Investment", "Policy", "Conferences", "Green Hydrogen", "Geothermal"
  // Add a brand-new string here to automatically create a brand-new section.
  primaryCategory: string;
  title: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  readTime: string;
  location: string;
  heroImage: string;
  imageAlt: string;
  tableOfContents: string[];
  investmentAreas: string[];
  drivers: { title: string; text: string }[];
  focusSectors: { title: string; text: string; opportunities: string[] }[];
  countries: string[];
  investorConsiderations: string[];
  partnershipGroups: string[];
  conferenceBenefits: string[];
  featuredEventTopics: string[];
  featuredEventAudience: string[];
  faqs: { question: string; answer: string }[];
  relatedPosts: { title: string; meta: string; href: string }[];
}