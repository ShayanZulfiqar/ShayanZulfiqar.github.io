"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Target, Award, Sparkles, TrendingUp, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAboutContacts, fetchClientStats } from "@/store/slices/landingSlice";

const AboutPreviewSection = () => {
  const dispatch = useAppDispatch();
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const { data: statsData } = useAppSelector((state) => state.landing.clientStats);
  const { mode } = useAppSelector((state) => state.theme);
  const firstAbout = aboutData[0];

  React.useEffect(() => {
    dispatch(fetchAboutContacts());
    dispatch(fetchClientStats());
  }, [dispatch]);

  const stats = [
    { icon: Users, value: statsData[0]?.value || "300+", label: statsData[0]?.label || "Happy Clients" },
    { icon: Target, value: statsData[1]?.value || "500+", label: statsData[1]?.label || "Projects Done" },
    { icon: Award, value: statsData[2]?.value || "25+", label: statsData[2]?.label || "Awards Won" },
  ];

  return (
    <section className={`py-32 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-white"}`}>
      {/* Abstract Background Shapes matching other sections */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden opacity-30 pointer-events-none">
        <div className={`absolute top-[20%] right-[-5%] h-[500px] w-[500px] rounded-full blur-3xl transition-colors duration-700 ${mode === "dark" ? "bg-[#8B31FF]/10" : "bg-[#8B31FF]/5"}`} />
        <div className={`absolute bottom-[10%] left-[-5%] h-[600px] w-[600px] rounded-full blur-3xl transition-colors duration-700 ${mode === "dark" ? "bg-[#4F11C2]/10" : "bg-[#4F11C2]/5"}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Unified Badge Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium mb-6 transition-all duration-300 ${mode === "dark"
                ? "border-[#4F11C2]/30 bg-[#4F11C2]/10 text-[#00E5FF]"
                : "border-purple-100 bg-purple-50 text-purple-700"}`}
            >
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-purple-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-purple-500"}`}></span>
              </span>
              Who We Are
            </motion.div>

            <h2 className={`text-4xl md:text-5xl font-bold mb-6 leading-tight transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
              Crafting Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] to-[#8B31FF]">
                Excellence & Innovation
              </span>
            </h2>

            <p className={`text-lg mb-10 leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {firstAbout?.subtitle || "We are a team of passionate innovators, designers, and developers committed to transforming ideas into exceptional digital experiences. Our mission is to empower businesses with technology that drives growth."}
            </p>

            {/* Stats Row */}
            <div className={`grid grid-cols-3 gap-8 mb-10 border-t pt-8 transition-colors duration-300 ${mode === "dark" ? "border-white/5" : "border-gray-100"}`}>
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className={`text-3xl font-bold mb-1 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium transition-colors duration-300 ${mode === "dark" ? "text-gray-500" : "text-gray-500"}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/about-us">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all shadow-lg hover:shadow-xl ${mode === "dark"
                  ? "bg-white text-gray-900 hover:bg-gray-100"
                  : "bg-gray-900 text-white hover:bg-gray-800"}`}
              >
                More About Us
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right Visual - Modern Composition */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className={`relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl border transition-all duration-700 ${mode === "dark"
              ? "bg-[#131620] border-white/5"
              : "bg-gray-100 border-gray-100"}`}>

              {/* Abstract Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4F11C2] via-[#6d28d9] to-[#8B31FF]" />
              <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

              {/* Center Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-48 w-48">
                  <div className="absolute inset-0 animate-spin-slow rounded-full border-t-2 border-r-2 border-white/20" />
                  <div className="absolute inset-4 animate-spin-reverse-slow rounded-full border-b-2 border-l-2 border-white/40" />
                  <div className="absolute inset-0 flex items-center justify-center text-white flex-col">
                    <span className="text-5xl font-bold">10+</span>
                    <span className="text-sm font-medium tracking-widest uppercase mt-2 opacity-80">Years Exp.</span>
                  </div>
                </div>
              </div>

              {/* Floating Element 1 - Top Left */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute top-8 left-8 bg-white/10 backdrop-blur-md border rounded-2xl p-4 transition-colors duration-300 ${mode === "dark" ? "border-white/20" : "border-[#4F11C2]/10"}`}
              >
                <Sparkles className={`w-8 h-8 ${mode === "dark" ? "text-yellow-300" : "text-[#4F11C2]"}`} />
              </motion.div>

              {/* Floating Element 2 - Bottom Right */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute bottom-10 right-10 p-4 rounded-2xl shadow-xl max-w-[160px] transition-colors duration-700 ${mode === "dark" ? "bg-slate-800 text-white" : "bg-white text-gray-900"}`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300 ${mode === "dark" ? "bg-green-500/20" : "bg-green-100"}`}>
                    <CheckCircle className={`w-5 h-5 ${mode === "dark" ? "text-green-400" : "text-green-600"}`} />
                  </div>
                  <span className={`font-bold text-sm transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>Success</span>
                </div>
                <div className={`h-2 w-full rounded-full overflow-hidden transition-colors duration-300 ${mode === "dark" ? "bg-slate-700" : "bg-gray-100"}`}>
                  <div className="h-full w-[90%] bg-green-500 rounded-full" />
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements behind */}
            <div className="absolute -z-10 -bottom-10 -left-10 w-full h-full border-2 border-[#4F11C2]/5 rounded-[2rem]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;
