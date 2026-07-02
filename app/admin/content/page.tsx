"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useCallback } from "react";
import { Toast, useToast } from "@/components/admin/Toast";
import { DEFAULTS } from "@/lib/content-defaults";

/* ─── Field types ─── */
type FieldType = "text" | "textarea";
type FieldDef = { key: string; label: string; type: FieldType };

type SubtabDef = {
  id: string;
  label: string;
  section: string;
  fields: FieldDef[];
};

type TabDef = {
  id: string;
  label: string;
  subtabs: SubtabDef[];
};

const ta = (key: string, label: string): FieldDef => ({ key, label, type: "textarea" });
const tx = (key: string, label: string): FieldDef => ({ key, label, type: "text" });

const serviceSubtabs = (slug: string, label: string, sectionCount: number): SubtabDef => ({
  id: slug,
  label,
  section: `service-${slug}`,
  fields: [
    tx("title", "Page Title"),
    ta("description", "Page Description"),
    tx("section_0_title", "Section 1 Heading"),
    ta("section_0_body", "Section 1 Body"),
    tx("section_1_title", "Section 2 Heading"),
    ta("section_1_body", "Section 2 Body"),
    ...(sectionCount > 2
      ? [tx("section_2_title", "Section 3 Heading"), ta("section_2_body", "Section 3 Body")]
      : []),
    ...(sectionCount > 3
      ? [tx("section_3_title", "Section 4 Heading"), ta("section_3_body", "Section 4 Body")]
      : []),
  ],
});

const whyCards = [
  "Rapid Results", "Specialist Knowledge", "Extended Reach",
  "Full Compliance", "Nigerian-Owned", "12+ Years of Expertise",
];

const coreValues = ["Teamwork", "Integrity", "Customer Focus", "Enterprise", "Social Impact"];

const TABS: TabDef[] = [
  {
    id: "homepage",
    label: "Homepage",
    subtabs: [
      {
        id: "hero",
        label: "Hero",
        section: "homepage",
        fields: [tx("hero_headline", "Headline"), ta("hero_subCopy", "Sub-copy")],
      },
      {
        id: "services",
        label: "Services Carousel",
        section: "homepage",
        fields: [0, 1, 2, 3, 4, 5].flatMap((i) => [
          tx(`services_card_${i}_title`, `Service ${i + 1} Title`),
          ta(`services_card_${i}_description`, `Service ${i + 1} Description`),
        ]),
      },
      {
        id: "why",
        label: "Why AEWA",
        section: "homepage",
        fields: [
          tx("why_eyebrow", "Eyebrow Label"),
          tx("why_heading", "Section Heading"),
          ta("why_subtext", "Sub-text"),
          ...whyCards.flatMap((name, i) => [
            tx(`why_card_${i}_title`, `Card ${i + 1} Title (${name})`),
            ta(`why_card_${i}_description`, `Card ${i + 1} Description`),
          ]),
        ],
      },
      {
        id: "stats",
        label: "Stats",
        section: "homepage",
        fields: [0, 1, 2, 3].flatMap((i) => [
          tx(`stats_${i}_value`, `Stat ${i + 1} Value`),
          tx(`stats_${i}_label`, `Stat ${i + 1} Label`),
        ]),
      },
      {
        id: "jobsteaser",
        label: "Jobs Teaser",
        section: "homepage",
        fields: [
          tx("jobs_eyebrow", "Eyebrow Label"),
          tx("jobs_headline", "Headline"),
          ta("jobs_subCopy", "Sub-copy"),
        ],
      },
      {
        id: "cta",
        label: "CTA Banner",
        section: "homepage",
        fields: [tx("cta_headline", "Headline"), ta("cta_subCopy", "Sub-copy")],
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
        section: "about",
        fields: [
          tx("headline", "Page Headline"),
          ta("description", "Page Description"),
        ],
      },
      {
        id: "mission",
        label: "Mission & Vision",
        section: "about",
        fields: [ta("mission", "Mission Text"), ta("vision", "Vision Statement")],
      },
      {
        id: "values",
        label: "Core Values",
        section: "about",
        fields: coreValues.flatMap((name, i) => [
          tx(`core_value_${i}_title`, `Value ${i + 1} Title (${name})`),
          ta(`core_value_${i}_description`, `Value ${i + 1} Description`),
        ]),
      },
      {
        id: "partner",
        label: "Strategic Partner",
        section: "about",
        fields: [
          tx("partner_name", "Partner Name"),
          ta("partner_description", "Partner Description"),
        ],
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    subtabs: [
      serviceSubtabs("technical-recruitment", "Technical Recruitment", 2),
      serviceSubtabs("skilled-trades", "Skilled Trades", 2),
      serviceSubtabs("expatriate-support", "Expatriate Support", 4),
      serviceSubtabs("qa-qc-inspection", "QA/QC Inspection", 3),
      serviceSubtabs("offshore-manning", "Offshore Manning", 2),
      serviceSubtabs("payroll-compliance", "Payroll & Compliance", 2),
      serviceSubtabs("technical-business-support", "Technical Business Support", 2),
    ],
  },
  {
    id: "global",
    label: "Contact & Global",
    subtabs: [
      {
        id: "contact",
        label: "Contact Page",
        section: "contact",
        fields: [
          tx("headline", "Page Headline"),
          ta("description", "Page Description"),
        ],
      },
      {
        id: "talentpool",
        label: "Talent Pool",
        section: "global",
        fields: [
          tx("talent_pool_heading", "Section Heading"),
          ta("talent_pool_description", "Description"),
        ],
      },
      {
        id: "contactdetails",
        label: "Contact Details",
        section: "global",
        fields: [
          tx("phone", "Phone Number"),
          tx("email", "Email Address"),
          ta("address", "Address"),
          tx("hours", "Business Hours"),
        ],
      },
      {
        id: "siteinfo",
        label: "Site Info",
        section: "global",
        fields: [
          tx("tagline", "Tagline"),
          ta("description", "Meta Description (SEO)"),
        ],
      },
    ],
  },
];

/* ─── Component ─── */
export default function ContentAdmin() {
  const [activeTab, setActiveTab] = useState<string>("homepage");
  const [activeSubtab, setActiveSubtab] = useState<string>("hero");

  // content per section (cache sections as we load them)
  const [sectionCache, setSectionCache] = useState<Record<string, Record<string, string>>>({});
  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast, show, dismiss } = useToast();

  const currentTab = TABS.find((t) => t.id === activeTab) ?? TABS[0];
  const currentSubtab = currentTab.subtabs.find((s) => s.id === activeSubtab) ?? currentTab.subtabs[0];
  const currentSection = currentSubtab.section;

  const loadSection = useCallback(async (section: string) => {
    if (sectionCache[section] !== undefined) return;
    setLoadingSection(section);
    try {
      const res = await fetch(`/api/admin/content?section=${section}`);
      const json = await res.json();
      const defaults = DEFAULTS[section] ?? {};
      setSectionCache((prev) => ({ ...prev, [section]: { ...defaults, ...(json.data ?? {}) } }));
    } catch {
      setSectionCache((prev) => ({ ...prev, [section]: DEFAULTS[section] ?? {} }));
    }
    setLoadingSection(null);
  }, [sectionCache]);

  useEffect(() => {
    loadSection(currentSection);
  }, [currentSection, loadSection]);

  function handleChange(key: string, value: string) {
    setSectionCache((prev) => ({
      ...prev,
      [currentSection]: { ...(prev[currentSection] ?? {}), [key]: value },
    }));
  }

  async function handleSave() {
    const sectionData = sectionCache[currentSection];
    if (!sectionData) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section: currentSection, updates: sectionData }),
      });
      if (res.ok) {
        show("Changes saved. The page will update within 60 seconds.");
      } else {
        const j = await res.json();
        show(j.error ?? "Failed to save.", "error");
      }
    } catch {
      show("Network error. Please try again.", "error");
    }
    setSaving(false);
  }

  function switchMainTab(tabId: string) {
    const tab = TABS.find((t) => t.id === tabId);
    if (!tab) return;
    setActiveTab(tabId);
    setActiveSubtab(tab.subtabs[0].id);
  }

  const content = sectionCache[currentSection] ?? DEFAULTS[currentSection] ?? {};
  const isLoading = loadingSection === currentSection;

  return (
    <div className="max-w-4xl">
      {toast && <Toast message={toast.message} type={toast.type} onDismiss={dismiss} />}

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#111111] mb-1">Site Content</h1>
          <p className="text-sm text-[#555555]">
            Edit all text across the website. Changes go live within 60 seconds of saving.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || isLoading}
          className="px-6 py-2.5 bg-[#003366] text-white text-sm font-semibold rounded-full hover:bg-[#004080] transition-colors disabled:opacity-60 shrink-0 flex items-center gap-2"
        >
          {saving ? (
            <>
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Saving…
            </>
          ) : "Save Changes"}
        </button>
      </div>

      {/* Main tabs */}
      <div className="flex gap-1 mb-5 bg-white border border-[#E5E5E5] rounded-[14px] p-1.5 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => switchMainTab(tab.id)}
            className={`flex-shrink-0 py-2 px-4 text-sm font-medium rounded-[10px] transition-colors duration-150 ${
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
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {currentTab.subtabs.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubtab(sub.id)}
            className={`flex-shrink-0 px-4 py-2 text-xs font-semibold rounded-full border transition-colors ${
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
        {isLoading ? (
          <div className="flex items-center gap-3 text-sm text-[#555555]">
            <svg className="w-4 h-4 animate-spin text-[#003366]" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            Loading content…
          </div>
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
                    rows={3}
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
        Unsaved changes are highlighted in the fields above. Click &ldquo;Save Changes&rdquo; to publish.
        Pages revalidate automatically — allow up to 60 seconds on the live site.
      </p>
    </div>
  );
}
