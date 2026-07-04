"use client";

import { useEffect, useCallback, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRole } from "@/context/RoleContext";

// ── Internal fire-and-forget POST to /api/track ───────────────────────
function sendTrack(payload: Record<string, unknown>) {
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {
      // Silently ignore network errors — tracking must never throw
    });
  } catch {
    // ignore
  }
}

// ── Derive a clean label from a clicked DOM element ───────────────────
function getElementLabel(el: HTMLElement): string {
  // Button or link text
  const text = el.innerText?.trim().slice(0, 120);
  if (text) return text;

  // Image alt
  const img = el.querySelector("img");
  if (img?.alt) return `[img: ${img.alt}]`;

  // aria-label
  const aria = el.getAttribute("aria-label");
  if (aria) return aria;

  // href for plain links
  if (el instanceof HTMLAnchorElement && el.href) return el.href.slice(0, 120);

  return el.tagName.toLowerCase();
}

// ── Determine interaction type from a clicked element ─────────────────
function getInteractionType(el: HTMLElement): string {
  if (el instanceof HTMLAnchorElement) {
    const href = el.href || "";
    // File download
    if (/\.(pdf|docx?|xlsx?|pptx?|zip|csv)$/i.test(href)) return "download";
    // External link
    if (href && !href.startsWith(window.location.origin)) return "link";
    return "link";
  }
  if (el.closest("form")) return "click";
  if (el.tagName === "BUTTON" || el.getAttribute("role") === "button") return "click";
  return "click";
}

// ── Main hook ─────────────────────────────────────────────────────────
export function useTracking() {
  const { visitorUuid } = useRole();
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  // ── Track page views on every route change ──────────────────────────
  useEffect(() => {
    // Avoid double-firing on strict mode / re-renders for the same path
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    sendTrack({
      type: "pageview",
      visitorUuid: visitorUuid ?? null,
      pagePath: pathname,
      pageTitle: document.title || null,
      referrer: document.referrer || null,
    });
  }, [pathname, visitorUuid]);

  // ── Auto-track all clicks globally ──────────────────────────────────
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Walk up from the actual target to find a meaningful element
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        if (
          el instanceof HTMLAnchorElement ||
          el instanceof HTMLButtonElement ||
          el.getAttribute("role") === "button"
        ) {
          const label = getElementLabel(el);
          const interactionType = getInteractionType(el);

          // Skip tracking invisible/utility elements
          if (!label || label.length < 1) {
            el = el.parentElement;
            continue;
          }

          sendTrack({
            type: "interaction",
            visitorUuid: visitorUuid ?? null,
            interactionType,
            elementLabel: label,
            pagePath: window.location.pathname,
          });

          break;
        }
        el = el.parentElement;
      }
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => document.removeEventListener("click", handleClick, { capture: true });
  }, [visitorUuid]);

  // ── Auto-track form submissions ──────────────────────────────────────
  useEffect(() => {
    const handleSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;

      // Try to get a meaningful form name
      const label =
        form.getAttribute("aria-label") ||
        form.getAttribute("name") ||
        form.id ||
        document.title ||
        "form";

      sendTrack({
        type: "interaction",
        visitorUuid: visitorUuid ?? null,
        interactionType: "form_submit",
        elementLabel: label.slice(0, 120),
        pagePath: window.location.pathname,
      });
    };

    document.addEventListener("submit", handleSubmit, { capture: true });
    return () => document.removeEventListener("submit", handleSubmit, { capture: true });
  }, [visitorUuid]);

  // ── Manual track function for custom interactions ────────────────────
  const track = useCallback(
    (interactionType: string, elementLabel: string) => {
      sendTrack({
        type: "interaction",
        visitorUuid: visitorUuid ?? null,
        interactionType,
        elementLabel: elementLabel.slice(0, 120),
        pagePath: window.location.pathname,
      });
    },
    [visitorUuid]
  );

  return { track };
}