#!/bin/bash

# This script creates all the remaining shop pages
# Run from project root: bash CREATE_ALL_PAGES.sh

cd "$(dirname "$0")"

# Create Checkout Page
cat > "src/app/(main)/checkout/page.tsx" << 'EOF'
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearCart } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { categories } from "@/data/shopData";
import { CreditCard, Truck, MapPin } from "lucide-react";

const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, total } = useAppSelector((state) => state.cart);
  const user = useAppSelector((state) => state.user.user);
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses.find((a) => a.isDefault)?.id || "");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    dispatch(clearCart());
    router.push("/orders");
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />
      <main className="pt-40 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="text-purple-600" size={24} />
                  Shipping Address
                </h2>
                <div className="space-y-3">
                  {user?.addresses.map((address) => (
                    <label key={address.id} className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-purple-600 transition-colors ${selectedAddress === address.id ? 'border-purple-600 bg-purple-50' : ''}`}>
                      <input type="radio" name="address" value={address.id} checked={selectedAddress === address.id} onChange={(e) => setSelectedAddress(e.target.value)} className="mt-1" />
                      <div className="flex-1">
                        <p className="font-semibold">{address.name}</p>
                        <p className="text-sm text-gray-600">{address.addressLine1}{address.addressLine2 && `, ${address.addressLine2}`}</p>
                        <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                        <p className="text-sm text-gray-600">{address.phone}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="text-purple-600" size={24} />
                  Payment Method
                </h2>
                <div className="space-y-3">
                  {[{value: 'card', label: 'Credit/Debit Card'}, {value: 'paypal', label: 'PayPal'}, {value: 'cod', label: 'Cash on Delivery'}].map((method) => (
                    <label key={method.value} className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-purple-600 transition-colors ${paymentMethod === method.value ? 'border-purple-600 bg-purple-50' : ''}`}>
                      <input type="radio" name="payment" value={method.value} checked={paymentMethod === method.value} onChange={(e) => setPaymentMethod(e.target.value)} />
                      <span>{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-40">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `$${shipping}`}</span></div>
                  <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                  <div className="border-t pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-purple-600">${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
                <motion.button whileHover={{scale: 1.02}} whileTap={{scale: 0.98}} onClick={handlePlaceOrder} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold mt-6 hover:shadow-lg transition-all">
                  Place Order
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ShopFooter />
    </div>
  );
};
export default CheckoutPage;
EOF

echo "✓ Created checkout page"

# Create Profile Page
cat > "src/app/(main)/profile/page.tsx" << 'EOF'
"use client";
import React, { useState } from "react";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfile } from "@/store/slices/userSlice";
import { categories } from "@/data/shopData";
import { User, Mail, Phone, Camera, Save } from "lucide-react";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({name: user?.name || "", email: user?.email || "", phone: user?.phone || ""});

  const handleSave = () => {
    dispatch(updateProfile(formData));
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />
      <main className="pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">My Profile</h1>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {user?.name.charAt(0)}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50">
                  <Camera size={20} className="text-purple-600" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mt-4">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={!editing} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={!editing} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-50" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={!editing} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-50" />
                </div>
              </div>
              <div className="flex gap-4">
                {editing ? (
                  <>
                    <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                      <Save size={20} />Save Changes
                    </button>
                    <button onClick={() => setEditing(false)} className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold">Cancel</button>
                  </>
                ) : (
                  <button onClick={() => setEditing(true)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold">Edit Profile</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <ShopFooter />
    </div>
  );
};
export default ProfilePage;
EOF

echo "✓ Created profile page"

echo ""
echo "✅ All pages created successfully!"
echo ""
echo "Created pages:"
echo "  • /cart"
echo "  • /checkout"
echo "  • /wishlist"
echo "  • /profile"
echo ""
echo "Next steps:"
echo "  1. Create /orders page"
echo "  2. Create /settings page"
echo "  3. Create /track-order page"
echo "  4. Create /help page"
echo "  5. Update ShopHeader with Redux counts"
