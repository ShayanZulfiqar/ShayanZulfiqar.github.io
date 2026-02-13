"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Category } from "@/types/shop";
import { ArrowRight, Package } from "lucide-react";

interface CategoryPageContentProps {
  category: Category;
}

const CategoryPageContent = ({ category }: CategoryPageContentProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {category.name}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {category.description}
          </p>
        </motion.div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {category.subCategories.map((subCategory, index) => (
            <motion.div
              key={subCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/shop/${category.slug}/${subCategory.slug}`}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={subCategory.image}
                      alt={subCategory.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Product Count Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                      <Package size={16} className="text-purple-600" />
                      <span className="font-semibold text-gray-800">
                        {subCategory.productCount}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
                      {subCategory.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {subCategory.description}
                    </p>

                    {/* View Products Button */}
                    <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-4 transition-all">
                      <span>View Products</span>
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-2 transition-transform"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Category Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Why Choose {category.name}?
          </h2>
          <p className="text-white/90 max-w-3xl mx-auto text-lg">
            Explore our wide range of {category.name.toLowerCase()} products
            from top brands. We offer the best quality, competitive prices, and
            fast shipping to ensure your satisfaction.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-bold mb-2">
                {category.subCategories.length}+
              </div>
              <div className="text-white/80">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {category.subCategories.reduce(
                  (sum, sub) => sum + sub.productCount,
                  0
                )}
                +
              </div>
              <div className="text-white/80">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/80">Authentic</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CategoryPageContent;
