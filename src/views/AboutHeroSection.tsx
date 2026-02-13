"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Award, TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchClientStats, fetchAboutContacts } from "@/store/slices/landingSlice";

const getIcon = (iconName: string | undefined, index: number) => {
  const icons = [Users, Award, TrendingUp, Heart];
  if (iconName) {
    const iconMap: { [key: string]: any } = {
      Users: Users,
      Award: Award,
      TrendingUp: TrendingUp,
      Heart: Heart,
    };
    return iconMap[iconName] || icons[index % icons.length];
  }
  return icons[index % icons.length];
};

const getColor = (colorName: string | undefined, index: number) => {
  const colors = [
    "from-[#4F11C2] to-[#8B31FF]",
    "from-[#8B31FF] to-[#00E5FF]",
    "from-[#2B00A4] to-[#4F11C2]",
    "from-[#00E5FF] to-[#2B00A4]"
  ];
  return colorName || colors[index % colors.length];
};

const AboutHeroSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: stats } = useAppSelector((state) => state.landing.clientStats);
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const firstAbout = aboutData[0];

  React.useEffect(() => {
    dispatch(fetchClientStats());
    dispatch(fetchAboutContacts());
  }, [dispatch]);

  return (
    <section className={`relative min-h-[80vh] flex items-center justify-center overflow-hidden transition-colors duration-700 pt-20 ${mode === "dark"
        ? "bg-gradient-to-br from-[#0B0F19] via-[#4F11C2] to-[#8B31FF]"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`inline-flex items-center gap-2 backdrop-blur-md border rounded-full px-6 py-2 mb-8 transition-all duration-500 ${mode === "dark"
                  ? "bg-white/10 border-white/20"
                  : "bg-white/80 border-purple-100 shadow-sm"
                }`}
            >
              <Heart className={`w-4 h-4 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`} />
              <span className={`text-sm font-medium transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                About HubMicro Pro
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className={`text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
                }`}
            >
              {firstAbout?.mainTitle || "Innovating the Digital Future"}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`text-lg sm:text-xl mb-8 leading-relaxed transition-colors duration-500 ${mode === "dark" ? "text-[#8B31FF]/80" : "text-gray-600"
                }`}
            >
              {firstAbout?.subtitle || "We are a team of passionate innovators, designers, and developers committed to transforming ideas into exceptional digital experiences."}
            </motion.p>

            {/* CTA Button */}
            <motion.a
              href={firstAbout?.ctaButtons[0]?.href || "/careers"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#8B31FF] to-[#4F11C2] text-white rounded-full font-semibold text-lg shadow-2xl hover:shadow-[#4F11C2]/50 transition-all duration-300"
            >
              {firstAbout?.ctaButtons[0]?.label || "Join Our Team"}
            </motion.a>
          </motion.div>

          {/* Right Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => {
              const Icon = getIcon((stat as any).icon, index);
              const colorClass = getColor((stat as any).color, index);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className={`backdrop-blur-md border rounded-2xl p-8 text-center relative overflow-hidden group transition-all duration-500 ${mode === "dark"
                      ? "bg-white/10 border-white/20"
                      : "bg-white border-gray-100 shadow-sm"
                    }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${colorClass} opacity-0 group-hover:opacity-20 transition-opacity`}
                  />

                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${colorClass} mb-4 shadow-lg relative z-10`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className={`text-4xl font-bold mb-2 relative z-10 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                    {stat.value}
                  </h3>

                  <p className={`text-sm relative z-10 transition-colors duration-500 ${mode === "dark" ? "text-purple-200" : "text-gray-500"}`}>
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave/Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px transition-colors duration-700 ${mode === "dark" ? "bg-white/10" : "bg-gray-200"}`} />
    </section>
  );
};

export default AboutHeroSection;
