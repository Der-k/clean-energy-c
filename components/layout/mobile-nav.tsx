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
    <div className="max-h-[calc(100vh-108px)] overflow-y-auto border-t border-white/10 bg-gradient-to-b from-[#010150] via-[#02026e] to-[#010150] text-white shadow-[0_20px_40px_rgba(15,23,42,0.18)] xl:hidden">
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
                className="block rounded-xl px-4 py-3 text-base font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
<div className="mt-5">
  <a
    href="/get-tickets"
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClose}
    className="group relative block overflow-hidden rounded-full bg-[#ec0005] px-5 py-4 text-center text-base font-bold text-white shadow-[0_10px_30px_rgba(236,0,5,0.35)] transition duration-300 active:scale-[0.98]"
  >
    {/* Animated Overlay */}
    <span className="absolute inset-0 -translate-x-full bg-[#057d54] transition-transform duration-300 ease-out group-active:translate-x-0" />

    {/* Text */}
    <span className="relative z-10">Get Tickets</span>
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
        className="flex w-full items-center justify-between px-4 py-3.5 text-left text-base font-medium text-white transition hover:bg-white/5"
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
                  className="block rounded-xl px-3 py-2.5 text-base text-white/90 transition hover:bg-white/10 hover:text-white"
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
                className="block rounded-xl px-3 py-2.5 text-base text-white/90 transition hover:bg-white/10 hover:text-white"
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
