"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import { stats } from "@/content/home";

/* ─── Parse a stat value like "1,250+" → { num: 1250, suffix: "+" } ──────── */
function parseStat(value: string): { num: number; suffix: string } {
    const clean = value.replace(/,/g, "");
    const match = clean.match(/^([\d.]+)(.*)$/);
    if (!match) return { num: 0, suffix: value };
    return { num: parseFloat(match[1]), suffix: match[2] };
}

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

/* ─── Section — stats only, testimonial moved to TestimonialCarousel ─────── */
export default function SuccessStoriesSection() {
    return (
        <Section className="bg-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                {stats.map((stat, i) => (
                    <StatCard
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        delay={i * 0.1}
                    />
                ))}
            </div>
        </Section>
    );
}
