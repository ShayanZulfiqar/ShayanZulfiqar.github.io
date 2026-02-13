"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGeneralSettings } from "@/store/slices/landingSlice";
import { toggleTheme } from "@/store/slices/themeSlice";
import { imageUrl } from "@/services/BaseUrl";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "What Our Clients Say", href: "/testimonials" },
  { name: "About Us", href: "/about-us" },
  // { name: "Our Vision", href: "/vision" },
  { name: "Contact Us", href: "/contact" },
  { name: "Let's shope something", href: "/shop" },
];

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { data: settings } = useAppSelector((state) => state.landing.generalSettings);
  const { mode } = useAppSelector((state) => state.theme);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

  const announcements = [
    "Welcome to HubMicro - Transforming Ideas into Reality",
    "Expert Web Development & Design Services",
    "Get 20% Off Your First Consultation",
    "Award-Winning Digital Solutions",
  ];

  useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-transparent"
        }`}
    >
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-center items-center h-10 text-sm font-medium">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentAnnouncement}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center truncate"
              >
                {announcements[currentAnnouncement]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              {settings?.headerLogo ? (
                <img
                  src={settings.headerLogo.startsWith('/') ? `${imageUrl}${settings.headerLogo}` : `${imageUrl}/${settings.headerLogo}`}
                  alt="Logo"
                  className="h-15 w-auto object-contain"
                />
              ) : (
                <div className="flex justify-center items-center bg-gradient-to-br from-[#4F11C2] to-[#8B31FF] rounded-lg w-10 h-10">
                  <span className="font-bold text-white text-xl">H</span>
                </div>
              )}
              <span
                className={`text-2xl font-bold transition-colors ${scrolled
                  ? "bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent"
                  : "text-white"
                  }`}
              >
                {!settings?.headerLogo && "HubMicro"}
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, index) => (
              <Link key={index} href={link.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${scrolled
                    ? "text-gray-700 hover:text-[#4F11C2] hover:bg-purple-50"
                    : "text-white hover:bg-white/10"
                    }`}
                >
                  {link.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Theme Toggle & CTA Button - Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-full transition-all duration-300 ${scrolled
                ? "bg-purple-50 text-[#4F11C2] hover:bg-purple-100"
                : "bg-white/10 text-white hover:bg-white/20"
                }`}
            >
              {mode === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            <Link href="/auth/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] shadow-lg hover:shadow-xl px-6 py-3 rounded-full font-semibold text-white transition-all underline-offset-4 decoration-accent"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleTheme())}
              className={`p-2 rounded-lg ${scrolled ? "text-[#4F11C2]" : "text-white"}`}
            >
              {mode === "light" ? <Moon size={24} /> : <Sun size={24} />}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg ${scrolled ? "text-gray-700" : "text-white"
                }`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white shadow-lg border-gray-100 border-t overflow-hidden"
          >
            <div className="space-y-2 px-4 py-6">
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className="block hover:bg-purple-50 px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-[#4F11C2] transition-colors cursor-pointer"
                  >
                    {link.name}
                  </motion.div>
                </Link>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] shadow-lg mt-4 px-6 py-3 rounded-full w-full font-semibold text-white"
              >
                Get Started
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
