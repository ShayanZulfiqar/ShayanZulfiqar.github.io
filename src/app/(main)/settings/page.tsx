"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProfile, addAddress, deleteAddress } from "@/store/slices/userSlice";
import { categories } from "@/data/shopData";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  MapPin,
  CreditCard,
  Globe,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [activeTab, setActiveTab] = useState("notifications");
  const [showPassword, setShowPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newArrivals: false,
    newsletter: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showOrders: false,
    dataCollection: true,
  });

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy & Security", icon: Lock },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />

      <main className="pt-40 mt-10 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
              <SettingsIcon className="text-purple-600" size={40} />
              Settings
            </h1>
            <p className="text-gray-600">Manage your account preferences</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Tabs Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${activeTab === tab.id
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    <tab.icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                      Notification Preferences
                    </h2>
                    <div className="space-y-6">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-semibold text-gray-800 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="text-sm text-gray-600">
                              Receive notifications about{" "}
                              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={() =>
                                setNotifications({
                                  ...notifications,
                                  [key]: !value,
                                })
                              }
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Privacy & Security Tab */}
                {activeTab === "privacy" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                      Privacy & Security
                    </h2>
                    <div className="space-y-6">
                      {/* Change Password */}
                      <div className="p-6 border-2 border-gray-200 rounded-lg">
                        <h3 className="font-semibold text-lg mb-4">
                          Change Password
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Current Password
                            </label>
                            <div className="relative">
                              <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                              />
                              <input
                                type={showPassword ? "text" : "password"}
                                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                              />
                              <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                              >
                                {showPassword ? (
                                  <EyeOff size={20} className="text-gray-400" />
                                ) : (
                                  <Eye size={20} className="text-gray-400" />
                                )}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                              />
                              <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <Lock
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                size={20}
                              />
                              <input
                                type="password"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                              />
                            </div>
                          </div>
                          <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all">
                            Update Password
                          </button>
                        </div>
                      </div>

                      {/* Privacy Settings */}
                      <div className="space-y-4">
                        {Object.entries(privacy).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <p className="font-semibold text-gray-800 capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}
                              </p>
                              <p className="text-sm text-gray-600">
                                Control your privacy settings
                              </p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={value}
                                onChange={() =>
                                  setPrivacy({ ...privacy, [key]: !value })
                                }
                                className="sr-only peer"
                              />
                              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === "addresses" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Saved Addresses
                      </h2>
                      <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                        <Plus size={20} />
                        Add New Address
                      </button>
                    </div>
                    <div className="space-y-4">
                      {user?.addresses.map((address) => (
                        <div
                          key={address.id}
                          className="p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <p className="font-semibold text-lg">
                                  {address.name}
                                </p>
                                {address.isDefault && (
                                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-1 rounded-full">
                                    Default
                                  </span>
                                )}
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full capitalize">
                                  {address.type}
                                </span>
                              </div>
                              <p className="text-gray-600">
                                {address.addressLine1}
                                {address.addressLine2 &&
                                  `, ${address.addressLine2}`}
                              </p>
                              <p className="text-gray-600">
                                {address.city}, {address.state} {address.zipCode}
                              </p>
                              <p className="text-gray-600">{address.phone}</p>
                            </div>
                            <div className="flex gap-2">
                              <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg">
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  dispatch(deleteAddress(address.id))
                                }
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Methods Tab */}
                {activeTab === "payment" && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-800">
                        Payment Methods
                      </h2>
                      <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                        <Plus size={20} />
                        Add Card
                      </button>
                    </div>
                    <div className="text-center py-12 text-gray-500">
                      <CreditCard size={64} className="mx-auto mb-4 text-gray-300" />
                      <p>No payment methods saved yet</p>
                    </div>
                  </div>
                )}

                {/* Preferences Tab */}
                {activeTab === "preferences" && (
                  <div>
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                      Preferences
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Language
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Currency
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Time Zone
                        </label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
                          <option>EST (UTC-5)</option>
                          <option>PST (UTC-8)</option>
                          <option>GMT (UTC+0)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
                    <Save size={20} />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ShopFooter />
    </div>
  );
};

export default SettingsPage;
