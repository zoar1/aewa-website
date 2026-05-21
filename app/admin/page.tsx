export const dynamic = "force-dynamic";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#111111] mb-2">Dashboard</h1>
      <p className="text-[#555555] text-sm mb-10">
        Welcome to the AEWA admin panel. Manage your site content below.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl">
        <Link
          href="/admin/testimonials"
          className="bg-white rounded-[20px] border border-[#E5E5E5] p-7 hover:border-[#003366]/30 hover:shadow-md transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-[12px] bg-[#F0F4F8] flex items-center justify-center text-2xl mb-5">
            💬
          </div>
          <h2 className="text-base font-bold text-[#111111] group-hover:text-[#003366] transition-colors">
            Testimonials
          </h2>
          <p className="text-sm text-[#555555] mt-1">
            Add, edit or remove client testimonials shown on the homepage carousel.
          </p>
        </Link>

        <Link
          href="/admin/clients"
          className="bg-white rounded-[20px] border border-[#E5E5E5] p-7 hover:border-[#003366]/30 hover:shadow-md transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-[12px] bg-[#F0F4F8] flex items-center justify-center text-2xl mb-5">
            🏢
          </div>
          <h2 className="text-base font-bold text-[#111111] group-hover:text-[#003366] transition-colors">
            Client Logos
          </h2>
          <p className="text-sm text-[#555555] mt-1">
            Upload new client logos or remove existing ones from the clients page.
          </p>
        </Link>
      </div>
    </div>
  );
}
