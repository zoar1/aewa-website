import Navbar from "@/components/nav/Navbar";
import PageHero from "@/components/shared/PageHero";
import Section from "@/components/layout/Section";
import ContactForm from "./ContactForm";
import Footer from "@/components/footer/Footer";
import { contact } from "@/content/pages";
import { getSectionContent, get, DEFAULTS } from "@/lib/content";

export const revalidate = 60;

function buildHref(icon: string, value: string): string | null {
    if (icon === "phone" || icon === "smartphone") {
        const digits = value.match(/\+?\d[\d\s]{6,}\d/)?.[0].replace(/\s+/g, "");
        return digits ? `tel:${digits}` : null;
    }
    if (icon === "mail") {
        return `mailto:${value.trim()}`;
    }
    return null;
}

export default async function ContactPage() {
    const content = await getSectionContent("contact");
    const d = DEFAULTS.contact;

    const details = contact.details.map((item) => {
        const key = item.label.toLowerCase().replace(/\s+/g, "_") + "_value";
        const value = get(content, key, get(d, key, item.value));
        return { ...item, value, href: buildHref(item.icon, value) };
    });

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
                <ContactForm details={details} />
            </main>
            <Footer />
        </>
    );
}
