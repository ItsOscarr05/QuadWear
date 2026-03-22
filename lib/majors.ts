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
  { name: "Criminal Justice", slug: "criminal-justice" },
  { name: "Marketing", slug: "marketing" },
];

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
