import Link from "next/link";
import PageBackNav from "@/components/PageBackNav";

export default function ShopHubPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <PageBackNav href="/" label="← Home" />
      <h1 className="text-4xl md:text-5xl font-bold text-black text-center mb-4">
        Shop
      </h1>
      <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Browse by the school you attend or the major you study—whichever feels
        most natural.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <Link
          href="/shop/university"
          className="card-sticker block p-8 md:p-10 text-center transition-all duration-200 hover:border-accent group"
        >
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-4 border-primary rounded-full bg-white group-hover:border-accent">
            <svg
              className="w-9 h-9 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l9-5-9-5-9 5 9 5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
            Shop by School
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Pick your campus and see every design we carry for that school,
            across all majors.
          </p>
          <span className="inline-block mt-6 font-bold text-primary group-hover:underline">
            Browse schools →
          </span>
        </Link>

        <Link
          href="/shop/major"
          className="card-sticker block p-8 md:p-10 text-center transition-all duration-200 hover:border-accent group"
        >
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border-4 border-accent rounded-full bg-white group-hover:border-primary">
            <svg
              className="w-9 h-9 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
            Shop by Major
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Choose your field of study and explore designs from every school we
            offer.
          </p>
          <span className="inline-block mt-6 font-bold text-primary group-hover:underline">
            Browse majors →
          </span>
        </Link>
      </div>
    </div>
  );
}
