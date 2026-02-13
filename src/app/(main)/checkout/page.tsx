"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { categories } from "@/data/shopData";
import { CreditCard, MapPin, User, Phone, Home } from "lucide-react";
import { getValidImageUrl } from "@/utils/imageUtils";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, total } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user.user);

  // Shipping address form
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [selectedSavedAddress, setSelectedSavedAddress] = useState("");

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!useSavedAddress) {
      if (!shippingAddress.fullName || !shippingAddress.phone || !shippingAddress.addressLine1 || !shippingAddress.city || !shippingAddress.state || !shippingAddress.zipCode) {
        alert("Please fill in all required shipping address fields");
        return;
      }
    } else if (!selectedSavedAddress) {
      alert("Please select a saved address or enter a new one");
      return;
    }

    alert("Order placed successfully! 🎉");
    dispatch(clearCart());
    router.push("/orders");
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ShopHeader categories={categories} />

      <main className="pt-40 mt-15 pb-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8 font-bold text-transparent text-4xl"
          >
            Checkout
          </motion.h1>

          <form onSubmit={handlePlaceOrder}>
            <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
              {/* Checkout Form */}
              <div className="space-y-6 lg:col-span-2">
                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white shadow-lg p-8 rounded-2xl"
                >
                  <h2 className="flex items-center gap-2 mb-6 font-bold text-gray-800 text-2xl">
                    <MapPin className="text-purple-600" size={28} />
                    Shipping Address
                  </h2>

                  {/* Option to use saved address */}
                  {user?.addresses && user.addresses.length > 0 && (
                    <div className="mb-6">
                      <label className="flex items-center gap-2 mb-4 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useSavedAddress}
                          onChange={(e) => setUseSavedAddress(e.target.checked)}
                          className="w-4 h-4 text-purple-600"
                        />
                        <span className="font-medium text-gray-700">Use saved address</span>
                      </label>

                      {useSavedAddress && (
                        <div className="space-y-3">
                          {user.addresses.map((address) => (
                            <label
                              key={address.id}
                              className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-purple-600 transition-colors ${selectedSavedAddress === address.id
                                ? "border-purple-600 bg-purple-50"
                                : "border-gray-200"
                                }`}
                            >
                              <input
                                type="radio"
                                name="savedAddress"
                                value={address.id}
                                checked={selectedSavedAddress === address.id}
                                onChange={(e) => setSelectedSavedAddress(e.target.value)}
                                className="mt-1"
                              />
                              <div className="flex-1">
                                <p className="font-semibold text-gray-800">{address.name}</p>
                                <p className="text-gray-600 text-sm">
                                  {address.addressLine1}
                                  {address.addressLine2 && `, ${address.addressLine2}`}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  {address.city}, {address.state} {address.zipCode}
                                </p>
                                <p className="text-gray-600 text-sm">{address.phone}</p>
                              </div>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* New Address Form */}
                  {!useSavedAddress && (
                    <div className="space-y-4">
                      {/* Full Name & Phone */}
                      <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" size={20} />
                            <input
                              type="text"
                              name="fullName"
                              value={shippingAddress.fullName}
                              onChange={handleInputChange}
                              required
                              className="py-3 pr-4 pl-10 border-2 border-gray-300 focus:border-purple-500 rounded-lg focus:outline-none w-full transition-colors"
                              placeholder="John Doe"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" size={20} />
                            <input
                              type="tel"
                              name="phone"
                              value={shippingAddress.phone}
                              onChange={handleInputChange}
                              required
                              className="py-3 pr-4 pl-10 border-2 border-gray-300 focus:border-purple-500 rounded-lg focus:outline-none w-full transition-colors"
                              placeholder="+1 (234) 567-8900"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Address Line 1 */}
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 text-sm">
                          Address Line 1 <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Home className="top-1/2 left-3 absolute text-gray-400 -translate-y-1/2" size={20} />
                          <input
                            type="text"
                            name="addressLine1"
                            value={shippingAddress.addressLine1}
                            onChange={handleInputChange}
                            required
                            className="py-3 pr-4 pl-10 border-2 border-gray-300 focus:border-purple-500 rounded-lg focus:outline-none w-full transition-colors"
                            placeholder="123 Main Street"
                          />
                        </div>
                      </div>

                      {/* Address Line 2 */}
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 text-sm">
                          Address Line 2 (Optional)
                        </label>
                        <input
                          type="text"
                          name="addressLine2"
                          value={shippingAddress.addressLine2}
                          onChange={handleInputChange}
                          className="px-4 py-3 border-2 border-gray-300 focus:border-purple-500 rounded-lg focus:outline-none w-full transition-colors"
                          placeholder="Apt 4B, Suite 100"
                        />
                      </div>

                      {/* City, State, Zip */}
                      <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">
                            City <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={shippingAddress.city}
                            onChange={handleInputChange}
                            required
                            className="px-4 py-3 border-2 border-gray-300 focus:border-purple-500 rounded-lg focus:outline-none w-full transition-colors"
                            placeholder="New York"
                          />
                        </div>

                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">
                            State <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={shippingAddress.state}
                            onChange={handleInputChange}
                            required
                            className="px-4 py-3 border-2 border-gray-300 focus:border-purple-500 rounded-lg focus:outline-none w-full transition-colors"
                            placeholder="NY"
                          />
                        </div>

                        <div>
                          <label className="block mb-2 font-medium text-gray-700 text-sm">
                            Zip Code <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={handleInputChange}
                            required
                            className="px-4 py-3 border-2 border-gray-300 focus:border-purple-500 rounded-lg focus:outline-none w-full transition-colors"
                            placeholder="10001"
                          />
                        </div>
                      </div>

                      {/* Country */}
                      <div>
                        <label className="block mb-2 font-medium text-gray-700 text-sm">
                          Country
                        </label>
                        <input
                          type="text"
                          name="country"
                          value={shippingAddress.country}
                          onChange={handleInputChange}
                          className="bg-gray-50 px-4 py-3 border-2 border-gray-300 rounded-lg w-full cursor-not-allowed"
                          disabled
                        />
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Payment Method */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white shadow-lg p-8 rounded-2xl"
                >
                  <h2 className="flex items-center gap-2 mb-6 font-bold text-gray-800 text-2xl">
                    <CreditCard className="text-purple-600" size={28} />
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {[
                      { value: "card", label: "Credit/Debit Card", icon: CreditCard },
                      { value: "paypal", label: "PayPal" },
                      { value: "cod", label: "Cash on Delivery" },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-purple-600 transition-colors ${paymentMethod === method.value
                          ? "border-purple-600 bg-purple-50"
                          : "border-gray-200"
                          }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.value}
                          checked={paymentMethod === method.value}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="font-medium">{method.label}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="top-40 sticky bg-white shadow-lg p-6 rounded-2xl"
                >
                  <h2 className="mb-6 font-bold text-gray-800 text-xl">Order Summary</h2>

                  {/* Items Preview */}
                  <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.product._id} className="flex gap-3">
                        <img
                          src={getValidImageUrl(item.product.images?.[0]) || "/placeholder-product.png"}
                          alt={item.product.name}
                          className="rounded w-16 h-16 object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-sm line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                          <p className="font-bold text-purple-600 text-sm">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-3 pt-4 border-t text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
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
                      <p className="text-gray-500 text-xs">
                        Add ${(50 - total).toFixed(2)} more for FREE shipping!
                      </p>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (10%)</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t font-bold text-lg">
                      <span>Total</span>
                      <span className="text-purple-600">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl mt-6 py-4 rounded-lg w-full font-bold text-white text-lg transition-all"
                  >
                    Place Order
                  </motion.button>

                  <p className="mt-4 text-gray-500 text-xs text-center">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <ShopFooter />
    </div>
  );
};

export default CheckoutPage;
