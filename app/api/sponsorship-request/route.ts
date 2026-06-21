import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const response = await fetch(
      "https://aaemi.com.au/api/save-sponsor.php",
      {
        method: "POST",
        body: formData,
      }
    );

    const text = await response.text();

    console.log("PHP Status:", response.status);
    console.log("PHP Response:", text);

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ?? "application/json",
      },
    });

  } catch (e) {
    console.error("ROUTE ERROR");
    console.error(e);

    return NextResponse.json(
      {
        success: false,
        error: String(e),
      },
      {
        status: 500,
      }
    );
  }
}