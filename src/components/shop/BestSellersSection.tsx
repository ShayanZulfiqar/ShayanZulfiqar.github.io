"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, ArrowRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "@/types/shop";
import Link from "next/link";

interface BestSellersSectionProps {
  products: Product[];
}

const BestSellersSection = ({ products }: BestSellersSectionProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="text-blue-600" size={32} />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Best Sellers
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Top-rated products loved by our customers worldwide
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/shop/best-sellers">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              View All Best Sellers
              <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BestSellersSection;
