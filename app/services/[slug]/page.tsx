import { notFound } from "next/navigation";
import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Footer from "@/components/footer/Footer";
import ServiceContent from "./ServiceContent";
import { serviceDetails, allServiceSlugs } from "@/content/pages";
import { getSectionContent, get, DEFAULTS } from "@/lib/content";

export const revalidate = 60;

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

    const sectionKey = `service-${slug}`;
    const content = await getSectionContent(sectionKey);
    const d = DEFAULTS[sectionKey] ?? {};

    const title = get(content, "title", service.title);
    const description = get(content, "description", service.description);

    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="Our Services"
                    title={title}
                    description={description}
                    imageSrc={service.imageSrc}
                    breadcrumbs={[
                        { label: "Services", href: "/services" },
                        { label: title, href: `/services/${slug}` },
                    ]}
                />
                <ServiceContent slug={slug} contentOverrides={content} />
            </main>
            <Footer />
        </>
    );
}
