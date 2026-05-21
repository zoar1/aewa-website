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
import { servicesCarousel } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <div style={{ position: "relative" }}>
          {/* HeroSection is sticky — scrolls with the page */}
          <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <HeroSection />
          </div>

          {/* Content slides over the sticky hero */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ backgroundColor: "#F7F7F6" }}>
              <LogoStrip />
              <ServicesCarousel items={servicesCarousel} />
            </div>

            {/* Stats */}
            <WhyAEWASection />
            <div style={{ backgroundColor: "#F7F7F6" }}>
              <SuccessStoriesSection />
            </div>

            {/* Career opportunities card */}
            <JobsTeaserSection />

            {/* Testimonial carousel — below the jobs card */}
            <TestimonialCarousel />

            <div style={{ backgroundColor: "#F7F7F6" }}>
              <CTASection />
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
