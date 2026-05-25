import type { Metadata } from "next";
import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/footer/Footer";
import { fetchJobs } from "@/lib/jobs";
import JobsClient from "@/components/JobsClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Current Opportunities | AEWA — All Energy West Africa",
    description:
        "Explore current job openings at AEWA. We connect top engineering and energy sector talent with leading organisations across Nigeria and Africa.",
};

export default async function JobsPage() {
    const jobs = await fetchJobs();

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

                <CTASection />
            </main>
            <Footer />
        </>
    );
}
