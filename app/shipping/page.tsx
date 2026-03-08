export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping & Returns</h1>
      
      <div className="space-y-8">
        <section className="card-sticker">
          <h2 className="text-2xl font-bold mb-4">Shipping</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Processing Time:</strong> Orders are typically processed within 3-5 business days.
            </p>
            <p>
              <strong>Shipping Methods:</strong> Standard shipping (5-7 business days) and expedited shipping (2-3 business days) are available.
            </p>
            <p>
              <strong>Free Shipping:</strong> Free shipping on orders over $50.
            </p>
            <p>
              <strong>Tracking:</strong> You'll receive a tracking number via email once your order ships.
            </p>
          </div>
        </section>

        <section className="card-sticker">
          <h2 className="text-2xl font-bold mb-4">Returns & Exchanges</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Free Exchanges:</strong> We offer free exchanges within 30 days of delivery if the item is unworn and in original condition.
            </p>
            <p>
              <strong>Returns:</strong> Returns are accepted within 30 days. Items must be unworn and in original condition.
            </p>
            <p>
              <strong>How to Return:</strong> Contact us at support@quadwear.com with your order number to initiate a return or exchange.
            </p>
          </div>
        </section>

        <section className="card-sticker">
          <h2 className="text-2xl font-bold mb-4">Bulk Orders</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Minimum Order:</strong> All orders require a minimum of 12 shirts. You can mix designs, sizes, and colors to reach the minimum.
            </p>
            <p>
              <strong>Custom Orders:</strong> Need a custom design or larger quantity? Contact us for special pricing.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
