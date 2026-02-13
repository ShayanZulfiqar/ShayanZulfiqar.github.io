"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Calendar, MessageCircle } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAboutContacts, fetchClientStats } from "@/store/slices/landingSlice";

const VisionCTASection = () => {
  const dispatch = useAppDispatch();
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const { data: statsData } = useAppSelector((state) => state.landing.clientStats);
  const firstAbout = aboutData[0];

  React.useEffect(() => {
    dispatch(fetchAboutContacts());
    dispatch(fetchClientStats());
  }, [dispatch]);

  const stats = [
    { value: statsData[1]?.value || "500+", label: statsData[1]?.label || "Partners" },
    { value: statsData[3]?.value || "50+", label: statsData[3]?.label || "Countries" },
    { value: statsData[0]?.value || "1M+", label: statsData[0]?.label || "Users" },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-[#0B0F19] via-[#4F11C2] to-[#8B31FF]">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-[#00E5FF]/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#4F11C2]/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-12 p-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block text-[#00E5FF] font-semibold text-sm uppercase tracking-wider mb-4"
              >
                Join Our Journey
              </motion.span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {firstAbout?.mainTitle || "Let's Build the Future Together"}
              </h2>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {firstAbout?.subtitle || "Be part of our vision to transform the digital landscape. Whether you're a potential partner, client, or innovator, we'd love to hear from you and explore how we can create something extraordinary together."}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#4F11C2] bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center space-y-6"
            >
              {[
                {
                  icon: Mail,
                  title: firstAbout?.ctaButtons[0]?.label || "Get in Touch",
                  description: "Start a conversation with our team",
                  color: "from-[#4F11C2] to-[#8B31FF]",
                  action: "Contact Us",
                },
                {
                  icon: Calendar,
                  title: firstAbout?.ctaButtons[1]?.label || "Schedule a Demo",
                  description: "See our vision and solutions in action",
                  color: "from-[#8B31FF] to-[#00E5FF]",
                  action: "Book Now",
                },
                {
                  icon: MessageCircle,
                  title: "Join the Community",
                  description: "Connect with innovators worldwide",
                  color: "from-[#2B00A4] to-[#4F11C2]",
                  action: "Join Us",
                },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    className="group"
                  >
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 cursor-pointer">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                          >
                            <Icon className="w-7 h-7 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white mb-1">
                              {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ x: 5 }}
                          className={`flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}
                        >
                          <ArrowRight className="w-5 h-5 text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.75 }}
                className="bg-gradient-to-r from-[#4F11C2]/10 to-[#00E5FF]/10 backdrop-blur-sm border border-[#4F11C2]/20 rounded-2xl p-6"
              >
                <h4 className="text-white font-bold mb-2">Stay Updated</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Subscribe to our vision newsletter for the latest updates
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#00E5FF] transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-[#00E5FF] to-[#4F11C2] text-white rounded-xl font-semibold shadow-lg hover:shadow-[#00E5FF]/50 transition-shadow"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionCTASection;
