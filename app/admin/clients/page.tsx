"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Toast, useToast } from "@/components/admin/Toast";

interface ClientLogo {
  id: string;
  name: string;
  file_url: string;
  active: boolean;
  display_order: number;
  created_at: string;
}

export default function ClientLogosAdmin() {
  const [items, setItems] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast, show, dismiss } = useToast();

  const supabase = createClient();

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("client_logos")
      .select("*")
      .order("display_order", { ascending: true });
    setItems(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => { load(); }, [load]);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !name.trim()) return;
    setUploading(true);

    const ext = file.name.split(".").pop();
    const path = `${Date.now()}-${name.trim().toLowerCase().replace(/\s+/g, "-")}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("client-logos")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      show(uploadError.message, "error");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("client-logos").getPublicUrl(path);

    const { error: insertError } = await supabase.from("client_logos").insert([{
      name: name.trim(),
      file_url: urlData.publicUrl,
      active: true,
      display_order: items.length,
    }]);

    if (insertError) {
      show(insertError.message, "error");
    } else {
      show(`"${name.trim()}" added successfully.`);
      setName("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      load();
    }
    setUploading(false);
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("client_logos").update({ active: !current }).eq("id", id);
    show(current ? "Logo hidden." : "Logo visible.");
    load();
  }

  async function handleDelete(id: string, fileUrl: string) {
    if (!confirm("Delete this client logo? This cannot be undone.")) return;
    const path = fileUrl.split("/client-logos/")[1];
    if (path) await supabase.storage.from("client-logos").remove([path]);
    await supabase.from("client_logos").delete().eq("id", id);
    show("Logo deleted.");
    load();
  }

  /* ── Drag-and-drop reordering ── */
  function onDragStart(id: string) {
    setDragId(id);
  }

  function onDragOver(e: React.DragEvent, overId: string) {
    e.preventDefault();
    if (!dragId || dragId === overId) return;

    setItems((prev) => {
      const from = prev.findIndex((i) => i.id === dragId);
      const to = prev.findIndex((i) => i.id === overId);
      if (from === -1 || to === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function onDragEnd() {
    setDragId(null);
  }

  async function saveOrder() {
    setSavingOrder(true);
    const updates = items.map((item, idx) =>
      supabase.from("client_logos").update({ display_order: idx }).eq("id", item.id)
    );
    await Promise.all(updates);
    show("Order saved.");
    setSavingOrder(false);
  }

  return (
    <div className="max-w-3xl">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismiss} />}

      <h1 className="text-2xl font-bold text-[#111111] mb-2">Client Logos</h1>
      <p className="text-sm text-[#555555] mb-10">
        Upload new client logos or remove existing ones. Drag rows to reorder; save when done.
      </p>

      {/* Upload form */}
      <div className="bg-white rounded-[20px] border border-[#E5E5E5] p-7 mb-8">
        <h2 className="text-base font-bold text-[#111111] mb-5">Upload New Logo</h2>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Client Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Shell"
              className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Logo File (PNG, JPG, SVG, WebP)</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              required
              className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0F4F8] file:text-[#003366] hover:file:bg-[#E0ECF8]"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="self-start px-6 py-2.5 bg-[#003366] text-white text-sm font-semibold rounded-full hover:bg-[#004080] transition-colors disabled:opacity-60"
          >
            {uploading ? "Uploading…" : "Upload Logo"}
          </button>
        </form>
      </div>

      {/* List with drag-and-drop */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#111111]">
          All Logos {!loading && `(${items.length})`}
        </h2>
        {items.length > 1 && (
          <button
            onClick={saveOrder}
            disabled={savingOrder}
            className="px-5 py-2 bg-[#003366] text-white text-xs font-semibold rounded-full hover:bg-[#004080] transition-colors disabled:opacity-60"
          >
            {savingOrder ? "Saving…" : "Save Order"}
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-[#555555]">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-[#555555]">No logos uploaded yet.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={() => onDragStart(item.id)}
              onDragOver={(e) => onDragOver(e, item.id)}
              onDragEnd={onDragEnd}
              className={`bg-white rounded-[14px] border p-4 flex items-center gap-4 cursor-grab active:cursor-grabbing select-none transition-all duration-150 ${
                dragId === item.id ? "opacity-40 scale-[0.98]" : ""
              } ${item.active ? "border-[#E5E5E5]" : "border-[#E5E5E5] opacity-50"}`}
            >
              {/* Drag handle */}
              <div className="shrink-0 text-[#CCCCCC] hover:text-[#999] transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5h16.5M3.75 12h16.5M3.75 19h16.5" />
                </svg>
              </div>

              {/* Logo preview */}
              <div className="w-16 h-10 rounded-[8px] bg-[#F7F7F6] border border-[#E5E5E5] flex items-center justify-center overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.file_url}
                  alt={item.name}
                  className="max-h-8 max-w-[52px] object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#111111] truncate">{item.name}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => toggleActive(item.id, item.active)}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${item.active
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                    : "bg-[#F7F7F6] text-[#555555] border-[#E5E5E5] hover:border-[#003366]"
                    }`}
                >
                  {item.active ? "Visible" : "Hidden"}
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.file_url)}
                  className="px-3 py-1 text-xs font-semibold rounded-full border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
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
