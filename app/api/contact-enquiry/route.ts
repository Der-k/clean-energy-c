import { NextRequest, NextResponse } from "next/server";

const PHP_ENDPOINT = "https://aaemi.com.au/api/save-enquiry.php";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(PHP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    // Guard against PHP fatal errors / non-JSON output (e.g. HTML error pages)
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("Non-JSON response from PHP:", text);
      return NextResponse.json(
        { ok: false, message: "Unexpected server response." },
        { status: 502 }
      );
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Contact route error:", error);

    return NextResponse.json(
      { ok: false, message: "Server error." },
      { status: 500 }
    );
  }
}