"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, TrendingUp, Award } from "lucide-react";
import { World } from "@/components/ui/globe";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAboutContacts, fetchClientStats } from "@/store/slices/landingSlice";

const PortfolioHeroSection = () => {
  const dispatch = useAppDispatch();
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const { data: statsData } = useAppSelector((state) => state.landing.clientStats);
  const { mode } = useAppSelector((state) => state.theme);
  const firstAbout = aboutData[0];

  useEffect(() => {
    dispatch(fetchAboutContacts());
    dispatch(fetchClientStats());
  }, [dispatch]);

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
    { order: 1, startLat: 37.7749, startLng: -122.4194, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.2, color: "#00E5FF" }, // SF to London
    { order: 2, startLat: 22.3193, startLng: 114.1694, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.1, color: "#8B31FF" }, // HK to Tokyo
    { order: 3, startLat: 25.2048, startLng: 55.2708, endLat: 51.5074, endLng: -0.1278, arcAlt: 0.3, color: "#ffffff" }, // Dubai to London
    { order: 4, startLat: 1.3521, startLng: 103.8198, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.2, color: "#00E5FF" }, // Singapore to Sydney
    { order: 5, startLat: 40.7128, startLng: -74.0060, endLat: 22.3193, endLng: 114.1694, arcAlt: 0.4, color: "#8B31FF" }, // NY to HK
    { order: 6, startLat: 51.5074, startLng: -0.1278, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.3, color: "#ffffff" }, // London to Singapore
  ];

  const stats = [
    { icon: Briefcase, number: statsData[1]?.value || "500+", label: statsData[1]?.label || "Projects Completed" },
    { icon: TrendingUp, number: "98%", label: "Success Rate" },
    { icon: Award, number: "25+", label: "Industry Awards" },
  ];

  return (
    <section className={`relative min-h-[70vh] flex items-center justify-center overflow-hidden transition-colors duration-700 pt-20 ${mode === "dark"
      ? "bg-gradient-to-br from-[#0B0F19] via-[#0B0F19] to-[#4F11C2]/30"
      : "bg-gradient-to-br from-[#0B0F19] via-[#4F11C2] to-[#8B31FF]"
      }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-[#4F11C2] rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B31FF] rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center gap-2 border rounded-full px-6 py-2 mb-8 transition-all duration-300 backdrop-blur-md ${mode === "dark"
            ? "bg-white/10 border-white/20 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            : "bg-white/10 border-white/20 shadow-sm"
            }`}
        >
          <Briefcase className={`w-4 h-4 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#00E5FF]"}`} />
          <span className={`text-sm font-semibold transition-colors duration-300 text-white`}>
            Our Portfolio
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight transition-colors duration-300 text-white`}
        >
          {firstAbout?.mainTitle || "Our Work Speaks Volumes"}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-lg sm:text-xl mb-12 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-300" : "text-[#ffffff]/80"
            }`}
        >
          {firstAbout?.subtitle || "Explore our collection of successful projects across diverse industries. Each project represents our commitment to excellence and innovation."}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            { icon: Briefcase, number: "500+", label: "Projects Completed" },
            { icon: TrendingUp, number: "98%", label: "Success Rate" },
            { icon: Award, number: "25+", label: "Industry Awards" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.05 }}
              className={`text-center backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 ${mode === "dark"
                ? "bg-white/5 border-white/10 hover:border-[#00E5FF]/50 shadow-lg"
                : "bg-white/10 border-white/20 hover:border-[#00E5FF]/50 shadow-lg"
                }`}
            >
              <stat.icon className={`w-8 h-8 mx-auto mb-3 text-[#00E5FF]`} />
              <h3 className={`text-3xl md:text-4xl font-bold mb-2 transition-colors duration-300 text-white`}>
                {stat.number}
              </h3>
              <p className={`text-sm font-medium text-[#00E5FF]`}>{stat.label}</p>
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
            fill={mode === "dark" ? "#0B0F19" : "#ffffff"}
            className="transition-colors duration-700"
          />
        </svg>
      </div>

      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-50">
        <World key={mode} globeConfig={globeConfig} data={globeData} />
      </div>
    </section>
  );
};

export default PortfolioHeroSection;
