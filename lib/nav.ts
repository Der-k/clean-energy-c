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
      
    ],
  },
  {
    label: "Event",
    children: [
      { label: "Event Overview", href: "/event" },
      { label: "Programme", href: "/event/programme" },
      { label: "Venue", href: "/event/venue" },
      { label: "Exhibitions", href: "/event/exhibition" },
    ],
  },
  {
  label: "Media",
  children: [
    { label: "Gallery", href: "/media/gallery" },
    { label: "Highlights", href: "/media/highlights" },
    { label: "Blogs and Articles", href: "/media/news" },
    
  ],
},
  {
  label: "Partners",
  children: [
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
 
];