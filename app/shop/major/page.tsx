import Image from "next/image";
import Link from "next/link";
import { EmptyStateCatalog } from "@/components/empty-state";
import { MAJOR_CARD_IMAGE_BY_SLUG, MAJORS } from "@/lib/majors";

function MajorIcon() {
  return (
    <svg
      className="w-10 h-10 text-primary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

export default function ShopByMajorPage() {
  if (MAJORS.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-lg mx-auto">
          <EmptyStateCatalog
            title="Majors are enrolling soon"
            description="Our major list is empty for now—swing by the shop hub for updates."
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
          Shop by Major
        </h1>
        <p className="text-lg text-gray-600 mt-3 max-w-2xl">
          Pick your field of study to see designs from every school we carry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {MAJORS.map((m) => {
          const cardImage = MAJOR_CARD_IMAGE_BY_SLUG[m.slug];
          return (
            <Link
              key={m.slug}
              href={`/shop/major/${m.slug}`}
              className="card-sticker flex h-full flex-col overflow-hidden transition-all duration-200 hover:border-accent group"
            >
              <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-white">
                {cardImage ? (
                  <div className="relative h-full w-full p-2 sm:p-3">
                    <Image
                      src={cardImage}
                      alt={`${m.name} design`}
                      fill
                      className="object-contain object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                    />
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-primary bg-white group-hover:border-accent">
                      <MajorIcon />
                    </div>
                  </div>
                )}
              </div>
              <div
                className="h-2 w-full shrink-0 border-b-2 border-black bg-primary"
                aria-hidden
              />
              <div className="flex min-h-0 flex-1 flex-col justify-end gap-1 pt-2">
                <p className="text-sm font-bold leading-snug text-primary sm:text-base">
                  {m.name}
                </p>
                <p className="mt-1 text-xs text-gray-600">View collection →</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
