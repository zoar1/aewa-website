"use client";

import { useState, ReactElement } from "react";
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

const SECTION_HEADING_RE = /^(requirements?|key responsibilities|responsibilities|qualifications?|skills?|experience|about the role|role overview|what you.ll do|what we.re looking for|benefits?|what we offer|duties|key duties|job summary|summary|overview|objectives?):?$/i;
const NUMBERED_RE = /^\d+\.\s/;
const BULLET_RE = /^[•\-\*]\s/;

function formatJobDescription(text: string) {
    const rawBlocks = text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

    const elements: ReactElement[] = [];

    rawBlocks.forEach((block, blockIdx) => {
        const lines = block.split(/\n/).map((l) => l.trim()).filter(Boolean);

        // Single-line block that looks like a heading
        if (lines.length === 1 && SECTION_HEADING_RE.test(lines[0].replace(/:$/, ""))) {
            elements.push(
                <h4 key={`h-${blockIdx}`} className="text-[#111111] font-semibold text-base mt-6 mb-2 first:mt-0">
                    {lines[0].replace(/:$/, "")}
                </h4>
            );
            return;
        }

        // Detect if this block is a list (numbered or bulleted)
        const isList = lines.every((l) => NUMBERED_RE.test(l) || BULLET_RE.test(l));
        if (isList) {
            elements.push(
                <ul key={`ul-${blockIdx}`} className="list-none space-y-2 mb-4">
                    {lines.map((line, li) => (
                        <li key={li} className="flex items-start gap-2 text-[#555555] text-[15px] leading-relaxed">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#003366] flex-shrink-0" />
                            <span>{line.replace(NUMBERED_RE, "").replace(BULLET_RE, "")}</span>
                        </li>
                    ))}
                </ul>
            );
            return;
        }

        // Mixed block — check each line individually
        const hasListLines = lines.some((l) => NUMBERED_RE.test(l) || BULLET_RE.test(l));
        if (hasListLines) {
            lines.forEach((line, li) => {
                if (SECTION_HEADING_RE.test(line.replace(/:$/, ""))) {
                    elements.push(
                        <h4 key={`h-${blockIdx}-${li}`} className="text-[#111111] font-semibold text-base mt-6 mb-2">
                            {line.replace(/:$/, "")}
                        </h4>
                    );
                } else if (NUMBERED_RE.test(line) || BULLET_RE.test(line)) {
                    elements.push(
                        <div key={`li-${blockIdx}-${li}`} className="flex items-start gap-2 text-[#555555] text-[15px] leading-relaxed mb-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#003366] flex-shrink-0" />
                            <span>{line.replace(NUMBERED_RE, "").replace(BULLET_RE, "")}</span>
                        </div>
                    );
                } else {
                    elements.push(
                        <p key={`p-${blockIdx}-${li}`} className="text-[#555555] text-[15px] leading-relaxed mb-3">
                            {line}
                        </p>
                    );
                }
            });
            return;
        }

        // Plain paragraph — join all lines
        elements.push(
            <p key={`p-${blockIdx}`} className="text-[#555555] text-[15px] leading-relaxed mb-4 last:mb-0">
                {lines.join(" ")}
            </p>
        );
    });

    return elements;
}

function ApplyForm({ jobTitle, jobId }: { jobTitle: string; jobId: string }) {
    const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");
        try {
            const res = await fetch("/api/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, jobTitle, jobId }),
            });
            const data = await res.json();
            if (!res.ok) {
                setErrorMsg(data.error || "Something went wrong.");
                setStatus("error");
            } else {
                setStatus("success");
            }
        } catch {
            setErrorMsg("Network error. Please try again.");
            setStatus("error");
        }
    }

    if (status === "success") {
        return (
            <div className="bg-[#003366] rounded-[24px] p-7 text-white">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="font-semibold text-lg mb-2">Application Sent!</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                    Thank you, {form.name}. Our team will be in touch at {form.email}.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-[#003366] rounded-[24px] p-7 text-white">
            <h3 className="font-semibold text-lg mb-1 text-white">Apply for this Role</h3>
            <p className="text-white/60 text-sm mb-5 leading-relaxed">
                Fill in your details and we'll be in touch.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors"
                />
                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors"
                />
                <textarea
                    name="message"
                    placeholder="Cover note (optional)"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/60 transition-colors resize-none"
                />
                {errorMsg && (
                    <p className="text-red-300 text-xs">{errorMsg}</p>
                )}
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="inline-flex items-center justify-center w-full px-5 py-3 bg-white text-[#003366] text-sm font-semibold rounded-full hover:bg-[#F7F7F6] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                >
                    {status === "submitting" ? "Sending…" : "Submit Application"}
                </button>
            </form>
        </div>
    );
}

export default function JobDetailContent({ job }: JobDetailContentProps) {
    const badge = getJobTypeBadge(job.Job_Type ?? "");
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
                            <div>
                                {job.Job_Description
                                    ? formatJobDescription(job.Job_Description)
                                    : <p className="text-[#555555] text-sm">No description available.</p>}
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
                            {/* Apply form */}
                            <ApplyForm
                                jobTitle={job.Job_Opening_Name ?? ""}
                                jobId={job.id}
                            />

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
