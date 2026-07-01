"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import { createClient } from "@/lib/supabase/client";

/* ─── Static fallback ─── */
const STATIC_LOGOS = [
  { id: "s-bollore", name: "Bollore", file_url: "/images/Client logos/Bollore.png", active: true },
  { id: "s-bouygues", name: "Bouygues", file_url: "/images/Client logos/Bouygues.png", active: true },
  { id: "s-brass", name: "Brass LNG", file_url: "/images/Client logos/Brass LNG.jpg", active: true },
  { id: "s-cainergy", name: "Cainergy", file_url: "/images/Client logos/Cainergy.png", active: true },
  { id: "s-chevron", name: "Chevron", file_url: "/images/Client logos/Chevron.jpg", active: true },
  { id: "s-cpl", name: "CPL", file_url: "/images/Client logos/CPL_Logo_Web.jpg.webp", active: true },
  { id: "s-danone", name: "Danone", file_url: "/images/Client logos/Danone.png", active: true },
  { id: "s-eurotech", name: "Euro Tech", file_url: "/images/Client logos/Euro Tech.png", active: true },
  { id: "s-exxon", name: "ExxonMobil", file_url: "/images/Client logos/ExxonMobil-Logo.wine.png", active: true },
  { id: "s-firstep", name: "First E&P", file_url: "/images/Client logos/First E and P.png", active: true },
  { id: "s-fugro", name: "Fugro", file_url: "/images/Client logos/Logo_Fugro_Colour_RGB.jpg", active: true },
  { id: "s-heliconia", name: "Heliconia", file_url: "/images/Client logos/Heliconia.png", active: true },
  { id: "s-ipas", name: "IPAS", file_url: "/images/Client logos/logo_Ipas.jpg", active: true },
  { id: "s-lafarge", name: "LafargeHolcim", file_url: "/images/Client logos/Lafarge-Holcim.jpg.webp", active: true },
  { id: "s-ndwestern", name: "ND Western", file_url: "/images/Client logos/ND western.png", active: true },
  { id: "s-nigerdock", name: "Niger Dock", file_url: "/images/Client logos/nigerdock.png", active: true },
  { id: "s-nlng", name: "Nigeria LNG", file_url: "/images/Client logos/LNG.jpg", active: true },
  { id: "s-nlng2", name: "NLNG", file_url: "/images/Client logos/NLNG.jpg", active: true },
  { id: "s-nov", name: "NOV", file_url: "/images/Client logos/NOV.png", active: true },
  { id: "s-nestle", name: "Nestle", file_url: "/images/Client logos/Nestle.png", active: true },
  { id: "s-opac", name: "OPAC Refineries", file_url: "/images/Client logos/Opac.png", active: true },
  { id: "s-prodeco", name: "Prodeco", file_url: "/images/Client logos/Prodeco.png", active: true },
  { id: "s-saipem", name: "Saipem", file_url: "/images/Client logos/Saipem.png", active: true },
  { id: "s-schneider", name: "Schneider Electric", file_url: "/images/Client logos/Schneider Electric.png", active: true },
  { id: "s-shell", name: "Shell", file_url: "/images/Client logos/shell.png", active: true },
  { id: "s-siemens", name: "Siemens", file_url: "/images/Client logos/SIEMENS.png", active: true },
  { id: "s-total", name: "TotalEnergies", file_url: "/images/Client logos/Total-energies.gif", active: true },
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

interface Logo {
  id: string;
  name: string;
  file_url: string;
  active: boolean;
}

function LogoCard({ name, file_url }: { name: string; file_url: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[16px] p-5 flex items-center justify-center h-24 hover:border-[#003366]/30 hover:shadow-md transition-all duration-200 group">
      {!imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={file_url}
          alt={name}
          className="max-h-12 max-w-[120px] w-auto object-contain opacity-100 group-hover:opacity-70 transition-all duration-300"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-xs font-semibold text-[#555555] text-center leading-tight">{name}</span>
      )}
    </div>
  );
}

export default function ClientsGrid() {
  const [logos, setLogos] = useState<Logo[]>(STATIC_LOGOS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("client_logos")
      .select("id, name, file_url, active")
      .eq("active", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setLogos(data);
        setLoaded(true);
      });
  }, []);

  const visibleLogos = loaded
    ? logos.filter((l) => l.active)
    : STATIC_LOGOS;

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
          {visibleLogos.map((client, i) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.03 }}
            >
              <LogoCard name={client.name} file_url={client.file_url} />
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
