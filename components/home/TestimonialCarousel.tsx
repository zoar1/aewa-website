"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
}

const FALLBACK: Testimonial[] = [
    {
        id: "fallback-1",
        quote: "AEWA responded quickly to our questions and provided the best set of employees for our company. AEWA are the best adviser you can have. I highly recommend them.",
        author: "Morenike Bamidele",
        role: "HR Manager",
    },
    {
        id: "fallback-2",
        quote: "Their deep understanding of the energy sector meant they could identify the right talent quickly. Every candidate they presented was technically qualified and a strong cultural fit.",
        author: "Chidi Okonkwo",
        role: "Project Director, EPC Contractor",
    },
    {
        id: "fallback-3",
        quote: "Working with All Energy West Africa on our expatriate permit requirements was seamless. They handled every regulatory detail professionally and kept us fully compliant throughout.",
        author: "Sandra Osei",
        role: "Operations Manager",
    },
    {
        id: "fallback-4",
        quote: "We needed a full crew mobilised within two weeks for an offshore campaign. They delivered every position on time. That kind of responsiveness is rare in this market.",
        author: "Emeka Nwosu",
        role: "Offshore Installation Manager",
    },
    {
        id: "fallback-5",
        quote: "The payroll and compliance service has taken a significant administrative burden off our team. Accurate, confidential, and always on schedule — exactly what we needed.",
        author: "Taiwo Adeyemi",
        role: "Finance Controller",
    },
];

export default function TestimonialCarousel() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    /* Fetch from Supabase */
    useEffect(() => {
        const supabase = createClient();
        supabase
            .from("testimonials")
            .select("id, quote, author, role")
            .eq("active", true)
            .order("created_at", { ascending: true })
            .then(({ data }) => {
                if (data && data.length > 0) setTestimonials(data);
            });
    }, []);

    /* Auto-advance every 6 seconds */
    useEffect(() => {
        if (testimonials.length <= 1) return;
        intervalRef.current = setInterval(() => {
            setDirection(1);
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [testimonials]);

    function goTo(i: number) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDirection(i > index ? 1 : -1);
        setIndex(i);
    }

    const current = testimonials[index];

    const variants = {
        enter: (dir: 1 | -1) => ({ x: dir === 1 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: 1 | -1) => ({ x: dir === 1 ? -60 : 60, opacity: 0 }),
    };

    return (
        <section className="bg-white py-16 md:py-20">
            <div className="max-w-[1280px] mx-auto px-5 md:px-8">
                <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-10">
                    Client Testimonials
                </p>

                <div className="relative min-h-[180px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={current.id}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                            <blockquote className="text-[#111111] text-2xl md:text-3xl font-semibold leading-[1.4] mb-10 max-w-[760px]">
                                &ldquo;{current.quote}&rdquo;
                            </blockquote>

                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-full bg-[#003366]/10 border border-[#003366]/20 flex items-center justify-center text-[#003366] font-bold text-sm">
                                    {current.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[#111111] font-semibold text-sm">{current.author}</p>
                                    <p className="text-[#555555] text-sm">{current.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Dot navigation */}
                <div className="flex items-center gap-2 mt-10">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${i === index
                                ? "w-6 bg-[#003366]"
                                : "w-2 bg-[#E5E5E5] hover:bg-[#AAAAAA]"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
