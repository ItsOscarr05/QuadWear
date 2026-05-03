export interface Major {
  name: string;
  slug: string;
}

export const MAJORS: Major[] = [
  { name: "Business", slug: "business" },
  { name: "Psychology", slug: "psychology" },
  { name: "Computer Science", slug: "computer-science" },
  { name: "Nursing", slug: "nursing" },
  { name: "Biology", slug: "biology" },
  { name: "Communications", slug: "communications" },
  { name: "Education", slug: "education" },
  { name: "Engineering", slug: "engineering" },
  { name: "Health Science", slug: "health-science" },
  { name: "Music", slug: "music" },
];

/** Card art in /public/Major_Designs — add an entry when a matching asset exists. */
export const MAJOR_CARD_IMAGE_BY_SLUG: Partial<Record<string, string>> = {
  business: "/Major_Designs/QuadWear_Design_Business.jpg",
  "computer-science": "/Major_Designs/QuadWear_Design_ComputerScience.png",
  psychology: "/Major_Designs/QuadWear_Design_Psychology.png",
  communications: "/Major_Designs/QuadWear_Design_Communications.png",
  education: "/Major_Designs/QuadWear_Design_Education.png",
  engineering: "/Major_Designs/QuadWear_Design_Engineering.png",
  music: "/Major_Designs/QuadWear_Design_Music.png",
};

export function getMajorBySlug(slug: string): Major | undefined {
  return MAJORS.find((m) => m.slug === slug);
}

export function getMajorByName(name: string): Major | undefined {
  return MAJORS.find((m) => m.name === name);
}

/** Fallback for majors not in the catalog (e.g. from DB) */
export function majorSlugFromName(name: string): string {
  const found = getMajorByName(name);
  if (found) return found.slug;
  return name.toLowerCase().replace(/\s+/g, "-");
}
