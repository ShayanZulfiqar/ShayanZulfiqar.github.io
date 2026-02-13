"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Category, Product } from "@/types/shop";
import ProductCard from "./ProductCard";
import {
  SlidersHorizontal,
  Grid3x3,
  List,
  ChevronDown,
  Package,
} from "lucide-react";

interface SubCategoryPageContentProps {
  category: Category;
  subCategorySlug: string;
  products: Product[];
}

const SubCategoryPageContent = ({
  category,
  subCategorySlug,
  products,
}: SubCategoryPageContentProps) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedRating, setSelectedRating] = useState(0);

  const subCategory = category.subCategories.find(
    (sub) => sub.slug === subCategorySlug
  );

  if (!subCategory) return null;

  // Filter and sort products
  let filteredProducts = products.filter(
    (p) =>
      p.subCategory === subCategory.name &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1] &&
      p.rating >= selectedRating
  );

  // Sort products
  switch (sortBy) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filteredProducts = filteredProducts.filter((p) => p.newArrival);
      break;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <a href="/shop" className="hover:text-purple-600">
            Shop
          </a>
          <span>/</span>
          <a
            href={`/shop/${category.slug}`}
            className="hover:text-purple-600"
          >
            {category.name}
          </a>
          <span>/</span>
          <span className="text-purple-600 font-medium">
            {subCategory.name}
          </span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-md">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {subCategory.name}
              </h1>
              <p className="text-gray-600">{subCategory.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                {filteredProducts.length} products found
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-72 flex-shrink-0"
          >
            <div className="bg-white rounded-2xl p-6 shadow-md sticky top-40">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="text-purple-600" size={24} />
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Price Range
                </h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Minimum Rating
                </h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label
                      key={rating}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="text-purple-600"
                      />
                      <span className="text-gray-700">
                        {rating}★ & above
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === 0}
                      onChange={() => setSelectedRating(0)}
                      className="text-purple-600"
                    />
                    <span className="text-gray-700">All Ratings</span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setPriceRange([0, 2000]);
                  setSelectedRating(0);
                }}
                className="w-full py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </motion.div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
              {/* Sort */}
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">Sort by:</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:border-purple-500 cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <Grid3x3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "flex flex-col gap-6"
                }
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center shadow-md">
                <div className="text-gray-400 mb-4">
                  <Package size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryPageContent;
