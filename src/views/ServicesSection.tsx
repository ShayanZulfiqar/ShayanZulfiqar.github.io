"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchServices } from "@/store/slices/landingSlice";

// --- Advanced Service Card ---
// --- Advanced Service Card ---
const ServiceCard = ({ service, index, mode }: { service: any; index: number; mode: "light" | "dark" }) => {
  // @ts-ignore
  const Icon = LucideIcons[service.icon] || LucideIcons.Zap;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className="group relative h-full"
    >
      <div className={`relative h-full flex flex-col justify-between overflow-hidden rounded-[2rem] border backdrop-blur-md p-8 transition-all duration-500 ${mode === "dark"
        ? "bg-[#0B0F19]/50 border-white/10 hover:border-[#00E5FF]/30 hover:shadow-[0_0_30px_rgba(79,17,194,0.15)]"
        : "bg-white/70 border-gray-200 hover:border-[#4F11C2]/30 hover:shadow-[0_10px_30px_rgba(79,17,194,0.05)]"}`}>

        {/* Hover Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br from-[#4F11C2]/0 via-[#4F11C2]/5 to-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

        {/* Animated Background Pattern */}
        <div className={`absolute -right-20 -top-20 h-60 w-60 rounded-full blur-[80px] transition-all duration-500 group-hover:scale-125 ${mode === "dark"
          ? "bg-[#4F11C2]/10 group-hover:bg-[#4F11C2]/20"
          : "bg-[#4F11C2]/5 group-hover:bg-[#4F11C2]/10"}`} />

        {/* Large Decorative Icon Faded Background */}
        <div className={`absolute bottom-[-10%] right-[-10%] opacity-[0.03] transition-transform duration-700 group-hover:rotate-12 group-hover:scale-125 pointer-events-none`}>
          <Icon className={`h-64 w-64 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`} />
        </div>

        <div className="relative z-10">
          {/* Icon Container */}
          <div className="relative mb-8 inline-flex items-center justify-center">
            <div className={`absolute inset-0 blur-xl rounded-full transition-colors duration-500 ${mode === "dark" ? "bg-[#4F11C2]/20 group-hover:bg-[#00E5FF]/20" : "bg-[#4F11C2]/10 group-hover:bg-[#4F11C2]/20"}`} />
            <div className={`relative h-16 w-16 rounded-2xl border flex items-center justify-center transition-colors duration-500 shadow-lg ${mode === "dark"
              ? "bg-[#131620] border-white/10 group-hover:border-[#00E5FF]/50"
              : "bg-white border-gray-100 group-hover:border-[#4F11C2]/30"}`}>
              <Icon className={`h-8 w-8 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF] group-hover:text-white" : "text-[#4F11C2] group-hover:text-[#8B31FF]"}`} />
            </div>
          </div>

          {/* Text Content */}
          <h3 className={`mb-4 text-2xl font-bold transition-colors duration-300 ${mode === "dark" ? "text-white group-hover:text-[#00E5FF]" : "text-gray-900 group-hover:text-[#4F11C2]"}`}>
            {service.title}
          </h3>
          <p className={`mb-8 leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-700"}`}>
            {service.description}
          </p>
        </div>

        {/* Action Area */}
        <div className={`mt-auto pt-6 border-t flex items-center justify-between relative z-10 ${mode === "dark" ? "border-white/5" : "border-gray-100"}`}>
          <span className={`text-sm font-semibold tracking-wide uppercase ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
            Learn More
          </span>
          <motion.div
            whileHover={{ x: 5 }}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${mode === "dark"
              ? "bg-white/5 border-white/10 text-white group-hover:bg-[#00E5FF] group-hover:border-[#00E5FF] group-hover:text-black"
              : "bg-gray-50 border-gray-200 text-gray-700 group-hover:bg-[#4F11C2] group-hover:border-[#4F11C2] group-hover:text-white"}`}
          >
            <LucideIcons.ArrowRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};


const ServicesSection = () => {
  const dispatch = useAppDispatch();
  const { data: services, loading } = useAppSelector((state) => state.landing.services);
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) {
    return (
      <section className={`min-h-[50vh] flex items-center justify-center transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#4F11C2] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm animate-pulse">Loading Services...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`relative overflow-hidden py-32 transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.05]" : "opacity-[0.03]"}`}
          style={{
            backgroundImage: mode === "dark"
              ? `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
              : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />
        {/* Ambient Glows */}
        <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#4F11C2]/10" : "bg-[#4F11C2]/5"}`} />
        <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[100px] transition-opacity duration-700 ${mode === "dark" ? "bg-[#00E5FF]/5" : "bg-[#00E5FF]/3"}`} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all duration-300 ${mode === "dark"
              ? "border-[#4F11C2]/30 bg-[#4F11C2]/10 backdrop-blur-md"
              : "border-[#4F11C2]/20 bg-white/50"}`}
          >
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-[#4F11C2]"}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-[#4F11C2]"}`}></span>
            </span>
            <span className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-5xl font-bold tracking-tight mb-6 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}
          >
            Comprehensive <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] via-[#8B31FF] to-[#00E5FF]">
              Digital Solutions
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`text-lg leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            We combine strategy, design, and technology to build products that drive real business results. Explore how we can help you grow.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service._id || index} service={service} index={index} mode={mode} />
          ))}
        </div>

        {services.length === 0 && !loading && (
          <div className="text-center text-gray-500 py-12">
            No services found.
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
