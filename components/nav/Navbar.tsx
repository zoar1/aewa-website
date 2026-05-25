"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/layout/Container";
import { navLinks } from "@/content/site";

// Light (white) logo — used on the transparent hero nav
const LOGO_LIGHT = "/brand/aewa-logo-light.png";
// Dark logo — used on the white scrolled nav
const LOGO_DARK = "/brand/aewa-logo-dark.png";

export default function Navbar({ solid = false }: { solid?: boolean }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [lightError, setLightError] = useState(false);
    const [darkError, setDarkError] = useState(false);

    // Pages without a dark hero pass solid=true, which locks the nav to its white state
    const isWhite = solid || scrolled;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // When at top (transparent bg): white text. When scrolled or solid page: dark text.
    const textColor = isWhite ? "text-[#555555]" : "text-white/90";
    const textHover = isWhite ? "hover:text-[#111111] hover:bg-[#F7F7F6]" : "hover:text-white hover:bg-white/10";
    const logoNameColor = isWhite ? "text-[#111111]" : "text-white";
    const logoSubColor = isWhite ? "text-[#555555]" : "text-white/70";
    const hamburgerColor = isWhite ? "bg-[#111111]" : "bg-white";

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isWhite
                ? "bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
                : "bg-transparent"
                }`}
        >
            <Container>
                <nav className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo — light version fades out, dark version fades in on scroll */}
                    <Link href="/" className="flex items-center group">
                        <div className="relative h-9 flex items-center">

                            {/* LIGHT logo (visible at top, hidden when scrolled or solid) */}
                            {!lightError ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={LOGO_LIGHT}
                                    alt="AEWA"
                                    className={`h-9 w-auto object-contain absolute inset-0 transition-opacity duration-300 ${isWhite ? "opacity-0 pointer-events-none" : "opacity-100"
                                        }`}
                                    onError={() => setLightError(true)}
                                />
                            ) : (
                                /* Text fallback for light state */
                                <div className={`flex items-center gap-2 absolute inset-0 transition-opacity duration-300 ${scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
                                    }`}>
                                    <div className="w-8 h-8 rounded-[8px] bg-white/20 flex items-center justify-center">
                                        <span className="text-white text-xs font-bold tracking-wide">A</span>
                                    </div>
                                    <span className={`font-bold text-base tracking-tight ${logoNameColor}`}>AEWA</span>
                                </div>
                            )}

                            {/* DARK logo (hidden at top, visible when scrolled or solid) */}
                            {!darkError ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={LOGO_DARK}
                                    alt="AEWA"
                                    className={`h-9 w-auto object-contain transition-opacity duration-300 ${isWhite ? "opacity-100" : "opacity-0 pointer-events-none"
                                        }`}
                                    onError={() => setDarkError(true)}
                                />
                            ) : (
                                /* Text fallback for dark state */
                                <div className={`flex items-center gap-2 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0 pointer-events-none"
                                    }`}>
                                    <div className="w-8 h-8 rounded-[8px] bg-[#0E1A2B] flex items-center justify-center">
                                        <span className="text-white text-xs font-bold tracking-wide">A</span>
                                    </div>
                                    <span className={`font-bold text-base tracking-tight ${logoNameColor}`}>AEWA</span>
                                </div>
                            )}

                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <div key={link.label} className="relative group">
                                <Link
                                    href={link.href}
                                    className={`px-4 py-2 text-[15px] font-medium transition-colors duration-200 rounded-full ${textColor} ${textHover}`}
                                >
                                    {link.label}
                                    {link.children && (
                                        <span className="ml-1 text-xs opacity-60">▾</span>
                                    )}
                                </Link>
                                {/* Dropdown */}
                                {link.children && (
                                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-[20px] border border-[#E5E5E5] shadow-[0_10px_30px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0 overflow-hidden">
                                        {link.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="block px-5 py-3 text-sm font-medium text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F6] transition-colors duration-150"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden lg:flex items-center gap-3">
                        <Link href="/contact-us" className="btn-primary text-sm px-5 py-2.5">
                            Get in Touch
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden flex flex-col items-center justify-center w-10 h-10 gap-[5px] group"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                        <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${mobileOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-0.5 transition-all duration-300 ${hamburgerColor} ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                    </button>
                </nav>
            </Container>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="lg:hidden bg-white border-t border-[#E5E5E5] overflow-hidden"
                    >
                        <Container>
                            <div className="py-6 flex flex-col gap-1">
                                {navLinks.map((link) => (
                                    <div key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="block py-3 px-2 text-base font-medium text-[#111111] border-b border-[#F0F0F0]"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                        {link.children && (
                                            <div className="pl-4">
                                                {link.children.map((child) => (
                                                    <Link
                                                        key={child.label}
                                                        href={child.href}
                                                        className="block py-2.5 px-2 text-sm font-medium text-[#555555] border-b border-[#F7F7F6]"
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="pt-4">
                                    <Link
                                        href="/contact-us"
                                        className="btn-primary w-full text-center"
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        Get in Touch
                                    </Link>
                                </div>
                            </div>
                        </Container>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
