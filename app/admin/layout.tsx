"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { label: "Dashboard", href: "/admin", icon: "⊞" },
  { label: "Testimonials", href: "/admin/testimonials", icon: "💬" },
  { label: "Client Logos", href: "/admin/clients", icon: "🏢" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email ?? "");
    });
  }, []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  // Don't render the shell on the login page
  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-[#F7F7F6] flex">
      {/* Sidebar */}
      <aside className="w-60 bg-[#003366] flex flex-col min-h-screen sticky top-0">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-none">AEWA</p>
              <p className="text-white/40 text-[10px]">Admin</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1 px-3 py-5 flex-1">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-[10px] text-sm font-medium transition-colors duration-150 ${active
                  ? "bg-white/15 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + sign out */}
        <div className="px-3 py-4 border-t border-white/10">
          {userEmail && (
            <p className="text-white/40 text-xs px-4 mb-3 truncate">{userEmail}</p>
          )}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[10px] text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors duration-150"
          >
            <span>→</span> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
