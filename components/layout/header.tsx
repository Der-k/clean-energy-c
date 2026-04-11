"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gradient-to-r from-[#003994] via-[#003994] to-[#002a6d] text-white shadow-[0_14px_40px_rgba(0,57,148,0.28)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex h-24 items-center justify-between gap-8">

          {/* LOGO */}
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[11px] font-bold tracking-[0.14em] text-white backdrop-blur">
                CEC
              </div>

              <div className="hidden sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/80">
                  Clean Energy Conference
                </p>
                <p className="text-[15px] font-semibold leading-tight text-white">
                  Corporate Event Platform
                </p>
              </div>
            </div>
          </Link>

          {/* NAV */}
          <nav className="hidden xl:flex xl:items-center xl:gap-2">
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
                  className="rounded-full px-5 py-2.5 text-[14px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="rounded-full px-5 py-2.5 text-[14px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
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
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#003994] shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition hover:bg-[#f0f4ff] hover:scale-[1.02]"
            >
              Get Tickets
            </a>
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white backdrop-blur transition hover:bg-white/20 xl:hidden"
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
        className="inline-flex items-center gap-1 rounded-full px-5 py-2.5 text-[14px] font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
      >
        {label}
        <ChevronDown className="h-4 w-4 transition duration-200 group-hover:rotate-180" />
      </button>

      <div className="invisible absolute left-0 top-full z-50 mt-4 w-80 translate-y-2 rounded-2xl border border-[#003994]/20 bg-white p-2 opacity-0 shadow-[0_30px_70px_rgba(15,23,42,0.25)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="space-y-1">
          {items.map((child) => {
            const isPdf = child.href.endsWith(".pdf");

            return isPdf ? (
              <a
                key={`${child.label}-${child.href}`}
                href={child.href}
                download
                className="block rounded-xl px-4 py-3 text-sm font-medium text-[color:var(--text-main)] transition hover:bg-[#f0f4ff] hover:text-[#003994]"
              >
                {child.label}
              </a>
            ) : (
              <Link
                key={`${child.label}-${child.href}`}
                href={child.href}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-[color:var(--text-main)] transition hover:bg-[#f0f4ff] hover:text-[#003994]"
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