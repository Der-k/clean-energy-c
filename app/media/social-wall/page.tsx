import type { Metadata } from "next";
import { SocialWall } from "@/app/media/social-wall/SocialWall";
import { SocialEmbedScripts } from "@/app/media/social-wall/SocialEmbed";

export const metadata: Metadata = {
  title: "Social Wall | Clean Energy Conference",
  description:
    "Live posts from delegates, speakers, and partners across Instagram, LinkedIn, and X from the Clean Energy Conference 2026 — Kigali & Perth editions.",
};

export default function SocialWallPage() {
  return (
    <>
      <SocialEmbedScripts />
      <SocialWall />
    </>
  );
}