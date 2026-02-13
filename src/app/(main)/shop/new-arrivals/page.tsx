"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ProductCard from "@/components/shop/ProductCard";
import { Sparkles, SlidersHorizontal, Grid3x3, List, ChevronDown, Zap, Star, Loader2 } from "lucide-react";
import { ShopNewArrival, Product, Category } from "@/types/shop";

import { fetchNewArrivals, fetchProductCategories, fetchProducts } from "@/store/slices/shopSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const NewArrivalsPage = () => {
  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: newArrivalsRecords, loading: heroLoading } = useAppSelector((state) => state.shop.newArrivals);
  const { data: allCategories } = useAppSelector((state) => state.shop.categories);
  const { data: products, loading } = useAppSelector((state) => state.shop.products);

  const arrivalData = newArrivalsRecords && newArrivalsRecords.length > 0 ? newArrivalsRecords[0] : null;

  useEffect(() => {
    dispatch(fetchNewArrivals());
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    const params: any = {
      limit: 100,
      maxPrice: priceRange[1],
      sort: sortBy === "newest" ? "-createdAt" : sortBy
    };
    if (selectedCategory !== "all") {
      params.category = selectedCategory;
    }
    dispatch(fetchProducts(params));
  }, [dispatch, priceRange, selectedCategory, sortBy]);

  const newArrivals = products;

  return (
    <div className="min-h-screen bg-white">
      <ShopHeader categories={allCategories} />

      <main className="pt-40 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 py-20 overflow-hidden min-h-[400px] flex items-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bTAgMGMwLTIuMjA5LTEuNzkxLTQtNC00cy00IDEuNzkxLTQgNCA0IDQgNCA0IDQtMS43OTEgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
          </div>

          {/* Floating particles animation */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                initial={{
                  x: Math.random() * 1000,
                  y: Math.random() * 500,
                  opacity: 0,
                }}
                animate={{
                  y: [null, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            {heroLoading ? (
              <div className="flex flex-col items-center justify-center text-white gap-4">
                <Loader2 className="animate-spin" size={48} />
                <p className="text-xl font-medium">Unboxing new arrivals...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Sparkles className="text-white animate-pulse" size={48} />
                  <Zap className="text-yellow-300" size={48} />
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  {arrivalData?.title || "New Arrivals"}
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                  {arrivalData?.description || "Be the first to explore our latest collection of fresh products. New styles, new innovations, new possibilities."}
                </p>
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md rounded-full px-6 py-3 text-white">
                  <Star className="fill-yellow-300 text-yellow-300" size={20} />
                  <span className="font-semibold">
                    {arrivalData?.tag || "Just Added This Week - Don't Miss Out!"}
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-b from-pink-50 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "New Products", value: newArrivals.length, icon: Sparkles },
                { label: "Categories", value: allCategories.length, icon: Grid3x3 },
                { label: "Avg Rating", value: "4.7★", icon: Star },
                { label: "Happy Customers", value: "12K+", icon: Zap },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-lg border border-pink-100"
                >
                  <stat.icon className="mx-auto text-pink-600 mb-3" size={32} />
                  <div className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-72 flex-shrink-0"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-40">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="text-pink-600" size={24} />
                  <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Category
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="text-pink-600 focus:ring-pink-500"
                      />
                      <span className="text-gray-700">All Categories</span>
                    </label>
                    {allCategories.map((category) => (
                      <label
                        key={category._id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category._id}
                          onChange={() => setSelectedCategory(category._id)}
                          className="text-pink-600 focus:ring-pink-500"
                        />
                        <span className="text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Price Range
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-pink-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setPriceRange([0, 2000]);
                    setSelectedCategory("all");
                  }}
                  className="w-full py-3 border-2 border-pink-600 text-pink-600 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
                >
                  Clear All Filters
                </button>

                {/* New Badge */}
                <div className="mt-6 p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl border border-pink-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-pink-600" size={20} />
                    <span className="font-bold text-gray-800">
                      Fresh & New!
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    All products added within the last 30 days
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl p-4 mb-6 shadow-lg border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-700 font-medium">
                  <span className="text-pink-600 font-bold">
                    {newArrivals.length}
                  </span>{" "}
                  new products found
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm">Sort:</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-gray-700 focus:outline-none focus:border-pink-500 cursor-pointer"
                      >
                        <option value="newest">Newest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                      <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                        ? "bg-pink-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {newArrivals.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-6"
                  }
                >
                  {newArrivals.map((product, index) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
                  <Sparkles size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    No new arrivals found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default NewArrivalsPage;
