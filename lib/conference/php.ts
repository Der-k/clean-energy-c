// Shared helper for every /api/conference/* route.
//
// Mirrors the exact pattern used by the existing /api/contact-enquiry
// route (fetch -> text -> guarded JSON.parse) so behaviour stays
// consistent, but points at the isolated conference-api instead of the
// contact system's save-enquiry.php.

const CONFERENCE_PHP_BASE =
  process.env.CONFERENCE_PHP_BASE_URL ?? "https://aaemi.com.au/conference-api";

// Server-side only secret used to authorize the dev-only manual payment
// endpoint. Never sent to the browser.
const CONFERENCE_DEV_KEY = process.env.CONFERENCE_DEV_KEY ?? "";

export type PhpApiResult<T = unknown> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; data: { ok: false; message: string } };

export async function callConferencePhp<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<PhpApiResult<T>> {
  try {
    const response = await fetch(`${CONFERENCE_PHP_BASE}/${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers ?? {}),
      },
    });

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error(`Non-JSON response from conference PHP API (${path}):`, text);
      return {
        ok: false,
        status: 502,
        data: { ok: false, message: "Unexpected server response." },
      };
    }

    return { ok: response.ok, status: response.status, data };
  } catch (error) {
    console.error(`Conference PHP API request failed (${path}):`, error);
    return {
      ok: false,
      status: 500,
      data: { ok: false, message: "Server error." },
    };
  }
}

export function devKeyHeader(): Record<string, string> {
  return CONFERENCE_DEV_KEY ? { "X-Dev-Key": CONFERENCE_DEV_KEY } : {};
}
