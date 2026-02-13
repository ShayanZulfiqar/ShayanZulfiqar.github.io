"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ProductCard from "@/components/shop/ProductCard";
import { Zap, SlidersHorizontal, Grid3x3, List, ChevronDown, Tag, Clock, Percent, Gift, Loader2 } from "lucide-react";
import { ShopSpecialDeal, Product, Category } from "@/types/shop";

import { fetchSpecialDeals, fetchProductCategories, fetchProducts } from "@/store/slices/shopSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const DealsPage = () => {
  const dispatch = useAppDispatch();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("discount");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minDiscount, setMinDiscount] = useState(0);

  const { data: specialDealsRecords, loading: heroLoading } = useAppSelector((state) => state.shop.specialDeals);
  const { data: allCategories } = useAppSelector((state) => state.shop.categories);
  const { data: allProducts, loading } = useAppSelector((state) => state.shop.products);

  const dealData = specialDealsRecords && specialDealsRecords.length > 0 ? specialDealsRecords[0] : null;

  useEffect(() => {
    dispatch(fetchSpecialDeals());
    dispatch(fetchProductCategories());
  }, [dispatch]);

  useEffect(() => {
    const params: any = {
      isSpecialDeal: true,
      limit: 100,
      maxPrice: priceRange[1],
      sort: sortBy
    };
    if (selectedCategory !== "all") {
      params.category = selectedCategory;
    }
    dispatch(fetchProducts(params));
  }, [dispatch, priceRange, selectedCategory, sortBy]);

  // Handle local filter for min discount if not supported by backend
  const products = useMemo(() => {
    if (!allProducts) return [];
    if (minDiscount === 0) return allProducts;

    return allProducts.filter((p: Product) => {
      if (p.discountPrice && p.price) {
        const disc = ((p.price - p.discountPrice) / p.price) * 100;
        return disc >= minDiscount;
      }
      return false;
    });
  }, [allProducts, minDiscount]);

  const deals = products;

  // Calculate average discount
  const avgDiscount = deals.length
    ? Math.round(
      deals.reduce((sum, p) => {
        if (p.price && p.discountPrice) {
          return sum + ((p.price - p.discountPrice) / p.price) * 100;
        }
        return sum;
      }, 0) / deals.length
    )
    : 0;

  return (
    <div className="bg-white min-h-screen">
      <ShopHeader categories={allCategories} />

      <main className="pt-40 pb-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 py-20 overflow-hidden min-h-[400px] flex items-center">
          <div className="absolute inset-0 bg-black/10" />

          {/* Animated Discount Tags */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: Math.random() * 1000,
                  y: -50,
                  rotate: Math.random() * 360,
                  opacity: 0,
                }}
                animate={{
                  y: 700,
                  rotate: Math.random() * 360 + 360,
                  opacity: [0, 0.4, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                }}
              >
                <Tag className="text-white/20" size={30} />
              </motion.div>
            ))}
          </div>

          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center w-full">
            {heroLoading ? (
              <div className="flex flex-col items-center justify-center text-white gap-4">
                <Loader2 className="animate-spin" size={48} />
                <p className="text-xl font-medium">Loading amazing deals...</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex justify-center items-center gap-3 mb-6">
                  <Zap className="text-white animate-bounce" size={48} />
                  <Tag className="text-white" size={48} />
                  <Percent className="text-white animate-bounce" size={48} />
                </div>
                <h1 className="mb-6 font-bold text-white text-5xl md:text-7xl">
                  {dealData?.title || "Special Deals"}
                </h1>
                <p className="mx-auto mb-8 max-w-3xl text-white/90 text-xl">
                  {dealData?.description || "Unbeatable prices on top products! Limited time offers with discounts up to 70% OFF. Don't miss out!"}
                </p>

                {/* Countdown Timer */}
                <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-8 py-4 rounded-2xl text-white">
                  <Clock className="animate-pulse" size={24} />
                  <div>
                    <div className="mb-1 font-medium text-sm">
                      Deals End In:
                    </div>
                    <div className="font-bold text-2xl tracking-wider">
                      {dealData?.dealEndTime || "23:59:59"}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Deals Stats */}
        <section className="bg-gradient-to-b from-orange-50 to-white py-12">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="gap-6 grid grid-cols-2 md:grid-cols-4">
              {[
                {
                  icon: Tag,
                  label: "Active Deals",
                  value: deals.length,
                  color: "orange",
                },
                {
                  icon: Percent,
                  label: "Avg Discount",
                  value: `${avgDiscount}%`,
                  color: "red",
                },
                {
                  icon: Zap,
                  label: "Flash Sales",
                  value: "12",
                  color: "yellow",
                },
                {
                  icon: Gift,
                  label: "Free Gifts",
                  value: "8",
                  color: "pink",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white shadow-lg p-6 border-2 border-orange-100 rounded-2xl text-center"
                >
                  <stat.icon
                    className={`mx-auto text-${stat.color}-600 mb-3`}
                    size={32}
                  />
                  <div className="bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-2 font-bold text-transparent text-3xl">
                    {stat.value}
                  </div>
                  <div className="font-medium text-gray-600 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl">
          <div className="flex lg:flex-row flex-col gap-8">
            {/* Filters Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0 lg:w-72"
            >
              <div className="top-40 sticky bg-white shadow-lg p-6 border border-gray-100 rounded-2xl">
                <div className="flex items-center gap-2 mb-6">
                  <SlidersHorizontal className="text-orange-600" size={24} />
                  <h2 className="font-bold text-gray-800 text-xl">Filters</h2>
                </div>

                {/* Discount Filter */}
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-gray-800">
                    Minimum Discount
                  </h3>
                  <div className="space-y-2">
                    {[50, 40, 30, 20, 10].map((discount) => (
                      <label
                        key={discount}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="discount"
                          checked={minDiscount === discount}
                          onChange={() => setMinDiscount(discount)}
                          className="focus:ring-orange-500 text-orange-600"
                        />
                        <span className="text-gray-700">{discount}% & above</span>
                      </label>
                    ))}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="discount"
                        checked={minDiscount === 0}
                        onChange={() => setMinDiscount(0)}
                        className="text-orange-600"
                      />
                      <span className="text-gray-700">All Discounts</span>
                    </label>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-gray-800">
                    Category
                  </h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === "all"}
                        onChange={() => setSelectedCategory("all")}
                        className="focus:ring-orange-500 text-orange-600"
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
                          className="focus:ring-orange-500 text-orange-600"
                        />
                        <span className="text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-gray-800">
                    Price Range
                  </h3>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full accent-orange-600"
                  />
                  <div className="flex justify-between mt-2 text-gray-600 text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => {
                    setPriceRange([0, 2000]);
                    setSelectedCategory("all");
                    setMinDiscount(0);
                  }}
                  className="hover:bg-orange-50 py-3 border-2 border-orange-600 rounded-xl w-full font-semibold text-orange-600 transition-colors"
                >
                  Clear All Filters
                </button>

                {/* Deal Alert */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 mt-6 p-4 border-2 border-orange-200 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-orange-600 animate-pulse" size={20} />
                    <span className="font-bold text-gray-800">
                      Lightning Deals!
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    New deals added every hour. Check back often!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Products Section */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="flex sm:flex-row flex-col justify-between items-center gap-4 bg-white shadow-lg mb-6 p-4 border border-gray-100 rounded-2xl">
                <div className="font-medium text-gray-700">
                  <span className="font-bold text-orange-600">
                    {deals.length}
                  </span>{" "}
                  deals available now
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 text-sm">Sort:</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-gray-50 px-4 py-2 pr-10 border border-gray-300 focus:border-orange-500 rounded-lg focus:outline-none text-gray-700 appearance-none cursor-pointer"
                      >
                        <option value="discount">Highest Discount</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                      </select>
                      <ChevronDown
                        className="top-1/2 right-3 absolute text-gray-400 -translate-y-1/2 pointer-events-none"
                        size={16}
                      />
                    </div>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "grid"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 rounded-lg transition-colors ${viewMode === "list"
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {deals.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                      : "flex flex-col gap-6"
                  }
                >
                  {deals.map((product, index) => (
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
                <div className="bg-white shadow-lg p-12 border border-gray-100 rounded-2xl text-center">
                  <Tag size={64} className="mx-auto mb-4 text-gray-300" />
                  <h3 className="mb-2 font-semibold text-gray-800 text-xl">
                    No deals found
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

export default DealsPage;
