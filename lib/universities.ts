export interface University {
  /** Exact string stored on Product.university and used in API queries */
  name: string;
  /**
   * Display name for search and cards. Keep leading “University of …” (e.g. UVA).
   * Drop a trailing “ University” when the official name is “… University” (e.g. George Mason).
   */
  fullName: string;
  slug: string;
  /** Shorthand shown on university cards only—not used in nav search */
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  /** Short cheer with mascot at the end, e.g. "Go Cavaliers!" */
  mascotCheer: string;
}

export const UNIVERSITIES: University[] = [
  {
    name: "UVA",
    fullName: "University of Virginia",
    slug: "uva",
    abbreviation: "UVA",
    primaryColor: "#232D4B",
    secondaryColor: "#E57200",
    mascotCheer: "Go Cavaliers!",
  },
  {
    name: "Virginia Tech",
    fullName: "Virginia Tech",
    slug: "virginia-tech",
    abbreviation: "VT",
    primaryColor: "#861F41",
    secondaryColor: "#E87722",
    mascotCheer: "Go Hokies!",
  },
  {
    name: "JMU",
    fullName: "James Madison",
    slug: "jmu",
    abbreviation: "JMU",
    primaryColor: "#450084",
    secondaryColor: "#B5A068",
    mascotCheer: "Go Dukes!",
  },
  {
    name: "George Mason",
    fullName: "George Mason",
    slug: "george-mason",
    abbreviation: "GMU",
    primaryColor: "#006633",
    secondaryColor: "#FFCC00",
    mascotCheer: "Go Patriots!",
  },
  {
    name: "VCU",
    fullName: "Virginia Commonwealth",
    slug: "vcu",
    abbreviation: "VCU",
    primaryColor: "#000000",
    secondaryColor: "#FFB300",
    mascotCheer: "Go Rams!",
  },
  {
    name: "ODU",
    fullName: "Old Dominion",
    slug: "odu",
    abbreviation: "ODU",
    primaryColor: "#003366",
    secondaryColor: "#88C4E8",
    mascotCheer: "Go Monarchs!",
  },
  {
    name: "University of Richmond",
    fullName: "University of Richmond",
    slug: "university-of-richmond",
    abbreviation: "UR",
    primaryColor: "#000066",
    secondaryColor: "#990000",
    mascotCheer: "Go Spiders!",
  },
  {
    name: "William & Mary",
    fullName: "William & Mary",
    slug: "william-mary",
    abbreviation: "W&M",
    primaryColor: "#115740",
    secondaryColor: "#B9975B",
    mascotCheer: "Go Tribe!",
  },
  {
    name: "Radford",
    fullName: "Radford",
    slug: "radford",
    abbreviation: "RU",
    primaryColor: "#C2011B",
    secondaryColor: "#FFFFFF",
    mascotCheer: "Go Highlanders!",
  },
  {
    name: "Longwood",
    fullName: "Longwood",
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
