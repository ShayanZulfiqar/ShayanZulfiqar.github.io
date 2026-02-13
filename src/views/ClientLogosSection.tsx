"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchClientBrands, fetchClientStats } from "@/store/slices/landingSlice";
import { Users, Award, Briefcase } from "lucide-react";
import Loader from "@/components/Loader";
import { imageUrl } from "../services/BaseUrl";

const ClientLogosSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: brands, loading: brandsLoading } = useAppSelector((state) => state.landing.clientBrands);
  const { data: statsData, loading: statsLoading } = useAppSelector((state) => state.landing.clientStats);

  useEffect(() => {
    dispatch(fetchClientBrands());
    dispatch(fetchClientStats());
  }, [dispatch]);

  const getFullUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith('http')) return path;
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${imageUrl}/${cleanPath}`;
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  };

  const statsWithIcons = [
    { ...statsData[0], icon: Users, color: "from-[#4F11C2] to-[#8B31FF]" },
    { ...statsData[1], icon: Award, color: "from-[#8B31FF] to-[#00E5FF]" },
    { ...statsData[2], icon: Briefcase, color: "from-[#00E5FF] to-[#4F11C2]" },
  ];

  if (brandsLoading || statsLoading) {
    return (
      <section className={`relative py-32 overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[400px] gap-4">
          <Loader />
          <p className={`animate-pulse ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>Loading brand network...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative py-32 overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-white"}`}>
      {/* Ambient Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#4F11C2]/5" : "bg-[#4F11C2]/3"}`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#00E5FF]/5" : "bg-[#00E5FF]/3"}`} />

        {/* Grid Pattern */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.05]" : "opacity-[0.03]"}`}
          style={{
            backgroundImage: mode === "dark"
              ? `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
              : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6 transition-all duration-300 ${mode === "dark"
              ? "border-[#4F11C2]/30 bg-[#4F11C2]/10 backdrop-blur-md"
              : "border-[#4F11C2]/20 bg-white/50 shadow-sm"}`}
          >
            <span className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
              Network of Leaders
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl lg:text-7xl font-black mb-6 tracking-tight transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] via-[#8B31FF] to-[#00E5FF]">Market Leaders</span>
          </motion.h2>
          <p className={`text-lg md:text-xl max-w-2xl mx-auto transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            We bridge the gap between vision and reality for some of the world's most ambitious companies.
          </p>
        </div>

        {/* Brand Scroller */}
        <div className="relative group mb-32">
          <div className={`absolute inset-y-0 left-0 w-40 z-10 transition-colors duration-700 pointer-events-none ${mode === "dark" ? "bg-gradient-to-r from-[#0B0F19]" : "bg-gradient-to-r from-white"}`} />
          <div className={`absolute inset-y-0 right-0 w-40 z-10 transition-colors duration-700 pointer-events-none ${mode === "dark" ? "bg-gradient-to-l from-[#0B0F19]" : "bg-gradient-to-l from-white"}`} />

          <div className="flex overflow-hidden py-12">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex gap-12 items-center whitespace-nowrap"
            >
              {[...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 flex items-center justify-center px-10 py-8 rounded-[2rem] border backdrop-blur-sm transition-all duration-500 ${mode === "dark"
                      ? "bg-white/5 border-white/10 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 hover:bg-white/10 hover:border-[#00E5FF]/30"
                      : "bg-gray-50 border-gray-100 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 hover:bg-white hover:shadow-2xl hover:border-purple-100"
                    }`}
                >
                  {brand.logo ? (
                    <img
                      src={getFullUrl(brand.logo)}
                      alt={brand.name}
                      className="h-10 w-auto object-contain filter transition-all duration-300"
                    />
                  ) : (
                    <span className={`text-xl font-bold ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                      {getInitials(brand.name)}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsWithIcons.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative overflow-hidden p-10 rounded-[2.5rem] border backdrop-blur-xl transition-all duration-500 ${mode === "dark"
                  ? "bg-white/5 border-white/10 shadow-2xl"
                  : "bg-white border-purple-50 shadow-[0_20px_50px_rgba(79,17,194,0.03)]"
                }`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-16 -mt-16 blur-3xl`} />

              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} p-0.5 mb-8 shadow-lg`}>
                <div className={`w-full h-full rounded-[0.9rem] flex items-center justify-center transition-colors duration-500 ${mode === "dark" ? "bg-[#0b0f19]" : "bg-white"}`}>
                  <stat.icon className={`w-6 h-6 text-[#4F11C2]`} />
                </div>
              </div>

              <div className="relative">
                <div className={`text-5xl font-black mb-3 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                  {stat.value}
                </div>
                <div className={`text-xs font-black uppercase tracking-[0.2em] transition-colors duration-500 ${mode === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
