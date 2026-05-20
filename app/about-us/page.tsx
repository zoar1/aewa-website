import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/footer/Footer";
import { about } from "@/content/pages";
import AboutContent from "./AboutContent";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="Who We Are"
                    title={about.headline}
                    description={about.description}
                    breadcrumbs={[{ label: "About Us", href: "/about-us" }]}
                />
                <AboutContent />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
