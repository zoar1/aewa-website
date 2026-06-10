import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/footer/Footer";
import ClientsGrid from "./ClientsGrid";

export default function ClientsPage() {
    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="Who Trusts Us"
                    title="Organisations We Have Worked With"
                    description="Since 2011, All Energy West Africa has partnered with leading energy, industrial, and technology companies across Nigeria and West Africa."
                    breadcrumbs={[{ label: "Clients", href: "/clients" }]}
                />
                <ClientsGrid />
                <CTASection />
            </main>
            <Footer />
        </>
    );
}
