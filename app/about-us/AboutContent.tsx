"use client";

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

export default function AboutContent() {
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
                        <p className="text-[#555555] leading-relaxed">{about.mission}</p>
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
                            <p className="text-lg font-semibold leading-relaxed">{about.vision}</p>
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
                    <h2 className="text-[#111111] max-w-[480px]">AEWA Core Values</h2>
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

            {/* Partner */}
            <Section className="bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-[#F7F7F6] rounded-[24px] border border-[#E5E5E5] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
                >
                    <div className="flex-1">
                        <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-3">Strategic Partner</p>
                        <h3 className="text-[#111111] text-2xl font-bold mb-3">{about.partner.name}</h3>
                        <p className="text-[#555555] leading-relaxed max-w-[540px]">{about.partner.description}</p>
                    </div>
                    <a
                        href={about.partner.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex-shrink-0"
                    >
                        Visit Partner Site ↗
                    </a>
                </motion.div>
            </Section>
        </>
    );
}
