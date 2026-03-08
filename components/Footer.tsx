import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-charcoal text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 font-accent">QuadWear</h3>
            <p className="text-sm text-gray-300">
              Hand-drawn tees for your major.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-300">
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
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-300">
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
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-accent transition-colors"
              >
                TikTok
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

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} QuadWear. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
