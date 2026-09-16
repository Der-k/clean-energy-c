"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * app/live/access/page.tsx
 *
 * Destination for the shared livestream QR code. This is a single,
 * unlisted link — anyone who opens it (by scanning the QR code) gets
 * access, with no email/ticket ID check.
 *
 * This is separate from the gated sign-in on /live: attendees without
 * the QR code still need a valid email + ticket ID there. This page
 * is intentionally the "no questions asked" fast path, so treat this
 * URL/QR code as effectively public once it's handed out — don't
 * index it, and expect that anyone who has the link (or forwards it)
 * can get in.
 */

export default function LiveAccessPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("livestream_access", "true");
    router.replace("/live/watch");
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
      <p>Taking you to the livestream…</p>
    </main>
  );
}