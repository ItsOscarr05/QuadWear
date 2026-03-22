import Image from "next/image";
import Link from "next/link";
import { EmptyStateCatalog } from "@/components/empty-state";
import { UNIVERSITIES } from "@/lib/universities";

export default function ShopByUniversityPage() {
  if (UNIVERSITIES.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-lg mx-auto">
          <EmptyStateCatalog
            title="No schools on the roster yet"
            description="We’re adding campuses—check back soon or head to the main shop."
          >
            <Link href="/shop" className="btn-primary inline-block text-center">
              Back to shop
            </Link>
          </EmptyStateCatalog>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <Link
          href="/shop"
          className="text-sm font-semibold text-primary hover:underline mb-4 inline-block"
        >
          ← Back to Shop
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-black">
          Shop by School
        </h1>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl">
          Choose your school to see all shirts we carry for that campus.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {UNIVERSITIES.map((u) => (
          <Link
            key={u.slug}
            href={`/shop/university/${u.slug}`}
            className="card-sticker flex h-full flex-col overflow-hidden transition-all duration-200 hover:border-accent group"
          >
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-gray-100">
              <Image
                src={encodeURI(u.coverImage)}
                alt={`${u.fullName} campus`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            </div>
            <div
              className="h-2 w-full shrink-0 border-b-2 border-black"
              style={{ backgroundColor: u.primaryColor }}
            />
            <div className="flex flex-1 flex-col p-5">
              <p
                className="text-3xl font-bold leading-tight"
                style={{ color: u.primaryColor }}
              >
                {u.abbreviation}
              </p>
              <p className="mt-1 font-bold text-lg leading-snug text-black transition-colors group-hover:text-primary">
                {u.fullName}
              </p>
              <p className="mt-2 text-sm text-gray-600">View collection →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
