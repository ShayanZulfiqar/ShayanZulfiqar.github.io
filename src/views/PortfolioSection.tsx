"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles, Trophy, Layout, ChevronRight, ArrowRight } from "lucide-react";
import Loader from "@/components/Loader";
import { PinContainer } from "@/components/ui/3d-pin";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchServices, fetchProjects } from "@/store/slices/landingSlice";
import { imageUrl } from "@/services/BaseUrl";
import type { Service, Project } from "@/types/landing";

// Define the props interface
interface PortfolioSectionProps {
  className?: string;
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const { data: services } = useAppSelector((state) => state.landing.services);
  const { data: projects, loading: projectsLoading } = useAppSelector((state) => state.landing.projects);
  const { mode } = useAppSelector((state) => state.theme);
  const servicesLoading = useAppSelector((state) => state.landing.services.loading);

  const [selectedServiceId, setSelectedServiceId] = useState<string>("All");

  const loading = projectsLoading || servicesLoading;

  // Fetch services and projects
  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchProjects());
  }, [dispatch]);

  // Filter projects by selected service
  const filteredProjects = selectedServiceId === "All"
    ? projects
    : projects.filter((project) => {
      if (typeof project.serviceId === 'object' && project.serviceId) {
        return project.serviceId._id === selectedServiceId;
      }
      return project.serviceId === selectedServiceId;
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  } as const;

  // Get service title for display
  const getServiceTitle = (project: Project): string => {
    if (typeof project.serviceId === 'object' && project.serviceId) {
      return project.serviceId.title;
    }
    return "Uncategorized";
  };

  // Get gradient for project (fallback if not provided)
  const getProjectGradient = (index: number): string => {
    const gradients = [
      "from-violet-500 via-purple-500 to-indigo-500",
      "from-blue-500 via-cyan-500 to-teal-500",
      "from-green-500 via-emerald-500 to-teal-500",
      "from-orange-500 via-red-500 to-pink-500",
      "from-pink-500 via-rose-500 to-red-500",
      "from-indigo-500 via-blue-500 to-cyan-500",
    ];
    return gradients[index % gradients.length];
  };

  if (loading && projects.length === 0) {
    return (
      <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"} ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className={`w-12 h-12 border-4 border-t-transparent rounded-full animate-spin ${mode === "dark" ? "border-[#4F11C2]" : "border-[#4F11C2]"}`} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-700 ${mode === "dark" ? "bg-[#0B0F19]" : "bg-slate-50"} ${className}`}>
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 -left-64 w-[500px] h-[500px] rounded-full blur-[100px] transition-all duration-700 ${mode === "dark" ? "bg-[#4F11C2]/20 opacity-100" : "bg-[#4F11C2]/10 opacity-50"}`} />
        <div className={`absolute bottom-0 -right-64 w-[500px] h-[500px] rounded-full blur-[100px] transition-all duration-700 ${mode === "dark" ? "bg-[#2B00A4]/20 opacity-100" : "bg-[#2B00A4]/10 opacity-50"}`} />
        {/* Abstract Grid Pattern Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${mode === "dark" ? "opacity-[0.03]" : "opacity-[0.05]"}`}
          style={{
            backgroundImage: mode === "dark"
              ? `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`
              : `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
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
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 ${mode === "dark"
              ? "border-[#4F11C2]/30 bg-[#4F11C2]/10"
              : "border-purple-100 bg-purple-50"}`}
          >
            <Sparkles className={`w-4 h-4 ${mode === "dark" ? "text-[#8B31FF]" : "text-[#4F11C2]"}`} />
            <span className={`font-semibold text-xs uppercase tracking-wider transition-colors duration-300 ${mode === "dark" ? "text-[#8B31FF]" : "text-[#4F11C2]"}`}>
              Our Masterpieces
            </span>
          </motion.div>

          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F11C2] to-[#00E5FF]">Works</span>
          </h2>

          <p className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Explore our portfolio of award-winning projects, where innovation meets exceptional design.
          </p>
        </motion.div>

        {/* Service Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {/* All Tab */}
            <button
              onClick={() => setSelectedServiceId("All")}
              className={`relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border ${selectedServiceId === "All"
                ? (mode === "dark"
                  ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] border-white"
                  : "bg-gray-900 text-white shadow-lg border-gray-900")
                : (mode === "dark"
                  ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5"
                  : "bg-white text-gray-500 hover:bg-gray-50 border-gray-200")
                }`}
            >
              All Projects
            </button>

            {/* Service Tabs */}
            {services.map((service, index) => (
              <button
                key={service._id || service.id || index}
                onClick={() => setSelectedServiceId(service._id || service.id || "")}
                className={`relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border ${selectedServiceId === (service._id || service.id)
                  ? (mode === "dark"
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] border-white"
                    : "bg-gray-900 text-white shadow-lg border-gray-900")
                  : (mode === "dark"
                    ? "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border-white/5"
                    : "bg-white text-gray-500 hover:bg-gray-50 border-gray-200")
                  }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedServiceId}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-20 pt-10"
          >
            {filteredProjects.map((item, index) => (
              <motion.div
                key={item._id || item.id || index}
                variants={itemVariants}
                layout
                className="flex items-center justify-center"
              >
                <PinContainer
                  title={item.title}
                  href={item.liveUrl || "#"}
                >
                  <div className={`flex basis-[20rem] flex-col p-4 tracking-tight sm:basis-[24rem] w-[20rem] sm:w-[24rem] h-[28rem] rounded-2xl transition-colors duration-700 ${mode === "dark" ? "bg-black/40 text-slate-100/50" : "bg-white/90 text-gray-600/70 shadow-sm"}`}>
                    <h3 className={`max-w-xs !pb-2 !m-0 font-bold text-base transition-colors duration-300 ${mode === "dark" ? "text-slate-100" : "text-gray-900"}`}>
                      {item.title}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                      <span className={`transition-colors duration-300 ${mode === "dark" ? "text-slate-500" : "text-gray-500"}`}>
                        {item.description}
                      </span>
                    </div>

                    {/* Project Image or Gradient */}
                    <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden relative group">
                      {item.images && item.images.length > 0 ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`${imageUrl}/${item.images[0].startsWith('/') ? item.images[0].substring(1) : item.images[0]}`}
                            alt={item.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to gradient if image fails
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <motion.div
                            className={`absolute inset-0 w-full h-full bg-gradient-to-br ${getProjectGradient(index)} opacity-0`}
                          >
                            <div
                              className="absolute inset-0 opacity-20"
                              style={{
                                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`,
                              }}
                            />
                          </motion.div>
                        </>
                      ) : (
                        <motion.div
                          className={`w-full h-full bg-gradient-to-br ${getProjectGradient(index)} opacity-80`}
                        >
                          <div
                            className="absolute inset-0 opacity-20"
                            style={{
                              backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.05) 10px, rgba(255,255,255,.05) 20px)`,
                            }}
                          />
                        </motion.div>
                      )}

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Plus className="w-12 h-12 text-white" />
                      </div>

                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-semibold text-white">
                        {getServiceTitle(item)}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags?.slice(0, 4).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-3 py-1 rounded-full text-[10px] font-medium border transition-colors duration-300 ${mode === "dark"
                            ? "bg-gray-700/50 text-gray-300 border-gray-600"
                            : "bg-gray-100 text-gray-600 border-gray-200"}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </PinContainer>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results Message */}
        {filteredProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${mode === "dark" ? "bg-[#2B00A4]/30" : "bg-purple-100"}`}>
              <Layout className={`w-8 h-8 transition-colors duration-300 ${mode === "dark" ? "text-[#8B31FF]" : "text-[#4F11C2]"}`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 transition-colors duration-300 ${mode === "dark" ? "text-white" : "text-gray-900"}`}>No projects found</h3>
            <p className={`transition-colors duration-300 ${mode === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              There are no projects in this category yet.
            </p>
          </motion.div>
        )}

        {/* Footer CTA */}
        {filteredProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-20 text-center"
          >
            <button className={`group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border rounded-full font-medium transition-all ${mode === "dark"
              ? "border-white/10 text-white hover:bg-white hover:text-black hover:border-white"
              : "border-gray-900/10 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900"}`}>
              <span className="relative z-10">View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PortfolioSection;