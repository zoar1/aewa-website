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
    featured?: boolean;
}

export default function ServiceCard({ title, description, href, icon, index, variant = "white", featured = false }: ServiceCardProps) {
    const isBlue = variant === "blue";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
            whileHover={{ scale: 1.015, transition: { duration: 0.3 } }}
            className={featured ? "h-full md:col-span-2 lg:col-span-3" : "h-full"}
        >
            <Link
                href={href}
                className={[
                    "group flex h-full gap-5 rounded-[24px] p-8 transition-all duration-300",
                    featured ? "flex-col md:flex-row md:items-center md:gap-10" : "flex-col",
                    isBlue
                        ? "bg-[#003366] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.12)] hover:bg-[#004080] hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
                        : "bg-white border border-[#E5E5E5] shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-[#003366]/30",
                ].join(" ")}
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
                <div className={`flex flex-col gap-2 flex-1 ${featured ? "md:max-w-[640px]" : ""}`}>
                    <h3 className={isBlue ? "text-white transition-colors duration-200" : "text-[#111111] group-hover:text-[#003366] transition-colors duration-200"}>
                        {title}
                    </h3>
                    <p className={isBlue ? "text-white/70 text-sm leading-relaxed" : "text-[#555555] text-sm leading-relaxed"}>
                        {description}
                    </p>
                </div>
                <span
                    className={[
                        "flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-200 flex-shrink-0",
                        featured ? "md:ml-auto" : "",
                        isBlue ? "text-white" : "text-[#111111]",
                    ].join(" ")}
                >
                    Learn more <span className="text-base">→</span>
                </span>
            </Link>
        </motion.div>
    );
}
