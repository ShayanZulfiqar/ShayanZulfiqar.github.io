"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Briefcase } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAboutContacts, fetchGeneralSettings, fetchServices } from "@/store/slices/landingSlice";

const AboutCTASection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: aboutData } = useAppSelector((state) => state.landing.aboutContact);
  const { data: settings } = useAppSelector((state) => state.landing.generalSettings);
  const { data: services } = useAppSelector((state) => state.landing.services);
  const firstAbout = aboutData[0];

  React.useEffect(() => {
    dispatch(fetchAboutContacts());
    dispatch(fetchGeneralSettings());
    dispatch(fetchServices());
  }, [dispatch]);

  const contactInfo = [
    {
      icon: Mail,
      text: settings?.email || "info@hubmicro.com",
      href: `mailto:${settings?.email || "info@hubmicro.com"}`,
    },
    {
      icon: Phone,
      text: settings?.phoneNumber?.[0] || "+1 (234) 567-890",
      href: `tel:${settings?.phoneNumber?.[0] || "+1234567890"}`,
    },
    {
      icon: MapPin,
      text: settings?.location || "123 Business Ave, Tech City, TC 12345",
      href: "#",
    },
  ];

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark"
        ? "bg-gradient-to-br from-[#0B0F19] via-[#4F11C2] to-[#8B31FF]"
        : "bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50"
      }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {mode === "dark" ? (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F11C2] rounded-full filter blur-[120px] opacity-20"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B31FF] rounded-full filter blur-[120px] opacity-20"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        ) : (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4F11C2]/10 rounded-full filter blur-3xl opacity-30"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full filter blur-3xl opacity-30"
              animate={{
                scale: [1, 1.3, 1],
                x: [0, -50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl md:text-5xl font-bold mb-6 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
              {firstAbout?.mainTitle || "Let's Build Something Amazing Together"}
            </h2>
            <p className={`text-xl mb-8 leading-relaxed transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]/80" : "text-gray-600"}`}>
              {firstAbout?.subtitle || "Ready to start your next project? Our team is here to turn your vision into reality."}
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              {contactInfo.map((contact, index) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={index}
                    href={contact.href}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                    className={`flex items-center gap-4 group transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-700"}`}
                  >
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-500 ${mode === "dark"
                        ? "bg-white/10 border-white/20 group-hover:bg-white/20"
                        : "bg-white border-purple-100 shadow-sm group-hover:shadow-md group-hover:border-purple-200"
                      }`}>
                      <Icon className={`w-6 h-6 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-[#4F11C2]"}`} />
                    </div>
                    <span className="text-lg font-medium">{contact.text}</span>
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-full font-semibold text-lg shadow-2xl flex items-center justify-center gap-2"
              >
                {firstAbout?.ctaButtons[0]?.label || "Start a Project"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: mode === "dark" ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.05)",
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 backdrop-blur-sm border-2 rounded-full font-semibold text-lg transition-all flex items-center justify-center gap-2 ${mode === "dark"
                    ? "bg-white/10 border-white/30 text-white"
                    : "bg-gray-100 border-gray-200 text-gray-700"
                  }`}
              >
                <Briefcase className="w-5 h-5" />
                {firstAbout?.ctaButtons[1]?.label || "View Careers"}
              </motion.button>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className={`backdrop-blur-md border rounded-3xl p-8 shadow-2xl transition-all duration-500 ${mode === "dark"
                ? "bg-white/10 border-white/20"
                : "bg-white/90 border-purple-100"
              }`}>
              <h3 className={`text-2xl font-bold mb-6 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                Send Us a Message
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-500 ${mode === "dark"
                        ? "bg-white/10 border-white/20 text-white placeholder-[#8B31FF]/50 focus:border-white/40"
                        : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-[#4F11C2]/30 focus:bg-white"
                      }`}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-500 ${mode === "dark"
                        ? "bg-white/10 border-white/20 text-white placeholder-[#8B31FF]/50 focus:border-white/40"
                        : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-[#4F11C2]/30 focus:bg-white"
                      }`}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-500 ${mode === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-[#8B31FF]/50 focus:border-white/40"
                      : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-[#4F11C2]/30 focus:bg-white"
                    }`}
                />
                <select className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-500 ${mode === "dark"
                    ? "bg-white/10 border-white/20 text-white focus:border-white/40"
                    : "bg-gray-50 border-gray-100 text-gray-900 focus:border-[#4F11C2]/30 focus:bg-white"
                  }`}>
                  <option value="" className="text-gray-900">Select Service</option>
                  {services.map((service, index) => (
                    <option key={service._id || service.id || index} value={service._id || service.id} className="text-gray-900">
                      {service.title}
                    </option>
                  ))}
                </select>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  className={`w-full px-4 py-3 rounded-xl border focus:outline-none transition-all duration-500 resize-none ${mode === "dark"
                      ? "bg-white/10 border-white/20 text-white placeholder-[#8B31FF]/50 focus:border-white/40"
                      : "bg-gray-50 border-gray-100 text-gray-900 placeholder-gray-400 focus:border-[#4F11C2]/30 focus:bg-white"
                    }`}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-12 border-t transition-colors duration-700 ${mode === "dark" ? "border-white/10" : "border-gray-100"
          }`}>
          {[
            { value: "15+", label: "Years in Business" },
            { value: "50+", label: "Team Members" },
            { value: "300+", label: "Happy Clients" },
            { value: "98%", label: "Success Rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <h3 className={`text-4xl md:text-5xl font-bold mb-2 transition-all duration-500 group-hover:scale-110 ${mode === "dark" ? "text-white" : "text-[#4F11C2]"
                }`}>
                {stat.value}
              </h3>
              <p className={`font-semibold tracking-wider transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-gray-500 uppercase text-xs"
                }`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCTASection;
