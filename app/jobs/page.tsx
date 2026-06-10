import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/footer/Footer";
import { fetchJobs } from "@/lib/jobs";
import JobsClient from "@/components/JobsClient";
import CVSubmitSection from "@/components/jobs/CVSubmitSection";
import { getSectionContent, get, DEFAULTS } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Current Opportunities | AEWA — All Energy West Africa",
    description:
        "Explore current job openings at All Energy West Africa. We connect top engineering and energy sector talent with leading organisations across Nigeria and Africa.",
};

export default async function JobsPage() {
    const [jobs, globalContent] = await Promise.all([
        fetchJobs(),
        getSectionContent("global"),
    ]);
    const g = DEFAULTS.global;

    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="Join Our Network"
                    title="Current Opportunities"
                    description="We match exceptional talent with leading organisations across the energy sector. Explore our open roles below."
                    breadcrumbs={[{ label: "Jobs", href: "/jobs" }]}
                />

                <Section>
                    <JobsClient jobs={jobs} />
                </Section>

                <CVSubmitSection
                    heading={get(globalContent, "talent_pool_heading", g.talent_pool_heading)}
                    description={get(globalContent, "talent_pool_description", g.talent_pool_description)}
                />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
