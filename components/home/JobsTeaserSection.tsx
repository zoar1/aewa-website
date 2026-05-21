"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/layout/Section";
import { jobsTeaser } from "@/content/home";

export default function JobsTeaserSection() {
    return (
        <Section className="bg-[#F7F7F6]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 bg-[#003366] rounded-[24px] p-8 md:p-12"
            >
                <div className="flex flex-col gap-3 max-w-[560px]">
                    <p className="text-sm font-semibold text-white/60 uppercase tracking-widest">
                        {jobsTeaser.eyebrow}
                    </p>
                    <h2 className="text-white">{jobsTeaser.headline}</h2>
                    <p className="text-white/70 text-base leading-relaxed">{jobsTeaser.subCopy}</p>
                </div>
                <div className="flex-shrink-0">
                    <Link
                        href="/jobs"
                        className="inline-flex items-center justify-center px-7 py-3.5 bg-white text-[#003366] text-sm font-semibold rounded-full border border-white hover:bg-[#F5B800] hover:border-[#F5B800] hover:text-[#003366] transition-all duration-200"
                    >
                        {jobsTeaser.cta.label}
                    </Link>
                </div>
            </motion.div>
        </Section>
    );
}
