"use client";

import React from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeFromCart, updateQuantity, clearCart } from "@/store/slices/cartSlice";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { categories } from "@/data/shopData";
import { getValidImageUrl } from "@/utils/imageUtils";

const CartPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, total, itemCount } = useAppSelector((state) => state.cart);

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />

      <main className="pt-40 pb-16">
        <div className="max-w-7xl mt-20 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">{itemCount} items in your cart</p>
          </motion.div>

          {items.length === 0 ? (
            // Empty Cart State
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-12 text-center shadow-lg"
            >
              <ShoppingBag size={80} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Start shopping and add items to your cart!
              </p>
              <Link href="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2"
                >
                  Continue Shopping
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={`${item.product._id}-${item.selectedSize}-${item.selectedColor}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-md"
                  >
                    <div className="flex gap-4">
                      <img
                        src={getValidImageUrl(item.product.images?.[0]) || "/placeholder-product.png"}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {item.product.name}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {item.selectedSize && `Size: ${item.selectedSize} • `}
                          {item.selectedColor && `Color: ${item.selectedColor}`}
                          {item.selectedVariant && ` • ${item.selectedVariant}`}
                        </p>
                        <p className="text-purple-600 font-bold mt-2">
                          ${item.product.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-1">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    productId: item.product._id,
                                    quantity: item.quantity - 1,
                                    selectedSize: item.selectedSize,
                                    selectedColor: item.selectedColor,
                                    selectedVariant: item.selectedVariant,
                                  })
                                )
                              }
                              className="text-gray-600 hover:text-purple-600"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    productId: item.product._id,
                                    quantity: item.quantity + 1,
                                    selectedSize: item.selectedSize,
                                    selectedColor: item.selectedColor,
                                    selectedVariant: item.selectedVariant,
                                  })
                                )
                              }
                              className="text-gray-600 hover:text-purple-600"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              dispatch(
                                removeFromCart({
                                  productId: item.product._id,
                                  selectedSize: item.selectedSize,
                                  selectedColor: item.selectedColor,
                                  selectedVariant: item.selectedVariant,
                                })
                              )
                            }
                            className="ml-auto text-red-600 hover:text-red-700 flex items-center gap-2"
                          >
                            <Trash2 size={20} />
                            <span className="text-sm">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-xl p-6 shadow-lg sticky top-40"
                >
                  <h2 className="text-xl font-bold mb-6 text-gray-800">
                    Order Summary
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({itemCount} items)
                      </span>
                      <span className="font-semibold">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">
                        {shipping === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {total < 50 && shipping > 0 && (
                      <p className="text-xs text-gray-500">
                        Add ${(50 - total).toFixed(2)} more for FREE shipping!
                      </p>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-purple-600">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/checkout")}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold mt-6 flex items-center justify-center gap-2 hover:shadow-lg transition-all"
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </motion.button>

                  <Link href="/shop">
                    <button className="w-full border-2 border-gray-300 text-gray-700 py-2 rounded-lg font-semibold mt-3 hover:bg-gray-50 transition-colors">
                      Continue Shopping
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      if (
                        confirm("Are you sure you want to clear your cart?")
                      ) {
                        dispatch(clearCart());
                      }
                    }}
                    className="w-full text-red-600 text-sm py-2 mt-3 hover:underline"
                  >
                    Clear Cart
                  </button>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>

      <ShopFooter />
    </div>
  );
};

export default CartPage;
