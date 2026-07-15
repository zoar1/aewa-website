// ─── About Page ────────────────────────────────────────────────────────────

export const about = {
    headline: "We Are Specialists in Workforce Solutions",
    description:
        "At All Energy West Africa, we specialise in delivering flexible, customised, and cost-effective HR and Technical support service to companies across a variety of industries. Our goal is to be the technical partner of choice to the Nigerian industry and all our clients.",
    mission:
        "Whether you are an organisation seeking qualified staff for your project or an experienced professional looking for the next career opportunity, All Energy West Africa is your dedicated consultant every step of the way. We are committed to inspiring positive change, driven by a passion for our work, delivering HR solutions and technical support grounded in integrity and efficiency.",
    vision: "To become the leader in HR services and provide quality support to the industry.",
    coreValues: [
        {
            title: "Teamwork",
            description: "Leveraging collective strength and diverse perspectives to achieve superior outcomes for every client.",
        },
        {
            title: "Integrity",
            description: "Operating with complete transparency and honesty in every engagement, with no compromise.",
        },
        {
            title: "Customer Focus",
            description: "Our clients' success is our success. Every solution is tailored to their unique needs.",
        },
        {
            title: "Enterprise",
            description: "Bold thinking, decisive action, and a relentless drive to innovate and improve.",
        },
        {
            title: "Social Impact",
            description: "Creating meaningful opportunities that uplift communities and transform lives across Africa.",
        },
    ],
    sectors: [
        "Power & Energy",
        "ICT & Telecommunications",
        "Construction",
        "Technology",
        "Oil & Gas",
        "Industrial Manufacturing",
    ],
    partner: {
        name: "Davi Promau",
        url: "https://www.davi.com/int/en/",
        description:
            "All Energy West Africa is the exclusive Nigerian agent for Davi Promau — the world's largest manufacturer of plate and angle rolls, made entirely in Italy. We support their commercial activities across the country.",
    },
    partner2: {
        name: "RFTS Nig Ltd",
        description:
            "AEWA is proud to be associated, through its shareholder, with RFTS Nig Ltd — the first indigenous Nigerian company to utilise Phased Array Technology for Non-Destructive Testing (NDT) services to the Oil & Gas industry. RFTS has a strong track record across major projects, including LPG storage facilities for NIPCO and NAVGAS, pressure vessels for Chevron/Dorman Long, and contractor NDT services at the Port Harcourt Refinery.",
    },
};

// ─── Service Detail Pages ───────────────────────────────────────────────────

export const serviceDetails: Record<
    string,
    {
        slug: string;
        title: string;
        icon: string;
        description: string;
        imageSrc: string;
        sections: { title: string; body: string }[];
        relatedSlugs: string[];
    }
> = {
    "technical-recruitment": {
        slug: "technical-recruitment",
        title: "Technical Recruitment & Manpower Solutions",
        icon: "users",
        description:
            "We deliver high-performance workforce solutions across Oil & Gas, EPCM, power, infrastructure, and industrial sectors. From feasibility to commissioning, we deploy skilled, semi-skilled, and unskilled personnel both local and expatriate — ensuring the right talent is on ground, on time, and aligned with your project goals.",
        imageSrc: "/images/hero/Technical-Recruitment.jpg",
        sections: [
            {
                title: "End-to-End Talent Deployment",
                body: "From feasibility through to commissioning, we identify, screen, and deploy the precise talent your project demands. Our network spans local and international markets, giving you access to qualified candidates across all disciplines and skill levels.",
            },
            {
                title: "Local & Expatriate Workforce",
                body: "We source and place both indigenous Nigerian talent and expatriate professionals, managing all aspects of mobilisation. Our processes are built for speed and compliance, so your project is never delayed by workforce gaps.",
            },
        ],
        relatedSlugs: ["skilled-trades", "expatriate-support"],
    },
    "skilled-trades": {
        slug: "skilled-trades",
        title: "Skilled Trades Deployment",
        icon: "wrench",
        description:
            "Our pool of certified artisans and technicians — including welders, electricians, riggers, scaffolders, and equipment operators — are project-ready and safety compliant. We support fabrication, construction, shutdowns, maintenance, and offshore/onshore operations with reliable, experienced hands.",
        imageSrc: "/images/hero/Skilled-Trades-Dev.jpg",
        sections: [
            {
                title: "Certified Artisans & Technicians",
                body: "Every tradesperson we deploy is verified, certified, and inducted to the safety standards your project requires. Our pool covers welders, electricians, riggers, scaffolders, pipefitters, and equipment operators across all competency levels.",
            },
            {
                title: "Shutdowns, Maintenance & Offshore Operations",
                body: "We support planned and unplanned shutdowns, turnarounds, and ongoing maintenance programmes. Whether onshore or offshore, our skilled trades teams are mobilised quickly and are ready to work from day one.",
            },
        ],
        relatedSlugs: ["technical-recruitment", "qa-qc-inspection"],
    },
    "expatriate-support": {
        slug: "expatriate-support",
        title: "Expatriate Work Permit & Administrative Support",
        icon: "file-check",
        description:
            "We handle the full lifecycle of expatriate engagement in Nigeria — from work permits and visas to quotas, payroll, tax compliance, medicals, and repatriation. Our end-to-end support ensures seamless onboarding and strict adherence to regulatory requirements.",
        imageSrc: "/images/hero/Compliance.jpg",
        sections: [
            {
                title: "Pre-Mobilization & Compliance",
                body: "We manage all Nigerian immigration requirements for expatriate personnel, including Temporary Work Permits (TWP), Expatriate Quota, NCDMB Work Permit, Combined Expatriate Residence Permits and Aliens Cards (CERPAC), handling documentation, renewals and compliance end-to-end. We seamlessly navigate local content laws and immigration frameworks to guarantee a fully compliant foundation before deployment.",
            },
            {
                title: "Deployment & Onboarding",
                body: "We manage comprehensive fitness for duty Medicals, activate global Medical & Life Insurance through our international partner, April International Insurance, and support key mobilization processes to ensure smooth deployment.",
            },
            {
                title: "Operations & Statutory Compliance",
                body: "We administer multi-currency Payroll processing alongside rigorous Tax Compliance, ensuring accurate local PAYE remittances and statutory deductions every month. We ensure every aspect of the engagement is fully compliant with local regulations so your expatriates can focus on the work.",
            },
            {
                title: "Demobilization & Repatriation",
                body: "When assignments end, we manage the complete repatriation process — permit cancellations, final settlements, and all administrative requirements — ensuring a smooth and compliant conclusion to every expatriate engagement.",
            },
        ],
        relatedSlugs: ["technical-recruitment", "payroll-compliance"],
    },
    "qa-qc-inspection": {
        slug: "qa-qc-inspection",
        title: "QA/QC & Technical Inspection Services",
        icon: "scan-search",
        description:
            "We provide certified QA/QC professionals to safeguard quality and compliance across engineering and construction projects. Our services include NDT, welding inspections, FAT/SAT, third-party audits, and in-service inspections — ensuring your assets meet global standards at every stage.",
        imageSrc: "/images/hero/QA-QC.jpg",
        sections: [
            {
                title: "Non-Destructive Testing & Welding Inspections",
                body: "Our NDT specialists and certified welding inspectors provide on-site and remote inspection services across pipelines, pressure vessels, structural steel, and rotating equipment. All work is performed to internationally recognised codes and standards.",
            },
            {
                title: "FAT/SAT & Third-Party Audits",
                body: "We conduct Factory Acceptance Tests, Site Acceptance Tests, and independent third-party quality audits to verify that equipment and systems meet your technical and regulatory requirements before and after installation.",
            },
            {
                title: "In-Service Inspections",
                body: "For operating assets, we provide ongoing in-service inspection programmes to monitor asset integrity, identify potential failure modes early, and ensure continued compliance with regulatory and client standards throughout the asset lifecycle.",
            },
        ],
        relatedSlugs: ["skilled-trades", "offshore-manning"],
    },
    "offshore-manning": {
        slug: "offshore-manning",
        title: "Offshore Crew & Manning Services",
        icon: "anchor",
        description:
            "From offshore crew supply and rotation management, we support both operational and strategic workforce needs. We combine precision and discretion to help you build and manage high-performing teams.",
        imageSrc: "/images/hero/Crew-and-manning.jpg",
        sections: [
            {
                title: "Crew Supply & Rotation Management",
                body: "We provide fully vetted offshore crew for drilling, production, construction, and support vessels. Our rotation scheduling ensures continuous coverage and minimises gaps in manning — keeping your offshore operations running without interruption.",
            },
            {
                title: "Strategic Offshore Workforce Planning",
                body: "Beyond day-to-day manning, we work with clients to design workforce plans that align with field development schedules, contract requirements, and long-term operational needs. We bring the strategic thinking and local network to build teams that perform.",
            },
        ],
        relatedSlugs: ["skilled-trades", "qa-qc-inspection"],
    },
    "payroll-compliance": {
        slug: "payroll-compliance",
        title: "Payroll & Compliance Management",
        icon: "briefcase",
        description:
            "We handle payroll processing, statutory deductions, and regulatory reporting with precision and confidentiality. Our service ensures your workforce is paid accurately and your organisation remains fully compliant with all legal requirements.",
        imageSrc: "/images/hero/Payroll-Compliance.jpg",
        sections: [
            {
                title: "Accurate Payroll Processing",
                body: "We manage end-to-end payroll for both permanent and contract staff — handling salary calculations, allowances, deductions, and disbursements on schedule. Our systems are built for accuracy and confidentiality at every step.",
            },
            {
                title: "Statutory Deductions & Regulatory Reporting",
                body: "From PAYE and pension contributions to ITF and NSITF, we ensure all statutory obligations are met correctly and on time. We handle all required reporting to regulatory bodies, keeping your organisation fully compliant and free from penalties.",
            },
        ],
        relatedSlugs: ["technical-recruitment", "expatriate-support"],
    },
    "technical-business-support": {
        slug: "technical-business-support",
        title: "Technical Business Support",
        icon: "settings",
        description:
            "Beyond our core service offerings, AEWA provides an integrated suite of technical business support capabilities — designed to complement client project organizations and deliver specialized solutions at every stage of project execution.",
        imageSrc: "/images/hero/Technical-Recruitment.jpg",
        sections: [
            {
                title: "Technical Business Support",
                body: "Beyond our core service offerings, AEWA provides an integrated suite of technical business support capabilities — designed to complement client project organizations and deliver specialized solutions at every stage of project execution.",
            },
            {
                title: "Support Capabilities",
                body: "Delivery of specialized technical solutions on engineering, subsurface, drilling, construction installation, pre-commissioning and hook-up studies and project management; delivery of a dedicated Team to Client project organization for subsurface, drilling, construction installation, pre-commissioning and hook-up phases; delivery of Specialized Dedicated Technicians covering all range of project delivery; complement and enhance Client Organogram during crucial project phases; proposing door-to-door solutions for specialized equipment to be integrated with client existing facilities; one stop-shop for enabling a fast and professional approach to your project demands.",
            },
        ],
        relatedSlugs: ["technical-recruitment", "payroll-compliance"],
    },
};

export const allServiceSlugs = Object.keys(serviceDetails);

// ─── Contact Page ───────────────────────────────────────────────────────────

export const contact = {
    headline: "Let's Start a Conversation",
    description:
        "For enquiries about our services, recruitment, or partnerships, fill out the form and we will get back to you as soon as possible.",
    details: [
        {
            label: "Telephone",
            value: "+234 706 201 6100",
            href: "tel:+2347062016100",
            icon: "phone",
        },
        {
            label: "Mobile Numbers",
            value: "+234 805 937 9113, +234 803 528 2100",
            href: "tel:+2348059379113",
            icon: "smartphone",
        },
        {
            label: "Email",
            value: "enquiries@aewanl.com",
            href: "mailto:enquiries@aewanl.com",
            icon: "mail",
        },
        {
            label: "Address",
            value: "Lagos, Nigeria – Plot 13 Block 58 Hunponu-Wusu Road, Off Adewunmi Adebimpe Drive, Phase 1, Lekki.",
            href: null,
            icon: "map-pin",
        },
        {
            label: "Business Hours",
            value: "Monday - Friday, 8:00am - 5:00pm WAT",
            href: null,
            icon: "clock",
        },
    ],
};
