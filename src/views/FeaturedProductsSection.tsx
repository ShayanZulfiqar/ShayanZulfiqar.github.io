"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ShoppingCart, Eye, Download, Heart, Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchFeaturedProducts } from "@/store/slices/landingSlice";
import { imageUrl } from "@/services/BaseUrl";
import Link from "next/link";

const FeaturedProductsSection = () => {
  const dispatch = useAppDispatch();
  const { data: products, loading } = useAppSelector((state) => state.landing.featuredProducts);

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const getFullImageUrl = (image: string) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `${imageUrl}/${image.replace(/\\/g, '/')}`;
  };

  if (loading || !products || products.length === 0) {
    if (loading) {
      return (
        <section className="py-24 bg-gray-50 flex items-center justify-center min-h-[400px]">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
        </section>
      );
    }
    return null;
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30" />

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
            Featured Products
          </motion.span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Best Selling{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Products
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our most popular and highly-rated digital products
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any, index: number) => {
            const id = product._id || product.id;
            const categoryName = typeof product.category === 'object' ? product.category.name : product.category;
            const badge = product.isBestSeller ? "Bestseller" : product.isTrending ? "Trending" : product.isSpecialDeal ? "Special Deal" : null;
            const badgeColor = product.isBestSeller ? "bg-yellow-500" : product.isTrending ? "bg-orange-500" : "bg-purple-500";

            return (
              <motion.div
                key={id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredId(id)}
                onMouseLeave={() => setHoveredId(null)}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <motion.div
                      className="w-full h-full flex items-center justify-center relative"
                      animate={{
                        scale: hoveredId === id ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {product.images?.[0] ? (
                        <img
                          src={getFullImageUrl(product.images[0]) || ''}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-20" />
                      )}

                      {/* Pattern overlay */}
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,.1) 10px, rgba(255,255,255,.1) 20px)`,
                        }}
                      />

                      {/* Badge */}
                      {badge && (
                        <div
                          className={`absolute top-4 left-4 ${badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-md`}
                        >
                          {badge}
                        </div>
                      )}

                      {/* Favorite Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleFavorite(id)}
                        className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Heart
                          className={`w-5 h-5 transition-colors ${favorites.includes(id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                            }`}
                        />
                      </motion.button>
                    </motion.div>

                    {/* Hover Actions */}
                    <AnimatePresence>
                      {hoveredId === id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3"
                        >
                          <Link href={`/shop/product/${id}`}>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="p-3 bg-white rounded-full text-gray-900 shadow-lg"
                            >
                              <Eye className="w-5 h-5" />
                            </motion.button>
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 bg-purple-600 rounded-full text-white shadow-lg"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Category */}
                    <span className="text-purple-600 text-sm font-semibold mb-2">
                      {categoryName}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Rating & Reviews */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-semibold text-gray-900">
                            {product.rating || 5.0}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.numReviews || 0})
                        </span>
                      </div>
                      {product.soldCount > 0 && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Download className="w-4 h-4" />
                          {product.soldCount > 1000 ? `${(product.soldCount / 1000).toFixed(1)}k` : product.soldCount}+
                        </div>
                      )}
                    </div>

                    {/* Features/Tags (using tags as fallback) */}
                    <div className="mb-4 space-y-2">
                      {(product.tags || ["Premium Quality", "Secure Delivery"]).slice(0, 2).map((tag: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600 capitalize">{tag}</span>
                        </div>
                      ))}
                    </div>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                        {product.discountPrice > 0 && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.discountPrice}
                          </span>
                        )}
                      </div>
                      <Link href={`/shop/product/${id}`}>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-shadow"
                        >
                          Details
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link href="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 shadow-lg"
            >
              Browse All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProductsSection;
