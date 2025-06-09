import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900"
            >
              <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xs">L&F</span>
                <div className="absolute inset-0 bg-white/20 rounded-full transform scale-0 transition-transform duration-300 group-hover:scale-100"></div>
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                FindIt
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/lost"
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                isActive("/lost")
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {isActive("/lost") && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full -z-10"></span>
              )}
              <span className="relative z-10 flex items-center">
                <span className="mr-1">🧳</span> Lost Items
                {!isActive("/lost") && (
                  <span className="absolute inset-0 rounded-full bg-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                )}
              </span>
            </Link>

            <Link
              to="/found"
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                isActive("/found")
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {isActive("/found") && (
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-full -z-10"></span>
              )}
              <span className="relative z-10 flex items-center">
                <span className="mr-1">🔎</span> Found Items
                {!isActive("/found") && (
                  <span className="absolute inset-0 rounded-full bg-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                )}
              </span>
            </Link>

            <Link
              to="/post-lost"
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                isActive("/post-lost")
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {isActive("/post-lost") && (
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full -z-10"></span>
              )}
              <span className="relative z-10 flex items-center">
                <span className="mr-1">📝</span> Report Lost
                {!isActive("/post-lost") && (
                  <span className="absolute inset-0 rounded-full bg-red-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                )}
              </span>
            </Link>

            <Link
              to="/post-found"
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                isActive("/post-found")
                  ? "text-white"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {isActive("/post-found") && (
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full -z-10"></span>
              )}
              <span className="relative z-10 flex items-center">
                <span className="mr-1">✨</span> Report Found
                {!isActive("/post-found") && (
                  <span className="absolute inset-0 rounded-full bg-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                )}
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out transform ${
          isMobileMenuOpen
            ? "opacity-100 max-h-96"
            : "opacity-0 max-h-0 pointer-events-none"
        } overflow-hidden`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-md">
          <Link
            to="/lost"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/lost")
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-100"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🧳 Lost Items
          </Link>

          <Link
            to="/found"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/found")
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                : "text-gray-700 hover:bg-green-100"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🔎 Found Items
          </Link>

          <Link
            to="/post-lost"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/post-lost")
                ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                : "text-gray-700 hover:bg-red-100"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            📝 Report Lost
          </Link>

          <Link
            to="/post-found"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              isActive("/post-found")
                ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                : "text-gray-700 hover:bg-purple-100"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ✨ Report Found
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
