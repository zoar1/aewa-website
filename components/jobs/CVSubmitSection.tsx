"use client";

import { useRef, useState } from "react";

export default function CVSubmitSection() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const fileRef = useRef<HTMLInputElement>(null);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");
        try {
            const body = new FormData();
            Object.entries(form).forEach(([k, v]) => body.append(k, v));
            if (cvFile) body.append("cv", cvFile, cvFile.name);

            const res = await fetch("/api/cv-submit", { method: "POST", body });
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

    return (
        <section className="bg-[#F7F7F6] py-16 md:py-20">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
                <div className="bg-white rounded-[24px] border border-[#E5E5E5] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left info panel */}
                        <div className="bg-[#003366] p-10 md:p-14 flex flex-col justify-center">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
                                Talent Pool
                            </p>
                            <h2 className="text-white font-bold mb-4 max-w-[340px]">
                                Don&apos;t See the Right Role For You?
                            </h2>
                            <p className="text-white/70 leading-relaxed max-w-[380px] mb-6">
                                Submit your CV and we'll keep you in mind for upcoming opportunities across our client portfolio. Our team is always looking for exceptional talent in the energy sector.
                            </p>
                            <ul className="flex flex-col gap-3 text-sm text-white/70">
                                {[
                                    "Engineering & Technical Roles",
                                    "HR & Workforce Management",
                                    "Offshore & Field Operations",
                                    "QA/QC & Inspection",
                                ].map((item) => (
                                    <li key={item} className="flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#F5B800] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right form panel */}
                        <div className="p-10 md:p-14">
                            {status === "success" ? (
                                <div className="flex flex-col items-start justify-center h-full gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#003366]/10 flex items-center justify-center">
                                        <svg className="w-6 h-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-[#111111] text-xl font-semibold">CV Received!</h3>
                                    <p className="text-[#555555] text-sm leading-relaxed">
                                        Thank you, {form.name}. We'll reach out to you at {form.email} when a suitable opportunity arises.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-[#111111] text-xl font-bold mb-1">Submit Your Details</h3>
                                    <p className="text-[#555555] text-sm mb-6">We'll be in touch when a matching role opens up.</p>
                                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Full Name *"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                className="px-4 py-3 rounded-[12px] bg-[#F7F7F6] border border-[#E5E5E5] text-[#111111] placeholder:text-[#AAAAAA] text-sm focus:outline-none focus:border-[#003366] transition-colors"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email Address *"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                className="px-4 py-3 rounded-[12px] bg-[#F7F7F6] border border-[#E5E5E5] text-[#111111] placeholder:text-[#AAAAAA] text-sm focus:outline-none focus:border-[#003366] transition-colors"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <input
                                                type="tel"
                                                name="phone"
                                                placeholder="Phone (optional)"
                                                value={form.phone}
                                                onChange={handleChange}
                                                className="px-4 py-3 rounded-[12px] bg-[#F7F7F6] border border-[#E5E5E5] text-[#111111] placeholder:text-[#AAAAAA] text-sm focus:outline-none focus:border-[#003366] transition-colors"
                                            />
                                            <select
                                                name="interest"
                                                value={form.interest}
                                                onChange={handleChange}
                                                className="px-4 py-3 rounded-[12px] bg-[#F7F7F6] border border-[#E5E5E5] text-sm focus:outline-none focus:border-[#003366] transition-colors appearance-none"
                                                style={{ color: form.interest ? "#111111" : "#AAAAAA" }}
                                            >
                                                <option value="" disabled>Area of Interest</option>
                                                <option value="Engineering & Technical">Engineering & Technical</option>
                                                <option value="HR & Workforce">HR & Workforce</option>
                                                <option value="Offshore & Field Operations">Offshore & Field Operations</option>
                                                <option value="QA/QC & Inspection">QA/QC & Inspection</option>
                                                <option value="Payroll & Compliance">Payroll & Compliance</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <textarea
                                            name="message"
                                            placeholder="Brief note about yourself or your experience (optional)"
                                            rows={3}
                                            value={form.message}
                                            onChange={handleChange}
                                            className="px-4 py-3 rounded-[12px] bg-[#F7F7F6] border border-[#E5E5E5] text-[#111111] placeholder:text-[#AAAAAA] text-sm focus:outline-none focus:border-[#003366] transition-colors resize-none"
                                        />

                                        {/* CV file upload */}
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">
                                                Attach CV <span className="normal-case font-normal text-[#AAAAAA]">(PDF or DOCX, max 5 MB)</span>
                                            </label>
                                            <input
                                                ref={fileRef}
                                                type="file"
                                                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                                onChange={(e) => setCvFile(e.target.files?.[0] ?? null)}
                                                className="w-full px-4 py-3 rounded-[12px] bg-[#F7F7F6] border border-[#E5E5E5] text-sm focus:outline-none focus:border-[#003366] transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#E8EDF5] file:text-[#003366] hover:file:bg-[#D5E2F0] cursor-pointer"
                                            />
                                        </div>

                                        {errorMsg && (
                                            <p className="text-red-500 text-xs">{errorMsg}</p>
                                        )}
                                        <button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                                        >
                                            {status === "submitting" ? "Sending…" : "Submit CV Details"}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
