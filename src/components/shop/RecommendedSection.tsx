"use client";

import React from "react";
import { motion } from "framer-motion";
import { ThumbsUp, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/shop";
import Link from "next/link";

interface RecommendedSectionProps {
  products: Product[];
}

const RecommendedSection = ({ products }: RecommendedSectionProps) => {
  return (
    <section className="py-16 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <ThumbsUp className="text-green-600" size={32} />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Recommended For You
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked products based on your preferences and shopping history
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/shop/recommended">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              View All Recommendations
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RecommendedSection;
