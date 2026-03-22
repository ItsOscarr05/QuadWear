import { notFound, redirect } from "next/navigation";
import { getUniversityBySlug } from "@/lib/universities";

/**
 * Legacy URLs: /jmu/computer-science → /shop/university/jmu?major=computer-science
 */
export default async function LegacyUniversityMajorRedirect({
  params,
}: {
  params: Promise<{ university: string; major: string }>;
}) {
  const { university, major } = await params;
  if (!getUniversityBySlug(university)) {
    notFound();
  }
  redirect(
    `/shop/university/${university}?major=${encodeURIComponent(major)}`
  );
}
