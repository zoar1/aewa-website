"use client";

import { motion } from "framer-motion";
import { about } from "@/content/pages";

interface StrategicPartnerSectionProps {
  partnerName?: string;
  partnerDescription?: string;
}

export default function StrategicPartnerSection({ partnerName, partnerDescription }: StrategicPartnerSectionProps = {}) {
  return (
    <section className="bg-[#F7F7F6] py-12 md:py-16 lg:py-24">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#003366] rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12"
        >
          {/* Logo */}
          <div className="shrink-0 flex items-center justify-center w-32 h-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/partners/davi-logo.png"
              alt="Davi Promau"
              className="max-h-14 w-auto object-contain"
            />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">
              Strategic Partner
            </p>
            <h3 className="text-white text-2xl font-bold mb-3">
              {partnerName ?? about.partner.name}
            </h3>
            <p className="text-white/80 leading-relaxed max-w-[540px]">
              {partnerDescription ?? about.partner.description}
            </p>
          </div>

          {/* CTA */}
          <a
            href={about.partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex-shrink-0 !border-white/30 !text-white hover:!bg-white/10"
          >
            Visit Partner Site ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
