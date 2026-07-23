"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import { navItems } from "@/lib/nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useHideOnScroll } from "@/hooks/use-hide-on-scroll";

// Brand/social icons were removed from lucide-react (deprecated in v1),
// so these are plain inline SVGs instead of lucide imports.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8a4 4 0 0 1 3.37 3.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.6 5.82c-1.02-.9-1.6-2.19-1.6-3.6h-3.15v13.4a2.7 2.7 0 1 1-2.7-2.7c.2 0 .4.02.6.06V9.72a5.85 5.85 0 0 0-.6-.03A5.85 5.85 0 1 0 15 15.62V9.4a7.06 7.06 0 0 0 4.15 1.33V7.6c-.9 0-1.75-.28-2.55-.7a5.6 5.6 0 0 1-.6-.38 4.6 4.6 0 0 1-.4-.3z" />
    </svg>
  );
}

// Social links — update here if profiles ever change
const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cleanenergyconference.au/",
    icon: InstagramIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/clean-energy-conference-a26aa03b7/",
    icon: LinkedinIcon,
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@cleanenergyconferenceau?lang=en",
    icon: TikTokIcon,
  },
];

function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="
            group inline-flex h-11 w-11 items-center justify-center
            rounded-full
            border border-white/20
            bg-white/5
            text-white/80
            transition-all duration-300 ease-out
            hover:text-white
            hover:bg-white/15
            hover:border-white/40
            hover:scale-110
          "
        >
          <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
        </a>
      ))}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const visible = useHideOnScroll(() => setMobileOpen(false));

  return (
   <header
  className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#02026e]/95 backdrop-blur-md text-white transition-all duration-300 overflow-visible ${
    visible ? "translate-y-0" : "-translate-y-full"
  }`}
>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex min-h-[96px] items-center justify-between py-2">

{/* LOGO */}
<Link href="/" className="shrink-0 relative z-10 -ml-4 md:-ml-14">
  <Image
    src="/images/logo_4.png"
    alt="Clean Energy Conference"
    width={320}
    height={170}
    className="
      h-32 md:h-36 w-auto object-contain
      -mb-10 md:-mb-12
      drop-shadow-[0_12px_25px_rgba(0,0,0,0.28)]
    "
    priority
  />
</Link>

        {/* NAV */}
<nav className="hidden xl:flex items-center gap-6">
  {navItems.map((item) =>
    item.children ? (
      <DesktopDropdown
        key={item.label}
        label={item.label}
        items={item.children}
      />
    ) : (
      <Link
        key={item.label}
        href={item.href!}
        className="
          px-3 py-2
          text-[17px]
          font-medium
          tracking-wide
          text-white/70
          transition-colors duration-200
          hover:text-white
        "
      >
        {item.label}
      </Link>
    )
  )}
</nav>

      {/* CTA + SOCIAL */}
<div className="hidden xl:flex items-center gap-6">
  <a
    href="/get-tickets"
   
    className="
      group relative inline-flex items-center justify-center gap-2
      overflow-hidden

      rounded-full px-7 py-3 text-[16px] font-semibold

      text-[#02026e]
      bg-white

      border border-[#02026e]/35

      shadow-[0_10px_25px_rgba(15,23,42,0.08)]

      transition-all duration-500 ease-out

      hover:text-white
      hover:border-[#009966]

      hover:shadow-[0_18px_50px_rgba(0,153,102,0.28)]
      hover:scale-[1.05]

      active:scale-[0.97]

      focus:outline-none
      focus:ring-2
      focus:ring-[#009966]/35
      focus:ring-offset-2
    "
  >
    {/* FULL emerald sweep */}
    <span className="absolute inset-0 rounded-full overflow-hidden">
      <span
        className="
          absolute left-0 top-0 h-full w-0

          bg-gradient-to-r
          from-[#007a55]
          via-[#009966]
          to-[#00b377]

          transition-all duration-500 ease-out

          group-hover:w-full
        "
      />
    </span>

    <span className="relative z-10">Join Conference</span>

    <ArrowRight
      className="
        relative z-10 h-4 w-4
        transition-all duration-300
        group-hover:translate-x-1
      "
    />
  </a>

  <span className="h-6 w-px bg-white/15" />

  <SocialLinks />
</div>
          {/* MOBILE */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((p) => !p)}
            className="inline-flex h-12 w-12 items-center justify-center xl:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="group relative">
      <button className="
        flex items-center gap-1
        px-3 py-2
        text-[17px]
        font-medium
        tracking-wide
        text-white/70
        transition-colors duration-200
        hover:text-white
      ">
        {label}
        <ChevronDown className="h-4 w-4 opacity-60 transition group-hover:rotate-180" />
      </button>

      <div className="
        invisible absolute left-0 top-full mt-2 w-56
        rounded-xl
        border border-white/10
        bg-[#0a0a2e]/90
        backdrop-blur-md
        p-2
        opacity-0
        transition-all duration-200
        group-hover:visible group-hover:opacity-100
      ">
        {items.map((child) => (
          <Link
            key={`${child.label}-${child.href}`}
            href={child.href}
            className="
              block rounded-lg px-3 py-2
              text-[15px]
              text-white/70
              transition-colors
              hover:text-white hover:bg-white/5
            "
          >
            {child.label}
          </Link>
        ))}
      </div>
    </div>
  );
}