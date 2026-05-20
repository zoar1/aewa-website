export const site = {
    name: "AEWA",
    fullName: "All Energy West Africa",
    tagline: "Specialists in Energy Workforce",
    description:
        "An elite international consulting firm delivering engineering and HR recruitment services across Nigeria and Africa.",
    phone: "+234 706 201 6100",
    email: "info@aewanl.com",
    address: "Lagos, Nigeria",
    foundedYear: 2011,
    jobsUrl: "https://jobs.aewanl.com/",
};

export const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about-us" },
    {
        label: "Services",
        href: "#services",
        children: [
            { label: "Recruitment & Outsourcing", href: "/services/recruitment-and-outsourcing" },
            { label: "Global HR Services", href: "/services/global-hr-services" },
            { label: "Security", href: "/services/security" },
            { label: "Training", href: "/services/training" },
            { label: "Local Representation", href: "/services/local-representation" },
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
        { label: "Recruitment & Outsourcing", href: "/services/recruitment-and-outsourcing" },
        { label: "Global HR Services", href: "/services/global-hr-services" },
        { label: "Security", href: "/services/security" },
        { label: "Training", href: "/services/training" },
        { label: "Local Representation", href: "/services/local-representation" },
    ],
};
