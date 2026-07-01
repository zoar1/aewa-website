import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import ServiceCard from "@/components/shared/ServiceCard";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/footer/Footer";
import { services } from "@/content/home";

const TECHNICAL_SUPPORT_BULLETS = [
    "Delivery of specialized technical solutions on engineering, subsurface, drilling, construction installation, pre-commissioning and hook-up studies and project management",
    "Delivery of a dedicated Team to Client project organization for subsurface, drilling, construction installation, pre-commissioning and hook-up phases",
    "Delivery of Specialized Dedicated Technicians covering all range of project delivery",
    "Complement and enhance Client Organogram during crucial project phases",
    "Proposing door-to-door solutions for specialized equipment to be integrated with client existing facilities",
    "One stop-shop for enabling a fast and professional approach to your project demands",
];

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
                            />
                        ))}
                    </div>
                </Section>

                {/* Additional Technical Business Support */}
                <Section className="bg-white">
                    <div className="max-w-3xl">
                        <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">
                            Additional Support
                        </p>
                        <h2 className="text-[#111111] mb-6">
                            Technical Business Support
                        </h2>
                        <p className="text-[#555555] mb-10 leading-relaxed">
                            Beyond our core service offerings, All Energy West Africa provides an integrated suite of technical business support capabilities — designed to complement client project organisations and deliver specialised solutions at every stage of project execution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {TECHNICAL_SUPPORT_BULLETS.map((bullet, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 bg-[#F7F7F6] rounded-[16px] border border-[#E5E5E5] p-5"
                            >
                                <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-[#003366] flex items-center justify-center">
                                    <svg
                                        viewBox="0 0 10 8"
                                        fill="none"
                                        className="w-3 h-3"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M1 4l2.5 2.5L9 1"
                                            stroke="white"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </span>
                                <p className="text-[#333333] text-[15px] leading-relaxed m-0">
                                    {bullet}
                                </p>
                            </div>
                        ))}
                    </div>
                </Section>

                <CTASection />
            </main>
            <Footer />
        </>
    );
}
