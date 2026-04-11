import { HeroSection } from "@/components/shared/hero-section";
import { TestimonialsPreview } from "@/components/sections/testimonials-preview";
import { VenuePreview } from "@/components/sections/venue-preview";
import { PartnersPreview } from "@/components/sections/partners-preview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TestimonialsPreview />
      <VenuePreview />
      <PartnersPreview />
    </>
  );
}