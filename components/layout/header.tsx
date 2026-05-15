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
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-90"
      }`}
    >
      {/* ===================== */}
      {/* LAYER 1: TOP BAR */}
      {/* ===================== */}
      <div className="w-full border-b border-white/10 bg-[#02026e]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[12px] tracking-wide text-white/70 md:px-6">
          <div className="flex items-center gap-4">
            <span>Clean Energy Conference 2026</span>
            <span className="hidden sm:inline text-white/40">•</span>
            <span className="hidden sm:inline">Nairobi, Kenya</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="hover:text-white transition">Partnerships</span>
            <span className="hover:text-white transition">Media</span>
            <span className="hover:text-white transition">Contact</span>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* LAYER 2: MAIN NAV */}
      {/* ===================== */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#02026e] via-[#02026e] to-[#010150] shadow-[0_14px_40px_rgba(2,2,110,0.28)]">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex min-h-[92px] items-center justify-between gap-10">

            {/* LOGO */}
            <Link href="/" className="shrink-0 flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Clean Energy Conference"
                width={200}
                height={100}
                className="h-20 w-auto object-contain"
                priority
              />
            </Link>

            {/* DESKTOP NAV */}
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
            <div className="hidden xl:flex items-center gap-4">
              <a
                href="/get-tickets"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-[15px] font-semibold text-white shadow-[0_12px_40px_rgba(236,0,5,0.45)] transition duration-300 hover:scale-[1.04]"
              >
                <span className="absolute inset-0 bg-gradient-to-b from-[#ff1a1a] via-[#ec0005] to-[#b80000]" />
                <span className="absolute inset-0 opacity-40 mix-blend-overlay bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.35),transparent_60%)]" />
                <span className="absolute inset-0 translate-y-full bg-[#009966] transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 transition-transform duration-700 group-hover:translate-x-full" />
                <span className="absolute inset-0 rounded-full ring-1 ring-white/10 group-hover:ring-white/20 transition" />
                <span className="relative z-10 tracking-wide">Get Tickets</span>
              </a>
            </div>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-12 w-12 items-center justify-center xl:hidden"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

/* ===================== */
/* DROPDOWN */
/* ===================== */

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
                className="block rounded-xl px-4 py-3 text-base font-medium text-black transition hover:bg-[#f0f4ff] hover:text-[#02026e]"
              >
                {child.label}
              </a>
            ) : isExternal ? (
              <a
                key={`${child.label}-${child.href}`}
                href={child.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-4 py-3 text-base font-medium text-black transition hover:bg-[#f0f4ff] hover:text-[#02026e]"
              >
                {child.label}
              </a>
            ) : (
              <Link
                key={`${child.label}-${child.href}`}
                href={child.href}
                className="block rounded-xl px-4 py-3 text-base font-medium text-black transition hover:bg-[#f0f4ff] hover:text-[#02026e]"
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