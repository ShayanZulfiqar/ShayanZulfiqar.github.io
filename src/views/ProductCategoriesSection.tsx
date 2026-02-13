"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Code,
  Smartphone,
  Palette,
  Layout,
  Component,
  FileCode,
  Layers,
  Globe,
} from "lucide-react";

const categories = [
  {
    icon: Code,
    name: "Web Templates",
    count: "25+ Products",
    description: "Ready-to-use website templates for various industries",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    products: ["Landing Pages", "Corporate Sites", "Portfolios"],
  },
  {
    icon: Smartphone,
    name: "Mobile UI Kits",
    count: "15+ Products",
    description: "Complete mobile app design systems and components",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    products: ["iOS Kits", "Android Kits", "Cross-platform"],
  },
  {
    icon: Layout,
    name: "Dashboards",
    count: "20+ Products",
    description: "Admin panels and analytics dashboards",
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50",
    products: ["Admin Panels", "Analytics", "CRM"],
  },
  {
    icon: Palette,
    name: "Design Systems",
    count: "12+ Products",
    description: "Comprehensive UI/UX design systems",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    products: ["Component Libraries", "Design Tokens", "Guidelines"],
  },
  {
    icon: Component,
    name: "UI Components",
    count: "30+ Products",
    description: "Reusable UI components and elements",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-50",
    products: ["React Components", "Vue Components", "Web Components"],
  },
  {
    icon: FileCode,
    name: "Code Templates",
    count: "18+ Products",
    description: "Boilerplates and starter kits",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    products: ["Next.js Starters", "React Boilerplates", "Node APIs"],
  },
  {
    icon: Layers,
    name: "Full Stack Apps",
    count: "10+ Products",
    description: "Complete applications with frontend and backend",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-50",
    products: ["E-commerce", "SaaS Apps", "Social Platforms"],
  },
  {
    icon: Globe,
    name: "WordPress Themes",
    count: "14+ Products",
    description: "Professional WordPress themes and plugins",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    products: ["Business Themes", "Blog Themes", "Plugins"],
  },
];

const ProductCategoriesSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, gray 1px, transparent 0)`,
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
            className="inline-block text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3"
          >
            Product Categories
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Explore By{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Category
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our diverse collection of digital products organized by category
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full relative overflow-hidden">
                  {/* Background gradient on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 transition-opacity`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative mb-4"
                  >
                    <div
                      className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.color} shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div
                      className={`absolute inset-0 ${category.bgColor} rounded-xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity`}
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-600 group-hover:to-pink-600 transition-all">
                    {category.name}
                  </h3>

                  <p className="text-purple-600 text-sm font-semibold mb-3">
                    {category.count}
                  </p>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Product Types */}
                  <div className="space-y-1">
                    {category.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-gray-500"
                      >
                        <div className="w-1 h-1 rounded-full bg-purple-400" />
                        {product}
                      </div>
                    ))}
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-6 right-6 text-purple-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </motion.div>

                  {/* Corner decoration */}
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${category.color} opacity-5 rounded-bl-full`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "150+", label: "Total Products" },
            { value: "50K+", label: "Downloads" },
            { value: "4.8/5", label: "Avg Rating" },
            { value: "24/7", label: "Support" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
            >
              <h4 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </h4>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCategoriesSection;
