import { NextRequest, NextResponse } from "next/server";

/**
 * app/api/livestream-auth/route.ts
 *
 * Forwards livestream access requests (email + ticket ID) to the PHP
 * verification endpoint on cPanel. This follows the exact same
 * Next.js -> API Route -> PHP -> MySQL pattern used by the existing
 * contact enquiry form. Vercel never talks to MySQL directly.
 */

const PHP_ENDPOINT =
  process.env.LIVESTREAM_AUTH_PHP_ENDPOINT ??
  "https://yourdomain.com/api/verify-livestream-access.php";

interface LivestreamAuthRequestBody {
  email?: string;
  ticketId?: string;
}

export async function POST(request: NextRequest) {
  let body: LivestreamAuthRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const ticketId =
    typeof body.ticketId === "string" ? body.ticketId.trim() : "";

  if (!email || !ticketId) {
    return NextResponse.json(
      { ok: false, message: "Email address and ticket ID are both required." },
      { status: 400 }
    );
  }

  try {
    const phpResponse = await fetch(PHP_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, ticketId }),
      // This is a server-to-server call, never cache it.
      cache: "no-store",
    });

    const data = await phpResponse.json();

    return NextResponse.json(data, { status: phpResponse.status });
  } catch (error) {
    console.error("[livestream-auth] Failed to reach PHP endpoint:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Unable to verify your access right now. Please try again shortly.",
      },
      { status: 502 }
    );
  }
}