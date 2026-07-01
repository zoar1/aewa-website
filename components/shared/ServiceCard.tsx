"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ServiceIcon from "./ServiceIcon";

interface ServiceCardProps {
    title: string;
    description: string;
    href: string;
    icon: string;
    index: number;
    variant?: "white" | "blue";
}

export default function ServiceCard({ title, description, href, icon, index, variant = "white" }: ServiceCardProps) {
    const isBlue = variant === "blue";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
            whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
            className="h-full"
        >
            <Link
                href={href}
                className={
                    isBlue
                        ? "group flex flex-col gap-5 h-full bg-[#003366] rounded-[24px] border border-white/10 p-8 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:bg-[#004080] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] transition-all duration-300"
                        : "group flex flex-col gap-5 h-full bg-white rounded-[24px] border border-[#E5E5E5] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-[#003366]/30 transition-all duration-300"
                }
            >
                <div
                    className={
                        isBlue
                            ? "w-12 h-12 rounded-[12px] bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0"
                            : "w-12 h-12 rounded-[12px] bg-[#F7F7F6] border border-[#E5E5E5] flex items-center justify-center flex-shrink-0"
                    }
                >
                    <ServiceIcon name={icon} size={22} className={isBlue ? "text-[#ffcb00]" : "text-[#003366]"} />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <h3 className={isBlue ? "text-white transition-colors duration-200" : "text-[#111111] group-hover:text-[#003366] transition-colors duration-200"}>
                        {title}
                    </h3>
                    <p className={isBlue ? "text-white/70 text-sm leading-relaxed" : "text-[#555555] text-sm leading-relaxed"}>
                        {description}
                    </p>
                </div>
                <span
                    className={
                        isBlue
                            ? "flex items-center gap-2 text-sm font-semibold text-white group-hover:gap-3 transition-all duration-200"
                            : "flex items-center gap-2 text-sm font-semibold text-[#111111] group-hover:gap-3 transition-all duration-200"
                    }
                >
                    Learn more <span className="text-base">→</span>
                </span>
            </Link>
        </motion.div>
    );
}
