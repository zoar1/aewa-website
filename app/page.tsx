import Navbar from "@/components/nav/Navbar";
import HeroSection from "@/components/home/HeroSection";
import LogoStrip from "@/components/home/LogoStrip";
import WhyAEWASection from "@/components/home/WhyAEWASection";
import SuccessStoriesSection from "@/components/home/SuccessStoriesSection";
import JobsTeaserSection from "@/components/home/JobsTeaserSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/footer/Footer";
import ServicesCarousel from "@/components/home/ServicesCarousel";
import { servicesCarousel } from "@/content/home";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Shared parent — HeroSection sticks within this entire scroll range */}
        <div style={{ position: "relative" }}>
          {/* HeroSection is sticky — video background scrolls with it */}
          <div style={{ position: "sticky", top: 0, zIndex: 1 }}>
            <HeroSection />
          </div>

          {/* Content slides over the sticky hero */}
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={{ backgroundColor: "#F7F7F6" }}>
              <LogoStrip />
              <ServicesCarousel items={servicesCarousel} />
            </div>
            <WhyAEWASection />
            <div style={{ backgroundColor: "#F7F7F6" }}>
              <SuccessStoriesSection />
              <JobsTeaserSection />
              <CTASection />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
