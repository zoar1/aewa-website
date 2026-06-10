import { createClient } from "@/lib/supabase/server";

export type { ContentMap } from "./content-defaults";
export { DEFAULTS, get } from "./content-defaults";

export async function getSectionContent(section: string): Promise<Record<string, string>> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value")
      .eq("section", section);

    if (error || !data) return {};
    return Object.fromEntries(data.map((row) => [row.key, row.value ?? ""]));
  } catch {
    return {};
  }
}
