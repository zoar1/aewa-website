"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/layout/Section";
import { cta } from "@/content/home";
import RotatingGlobe from "@/components/ui/RotatingGlobe";

interface CTASectionProps {
    headline?: string;
    subCopy?: string;
}

export default function CTASection({ headline, subCopy }: CTASectionProps = {}) {
    return (
        <Section className="bg-[#F7F7F6]">
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">
                {/* Left column — text content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex-1 flex flex-col items-start gap-6"
                >
                    <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest">
                        Work With Us
                    </p>
                    <h2 className="text-[#111111]">{headline ?? cta.headline}</h2>
                    <p className="text-body-lg text-[#555555]">{subCopy ?? cta.subCopy}</p>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                        <Link href={cta.primaryCta.href} className="btn-primary">
                            {cta.primaryCta.label}
                        </Link>
                        <Link
                            href={cta.secondaryCta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary"
                        >
                            {cta.secondaryCta.label}
                        </Link>
                    </div>
                </motion.div>

                {/* Right column — rotating globe */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
                    className="flex-1 flex items-center justify-center"
                >
                    <RotatingGlobe size={380} />
                </motion.div>
            </div>
        </Section>
    );
}
