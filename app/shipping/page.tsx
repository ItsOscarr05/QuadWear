export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Shipping & Returns</h1>
      <p className="text-gray-600 mb-10">Last updated: March 2025</p>

      <div className="space-y-8">
        <section className="card-sticker">
          <h2 className="text-2xl font-bold mb-4">Shipping</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Processing Time:</strong> Orders are typically processed within 3-5 business days after payment confirmation. Orders placed on weekends or holidays begin processing the next business day.
            </p>
            <p>
              <strong>Delivery Options:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Standard Shipping (5-7 business days):</strong> $5.99 for orders under $50. Arrives within 5-7 business days after your order ships.</li>
              <li><strong>Expedited Shipping (2-3 business days):</strong> $12.99. Arrives within 2-3 business days after your order ships.</li>
            </ul>
            <p>
              <strong>Free Shipping:</strong> Free standard shipping on all orders over $50. No code required.
            </p>
            <p>
              <strong>Shipping Destinations:</strong> We currently ship within the United States only (including Alaska and Hawaii). International shipping is not available at this time.
            </p>
            <p>
              <strong>Tracking:</strong> You will receive a tracking number via email once your order has shipped. Use this number to monitor your package&apos;s progress through your carrier&apos;s website.
            </p>
          </div>
        </section>

        <section className="card-sticker">
          <h2 className="text-2xl font-bold mb-4">Returns & Exchanges</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              We want you to love your QuadWear gear. If you need to return or exchange an item, please review our policy below.
            </p>
            <h3 className="font-semibold text-lg mt-4">Eligibility</h3>
            <p>
              We accept return requests for items that are unworn, unwashed, and in their original condition with all original tags still attached. Items must be in their original packaging if applicable. We do not accept returns for custom orders, personalized items, or items marked as final sale.
            </p>
            <h3 className="font-semibold text-lg mt-4">Return Timeframe</h3>
            <p>
              Return requests must be initiated within 30 days of the date you received your item.
            </p>
            <h3 className="font-semibold text-lg mt-4">How to Return or Exchange</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact us at <a href="mailto:support@quadwear.com" className="text-primary underline hover:no-underline">support@quadwear.com</a> with your order number and the reason for your return or exchange.</li>
              <li>We will send you a return authorization and instructions within 1-2 business days.</li>
              <li>Pack the item securely in its original packaging (or similar) and ship it to the address we provide.</li>
              <li>Include your order number inside the package.</li>
              <li>You are responsible for return shipping costs. The cost of return shipping will be deducted from your refund, or you may purchase your own label.</li>
            </ol>
            <h3 className="font-semibold text-lg mt-4">Refunds</h3>
            <p>
              Once we receive your returned item, we will inspect it and process your refund within 5-7 business days. Refunds will be issued to your original payment method. Please note that it may take an additional 3-10 business days for your bank or card issuer to post the refund to your account.
            </p>
            <h3 className="font-semibold text-lg mt-4">Exchanges</h3>
            <p>
              In the unlikely event that you receive a damaged or defective item, we will exchange it for a new one at no additional cost. Please contact <a href="mailto:support@quadwear.com" className="text-primary underline hover:no-underline">support@quadwear.com</a> within 30 days of delivery with photos of the issue to begin the exchange process. We also offer exchanges for size or style changes within 30 days—contact us to arrange.
            </p>
            <h3 className="font-semibold text-lg mt-4">Final Sale & Non-Returnable Items</h3>
            <p>
              Items marked &quot;Final Sale&quot; at checkout are not eligible for returns or refunds. Custom designs and bulk orders are non-returnable. Gift cards are non-refundable.
            </p>
          </div>
        </section>

        <section className="card-sticker">
          <h2 className="text-2xl font-bold mb-4">Custom Orders</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>Custom Designs:</strong> Need a custom design or larger quantity for your club, team, or event? Contact us at <a href="mailto:support@quadwear.com" className="text-primary underline hover:no-underline">support@quadwear.com</a> for special pricing. Custom orders are non-returnable.
            </p>
          </div>
        </section>

        <section className="card-sticker">
          <h2 className="text-2xl font-bold mb-4">Questions?</h2>
          <p className="text-gray-700">
            If you have any questions about shipping or returns, reach out to us at <a href="mailto:support@quadwear.com" className="text-primary underline hover:no-underline">support@quadwear.com</a>. We typically respond within 1-2 business days.
          </p>
        </section>
      </div>
    </div>
  )
}
