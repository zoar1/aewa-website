"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Section from "@/components/layout/Section";
import { valueProps } from "@/content/home";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: i * 0.08 },
    }),
};

export default function ValuePropsSection() {
    return (
        <Section className="bg-white">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12 md:mb-16"
            >
                <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">
                    The AEWA Advantage
                </p>
                <h2 className="text-[#111111] max-w-[520px]">
                    Why Leading Organisations Choose AEWA
                </h2>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {valueProps.map((prop, i) => (
                    <motion.div
                        key={prop.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={fadeUp}
                        className="flex flex-col gap-3 border-t border-[#E5E5E5] pt-6"
                    >
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-[8px] bg-[#0E1A2B] flex items-center justify-center text-white text-sm font-bold">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <h3 className="text-[#111111] text-lg font-semibold">{prop.title}</h3>
                        </div>
                        <p className="text-[#555555] text-sm leading-relaxed">{prop.description}</p>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="mt-12 md:mt-16 pt-10 border-t border-[#E5E5E5] flex items-center gap-6"
            >
                <Link href="/about-us" className="btn-secondary">
                    Learn More About Us
                </Link>
                <span className="text-[#555555] text-sm">
                    Founded in Lagos · Operating since 2011
                </span>
            </motion.div>
        </Section>
    );
}
