"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Toast, useToast } from "@/components/admin/Toast";

export default function AdminAccountPage() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast, show, dismiss } = useToast();

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.email) setEmail(data.user.email);
    });
  }, [supabase]);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword.length < 8) {
      show("New password must be at least 8 characters.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      show("New password and confirmation do not match.", "error");
      return;
    }

    setSaving(true);

    // Re-verify the current password before allowing a change
    const { error: verifyError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (verifyError) {
      show("Current password is incorrect.", "error");
      setSaving(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      show(error.message, "error");
    } else {
      show("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-lg">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismiss} />}

      <h1 className="text-2xl font-bold text-[#111111] mb-2">Account</h1>
      <p className="text-sm text-[#555555] mb-10">
        Manage your admin login credentials.
      </p>

      <div className="bg-white rounded-[20px] border border-[#E5E5E5] p-7">
        <h2 className="text-base font-bold text-[#111111] mb-1">Change Password</h2>
        <p className="text-xs text-[#999] mb-5">Signed in as {email || "…"}</p>

        <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              placeholder="At least 8 characters"
              className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Re-enter new password"
              className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="self-start px-6 py-2.5 bg-[#003366] text-white text-sm font-semibold rounded-full hover:bg-[#004080] transition-colors disabled:opacity-60"
          >
            {saving ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
