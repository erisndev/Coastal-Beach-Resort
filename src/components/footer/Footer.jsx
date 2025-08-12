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
    <footer className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Subtle wave pattern */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Logo & Description */}
          <div className="lg:col-span-1 text-center md:text-left">
            <div className="group mb-6">
              <img
                src="/logo.png"
                alt="Coastal Beach Resort Logo"
                className="h-20 w-auto mb-6 mx-auto md:mx-0 filter drop-shadow-lg transition-all duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-slate-300 leading-relaxed mb-6 font-light tracking-wide">
              Escape to paradise at Coastal Beach Resort, where sun, sea, and
              serenity create unforgettable memories along South Africa's
              stunning coastline.
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-amber-500 to-amber-600 mx-auto md:mx-0"></div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-light text-white mb-8 tracking-wide relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-8 h-px bg-amber-500 mx-auto md:mx-0"></div>
            </h3>
            <nav>
              <ul className="space-y-4">
                <li>
                  <a
                    href="/"
                    className="group inline-flex items-center text-slate-300 hover:text-white transition-all duration-300 font-light tracking-wide relative"
                  >
                    <span className="relative overflow-hidden">
                      Home
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="group inline-flex items-center text-slate-300 hover:text-white transition-all duration-300 font-light tracking-wide relative"
                  >
                    <span className="relative overflow-hidden">
                      About Us
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/accommodations"
                    className="group inline-flex items-center text-slate-300 hover:text-white transition-all duration-300 font-light tracking-wide relative"
                  >
                    <span className="relative overflow-hidden">
                      Rooms & Suites
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="group inline-flex items-center text-slate-300 hover:text-white transition-all duration-300 font-light tracking-wide relative"
                  >
                    <span className="relative overflow-hidden">
                      Contact
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-light text-white mb-8 tracking-wide relative">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-8 h-px bg-amber-500 mx-auto md:mx-0"></div>
            </h3>
            <div className="space-y-6">
              <div className="group flex items-start gap-4 justify-center md:justify-start p-3 rounded-lg transition-all duration-300 hover:bg-white/5">
                <div className="flex-shrink-0 p-2 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-all duration-300">
                  <MapPin
                    size={18}
                    className="text-amber-500 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-left">
                  <div className="text-slate-200 font-light tracking-wide">
                    uMgababa, Amazimtoti
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-light">
                    South Africa
                  </div>
                </div>
              </div>

              <div className="group flex items-start gap-4 justify-center md:justify-start p-3 rounded-lg transition-all duration-300 hover:bg-white/5">
                <div className="flex-shrink-0 p-2 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-all duration-300">
                  <Phone
                    size={18}
                    className="text-amber-500 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-left">
                  <div className="text-slate-200 font-light tracking-wide">
                    031 285 0538
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-light">
                    Call us anytime
                  </div>
                </div>
              </div>

              <div className="group flex items-start gap-4 justify-center md:justify-start p-3 rounded-lg transition-all duration-300 hover:bg-white/5">
                <div className="flex-shrink-0 p-2 rounded-full bg-amber-500/10 group-hover:bg-amber-500/20 transition-all duration-300">
                  <Mail
                    size={18}
                    className="text-amber-500 group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="text-left">
                  <div className="text-slate-200 font-light tracking-wide">
                    info@coastalbeach.co.za
                  </div>
                  <div className="text-xs text-slate-400 mt-1 font-light">
                    We'll respond within 24hrs
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-light text-white mb-8 tracking-wide relative">
              Follow Us
              <div className="absolute -bottom-2 left-0 w-8 h-px bg-amber-500 mx-auto md:mx-0"></div>
            </h3>
            <p className="text-slate-300 font-light mb-6 leading-relaxed">
              Stay connected for the latest updates, special offers, and coastal
              inspiration.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a
                href="#"
                className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-blue-600 hover:scale-110 hover:border-white/20"
                aria-label="Facebook"
              >
                <Facebook
                  size={20}
                  className="text-slate-300 group-hover:text-white transition-colors duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#"
                className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-pink-600 hover:scale-110 hover:border-white/20"
                aria-label="Instagram"
              >
                <Instagram
                  size={20}
                  className="text-slate-300 group-hover:text-white transition-colors duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a
                href="#"
                className="group relative p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-blue-400 hover:scale-110 hover:border-white/20"
                aria-label="Twitter"
              >
                <Twitter
                  size={20}
                  className="text-slate-300 group-hover:text-white transition-colors duration-300"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-white mb-4 tracking-wide">
              Stay Updated
            </h3>
            <p className="text-slate-300 mb-8 font-light leading-relaxed">
              Subscribe to our newsletter for exclusive offers and coastal
              getaway inspiration.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all duration-300"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-light tracking-wide hover:from-amber-600 hover:to-amber-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 font-light tracking-wide">
              © {new Date().getFullYear()} Coastal Beach Resort. All rights
              reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-300 font-light"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-300 font-light"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-white transition-colors duration-300 font-light"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
