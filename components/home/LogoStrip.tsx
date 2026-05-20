"use client";

import { useState } from "react";

/**
 * Partner logo filenames placed in:  public/brand/partners/
 * Recommended dimensions:            200 × 80 px, PNG with transparent background
 */
const PARTNER_LOGOS = [
    { name: "Shell", file: "shell.png" },
    { name: "Total Energies", file: "total-energies.png" },
    { name: "Schlumberger", file: "schlumberger.png" },
    { name: "Halliburton", file: "halliburton.png" },
    { name: "Baker Hughes", file: "baker-hughes.png" },
    { name: "Saipem", file: "saipem.png" },
    { name: "Chevron", file: "chevron.png" },
    { name: "ExxonMobil", file: "exxonmobil.png" },
];

const DOUBLED = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

function LogoItem({ name, file }: { name: string; file: string }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="flex-shrink-0 flex items-center justify-center h-20 px-10">
            {!imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={`/brand/partners/${file}`}
                    alt={name}
                    className="h-10 w-auto max-w-[160px] object-contain opacity-40 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300 cursor-pointer"
                    onError={() => setImgError(true)}
                />
            ) : (
                <span className="px-5 py-2 bg-[#F0F0EF] border border-[#E5E5E5] rounded-full text-sm font-semibold text-[#555555] whitespace-nowrap">
                    {name}
                </span>
            )}
        </div>
    );
}

export default function LogoStrip() {
    return (
        <div className="bg-white py-14 md:py-18 overflow-hidden">
            <p className="text-xs font-semibold text-[#555555] text-center uppercase tracking-[0.18em] mb-10">
                Trusted by leading organisations
            </p>

            {/* Full-width overflow container — NOT capped by max-width */}
            <div className="relative w-full overflow-hidden">
                {/* Fade edges */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

                {/* Scrolling track */}
                <div className="flex w-max animate-marquee">
                    {DOUBLED.map((logo, i) => (
                        <LogoItem key={`${logo.name}-${i}`} name={logo.name} file={logo.file} />
                    ))}
                </div>
            </div>
        </div>
    );
}
