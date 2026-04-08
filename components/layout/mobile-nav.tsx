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
    <div className="border-t border-blue-500 bg-blue-600 text-white xl:hidden">
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
                className="block rounded-lg px-4 py-3 text-sm font-medium text-white hover:bg-blue-700"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="mt-4">
         <a
  href="https://eventbrite.com"
  target="_blank"
  rel="noopener noreferrer"
  onClick={onClose}
  className="block rounded-full bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-blue-700"
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
    <div className="rounded-xl border border-blue-400 bg-blue-700/40">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-white"
      >
        <span>{label}</span>
        <ChevronDown
          className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-blue-400 px-2 py-2">
          {items.map((child) => {
            const isPdf = child.href.endsWith(".pdf");

            if (isPdf) {
              return (
                <a
                  key={`${child.label}-${child.href}`}
                  href={child.href}
                  download
                  onClick={onClose}
                  className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-blue-700"
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
                className="block rounded-lg px-3 py-2 text-sm text-white hover:bg-blue-700"
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