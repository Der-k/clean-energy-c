"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    src: "/images/hero-1.mp4",
    alt: "Solar energy graphic",
  },
  {
    src: "/images/hero-2.mp4",
    alt: "Conference networking graphic",
  },
  {
    src: "/images/hero-3.mp4",
    alt: "Conference networking graphic",
  },
  {
    src: "/images/hero-4.mp4",
    alt: "Conference networking graphic",
  },
  {
    src: "/images/hero-5.mp4",
    alt: "Conference networking graphic",
  },
{
    src: "/images/hero-6.mp4",
    alt: "Conference networking graphic",
  },

  
];



export function CinematicHeroVisual() {
  const [index, setIndex] = useState(0);

  const currentSlide = slides[index];
  const nextSlide = () => {
  setIndex((prev) => (prev + 1) % slides.length);
};

 
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

      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          className="absolute inset-0"
         initial={{
  opacity: 0,
  y: -40,
}}

animate={{
  opacity: 1,
  y: 0,
}}

exit={{}}
          transition={{
            duration: 1.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* PARALLAX WRAPPER */}
         {/* VIDEO WRAPPER */}
<div className="absolute inset-0">
<div className="absolute inset-0 overflow-hidden">
 <video
  key={currentSlide.src}
  src={currentSlide.src}
  autoPlay
  muted
  playsInline
  preload="auto"
  disablePictureInPicture
  className="w-full h-full object-contain"
  onEnded={nextSlide}
/>
</div>
          </div>

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