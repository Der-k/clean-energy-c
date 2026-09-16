import { NextRequest, NextResponse } from "next/server";
import { callConferencePhp } from "@/lib/conference/php";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ ticketNumber: string }> }
) {
  const { ticketNumber } = await params;
  const result = await callConferencePhp(
    `ticket-lookup.php?ticketNumber=${encodeURIComponent(ticketNumber)}`,
    { method: "GET" }
  );
  return NextResponse.json(result.data, { status: result.status });
}
