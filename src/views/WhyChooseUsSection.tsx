"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchWhyChooseUsItems } from "@/store/slices/landingSlice";

const getIcon = (iconName: string) => {
  // @ts-ignore
  return LucideIcons[iconName] || LucideIcons.CheckCircle;
};

const FeatureCard = ({ item, index, mode }: { item: any; index: number; mode: "light" | "dark" }) => {
  const Icon = getIcon(item.icon);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className={`relative h-full overflow-hidden rounded-3xl p-8 transition-all duration-300 border hover:-translate-y-1 hover:shadow-2xl ${mode === "dark"
        ? "bg-black/40 border-white/5 hover:shadow-[#00E5FF]/10"
        : "bg-white border-gray-100 hover:shadow-[#4F11C2]/10"}`}>

        {/* Animated Background Pattern */}
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-[#4F11C2]/5 to-[#8B31FF]/5 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-100" />
        <div className="absolute top-0 right-0 p-6 opacity-5 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
          <Icon className="h-32 w-32" />
        </div>

        {/* Icon Container */}
        <div className={`relative mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-inner transition-colors duration-300 ${mode === "dark" ? "bg-white/5" : "bg-[#f8f9fc]"}`}>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className={`bg-gradient-to-br from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent`}
          >
            <Icon className={`h-8 w-8 transition-colors duration-300 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`} />
          </motion.div>
        </div>

        {/* Content */}
        <h3 className={`mb-3 text-xl font-bold transition-colors duration-300 ${mode === "dark" ? "text-white group-hover:text-[#00E5FF]" : "text-gray-900 group-hover:text-[#4F11C2]"}`}>
          {item.title}
        </h3>

        <p className={`leading-relaxed text-sm transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-500"}`}>
          {item.description}
        </p>

        {/* Bottom Decoration */}
        <div className="mt-6 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="h-1 w-full rounded-full bg-gradient-to-r from-[#4F11C2] to-[#8B31FF]" />
        </div>
      </div>
    </motion.div>
  );
};

const WhyChooseUsSection = () => {
  const dispatch = useAppDispatch();
  const { data: items, loading } = useAppSelector((state) => state.landing.whyChooseUsItems);
  const { mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    dispatch(fetchWhyChooseUsItems());
  }, [dispatch]);

  if (loading) return null;

  return (
    <section className={`relative py-32 overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-white"}`}>
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-[#8B31FF]/5 blur-3xl" />
        <div className="absolute bottom-[10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-[#4F11C2]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-center">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium mb-6 transition-all duration-300 ${mode === "dark"
              ? "border-[#4F11C2]/30 bg-[#4F11C2]/10 text-[#00E5FF]"
              : "border-purple-100 bg-purple-50 text-purple-700"}`}>
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-purple-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${mode === "dark" ? "bg-[#00E5FF]" : "bg-purple-500"}`}></span>
              </span>
              Why Choose Us
            </div>

            <h2 className={`text-4xl font-bold tracking-tight sm:text-5xl mb-6 leading-tight transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
              We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] to-[#8B31FF]">Trust</span> <br />
              Through <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] to-[#8B31FF]">Excellence</span>
            </h2>

            <p className={`text-lg mb-8 leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              Our commitment to quality and innovation sets us apart. We don't just deliver projects; we build lasting partnerships that drive your success in the digital landscape.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className={`border-l-4 transition-colors duration-300 pl-6 ${mode === "dark" ? "border-[#00E5FF]" : "border-[#4F11C2]"}`}>
                <div className={`text-3xl font-bold mb-1 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>98%</div>
                <div className="text-sm text-gray-500 font-medium">Client Retention</div>
              </div>
              <div className={`border-l-4 transition-colors duration-300 pl-6 ${mode === "dark" ? "border-[#8B31FF]" : "border-[#8B31FF]"}`}>
                <div className={`text-3xl font-bold mb-1 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>500+</div>
                <div className="text-sm text-gray-500 font-medium">Projects Delivered</div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-10 rounded-full px-8 py-4 text-base font-semibold transition-all shadow-lg hover:shadow-xl ${mode === "dark"
                ? "bg-white text-gray-900 hover:bg-gray-100"
                : "bg-gray-900 text-white hover:bg-gray-800"}`}
            >
              Start Your Journey
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {items.map((item, index) => (
              <FeatureCard key={item._id || index} item={item} index={index} mode={mode} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
