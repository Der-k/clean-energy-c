"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-1.jpg",
];

const INTERVAL = 4200;
const FLIP_SPEED = 520;

const flipModes = [
  "vertical-down",
  "vertical-up",
  "horizontal-left",
  "horizontal-right",
] as const;

type FlipMode = (typeof flipModes)[number];

/**
 * Directional shadow: far edge (rotating away) goes dark,
 * matching how light falls on a physically tilted surface.
 */
const shadeGradients: Record<FlipMode, string> = {
  "vertical-down":    "linear-gradient(to top,    rgba(0,0,0,0.82) 0%, transparent 62%)",
  "vertical-up":      "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, transparent 62%)",
  "horizontal-left":  "linear-gradient(to left,   rgba(0,0,0,0.82) 0%, transparent 62%)",
  "horizontal-right": "linear-gradient(to right,  rgba(0,0,0,0.82) 0%, transparent 62%)",
};

/**
 * Specular glare: bright highlight at hinge edge, fading toward free edge.
 * Simulates light reflecting off a glossy card surface mid-flip.
 */
const glareGradients: Record<FlipMode, string> = {
  "vertical-down":    "linear-gradient(to bottom, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.05) 38%, transparent 62%)",
  "vertical-up":      "linear-gradient(to top,    rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.05) 38%, transparent 62%)",
  "horizontal-left":  "linear-gradient(to right,  rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.05) 38%, transparent 62%)",
  "horizontal-right": "linear-gradient(to left,   rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.05) 38%, transparent 62%)",
};

/**
 * Cast shadow from the lifting flap onto the base layer underneath.
 * Darkens from the free edge where the flap peels away.
 */
const castShadowGradients: Record<FlipMode, string> = {
  "vertical-down":    "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.28) 100%)",
  "vertical-up":      "linear-gradient(to top,    transparent 30%, rgba(0,0,0,0.28) 100%)",
  "horizontal-left":  "linear-gradient(to left,   transparent 30%, rgba(0,0,0,0.28) 100%)",
  "horizontal-right": "linear-gradient(to right,  transparent 30%, rgba(0,0,0,0.28) 100%)",
};

/** Transform origin — the hinge is on the leading edge */
const origins: Record<FlipMode, string> = {
  "vertical-down":    "center top",
  "vertical-up":      "center bottom",
  "horizontal-left":  "left center",
  "horizontal-right": "right center",
};

/** Flap rotates to edge-on (90°) — invisible at this point, so we snap the image */
const endTransforms: Record<FlipMode, string> = {
  "vertical-down":    "perspective(3000px) rotateX(90deg)",
  "vertical-up":      "perspective(3000px) rotateX(-90deg)",
  "horizontal-left":  "perspective(3000px) rotateY(-90deg)",
  "horizontal-right": "perspective(3000px) rotateY(90deg)",
};

const flatTransforms: Record<FlipMode, string> = {
  "vertical-down":    "perspective(3000px) rotateX(0deg)",
  "vertical-up":      "perspective(3000px) rotateX(0deg)",
  "horizontal-left":  "perspective(3000px) rotateY(0deg)",
  "horizontal-right": "perspective(3000px) rotateY(0deg)",
};

export function HeroCalendarFlip() {
  // displayIndex: image shown in the base layer (destination)
  const [displayIndex, setDisplayIndex] = useState(0);
  // flapIndex: image rendered on the flap (source, peeling away)
  const [flapIndex, setFlapIndex] = useState(0);

  const flapRef        = useRef<HTMLDivElement>(null);
  const shadeRef       = useRef<HTMLDivElement>(null);
  const glareRef       = useRef<HTMLDivElement>(null);
  const castShadowRef  = useRef<HTMLDivElement>(null);
  const busy           = useRef(false);
  const modeIndex      = useRef(0);

  useEffect(() => {
    const flip = () => {
      if (busy.current) return;
      busy.current = true;

      const flap       = flapRef.current;
      const shade      = shadeRef.current;
      const glare      = glareRef.current;
      const castShadow = castShadowRef.current;
      if (!flap || !shade || !glare || !castShadow) return;

      const next = (displayIndex + 1) % images.length;
      const mode: FlipMode = flipModes[modeIndex.current % flipModes.length];
      modeIndex.current++;

      // ── 1. Stamp the current (departing) image onto the flap ─────────────
      setFlapIndex(displayIndex);

      // ── 2. Hard-reset: no transition, fully visible, perfectly flat ───────
      flap.style.transition       = "none";
      shade.style.transition      = "none";
      glare.style.transition      = "none";
      castShadow.style.transition = "none";

      flap.style.opacity          = "1";
      flap.style.transformOrigin  = origins[mode];
      flap.style.transform        = flatTransforms[mode];
      shade.style.opacity         = "0";
      shade.style.background      = shadeGradients[mode];
      glare.style.opacity         = "0";
      glare.style.background      = glareGradients[mode];
      castShadow.style.opacity    = "0";
      castShadow.style.background = castShadowGradients[mode];

      // ── 3. Two rAFs ensure the reset paint commits before animating ────────
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Physical ease-in: slow start → fast acceleration (gravity/momentum)
          flap.style.transition =
            `transform ${FLIP_SPEED}ms cubic-bezier(0.42, 0, 0.95, 0.38)`;
          shade.style.transition =
            `opacity ${FLIP_SPEED}ms cubic-bezier(0.35, 0, 0.90, 0.45)`;
          castShadow.style.transition =
            `opacity ${FLIP_SPEED * 0.28}ms ease-out`;

          flap.style.transform     = endTransforms[mode];
          shade.style.opacity      = "1";
          castShadow.style.opacity = "1";

          // Glare sweep: 8% → peak at 30% → gone by 68%
          // Simulates specular highlight racing across the glossy surface
          setTimeout(() => {
            glare.style.transition = `opacity ${FLIP_SPEED * 0.22}ms ease-in`;
            glare.style.opacity    = "0.82";
            setTimeout(() => {
              glare.style.transition = `opacity ${FLIP_SPEED * 0.38}ms ease-out`;
              glare.style.opacity    = "0";
            }, FLIP_SPEED * 0.22);
          }, FLIP_SPEED * 0.08);
        });
      });

      // ── 4. At edge-on (~90°): swap the base image, hide flap ──────────────
      //       Timed slightly before full duration — the cut is invisible.
      setTimeout(() => {
        setDisplayIndex(next);
        flap.style.opacity       = "0";
        shade.style.opacity      = "0";
        castShadow.style.transition = `opacity ${FLIP_SPEED * 0.18}ms ease-out`;
        castShadow.style.opacity = "0";
      }, FLIP_SPEED * 0.88);

      setTimeout(() => {
        busy.current = false;
      }, FLIP_SPEED + 80);
    };

    const id = setInterval(flip, INTERVAL);
    return () => clearInterval(id);
  }, [displayIndex]);

  return (
   <div
  className="relative h-full w-full"
  style={{
    perspective: "2200px",
    transformStyle: "preserve-3d",
  }}
>
    <div
  className="
    relative h-full w-full overflow-hidden
    bg-transparent
  "
>
        {/* ── BASE LAYER: destination image, always underneath ── */}
        <Image
  src={images[displayIndex]}
  alt="Conference"
  fill
  priority
  quality={100}
  sizes="100vw"
 className="object-cover select-none"
  unoptimized
  style={{
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
}}

 />
        {/* ── CAST SHADOW: flap casts a shadow onto the base as it lifts ── */}
        <div
          ref={castShadowRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* ── FLAP: previous image that rotates away ── */}
        <div
          ref={flapRef}
          className="absolute inset-0 z-20 opacity-0"
          style={{ willChange: "transform, opacity" }}
        >
        <Image
  src={images[flapIndex]}
  alt=""
  fill
  quality={100}
  sizes="100vw"
 className="object-cover select-none"
  aria-hidden
  style={{
  backfaceVisibility: "hidden",
  transform: "translateZ(0)",
  willChange: "transform, opacity",
  transformStyle: "preserve-3d",
  
}}
/>

          {/* Directional shadow — darkens far edge as card tilts */}
          <div
            ref={shadeRef}
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ opacity: 0 }}
          />

          {/* Specular glare — bright highlight sweeps at hinge edge */}
          <div
            ref={glareRef}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{ opacity: 0 }}
          />
        </div>
      </div>
    </div>
  );
}