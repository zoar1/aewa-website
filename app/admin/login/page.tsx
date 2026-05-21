"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[#F7F7F6] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-[10px] bg-[#003366] flex items-center justify-center">
            <span className="text-white font-bold text-base">A</span>
          </div>
          <div>
            <p className="font-bold text-[#111111] text-lg leading-none">AEWA</p>
            <p className="text-xs text-[#555555]">Admin Dashboard</p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-[#E5E5E5] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          <h1 className="text-2xl font-bold text-[#111111] mb-2">Sign in</h1>
          <p className="text-sm text-[#555555] mb-8">
            Access is restricted to authorised administrators only.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@aewanl.com"
                className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-[10px] px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#003366] text-white font-semibold text-sm rounded-full hover:bg-[#004080] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
