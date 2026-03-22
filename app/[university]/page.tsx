import { redirect } from "next/navigation";

export default async function LegacyUniversityRedirect({
  params,
}: {
  params: Promise<{ university: string }>;
}) {
  const { university } = await params;
  redirect(`/shop/university/${university}`);
}
