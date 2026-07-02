"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Section from "@/components/layout/Section";
import { about } from "@/content/pages";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
    }),
};

function PartnerLogo({ src, alt }: { src?: string; alt: string }) {
    const [imgError, setImgError] = useState(false);

    if (!src || imgError) {
        return <span className="text-white font-bold text-lg text-center leading-tight">{alt}</span>;
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="max-h-14 w-auto object-contain" onError={() => setImgError(true)} />
    );
}

interface AboutContentProps {
    mission?: string;
    vision?: string;
    partnerName?: string;
    partnerDescription?: string;
    partner2Name?: string;
    partner2Description?: string;
}

export default function AboutContent({ mission, vision, partnerName, partnerDescription, partner2Name, partner2Description }: AboutContentProps = {}) {
    return (
        <>
            {/* Mission & Vision */}
            <Section className="bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">Our Mission</p>
                        <h2 className="text-[#111111] mb-6">Committed to Inspiring Positive Change</h2>
                        <p className="text-[#555555] leading-relaxed">{mission ?? about.mission}</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        className="flex flex-col gap-8"
                    >
                        {/* Vision card */}
                        <div className="bg-[#0E1A2B] rounded-[24px] p-8 text-white">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Our Vision</p>
                            <p className="text-lg font-semibold leading-relaxed">{vision ?? about.vision}</p>
                        </div>

                        {/* Sectors */}
                        <div className="bg-[#F7F7F6] rounded-[24px] border border-[#E5E5E5] p-8">
                            <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-5">Sectors We Serve</p>
                            <div className="flex flex-wrap gap-2">
                                {about.sectors.map((sector) => (
                                    <span
                                        key={sector}
                                        className="px-4 py-2 bg-white border border-[#E5E5E5] rounded-full text-sm font-medium text-[#111111]"
                                    >
                                        {sector}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Section>

            {/* Core Values */}
            <Section className="bg-[#F7F7F6]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-12 md:mb-16"
                >
                    <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">What We Stand For</p>
                    <h2 className="text-[#111111] max-w-[540px]">All Energy West Africa Core Values</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {about.coreValues.map((value, i) => (
                        <motion.div
                            key={value.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-40px" }}
                            variants={fadeUp}
                            className="bg-white rounded-[24px] border border-[#E5E5E5] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col gap-3"
                        >
                            <span className="w-8 h-8 rounded-[8px] bg-[#0E1A2B] flex items-center justify-center text-white text-xs font-bold">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-[#111111] text-lg font-semibold">{value.title}</h3>
                            <p className="text-[#555555] text-sm leading-relaxed">{value.description}</p>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Strategic Partners */}
            <Section className="bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-[#003366] rounded-[24px] p-8 md:p-12 flex flex-col gap-8"
                >
                    <p className="text-sm font-semibold text-white/60 uppercase tracking-widest">Strategic Partners</p>

                    {/* Partner 1 — Davi Promau */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pb-8 border-b border-white/10">
                        <div className="shrink-0 flex items-center justify-center w-32 h-16">
                            <PartnerLogo src="/images/partners/davi-logo.png" alt="Davi Promau" />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-white text-2xl font-bold mb-3">{partnerName ?? about.partner.name}</h3>
                            <p className="text-white/80 leading-relaxed max-w-[540px]">{partnerDescription ?? about.partner.description}</p>
                        </div>
                        <a
                            href={about.partner.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex-shrink-0 !border-white/30 !text-white hover:!bg-white/10"
                        >
                            Visit Partner Site ↗
                        </a>
                    </div>

                    {/* Partner 2 — RFL Resources */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                        <div className="shrink-0 flex items-center justify-center w-32 h-16">
                            <PartnerLogo src="/images/partners/rfl-logo.png" alt={partner2Name ?? about.partner2.name} />
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-white text-2xl font-bold mb-3">{partner2Name ?? about.partner2.name}</h3>
                            <p className="text-white/80 leading-relaxed max-w-[540px]">{partner2Description ?? about.partner2.description}</p>
                        </div>
                    </div>
                </motion.div>
            </Section>
        </>
    );
}
