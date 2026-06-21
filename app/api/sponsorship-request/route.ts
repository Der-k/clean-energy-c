import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get the multipart form exactly as sent by the browser
    const formData = await req.formData();

    const response = await fetch(
      "https://aaemi.com.au/api/save-sponsor.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", text);

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ??
          "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Server error.",
      },
      {
        status: 500,
      }
    );
  }
}