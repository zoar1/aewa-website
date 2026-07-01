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

function buildStoragePath(label: string, filename: string): string {
  const ext = filename.split(".").pop();
  return `${Date.now()}-${label.trim().toLowerCase().replace(/\s+/g, "-")}.${ext}`;
}

export default function ClientLogosAdmin() {
  const [items, setItems] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [reordering, setReordering] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editSaving, setEditSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);
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

    const path = buildStoragePath(name, file.name);

    const { error: uploadError } = await supabase.storage
      .from("client-logos")
      .upload(path, file, { upsert: false });

    if (uploadError) {
      show(uploadError.message, "error");
      setUploading(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("client-logos").getPublicUrl(path);
    const maxOrder = items.reduce((max, it) => Math.max(max, it.display_order), -1);

    const { error: insertError } = await supabase.from("client_logos").insert([{
      name: name.trim(),
      file_url: urlData.publicUrl,
      active: true,
      display_order: maxOrder + 1,
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

  function startEdit(item: ClientLogo) {
    setEditId(item.id);
    setEditName(item.name);
    setEditFile(null);
    if (editFileRef.current) editFileRef.current.value = "";
  }

  async function handleSaveEdit(item: ClientLogo) {
    if (!editName.trim()) return;
    setEditSaving(true);

    const update: { name: string; file_url?: string } = { name: editName.trim() };

    if (editFile) {
      const path = buildStoragePath(editName, editFile.name);

      const { error: uploadError } = await supabase.storage
        .from("client-logos")
        .upload(path, editFile, { upsert: false });

      if (uploadError) {
        show(uploadError.message, "error");
        setEditSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("client-logos").getPublicUrl(path);
      update.file_url = urlData.publicUrl;

      // Clean up the old file if it was stored in Supabase Storage
      if (item.file_url.includes("/storage/v1/object/")) {
        const oldPath = item.file_url.split("/client-logos/")[1];
        if (oldPath) await supabase.storage.from("client-logos").remove([oldPath]);
      }
    }

    const { error } = await supabase.from("client_logos").update(update).eq("id", item.id);
    if (error) {
      show(error.message, "error");
    } else {
      show("Logo updated.");
      setEditId(null);
      setEditFile(null);
      load();
    }
    setEditSaving(false);
  }

  async function toggleActive(id: string, current: boolean) {
    await supabase.from("client_logos").update({ active: !current }).eq("id", id);
    show(current ? "Logo hidden." : "Logo made visible.");
    load();
  }

  async function handleDelete(id: string, fileUrl: string) {
    if (!confirm("Delete this client logo? This cannot be undone.")) return;
    // Only remove from Storage if it's a Supabase Storage URL (not a local static file)
    if (fileUrl.includes("/storage/v1/object/")) {
      const path = fileUrl.split("/client-logos/")[1];
      if (path) await supabase.storage.from("client-logos").remove([path]);
    }
    await supabase.from("client_logos").delete().eq("id", id);
    show("Logo deleted.");
    load();
  }

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;

    const current = items[index];
    const swapWith = items[target];
    setReordering(current.id);

    const [{ error: e1 }, { error: e2 }] = await Promise.all([
      supabase.from("client_logos").update({ display_order: swapWith.display_order }).eq("id", current.id),
      supabase.from("client_logos").update({ display_order: current.display_order }).eq("id", swapWith.id),
    ]);

    if (e1 || e2) {
      show(e1?.message ?? e2?.message ?? "Failed to reorder.", "error");
    } else {
      await load();
    }
    setReordering(null);
  }

  async function resetAlphabetical() {
    setSorting(true);
    const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
    await Promise.all(
      sorted.map((item, i) =>
        item.display_order === i
          ? Promise.resolve()
          : supabase.from("client_logos").update({ display_order: i }).eq("id", item.id)
      )
    );
    show("Logos reset to alphabetical order.");
    await load();
    setSorting(false);
  }

  return (
    <div className="max-w-3xl">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismiss} />}

      <h1 className="text-2xl font-bold text-[#111111] mb-2">Client Logos</h1>
      <p className="text-sm text-[#555555] mb-10">
        Manage logos shown on the Clients page. Ordered alphabetically by default — use the arrows to
        customise the display order, upload, replace, hide, or remove logos here.
      </p>

      {/* Upload form */}
      <div className="bg-white rounded-[20px] border border-[#E5E5E5] p-7 mb-8">
        <h2 className="text-base font-bold text-[#111111] mb-5">Add New Logo</h2>
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">Logo File</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
                className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] outline-none transition-all file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0F4F8] file:text-[#003366] hover:file:bg-[#E0ECF8]"
              />
            </div>
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

      {/* List */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-[#111111]">
          All Logos {!loading && `(${items.length})`}
        </h2>
        <button
          onClick={resetAlphabetical}
          disabled={sorting || loading || items.length === 0}
          className="text-xs font-semibold text-[#003366] hover:underline disabled:opacity-50 disabled:hover:no-underline"
        >
          {sorting ? "Sorting…" : "Reset to A–Z"}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[#555555]">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-[#555555]">No logos yet. Add one above.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`bg-white rounded-[14px] border p-4 flex items-center gap-4 transition-opacity ${
                item.active ? "border-[#E5E5E5]" : "border-[#E5E5E5] opacity-50"
              }`}
            >
              {/* Reorder controls */}
              <div className="flex flex-col gap-0.5 shrink-0">
                <button
                  onClick={() => move(i, -1)}
                  disabled={i === 0 || reordering !== null}
                  title="Move up"
                  className="w-6 h-5 flex items-center justify-center text-[#999] hover:text-[#003366] disabled:opacity-25 disabled:hover:text-[#999] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                  </svg>
                </button>
                <button
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1 || reordering !== null}
                  title="Move down"
                  className="w-6 h-5 flex items-center justify-center text-[#999] hover:text-[#003366] disabled:opacity-25 disabled:hover:text-[#999] transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
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

              {/* Name + logo — editable inline */}
              <div className="flex-1 min-w-0">
                {editId === item.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-1.5 text-sm rounded-[10px] border border-[#003366]/30 focus:border-[#003366] outline-none"
                      autoFocus
                    />
                    <input
                      ref={editFileRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setEditFile(e.target.files?.[0] ?? null)}
                      className="w-full text-xs text-[#555555] file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#F0F4F8] file:text-[#003366] hover:file:bg-[#E0ECF8]"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSaveEdit(item)}
                        disabled={editSaving}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#003366] text-white rounded-full hover:bg-[#004080] disabled:opacity-60"
                      >
                        {editSaving ? "Saving…" : "Save"}
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="px-3 py-1.5 text-xs font-semibold text-[#555555] border border-[#E5E5E5] rounded-full hover:border-[#003366]"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-[#111111] truncate">{item.name}</p>
                    <button
                      onClick={() => startEdit(item)}
                      className="text-[#AAAAAA] hover:text-[#003366] transition-colors shrink-0"
                      title="Edit name or logo"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Actions */}
              {editId !== item.id && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(item.id, item.active)}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border transition-colors ${
                      item.active
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
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
