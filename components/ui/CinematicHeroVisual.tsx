"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/videos/hero-1.mp4",
    alt: "Solar energy graphic",
  },
  {
    src: "/videos/hero-2.mp4",
    alt: "Conference networking graphic",
  },
];

const AUTO_DURATION = 6500;

export function CinematicHeroVisual() {
  const [index, setIndex] = useState(0);

  const currentSlide = slides[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTO_DURATION);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      
      {/* SOFT WHITE EDGE BLENDING */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at center,
              transparent 48%,
              rgba(255,255,255,0.92) 100%
            )
          `,
        }}
      />

      {/* SIDE FADE */}
      <div
        className="absolute inset-0 z-30 pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          background: "white",
          opacity: 0.08,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{
            opacity: 0,
            y: -90,
            scale: 1.08,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1.02,
          }}
          exit={{
            opacity: 0,
            y: 90,
            scale: 1.12,
          }}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* PARALLAX WRAPPER */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: [1.02, 1.08],
              y: [-12, 18],
            }}
            transition={{
              duration: AUTO_DURATION / 1000,
              ease: "linear",
            }}
          >
<div className="absolute inset-0 overflow-hidden">
  <video
    key={currentSlide.src}
    src={currentSlide.src}
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    disablePictureInPicture
    className="w-full h-full object-cover"
  />
</div>
          </motion.div>

          {/* ATMOSPHERIC OVERLAY */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  to top,
                  rgba(255,255,255,0.10),
                  rgba(255,255,255,0.02)
                )
              `,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* FLOATING ACCENT LIGHT */}
      <motion.div
        className="
          absolute
          -right-20
          top-10
          h-[320px]
          w-[320px]
          rounded-full
          bg-[#1140c4]/10
          blur-3xl
          pointer-events-none
          z-20
        "
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}