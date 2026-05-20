"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/layout/Section";
import { jobsTeaser } from "@/content/home";

export default function JobsTeaserSection() {
    return (
        <Section className="bg-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 bg-[#F7F7F6] rounded-[24px] border border-[#E5E5E5] p-8 md:p-12"
            >
                <div className="flex flex-col gap-3 max-w-[560px]">
                    <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest">
                        {jobsTeaser.eyebrow}
                    </p>
                    <h2 className="text-[#111111]">{jobsTeaser.headline}</h2>
                    <p className="text-[#555555] text-base leading-relaxed">{jobsTeaser.subCopy}</p>
                </div>
                <div className="flex-shrink-0">
                    <Link
                        href={jobsTeaser.cta.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary"
                    >
                        {jobsTeaser.cta.label}
                        <span className="ml-2 text-sm">↗</span>
                    </Link>
                </div>
            </motion.div>
        </Section>
    );
}
