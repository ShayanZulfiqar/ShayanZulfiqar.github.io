"use client";

import React from "react";
import { motion } from "framer-motion";
import { Package, Star, TrendingUp, Zap } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAboutContacts, fetchClientStats } from "@/store/slices/landingSlice";

const ProductsHeroSection = () => {
  const dispatch = useAppDispatch();
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const { data: statsData } = useAppSelector((state) => state.landing.clientStats);
  const firstAbout = aboutData[0];

  React.useEffect(() => {
    dispatch(fetchAboutContacts());
    dispatch(fetchClientStats());
  }, [dispatch]);

  const stats = [
    { number: statsData[1]?.value || "50+", label: statsData[1]?.label || "Digital Products" },
    { number: statsData[0]?.value || "10K+", label: statsData[0]?.label || "Happy Customers" },
    { number: "4.9", label: "Average Rating" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 pt-20">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8"
        >
          <Package className="w-4 h-4 text-yellow-300" />
          <span className="text-white text-sm font-medium">
            Premium Digital Products
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
        >
          {firstAbout?.mainTitle || "Premium Products Built for Success"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl text-purple-100 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {firstAbout?.subtitle || "Discover our collection of professionally crafted digital products designed to accelerate your projects and boost productivity."}
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: Star, text: "Premium Quality" },
            { icon: Zap, text: "Instant Access" },
            { icon: TrendingUp, text: "Regular Updates" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3"
            >
              <feature.icon className="w-5 h-5 text-yellow-300" />
              <span className="text-white font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2"
          >
            {firstAbout?.ctaButtons[0]?.label || "Browse All Products"}
            <Package className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300"
          >
            {firstAbout?.ctaButtons[1]?.label || "View Pricing"}
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: "50+", label: "Digital Products" },
            { number: "10K+", label: "Happy Customers" },
            { number: "4.9", label: "Average Rating" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-purple-200 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default ProductsHeroSection;
