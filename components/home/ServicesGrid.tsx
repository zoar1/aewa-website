"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Section from "@/components/layout/Section";
import { services } from "@/content/home";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: i * 0.1 },
    }),
};

export default function ServicesGrid() {
    return (
        <Section id="services" className="bg-[#F7F7F6]">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12 md:mb-16"
            >
                <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">
                    What We Do
                </p>
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <h2 className="text-[#111111] max-w-[480px]">
                        End-to-End HR Solutions Built for Africa
                    </h2>
                    <p className="text-[#555555] text-base leading-relaxed max-w-[360px]">
                        From recruitment to training, we deliver the full spectrum of workforce services.
                    </p>
                </div>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {services.map((service, i) => (
                    <motion.div
                        key={service.title}
                        custom={i}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-40px" }}
                        variants={fadeUp}
                        whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
                        className={`group bg-white rounded-[24px] border border-[#E5E5E5] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex flex-col gap-5 cursor-pointer transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] ${i === 0 ? "md:col-span-2 lg:col-span-1" : ""
                            }`}
                    >
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-[12px] bg-[#F7F7F6] border border-[#E5E5E5] flex items-center justify-center text-xl">
                            {service.icon}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col gap-2 flex-1">
                            <h3 className="text-[#111111]">{service.title}</h3>
                            <p className="text-[#555555] text-sm leading-relaxed">{service.description}</p>
                        </div>

                        {/* Link */}
                        <Link
                            href={service.href}
                            className="flex items-center gap-2 text-sm font-semibold text-[#111111] group-hover:gap-3 transition-all duration-200"
                        >
                            Learn more
                            <span className="text-base">→</span>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
