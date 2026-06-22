import { NextRequest, NextResponse } from "next/server";

const PHP_ENDPOINT = "https://aaemi.com.au/api/exhibitor-interest.php";

export async function POST(req: NextRequest) {
  try {
    const incomingFormData = await req.formData();

    const forwardFormData = new FormData();
    for (const [key, value] of incomingFormData.entries()) {
      forwardFormData.append(key, value);
    }

    const response = await fetch(PHP_ENDPOINT, {
      method: "POST",
      // Do NOT set Content-Type manually — fetch sets multipart/form-data
      // with the correct boundary automatically when body is FormData.
      body: forwardFormData,
    });

    const text = await response.text();

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
    console.error("Exhibitor interest route error:", error);
    return NextResponse.json(
      { ok: false, message: "Server error." },
      { status: 500 }
    );
  }
}