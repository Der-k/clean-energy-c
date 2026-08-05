/**
 * Lightweight session handling for the livestream portal.
 *
 * We deliberately avoid a JWT library. A session is just:
 *
 *   base64url(JSON payload) + "." + base64url(HMAC-SHA256 signature)
 *
 * Signed with a server-only secret (LIVESTREAM_SESSION_SECRET), stored in
 * an HTTP-only cookie, and verified on every request to /live/watch.
 *
 * Uses the Web Crypto API (globalThis.crypto.subtle) rather than Node's
 * `crypto` module so the exact same code runs in both the Edge middleware
 * runtime and normal Node route handlers.
 */

export const SESSION_COOKIE_NAME = "live_session";
const SESSION_TTL_SECONDS = 60 * 60 * 6; // 6 hours, matches a typical livestream block

export interface SessionPayload {
  ticketId: string;
  email: string;
  attendeeName: string | null;
  exp: number; // unix seconds
}

function getSecret(): string {
  const secret = process.env.LIVESTREAM_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "LIVESTREAM_SESSION_SECRET is not set. Add it to your environment variables."
    );
  }
  return secret;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let binary = "";
  for (const byte of arr) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const withPadding = padded + "=".repeat((4 - (padded.length % 4)) % 4);
  const binary = atob(withPadding);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function createSessionToken(
  payload: Omit<SessionPayload, "exp">
): Promise<string> {
  const fullPayload: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encoder = new TextEncoder();
  const payloadBytes = encoder.encode(JSON.stringify(fullPayload));
  const payloadPart = toBase64Url(payloadBytes);

  const key = await getHmacKey();
  const signature = await crypto.subtle.sign("HMAC", key, payloadBytes);
  const signaturePart = toBase64Url(signature);

  return `${payloadPart}.${signaturePart}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionPayload | null> {
  if (!token) return null;

  const [payloadPart, signaturePart] = token.split(".");
  if (!payloadPart || !signaturePart) return null;

  try {
    const key = await getHmacKey();
    const payloadBytes = fromBase64Url(payloadPart);
    const signatureBytes = fromBase64Url(signaturePart);

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      payloadBytes
    );
    if (!valid) return null;

    const decoder = new TextDecoder();
    const payload: SessionPayload = JSON.parse(decoder.decode(payloadBytes));

    if (payload.exp < Math.floor(Date.now() / 1000)) return null;

    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: SESSION_TTL_SECONDS,
};
