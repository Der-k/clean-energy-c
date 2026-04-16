"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { navItems } from "@/lib/nav";

export function MobileNav({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="border-t border-white/10 bg-gradient-to-b from-[#010150] via-[#02026e] to-[#010150] text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] xl:hidden">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="space-y-2">
          {navItems.map((item) =>
            item.children ? (
              <MobileAccordion
                key={item.label}
                label={item.label}
                items={item.children}
                onClose={onClose}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                onClick={onClose}
                className="block rounded-xl px-4 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="mt-5">
          <a
            href="https://www.eventbrite.com.au/e/clean-energy-conference-exhibition-australia-africa-2026-tickets-1980448579012?aff=oddtdtcreator"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="block rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-[#010150] shadow-[0_8px_20px_rgba(0,0,0,0.16)] transition hover:bg-[#02026e]/5"
          >
            Get Tickets
          </a>
        </div>
      </div>
    </div>
  );
}

function MobileAccordion({
  label,
  items,
  onClose,
}: {
  label: string;
  items: { label: string; href: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-sm font-medium text-white transition hover:bg-white/5"
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-4 w-4 transition duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-white/10 px-2 py-2">
          {items.map((child) => {
            const isPdf = child.href.endsWith(".pdf");

            if (isPdf) {
              return (
                <a
                  key={`${child.label}-${child.href}`}
                  href={child.href}
                  download
                  onClick={onClose}
                  className="block rounded-xl px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {child.label}
                </a>
              );
            }

            return (
              <Link
                key={`${child.label}-${child.href}`}
                href={child.href}
                onClick={onClose}
                className="block rounded-xl px-3 py-2.5 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
