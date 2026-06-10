"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { Toast, useToast } from "@/components/admin/Toast";
import { DEFAULTS } from "@/lib/content-defaults";

/* ─── Field definitions per tab ─── */
const TABS = [
  {
    id: "homepage",
    label: "Homepage",
    subtabs: [
      {
        id: "hero",
        label: "Hero",
        fields: [
          { key: "hero_headline", label: "Headline", type: "text" as const },
          { key: "hero_subCopy", label: "Sub-copy", type: "textarea" as const },
        ],
      },
      {
        id: "cta",
        label: "CTA Banner",
        fields: [
          { key: "cta_headline", label: "Headline", type: "text" as const },
          { key: "cta_subCopy", label: "Sub-copy", type: "textarea" as const },
        ],
      },
    ],
  },
  {
    id: "about",
    label: "About Us",
    subtabs: [
      {
        id: "general",
        label: "General",
        fields: [
          { key: "headline", label: "Page Headline", type: "text" as const },
          { key: "description", label: "Page Description", type: "textarea" as const },
        ],
      },
      {
        id: "mission",
        label: "Mission & Vision",
        fields: [
          { key: "mission", label: "Mission Text", type: "textarea" as const },
          { key: "vision", label: "Vision Statement", type: "textarea" as const },
        ],
      },
      {
        id: "partner",
        label: "Partner",
        fields: [
          { key: "partner_description", label: "Davi Promau Description", type: "textarea" as const },
        ],
      },
    ],
  },
  {
    id: "global",
    label: "Global",
    subtabs: [
      {
        id: "contact",
        label: "Contact Details",
        fields: [
          { key: "phone", label: "Phone Number", type: "text" as const },
          { key: "email", label: "Email Address", type: "text" as const },
          { key: "address", label: "Address", type: "textarea" as const },
          { key: "hours", label: "Business Hours", type: "text" as const },
        ],
      },
      {
        id: "site",
        label: "Site Info",
        fields: [
          { key: "tagline", label: "Tagline", type: "text" as const },
          { key: "description", label: "Meta Description", type: "textarea" as const },
        ],
      },
    ],
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function ContentAdmin() {
  const [activeTab, setActiveTab] = useState<TabId>("homepage");
  const [activeSubtab, setActiveSubtab] = useState<string>("hero");
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast, show, dismiss } = useToast();

  const currentTab = TABS.find((t) => t.id === activeTab)!;
  const currentSubtab = currentTab.subtabs.find((s) => s.id === activeSubtab) ?? currentTab.subtabs[0];

  const loadContent = useCallback(async (section: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content?section=${section}`);
      const json = await res.json();
      const defaults = DEFAULTS[section] ?? {};
      // Merge: Supabase values override defaults for any key that exists
      setContent({ ...defaults, ...json.data });
    } catch {
      setContent(DEFAULTS[activeTab] ?? {});
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => {
    loadContent(activeTab);
    // Reset subtab when main tab changes
    setActiveSubtab(TABS.find((t) => t.id === activeTab)!.subtabs[0].id);
  }, [activeTab, loadContent]);

  function handleChange(key: string, value: string) {
    setContent((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: activeTab, updates: content }),
      });
      if (res.ok) {
        show("Changes saved. The page will update shortly.");
      } else {
        const j = await res.json();
        show(j.error ?? "Failed to save.", "error");
      }
    } catch {
      show("Network error. Please try again.", "error");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-3xl">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismiss} />}

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111111] mb-1">Site Content</h1>
          <p className="text-sm text-[#555555]">Edit text across the website. Changes go live on save.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || loading}
          className="px-6 py-2.5 bg-[#003366] text-white text-sm font-semibold rounded-full hover:bg-[#004080] transition-colors disabled:opacity-60 shrink-0"
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {/* Main tabs */}
      <div className="flex gap-1 mb-6 bg-white border border-[#E5E5E5] rounded-[14px] p-1.5">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabId)}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-[10px] transition-colors duration-150 ${
              activeTab === tab.id
                ? "bg-[#003366] text-white shadow-sm"
                : "text-[#555555] hover:text-[#111111] hover:bg-[#F7F7F6]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {currentTab.subtabs.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubtab(sub.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition-colors whitespace-nowrap ${
              activeSubtab === sub.id
                ? "bg-[#003366]/10 text-[#003366] border-[#003366]/20"
                : "bg-white text-[#555555] border-[#E5E5E5] hover:border-[#003366] hover:text-[#003366]"
            }`}
          >
            {sub.label}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="bg-white rounded-[20px] border border-[#E5E5E5] p-7">
        {loading ? (
          <p className="text-sm text-[#555555]">Loading…</p>
        ) : (
          <div className="flex flex-col gap-6">
            {currentSubtab.fields.map((field) => (
              <div key={field.key} className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-[#555555] uppercase tracking-wider">
                  {field.label}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={content[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none resize-y transition-all"
                  />
                ) : (
                  <input
                    type="text"
                    value={content[field.key] ?? ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-[12px] border border-[#E5E5E5] focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/10 outline-none transition-all"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-[#999] mt-4">
        Changes are saved to the database and pages revalidate automatically. Allow 15–30 seconds for updates to reflect on the live site.
      </p>
    </div>
  );
}
