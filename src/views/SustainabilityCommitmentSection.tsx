"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Wind, Heart, Award } from "lucide-react";
import * as LucideIcons from "lucide-react";
import Loader from "@/components/Loader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSustainabilityCommitments } from "@/store/slices/landingSlice";

const initiatives = [
  {
    icon: Wind,
    title: "Green Cloud Infrastructure",
    description:
      "Migrating all digital services to carbon-neutral data centers",
  },
  {
    icon: Leaf,
    title: "Sustainable Supply Chain",
    description: "Working only with eco-certified partners and suppliers",
  },
  {
    icon: Heart,
    title: "Community Impact",
    description: "Supporting local environmental initiatives and education",
  },
  {
    icon: Award,
    title: "Industry Leadership",
    description: "Setting new standards for sustainability in tech",
  },
];

const SustainabilityCommitmentSection = () => {
  const dispatch = useAppDispatch();
  const { data: commitments, loading } = useAppSelector((state) => state.landing.sustainabilityCommitments);

  useEffect(() => {
    dispatch(fetchSustainabilityCommitments());
  }, [dispatch]);

  // Helper to get gradient from color
  const getGradientClass = (color: string): string => {
    if (color.includes('from-') || color.includes('to-')) {
      return color;
    }
    return "from-green-500 to-teal-500";
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white via-[#00E5FF]/5 to-white flex items-center justify-center min-h-[600px]">
        <div className="text-center">
          <Loader />
          <p className="text-gray-600">Loading sustainability commitments...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#00E5FF]/5 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-72 h-72 bg-[#00E5FF] rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-[#4F11C2] rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#4F11C2] to-[#00E5FF] rounded-full mb-6 shadow-lg"
          >
            <Leaf className="w-10 h-10 text-white" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-[#4F11C2] font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Sustainability Commitment
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Building a{" "}
            <span className="bg-gradient-to-r from-[#4F11C2] to-[#00E5FF] bg-clip-text text-transparent">
              Greener Future
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to environmental sustainability goes beyond compliance.
            We're actively working to create a positive impact on our planet for
            future generations.
          </p>
        </motion.div>

        {/* Main Commitments Grid */}
        {commitments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {commitments.map((commitment, index) => {
              // @ts-ignore
              const Icon = LucideIcons[commitment.icon] || LucideIcons.Leaf;
              const gradientClass = getGradientClass(commitment.color);

              return (
                <motion.div
                  key={commitment._id || commitment.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group relative"
                >
                  <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full relative overflow-hidden">
                    {/* Background gradient on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 transition-opacity`}
                    />

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6 relative z-10">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className={`p-4 rounded-2xl bg-gradient-to-br ${gradientClass} shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>

                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Target Year</p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-[#4F11C2] to-[#00E5FF] bg-clip-text text-transparent">
                          {commitment.target}
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 relative z-10">
                      {commitment.title}
                    </h3>
                    <p className="text-gray-600 mb-6 relative z-10">
                      {commitment.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-6 relative z-10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">
                          Progress
                        </span>
                        <span className="text-sm font-bold text-[#4F11C2]">
                          {commitment.progress}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${commitment.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full relative`}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                      {commitment.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="text-center p-4 rounded-xl bg-gradient-to-br from-[#4F11C2]/5 to-[#00E5FF]/5"
                        >
                          <p className="text-2xl font-bold bg-gradient-to-r from-[#4F11C2] to-[#00E5FF] bg-clip-text text-transparent">
                            {metric.value}
                          </p>
                          <p className="text-xs text-gray-600 font-medium mt-1">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* No Commitments Message */}
        {commitments.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 mb-16"
          >
            <p className="text-gray-600 text-lg">
              No sustainability commitments available at the moment.
            </p>
          </motion.div>
        )}

        {/* Secondary Initiatives */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#0B0F19] via-[#4F11C2] to-[#8B31FF] rounded-3xl p-12 text-white"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Additional Green Initiatives
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {initiatives.map((initiative, index) => {
              const Icon = initiative.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex p-5 rounded-2xl bg-white/10 backdrop-blur-sm mb-4 shadow-lg"
                  >
                    <Icon className="w-10 h-10 text-[#00E5FF]" />
                  </motion.div>
                  <h4 className="text-xl font-bold mb-2">{initiative.title}</h4>
                  <p className="text-[#8B31FF]/80 text-sm">{initiative.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-[#00E5FF]/80 mb-6">
              Join us in our mission to build a sustainable digital future
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white text-[#4F11C2] rounded-full font-bold text-lg shadow-2xl hover:shadow-[#00E5FF]/50 transition-all duration-300"
            >
              Learn More About Our Impact
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SustainabilityCommitmentSection;
