import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-xl font-bold font-display text-white mb-4">ByteToBinary</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Engineering Tomorrow&apos;s Software, Today. Building scalable, intelligent solutions for enterprise challenges.
            </p>
          </div>

          {/* Expertise */}
          <div>
            <h4 className="text-white font-semibold mb-4">Expertise</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                  Media & Streaming
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                  Logistics
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                  AI & ML
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-500 hover:text-primary transition-colors duration-200">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-500 text-sm">
                <a href="mailto:hello@bytetobinary.com" className="hover:text-primary transition-colors duration-200">
                  info@bytetobinary.com
                </a>
              </li>
              <li className="text-gray-500 text-sm mt-4">
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-primary transition-colors duration-200">Twitter</a>
                  <a href="#" className="hover:text-primary transition-colors duration-200">LinkedIn</a>
                  <a href="#" className="hover:text-primary transition-colors duration-200">GitHub</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} ByteToBinary. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-500 hover:text-primary text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-500 hover:text-primary text-sm transition-colors duration-200">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
