"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionKicker } from "@/components/shared/section-kicker";

const OVERVIEW_ANIMATION_VIDEOS = [
  {
    src: "/videos/mine2.mp4",
    title: "Critical",
    keyword: "Minerals & Sustainable Mining",
  },
  {
    src: "/videos/solar.mp4",
    title: "Accelerating",
    keyword: "Solar Energy",
  },
  {
    src: "/videos/turbine.mp4",
    title: "Harnessing",
    keyword: "Geothermal & Hydrothermal Energy",
  },
  {
    src: "/videos/join.mp4",
    title: "Join the",
    keyword: "Clean Energy Conference Africa Australia",
  },
];

const TITLE_TRANSITIONS = [
  { initial: { y: 56, opacity: 0 }, exit: { y: -56, opacity: 0 } },
  { initial: { y: -56, opacity: 0 }, exit: { y: 56, opacity: 0 } },
  { initial: { x: -80, opacity: 0 }, exit: { x: 80, opacity: 0 } },
  { initial: { x: 80, opacity: 0 }, exit: { x: -80, opacity: 0 } },
];

function OverviewAnimationPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeVideo, setActiveVideo] = useState(0);
  const titleTransition = TITLE_TRANSITIONS[activeVideo % TITLE_TRANSITIONS.length];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    void video.play().catch(() => undefined);
  }, [activeVideo]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative z-10 -mx-4 -my-3 mb-6 overflow-hidden px-4 py-3 text-center sm:mb-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.h3
            key={OVERVIEW_ANIMATION_VIDEOS[activeVideo].src}
            initial={titleTransition.initial}
            animate={{ y: 0, x: 0, opacity: 1 }}
            exit={titleTransition.exit}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="!text-3xl font-semibold leading-[1.05] tracking-tight !text-zinc-950 sm:!text-4xl lg:!text-5xl"
          >
            {OVERVIEW_ANIMATION_VIDEOS[activeVideo].title}{" "}
            <span className="text-[#009966]">
              {OVERVIEW_ANIMATION_VIDEOS[activeVideo].keyword}
            </span>
          </motion.h3>
        </AnimatePresence>
      </div>
      <div className="mx-auto w-full max-w-full rounded-[28px] bg-white px-4 py-10 shadow-[0_35px_80px_rgba(2,6,23,0.28)] sm:px-8 sm:py-14">
        <video
          ref={videoRef}
          key={OVERVIEW_ANIMATION_VIDEOS[activeVideo].src}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={() =>
            setActiveVideo((current) =>
              (current + 1) % OVERVIEW_ANIMATION_VIDEOS.length
            )
          }
          className="mx-auto block h-auto max-h-[760px] w-auto max-w-full rounded-[16px] bg-transparent object-contain object-center"
        >
          <source src={OVERVIEW_ANIMATION_VIDEOS[activeVideo].src} type="video/mp4" />
          Your browser does not support MP4 playback.
        </video>
      </div>
    </div>
  );
}

export function OverviewSpotlightSection() {
  return (
    <section className="border-t border-zinc-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionKicker
          index="02"
          label="In focus"
          heading=""
          intro="A running look at the sectors and themes driving this edition's agenda."
          accent="#009966"
        />

        <div className="mt-10 flex justify-center">
          <OverviewAnimationPlayer />
        </div>
      </div>
    </section>
  );
}