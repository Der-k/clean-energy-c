import { NextRequest, NextResponse } from "next/server";
import { callConferencePhp } from "@/lib/conference/php";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const { orderNumber } = await params;
  const result = await callConferencePhp(
    `order-status.php?orderNumber=${encodeURIComponent(orderNumber)}`,
    { method: "GET" }
  );
  return NextResponse.json(result.data, { status: result.status });
}
