import { NextResponse } from "next/server";
import { callConferencePhp } from "@/lib/conference/php";

export async function GET() {
  const result = await callConferencePhp("events.php", { method: "GET" });
  return NextResponse.json(result.data, { status: result.status });
}
