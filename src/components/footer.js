import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-violet-700">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-black hover:text-violet-700 transition">Home</a></li>
              <li><a href="#" className="text-black hover:text-violet-700 transition">About</a></li>
              <li><a href="#" className="text-black hover:text-violet-700 transition">Guide</a></li>
              <li><a href="#" className="text-black hover:text-violet-700 transition">Blocks</a></li>
              <li><a href="#" className="text-black hover:text-violet-700 transition">Contact</a></li>
              <li><a href="#" className="text-black hover:text-violet-700 transition">Terms of Use</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-violet-700">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="flex items-center space-x-2 text-black hover:text-violet-700 transition"><span>Github</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 text-black hover:text-violet-700 transition"><span>Twitter</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 text-black hover:text-violet-700 transition"><span>YouTube</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 text-black hover:text-violet-700 transition"><span>Facebook</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 text-black hover:text-violet-700 transition"><span>Medium</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 text-black hover:text-violet-700 transition"><span>Pintrest</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 text-black hover:text-violet-700 transition"><span>Patreon</span></a></li>
              <li><a href="#" className="flex items-center space-x-2 text-black hover:text-violet-700 transition"><span>Instagram</span></a></li>
            </ul>
          </div>

          {/* Info Section */}
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-lg font-semibold text-violet-700 mb-2">Daily DSA</h3>
            <p className="text-black">Your Daily Dose of DSA Wisdom</p>
            <p className="text-black">Daily DSA &copy; {new Date().getFullYear()}</p>
            <div className="flex flex-col space-y-1">
              <a href="#" className="text-black hover:text-violet-700 font-medium">Terms of Use</a>
              <a href="#" className="text-black hover:text-violet-700 font-medium">Privacy Policy</a>
              <span className="text-black">Need help? <a href="#" className="font-semibold hover:text-violet-700">Contact Us</a></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}