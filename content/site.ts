export const site = {
    name: "AEWA",
    fullName: "All Energy West Africa",
    tagline: "Specialists in Energy Workforce",
    description:
        "An elite international consulting firm delivering engineering and HR recruitment services across Nigeria and Africa.",
    phone: "+234 706 201 6100",
    email: "enquiries@aewanl.com",
    address: "Block 58 Plot 13B Hunponu-Wusu Road, Lekki, Lagos",
    foundedYear: 2011,
    jobsUrl: "https://jobs.aewanl.com/",
};

export const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    {
        label: "Services",
        href: "/services",
        children: [
            { label: "Technical Recruitment & Manpower", href: "/services/technical-recruitment" },
            { label: "Skilled Trades Deployment", href: "/services/skilled-trades" },
            { label: "Expatriate Work Permit & Admin", href: "/services/expatriate-support" },
            { label: "QA/QC & Technical Inspection", href: "/services/qa-qc-inspection" },
            { label: "Offshore Crew & Manning", href: "/services/offshore-manning" },
            { label: "Payroll & Compliance Management", href: "/services/payroll-compliance" },
        ],
    },
    { label: "Clients", href: "/clients" },
    { label: "Jobs", href: "/jobs" },
];

export const footerLinks = {
    company: [
        { label: "About Us", href: "/about-us" },
        { label: "Clients", href: "/clients" },
        { label: "Jobs", href: "/jobs" },
        { label: "Contact Us", href: "/contact-us" },
    ],
    services: [
        { label: "Technical Recruitment & Manpower", href: "/services/technical-recruitment" },
        { label: "Skilled Trades Deployment", href: "/services/skilled-trades" },
        { label: "Expatriate Work Permit & Admin", href: "/services/expatriate-support" },
        { label: "QA/QC & Technical Inspection", href: "/services/qa-qc-inspection" },
        { label: "Offshore Crew & Manning", href: "/services/offshore-manning" },
        { label: "Payroll & Compliance Management", href: "/services/payroll-compliance" },
    ],
};
