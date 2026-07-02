export const revalidate = 60;

import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/footer/Footer";
import { about } from "@/content/pages";
import AboutContent from "./AboutContent";
import { getSectionContent, get, DEFAULTS } from "@/lib/content";

export default async function AboutPage() {
    const content = await getSectionContent("about");
    const d = DEFAULTS.about;

    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="Who We Are"
                    title={get(content, "headline", d.headline)}
                    description={get(content, "description", d.description)}
                    breadcrumbs={[{ label: "About Us", href: "/about-us" }]}
                />
                <AboutContent
                    mission={get(content, "mission", d.mission)}
                    vision={get(content, "vision", d.vision)}
                    partnerName={get(content, "partner_name", d.partner_name)}
                    partnerDescription={get(content, "partner_description", d.partner_description)}
                    partner2Name={get(content, "partner2_name", d.partner2_name)}
                    partner2Description={get(content, "partner2_description", d.partner2_description)}
                />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
