"use client";

/**
 * components/live/LivestreamPlayer.tsx
 *
 * Reusable iframe-based livestream player. Swap providers by changing
 * the `provider` + `sourceId` (or `src`) props — no changes needed
 * elsewhere in the app.
 *
 * Supported providers:
 *  - "youtube":   sourceId = the YouTube video/live ID (e.g. "dQw4w9WgXcQ")
 *  - "vimeo":     sourceId = the Vimeo event/video ID
 *  - "cloudflare": sourceId = the Cloudflare Stream video UID
 *  - "custom":    src = a full iframe-embeddable URL you provide directly
 */

export type LivestreamProvider = "youtube" | "vimeo" | "cloudflare" | "custom";

export interface LivestreamPlayerProps {
  /** Which streaming provider to build the embed URL for. */
  provider?: LivestreamProvider;
  /** Provider-specific ID (YouTube video ID, Vimeo ID, Cloudflare UID). */
  sourceId?: string;
  /** Full embed URL — required when provider is "custom", optional override otherwise. */
  src?: string;
  /** Accessible title for the iframe. */
  title?: string;
  /** Autoplay the stream once access is granted. */
  autoPlay?: boolean;
}

const DEFAULT_TITLE = "Clean Energy Conference — Live Stream";

// ---------------------------------------------------------------------
// Placeholder livestream source.
// Replace with the real YouTube Live / Vimeo / Cloudflare Stream ID
// before launch.
// ---------------------------------------------------------------------
const PLACEHOLDER_PROVIDER: LivestreamProvider = "youtube";
const PLACEHOLDER_SOURCE_ID = "jfKfPfyJRdk"; // placeholder public livestream

function buildEmbedUrl(
  provider: LivestreamProvider,
  sourceId: string | undefined,
  autoPlay: boolean
): string {
  switch (provider) {
    case "youtube":
      return `https://www.youtube.com/embed/${sourceId}?autoplay=${
        autoPlay ? 1 : 0
      }&rel=0&modestbranding=1`;

    case "vimeo":
      return `https://player.vimeo.com/video/${sourceId}?autoplay=${
        autoPlay ? 1 : 0
      }&title=0&byline=0&portrait=0`;

    case "cloudflare":
      return `https://customer-<YOUR_CLOUDFLARE_CODE>.cloudflarestream.com/${sourceId}/iframe?autoplay=${
        autoPlay ? "true" : "false"
      }`;

    case "custom":
    default:
      return "";
  }
}

export default function LivestreamPlayer({
  provider = PLACEHOLDER_PROVIDER,
  sourceId = PLACEHOLDER_SOURCE_ID,
  src,
  title = DEFAULT_TITLE,
  autoPlay = true,
}: LivestreamPlayerProps) {
  const embedUrl = src ?? buildEmbedUrl(provider, sourceId, autoPlay);

  if (!embedUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400">
        Livestream source not configured.
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-slate-800 bg-black shadow-xl">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        frameBorder={0}
      />
    </div>
  );
}