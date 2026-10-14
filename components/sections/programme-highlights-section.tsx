"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageSquare } from "lucide-react";

type Session = {
  time: string;
  tag: string;
  title: string;
  blurb?: string;
  /** Matches a key in IMAGE_POOLS below — the card cycles through every photo in that pool. */
  category: string;
};

type Day = {
  id: string;
  label: string;
  date: string;
  sessions: Session[];
};

type EventName = "Kigali" | "Perth";

/** Perth photos: day id ("day-1" | "day-2") -> pool name -> image paths. Built on the server (see perth-photos.ts). */
export type PerthPools = Record<string, Record<string, string[]>>;

// Order in which Perth pools are used for the four recap photos (first four that have images).
const PERTH_POOL_ORDER = [
  "Keynote Session",
  "Panel Discussion",
  "Award Ceremony",
  "Workshop",
  "Networking",
  "Audience",
  "Group Photo",
  "Exhibition",
];

// Photo pools generated from the labeled event library (public/images/gallery).
// Each session is tagged with a category; the card rotates through every photo
// in that category's pool rather than pinning one fixed photo per session.

const IMAGE_POOLS: Record<string, string[]> = {
  "Keynote Session": [
    "/images/gallery/clean-energy-conference-keynote-session-001.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-002.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-003.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-004.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-005.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-006.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-007.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-008.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-009.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-010.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-011.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-012.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-013.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-014.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-015.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-016.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-017.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-018.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-019.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-020.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-021.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-022.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-023.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-024.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-025.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-026.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-027.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-028.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-029.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-030.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-031.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-032.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-033.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-034.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-035.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-036.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-037.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-038.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-039.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-040.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-041.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-042.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-043.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-044.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-045.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-046.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-047.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-048.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-049.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-050.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-051.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-052.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-053.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-054.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-055.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-056.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-057.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-058.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-059.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-060.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-061.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-062.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-063.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-064.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-065.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-066.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-067.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-068.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-069.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-070.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-071.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-072.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-073.jpg",
    "/images/gallery/clean-energy-conference-keynote-session-074.jpg",
  ],
  "Audience": [
    "/images/gallery/clean-energy-conference-audience-001.jpg",
    "/images/gallery/clean-energy-conference-audience-002.jpg",
    "/images/gallery/clean-energy-conference-audience-003.jpg",
    "/images/gallery/clean-energy-conference-audience-004.jpg",
    "/images/gallery/clean-energy-conference-audience-005.jpg",
    "/images/gallery/clean-energy-conference-audience-006.jpg",
    "/images/gallery/clean-energy-conference-audience-007.jpg",
    "/images/gallery/clean-energy-conference-audience-008.jpg",
    "/images/gallery/clean-energy-conference-audience-009.jpg",
    "/images/gallery/clean-energy-conference-audience-010.jpg",
    "/images/gallery/clean-energy-conference-audience-011.jpg",
    "/images/gallery/clean-energy-conference-audience-012.jpg",
    "/images/gallery/clean-energy-conference-audience-013.jpg",
    "/images/gallery/clean-energy-conference-audience-014.jpg",
    "/images/gallery/clean-energy-conference-audience-015.jpg",
    "/images/gallery/clean-energy-conference-audience-016.jpg",
    "/images/gallery/clean-energy-conference-audience-017.jpg",
    "/images/gallery/clean-energy-conference-audience-018.jpg",
    "/images/gallery/clean-energy-conference-audience-019.jpg",
    "/images/gallery/clean-energy-conference-audience-020.jpg",
    "/images/gallery/clean-energy-conference-audience-021.jpg",
    "/images/gallery/clean-energy-conference-audience-022.jpg",
    "/images/gallery/clean-energy-conference-audience-023.jpg",
    "/images/gallery/clean-energy-conference-audience-024.jpg",
    "/images/gallery/clean-energy-conference-audience-025.jpg",
    "/images/gallery/clean-energy-conference-audience-026.jpg",
    "/images/gallery/clean-energy-conference-audience-027.jpg",
    "/images/gallery/clean-energy-conference-audience-028.jpg",
    "/images/gallery/clean-energy-conference-audience-029.jpg",
    "/images/gallery/clean-energy-conference-audience-030.jpg",
  ],
  "Panel Discussion": [
    "/images/gallery/clean-energy-conference-panel-discussion-001.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-002.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-003.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-004.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-005.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-006.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-007.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-008.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-009.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-010.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-011.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-012.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-013.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-014.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-015.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-016.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-017.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-018.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-019.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-020.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-021.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-022.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-023.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-024.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-025.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-026.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-027.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-028.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-029.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-030.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-031.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-032.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-033.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-034.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-035.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-036.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-037.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-038.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-039.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-040.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-041.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-042.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-043.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-044.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-045.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-046.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-047.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-048.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-049.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-050.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-051.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-052.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-053.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-054.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-055.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-056.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-057.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-058.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-059.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-060.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-061.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-062.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-063.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-064.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-065.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-066.jpg",
    "/images/gallery/clean-energy-conference-panel-discussion-067.jpg",
  ],
  "Workshop": [
    "/images/gallery/clean-energy-conference-workshop-001.jpg",
    "/images/gallery/clean-energy-conference-workshop-002.jpg",
  ],
  "Group Photo": [
    "/images/gallery/clean-energy-conference-group-photo-001.jpg",
    "/images/gallery/clean-energy-conference-group-photo-002.jpg",
    "/images/gallery/clean-energy-conference-group-photo-003.jpg",
    "/images/gallery/clean-energy-conference-group-photo-004.jpg",
    "/images/gallery/clean-energy-conference-group-photo-005.jpg",
    "/images/gallery/clean-energy-conference-group-photo-006.jpg",
  ],
  "Exhibition": [
    "/images/gallery/clean-energy-conference-exhibition-001.jpg",
    "/images/gallery/clean-energy-conference-exhibition-002.jpg",
    "/images/gallery/clean-energy-conference-exhibition-003.jpg",
    "/images/gallery/clean-energy-conference-exhibition-004.jpg",
    "/images/gallery/clean-energy-conference-exhibition-005.jpg",
    "/images/gallery/clean-energy-conference-exhibition-006.jpg",
    "/images/gallery/clean-energy-conference-exhibition-007.jpg",
    "/images/gallery/clean-energy-conference-exhibition-008.jpg",
    "/images/gallery/clean-energy-conference-exhibition-009.jpg",
    "/images/gallery/clean-energy-conference-exhibition-010.jpg",
    "/images/gallery/clean-energy-conference-exhibition-011.jpg",
    "/images/gallery/clean-energy-conference-exhibition-012.jpg",
    "/images/gallery/clean-energy-conference-exhibition-013.jpg",
    "/images/gallery/clean-energy-conference-exhibition-014.jpg",
    "/images/gallery/clean-energy-conference-exhibition-015.jpg",
    "/images/gallery/clean-energy-conference-exhibition-016.jpg",
    "/images/gallery/clean-energy-conference-exhibition-017.jpg",
    "/images/gallery/clean-energy-conference-exhibition-018.jpg",
    "/images/gallery/clean-energy-conference-exhibition-019.jpg",
  ],
  "Venue": [
    "/images/gallery/clean-energy-conference-venue-001.jpg",
    "/images/gallery/clean-energy-conference-venue-002.jpg",
    "/images/gallery/clean-energy-conference-venue-003.jpg",
    "/images/gallery/clean-energy-conference-venue-004.jpg",
    "/images/gallery/clean-energy-conference-venue-005.jpg",
  ],
  "Sponsor Activity": [
    "/images/gallery/clean-energy-conference-sponsor-activity-001.jpg",
    "/images/gallery/clean-energy-conference-sponsor-activity-002.jpg",
    "/images/gallery/clean-energy-conference-sponsor-activity-003.jpg",
    "/images/gallery/clean-energy-conference-sponsor-activity-004.jpg",
    "/images/gallery/clean-energy-conference-sponsor-activity-005.jpg",
  ],
  "Other": [
    "/images/gallery/clean-energy-conference-other-001.jpg",
    "/images/gallery/clean-energy-conference-other-002.jpg",
    "/images/gallery/clean-energy-conference-other-003.jpg",
    "/images/gallery/clean-energy-conference-other-004.jpg",
    "/images/gallery/clean-energy-conference-other-005.jpg",
    "/images/gallery/clean-energy-conference-other-006.jpg",
    "/images/gallery/clean-energy-conference-other-007.jpg",
    "/images/gallery/clean-energy-conference-other-008.jpg",
    "/images/gallery/clean-energy-conference-other-009.jpg",
    "/images/gallery/clean-energy-conference-other-010.jpg",
    "/images/gallery/clean-energy-conference-other-011.jpg",
  ],
  "Networking": [
    "/images/gallery/clean-energy-conference-networking-001.jpg",
    "/images/gallery/clean-energy-conference-networking-002.jpg",
    "/images/gallery/clean-energy-conference-networking-003.jpg",
    "/images/gallery/clean-energy-conference-networking-004.jpg",
    "/images/gallery/clean-energy-conference-networking-005.jpg",
    "/images/gallery/clean-energy-conference-networking-006.jpg",
    "/images/gallery/clean-energy-conference-networking-007.jpg",
    "/images/gallery/clean-energy-conference-networking-008.jpg",
    "/images/gallery/clean-energy-conference-networking-009.jpg",
    "/images/gallery/clean-energy-conference-networking-010.jpg",
  ],
};

// Curated from the labeled event library. Keeping the pools day-specific means
// the recap never shows a Day Two moment while the visitor is viewing Day One.
const DAY_IMAGE_POOLS: Record<string, Record<string, string[]>> = {
  "day-1": {
    "Keynote Session": [
      "/images/gallery/DAY1/clean-energy-conference-keynote-001.jpg",
      "/images/gallery/DAY1/clean-energy-conference-keynote-010.jpg",
      "/images/gallery/DAY1/clean-energy-conference-keynote-025.jpg",
    ],
    Audience: [
      "/images/gallery/DAY1/clean-energy-conference-audience-001.jpg",
      "/images/gallery/DAY1/clean-energy-conference-audience-014.jpg",
      "/images/gallery/DAY1/clean-energy-conference-audience-038.jpg",
    ],
    "Panel Discussion": [
      "/images/gallery/DAY1/clean-energy-conference-panel-discussion-001.jpg",
      "/images/gallery/DAY1/clean-energy-conference-panel-discussion-014.jpg",
      "/images/gallery/DAY1/clean-energy-conference-panel-discussion-027.jpg",
    ],
    Workshop: [
      "/images/gallery/DAY1/clean-energy-conference-session-001.jpg",
      "/images/gallery/DAY1/clean-energy-conference-session-014.jpg",
      "/images/gallery/DAY1/clean-energy-conference-session-025.jpg",
    ],
    "Group Photo": [
      "/images/gallery/DAY1/clean-energy-conference-group-photo-001.jpg",
      "/images/gallery/DAY1/clean-energy-conference-group-photo-004.jpg",
      "/images/gallery/DAY1/clean-energy-conference-group-photo-008.jpg",
    ],
    Exhibition: [
      "/images/gallery/DAY1/clean-energy-conference-exhibition-001.jpg",
      "/images/gallery/DAY1/clean-energy-conference-exhibition-009.jpg",
      "/images/gallery/DAY1/clean-energy-conference-exhibition-018.jpg",
    ],
    "Sponsor Activity": [
      "/images/gallery/DAY1/clean-energy-conference-networking-001.jpg",
      "/images/gallery/DAY1/clean-energy-conference-networking-012.jpg",
      "/images/gallery/DAY1/clean-energy-conference-networking-024.jpg",
    ],
    Networking: [
      "/images/gallery/DAY1/clean-energy-conference-networking-003.jpg",
      "/images/gallery/DAY1/clean-energy-conference-networking-016.jpg",
      "/images/gallery/DAY1/clean-energy-conference-networking-025.png",
    ],
  },
  "day-2": {
    "Keynote Session": [
      "/images/gallery/DAY2/clean-energy-conference-keynote-026.jpg",
      "/images/gallery/DAY2/clean-energy-conference-keynote-040.jpg",
      "/images/gallery/DAY2/clean-energy-conference-keynote-054.jpg",
    ],
    Audience: [
      "/images/gallery/DAY2/clean-energy-conference-audience-039.jpg",
      "/images/gallery/DAY2/clean-energy-conference-audience-048.jpg",
      "/images/gallery/DAY2/clean-energy-conference-audience-053.jpg",
    ],
    "Panel Discussion": [
      "/images/gallery/DAY2/clean-energy-conference-panel-discussion-028.jpg",
      "/images/gallery/DAY2/clean-energy-conference-panel-discussion-040.jpg",
      "/images/gallery/DAY2/clean-energy-conference-panel-discussion-053.jpg",
    ],
    Workshop: [
      "/images/gallery/DAY2/clean-energy-conference-session-026.jpg",
      "/images/gallery/DAY2/clean-energy-conference-session-043.jpg",
      "/images/gallery/DAY2/clean-energy-conference-session-061.jpg",
    ],
    "Group Photo": [
      "/images/gallery/DAY2/clean-energy-conference-group-photo-009.jpg",
      "/images/gallery/DAY2/clean-energy-conference-group-photo-016.jpg",
      "/images/gallery/DAY2/clean-energy-conference-group-photo-023.jpg",
    ],
    Exhibition: [
      "/images/gallery/DAY2/clean-energy-conference-networking-026.jpg",
      "/images/gallery/DAY2/clean-energy-conference-networking-035.jpg",
      "/images/gallery/DAY2/clean-energy-conference-networking-046.jpg",
    ],
    "Sponsor Activity": [
      "/images/gallery/DAY2/clean-energy-conference-networking-029.jpg",
      "/images/gallery/DAY2/clean-energy-conference-networking-038.jpg",
      "/images/gallery/DAY2/clean-energy-conference-networking-044.jpg",
    ],
    Networking: [
      "/images/gallery/DAY2/clean-energy-conference-networking-027.jpg",
      "/images/gallery/DAY2/clean-energy-conference-networking-036.jpg",
      "/images/gallery/DAY2/clean-energy-conference-networking-045.jpg",
    ],
  },
};

const DAYS: Day[] = [
  {
    id: "day-1",
    label: "Day One",
    date: "Thu, 6 Aug 2026",
    sessions: [
      { time: "8:00 – 8:45", tag: "Registration", title: "Welcome Refreshments & Registration", category: "Sponsor Activity" },
      {
        time: "8:45 – 9:00",
        tag: "Opening",
        title: "Opening Remarks",
        blurb: "Stephen Kuria, Executive Chairman of the Australia Kenya Chamber of Commerce, opened the conference.",
        category: "Keynote Session",
      },
      {
        time: "9:00 – 10:00",
        tag: "Session 1",
        title: "Keynote & Fireside Chat: The Geopolitics of Energy",
        blurb:
          "Ministerial keynotes and a fireside chat explored shifting supply chains and the macroeconomic forces shaping Africa's energy landscape.",
        category: "Keynote Session",
      },
      { time: "10:00 – 10:30", tag: "Break", title: "Networking Break & Exhibition Visit", category: "Exhibition" },
      {
        time: "10:30 – 11:30",
        tag: "Session 2",
        title: "The Energy Paradox: Can East Africa Leapfrog to a Net-Zero Future?",
        blurb: "Panelists debated how to reconcile affordable, reliable energy with the push to decarbonize.",
        category: "Panel Discussion",
      },
      {
        time: "11:30 – 12:30",
        tag: "Session 3",
        title: "Next-Generation Geothermal: Hybrid Systems & Industrial Applications",
        category: "Panel Discussion",
      },
      { time: "12:30 – 13:20", tag: "Break", title: "Lunch & Sponsor Showcase", category: "Sponsor Activity" },
      {
        time: "13:30 – 14:30",
        tag: "Session 4",
        title: "The Energy Crossroads: Innovation, Extraction, or Illusion?",
        category: "Panel Discussion",
      },
      {
        time: "14:30 – 15:30",
        tag: "Session 5",
        title: "Breakout Rooms: Critical Minerals Mining & the Circular Economy",
        blurb:
          "Two parallel tracks covered artisanal mining in Rwanda's energy transition, and embedding ESG into investment portfolios.",
        category: "Workshop",
      },
      {
        time: "15:30 – 16:30",
        tag: "Session 6",
        title: "The Deal Room: Where Vision Hits the Bottom Line",
        blurb: "Entrepreneurs and investors stress-tested bankability across four sectors.",
        category: "Panel Discussion",
      },
      { time: "16:30", tag: "Networking", title: "Evening Tea & Networking", category: "Networking" },
    ],
  },
  {
    id: "day-2",
    label: "Day Two",
    date: "Fri, 7 Aug 2026",
    sessions: [
      { time: "8:00 – 8:45", tag: "Registration", title: "Welcome Refreshments & Registration", category: "Sponsor Activity" },
      { time: "8:45 – 9:00", tag: "Opening", title: "Welcome & Recap of Day One", category: "Keynote Session" },
      {
        time: "9:00 – 10:00",
        tag: "Session 7",
        title: "Keynote: The Capital Paradox",
        blurb: "Speakers examined why Africa's energy transition hasn't moved as fast as the climate-finance rhetoric suggested.",
        category: "Keynote Session",
      },
      { time: "10:00 – 10:30", tag: "Break", title: "Networking Break & Exhibition Visit", category: "Exhibition" },
      {
        time: "10:30 – 11:30",
        tag: "Session 8",
        title: "The Critical Nexus: Balancing Growth, Water & Global Standards",
        category: "Panel Discussion",
      },
      {
        time: "11:30 – 12:00",
        tag: "Session 9",
        title: "The Human & Resource Crisis: Building the Future on Shaky Ground?",
        blurb: "The conversation turned to the water-energy-mining nexus and a widening skills gap.",
        category: "Panel Discussion",
      },
      {
        time: "12:00 – 12:30",
        tag: "Session 10",
        title: "From Garbage to Gold: Is Waste-to-Energy a Breakthrough or a Band-Aid?",
        category: "Panel Discussion",
      },
      { time: "12:30 – 13:20", tag: "Break", title: "Lunch & Roundtable Discussions", category: "Workshop" },
      { time: "13:30 – 14:30", tag: "Session 11", title: "The Smart City Mirage: Progress or Privilege?", category: "Panel Discussion" },
      {
        time: "14:30 – 15:30",
        tag: "Session 12",
        title: "The Agri-Energy Paradox: Feeding the Future or Fueling the Grid?",
        blurb: "Agrivoltaics, solar irrigation and the trade-offs of the water-energy-food nexus took center stage.",
        category: "Panel Discussion",
      },
      { time: "15:30 – 16:30", tag: "Session 13", title: "The Innovation Gap: Breakthrough or Just Hype?", category: "Panel Discussion" },
      {
        time: "16:30 – 17:00",
        tag: "Session 14",
        title: "The Road Ahead: From Consensus to Concrete Action",
        blurb: "The conference closed with the launch of the Pan-African Green Energy Roadmap and the Climate Transition Network.",
        category: "Group Photo",
      },
    ],
  },
];

const EVENTS: EventName[] = ["Kigali", "Perth"];

export function ProgrammeHighlightsSection() {
  const [event, setEvent] = useState<EventName>("Kigali");
  const [activeDay, setActiveDay] = useState(DAYS[0].id);
  const [gallerySeed, setGallerySeed] = useState(0);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const [perthPools, setPerthPools] = useState<PerthPools | null>(null);
  const isPerth = event === "Perth";

  // Load the Perth photo list the first time the Perth tab is opened
  useEffect(() => {
    if (!isPerth || perthPools) return;
    let cancelled = false;
    fetch("/api/perth-photos")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data) setPerthPools(data);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isPerth, perthPools]);

  const day = useMemo(() => DAYS.find((d) => d.id === activeDay) ?? DAYS[0], [activeDay]);

  // Pick a fresh, stable set of images for each page load without creating an auto-playing carousel.
  useEffect(() => {
    setGallerySeed(Math.floor(Math.random() * 100_000));
  }, []);

  // Close the lightbox with Escape.
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const galleryImages = useMemo(
    () => {
      if (isPerth) {
        // Perth: only ever use Perth photos (never fall back to Kigali pools)
        const pools = perthPools?.[day.id] ?? {};
        return PERTH_POOL_ORDER.filter((c) => (pools[c]?.length ?? 0) > 0)
          .slice(0, 4)
          .map((category, index) => {
            const pool = pools[category];
            return {
              category,
              src: pool[(gallerySeed + index * 7) % pool.length],
              alt: `Perth ${day.label} ${category}`,
            };
          });
      }

      const pools = DAY_IMAGE_POOLS[day.id] ?? IMAGE_POOLS;
      const categories = ["Keynote Session", "Panel Discussion", "Workshop", "Networking"];
      return categories.map((category, index) => {
        const pool = pools[category] ?? IMAGE_POOLS[category] ?? IMAGE_POOLS.Other;
        return {
          category,
          src: pool[(gallerySeed + index * 7) % pool.length],
          alt: `${day.label} ${category}`,
        };
      });
    },
    [isPerth, perthPools, day.id, day.label, gallerySeed],
  );

  const [hero, ...tiles] = galleryImages;

  const pill = (isActive: boolean) =>
    `rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
      isActive ? "bg-[var(--primary)] text-white" : "text-[var(--text-muted)] hover:bg-white"
    }`;

  return (
    <section className="py-12" id="recap">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Event tabs */}
        <div role="tablist" aria-label="Event recap" className="mb-8 flex gap-8 border-b border-[var(--border-soft)]">
          {EVENTS.map((e) => {
            const isActive = event === e;
            return (
              <button
                key={e}
                role="tab"
                aria-selected={isActive}
                onClick={() => setEvent(e)}
                className={`-mb-px border-b-2 pb-3 text-sm font-bold uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? "border-[var(--primary)] text-[var(--primary)]"
                    : "border-transparent text-[var(--text-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {e} Recap
              </button>
            );
          })}
        </div>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--primary)]">
              <CheckCircle2 size={13} />
              {isPerth ? "Perth Edition · Concluded" : "Kigali Edition · Concluded 6–7 Aug 2026"}
            </span>
            <h2 className="font-heading mt-1 text-2xl font-bold text-[var(--foreground)]">
              Event Recap
            </h2>
            <p className="text-muted mt-1 text-sm">
              A shared platform for ideas, partnerships and practical action across clean energy.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:items-end">
            {/* Day toggle */}
            <div className="flex gap-1 rounded-full border border-[var(--border-soft)] bg-[var(--surface-muted)] p-1">
              {DAYS.map((d) => (
                <button key={d.id} onClick={() => setActiveDay(d.id)} className={pill(d.id === activeDay)}>
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hero photo + day summary */}
        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          {/*
            Photos use the originals' native 3:2 ratio, so nothing is cropped or zoomed in.
            Sizes are generous so Next serves a large, sharp variant (same fidelity as /gallery).
          */}
          {!hero && isPerth && (
            <div className="flex aspect-[3/2] w-full items-center justify-center rounded-xl bg-[var(--surface-muted)] text-sm text-[var(--text-muted)]">
              {perthPools === null ? "Loading Perth photos…" : "No Perth photos found for this day."}
            </div>
          )}
          {hero && (
            <button
              type="button"
              onClick={() => setLightbox({ src: hero.src, alt: hero.alt })}
              className="group relative block aspect-[3/2] w-full cursor-zoom-in overflow-hidden rounded-xl bg-[var(--surface-muted)]"
              aria-label={`Open ${hero.alt} photo full size`}
            >
              <Image
                key={hero.src}
                src={hero.src}
                alt={hero.alt}
                fill
                quality={90}
                priority
                sizes="(min-width: 1280px) 760px, (min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </button>
          )}

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--primary)]">{day.label} highlights</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">A programme built for exchange</h3>
            <p className="text-muted mt-3 text-base leading-relaxed">
              The programme brought leaders, investors, innovators and practitioners into the same room to move the clean-energy conversation forward.
            </p>
            <div className="mt-6 grid gap-4 border-y border-[var(--border-soft)] py-5 text-sm">
              <div>
                <p className="font-semibold text-[var(--foreground)]">Big-picture perspectives</p>
                <p className="text-muted mt-1">Keynotes and panels connected regional opportunity with the realities of investment and delivery.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--foreground)]">Practical conversations</p>
                <p className="text-muted mt-1">Focused discussions made space for ideas, experience-sharing and future collaborations.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--foreground)]">Connections that continue</p>
                <p className="text-muted mt-1">Informal moments across the exhibition and networking programme carried the dialogue beyond the stage.</p>
              </div>
            </div>
            <p className="text-muted mt-5 text-xs">
              {isPerth ? "Part of a two-day programme" : `${day.date} · Part of a two-day programme`}
            </p>
          </div>
        </div>

        {/* Supporting photos */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {tiles.map((image) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setLightbox({ src: image.src, alt: image.alt })}
              className="relative block aspect-[3/2] w-full cursor-zoom-in overflow-hidden rounded-xl bg-[var(--surface-muted)]"
              aria-label={`Open ${image.alt} photo full size`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={90}
                sizes="(min-width: 1152px) 360px, (min-width: 640px) 33vw, 100vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Feedback (Kigali form only) */}
        {!isPerth && (
          <div className="mt-8 flex flex-col gap-4 border-l-4 border-[var(--primary)] bg-[var(--surface-muted)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <p className="text-base font-semibold text-[var(--foreground)]">Were you part of the Kigali Edition?</p>
              <p className="text-muted mt-1 text-sm">Tell us what worked, what stayed with you, and what we can improve next time.</p>
            </div>
            <a
              href="https://forms.cloud.microsoft/r/SmSZTm9cgn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 bg-[var(--primary)] px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
            >
              <MessageSquare size={16} aria-hidden="true" />
              Leave feedback
            </a>
          </div>
        )}

        {/* footer link */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-muted text-xs">
            {isPerth ? "Two days · One shared direction" : "Two days · Fourteen conversations · One shared direction"}
          </p>
          <Link
            href="/gallery"
            className="text-xs font-bold text-[var(--primary)] underline underline-offset-4"
          >
            View full photo gallery →
          </Link>
        </div>
      </div>

      {/* Lightbox: full-resolution view */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/90 p-4 sm:p-8"
        >
          <div className="relative h-full max-h-[90vh] w-full max-w-6xl">
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              quality={90}
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}