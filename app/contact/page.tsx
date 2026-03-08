export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="card-sticker">
        <p className="text-lg text-gray-700 mb-6">
          Have a question? Want to request a major or university? We'd love to hear from you!
        </p>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Name *</label>
            <input
              type="text"
              required
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Email *</label>
            <input
              type="email"
              required
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Message *</label>
            <textarea
              required
              rows={6}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
