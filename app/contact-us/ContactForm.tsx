"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import { contact } from "@/content/pages";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1200);
    }

    return (
        <Section className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                {/* Contact details */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div>
                        <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">Contact Information</p>
                        <h2 className="text-[#111111] text-3xl font-bold mb-2">We&rsquo;d love to hear from you</h2>
                        <p className="text-[#555555] leading-relaxed">
                            Reach out directly or use the form — we aim to respond within one business day.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                        {contact.details.map((item) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, x: -12 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="flex items-start gap-4 p-5 bg-[#F7F7F6] rounded-[20px] border border-[#E5E5E5]"
                            >
                                <span className="text-2xl mt-0.5 flex-shrink-0">{item.icon}</span>
                                <div>
                                    <p className="text-xs font-semibold text-[#555555] uppercase tracking-wider mb-1">{item.label}</p>
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            className="text-[#111111] font-medium hover:underline"
                                        >
                                            {item.value}
                                        </a>
                                    ) : (
                                        <p className="text-[#111111] font-medium">{item.value}</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                    className="lg:col-span-3"
                >
                    {submitted ? (
                        <div className="h-full flex flex-col items-center justify-center text-center gap-4 bg-[#F7F7F6] rounded-[24px] border border-[#E5E5E5] p-12">
                            <span className="text-5xl">✅</span>
                            <h3 className="text-[#111111] text-2xl font-bold">Message Sent!</h3>
                            <p className="text-[#555555] leading-relaxed max-w-sm">
                                Thank you for reaching out. We&rsquo;ll get back to you within one business day.
                            </p>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="btn-secondary mt-2"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-5 bg-[#F7F7F6] rounded-[24px] border border-[#E5E5E5] p-8 md:p-10"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#111111]">First Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John"
                                        className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[12px] text-[#111111] placeholder-[#AAAAAA] text-sm focus:outline-none focus:border-[#111111] transition-colors duration-200"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-[#111111]">Last Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[12px] text-[#111111] placeholder-[#AAAAAA] text-sm focus:outline-none focus:border-[#111111] transition-colors duration-200"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#111111]">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="john.doe@company.com"
                                    className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[12px] text-[#111111] placeholder-[#AAAAAA] text-sm focus:outline-none focus:border-[#111111] transition-colors duration-200"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#111111]">Company</label>
                                <input
                                    type="text"
                                    placeholder="Your company name"
                                    className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[12px] text-[#111111] placeholder-[#AAAAAA] text-sm focus:outline-none focus:border-[#111111] transition-colors duration-200"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#111111]">Service of Interest</label>
                                <select
                                    className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[12px] text-[#111111] text-sm focus:outline-none focus:border-[#111111] transition-colors duration-200 appearance-none cursor-pointer"
                                >
                                    <option value="">Select a service…</option>
                                    <option>Recruitment & Outsourcing</option>
                                    <option>Global HR & Payroll Services</option>
                                    <option>Security Services</option>
                                    <option>Training</option>
                                    <option>Local Representation Services</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[#111111]">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="Tell us about your requirements…"
                                    className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-[12px] text-[#111111] placeholder-[#AAAAAA] text-sm focus:outline-none focus:border-[#111111] transition-colors duration-200 resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Sending…" : "Send Message"}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        </Section>
    );
}
