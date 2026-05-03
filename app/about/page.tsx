import Link from "next/link";
import PageBackNav from "@/components/PageBackNav";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <PageBackNav href="/" label="← Home" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
        About QuadWear
      </h1>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl">
        College merch usually shouts the school name and stops there. We think
        your major—the path you actually walk every day—deserves the spotlight
        too.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">Our story</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              QuadWear started with a realization that almost all students
              already have: generic tees that could belong to anyone. We wanted
              something that felt like it came from passion that stems from
              students—not a catalog page—representing the classes, labs, late
              nights, and inside jokes that make a major feel like family.
            </p>
            <p>
              So we set out to build a different kind of college apparel:{" "}
              <span className="font-semibold text-black">
                hand-drawn designs
              </span>{" "}
              tied to real majors, paired with your university, so you can rep
              both where you study and what you study. Each piece is crafted to
              feel personal—closer to a sketch in a notebook than a mass-market
              graphic.
            </p>
            <p>
              Today we work with students and creators who get what it means to
              wear your discipline with pride. Whether you are ordering one
              shirt for yourself or outfitting a study group, club, or class,
              we are here to make major pride look and feel authentic.
            </p>
          </div>
        </section>

        <section className="card-sticker">
          <h2 className="text-2xl font-bold mb-4 text-black">Our mission</h2>
          <p className="text-lg font-medium text-black mb-4">
            Help every student celebrate their academic journey with apparel
            that is distinctive, thoughtful, and true to their field—not
            interchangeable filler.
          </p>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We believe what you study shapes how you see the world. A great
            major tee should nod to that identity: the skills you are building,
            the community you are part of, and the story you are writing on
            campus. Our mission is to make that kind of pride easy to wear—
            through original art, quality blanks, and a shopping experience
            built around universities and majors, not one-size-fits-all slogans.
          </p>
          <ul className="space-y-3 text-gray-700 border-t-4 border-black pt-6">
            <li className="flex gap-3">
              <span className="font-bold text-primary shrink-0">•</span>
              <span>
                <span className="font-semibold text-black">Authenticity:</span>{" "}
                Designs that feel specific to your major and school—not generic
                templates with a logo slapped on.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary shrink-0">•</span>
              <span>
                <span className="font-semibold text-black">Craft:</span>{" "}
                Hand-drawn artwork and careful printing so your shirt holds up
                through semesters of wear.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold text-primary shrink-0">•</span>
              <span>
                <span className="font-semibold text-black">Community:</span>{" "}
                Built for study groups, clubs, and classmates who want to show
                up together—with room to grow across campuses and programs.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-black">What we stand for</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              We are student-focused: fair policies, clear shipping and returns,
              and gear meant for real campus life. We are also always growing—
              adding universities, majors, and designs so more students can find
              something that fits.
            </p>
            <p>
              If you have ideas for a major, a partnership, or a custom order,
              we want to hear from you. QuadWear is as much about the people
              wearing the shirts as the shirts themselves.
            </p>
          </div>
        </section>

        <div className="pt-4 flex flex-wrap gap-4">
          <Link href="/shop" className="btn-primary inline-block">
            Shop the collection
          </Link>
          <Link href="/contact" className="btn-secondary inline-block">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
