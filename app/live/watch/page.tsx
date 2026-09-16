"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LivestreamPlayer from "@/components/live/LivestreamPlayer";

/**
 * app/live/watch/page.tsx
 *
 * Protected livestream page. Only reachable after a successful
 * email + ticket ID check on /live, which sets a simple localStorage
 * flag. This is intentionally lightweight — not a security boundary,
 * just a way to avoid asking attendees to re-enter their details on
 * every visit.
 */

const CONFERENCE_NAME = "Clean Energy Conference 2026";

export default function WatchPage() {
  const router = useRouter();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const access = window.localStorage.getItem("livestream_access");

    if (access !== "true") {
      router.replace("/live");
      return;
    }

    setHasAccess(true);
    setCheckingAccess(false);
  }, [router]);

  if (checkingAccess || !hasAccess) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-400">
        <p>Checking your access…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 px-6 py-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400">
            {CONFERENCE_NAME}
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Live Now</h1>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <LivestreamPlayer />

          <p className="mt-6 text-sm text-slate-400">
            Trouble with playback? Refresh the page, or visit{" "}
            <a href="/live" className="text-emerald-400 underline">
              the access page
            </a>{" "}
            to contact support.
          </p>
        </div>
      </section>
    </main>
  );
}