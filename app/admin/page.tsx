export const dynamic = "force-dynamic";
import Link from "next/link";

const CARDS = [
  {
    href: "/admin/content",
    title: "Site Content",
    description: "Edit all text across every page — homepage, about, services, contact, and more.",
    icon: (
      <svg className="w-6 h-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    href: "/admin/testimonials",
    title: "Testimonials",
    description: "Add, edit, or remove client testimonials shown on the homepage carousel.",
    icon: (
      <svg className="w-6 h-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
  },
  {
    href: "/admin/clients",
    title: "Client Logos",
    description: "Upload, rename, reorder, or remove client logos from the clients page.",
    icon: (
      <svg className="w-6 h-6 text-[#003366]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
  },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111111] mb-2">Dashboard</h1>
      <p className="text-[#555555] text-sm mb-10">
        Welcome to the AEWA admin panel. Manage your site content below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="bg-white rounded-[20px] border border-[#E5E5E5] p-7 hover:border-[#003366]/30 hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-[12px] bg-[#F0F4F8] flex items-center justify-center mb-5">
              {card.icon}
            </div>
            <h2 className="text-base font-bold text-[#111111] group-hover:text-[#003366] transition-colors mb-1">
              {card.title}
            </h2>
            <p className="text-sm text-[#555555]">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
