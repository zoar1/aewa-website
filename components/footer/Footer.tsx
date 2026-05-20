"use client";

import Link from "next/link";
import Container from "@/components/layout/Container";
import { site, footerLinks } from "@/content/site";

export default function Footer() {
    return (
        <footer className="bg-[#003366] text-white">
            <Container>
                {/* Main footer content */}
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-white/10">
                    {/* Brand column */}
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-[8px] bg-white flex items-center justify-center">
                                <span className="text-[#111111] text-xs font-bold tracking-wide">A</span>
                            </div>
                            <div className="flex flex-col leading-none">
                                <span className="text-white font-bold text-base tracking-tight">{site.name}</span>
                                <span className="text-white/40 text-[10px] font-medium tracking-wide">
                                    {site.fullName}
                                </span>
                            </div>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed max-w-[300px]">
                            {site.description}
                        </p>
                        <div className="flex flex-col gap-1.5 mt-2 text-sm text-white/50">
                            <a
                                href={`tel:${site.phone}`}
                                className="hover:text-white transition-colors duration-200"
                            >
                                {site.phone}
                            </a>
                            <a
                                href={`mailto:${site.email}`}
                                className="hover:text-white transition-colors duration-200"
                            >
                                {site.email}
                            </a>
                            <span>{site.address}</span>
                        </div>
                    </div>

                    {/* Company links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                            Company
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {footerLinks.company.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services links */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                            Services
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {footerLinks.services.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
                    <p>
                        © {new Date().getFullYear()} {site.fullName}. All rights reserved.
                    </p>
                    <p>
                        Operating in full compliance with host country regulations. Health, Safety &amp; Environment first.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
