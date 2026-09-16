import { NextRequest, NextResponse } from "next/server";
import { callConferencePhp } from "@/lib/conference/php";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const result = await callConferencePhp("registrations.php", {
      method: "POST",
      body: JSON.stringify(body),
    });

    return NextResponse.json(result.data, { status: result.status });
  } catch (error) {
    console.error("Conference registrations route error:", error);
    return NextResponse.json({ ok: false, message: "Server error." }, { status: 500 });
  }
}
