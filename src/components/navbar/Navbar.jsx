import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "About Us", path: "/about" },
    { id: 3, name: "Gallery", path: "/gallery" },
    { id: 4, name: "Accommodations", path: "/accommodations" },
    { id: 5, name: "Experiences & Amenities", path: "/amenities" },
    { id: 6, name: "Events & Dining", path: "/dining" },
    { id: 7, name: "Contact", path: "/contact" },
    { id: 8, name: "Testimonials", path: "/testimonials" },
  ];

  const toggleNavbar = () => setOpen(!open);
  const closeNavbar = () => setOpen(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  const handkeBook = () => {
    navigate("/appointment");
    closeNavbar();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center" onClick={closeNavbar}>
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-16 w-auto max-w-[120px] object-contain opacity-0 animate-[fadeInUp_1s_ease-out_.5s_forwards]"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={closeNavbar}
                  className={`text-sm font-extralight transition-colors duration-200  hover:text-amber-600 opacity-0 animate-[fadeInUp_1s_ease-out_.5s_forwards] ${
                    location.pathname === item.path
                      ? "text-amber-600"
                      : "text-gray-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Book Now Button */}
            <div className="hidden lg:flex items-center">
              <button
                onClick={handkeBook}
                className="relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-1 rounded-full text-md font-light tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 opacity-0 animate-[fadeInUp_1s_ease-out_.5s_forwards]"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleNavbar}
                className="p-2 rounded-md cursor-pointer text-gray-700 hover:text-amber-600 hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 z-40 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeNavbar}
        />

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out z-50 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link to="/" className="flex items-center" onClick={closeNavbar}>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto max-w-[100px] object-contain"
              />
            </Link>

            <button
              onClick={closeNavbar}
              className="p-2 rounded-md cursor-pointer text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Items */}
          <div className="px-4 py-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={closeNavbar}
                  className={`block px-3 py-2 rounded-md text-sm font-extralight transition-colors duration-200 ${
                    location.pathname === item.path
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-700 hover:text-amber-600 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <button
              onClick={handkeBook}
              className="w-full bg-amber-600 cursor-pointer text-white py-3 rounded text-sm font-medium hover:bg-amber-700 transition-colors duration-200 mt-6 flex items-center justify-center"
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
