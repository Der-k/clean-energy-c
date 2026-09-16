import { NextRequest, NextResponse } from "next/server";
import { callConferencePhp, devKeyHeader } from "@/lib/conference/php";

// DEVELOPMENT ONLY. This exists so the full registration -> order ->
// payment -> ticket flow can be tested before a real gateway is chosen.
// The shared secret (CONFERENCE_DEV_KEY) lives only in server env vars —
// it is added here, never sent to or known by the browser.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await callConferencePhp("payments-manual-confirm.php", {
      method: "POST",
      headers: devKeyHeader(),
      body: JSON.stringify(body),
    });

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    console.error("Conference manual-confirm route error:", error);
    return NextResponse.json({ ok: false, message: "Server error." }, { status: 500 });
  }
}
