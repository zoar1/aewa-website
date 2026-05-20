import { notFound } from "next/navigation";
import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Footer from "@/components/footer/Footer";
import ServiceContent from "./ServiceContent";
import { serviceDetails, allServiceSlugs } from "@/content/pages";

export function generateStaticParams() {
    return allServiceSlugs.map((slug) => ({ slug }));
}

interface Props {
    params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: Props) {
    const { slug } = await params;
    const service = serviceDetails[slug];

    if (!service) notFound();

    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="Our Services"
                    title={service.title}
                    description={service.description}
                    imageSrc={service.imageSrc}
                    breadcrumbs={[
                        { label: "Services", href: "/services" },
                        { label: service.title, href: `/services/${slug}` },
                    ]}
                />
                <ServiceContent slug={slug} />
            </main>
            <Footer />
        </>
    );
}
