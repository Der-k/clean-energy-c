"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

/**
 * Renders a real embedded post from Instagram, X, or LinkedIn.
 *
 * Instagram and X load external widget scripts that scan the page ONCE on
 * load. Since React inserts these posts after that initial scan, we have to
 * manually re-trigger processing (window.instgrm / window.twttr) whenever a
 * post mounts — otherwise you just see a bare link or blank box.
 *
 * LinkedIn's embed is a plain self-contained <iframe>. No script, no
 * re-processing needed — but it ships with a fixed pixel width, so we
 * override that to make it responsive.
 */

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
    twttr?: { widgets: { load: (el?: HTMLElement) => void } };
  }
}

type EmbedProps =
  | {
      platform: "instagram";
      /** The post URL from Instagram's "Embed" option, e.g. https://www.instagram.com/p/XXXXXXXXX/ */
      url: string;
    }
  | {
      platform: "x";
      /** The exact <blockquote class="twitter-tweet">...</blockquote> HTML from publish.twitter.com (script tag not needed here — loaded once globally) */
      html: string;
    }
  | {
      platform: "linkedin";
      /** The exact <iframe ...></iframe> HTML from LinkedIn's "Embed this post" */
      html: string;
    };

/**
 * Tries to process embeds immediately. If the relevant widget script hasn't
 * finished loading yet, retries on a short interval (capped) instead of
 * giving up — this covers the race between a lazy-loaded script and a post
 * that mounts before it. Once the script is ready, real widget code takes
 * over and this stops.
 */
function processWhenReady(platform: EmbedProps["platform"], el: HTMLElement | null) {
  let attempts = 0;
  const maxAttempts = 20; // ~10s at 500ms
  const tick = () => {
    attempts += 1;
    if (platform === "instagram" && window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    if (platform === "x" && window.twttr?.widgets) {
      window.twttr.widgets.load(el ?? undefined);
      return;
    }
    if (attempts < maxAttempts) {
      setTimeout(tick, 500);
    }
  };
  tick();
}

export function SocialEmbed(props: EmbedProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (props.platform === "linkedin") return; // plain iframe, nothing to process
    processWhenReady(props.platform, ref.current);
  }, [props]);

  if (props.platform === "instagram") {
    return (
      <div ref={ref} className="w-full overflow-hidden">
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={props.url}
          data-instgrm-version="14"
          style={{ margin: 0, width: "100%", minWidth: 0 }}
        />
      </div>
    );
  }

  if (props.platform === "x") {
    return (
      <div
        ref={ref}
        className="w-full overflow-hidden [&_.twitter-tweet]:!m-0 [&_.twitter-tweet]:!max-w-full"
        dangerouslySetInnerHTML={{ __html: props.html }}
      />
    );
  }

  // LinkedIn — force the fixed-width iframe to fill its container.
  return (
    <div
      ref={ref}
      className="w-full overflow-hidden [&_iframe]:!w-full"
      dangerouslySetInnerHTML={{ __html: props.html }}
    />
  );
}

/**
 * Mount this ONCE, near the top of any page that uses <SocialEmbed> — the
 * social wall page AND the homepage news section both need it. Next.js
 * dedupes <Script> by src, so mounting it in more than one place on the
 * same page tree is safe and won't load it twice.
 * LinkedIn needs no script — do not add one, it doesn't have a public one.
 */
export function SocialEmbedScripts() {
  return (
    <>
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onReady={() => window.instgrm?.Embeds.process()}
      />
      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
        onReady={() => window.twttr?.widgets.load()}
      />
    </>
  );
}