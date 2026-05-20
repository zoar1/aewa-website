"use client";

import Link from "next/link";
import { ZohoJob } from "@/types/jobs";

interface JobCardProps {
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

function getDescriptionPreview(description: string, maxChars = 140): string {
    const cleaned = description.replace(/\s+/g, " ").trim();
    if (cleaned.length <= maxChars) return cleaned;
    return cleaned.slice(0, maxChars).trimEnd() + "…";
}

export default function JobCard({ job }: JobCardProps) {
    const badge = getJobTypeBadge(job.Job_Type);
    const preview = getDescriptionPreview(job.Job_Description);
    const location = [job.City, job.State].filter(Boolean).join(", ");

    return (
        <article className="flex flex-col h-full bg-white rounded-[24px] border border-[#E5E5E5] shadow-[0_10px_30px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300">
            <div className="flex flex-col flex-1 p-7 gap-4">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${badge.className}`}
                    >
                        {badge.label}
                    </span>
                    {job.Industry && (
                        <span className="text-xs text-[#555555] font-medium truncate max-w-[150px]">
                            {job.Industry}
                        </span>
                    )}
                </div>

                <h3 className="text-[#111111] font-semibold leading-tight line-clamp-2">
                    {job.Job_Opening_Name}
                </h3>

                {location && (
                    <div className="flex items-center gap-1.5 text-sm text-[#555555]">
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

                <p className="text-sm text-[#555555] leading-relaxed flex-1">
                    {preview}
                </p>
            </div>

            <div className="px-7 pb-7">
                <Link
                    href={`/jobs/${job.id}`}
                    className="inline-flex items-center justify-center w-full px-5 py-3 bg-[#003366] text-white text-sm font-semibold rounded-full border border-[#003366] hover:bg-[#004080] transition-colors duration-200"
                >
                    View Role
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
                </Link>
            </div>
        </article>
    );
}
