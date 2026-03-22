export interface University {
  /** Exact string stored on Product.university and used in API queries */
  name: string;
  slug: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  /** Short cheer with mascot at the end, e.g. "Go Cavaliers!" */
  mascotCheer: string;
}

export const UNIVERSITIES: University[] = [
  {
    name: "UVA",
    slug: "uva",
    abbreviation: "UVA",
    primaryColor: "#232D4B",
    secondaryColor: "#E57200",
    mascotCheer: "Go Cavaliers!",
  },
  {
    name: "Virginia Tech",
    slug: "virginia-tech",
    abbreviation: "VT",
    primaryColor: "#861F41",
    secondaryColor: "#E87722",
    mascotCheer: "Go Hokies!",
  },
  {
    name: "JMU",
    slug: "jmu",
    abbreviation: "JMU",
    primaryColor: "#450084",
    secondaryColor: "#B5A068",
    mascotCheer: "Go Dukes!",
  },
  {
    name: "George Mason",
    slug: "george-mason",
    abbreviation: "GMU",
    primaryColor: "#006633",
    secondaryColor: "#FFCC00",
    mascotCheer: "Go Patriots!",
  },
  {
    name: "VCU",
    slug: "vcu",
    abbreviation: "VCU",
    primaryColor: "#000000",
    secondaryColor: "#FFB300",
    mascotCheer: "Go Rams!",
  },
  {
    name: "ODU",
    slug: "odu",
    abbreviation: "ODU",
    primaryColor: "#003366",
    secondaryColor: "#88C4E8",
    mascotCheer: "Go Monarchs!",
  },
  {
    name: "University of Richmond",
    slug: "university-of-richmond",
    abbreviation: "UR",
    primaryColor: "#000066",
    secondaryColor: "#990000",
    mascotCheer: "Go Spiders!",
  },
  {
    name: "William & Mary",
    slug: "william-mary",
    abbreviation: "W&M",
    primaryColor: "#115740",
    secondaryColor: "#B9975B",
    mascotCheer: "Go Tribe!",
  },
  {
    name: "Radford",
    slug: "radford",
    abbreviation: "RU",
    primaryColor: "#C2011B",
    secondaryColor: "#FFFFFF",
    mascotCheer: "Go Highlanders!",
  },
  {
    name: "Longwood",
    slug: "longwood",
    abbreviation: "LU",
    primaryColor: "#003366",
    secondaryColor: "#999999",
    mascotCheer: "Go Lancers!",
  },
];

export function getUniversityBySlug(slug: string): University | undefined {
  return UNIVERSITIES.find((u) => u.slug === slug);
}

export function getUniversityByName(name: string): University | undefined {
  return UNIVERSITIES.find((u) => u.name === name);
}
