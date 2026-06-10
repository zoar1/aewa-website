import { hero, cta } from "@/content/home";
import { about, contact } from "@/content/pages";
import { site } from "@/content/site";

export type ContentMap = Record<string, string>;

export const DEFAULTS: Record<string, ContentMap> = {
  homepage: {
    hero_headline: hero.headline,
    hero_subCopy: hero.subCopy,
    cta_headline: cta.headline,
    cta_subCopy: cta.subCopy,
  },
  about: {
    headline: about.headline,
    description: about.description,
    mission: about.mission,
    vision: about.vision,
    partner_description: about.partner.description,
  },
  global: {
    phone: site.phone,
    email: site.email,
    address: site.address,
    hours: contact.details.find((d) => d.icon === "clock")?.value ?? "Monday – Friday, 9:00 AM – 5:00 PM WAT",
    tagline: site.tagline,
    description: site.description,
  },
};

export function get(map: ContentMap, key: string, fallback: string): string {
  return map[key] ?? fallback;
}
