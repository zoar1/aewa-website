"use client";

import { motion } from "framer-motion";
import Section from "@/components/layout/Section";
import { clients } from "@/content/home";

// Extended client list for the dedicated clients page
const allClients = [
    ...clients,
    "Aggreko",
    "NNPC",
    "Seadrill",
    "Technip",
    "Wood Group",
    "Fugro",
    "GE Power",
    "Siemens Energy",
    "MSC Cruises",
    "Transocean",
];

const sectors = [
    { label: "Oil & Gas", clients: ["Shell", "Chevron", "ExxonMobil", "Total Energies", "NNPC", "Transocean", "Seadrill"] },
    { label: "Engineering & Construction", clients: ["Saipem", "Technip", "Wood Group", "Fugro"] },
    { label: "Services & Technology", clients: ["Schlumberger", "Halliburton", "Baker Hughes", "GE Power", "Siemens Energy", "Aggreko", "MSC Cruises"] },
];

export default function ClientsGrid() {
    return (
        <>
            {/* All clients pill grid */}
            <Section className="bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-10"
                >
                    <p className="text-sm font-semibold text-[#555555] uppercase tracking-widest mb-4">
                        All Clients
                    </p>
                    <h2 className="text-[#111111]">A Track Record Built on Trust</h2>
                </motion.div>

                <div className="flex flex-wrap gap-3">
                    {allClients.map((client, i) => (
                        <motion.div
                            key={client}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.04 }}
                            className="px-5 py-3 bg-[#F7F7F6] border border-[#E5E5E5] rounded-full text-sm font-semibold text-[#555555] hover:border-[#111111] hover:text-[#111111] transition-all duration-200 cursor-default"
                        >
                            {client}
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
                            <ul className="flex flex-col gap-2">
                                {sector.clients.map((c) => (
                                    <li key={c} className="flex items-center gap-2 text-sm text-[#555555]">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0E1A2B] flex-shrink-0" />
                                        {c}
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
