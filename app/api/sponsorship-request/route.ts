import { NextRequest, NextResponse } from "next/server";

const PHP_ENDPOINT = "https://aaemi.com.au/api/sponsorship-request.php";

export async function POST(req: NextRequest) {
  try {
    // Read the incoming multipart form data (text fields + logo file)
    const incomingFormData = await req.formData();

    // Re-build a fresh FormData to forward. We could forward incomingFormData
    // directly, but rebuilding keeps this explicit and lets us validate/strip
    // anything unexpected before it reaches PHP.
    const forwardFormData = new FormData();

    for (const [key, value] of incomingFormData.entries()) {
      forwardFormData.append(key, value);
    }

    const response = await fetch(PHP_ENDPOINT, {
      method: "POST",
      // IMPORTANT: do NOT set Content-Type manually here.
      // fetch() will set "multipart/form-data; boundary=..." automatically
      // when the body is a FormData instance. Setting it manually breaks
      // the boundary and PHP will fail to parse $_POST / $_FILES.
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
    console.error("Sponsorship route error:", error);

    return NextResponse.json(
      { ok: false, message: "Server error." },
      { status: 500 }
    );
  }
}