"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import { stats, testimonial } from "@/content/home";

/* ─── Parse a stat value like "1,250+" → { num: 1250, suffix: "+" } ──────── */
function parseStat(value: string): { num: number; suffix: string } {
    const clean = value.replace(/,/g, "");
    const match = clean.match(/^([\d.]+)(.*)$/);
    if (!match) return { num: 0, suffix: value };
    return { num: parseFloat(match[1]), suffix: match[2] };
}

/* Format a number back with commas if the original had them */
function fmt(n: number, hadComma: boolean): string {
    if (!hadComma) return String(Math.round(n));
    return Math.round(n).toLocaleString("en-US");
}

/* ─── Count-up hook ──────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, active = false) {
    const [count, setCount] = useState(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (!active) return;
        const start = performance.now();
        function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(eased * target);
            if (progress < 1) rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, [active, target, duration]);

    return count;
}

/* ─── Individual stat card ───────────────────────────────────────────────── */
function StatCard({ value, label, delay }: { value: string; label: string; delay: number }) {
    const [inView, setInView] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const hadComma = value.includes(",");
    const { num, suffix } = parseStat(value);
    const count = useCountUp(num, 1600, inView);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
            className="flex flex-col gap-1"
        >
            <span className="text-4xl md:text-5xl font-bold text-[#003366] tracking-tight tabular-nums">
                {inView ? `${fmt(count, hadComma)}${suffix}` : "0"}
            </span>
            <span className="text-sm font-medium text-[#555555] uppercase tracking-wider">
                {label}
            </span>
        </motion.div>
    );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export default function SuccessStoriesSection() {
    return (
        <Section className="bg-white">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 pb-16 md:pb-20 border-b border-black/10">
                {stats.map((stat, i) => (
                    <StatCard
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        delay={i * 0.1}
                    />
                ))}
            </div>

            {/* Testimonial */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                className="pt-16 md:pt-20"
            >
                <div className="max-w-[760px]">
                    <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-8">
                        Client Testimonial
                    </p>
                    <blockquote className="text-[#111111] text-2xl md:text-3xl font-semibold leading-[1.4] mb-10">
                        &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>

                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-full bg-[#003366]/10 border border-[#003366]/20 flex items-center justify-center text-[#003366] font-bold text-sm">
                            {testimonial.author.charAt(0)}
                        </div>
                        <div>
                            <p className="text-[#111111] font-semibold text-sm">{testimonial.author}</p>
                            <p className="text-[#555555] text-sm">{testimonial.role}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Section>
    );
}
