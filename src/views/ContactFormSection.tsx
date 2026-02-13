"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, User, Mail, Phone, Building, MessageSquare, Loader2, CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchServices } from "@/store/slices/landingSlice";
import { post } from "@/services/ApiService";
import { CREATE_CONTACT_US } from "@/services/ApiRoutes";

const ContactFormSection = () => {
  const { mode } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { data: services, loading } = useAppSelector((state) => state.landing.services);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (submitError) setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await post(CREATE_CONTACT_US, formData);

      if (response.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      }
    } catch (error: any) {
      setSubmitError(
        error.response?.data?.message || "Failed to send message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-gradient-to-b from-white to-gray-50"
      }`}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        {mode === "dark" ? (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#4F11C2]/20 rounded-full filter blur-[120px] opacity-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B31FF]/20 rounded-full filter blur-[120px] opacity-20" />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30" />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Info */}
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
              className={`inline-block font-semibold text-sm uppercase tracking-wider mb-3 transition-colors duration-500 ${mode === "dark" ? "text-[#00E5FF]" : "text-[#4F11C2]"
                }`}
            >
              Get In Touch
            </motion.span>

            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
              }`}>
              Send Us a
              <br />
              <span className="bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] bg-clip-text text-transparent">
                Message
              </span>
            </h2>

            <p className={`text-xl mb-8 leading-relaxed transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
              }`}>
              Fill out the form and our team will get back to you within 24 hours.
              We're excited to learn about your project and how we can help.
            </p>

            {/* Why Contact Us */}
            <div className="space-y-6">
              {[
                {
                  title: "Quick Response",
                  description: "We typically respond within 2-4 hours during business hours",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Expert Consultation",
                  description: "Get personalized advice from our experienced team",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Free Quote",
                  description: "Receive a detailed project estimate at no cost",
                  color: "from-indigo-500 to-purple-500",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 items-start"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold mb-1 transition-colors duration-500 ${mode === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm transition-colors duration-500 ${mode === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className={`rounded-3xl shadow-2xl p-8 md:p-10 border transition-all duration-500 ${mode === "dark"
                ? "bg-white/5 border-white/10 backdrop-blur-md"
                : "bg-white border-gray-100"
              }`}>
              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 border rounded-xl flex items-center gap-3 ${mode === "dark"
                      ? "bg-green-500/10 border-green-500/20 text-green-400"
                      : "bg-green-50 border-green-200 text-green-800"
                    }`}
                >
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm font-medium">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 border rounded-xl ${mode === "dark"
                      ? "bg-red-500/10 border-red-500/20 text-red-400"
                      : "bg-red-50 border-red-200 text-red-800"
                    }`}
                >
                  <p className="text-sm font-medium">{submitError}</p>
                </motion.div>
              )}

              <div className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${mode === "dark" ? "text-purple-200" : "text-gray-700"
                    }`}>
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className={`w-5 h-5 transition-colors duration-500 ${mode === "dark" ? "text-white/40" : "text-gray-400"}`} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none disabled:cursor-not-allowed ${mode === "dark"
                          ? "bg-white/10 border-white/10 text-white placeholder-white/30 disabled:bg-white/5"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:bg-gray-100"
                        }`}
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${mode === "dark" ? "text-purple-200" : "text-gray-700"
                    }`}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`w-5 h-5 transition-colors duration-500 ${mode === "dark" ? "text-white/40" : "text-gray-400"}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none disabled:cursor-not-allowed ${mode === "dark"
                          ? "bg-white/10 border-white/10 text-white placeholder-white/30 disabled:bg-white/5"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:bg-gray-100"
                        }`}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone & Company in Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone Field */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${mode === "dark" ? "text-purple-200" : "text-gray-700"
                      }`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className={`w-5 h-5 transition-colors duration-500 ${mode === "dark" ? "text-white/40" : "text-gray-400"}`} />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={submitting}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none disabled:cursor-not-allowed ${mode === "dark"
                            ? "bg-white/10 border-white/10 text-white placeholder-white/30 disabled:bg-white/5"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:bg-gray-100"
                          }`}
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Company Field */}
                  <div>
                    <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${mode === "dark" ? "text-purple-200" : "text-gray-700"
                      }`}>
                      Company
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Building className={`w-5 h-5 transition-colors duration-500 ${mode === "dark" ? "text-white/40" : "text-gray-400"}`} />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        disabled={submitting}
                        className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none disabled:cursor-not-allowed ${mode === "dark"
                            ? "bg-white/10 border-white/10 text-white placeholder-white/30 disabled:bg-white/5"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:bg-gray-100"
                          }`}
                        placeholder="Your Company"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Select */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${mode === "dark" ? "text-purple-200" : "text-gray-700"
                    }`}>
                    Service Interested In *
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      disabled={submitting || loading}
                      className={`w-full px-4 py-4 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none appearance-none disabled:cursor-not-allowed ${mode === "dark"
                          ? "bg-white/10 border-white/10 text-white disabled:bg-white/5"
                          : "bg-white border-gray-300 text-gray-900 disabled:bg-gray-100"
                        }`}
                    >
                      <option value="" className={mode === "dark" ? "bg-[#0B0F19]" : ""}>
                        {loading ? "Loading services..." : "Select a service"}
                      </option>
                      {services.map((service, index) => (
                        <option
                          key={service._id || index}
                          value={service.title}
                          className={mode === "dark" ? "bg-[#0B0F19]" : ""}
                        >
                          {service.title}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <svg className={`w-5 h-5 transition-colors duration-500 ${mode === "dark" ? "text-white/40" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className={`block text-sm font-semibold mb-2 transition-colors duration-500 ${mode === "dark" ? "text-purple-200" : "text-gray-700"
                    }`}>
                    Message *
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-4 pointer-events-none">
                      <MessageSquare className={`w-5 h-5 transition-colors duration-500 ${mode === "dark" ? "text-white/40" : "text-gray-400"}`} />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={submitting}
                      rows={5}
                      className={`w-full pl-12 pr-4 py-4 rounded-xl border focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none disabled:cursor-not-allowed ${mode === "dark"
                          ? "bg-white/10 border-white/10 text-white placeholder-white/30 disabled:bg-white/5"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 disabled:bg-gray-100"
                        }`}
                      placeholder="Tell us about your project..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={!submitting ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                  className="w-full bg-gradient-to-r from-[#4F11C2] to-[#8B31FF] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>

                <p className={`text-center text-sm transition-colors duration-500 ${mode === "dark" ? "text-white/40" : "text-gray-500"
                  }`}>
                  We respect your privacy. Your information will never be shared.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
