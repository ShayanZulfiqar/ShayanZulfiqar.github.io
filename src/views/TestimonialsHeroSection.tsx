"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Star, Users, TrendingUp } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchClientStats } from "@/store/slices/landingSlice";

const TestimonialsHeroSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: statsData } = useAppSelector((state) => state.landing.clientStats);

  React.useEffect(() => {
    dispatch(fetchClientStats());
  }, [dispatch]);

  const stats = [
    { icon: Users, number: statsData[0]?.value || "300+", label: statsData[0]?.label || "Happy Clients" },
    { icon: TrendingUp, number: "98%", label: "Satisfaction Rate" },
    { icon: Quote, number: statsData[2]?.value || "500+", label: "Testimonials" },
  ];

  return (
    <section className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-20 transition-colors duration-700 ${mode === "dark"
      ? "bg-[#0B0F19]"
      : "bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50"
      }`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {mode === "dark" ? (
          <>
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-[#4F11C2] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B31FF] rounded-full mix-blend-screen filter blur-[120px] opacity-20"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-[#4F11C2]/10 rounded-full filter blur-[100px]"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-96 h-96 bg-[#00E5FF]/10 rounded-full filter blur-[100px]"
              animate={{
                x: [0, -100, 0],
                y: [0, 100, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      {/* Grid Pattern (Same as home page) */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.05]" : "opacity-[0.03]"}`}
        style={{
          backgroundImage: mode === "dark"
            ? `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
            : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Floating Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl mb-12 shadow-2xl backdrop-blur-md border transition-all duration-500 ${mode === "dark"
            ? "bg-white/5 border-white/10 text-[#00E5FF]"
            : "bg-white/80 border-purple-100 text-[#4F11C2]"}`}
        >
          <Quote className="w-12 h-12" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-5xl sm:text-7xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
            }`}
        >
          Voices of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] via-[#8B31FF] to-[#00E5FF]">
            Transformation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
        >
          Deeply engineering digital excellence, as told by the partners who have journeyed with us towards market leadership.
        </motion.p>

        {/* Rating Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`inline-flex flex-col items-center backdrop-blur-xl border rounded-[2rem] px-12 py-8 mb-16 shadow-2xl transition-all duration-500 ${mode === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-white/80 border-purple-100 shadow-purple-500/5"}`}
        >
          <div className="flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              >
                <Star className="w-10 h-10 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
              </motion.div>
            ))}
          </div>
          <p className={`text-3xl font-black mb-1 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>4.9 / 5.0</p>
          <p className={`font-semibold tracking-widest uppercase text-xs transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
            Engineered Excellence for {statsData[2]?.value || "500+"} Global Brands
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`group flex flex-col items-center backdrop-blur-md rounded-[2rem] p-8 border transition-all duration-500 ${mode === "dark"
                ? "bg-white/5 border-white/10 hover:border-[#00E5FF]/50"
                : "bg-white border-gray-100 hover:border-[#4F11C2]/30 shadow-sm"}`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${mode === "dark"
                ? "bg-[#0b0f19] text-[#00E5FF] group-hover:bg-[#00E5FF] group-hover:text-black"
                : "bg-purple-50 text-[#4F11C2] group-hover:bg-[#4F11C2] group-hover:text-white"}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className={`text-4xl font-black mb-2 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                {stat.number}
              </h3>
              <p className={`font-bold uppercase tracking-widest text-xs transition-colors duration-500 ${mode === "dark" ? "text-gray-400 group-hover:text-[#00E5FF]" : "text-gray-500 group-hover:text-[#4F11C2]"}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Gradient Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-colors duration-700 ${mode === "dark" ? "bg-white/10" : "bg-gray-200"}`} />
    </section>
  );
};

export default TestimonialsHeroSection;
