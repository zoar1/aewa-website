import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import ContactForm from "./ContactForm";
import Footer from "@/components/footer/Footer";
import { contact } from "@/content/pages";

export default function ContactPage() {
    return (
        <>
            <Navbar />
            <main>
                <PageHero
                    eyebrow="Get in Touch"
                    title={contact.headline}
                    description={contact.description}
                    imageSrc="/images/hero/contact.jpg"
                    breadcrumbs={[{ label: "Contact Us", href: "/contact-us" }]}
                />
                <ContactForm />
            </main>
            <Footer />
        </>
    );
}
