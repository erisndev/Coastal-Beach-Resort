import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-[#0D1B2A] text-white py-10  ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
        {/* Logo & Description */}
        <div className="text-center md:text-left">
          <img
            src="/logo.png"
            alt="Coastal Beach Resort Logo"
            className="h-16 w-auto mb-4 mx-auto md:mx-0"
          />
          <p className="text-sm text-gray-300 leading-relaxed">
            Escape to paradise at Coastal Beach Resort, where sun, sea, and
            relaxation await you.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a
                href="/"
                className="hover:text-white transition-colors duration-200"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="hover:text-white transition-colors duration-200"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/accommodations"
                className="hover:text-white transition-colors duration-200"
              >
                Rooms & Suites
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="hover:text-white transition-colors duration-200"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="text-sm text-gray-300 space-y-3">
            <li className="flex items-start gap-2 justify-center md:justify-start">
              <MapPin size={16} className="flex-shrink-0 mt-0.5" />
              <span>uMgababa, Amazimtoti</span>
            </li>
            <li className="flex items-start gap-2 justify-center md:justify-start">
              <Phone size={16} className="flex-shrink-0 mt-0.5" />
              <span>031 285 0538</span>
            </li>
            <li className="flex items-start gap-2 justify-center md:justify-start">
              <Mail size={16} className="flex-shrink-0 mt-0.5" />
              <span>info@coastalbeach.co.za</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 justify-center md:justify-start">
            <a
              href="#"
              className="hover:text-amber-500 transition-colors duration-200 p-1"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="hover:text-amber-500 transition-colors duration-200 p-1"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="hover:text-amber-500 transition-colors duration-200 p-1"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Coastal Beach Resort. All rights reserved.
      </div>
    </footer>
  );
};
