export const revalidate = 60;

import Navbar from "@/components/nav/Navbar";
import HeroSection from "@/components/home/HeroSection";
import LogoStrip from "@/components/home/LogoStrip";
import WhyAEWASection from "@/components/home/WhyAEWASection";
import SuccessStoriesSection from "@/components/home/SuccessStoriesSection";
import JobsTeaserSection from "@/components/home/JobsTeaserSection";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import CTASection from "@/components/home/CTASection";
import StrategicPartnerSection from "@/components/home/StrategicPartnerSection";
import Footer from "@/components/footer/Footer";
import ServicesCarousel from "@/components/home/ServicesCarousel";
import { servicesCarousel, stats as staticStats, valueProps } from "@/content/home";
import { getSectionContent, get, DEFAULTS } from "@/lib/content";

export default async function HomePage() {
  const content = await getSectionContent("homepage");
  const d = DEFAULTS.homepage;

  // Build dynamic services carousel items
  const dynamicServices = servicesCarousel.map((s, i) => ({
    ...s,
    title: get(content, `services_card_${i}_title`, s.title),
    description: get(content, `services_card_${i}_description`, s.description),
  }));

  // Build dynamic why AEWA cards
  const dynamicCards = valueProps.map((v, i) => ({
    title: get(content, `why_card_${i}_title`, v.title),
    description: get(content, `why_card_${i}_description`, v.description),
  }));

  // Build dynamic stats
  const dynamicStats = staticStats.map((s, i) => ({
    value: get(content, `stats_${i}_value`, s.value),
    label: get(content, `stats_${i}_label`, s.label),
  }));

  return (
    <>
      <Navbar />
      <main>
        <div style={{ position: "relative" }}>
          {/* HeroSection is sticky — scrolls with the page */}
          <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <HeroSection
              headline={get(content, "hero_headline", d.hero_headline)}
              subCopy={get(content, "hero_subCopy", d.hero_subCopy)}
            />
          </div>

          {/* Content slides over the sticky hero */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ backgroundColor: "#F7F7F6" }}>
              <LogoStrip />
              <ServicesCarousel items={dynamicServices} />
            </div>

            {/* Why AEWA + Stats */}
            <WhyAEWASection
              eyebrow={get(content, "why_eyebrow", d.why_eyebrow)}
              heading={get(content, "why_heading", d.why_heading)}
              subtext={get(content, "why_subtext", d.why_subtext)}
              cards={dynamicCards}
            />
            <div style={{ backgroundColor: "#F7F7F6" }}>
              <SuccessStoriesSection stats={dynamicStats} />
            </div>

            {/* Career opportunities card */}
            <JobsTeaserSection
              eyebrow={get(content, "jobs_eyebrow", d.jobs_eyebrow)}
              headline={get(content, "jobs_headline", d.jobs_headline)}
              subCopy={get(content, "jobs_subCopy", d.jobs_subCopy)}
            />

            {/* Testimonial carousel — below the jobs card */}
            <TestimonialCarousel />

            <div style={{ backgroundColor: "#F7F7F6" }}>
              <CTASection
                headline={get(content, "cta_headline", d.cta_headline)}
                subCopy={get(content, "cta_subCopy", d.cta_subCopy)}
              />
            </div>

            {/* Strategic partner — sits directly above the footer */}
            <StrategicPartnerSection />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
