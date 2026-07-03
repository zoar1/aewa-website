"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ServiceItem = {
    id: string;
    tag?: string;
    title: string;
    description: string;
    bullets: string[];
    imageSrc?: string;
};

interface Props {
    items: ServiceItem[];
}

function wrap(index: number, length: number) {
    return (index + length) % length;
}

export default function ServicesCarousel({ items }: Props) {
    const total = items.length;
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);

    const active = items[index];
    const previous = items[wrap(index - 1, total)];
    const next = items[wrap(index + 1, total)];

    const progress = useMemo(() => ((index + 1) / total) * 100, [index, total]);

    function changeSlide(dir: 1 | -1) {
        setDirection(dir);
        setIndex((prev) => wrap(prev + dir, total));
    }

    const slideVariants = {
        enter: (dir: 1 | -1) => ({ x: dir === 1 ? 60 : -60, opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: 1 | -1) => ({ x: dir === 1 ? -60 : 60, opacity: 0 }),
    };

    return (
        <section className="bg-white overflow-x-hidden">
            {/* HEADER */}
            <div className="border-b border-black/10">
                <div className="mx-auto max-w-[1280px] px-6 py-8 sm:py-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-blue">
                        Services
                    </h2>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                        {/* Number + Progress */}
                        <div className="flex items-end gap-3">
                            <span className="text-4xl sm:text-5xl font-bold text-brand-blue leading-none">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            <div className="flex flex-col gap-2 pb-1 min-w-0">
                                <span className="text-sm text-brand-muted">
                                    /{String(total).padStart(2, "0")}
                                </span>

                                <div className="h-[3px] w-[100px] sm:w-[140px] bg-brand-border rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-brand-yellow rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Arrows + hint */}
                        <div className="flex flex-col items-start sm:items-end gap-2">
                            <div className="flex gap-3 shrink-0">
                                <button
                                    type="button"
                                    onClick={() => changeSlide(-1)}
                                    aria-label="Previous service"
                                    className="h-10 w-10 shrink-0 rounded-full bg-brand-blue hover:bg-[#001f3f] transition grid place-items-center"
                                >
                                    <span className="text-white text-base leading-none">←</span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => changeSlide(1)}
                                    aria-label="Next service"
                                    className="h-10 w-10 shrink-0 rounded-full bg-brand-blue hover:bg-[#001f3f] transition grid place-items-center"
                                >
                                    <span className="text-white text-base leading-none">→</span>
                                </button>
                            </div>
                            <span className="text-xs text-brand-muted max-w-[160px] text-left sm:text-right">
                                Use arrows to explore services
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* BODY */}
            <div className="mx-auto max-w-[1280px] px-6 py-14 grid lg:grid-cols-12 gap-12 lg:gap-16">
                {/* LEFT PANEL */}
                <div className="lg:col-span-5 relative">
                    {/* Ghost Titles (desktop) */}


                    <div className="relative">
                        <div className="inline-flex items-center gap-2 border border-brand-border bg-white px-4 py-2 rounded-full text-sm text-brand-blue">
                            <span className="h-2 w-2 rounded-full bg-brand-yellow" />
                            <span>{active.tag ?? "Service"}</span>
                        </div>

                        <h3 className="mt-10 text-4xl md:text-[44px] font-semibold text-brand-ink leading-[1.1]">
                            {active.title}
                        </h3>

                        <p className="mt-6 text-brand-muted max-w-md text-lg leading-relaxed">
                            {active.description}
                        </p>

                        {/* Mobile bullets */}
                        <ul className="mt-8 space-y-3 lg:hidden text-brand-muted">
                            {active.bullets.map((bullet) => (
                                <li key={bullet} className="flex items-start gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                                    <span>{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="lg:col-span-7">
                    <div className="relative min-h-[380px] lg:min-h-[460px] rounded-[24px] overflow-hidden border border-brand-border bg-brand-alt">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={active.id}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.55, ease: "easeOut" }}
                                className="absolute inset-0"
                            >
                                {/* Image or placeholder */}
                                {active.imageSrc ? (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${active.imageSrc})` }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,184,0,0.12),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(22,62,111,0.10),transparent_55%)]" />
                                )}

                                {/* AEWA overlay */}
                                <div className="absolute inset-0 bg-brand-blue/85" />

                                {/* Content */}
                                <div className="relative h-full p-10 flex flex-col justify-end">
                                    <ul className="space-y-3 text-white">
                                        {active.bullets.map((bullet) => (
                                            <li key={bullet} className="flex items-start gap-3">
                                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-yellow" />
                                                <span className="text-white/90">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section >
    );
}