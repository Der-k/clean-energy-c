import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch("https://aaemi.com.au/api/contact.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", text);

    return new NextResponse(text, {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        message: "Server error.",
      },
      {
        status: 500,
      }
    );
  }
}