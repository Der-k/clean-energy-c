import { NextRequest, NextResponse } from "next/server";
import { callConferencePhp } from "@/lib/conference/php";

// NOTE: this lists ticket TYPES (Delegate / Speaker / Exhibitor, with
// prices) for an event. Looking up a single issued ticket by its
// ticket number is the separate /api/conference/tickets/[ticketNumber]
// route below — Next.js route matching keeps these from colliding.
export async function GET(req: NextRequest) {
  const eventId = req.nextUrl.searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json(
      { ok: false, message: "Validation failed.", errors: { eventId: ["eventId is required."] } },
      { status: 422 }
    );
  }

  const result = await callConferencePhp(`ticket-types.php?eventId=${encodeURIComponent(eventId)}`, {
    method: "GET",
  });
  return NextResponse.json(result.data, { status: result.status });
}
