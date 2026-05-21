"use client";

const CERTIFICATIONS = [
  { name: "COREN", file: "COREN.jpg" },
  { name: "HCP", file: "HCP.jpg" },
  { name: "ISO 9001", file: "ISO 9001.jpg" },
  { name: "NUPC", file: "NUPC.jpg" },
  { name: "OGT", file: "OGT.jpg" },
];

// Triple the array so the marquee has enough content to scroll seamlessly
const TRIPLED = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS];

export default function LogoStrip() {
  return (
    <div className="bg-white py-14 overflow-hidden">
      <p className="text-xs font-semibold text-[#555555] text-center uppercase tracking-[0.18em] mb-10">
        Our Certifications &amp; Accreditations
      </p>

      <div className="relative w-full overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling track */}
        <div className="flex w-max animate-marquee">
          {TRIPLED.map((cert, i) => (
            <div
              key={`${cert.name}-${i}`}
              className="flex-shrink-0 flex flex-col items-center justify-center gap-3 h-28 px-12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/Certifications/${encodeURIComponent(cert.file)}`}
                alt={cert.name}
                className="h-16 w-auto max-w-[140px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
              <span className="text-xs font-semibold text-[#555555] tracking-wide">
                {cert.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
