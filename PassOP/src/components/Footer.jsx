import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 md:py-8 w-full mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo and Description Section */}
          <div className="mb-6 md:mb-0 text-center md:text-left w-full md:w-auto">
            <div className="logo font-bold text-2xl md:text-3xl mb-2">
              <span className="text-green-500">&lt;</span>
              Pass
              <span className="text-green-500">OP/ &gt;</span>
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-1">Password Manager</h3>
            <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-xs md:max-w-md mx-auto md:mx-0">
              Secure your digital life - Created with love by CodexPiyush
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-6 md:mb-0 w-full md:w-auto">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors text-sm px-3 py-1 md:px-0 md:py-0"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors text-sm px-3 py-1 md:px-0 md:py-0"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors text-sm px-3 py-1 md:px-0 md:py-0"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-gray-400 text-xs md:text-sm">
            © 2025 <span className="text-green-400">PassOP</span>. All rights reserved.
          </p>
          {/* Mobile-only additional text */}
          <p className="text-gray-500 text-xs mt-2 md:hidden">
            Securely manage your passwords on any device
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;