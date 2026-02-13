"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchInnovationRoadmap } from "@/store/slices/landingSlice";

const InnovationRoadmapSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: roadmapItems, loading } = useAppSelector((state) => state.landing.innovationRoadmap);

  useEffect(() => {
    dispatch(fetchInnovationRoadmap());
  }, [dispatch]);

  if (loading) {
    return (
      <section className={`py-24 flex items-center justify-center min-h-[600px] transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-white"
        }`}>
        <div className="text-center">
          <Loader />
          <p className={mode === "dark" ? "text-gray-400" : "text-gray-600"}>Loading innovation roadmap...</p>
        </div>
      </section>
    );
  }

  if (roadmapItems.length === 0) return null;

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-white"
      }`}>
      {/* Background Effects */}
      <div className="absolute inset-0">
        {mode === "dark" ? (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF]/20 rounded-full filter blur-[120px] opacity-20" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4F11C2]/20 rounded-full filter blur-[120px] opacity-20" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#4F11C2]/10 rounded-full filter blur-3xl opacity-30" />
          </>
        )}
      </div>

      {/* Grid Pattern */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.05]" : "opacity-[0.03]"}`}>
        <div
          className="w-full h-full"
          style={{
            backgroundImage: mode === "dark"
              ? `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`
              : `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
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
            Innovation Roadmap
          </motion.span>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
            }`}>
            Technology{" "}
            <span className="bg-gradient-to-r from-[#00E5FF] to-[#4F11C2] bg-clip-text text-transparent">
              Evolution Path
            </span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
            Our strategic roadmap for pioneering breakthrough technologies
          </p>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connection Line */}
          <div className={`absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 transition-colors duration-700 ${mode === "dark" ? "bg-gradient-to-r from-white/10 via-[#00E5FF]/40 to-white/10" : "bg-gradient-to-r from-[#4F11C2] via-[#00E5FF] to-[#4F11C2]"
            }`} />

          <div className={`grid gap-8`} style={{ gridTemplateColumns: `repeat(${Math.min(roadmapItems.length, 6)}, minmax(0, 1fr))` }}>
            {roadmapItems.map((item, index) => {
              // @ts-ignore
              const Icon = LucideIcons[item.icon] || LucideIcons.Lightbulb;
              return (
                <motion.div
                  key={item._id || item.id || index}
                  initial={{ opacity: 0, y: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className={`relative ${index % 2 === 0 ? "" : "pt-96"}`}
                >
                  <div className="relative">
                    {/* Phase Badge */}
                    <div className="text-center mb-4">
                      <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#00E5FF] to-[#4F11C2] text-white rounded-full text-sm font-bold shadow-lg">
                        {item.phase}
                      </span>
                    </div>

                    {/* Card */}
                    <motion.div
                      whileHover={{ scale: 1.05, y: -10 }}
                      className={`rounded-2xl p-6 border transition-all duration-500 relative overflow-hidden group ${mode === "dark"
                          ? "bg-[#1A1F2E] border-white/10 hover:border-[#00E5FF]/50"
                          : "bg-white border-gray-100 hover:border-[#4F11C2]/50 shadow-sm"
                        }`}
                    >
                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                      />

                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.color} mb-4 shadow-lg relative z-10`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      {/* Year */}
                      <p className={`text-sm font-semibold mb-2 relative z-10 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"
                        }`}>
                        {item.year}
                      </p>

                      {/* Title */}
                      <h3 className={`text-xl font-bold mb-3 relative z-10 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        {item.title}
                      </h3>

                      {/* Initiatives */}
                      <ul className="space-y-2 mb-4 relative z-10">
                        {item.initiatives.map((initiative, idx) => (
                          <li
                            key={idx}
                            className={`text-sm flex items-start gap-2 transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
                              }`}
                          >
                            <span className={`mt-1 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}`}>•</span>
                            <span>{initiative}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Status */}
                      <div className={`text-xs font-semibold relative z-10 transition-colors duration-500 ${mode === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}>
                        Status: <span className={mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}>{item.status}</span>
                      </div>

                      {/* Bottom line */}
                      <div
                        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`}
                      />
                    </motion.div>

                    {/* Connector to timeline */}
                    <div
                      className={`absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b ${item.color} ${index % 2 === 0
                        ? "top-full h-24"
                        : "bottom-full h-24"
                        }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet View */}
        <div className="lg:hidden space-y-8">
          {roadmapItems.map((item, index) => {
            // @ts-ignore
            const Icon = LucideIcons[item.icon] || LucideIcons.Lightbulb;
            return (
              <motion.div
                key={item._id || item.id || index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="relative"
              >
                <div className="flex gap-6">
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg flex-shrink-0`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    {index < roadmapItems.length - 1 && (
                      <div className={`w-1 flex-1 bg-gradient-to-b ${item.color} mt-4`} />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#00E5FF] to-[#4F11C2] text-white rounded-full text-xs font-bold mb-3">
                      {item.phase}
                    </div>
                    <div className={`rounded-2xl p-6 border transition-all duration-500 ${mode === "dark"
                        ? "bg-[#1A1F2E] border-white/10"
                        : "bg-white border-gray-100 shadow-sm"
                      }`}>
                      <p className={`text-sm font-semibold mb-2 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"
                        }`}>
                        {item.year}
                      </p>
                      <h3 className={`text-2xl font-bold mb-3 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                        {item.title}
                      </h3>
                      <ul className="space-y-2 mb-4">
                        {item.initiatives.map((initiative, idx) => (
                          <li
                            key={idx}
                            className={`text-sm flex items-start gap-2 transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
                              }`}
                          >
                            <span className={mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}>•</span>
                            <span>{initiative}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={`text-xs font-semibold transition-colors duration-500 ${mode === "dark" ? "text-gray-500" : "text-gray-400"
                        }`}>
                        Status: <span className={mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"}>{item.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InnovationRoadmapSection;
