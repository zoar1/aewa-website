"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Section from "@/components/layout/Section";
import ServiceCard from "@/components/shared/ServiceCard";
import { serviceDetails } from "@/content/pages";
import { services } from "@/content/home";
import ServiceIcon from "@/components/shared/ServiceIcon";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
    }),
};

interface Props {
    slug: string;
}

export default function ServiceContent({ slug }: Props) {
    const service = serviceDetails[slug];
    if (!service) return null;

    const related = service.relatedSlugs
        .map((s) => {
            const detail = serviceDetails[s];
            const homeService = services.find((sv) =>
                sv.href.includes(s)
            );
            if (!detail || !homeService) return null;
            return { ...homeService, href: `/services/${s}` };
        })
        .filter(Boolean) as typeof services;

    return (
        <>
            {/* Main content */}
            <Section className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Sections */}
                    <div className="lg:col-span-2 flex flex-col gap-12">
                        {service.sections.map((section, i) => (
                            <motion.div
                                key={section.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-40px" }}
                                variants={fadeUp}
                                className="flex flex-col gap-4 pb-10 border-b border-[#E5E5E5] last:border-0 last:pb-0"
                            >
                                <div className="flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-[8px] bg-[#0E1A2B] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-[#111111]">{section.title}</h3>
                                </div>
                                <p className="text-[#555555] leading-relaxed pl-11">{section.body}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        className="flex flex-col gap-5"
                    >
                        {/* CTA card */}
                        <div className="bg-[#0E1A2B] rounded-[24px] p-8 text-white flex flex-col gap-5">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                                Ready to get started?
                            </p>
                            <h3 className="text-xl font-bold leading-snug">
                                Speak with an AEWA specialist today
                            </h3>
                            <Link href="/contact-us" className="btn-primary bg-white text-[#111111] hover:bg-white/90 border-white">
                                Contact Us
                            </Link>
                        </div>

                        {/* Download brochure */}
                        <a
                            href="https://aewanl.com/AEWA_Company_Profile.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 bg-[#F7F7F6] border border-[#E5E5E5] rounded-[20px] p-5 hover:border-[#111111] transition-colors duration-200 group"
                        >
                            <div className="w-10 h-10 rounded-[10px] bg-white border border-[#E5E5E5] flex items-center justify-center text-lg flex-shrink-0">
                                📄
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[#111111] group-hover:underline">
                                    Company Brochure
                                </p>
                                <p className="text-xs text-[#555555]">Download PDF ↗</p>
                            </div>
                        </a>

                        {/* All services */}
                        <div className="bg-[#F7F7F6] border border-[#E5E5E5] rounded-[20px] p-6 flex flex-col gap-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#555555] mb-1">
                                All Services
                            </p>
                            {Object.values(serviceDetails).map((s) => (
                                <Link
                                    key={s.slug}
                                    href={`/services/${s.slug}`}
                                    className={`flex items-center gap-3 text-sm font-medium py-2.5 px-3 rounded-[12px] transition-colors duration-150 ${s.slug === slug
                                            ? "bg-[#111111] text-white"
                                            : "text-[#555555] hover:text-[#111111] hover:bg-white"
                                        }`}
                                >
                                    <ServiceIcon
                                        name={s.icon}
                                        size={16}
                                        className={`shrink-0 ${s.slug === slug ? "text-white" : "text-[#003366]"}`}
                                    />
                                    {s.title}
                                </Link>
                            ))}
                        </div>
                    </motion.aside>
                </div>
            </Section>

            {/* Related services */}
            {related.length > 0 && (
                <Section className="bg-[#F7F7F6]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="mb-10"
                    >
                        <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-3">
                            Related Services
                        </p>
                        <h2 className="text-[#111111]">You Might Also Need</h2>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {related.map((s, i) => (
                            <ServiceCard
                                key={s.title}
                                title={s.title}
                                description={s.description}
                                href={s.href}
                                icon={s.icon}
                                index={i}
                            />
                        ))}
                    </div>
                </Section>
            )}
        </>
    );
}
