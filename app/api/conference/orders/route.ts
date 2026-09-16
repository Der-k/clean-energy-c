import { NextRequest, NextResponse } from "next/server";
import { callConferencePhp } from "@/lib/conference/php";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // The client only ever sends IDs (registrationId, ticketTypeId).
    // Price/tax/total are calculated server-side in the PHP layer.
    const result = await callConferencePhp("orders.php", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    console.error("Conference orders route error:", error);
    return NextResponse.json({ ok: false, message: "Server error." }, { status: 500 });
  }
}
