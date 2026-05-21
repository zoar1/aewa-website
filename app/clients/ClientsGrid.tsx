"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";

/* ─── Logo grid data — filenames from public/images/Client logos/ ─────────── */
const CLIENT_LOGOS = [
  { name: "Shell", file: "shell.png" },
  { name: "TotalEnergies", file: "Total-energies.gif" },
  { name: "ExxonMobil", file: "ExxonMobil-Logo.wine.png" },
  { name: "Saipem", file: "Saipem.png" },
  { name: "Fugro", file: "Logo_Fugro_Colour_RGB.jpg" },
  { name: "NLNG", file: "NLNG.jpg" },
  { name: "Nigeria LNG", file: "LNG.jpg" },
  { name: "ND Western", file: "ND western.png" },
  { name: "Brass LNG", file: "Brass LNG.jpg" },
  { name: "OPAC Refineries", file: "Opac.png" },
  { name: "NOV", file: "NOV.png" },
  { name: "First E&P", file: "First E and P.png" },
  { name: "LafargeHolcim", file: "Lafarge-Holcim.jpg.webp" },
  { name: "Cainergy", file: "Cainergy.png" },
  { name: "Euro Tech", file: "Euro Tech.png" },
  { name: "Prodeco", file: "Prodeco.png" },
  { name: "Heliconia", file: "Heliconia.png" },
  { name: "Chevron", file: "Chevron.jpg" },
  { name: "Siemens", file: "SIEMENS.png" },
  { name: "Schneider Electric", file: "Schneider Electric.png" },
  { name: "Bollore", file: "Bollore.png" },
  { name: "Bouygues", file: "Bouygues.png" },
  { name: "Danone", file: "Danone.png" },
  { name: "Nestle", file: "Nestle.png" },
  { name: "Niger Dock", file: "nigerdock.png" },
  { name: "CPL", file: "CPL_Logo_Web.jpg.webp" },
  { name: "IPAS", file: "logo_Ipas.jpg" },
];

const sectors = [
  {
    label: "Oil & Gas",
    clients: [
      { name: "Shell", service: "Engineering & Manpower Supply" },
      { name: "TotalEnergies", service: "Engineering, Supervision & Manpower — longest term contract since 2013" },
      { name: "ExxonMobil", service: "Usan HES management and supervision" },
      { name: "Chevron", service: "Engineering & Workforce Solutions" },
      { name: "NLNG / Nigeria LNG", service: "Call off contract, Community Engagement & Government Relations Support" },
      { name: "ND Western", service: "Provision of Senior Engineering Team" },
      { name: "Brass LNG", service: "Manpower, Compliance & Consultancy Services" },
      { name: "OPAC Refineries", service: "Provision of refinery workers, technicians and operators" },
      { name: "First E&P", service: "Provision of Engineering Support" },
    ],
  },
  {
    label: "Engineering & Construction",
    clients: [
      { name: "Saipem", service: "Field engineers, NLNG Train 7 construction, Egina project" },
      { name: "Fugro", service: "Provision of Payroll Services" },
      { name: "LafargeHolcim", service: "Technical assistance & consultancy — Ashaka Cement Factory" },
      { name: "Prodeco", service: "Provision of manpower for construction and associated services" },
      { name: "Bouygues", service: "Engineering & Construction Workforce" },
      { name: "Niger Dock", service: "Engineering & Offshore Services" },
    ],
  },
  {
    label: "Services & Technology",
    clients: [
      { name: "NOV (National Oilwell Varco)", service: "High-skilled technicians in Holland — swivel construction & quality inspection" },
      { name: "Siemens", service: "Energy & Technology Workforce" },
      { name: "Schneider Electric", service: "Technical Staffing & HR Services" },
      { name: "Cainergy", service: "Head-Hunting Services" },
      { name: "Euro Tech (ETS)", service: "Work Visa, payroll and management services" },
      { name: "Bollore", service: "Logistics & Port Operations Staffing" },
      { name: "CPL", service: "Contract & Permanent Recruitment" },
    ],
  },
  {
    label: "Consumer & Hospitality",
    clients: [
      { name: "Nestle", service: "HR & Manpower Solutions" },
      { name: "Danone", service: "HR & Manpower Solutions" },
      { name: "Heliconia Park Hotel", service: "Recruitment and Head-Hunting Services for hospitality industry" },
    ],
  },
];

function LogoCard({ name, file }: { name: string; file: string }) {
  const [imgError, setImgError] = useState(false);
  const src = `/images/Client logos/${encodeURIComponent(file)}`;

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-5 flex items-center justify-center h-24 hover:border-[#003366]/30 hover:shadow-md transition-all duration-200 group">
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          className="max-h-12 max-w-[120px] w-auto object-contain opacity-70 group-hover:opacity-100 grayscale group-hover:grayscale-0 transition-all duration-300"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-xs font-semibold text-[#555555] text-center leading-tight">{name}</span>
      )}
    </div>
  );
}

export default function ClientsGrid() {
  return (
    <>
      {/* Logo grid */}
      <Section className="bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">
            Our Clients
          </p>
          <h2 className="text-[#111111]">A Track Record Built on Trust</h2>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {CLIENT_LOGOS.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.03 }}
            >
              <LogoCard name={client.name} file={client.file} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* By sector */}
      <Section className="bg-[#F7F7F6]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">
            By Sector
          </p>
          <h2 className="text-[#111111]">Industry Coverage</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
              className="bg-white rounded-[24px] border border-[#E5E5E5] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
            >
              <h3 className="text-[#111111] text-lg font-semibold mb-4 pb-4 border-b border-[#E5E5E5]">
                {sector.label}
              </h3>
              <ul className="flex flex-col gap-3">
                {sector.clients.map((c) => (
                  <li key={c.name} className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold text-[#111111]">{c.name}</span>
                    <span className="text-xs text-[#777777] leading-relaxed">{c.service}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
