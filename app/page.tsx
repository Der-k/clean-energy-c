import { HeroSection } from "@/components/shared/hero-section";
import { ConferenceOverview } from "@/components/sections/conference-overview";
import { EventCountdown } from "@/components/sections/event-countdown";
import { TestimonialsPreview } from "@/components/sections/testimonials-preview";
import { VenuePreview } from "@/components/sections/venue-preview";
import { PartnersPreview } from "@/components/sections/partners-preview";
import { StatsBar } from "@/components/sections/stats-bar";

export default function HomePage() {
  return (
    <main className="pt-24">
      <HeroSection />
      <StatsBar />
      <ConferenceOverview />
      <TestimonialsPreview />
      <VenuePreview />
       <EventCountdown />
      <PartnersPreview />
    </main>
  );
}