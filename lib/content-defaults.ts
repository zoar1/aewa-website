import { hero, cta, valueProps, stats, jobsTeaser, servicesCarousel } from "@/content/home";
import { about, contact, serviceDetails } from "@/content/pages";
import { site } from "@/content/site";

export type ContentMap = Record<string, string>;

/* Build service defaults for all 6 services */
function buildServiceDefaults(slug: string): ContentMap {
  const s = serviceDetails[slug];
  if (!s) return {};
  const out: ContentMap = {
    title: s.title,
    description: s.description,
  };
  s.sections.forEach((sec, i) => {
    out[`section_${i}_title`] = sec.title;
    out[`section_${i}_body`] = sec.body;
  });
  return out;
}

export const DEFAULTS: Record<string, ContentMap> = {
  homepage: {
    /* Hero */
    hero_headline: hero.headline,
    hero_subCopy: hero.subCopy,

    /* Services Carousel — titles + descriptions */
    ...Object.fromEntries(
      servicesCarousel.flatMap((s, i) => [
        [`services_card_${i}_title`, s.title],
        [`services_card_${i}_description`, s.description],
      ])
    ),

    /* Why AEWA */
    why_eyebrow: "The AEWA Advantage",
    why_heading: "Why Leading Organisations Choose All Energy West Africa",
    why_subtext: "Six reasons Africa's most demanding organisations trust us to deliver.",
    ...Object.fromEntries(
      valueProps.flatMap((v, i) => [
        [`why_card_${i}_title`, v.title],
        [`why_card_${i}_description`, v.description],
      ])
    ),

    /* Stats */
    ...Object.fromEntries(
      stats.flatMap((s, i) => [
        [`stats_${i}_value`, s.value],
        [`stats_${i}_label`, s.label],
      ])
    ),

    /* Jobs Teaser */
    jobs_eyebrow: jobsTeaser.eyebrow,
    jobs_headline: jobsTeaser.headline,
    jobs_subCopy: jobsTeaser.subCopy,

    /* CTA */
    cta_headline: cta.headline,
    cta_subCopy: cta.subCopy,
  },

  about: {
    headline: about.headline,
    description: about.description,
    mission: about.mission,
    vision: about.vision,
    ...Object.fromEntries(
      about.coreValues.flatMap((v, i) => [
        [`core_value_${i}_title`, v.title],
        [`core_value_${i}_description`, v.description],
      ])
    ),
    partner_name: about.partner.name,
    partner_description: about.partner.description,
    partner2_name: about.partner2.name,
    partner2_description: about.partner2.description,
  },

  contact: {
    headline: contact.headline,
    description: contact.description,
    ...Object.fromEntries(
      contact.details.map((item) => [
        `${item.label.toLowerCase().replace(/\s+/g, "_")}_value`,
        item.value,
      ])
    ),
  },

  global: {
    phone: site.phone,
    email: site.email,
    address: site.address,
    hours: contact.details.find((d) => d.icon === "clock")?.value ?? "MONDAY - FRIDAY, 8:00AM - 5:00PM WAT",
    tagline: site.tagline,
    description: site.description,
    talent_pool_heading: "Don't See the Right Role For You?",
    talent_pool_description:
      "Submit your CV and we'll keep you in mind for upcoming opportunities across our client portfolio. Our team is always looking for exceptional talent in the energy sector.",
  },

  "service-technical-recruitment": buildServiceDefaults("technical-recruitment"),
  "service-skilled-trades": buildServiceDefaults("skilled-trades"),
  "service-expatriate-support": buildServiceDefaults("expatriate-support"),
  "service-qa-qc-inspection": buildServiceDefaults("qa-qc-inspection"),
  "service-offshore-manning": buildServiceDefaults("offshore-manning"),
  "service-payroll-compliance": buildServiceDefaults("payroll-compliance"),
  "service-technical-business-support": buildServiceDefaults("technical-business-support"),
};

export function get(map: ContentMap, key: string, fallback: string): string {
  const v = map[key];
  return v !== undefined && v !== "" ? v : fallback;
}
