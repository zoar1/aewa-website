"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ZohoJob } from "@/types/jobs";
import JobCard from "@/components/JobCard";

interface JobsClientProps {
    jobs: ZohoJob[];
}

type Filters = {
    jobType: string;
    location: string;
    department: string;
};

function normaliseJobType(raw: string | null | undefined): string {
    const t = (raw ?? "").toLowerCase();
    if (t.includes("full")) return "Full-time";
    if (t.includes("part")) return "Part-time";
    return "Contract";
}

function FilterSelect({
    id,
    label,
    value,
    onChange,
    options,
}: {
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: string[];
}) {
    const isActive = value !== "";

    return (
        <div className="flex flex-col gap-1.5 min-w-0">
            <label
                htmlFor={id}
                className="text-xs font-semibold text-[#555555] uppercase tracking-wider"
            >
                {label}
            </label>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={`
            w-full appearance-none pl-4 pr-9 py-2.5
            text-sm font-medium rounded-full border
            cursor-pointer outline-none transition-all duration-200
            ${isActive
                            ? "bg-[#003366] text-white border-[#003366]"
                            : "bg-white text-[#111111] border-[#E5E5E5] hover:border-[#003366]"
                        }
            focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10
          `}
                >
                    <option value="">All</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
                <div
                    className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${isActive ? "text-white" : "text-[#555555]"
                        }`}
                >
                    <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}

/* Highlights the matched portion of a string */
function HighlightMatch({ text, query }: { text: string; query: string }) {
    if (!query) return <>{text}</>;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, idx)}
            <span className="font-bold text-[#003366]">
                {text.slice(idx, idx + query.length)}
            </span>
            {text.slice(idx + query.length)}
        </>
    );
}

const INITIAL_VISIBLE = 6;

export default function JobsClient({ jobs }: JobsClientProps) {
    const [filters, setFilters] = useState<Filters>({
        jobType: "",
        location: "",
        department: "",
    });

    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
    const searchRef = useRef<HTMLDivElement>(null);

    /* Close dropdown when clicking outside */
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const options = useMemo(() => {
        const jobTypes = [...new Set(jobs.map((j) => normaliseJobType(j.Job_Type)))].sort();
        const locations = [...new Set(jobs.map((j) => j.State).filter(Boolean))].sort();
        const departments = [...new Set(jobs.map((j) => j.Industry).filter(Boolean))].sort();
        return { jobTypes, locations, departments };
    }, [jobs]);

    /* Dropdown suggestions — match title, client name, or city */
    const suggestions = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return jobs
            .filter((j) =>
                j.Job_Opening_Name?.toLowerCase().includes(q) ||
                j.Client_Name?.name?.toLowerCase().includes(q) ||
                j.City?.toLowerCase().includes(q)
            )
            .slice(0, 8); // cap at 8 suggestions
    }, [jobs, query]);

    const filtered = useMemo(() => {
        return jobs.filter((job) => {
            const typeMatch = !filters.jobType || normaliseJobType(job.Job_Type) === filters.jobType;
            const locationMatch = !filters.location || job.State === filters.location;
            const deptMatch = !filters.department || job.Industry === filters.department;
            const q = query.trim().toLowerCase();
            const queryMatch = !q ||
                job.Job_Opening_Name?.toLowerCase().includes(q) ||
                job.Client_Name?.name?.toLowerCase().includes(q) ||
                job.City?.toLowerCase().includes(q);
            return typeMatch && locationMatch && deptMatch && queryMatch;
        });
    }, [jobs, filters, query]);

    const hasFilters = Object.values(filters).some(Boolean) || query.trim() !== "";

    function setFilter(key: keyof Filters, value: string) {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }

    function clearAll() {
        setFilters({ jobType: "", location: "", department: "" });
        setQuery("");
        setVisibleCount(INITIAL_VISIBLE);
    }

    function selectSuggestion(job: ZohoJob) {
        setQuery(job.Job_Opening_Name);
        setShowDropdown(false);
    }

    return (
        <div>
            {/* Filter bar */}
            <div className="mb-8 bg-white border border-[#E5E5E5] rounded-[20px] p-5 md:p-6 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">

                {/* Search field */}
                <div ref={searchRef} className="relative mb-5">
                    <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider block mb-1.5">
                        Search Roles
                    </label>
                    <div className="relative">
                        {/* Search icon */}
                        <svg
                            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999]"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>

                        <input
                            type="text"
                            value={query}
                            placeholder="e.g. Project Engineer, NLNG, Rivers…"
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            className="w-full pl-10 pr-10 py-3 text-sm font-medium rounded-full border border-[#E5E5E5] hover:border-[#003366] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all duration-200 bg-white text-[#111111] placeholder:text-[#AAAAAA]"
                        />

                        {/* Clear query button */}
                        {query && (
                            <button
                                onClick={() => { setQuery(""); setShowDropdown(false); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[#E5E5E5] hover:bg-[#003366] hover:text-white text-[#555555] transition-colors duration-200"
                                aria-label="Clear search"
                            >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Suggestions dropdown */}
                    <AnimatePresence>
                        {showDropdown && suggestions.length > 0 && (
                            <motion.ul
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.15 }}
                                className="absolute z-30 left-0 right-0 top-full mt-2 bg-white border border-[#E5E5E5] rounded-[16px] shadow-[0_12px_32px_rgba(0,0,0,0.10)] overflow-hidden"
                            >
                                {suggestions.map((job) => (
                                    <li key={job.id}>
                                        <button
                                            type="button"
                                            onMouseDown={() => selectSuggestion(job)}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#F7F7F6] transition-colors duration-150 group border-b border-[#F0F0F0] last:border-0"
                                        >
                                            {/* Icon */}
                                            <div className="shrink-0 w-8 h-8 rounded-[8px] bg-[#F0F4F8] flex items-center justify-center">
                                                <svg className="w-4 h-4 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </div>

                                            {/* Text */}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-[#111111] truncate">
                                                    <HighlightMatch text={job.Job_Opening_Name} query={query} />
                                                </p>
                                                <p className="text-xs text-[#888888] truncate mt-0.5">
                                                    {job.Client_Name?.name} · {job.City} · {normaliseJobType(job.Job_Type)}
                                                </p>
                                            </div>

                                            {/* Arrow */}
                                            <svg className="w-3.5 h-3.5 text-[#CCCCCC] group-hover:text-[#003366] transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </div>

                {/* Filter dropdowns */}
                <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <FilterSelect
                            id="filter-job-type"
                            label="Job Type"
                            value={filters.jobType}
                            onChange={(v) => setFilter("jobType", v)}
                            options={options.jobTypes}
                        />
                        <FilterSelect
                            id="filter-location"
                            label="Location"
                            value={filters.location}
                            onChange={(v) => setFilter("location", v)}
                            options={options.locations}
                        />
                        <FilterSelect
                            id="filter-department"
                            label="Department"
                            value={filters.department}
                            onChange={(v) => setFilter("department", v)}
                            options={options.departments}
                        />
                    </div>

                    {hasFilters && (
                        <button
                            onClick={clearAll}
                            className="self-end sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[#555555] rounded-full border border-[#E5E5E5] hover:border-[#003366] hover:text-[#003366] transition-colors duration-200"
                        >
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                            Clear filters
                        </button>
                    )}
                </div>
            </div>

            {/* Results count */}
            <div className="flex items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-[#555555]">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {filtered.length === jobs.length
                        ? `${jobs.length} open ${jobs.length === 1 ? "role" : "roles"} available`
                        : `${filtered.length} of ${jobs.length} ${jobs.length === 1 ? "role" : "roles"} shown`}
                </span>
            </div>

            {/* Grid or empty state */}
            {filtered.length === 0 && hasFilters ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-full bg-[#F0F4F8] flex items-center justify-center mb-5">
                        <svg
                            className="w-7 h-7 text-[#003366]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </div>
                    <h3 className="text-[#111111] font-semibold mb-2">No roles match your search</h3>
                    <p className="text-[#555555] text-sm max-w-xs mb-6">Try adjusting your filters.</p>
                    <button onClick={clearAll} className="btn-primary text-sm px-5 py-2.5">
                        Clear all filters
                    </button>
                </div>
            ) : filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#F0F4F8] flex items-center justify-center mb-6">
                        <svg
                            className="w-8 h-8 text-[#003366]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </div>
                    <h3 className="text-[#111111] font-semibold mb-2">No open roles at the moment</h3>
                    <p className="text-[#555555] text-sm max-w-sm">
                        Check back soon — we regularly post new opportunities across the energy sector.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.slice(0, visibleCount).map((job, i) => (
                            <motion.div
                                key={job.id}
                                className="h-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.05 }}
                            >
                                <JobCard job={job} />
                            </motion.div>
                        ))}
                    </div>

                    {filtered.length > visibleCount && (
                        <div className="flex justify-center mt-10">
                            <button
                                onClick={() => setVisibleCount((prev) => prev + 6)}
                                className="btn-secondary px-8"
                            >
                                View More Roles ({filtered.length - visibleCount} remaining)
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
