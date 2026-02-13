"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Phone, Mail, Globe, Navigation } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchGeneralSettings } from "@/store/slices/landingSlice";

const ContactLocationSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: settings, loading } = useAppSelector((state) => state.landing.generalSettings);

  React.useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  const extractMapSrc = (input: string) => {
    if (!input) return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108911.27481119567!2d74.22558!3d31.44855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919018a8ea548a1%3A0xf63503295988e00!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1701234567890!5m2!1sen!2s";

    // Check if input is a full iframe tag
    if (input.includes("<iframe")) {
      const match = input.match(/src=["'](.*?)["']/);
      if (match && match[1]) {
        return match[1];
      }
    }

    return input;
  };

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-white"
      }`}>
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {mode === "dark" ? (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4F11C2]/10 rounded-full filter blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full filter blur-[120px]" />
          </>
        ) : (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#4F11C2]/5 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00E5FF]/5 rounded-full filter blur-3xl" />
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
          backgroundSize: '50px 50px'
        }}
      />

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
            Our Locations
          </motion.span>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
            }`}>
            Visit Our{" "}
            <span className="bg-gradient-to-r from-[#4F11C2] to-[#00E5FF] bg-clip-text text-transparent">
              Office
            </span>
          </h2>

          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
            Find us at our main location or reach out via our global support network.
          </p>
        </motion.div>

        {/* Google Map Embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className={`rounded-3xl p-2 shadow-2xl border transition-all duration-500 ${mode === "dark"
              ? "bg-white/5 border-white/10"
              : "bg-white border-gray-100"
            }`}>
            <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
              {/* Google Maps iframe */}
              <iframe
                src={extractMapSrc(settings?.ourLocation || "")}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`transition-all duration-500 ${mode === "dark" ? "grayscale opacity-80 hover:grayscale-0 hover:opacity-100" : "hover:grayscale-0"}`}
              />

              {/* Overlay Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className={`absolute top-6 left-6 backdrop-blur-sm rounded-2xl p-4 shadow-xl border transition-all duration-500 ${mode === "dark"
                    ? "bg-[#0B0F19]/90 border-white/10"
                    : "bg-white/95 border-gray-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4F11C2] to-[#00E5FF] rounded-xl flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
                      Our Location
                    </p>
                    <p className={`text-xs transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      {settings?.location || "Visit us today!"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Global Presence Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className={`mt-16 backdrop-blur-sm rounded-3xl p-10 border transition-all duration-500 ${mode === "dark"
              ? "bg-gradient-to-r from-[#4F11C2]/20 to-[#00E5FF]/20 border-purple-500/20 shadow-none"
              : "bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100 shadow-sm shadow-purple-500/5"
            }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Globe, value: "50+", label: "Countries" },
              { icon: MapPin, value: "1", label: "Main Office" },
              { icon: Clock, value: "24/7", label: "Support Available" },
              { icon: Phone, value: "100%", label: "Response Rate" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"
                    }`} />
                  <p className={`text-3xl md:text-4xl font-bold mb-1 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactLocationSection;
