// ─── About Page ────────────────────────────────────────────────────────────

export const about = {
    headline: "We Are Specialists in Workforce Solutions",
    description:
        "At AEWA, we specialise in delivering flexible, customised, and cost-effective HR and recruitment services to candidates and companies across a variety of industries. Our goal is to be the technical partner of choice to all our clients.",
    mission:
        "Whether you are an organisation seeking qualified staff for your project or an experienced professional looking for the next career opportunity, AEWA is your dedicated consultant every step of the way. We are committed to inspiring positive change, driven by a passion for our work, delivering HR solutions and technical support grounded in integrity and efficiency.",
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
            "AEWA is the exclusive Nigerian agent for Davi Promau — the world's largest manufacturer of plate and angle rolls, made entirely in Italy. We support their commercial activities across the country.",
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
    "recruitment-and-outsourcing": {
        slug: "recruitment-and-outsourcing",
        title: "Recruitment & Outsourcing",
        icon: "👥",
        description:
            "We search, interview, and provide foreign and indigenous expert workforce for global industrial players and SMEs, at all phases of your projects.",
        imageSrc: "/images/services/hero/recruitment.jpg",
        sections: [
            {
                title: "Recruitment",
                body: "Solidly focused on delivering excellent human resources, we have honed, calibrated, and refined our recruitment processes to find and retain the best talents possible. We source across borders to deliver the precise skills your project demands.",
            },
            {
                title: "Outsourcing",
                body: "Our expertise encapsulates the entire spectrum of professions and disciplines, allowing us to provide an exceptionally diverse portfolio of highly trained, qualified, and multi-lingual profiles on AEWA payroll. The speed and flexibility of our services are central to the value we provide.",
            },
        ],
        relatedSlugs: ["global-hr-services", "training"],
    },
    "global-hr-services": {
        slug: "global-hr-services",
        title: "Global HR & Payroll Services",
        icon: "🌍",
        description:
            "From payroll to immigration and logistics services, we offer fully compliant global HR services in every country we operate in.",
        imageSrc: "/images/services/hero/global-hr.jpg",
        sections: [
            {
                title: "Payroll & Tax Management",
                body: "Our team of finance and accounting experts removes the complexity of payroll management for our clients, ensuring a seamless process and preventing any legal complications related to local tax obligations.",
            },
            {
                title: "Immigration",
                body: "We specialise in providing solutions that address all essential requirements for successful international assignments. With our in-country knowledge, we handle visas, resident and work permits (TWP), documentation, and insurance — ensuring employees relocate with minimal stress.",
            },
            {
                title: "Relocation Services",
                body: "From flight reservation to accommodation and local integration, we provide integrated logistics solutions to ensure seamless personnel relocation across borders.",
            },
        ],
        relatedSlugs: ["recruitment-and-outsourcing", "local-representation"],
    },
    security: {
        slug: "security",
        title: "Security Services",
        icon: "🛡️",
        description:
            "We secure agreements and contracts with experienced security companies and consultants for the protection of human assets and properties.",
        imageSrc: "/images/services/hero/security.jpg",
        sections: [
            {
                title: "Security Consulting & Staffing",
                body: "We deploy police escorts, conduct consulting engagements, and carry out audits and site surveys tailored to the energy and industrial environments. We combine accessible intelligence from all available sources, including our own information network, to provide actionable advice.",
            },
        ],
        relatedSlugs: ["training", "local-representation"],
    },
    training: {
        slug: "training",
        title: "Training",
        icon: "🎓",
        description:
            "We offer training solutions to clients investing in the development of their personnel and/or attempting to fill competency gaps within their organisations.",
        imageSrc: "/images/services/hero/training.jpg",
        sections: [
            {
                title: "Health, Safety & Environment (HSE)",
                body: "Our specialised subsidiary is certified to carry out HSE training according to a complete catalogue — IOSH, NEBOSH, JOYCE, and JOIFF. These programmes are designed for the energy and industrial sectors where safety is non-negotiable.",
            },
            {
                title: "Emergency Response",
                body: "Our specialised team provides global services on industrial and petrochemical sites to equip personnel with the knowledge and skills required to respond appropriately in emergency situations.",
            },
        ],
        relatedSlugs: ["security", "recruitment-and-outsourcing"],
    },
    "local-representation": {
        slug: "local-representation",
        title: "Local Representation Services",
        icon: "🤝",
        description:
            "We act as a local partner for companies wishing to start investing in Nigeria, supporting them at every stage of market entry.",
        imageSrc: "/images/services/hero/local-representation.jpg",
        sections: [
            {
                title: "Market Entry & Representation",
                body: "We support international companies with a liaison office, market and supplier research, business registration, and response to calls for tenders. We provide strategic thinking and local intelligence, giving clients an unmatched edge in the Nigerian market.",
            },
            {
                title: "Exclusive Agency — Davi Promau",
                body: "As the exclusive Nigerian agent for Davi Promau — the world's largest manufacturer of plate and angle rolls — AEWA supports their commercial activities across the country, bridging international manufactures with the local market.",
            },
        ],
        relatedSlugs: ["global-hr-services", "security"],
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
            label: "Phone",
            value: "+234 706 201 6100",
            href: "tel:+2347062016100",
            icon: "📞",
        },
        {
            label: "Email",
            value: "info@aewanl.com",
            href: "mailto:info@aewanl.com",
            icon: "✉️",
        },
        {
            label: "Address",
            value: "Lagos, Nigeria",
            href: null,
            icon: "📍",
        },
        {
            label: "Business Hours",
            value: "Monday – Friday, 8:00 AM – 5:00 PM WAT",
            href: null,
            icon: "🕐",
        },
    ],
};
