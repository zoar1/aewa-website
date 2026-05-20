import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/footer/Footer";
import { getJobById } from "@/lib/jobs";
import JobDetailContent from "./JobDetailContent";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const job = await getJobById(id);
    if (!job) {
        return {
            title: "Role Not Found | AEWA",
        };
    }
    return {
        title: `${job.Job_Opening_Name} | AEWA Careers`,
        description: job.Job_Description.slice(0, 160),
    };
}

export default async function JobDetailPage({ params }: PageProps) {
    const { id } = await params;
    const job = await getJobById(id);

    if (!job) {
        notFound();
    }

    return (
        <>
            <Navbar />
            <main>
                <JobDetailContent job={job} />
            </main>
            <Footer />
        </>
    );
}
