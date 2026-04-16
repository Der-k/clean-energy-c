import { HeroSection } from "@/components/shared/hero-section";
import { ConferenceOverview } from "@/components/sections/conference-overview";
import { EventCountdown } from "@/components/sections/event-countdown";
import { TestimonialsPreview } from "@/components/sections/testimonials-preview";
import { VenuePreview } from "@/components/sections/venue-preview";
import { PartnersPreview } from "@/components/sections/partners-preview";

export default function HomePage() {
  return (
    <main className="pt-24">
      <HeroSection />
      <ConferenceOverview />
      <TestimonialsPreview />
      <VenuePreview />
       <EventCountdown />
      <PartnersPreview />
    </main>
  );
}