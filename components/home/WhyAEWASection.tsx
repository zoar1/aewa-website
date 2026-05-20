"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { valueProps } from "@/content/home";
import Container from "@/components/layout/Container";


/* ─────────────────────────────────────────────
   Individual card — fades in/out as it scrolls
   through the sticky viewport window.
   Number badge is left-aligned inline with title.
   No yellow left border — clean card.
───────────────────────────────────────────── */
function WhyCard({
    index,
    title,
    description,
    progress,
}: {
    index: number;
    title: string;
    description: string;
    progress: any;
}) {
    // For the first card, we use the section's scroll progress to drive the reveal
    const opacityTransform = useTransform(progress, [0, 0.08], [0, 1]);
    const yTransform = useTransform(progress, [0, 0.08], [400, 0]);

    const isFirst = index === 0;

    return (
        <motion.div
            initial={isFirst ? undefined : { opacity: 0, y: 80 }}
            whileInView={isFirst ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            style={isFirst ? { opacity: opacityTransform, y: yTransform } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center px-4 md:px-8 lg:px-12 py-10 md:py-16"
        >
            {/* Card body */}
            <div
                className="w-full max-w-[560px] rounded-2xl p-8 md:p-10"
                style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.10)",
                    backdropFilter: "blur(8px)",
                }}
            >
                {/* Number + Title row */}
                <div className="flex items-baseline gap-5 mb-5">
                    <span
                        className="text-4xl font-bold flex-shrink-0 tabular-nums"
                        style={{ color: "#ffcb00", lineHeight: 1 }}
                    >
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3
                        className="text-white font-bold"
                        style={{
                            fontSize: "clamp(20px, 2.4vw, 28px)",
                            lineHeight: 1.25,
                            letterSpacing: "-0.01em",
                        }}
                    >
                        {title}
                    </h3>
                </div>

                {/* Divider */}
                <div
                    className="mb-5"
                    style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.08)",
                    }}
                />

                {/* Description */}
                <p
                    className="leading-relaxed"
                    style={{
                        color: "rgba(255,255,255,0.68)",
                        fontSize: "clamp(15px, 1.4vw, 17px)",
                    }}
                >
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────
   Progress bar that fills as user scrolls
───────────────────────────────────────────── */
function ProgressBar({
    scrollYProgress,
}: {
    scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
    return (
        <div
            className="absolute left-0 top-0 w-[3px] h-full rounded-full overflow-hidden"
            style={{ background: "rgba(255,203,0,0.18)" }}
        >
            <motion.div
                className="w-full origin-top rounded-full"
                style={{ scaleY, background: "#ffcb00", height: "100%" }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function WhyAEWASection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={sectionRef} style={{ background: "#00326a" }} className="relative">
            <Container>
                <div className="flex flex-col lg:flex-row">

                {/* ── LEFT — sticky heading ─────────────────── */}
                <div className="hidden lg:flex lg:w-[44%] flex-shrink-0">
                    <div
                        className="sticky top-0 h-screen w-full flex flex-col justify-center relative"
                        style={{ padding: "0 clamp(40px, 5vw, 80px)" }}
                    >
                        {/* Progress track */}
                        <ProgressBar scrollYProgress={scrollYProgress} />

                        <div style={{ paddingLeft: "24px" }}>
                            {/* Eyebrow */}
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="font-bold uppercase mb-5"
                                style={{
                                    color: "#ffcb00",
                                    fontSize: "11px",
                                    letterSpacing: "0.18em",
                                }}
                            >
                                The AEWA Advantage
                            </motion.p>

                            {/* Heading */}
                            <motion.h2
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.08 }}
                                className="text-white font-bold mb-6"
                                style={{
                                    fontSize: "clamp(28px, 3vw, 44px)",
                                    lineHeight: 1.15,
                                    letterSpacing: "-0.02em",
                                    maxWidth: "360px",
                                }}
                            >
                                Why Leading Organisations Choose AEWA
                            </motion.h2>

                            {/* Sub-text */}
                            <motion.p
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.55, delay: 0.18 }}
                                className="leading-relaxed mb-10"
                                style={{
                                    color: "rgba(255,255,255,0.55)",
                                    fontSize: "14px",
                                    maxWidth: "300px",
                                }}
                            >
                                Six reasons Africa's most demanding organisations trust us to deliver.
                            </motion.p>

                            {/* CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.26 }}
                            >
                                <Link
                                    href="/about-us"
                                    className="inline-flex items-center gap-2 font-semibold rounded-full px-6 py-3 transition-all duration-200"
                                    style={{
                                        background: "#ffcb00",
                                        color: "#00326a",
                                        fontSize: "14px",
                                    }}
                                    onMouseEnter={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.background = "#ffd633";
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.currentTarget as HTMLAnchorElement).style.background = "#ffcb00";
                                    }}
                                >
                                    Learn More About Us
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path
                                            d="M2 7h10M8 3l4 4-4 4"
                                            stroke="currentColor"
                                            strokeWidth="1.6"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT — scrollable cards ──────────────── */}
                <div className="lg:w-[56%] flex-shrink-0">
                    {/* Mobile-only heading */}
                    <div
                        className="lg:hidden px-6 pt-16 pb-6"
                        style={{ paddingLeft: "clamp(24px, 6vw, 48px)" }}
                    >
                        <p
                            className="font-bold uppercase mb-4"
                            style={{ color: "#ffcb00", fontSize: "11px", letterSpacing: "0.18em" }}
                        >
                            The AEWA Advantage
                        </p>
                        <h2
                            className="text-white font-bold mb-4"
                            style={{
                                fontSize: "clamp(26px, 6vw, 36px)",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            Why Leading Organisations Choose AEWA
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "14px" }}>
                            Six reasons Africa's most demanding organisations trust us to deliver.
                        </p>
                    </div>

                    {/* First card top padding — starts near bottom of viewport to scroll up */}
                    <div className="hidden lg:block h-[75vh]" />

                    {/* Cards — generous spacing for clarity and height */}
                    <div className="flex flex-col gap-12 md:gap-20">
                        {valueProps.map((prop, i) => (
                            <WhyCard
                                key={prop.title}
                                index={i}
                                title={prop.title}
                                description={prop.description}
                                progress={scrollYProgress}
                            />
                        ))}
                    </div>

                    {/* Bottom breathing room */}
                    <div className="hidden lg:block h-[15vh]" />
                </div>
            </div>
        </Container>
    </section>

    );
}
