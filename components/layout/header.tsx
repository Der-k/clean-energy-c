"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { navItems } from "@/lib/nav";
import { MobileNav } from "@/components/layout/mobile-nav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-500 bg-blue-600/95 text-white backdrop-blur">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link href="/" className="shrink-0">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-300 bg-blue-700 text-[10px] font-bold text-white">
                CEC
              </div>
              <div className="hidden sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-100">
                  Clean Energy Conference
                </p>
                <p className="text-sm font-semibold text-white">
                  Corporate Event Website
                </p>
              </div>
            </div>
          </Link>

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
                  className="rounded-md px-3 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700 hover:text-blue-100"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href!}
                  className="rounded-md px-3 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700 hover:text-blue-100"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden xl:flex xl:items-center xl:gap-3">
           <a
  href="https://eventbrite.com"
  target="_blank"
  rel="noopener noreferrer"
  className="btn-glow rounded-full px-5 py-2.5 text-sm font-semibold text-white"
>
  Get Tickets
</a>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-blue-300 text-white xl:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-medium text-white transition hover:bg-blue-700 hover:text-blue-100"
      >
        {label}
        <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
      </button>

      <div className="invisible absolute left-0 top-full z-50 mt-2 w-72 translate-y-2 rounded-xl border border-blue-400 bg-blue-600 p-2 opacity-0 shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="space-y-1">
          {items.map((child) => {
            const isPdf = child.href.endsWith(".pdf");

            if (isPdf) {
              return (
                <a
                  key={`${child.label}-${child.href}`}
                  href={child.href}
                  download
                  className="block rounded-lg px-4 py-3 text-sm text-white transition hover:bg-blue-700 hover:text-blue-100"
                >
                  {child.label}
                </a>
              );
            }

            return (
              <Link
                key={`${child.label}-${child.href}`}
                href={child.href}
                className="block rounded-lg px-4 py-3 text-sm text-white transition hover:bg-blue-700 hover:text-blue-100"
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