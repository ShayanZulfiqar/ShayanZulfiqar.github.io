"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCoreValues } from "@/store/slices/landingSlice";

const ValuesSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: coreValues, loading } = useAppSelector((state) => state.landing.coreValues);

  useEffect(() => {
    dispatch(fetchCoreValues());
  }, [dispatch]);

  // Helper to convert hex color to Tailwind gradient class
  const getGradientFromColor = (color: string): string => {
    if (color.includes('from-') || color.includes('to-')) {
      return color;
    }
    return "from-[#4F11C2] to-[#8B31FF]";
  };

  const getBgColorClass = (bgColor: string): string => {
    if (bgColor.startsWith('bg-')) {
      return bgColor;
    }
    return "bg-[#4F11C2]/5";
  };

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-gradient-to-b from-gray-50 to-white"
      }`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        {mode === "dark" ? (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4F11C2]/20 rounded-full filter blur-[120px] opacity-20" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00E5FF]/20 rounded-full filter blur-[120px] opacity-20" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4F11C2]/10 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full filter blur-3xl opacity-30" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="relative h-full"
          >
            <div className={`rounded-3xl p-10 shadow-xl border relative overflow-hidden group h-full transition-all duration-500 ${mode === "dark"
                ? "bg-[#1A1F2E] border-white/10"
                : "bg-white border-gray-100"
              }`}>
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4F11C2]/5 to-[#8B31FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative mb-6"
              >
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-[#4F11C2] to-[#8B31FF] shadow-lg">
                  <Target className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className={`text-3xl font-bold mb-4 relative transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                Our Mission
              </h3>
              <p className={`text-lg leading-relaxed relative transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-700"}`}>
                To empower businesses worldwide with innovative digital solutions
                that drive growth, enhance efficiency, and create lasting value. We
                strive to be the trusted partner in every client&apos;s digital
                transformation journey.
              </p>

              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF]" />
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
            className="relative h-full"
          >
            <div className={`rounded-3xl p-10 shadow-xl border relative overflow-hidden group h-full transition-all duration-500 ${mode === "dark"
                ? "bg-[#1A1F2E] border-white/10"
                : "bg-white border-gray-100"
              }`}>
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#8B31FF]/5 to-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative mb-6"
              >
                <div className="inline-flex p-5 rounded-2xl bg-gradient-to-br from-[#8B31FF] to-[#00E5FF] shadow-lg">
                  <Eye className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              {/* Content */}
              <h3 className={`text-3xl font-bold mb-4 relative transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                Our Vision
              </h3>
              <p className={`text-lg leading-relaxed relative transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-700"}`}>
                To be the global leader in digital innovation, recognized for
                transforming industries through technology excellence. We envision a
                future where every business, regardless of size, has access to
                world-class digital solutions.
              </p>

              {/* Decorative element */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8B31FF] to-[#00E5FF]" />
            </div>
          </motion.div>
        </div>

        {/* Core Values Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`inline-block font-semibold text-sm uppercase tracking-wider mb-3 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"
              }`}
          >
            Core Values
          </motion.span>
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
            What We{" "}
            <span className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent">
              Stand For
            </span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            The principles that guide our decisions and shape our culture
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader />
              <p className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>Loading core values...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Core Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, index) => {
                const gradientClass = getGradientFromColor(value.color);
                const bgColorClass = getBgColorClass(value.bgColor);

                // @ts-ignore
                const Icon = LucideIcons[value.icon] || LucideIcons.Heart;

                return (
                  <motion.div
                    key={value._id || index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group"
                  >
                    <div className={`rounded-2xl p-8 shadow-lg hover:shadow-2xl border transition-all duration-500 h-full relative overflow-hidden ${mode === "dark"
                        ? "bg-[#1A1F2E] border-white/10"
                        : "bg-white border-gray-100"
                      }`}>
                      {/* Background gradient on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 transition-opacity`}
                      />

                      {/* Icon with custom color */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="relative mb-6"
                      >
                        <div
                          className={`inline-flex p-4 rounded-xl shadow-lg`}
                          style={{
                            background: value.color && value.color.startsWith('#')
                              ? `linear-gradient(135deg, ${value.color}, ${value.color}dd)`
                              : undefined,
                          }}
                        >
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <div
                          className={`absolute inset-0 ${bgColorClass} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity`}
                        />
                      </motion.div>

                      {/* Content */}
                      <h3 className={`text-2xl font-bold mb-3 relative group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-[#4F11C2] group-hover:to-[#8B31FF] transition-all ${mode === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        {value.title}
                      </h3>
                      <p className={`leading-relaxed relative transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>
                        {value.description}
                      </p>

                      {/* Corner decoration */}
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradientClass} opacity-5 rounded-bl-full`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* No Values Message */}
            {coreValues.length === 0 && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <p className={mode === "dark" ? "text-gray-500" : "text-gray-600 text-lg"}>
                  No core values available at the moment.
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ValuesSection;
