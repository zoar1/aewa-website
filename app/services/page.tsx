import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import ServiceCard from "@/components/shared/ServiceCard";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/footer/Footer";
import { services } from "@/content/home";

export default function ServicesPage() {
    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="What We Do"
                    title="Comprehensive Workforce & Technical Solutions"
                    description="From technical recruitment and skilled trades deployment to QA/QC inspection and payroll compliance, we cover every dimension of workforce management across Nigeria and West Africa."
                    breadcrumbs={[{ label: "Services", href: "/services" }]}
                />

                {/* Range of services grid */}
                <Section className="bg-[#F7F7F6]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((service, i) => (
                            <ServiceCard
                                key={service.title}
                                title={service.title}
                                description={service.description}
                                href={`/services/${service.href.replace("/services/", "")}`}
                                icon={service.icon}
                                index={i}
                                variant="blue"
                                featured={i === 0}
                            />
                        ))}
                    </div>
                </Section>

                <CTASection />
            </main>
            <Footer />
        </>
    );
}
