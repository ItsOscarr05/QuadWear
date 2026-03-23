export interface ColorVariant {
  name: string;
  hex: string;
  front: string;
  back: string;
}

export function parseColorVariants(
  json: string | null | undefined,
): ColorVariant[] {
  if (!json) return [];
  try {
    const parsed = JSON.parse(json) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (v): v is ColorVariant =>
        typeof v === "object" &&
        v !== null &&
        typeof (v as ColorVariant).name === "string" &&
        typeof (v as ColorVariant).hex === "string" &&
        typeof (v as ColorVariant).front === "string" &&
        typeof (v as ColorVariant).back === "string",
    );
  } catch {
    return [];
  }
}

/** Match cart line keys for color (undefined vs missing). */
export function normalizeCartColor(color?: string): string {
  return color ?? "";
}
