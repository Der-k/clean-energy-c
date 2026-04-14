"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        // Always show at top of page
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down — hide
        setVisible(false);
        setMobileOpen(false);
      } else {
        // Scrolling up — show
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header
  className={`fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#02026e] via-[#02026e] to-[#010150] text-white shadow-[0_14px_40px_rgba(2,2,110,0.28)] transition-all duration-300 ${
  visible
    ? "translate-y-0 opacity-100"
    : "-translate-y-full opacity-90"
}`}
>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex min-h-[88px] items-center justify-between gap-8 py-3">

          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.png"
              alt="Clean Energy Conference"
              width={240}
              height={120}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* NAV */}
          <nav className="hidden xl:flex xl:items-center xl:gap-1">
            {navItems.map((item) =>
              item.children ? (
                <DesktopDropdown
                  key={item.label}
                  label={item.label}
                  items={item.children}
                />
              ) : item.href?.startsWith("http") ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-4 py-2.5 text-[14px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="rounded-full px-4 py-2.5 text-[14px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden xl:flex xl:items-center xl:gap-4">
            <a
              href="https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#02026e] shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition hover:bg-[#f0f4ff] hover:scale-[1.02]"
            >
              Get Tickets
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition hover:bg-white/20 xl:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
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
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-full px-4 py-2.5 text-[14px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
      >
        {label}
        <ChevronDown className="h-4 w-4 transition duration-200 group-hover:rotate-180" />
      </button>

      <div className="invisible absolute left-0 top-full z-50 mt-2 w-72 translate-y-2 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-[0_30px_70px_rgba(15,23,42,0.2)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="space-y-0.5">
          {items.map((child) => {
            const isPdf = child.href.endsWith(".pdf");
            const isExternal = child.href.startsWith("http");

            return isPdf ? (
              <a
                key={`${child.label}-${child.href}`}
                href={child.href}
                download
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#f0f4ff] hover:text-[#02026e]"
              >
                {child.label}
              </a>
            ) : isExternal ? (
              <a
                key={`${child.label}-${child.href}`}
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#f0f4ff] hover:text-[#02026e]"
              >
                {child.label}
              </a>
            ) : (
              <Link
                key={`${child.label}-${child.href}`}
                href={child.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-[#f0f4ff] hover:text-[#02026e]"
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}