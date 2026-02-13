"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { categories } from "@/data/shopData";
import {
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Calendar,
  User,
  Phone,
} from "lucide-react";

const TrackOrderPage = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  // Mock tracking data
  const mockTrackingData = {
    TRK123456789: {
      orderNumber: "HM-2024-001",
      status: "delivered",
      currentLocation: "New York, NY",
      estimatedDelivery: "Dec 5, 2024",
      timeline: [
        {
          status: "Order Placed",
          date: "Dec 1, 2024, 10:30 AM",
          location: "Online",
          completed: true,
        },
        {
          status: "Order Confirmed",
          date: "Dec 1, 2024, 11:00 AM",
          location: "Processing Center",
          completed: true,
        },
        {
          status: "Shipped",
          date: "Dec 2, 2024, 9:15 AM",
          location: "Los Angeles, CA",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Dec 3, 2024, 2:30 PM",
          location: "Chicago, IL",
          completed: true,
        },
        {
          status: "Out for Delivery",
          date: "Dec 5, 2024, 7:00 AM",
          location: "New York, NY",
          completed: true,
        },
        {
          status: "Delivered",
          date: "Dec 5, 2024, 3:45 PM",
          location: "123 Main St, New York, NY",
          completed: true,
        },
      ],
      recipient: {
        name: "John Doe",
        phone: "+1 (234) 567-890",
        address: "123 Main St, Apt 4B, New York, NY 10001",
      },
    },
    TRK987654321: {
      orderNumber: "HM-2024-002",
      status: "in_transit",
      currentLocation: "Denver, CO",
      estimatedDelivery: "Dec 10, 2024",
      timeline: [
        {
          status: "Order Placed",
          date: "Dec 8, 2024, 2:15 PM",
          location: "Online",
          completed: true,
        },
        {
          status: "Order Confirmed",
          date: "Dec 8, 2024, 3:00 PM",
          location: "Processing Center",
          completed: true,
        },
        {
          status: "Shipped",
          date: "Dec 9, 2024, 10:00 AM",
          location: "San Francisco, CA",
          completed: true,
        },
        {
          status: "In Transit",
          date: "Dec 9, 2024, 8:30 PM",
          location: "Denver, CO",
          completed: true,
        },
        {
          status: "Out for Delivery",
          date: "Expected: Dec 10, 2024",
          location: "New York, NY",
          completed: false,
        },
        {
          status: "Delivered",
          date: "Expected: Dec 10, 2024",
          location: "456 Business Ave, New York, NY",
          completed: false,
        },
      ],
      recipient: {
        name: "John Doe",
        phone: "+1 (234) 567-890",
        address: "456 Business Ave, New York, NY 10002",
      },
    },
  };

  const handleTrack = () => {
    const data = mockTrackingData[trackingNumber as keyof typeof mockTrackingData];
    setOrderData(data || null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />

      <main className="pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Track Your Order
            </h1>
            <p className="text-gray-600 text-lg">
              Enter your tracking number to see real-time updates
            </p>
          </motion.div>

          {/* Tracking Input */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tracking Number
                </label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter your tracking number (e.g., TRK123456789)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
                />
                <p className="text-xs text-gray-500 mt-2">
                  You can find your tracking number in the order confirmation email
                </p>
              </div>
              <div className="flex items-end">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleTrack}
                  className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Track Order
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Order Not Found */}
          {trackingNumber && !orderData && trackingNumber.length > 5 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 text-center"
            >
              <Package size={64} className="mx-auto text-red-400 mb-4" />
              <h3 className="text-xl font-bold text-red-800 mb-2">
                Order Not Found
              </h3>
              <p className="text-red-600">
                We couldn't find an order with tracking number: {trackingNumber}
              </p>
              <p className="text-sm text-red-500 mt-2">
                Try: TRK123456789 or TRK987654321
              </p>
            </motion.div>
          )}

          {/* Order Tracking Details */}
          {orderData && (
            <div className="space-y-6">
              {/* Order Status Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white"
              >
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-white/80 mb-1">Order Number</p>
                    <p className="text-2xl font-bold">{orderData.orderNumber}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 mb-1">Current Status</p>
                    <p className="text-2xl font-bold capitalize">
                      {orderData.status.replace("_", " ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/80 mb-1">Estimated Delivery</p>
                    <p className="text-xl font-bold">{orderData.estimatedDelivery}</p>
                  </div>
                </div>
              </motion.div>

              {/* Recipient Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="font-bold text-lg mb-4">Delivery Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="text-purple-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Recipient</p>
                      <p className="font-semibold">{orderData.recipient.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="text-purple-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-semibold">{orderData.recipient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="text-purple-600 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Delivery Address</p>
                      <p className="font-semibold">{orderData.recipient.address}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tracking Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="font-bold text-xl mb-6">Tracking History</h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                  {/* Timeline Items */}
                  <div className="space-y-6">
                    {orderData.timeline.map((item: any, index: number) => (
                      <div key={index} className="relative flex gap-4">
                        {/* Icon */}
                        <div
                          className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                            item.completed
                              ? "bg-gradient-to-r from-purple-600 to-pink-600"
                              : "bg-gray-300"
                          }`}
                        >
                          {item.status === "Delivered" ? (
                            <CheckCircle className="text-white" size={24} />
                          ) : item.status.includes("Transit") ||
                            item.status.includes("Delivery") ? (
                            <Truck className="text-white" size={24} />
                          ) : (
                            <Package className="text-white" size={24} />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-8">
                          <div
                            className={`p-4 rounded-lg ${
                              item.completed
                                ? "bg-purple-50 border-2 border-purple-200"
                                : "bg-gray-50 border-2 border-gray-200"
                            }`}
                          >
                            <p
                              className={`font-bold ${
                                item.completed ? "text-purple-600" : "text-gray-600"
                              }`}
                            >
                              {item.status}
                            </p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                              <Calendar size={14} />
                              <span>{item.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                              <MapPin size={14} />
                              <span>{item.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      <ShopFooter />
    </div>
  );
};

export default TrackOrderPage;
