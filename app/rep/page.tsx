export default function RepPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">Become a Campus Rep</h1>
      <p className="text-lg text-gray-700 mb-8">
        Want QuadWear at your campus? Join our team and help bring hand-drawn designs to your university!
      </p>
      
      <div className="card-sticker">
        <h2 className="text-2xl font-bold mb-4">What's in it for you?</h2>
        <ul className="space-y-2 text-gray-700 mb-6">
          <li>• Commission on sales from your campus</li>
          <li>• Free QuadWear merchandise</li>
          <li>• Marketing materials and support</li>
          <li>• Build your resume and network</li>
        </ul>
        
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
            <label className="block text-sm font-semibold mb-2">University *</label>
            <input
              type="text"
              required
              placeholder="e.g., JMU"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Year *</label>
            <select
              required
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
            >
              <option value="">Select year...</option>
              <option value="freshman">Freshman</option>
              <option value="sophomore">Sophomore</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="graduate">Graduate</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold mb-2">Why do you want to be a QuadWear rep? *</label>
            <textarea
              required
              rows={4}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-primary focus:outline-none"
            />
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}
