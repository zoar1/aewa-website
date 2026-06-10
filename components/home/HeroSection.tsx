"use client";

import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Section from "@/components/layout/Section";
import { hero } from "@/content/home";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: i * 0.12 },
    }),
};

interface HeroSectionProps {
    headline?: string;
    subCopy?: string;
}

export default function HeroSection({ headline, subCopy }: HeroSectionProps = {}) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
        }
    }, []);
    return (
        <Section
            className="relative overflow-hidden bg-[#061A3A] pt-32 md:pt-40 lg:pt-48 pb-16 md:pb-20 lg:pb-28"
            containerClassName=""
        >
            {/* Video background */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    zIndex: 0,
                    filter: "grayscale(1) saturate(0)",
                }}
            >
                <source src="/images/video/rotating-abstract.mp4" type="video/mp4" />
                <source src="/images/video/rotating-abstract.webm" type="video/webm" />
            </video>

            {/* #003366 blue overlay — semi-transparent so the grayscale video shows through */}
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0, 51, 102, 0.55)",
                    zIndex: 1,
                }}
            />

            {/* Content */}
            <div className="relative max-w-[1280px] mx-auto px-5 md:px-8" style={{ zIndex: 2 }}>
                {/* Eyebrow */}
                <motion.div
                    custom={0}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="mb-6"
                >
                    <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm font-medium text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        Operating since 2011 · Lagos, Nigeria
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    custom={1}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-white max-w-[780px] mb-6"
                >
                    {headline ?? hero.headline}
                </motion.h1>

                {/* Sub-copy */}
                <motion.p
                    custom={2}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="text-body-lg text-white/70 max-w-[600px] mb-10"
                >
                    {subCopy ?? hero.subCopy}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    custom={3}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="flex flex-wrap items-center gap-4"
                >
                    <Link
                        href={hero.primaryCta.href}
                        className="btn-primary"
                        style={{ backgroundColor: "#ffffff", color: "#003366", borderColor: "#ffffff" }}
                    >
                        {hero.primaryCta.label}
                    </Link>
                    <Link
                        href={hero.secondaryCta.href}
                        className="btn-secondary"
                        style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}
                    >
                        {hero.secondaryCta.label}
                    </Link>
                </motion.div>

                {/* Decorative divider */}
                <motion.div
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    variants={fadeUp}
                    className="mt-16 md:mt-20 border-t border-white/10"
                />
            </div>
        </Section>
    );
}
