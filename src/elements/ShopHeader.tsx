"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  Heart,
  ChevronDown,
  LogOut,
  Settings,
  Package,
} from "lucide-react";
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_SUBCATEGORIES } from "@/services/ApiRoutes";
import { get, logout } from "@/services/ApiService";
import { Category, SubCategory } from "@/types/shop";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getValidImageUrl } from "@/utils/imageUtils";

interface ShopHeaderProps {
  categories?: Category[];
}

const ShopHeader = ({ categories: initialCategories }: ShopHeaderProps = {}) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes] = await Promise.all([
          get(GET_PRODUCT_CATEGORIES),
          get(GET_PRODUCT_SUBCATEGORIES),
        ]);

        if (catRes.success && subRes.success) {
          const cats: Category[] = catRes.data;
          const subs: SubCategory[] = subRes.data;

          // Map subcategories to parents
          const categoriesWithSubs = cats.map(cat => ({
            ...cat,
            subCategories: subs.filter(sub => {
              const subCatId = typeof sub.category === 'object' ? (sub.category as any)._id : sub.category;
              return subCatId === cat._id;
            })
          }));

          setCategories(categoriesWithSubs);
        }
      } catch (error) {
        console.error("Failed to fetch header data:", error);
      }
    };
    fetchData();
  }, []);

  const announcements = [
    "Welcome to HubMicro Shop - Your One Stop Solution",
    "Free Shipping on Orders Over $50",
    "New Arrivals: Check out the latest summer collection",
    "24/7 Customer Support Available",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Redux state
  const cartCount = useAppSelector((state) => state.cart.itemCount);
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render complex user logic until mounted to prevent hydration errors
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white h-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          {/* Minimal static header to avoid layout shift */}
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            HubMicro
          </div>
          {/* ... other static parts if needed ... */}
        </div>
      </header>
    );
  }

  return (
    <motion.header
      // ...
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-white shadow-md"
        }`}
    >
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center h-10 text-sm">
            <div className="flex-1 flex justify-center md:justify-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentAnnouncement}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-medium truncate"
                >
                  {announcements[currentAnnouncement]}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/track-order" className="hover:underline">
                Track Order
              </Link>
              <span className="hidden sm:inline">|</span>
              <Link href="/help" className="hidden sm:inline hover:underline">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="flex justify-center items-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg w-10 h-10">
                <span className="font-bold text-white text-xl">H</span>
              </div>
              <span className="bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-bold text-transparent text-2xl">

              </span>
            </motion.div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 mx-8 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-3 pr-4 pl-12 border-2 border-gray-200 focus:border-purple-500 rounded-full focus:outline-none w-full transition-colors"
              />
              <Search
                className="top-1/2 left-4 absolute text-gray-400 -translate-y-1/2"
                size={20}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Link href="/wishlist">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden relative md:flex hover:bg-purple-50 p-2 rounded-full transition-colors"
              >
                <Heart className="text-gray-700" size={24} />
                {wishlistCount > 0 && (
                  <span className="-top-1 -right-1 absolute flex justify-center items-center bg-red-500 rounded-full w-5 h-5 text-white text-xs">
                    {wishlistCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative hover:bg-purple-50 p-2 rounded-full transition-colors"
              >
                <ShoppingCart className="text-gray-700" size={24} />
                {cartCount > 0 && (
                  <span className="-top-1 -right-1 absolute flex justify-center items-center bg-purple-600 rounded-full w-5 h-5 text-white text-xs">
                    {cartCount}
                  </span>
                )}
              </motion.button>
            </Link>

            {/* User Profile */}
            <div className="hidden lg:block relative">
              {user ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:bg-purple-50 p-2 rounded-full transition-colors"
                  >
                    <div className="flex justify-center items-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-full w-9 h-9 overflow-hidden">
                      {user?.profileImage ? (
                        <img
                          src={getValidImageUrl(user.profileImage) || undefined}
                          alt={user?.name}
                          className="rounded-full w-full h-full object-cover"
                        />
                      ) : (
                        <User className="text-white" size={20} />
                      )}
                    </div>
                    <ChevronDown className="text-gray-700" size={16} />
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="right-0 absolute bg-white shadow-xl mt-2 border border-gray-100 rounded-xl w-56 overflow-hidden"
                      >
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-gray-100 border-b">
                          <p className="font-semibold text-gray-800">{user?.name}</p>
                          <p className="text-gray-600 text-sm">{user?.email}</p>
                        </div>
                        <div className="py-2">
                          <Link href="/profile">
                            <button className="flex items-center gap-3 hover:bg-purple-50 px-4 py-2 w-full text-gray-700 text-left">
                              <User size={18} />
                              My Profile
                            </button>
                          </Link>
                          <Link href="/orders">
                            <button className="flex items-center gap-3 hover:bg-purple-50 px-4 py-2 w-full text-gray-700 text-left">
                              <Package size={18} />
                              My Orders
                            </button>
                          </Link>
                          <Link href="/wishlist">
                            <button className="flex items-center gap-3 hover:bg-purple-50 px-4 py-2 w-full text-gray-700 text-left">
                              <Heart size={18} />
                              Wishlist
                            </button>
                          </Link>
                          <Link href="/settings">
                            <button className="flex items-center gap-3 hover:bg-purple-50 px-4 py-2 w-full text-gray-700 text-left">
                              <Settings size={18} />
                              Settings
                            </button>
                          </Link>
                          <hr className="my-2" />
                          <button
                            onClick={() => logout()}
                            className="flex items-center gap-3 hover:bg-red-50 px-4 py-2 w-full text-red-600 text-left"
                          >
                            <LogOut size={18} />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link href="/auth/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <User size={18} />
                    Login / Join
                  </motion.button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-gray-50 border-gray-200 border-t">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="hidden lg:flex items-center gap-6 h-14">
            {/* All Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => {
                setShowCategories(false);
                setActiveCategory(null);
              }}
            >
              <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg px-4 py-2 rounded-lg font-medium text-white transition-shadow">
                <Menu size={20} />
                All Categories
                <ChevronDown size={16} />
              </button>

              {/* Mega Menu */}
              <AnimatePresence>
                {showCategories && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="top-full left-0 absolute bg-white shadow-2xl mt-2 border border-gray-100 rounded-xl w-screen max-w-5xl overflow-hidden"
                  >
                    <div className="flex">
                      {/* Categories List */}
                      <div className="bg-gray-50 p-4 border-gray-200 border-r w-1/3 max-h-[600px] overflow-y-auto no-scrollbar">
                        {categories.map((category) => (
                          <Link key={category._id} href={`/shop/${category.slug}`}>
                            <motion.div
                              onMouseEnter={() => setActiveCategory(category._id)}
                              whileHover={{ x: 5 }}
                              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${activeCategory === category._id
                                ? "bg-white shadow-md text-purple-600 ring-1 ring-purple-100"
                                : "hover:bg-white text-gray-700"
                                }`}
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 bg-white flex-shrink-0">
                                {category.image ? (
                                  <img
                                    src={getValidImageUrl(category.image) || undefined}
                                    alt={category.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-purple-50 text-purple-600">
                                    <Package size={18} />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold text-sm leading-tight">{category.name}</p>
                                <p className="mt-0.5 text-gray-500 text-[10px] uppercase tracking-wider font-medium">
                                  {category.subCategories?.length || 0} items
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>

                      {/* Subcategories */}
                      <div className="flex-1 p-8 bg-white relative overflow-hidden">
                        {activeCategory ? (
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                              <div>
                                <h3 className="text-2xl font-bold text-gray-900 leading-tight">
                                  {
                                    categories.find((c) => c._id === activeCategory)
                                      ?.name
                                  }
                                </h3>
                                <p className="text-gray-500 mt-1">Explore our collection of subcategories</p>
                              </div>
                              <Link
                                href={`/shop/${categories.find((c) => c._id === activeCategory)?.slug}`}
                                className="text-purple-600 font-semibold hover:text-pink-600 transition-colors text-sm"
                              >
                                View All Products →
                              </Link>
                            </div>

                            <div className="gap-6 grid grid-cols-2">
                              {categories
                                .find((c) => c._id === activeCategory)
                                ?.subCategories?.map((sub) => (
                                  <Link
                                    key={sub._id}
                                    href={`/shop/${categories.find(
                                      (c) => c._id === activeCategory
                                    )?.slug
                                      }/${sub.slug}`}
                                  >
                                    <motion.div
                                      whileHover={{ scale: 1.02 }}
                                      className="group flex items-center gap-4 bg-gray-50 hover:bg-white hover:shadow-xl hover:ring-1 hover:ring-purple-100 p-4 rounded-2xl transition-all cursor-pointer"
                                    >
                                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 bg-white flex-shrink-0 group-hover:border-purple-200 transition-colors">
                                        {sub.image ? (
                                          <img
                                            src={getValidImageUrl(sub.image) || undefined}
                                            alt={sub.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-500 transition-colors">
                                            <Package size={24} />
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <p className="font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                                          {sub.name}
                                        </p>
                                        <p className="mt-1 text-gray-500 text-xs font-medium">
                                          {sub.productCount || 0} products available
                                        </p>
                                      </div>
                                    </motion.div>
                                  </Link>
                                ))}
                            </div>

                            {/* Decorative Background Image for Category Preview */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-[0.03] pointer-events-none">
                              {categories.find((c) => c._id === activeCategory)?.image && (
                                <img
                                  src={getValidImageUrl(categories.find((c) => c._id === activeCategory)?.image) || undefined}
                                  alt="Preview"
                                  className="w-96 h-96 object-cover rounded-full"
                                />
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col justify-center items-center h-full text-gray-400 space-y-4">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center">
                              <Search size={32} className="opacity-20" />
                            </div>
                            <p className="font-medium">Hover over a category to see its details</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick Links */}
            <Link href="/shop">
              <motion.div
                whileHover={{ y: -2 }}
                className="font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer"
              >
                All
              </motion.div>
            </Link>
            <Link href="/shop/trending">
              <motion.div
                whileHover={{ y: -2 }}
                className="font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Trending
              </motion.div>
            </Link>
            <Link href="/shop/new-arrivals">
              <motion.div
                whileHover={{ y: -2 }}
                className="font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer"
              >
                New Arrivals
              </motion.div>
            </Link>
            <Link href="/shop/best-sellers">
              <motion.div
                whileHover={{ y: -2 }}
                className="font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Best Sellers
              </motion.div>
            </Link>
            <Link href="/shop/deals">
              <motion.div
                whileHover={{ y: -2 }}
                className="font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer"
              >
                Special Deals
              </motion.div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-gray-200 border-t overflow-hidden"
          >
            {/* Mobile Search */}
            <div className="p-4 border-gray-100 border-b">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="py-2 pr-4 pl-10 border border-gray-300 focus:border-purple-500 rounded-lg focus:outline-none w-full"
                />
                <Search
                  className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2"
                  size={18}
                />
              </div>
            </div>

            {/* Mobile User */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 border-gray-100 border-b">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex justify-center items-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-full w-12 h-12 overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        src={getValidImageUrl(user.profileImage) || undefined}
                        alt={user?.name}
                        className="rounded-full w-full h-full object-cover"
                      />
                    ) : (
                      <User className="text-white" size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-gray-600 text-sm">{user?.email}</p>
                  </div>
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                  <div className="flex items-center gap-3 py-2 text-purple-600 font-bold">
                    <User size={24} />
                    Login / Sign up
                  </div>
                </Link>
              )}
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2 p-4">
              {categories.map((category, index) => (
                <Link key={category._id} href={`/shop/${category.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-50 hover:bg-purple-50 px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-purple-600 transition-colors cursor-pointer"
                  >
                    {category.name}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Mobile Links */}
            {user && (
              <div className="space-y-2 p-4 border-gray-100 border-t">
                <Link href="/orders">
                  <button onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:bg-purple-50 px-4 py-2 rounded-lg w-full text-gray-700 text-left">
                    <Package size={18} />
                    My Orders
                  </button>
                </Link>
                <Link href="/wishlist">
                  <button onClick={() => setIsOpen(false)} className="flex items-center gap-3 hover:bg-purple-50 px-4 py-2 rounded-lg w-full text-gray-700 text-left">
                    <Heart size={18} />
                    Wishlist
                  </button>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="flex items-center gap-3 hover:bg-red-50 px-4 py-2 rounded-lg w-full text-red-600 text-left"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default ShopHeader;
