import { NextRequest, NextResponse } from "next/server";

const PHP_ENDPOINT = "https://aaemi.com.au/api/tracker.php";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(PHP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Tracker route error:", error);
    // Always return 200 — tracking errors should never surface to the client
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}