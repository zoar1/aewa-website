"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  active: boolean;
  created_at: string;
}

const EMPTY = { quote: "", author: "", role: "" };

export default function TestimonialsAdmin() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const supabase = createClient();

  async function load() {
    setLoading(true);
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const { error } = await supabase
      .from("testimonials")
      .insert([{ ...form, active: true }]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess("Testimonial added successfully.");
      setForm(EMPTY);
      load();
    }
    setSaving(false);
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("testimonials").update({ active: !current }).eq("id", id);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    load();
  }

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold text-[#111111] mb-2">Testimonials</h1>
      <p className="text-sm text-[#555555] mb-10">
        Add or remove testimonials shown in the homepage carousel. Toggle visibility without deleting.
      </p>

      {/* Add form */}
      <div className="bg-white rounded-[20px] border border-[#E5E5E5] p-7 mb-8">
        <h2 className="text-base font-bold text-[#111111] mb-5">Add New Testimonial</h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Quote</label>
            <textarea
              value={form.quote}
              onChange={(e) => setForm((p) => ({ ...p, quote: e.target.value }))}
              required
              rows={4}
              placeholder="Enter the testimonial quote…"
              className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none resize-none transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Author Name</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm((p) => ({ ...p, author: e.target.value }))}
                required
                placeholder="e.g. John Smith"
                className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Role / Title</label>
              <input
                type="text"
                value={form.role}
                onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}
                required
                placeholder="e.g. HR Manager, Shell"
                className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-[10px] px-4 py-2.5">{error}</p>}
          {success && <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-[10px] px-4 py-2.5">{success}</p>}

          <button
            type="submit"
            disabled={saving}
            className="self-start px-6 py-2.5 bg-[#003366] text-white text-sm font-semibold rounded-full hover:bg-[#004080] transition-colors disabled:opacity-60"
          >
            {saving ? "Saving…" : "Add Testimonial"}
          </button>
        </form>
      </div>

      {/* List */}
      <h2 className="text-base font-bold text-[#111111] mb-4">
        All Testimonials {!loading && `(${items.length})`}
      </h2>

      {loading ? (
        <p className="text-sm text-[#555555]">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-[#555555]">No testimonials yet. Add one above.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-[16px] border p-5 flex gap-4 items-start ${item.active ? "border-[#E5E5E5]" : "border-[#E5E5E5] opacity-50"}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#111111] leading-relaxed mb-2">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-xs font-semibold text-[#555555]">
                  {item.author} — {item.role}
                </p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <button
                  onClick={() => toggleActive(item.id, item.active)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-colors ${item.active
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-[#F7F7F6] text-[#555555] border-[#E5E5E5] hover:border-[#003366]"
                    }`}
                >
                  {item.active ? "Visible" : "Hidden"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
