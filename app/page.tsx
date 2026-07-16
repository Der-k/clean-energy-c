import { HeroSection } from "@/components/shared/hero-section";
import { ConferenceOverview } from "@/components/sections/conference-overview";
import { EventCountdown } from "@/components/sections/event-countdown";
import { SpeakersPreview } from "@/components/sections/speakers-preview";
import { VenuePreview } from "@/components/sections/venue-preview";
import { PartnersPreview } from "@/components/sections/partners-preview";
import { StatsBar } from "@/components/sections/stats-bar";
import { ProgrammeCtaSection } from "@/components/sections/programme-cta-section";
import { RoleEntrySection } from "@/components/sections/RoleEntrySection";
import { ROLE_NAV_TRIGGER_ID } from "@/components/layout/role-subnav"; // adjust to wherever RoleSubNav lives

export default function HomePage() {
  return (
    <main className="pt-24">
      <HeroSection />

      <StatsBar />

      <ProgrammeCtaSection />

      {/* Thin 1px sentinel — NOT a wrapper. RoleSubNav watches this element
          and reveals the picker once it's been in view (i.e. the user has
          scrolled to the top of Conference Overview) for 5 seconds straight. */}
      <div id={ROLE_NAV_TRIGGER_ID} style={{ height: 1 }} aria-hidden="true" />
      <ConferenceOverview />

      <SpeakersPreview />
      <VenuePreview />
      <EventCountdown />
      <PartnersPreview />
    </main>
  );
}