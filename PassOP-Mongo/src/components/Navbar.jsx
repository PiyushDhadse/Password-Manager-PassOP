import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-slate-800 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo */}
          <div className="logo font-bold text-xl md:text-2xl text-white">
            <span className="text-green-500">&lt;</span>
            Pass
            <span className="text-green-500">OP/ &gt;</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-6 lg:space-x-8">
              <li>
                <a 
                  className="text-gray-300 hover:text-white hover:font-medium transition-colors text-sm lg:text-base"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  className="text-gray-300 hover:text-white hover:font-medium transition-colors text-sm lg:text-base"
                  href="#"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  className="text-gray-300 hover:text-white hover:font-medium transition-colors text-sm lg:text-base"
                  href="#"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Desktop GitHub Button */}
          <div className="hidden md:flex">
            <button className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded-full flex items-center gap-2 transition-colors">
              <img 
                className="h-5 w-5 invert" 
                src="./src/assets/github.png" 
                alt="GitHub" 
              />
              <span className="text-white text-sm font-medium">GitHub</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-700 border-t border-slate-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="text-gray-300 hover:text-white hover:bg-slate-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white hover:bg-slate-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white hover:bg-slate-600 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
            <div className="px-2 pb-3 pt-2">
              <button className="w-full px-4 py-3 bg-green-700 hover:bg-green-600 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <img 
                  className="h-5 w-5 invert" 
                  src="./src/assets/github.png" 
                  alt="GitHub" 
                />
                <span className="text-white text-base font-medium">GitHub</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;