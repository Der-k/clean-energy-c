import { HeroSection } from "@/components/shared/hero-section";
import { ConferenceOverview } from "@/components/sections/conference-overview";
import { OverviewSpotlightSection } from "@/components/sections/overview-spotlight-section";
import { NewsInsightsSection } from "@/components/sections/news-insights-section";
import { ConferenceThemeSection } from "@/components/sections/conference-theme-section";
import { EventCountdown } from "@/components/sections/event-countdown";
import { SpeakersPreview } from "@/components/sections/speakers-preview";
import { VenuePreview } from "@/components/sections/venue-preview";
import { PartnersPreview } from "@/components/sections/partners-preview";
import { StatsBar } from "@/components/sections/stats-bar";
import { ProgrammeCtaSection } from "@/components/sections/programme-cta-section";
import { RoleEntrySection } from "@/components/sections/RoleEntrySection";
import { ProgrammeHighlightsSection } from "@/components/sections/programme-highlights-section";

export default function HomePage() {
  return (
    <main className="pt-24">
      <HeroSection />

      <StatsBar />

      <ProgrammeCtaSection />
<ProgrammeHighlightsSection />
      <ConferenceThemeSection />
       <OverviewSpotlightSection />
    

     
      <NewsInsightsSection />
      

      <SpeakersPreview />
      <VenuePreview />
      <EventCountdown />
      <PartnersPreview />
    </main>
  );
}