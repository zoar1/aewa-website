"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ZohoJob } from "@/types/jobs";

interface JobDetailContentProps {
    job: ZohoJob;
}

function getJobTypeBadge(jobType: string) {
    const type = jobType.toLowerCase();
    if (type.includes("full")) {
        return { label: "Full-time", className: "bg-[#003366] text-white" };
    }
    if (type.includes("part")) {
        return { label: "Part-time", className: "bg-amber-100 text-amber-800" };
    }
    return { label: "Contract", className: "bg-[#E5E5E5] text-[#555555]" };
}

/**
 * Convert a plain-text job description into paragraphs.
 * Splits on double newlines, then treats single newlines as line breaks.
 */
function formatJobDescription(text: string) {
    // Split on two or more newlines → separate paragraph blocks
    const paragraphs = text
        .split(/\n{2,}/)
        .map((block) => block.trim())
        .filter(Boolean);

    return paragraphs.map((paragraph, idx) => {
        // Within each block, split on single newlines → <br /> equivalent
        const lines = paragraph.split(/\n/).filter(Boolean);
        return (
            <p key={idx} className="text-[#555555] text-[15px] leading-relaxed mb-4 last:mb-0">
                {lines.map((line, lineIdx) => (
                    <span key={lineIdx}>
                        {line}
                        {lineIdx < lines.length - 1 && <br />}
                    </span>
                ))}
            </p>
        );
    });
}

export default function JobDetailContent({ job }: JobDetailContentProps) {
    const badge = getJobTypeBadge(job.Job_Type);
    const location = [job.City, job.State, job.Country].filter(Boolean).join(", ");

    return (
        <div className="bg-[#F7F7F6] min-h-screen pt-28 md:pt-36 pb-24">
            <div className="max-w-[1200px] mx-auto px-6 md:px-10">
                {/* Back link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="mb-10"
                >
                    <Link
                        href="/jobs"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#555555] hover:text-[#111111] transition-colors group"
                    >
                        <svg
                            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                        </svg>
                        Back to Jobs
                    </Link>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
                    {/* Main content column */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
                        className="flex-1 min-w-0"
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${badge.className}`}
                                >
                                    {badge.label}
                                </span>
                                {job.Industry && (
                                    <span className="text-xs text-[#555555] font-medium">
                                        {job.Industry}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-[#111111] font-bold text-[clamp(28px,4vw,40px)] leading-tight tracking-tight mb-4">
                                {job.Job_Opening_Name}
                            </h1>

                            {location && (
                                <div className="flex items-center gap-1.5 text-[#555555] text-sm">
                                    <svg
                                        className="w-4 h-4 shrink-0 text-[#003366]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={1.8}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                        />
                                    </svg>
                                    <span>{location}</span>
                                </div>
                            )}
                        </div>

                        {/* Job description */}
                        <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                            <h2 className="text-lg font-semibold text-[#111111] mb-6 pb-4 border-b border-[#F0F0F0]">
                                Role Overview
                            </h2>
                            <div className="prose-custom">
                                {formatJobDescription(job.Job_Description)}
                            </div>
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                        className="lg:w-[300px] xl:w-[340px] shrink-0"
                    >
                        <div className="lg:sticky lg:top-28 flex flex-col gap-5">
                            {/* Apply card */}
                            <div className="bg-[#003366] rounded-[24px] p-7 text-white">
                                <h3 className="font-semibold text-lg mb-2 text-white">
                                    Interested in this role?
                                </h3>
                                <p className="text-white/70 text-sm mb-6 leading-relaxed">
                                    Send your CV and a brief cover note to our recruitment team.
                                </p>
                                <a
                                    href={`mailto:recruitment@aewanl.com?subject=Application: ${encodeURIComponent(job.Job_Opening_Name)}`}
                                    className="inline-flex items-center justify-center w-full px-5 py-3 bg-white text-[#003366] text-sm font-semibold rounded-full hover:bg-[#F7F7F6] transition-colors duration-200"
                                >
                                    Apply Now
                                    <svg
                                        className="ml-2 w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                        />
                                    </svg>
                                </a>
                            </div>

                            {/* Job details card */}
                            <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                                <h3 className="font-semibold text-[#111111] text-base mb-5">
                                    Job Details
                                </h3>
                                <dl className="flex flex-col gap-4">
                                    {[
                                        { label: "Employment Type", value: badge.label },
                                        { label: "Location", value: location || "Nigeria" },
                                        { label: "Industry", value: job.Industry || "—" },
                                        {
                                            label: "Positions Available",
                                            value: job.Number_of_Positions ?? "1",
                                        },
                                        ...(job.Target_Date
                                            ? [{
                                                label: "Target Date",
                                                value: new Date(job.Target_Date).toLocaleDateString("en-GB", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                }),
                                            }]
                                            : []),
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex flex-col gap-0.5">
                                            <dt className="text-xs font-medium text-[#555555] uppercase tracking-wide">
                                                {label}
                                            </dt>
                                            <dd className="text-sm text-[#111111] font-medium">
                                                {value}
                                            </dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>

                            {/* Browse more jobs */}
                            <Link
                                href="/jobs"
                                className="inline-flex items-center justify-center w-full px-5 py-3 bg-transparent text-[#111111] text-sm font-semibold rounded-full border border-[#E5E5E5] hover:bg-[#F7F7F6] transition-colors duration-200"
                            >
                                ← Browse All Roles
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
