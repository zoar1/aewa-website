import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const SECTION_PATHS: Record<string, string[]> = {
  homepage: ["/"],
  about: ["/about-us", "/"],
  contact: ["/contact-us"],
  global: ["/", "/about-us", "/contact-us", "/jobs"],
  "service-technical-recruitment": ["/services/technical-recruitment"],
  "service-skilled-trades": ["/services/skilled-trades"],
  "service-expatriate-support": ["/services/expatriate-support"],
  "service-qa-qc-inspection": ["/services/qa-qc-inspection"],
  "service-offshore-manning": ["/services/offshore-manning"],
  "service-payroll-compliance": ["/services/payroll-compliance"],
  "service-technical-business-support": ["/services/technical-business-support"],
};

export async function GET(req: NextRequest) {
  const section = req.nextUrl.searchParams.get("section");
  if (!section) return NextResponse.json({ error: "section required" }, { status: 400 });

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("key, value")
    .eq("section", section);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: Object.fromEntries((data ?? []).map((r) => [r.key, r.value ?? ""])) });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { section, updates } = body as { section: string; updates: Record<string, string> };

  if (!section || !updates) return NextResponse.json({ error: "section and updates required" }, { status: 400 });

  const supabase = await createClient();

  const upserts = Object.entries(updates).map(([key, value]) => ({
    section,
    key,
    value,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("site_content")
    .upsert(upserts, { onConflict: "section,key" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Revalidate affected pages
  const paths = SECTION_PATHS[section] ?? ["/"];
  paths.forEach((p) => revalidatePath(p));

  return NextResponse.json({ success: true });
}
