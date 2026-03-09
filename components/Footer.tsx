import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/quadwear_inverted_transparent.png"
                alt="QuadWear"
                width={380}
                height={256}
                className="h-24 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-white/80">
              Hand-drawn tees for your major.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Shop</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/shop" className="hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/jmu" className="hover:text-accent transition-colors">
                  JMU Collection
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/shipping" className="hover:text-accent transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-white">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/quadwear_clothing?igsh=aWF2OWlrOTNkamo2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-accent transition-colors"
              >
                Instagram
              </a>
            </div>
            <div className="mt-4">
              <Link
                href="/rep"
                className="text-sm text-accent hover:text-accent-light transition-colors underline"
              >
                Want QuadWear at your campus? Apply as a rep.
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t-4 border-white/20 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} QuadWear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
