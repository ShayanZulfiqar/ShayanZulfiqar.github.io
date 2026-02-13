"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Heart,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGeneralSettings } from "@/store/slices/landingSlice";
import { imageUrl } from "@/services/BaseUrl";

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

const Footer = () => {
  const dispatch = useAppDispatch();
  const { data: settings } = useAppSelector((state) => state.landing.generalSettings);
  const { mode } = useAppSelector((state) => state.theme);

  React.useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  const quickLinks = [
    { name: "Home", href: "/home" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Vision", href: "/vision" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    "AI & Machine Learning",
    "Web Development",
    "App Development",
    "Graphic Designing",
    "Digital Marketing",
    "Video Editing",
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { icon: Twitter, href: "#", color: "hover:text-sky-500" },
    { icon: Instagram, href: "#", color: "hover:text-pink-600" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-700" },
    { icon: Github, href: "#", color: "hover:text-gray-900" },
  ];

  // Globe configuration
  const globeConfig = {
    pointSize: 4,
    globeColor: mode === "dark" ? "#0B0F19" : "#f8f9fc",
    showAtmosphere: true,
    atmosphereColor: mode === "dark" ? "#FFFFFF" : "#4F11C2",
    atmosphereAltitude: 0.1,
    emissive: mode === "dark" ? "#0B0F19" : "#E5E7EB",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: mode === "dark" ? "rgba(255,255,255,0.7)" : "rgba(79,17,194,0.3)",
    ambientLight: mode === "dark" ? "#4F11C2" : "#8B31FF",
    directionalLeftLight: mode === "dark" ? "#ffffff" : "#4F11C2",
    directionalTopLight: mode === "dark" ? "#ffffff" : "#4F11C2",
    pointLight: mode === "dark" ? "#ffffff" : "#4F11C2",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const globeData = [
    {
      order: 1,
      startLat: 22.3193,
      startLng: 114.1694,
      endLat: 51.5072,
      endLng: -0.1276,
      arcAlt: 0.1,
      color: "#ffffff",
    },
  ];

  return (
    <footer className={`relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-gray-900 text-gray-300" : "bg-slate-50 text-gray-600"}`}>
      {/* Background Pattern */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-5" : "opacity-10"}`}>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: mode === "dark"
              ? `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`
              : `radial-gradient(circle at 2px 2px, #4F11C2 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="top-0 right-0 left-0 absolute bg-gradient-to-r from-transparent via-[#8B31FF] to-transparent h-px" />

      <div className=" relative  mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-16">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              {settings?.footerLogo ? (
                <img
                  src={settings.footerLogo.startsWith('/') ? `${imageUrl}${settings.footerLogo}` : `${imageUrl}/${settings.footerLogo}`}
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="flex justify-center items-center bg-gradient-to-br from-[#4F11C2] to-[#8B31FF] rounded-xl w-12 h-12 shadow-lg shadow-[#4F11C2]/20">
                    <span className="font-bold text-white text-2xl">H</span>
                  </div>
                  <span className={`font-bold text-2xl transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>HubMicro</span>
                </>
              )}
            </div>
            <p className={`mb-6 transition-colors duration-300 leading-relaxed ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}>
              Transforming ideas into exceptional digital experiences. Your
              trusted partner for innovative technology solutions.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 rounded-lg transition-all border ${mode === "dark" ? "bg-gray-800 border-white/5" : "bg-white border-gray-200 shadow-sm"} ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className={`mb-6 font-bold text-lg transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className={`group flex items-center gap-2 transition-colors cursor-pointer ${mode === "dark" ? "text-gray-400 hover:text-[#00E5FF]" : "text-gray-500 hover:text-[#4F11C2]"}`}
                    >
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className={`mb-6 font-bold text-lg transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className={`transition-colors cursor-pointer ${mode === "dark" ? "text-gray-400 hover:text-[#00E5FF]" : "text-gray-500 hover:text-[#4F11C2]"}`}
                  >
                    {service}
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className={`mb-6 font-bold text-lg transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>Get In Touch</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <Mail size={20} className="flex-shrink-0 mt-1 text-[#00E5FF]" />
                <a
                  href={`mailto:${settings?.email || "info@hubmicro.com"}`}
                  className={`transition-colors ${mode === "dark" ? "text-gray-400 hover:text-[#00E5FF]" : "text-gray-500 hover:text-[#4F11C2]"}`}
                >
                  {settings?.email || "info@hubmicro.com"}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="flex-shrink-0 mt-1 text-[#00E5FF]" />
                <div className="flex flex-col gap-1">
                  {settings?.phoneNumber && Array.isArray(settings.phoneNumber) && settings.phoneNumber.length > 0 ? (
                    settings.phoneNumber.slice(0, 2).map((phone, idx) => (
                      <a
                        key={idx}
                        href={`tel:${phone}`}
                        className={`transition-colors ${mode === "dark" ? "text-gray-400 hover:text-[#00E5FF]" : "text-gray-500 hover:text-[#4F11C2]"}`}
                      >
                        {phone}
                      </a>
                    ))
                  ) : (
                    <a
                      href={`tel:${(settings?.phoneNumber as any) || "+1234567890"}`}
                      className={`transition-colors ${mode === "dark" ? "text-gray-400 hover:text-[#00E5FF]" : "text-gray-500 hover:text-[#4F11C2]"}`}
                    >
                      {(settings?.phoneNumber as any) || "+1 (234) 567-890"}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="flex-shrink-0 mt-1 text-[#00E5FF]" />
                <span className={`transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {settings?.location || "123 Business Ave, Tech City, TC 12345"}
                </span>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <h4 className={`mb-3 font-semibold transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className={`flex-1 px-4 py-2 border rounded-lg focus:outline-none transition-all duration-300 placeholder-gray-500 ${mode === "dark"
                    ? "bg-gray-800 border-gray-700 focus:border-[#4F11C2] text-white"
                    : "bg-white border-gray-200 focus:border-[#4F11C2] text-gray-900 shadow-sm"}`}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] p-2 rounded-lg text-white"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="bg-gradient-to-r from-transparent via-gray-700 to-transparent h-px" />

        {/* Bottom Bar */}
        <div className="py-8">
          <div className="flex md:flex-row flex-col justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`text-sm md:text-left text-center transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              © {new Date().getFullYear()} HubMicro Pro. All rights reserved.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={`flex items-center gap-1 text-sm transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}
            >
              Made with
              <motion.span
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart size={16} className="fill-red-500 text-red-500" />
              </motion.span>
              by HubMicro Team
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex gap-6 text-sm"
            >
              <Link
                href="/privacy"
                className={`transition-colors ${mode === "dark" ? "text-gray-400 hover:text-purple-400" : "text-gray-500 hover:text-[#4F11C2]"}`}
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className={`transition-colors ${mode === "dark" ? "text-gray-400 hover:text-purple-400" : "text-gray-500 hover:text-[#4F11C2]"}`}
              >
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className={`bottom-0 left-0 absolute rounded-full w-64 h-64 -translate-x-1/2 translate-y-1/2 filter blur-3xl transition-opacity duration-700 ${mode === "dark" ? "bg-[#4F11C2]/10 opacity-100" : "bg-[#4F11C2]/20 opacity-50"}`} />
      <div className={`right-0 bottom-0 absolute rounded-full w-64 h-64 translate-x-1/2 translate-y-1/2 filter blur-3xl transition-opacity duration-700 ${mode === "dark" ? "bg-[#00E5FF]/10 opacity-100" : "bg-[#00E5FF]/20 opacity-50"}`} />

      <div className={`absolute inset-0 z-0 h-full w-full pointer-events-none transition-opacity duration-700 ${mode === "dark" ? "opacity-30" : "opacity-20"}`}>
        <World globeConfig={globeConfig} data={globeData} />
      </div>
    </footer>
  );
};

export default Footer;
