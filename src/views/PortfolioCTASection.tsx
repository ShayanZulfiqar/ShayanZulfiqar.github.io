"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Calendar, FileText, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

const PortfolioCTASection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const ctaCards = [
    {
      icon: MessageSquare,
      title: "Discuss Your Project",
      description: "Let's talk about your ideas and how we can bring them to life",
      action: "Start a Conversation",
      color: "from-[#4F11C2] to-[#8B31FF]",
    },
    {
      icon: Calendar,
      title: "Schedule a Meeting",
      description: "Book a free consultation with our expert team",
      action: "Book Now",
      color: "from-[#8B31FF] to-[#00E5FF]",
    },
    {
      icon: FileText,
      title: "Get a Proposal",
      description: "Receive a detailed project proposal tailored to your needs",
      action: "Request Proposal",
      color: "from-[#2B00A4] to-[#4F11C2]",
    },
  ];

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark"
      ? "bg-gray-900"
      : "bg-gradient-to-br from-[#0B0F19] via-[#4F11C2] to-[#8B31FF]"
      }`}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F11C2] rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B31FF] rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your{" "}
            <span className={`bg-gradient-to-r from-[#00E5FF] via-[#8B31FF] to-[#4F11C2] bg-clip-text text-transparent ${mode === "dark" ? "brightness-125" : ""
              }`}>
              Next Project?
            </span>
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-purple-100"
            }`}>
            Join hundreds of satisfied clients who have transformed their businesses with our solutions
          </p>
        </motion.div>

        {/* CTA Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {ctaCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className={`backdrop-blur-md border rounded-2xl p-8 h-full transition-all duration-300 ${mode === "dark"
                  ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#00E5FF]/50"
                  : "bg-white/10 border-white/20 hover:bg-white/15"
                  }`}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {card.title}
                  </h3>
                  <p className={`mb-6 leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-purple-100"
                    }`}>
                    {card.description}
                  </p>

                  {/* Action Button */}
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-white font-semibold group-hover:text-[#00E5FF] transition-colors"
                  >
                    {card.action}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Main CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 0 20px rgba(79, 17, 194, 0.4)",
                "0 0 40px rgba(79, 17, 194, 0.6)",
                "0 0 20px rgba(79, 17, 194, 0.4)",
              ],
            }}
            transition={{
              boxShadow: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-full font-bold text-xl shadow-2xl relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#8B31FF] to-[#4F11C2]"
              initial={{ x: "100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View All Case Studies</span>
            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "500+", label: "Projects Delivered" },
            { value: "300+", label: "Happy Clients" },
            { value: "15+", label: "Years Experience" },
            { value: "98%", label: "Client Satisfaction" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.05 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-[#8B31FF] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-[#00E5FF] text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortfolioCTASection;
