"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  CreditCard,
  Truck,
  Shield,
  Clock,
  Heart,
  ShoppingBag,
  Tag,
  TrendingUp,
  Award,
  Headphones,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGeneralSettings } from "@/store/slices/landingSlice";
import { imageUrl } from "@/services/BaseUrl";

const ShopFooter = () => {
  const dispatch = useAppDispatch();
  const { data: settings } = useAppSelector((state) => state.landing.generalSettings);
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  const shopLinks = [
    { name: "All Products", href: "/shop" },
    { name: "Trending Now", href: "/shop/trending" },
    { name: "New Arrivals", href: "/shop/new-arrivals" },
    { name: "Best Sellers", href: "/shop/best-sellers" },
    { name: "Special Deals", href: "/shop/deals" },
  ];

  const customerService = [
    { name: "Help Center", href: "/help" },
    { name: "Track Order", href: "/track-order" },
    { name: "Returns & Refunds", href: "/returns" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Size Guide", href: "/size-guide" },
    { name: "Contact Us", href: "/contact" },
  ];

  const accountLinks = [
    { name: "My Account", href: "/profile" },
    { name: "Order History", href: "/orders" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Shopping Cart", href: "/cart" },
    { name: "Saved Addresses", href: "/addresses" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
    { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% Protected",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Dedicated support",
    },
    {
      icon: Award,
      title: "Best Quality",
      description: "Authentic products",
    },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Top Section - Features */}
      <div className="border-b border-gray-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-3">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Company Info & Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <div className="flex items-center space-x-2 mb-6">
              {settings?.footerLogo ? (
                <img
                  src={settings.footerLogo.startsWith('/') ? `${imageUrl}${settings.footerLogo}` : `${imageUrl}/${settings.footerLogo}`}
                  alt="Shop Logo"
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="text-white" size={24} />
                  </div>
                  <span className="text-2xl font-bold text-white">HubMicro Shop</span>
                </>
              )}
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              Your one-stop destination for quality products at unbeatable prices.
              Shop with confidence and enjoy fast, secure delivery.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Mail size={18} />
                Subscribe to Newsletter
              </h4>
              <p className="text-gray-400 text-sm mb-4">
                Get exclusive deals and updates delivered to your inbox
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
                >
                  <Send size={18} />
                </motion.button>
              </form>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.label}
                    className={`p-3 bg-gray-800 rounded-lg transition-all ${social.color}`}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Tag size={20} />
              Shop
            </h3>
            <ul className="space-y-3">
              {shopLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-purple-600 rounded-full" />
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <Headphones size={20} />
              Help & Support
            </h3>
            <ul className="space-y-3">
              {customerService.slice(0, 5).map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-blue-600 rounded-full" />
                      {link.name}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Contact Info */}
        <div className="py-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-gray-800 rounded-lg">
                <Phone size={18} className="text-purple-400" />
              </div>
              <div className="flex flex-col">
                <div className="text-gray-500 text-xs">Call Us</div>
                {settings?.phoneNumber && Array.isArray(settings.phoneNumber) && settings.phoneNumber.length > 0 ? (
                  settings.phoneNumber.slice(2, 4).map((phone, idx) => (
                    <a key={idx} href={`tel:${phone}`} className="text-white hover:text-purple-400">
                      {phone}
                    </a>
                  ))
                ) : (
                  <a href={`tel:${(settings?.phoneNumber as any) || "+1234567890"}`} className="text-white hover:text-purple-400">
                    {(settings?.phoneNumber as any) || "+1 (234) 567-890"}
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-gray-800 rounded-lg">
                <Mail size={18} className="text-pink-400" />
              </div>
              <div>
                <div className="text-gray-500 text-xs">Email Us</div>
                <a href={`mailto:${settings?.email || "shop@hubmicro.com"}`} className="text-white hover:text-purple-400">
                  {settings?.email || "shop@hubmicro.com"}
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-gray-800 rounded-lg">
                <MapPin size={18} className="text-blue-400" />
              </div>
              <div>
                <div className="text-gray-500 text-xs">Visit Us</div>
                <span className="text-white">
                  {settings?.location || "123 Shop St, Commerce City"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Payment & Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">


            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-gray-400 text-sm mb-2">
                © {new Date().getFullYear()} HubMicro Shop. All rights reserved.
              </p>
              <div className="flex items-center justify-center gap-4 text-xs">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Terms of Service
                </Link>
                <span className="text-gray-600">•</span>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>
            </motion.div>

            {/* Made with Love */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-gray-400 text-sm"
            >
              Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={16} className="text-red-500 fill-red-500" />
              </motion.span>
              by HubMicro Team
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full filter blur-3xl -translate-x-1/2 translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2" />
    </footer>
  );
};

export default ShopFooter;
