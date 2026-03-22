import Link from "next/link";
import { MAJORS } from "@/lib/majors";

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {MAJORS.map((m) => (
          <Link
            key={m.slug}
            href={`/shop/major/${m.slug}`}
            className="card-sticker flex flex-col items-center justify-center p-8 text-center min-h-[160px] transition-all duration-200 hover:border-accent group"
          >
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-primary bg-white group-hover:border-accent">
              <MajorIcon />
            </div>
            <p className="font-bold text-lg text-black group-hover:text-primary transition-colors">
              {m.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
