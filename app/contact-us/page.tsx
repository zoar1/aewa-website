import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import ContactForm from "./ContactForm";
import Footer from "@/components/footer/Footer";
import { contact } from "@/content/pages";
import { getSectionContent, get, DEFAULTS } from "@/lib/content";

export const revalidate = 60;

export default async function ContactPage() {
    const content = await getSectionContent("contact");
    const d = DEFAULTS.contact;

    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="Get in Touch"
                    title={get(content, "headline", d.headline)}
                    description={get(content, "description", d.description)}
                    imageSrc="/images/hero/contact.jpg"
                    breadcrumbs={[{ label: "Contact Us", href: "/contact-us" }]}
                />
                <ContactForm />
            </main>
            <Footer />
        </>
    );
}
