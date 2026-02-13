"use client";

import React from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromWishlist, clearWishlist, fetchWishlist } from "@/store/slices/wishlistSlice";
import { addToCart } from "@/store/slices/cartSlice";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/shopData";
import { useRouter } from "next/navigation";
import WishlistCard from "@/components/shop/WishlistCard";
import { RootState } from "@/store";

const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const wishlistItems = useAppSelector((state: RootState) => state.wishlist.items);
  const wishlistStatus = useAppSelector((state: RootState) => state.wishlist.status);

  React.useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleAddToCart = (product: any) => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleShopNow = (product: any) => {
    dispatch(addToCart({ product, quantity: 1 }));
    router.push("/cart");
  };

  if (wishlistStatus === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />

      <main className="pt-40 mt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
              <Heart className="text-red-500 fill-red-500" size={40} />
              My Wishlist
            </h1>
            <p className="text-gray-600">{wishlistItems.length} items saved</p>
          </motion.div>

          {wishlistItems.length === 0 ? (
            // Empty Wishlist State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-12 text-center shadow-lg"
            >
              <Heart size={80} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Save your favorite items to buy them later!
              </p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold"
                >
                  Start Shopping
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <>
              {/* Clear All Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to clear your wishlist?"
                      )
                    ) {
                      dispatch(clearWishlist());
                    }
                  }}
                  className="text-red-600 hover:text-red-700 flex items-center gap-2 text-sm"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>

              {/* Wishlist Items List */}
              <div className="flex flex-col gap-4">
                {Array.isArray(wishlistItems) && wishlistItems.map((product) => (
                  <WishlistCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <ShopFooter />
    </div>
  );
};

export default WishlistPage;
