"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Container from "@/components/layout/Container";

interface Breadcrumb {
    label: string;
    href: string;
}

interface PageHeroProps {
    eyebrow?: string;
    title: string;
    description?: string;
    breadcrumbs?: Breadcrumb[];
    /** Optional photo shown on the right, fading into the navy background.
     *  Defaults to /images/hero/hero-right.jpg */
    imageSrc?: string;
}

export default function PageHero({
    eyebrow,
    title,
    description,
    breadcrumbs,
    imageSrc = "/images/hero/hero-right.jpg",
}: PageHeroProps) {
    return (
        <div className="relative overflow-hidden bg-[#003366] pt-28 md:pt-36 pb-12 md:pb-16">
            {/* Right-side image — masked so it fades into the navy on the left */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${imageSrc})`,
                    maskImage:
                        "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 55%)",
                    WebkitMaskImage:
                        "linear-gradient(to left, rgba(0,0,0,0.6) 0%, transparent 55%)",
                }}
            />

            {/* Subtle bottom separator */}
            <div className="absolute bottom-0 inset-x-0 h-px bg-white/10" />

            <Container className="relative">
                {/* Breadcrumb */}
                {breadcrumbs && (
                    <motion.nav
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center gap-2 text-sm text-white/60 mb-8"
                    >
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        {breadcrumbs.map((crumb, i) => (
                            <span key={crumb.href} className="flex items-center gap-2">
                                <span className="text-white/30">/</span>
                                {i === breadcrumbs.length - 1 ? (
                                    <span className="text-white/90 font-medium">
                                        {crumb.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={crumb.href}
                                        className="hover:text-white transition-colors"
                                    >
                                        {crumb.label}
                                    </Link>
                                )}
                            </span>
                        ))}
                    </motion.nav>
                )}

                {/* Eyebrow */}
                {eyebrow && (
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                        className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4"
                    >
                        {eyebrow}
                    </motion.p>
                )}

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="text-white max-w-[620px]"
                >
                    {title}
                </motion.h1>

                {/* Description */}
                {description && (
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
                        className="text-body-lg text-white/70 max-w-[540px] mt-4"
                    >
                        {description}
                    </motion.p>
                )}
            </Container>
        </div>
    );
}
