export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href?: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    label: "Conference",
    children: [
      { label: "Conference Overview", href: "/conference" },
      { label: "Why Attend", href: "/conference/why-attend" },
      { label: "Testimonials", href: "/conference/testimonials" },
    ],
  },
  {
    label: "Event",
    children: [
      { label: "Event Overview", href: "/event" },
      { label: "Programme", href: "/event/programme" },
      { label: "Venue", href: "/event/venue" },
      { label: "Future Events", href: "/event/future-events" },
    ],
  },
  {
  label: "Media",
  children: [
    { label: "Gallery", href: "/media/gallery" },
    { label: "Highlights", href: "/media/highlights" },
    { label: "News and Articles", href: "/media/news" },
  ],
},
  {
  label: "Partners",
  children: [
    { label: "Partners & Sponsors", href: "/partners" },
    { label: "Become a Partner / Sponsor", href: "/partners/become-a-partner" },
  ],
},
  {
    label: "Speakers",
    href: "/speakers",
  },

  {
    label: "Programme",
    href: "/event/programme",
  },

{
    label: "Visa",
    href: "/visa",
  },

  {
    label: "Contact",
    children: [
      { label: "Contact Us", href: "/contact" },
    ],
  },
 {
  label: "Tickets",
  children: [
    {
      label: "🎟 Rwanda (Kigali)",
      href: "https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator",
    },
    {
      label: "🎟 Australia (Perth)",
      href: "https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator",
    },
  ],
},
];