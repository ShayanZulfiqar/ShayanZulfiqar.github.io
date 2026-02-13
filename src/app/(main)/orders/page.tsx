"use client";

import React from "react";
import { motion } from "framer-motion";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { categories } from "@/data/shopData";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Download,
} from "lucide-react";
import Link from "next/link";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-2024-001",
    orderNumber: "HM-2024-001",
    date: "Dec 5, 2024",
    status: "delivered",
    total: 299.99,
    items: [
      {
        name: "Premium Wireless Headphones Pro",
        quantity: 1,
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
      },
      {
        name: "Smart Watch Series 8",
        quantity: 1,
        price: 99.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
      },
    ],
    trackingNumber: "TRK123456789",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-2024-002",
    orderNumber: "HM-2024-002",
    date: "Dec 8, 2024",
    status: "shipped",
    total: 1499.99,
    items: [
      {
        name: "Ultra-Slim Gaming Laptop",
        quantity: 1,
        price: 1499.99,
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500",
      },
    ],
    trackingNumber: "TRK987654321",
    shippingAddress: "456 Business Ave, New York, NY 10002",
  },
  {
    id: "ORD-2024-003",
    orderNumber: "HM-2024-003",
    date: "Dec 9, 2024",
    status: "processing",
    total: 899.99,
    items: [
      {
        name: "Flagship Smartphone X12",
        quantity: 1,
        price: 899.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
      },
    ],
    shippingAddress: "123 Main St, New York, NY 10001",
  },
];

const OrdersPage = () => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-600" size={24} />;
      case "shipped":
        return <Truck className="text-blue-600" size={24} />;
      case "processing":
        return <Clock className="text-yellow-600" size={24} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={24} />;
      default:
        return <Package className="text-gray-600" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-300";
      case "shipped":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

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
              <Package className="text-purple-600" size={40} />
              My Orders
            </h1>
            <p className="text-gray-600">View and track all your orders</p>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-6">
            {mockOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(order.status)}
                      <div>
                        <p className="font-bold text-lg text-gray-800">
                          Order #{order.orderNumber}
                        </p>
                        <p className="text-sm text-gray-600">
                          Placed on {order.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-purple-600">
                          ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-4 items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-purple-600">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">
                      Shipping Address
                    </p>
                    <p className="text-gray-600">{order.shippingAddress}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {order.trackingNumber && (
                      <Link
                        href={`/track-order?tracking=${order.trackingNumber}`}
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all"
                        >
                          <Truck size={18} />
                          Track Order
                        </motion.button>
                      </Link>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-2 border-2 border-purple-600 text-purple-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-purple-50 transition-all"
                    >
                      <Eye size={18} />
                      View Details
                    </motion.button>
                    {order.status === "delivered" && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                      >
                        <Download size={18} />
                        Download Invoice
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State (if no orders) */}
          {mockOrders.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-12 text-center shadow-lg"
            >
              <Package size={80} className="mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                No orders yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start shopping to see your orders here!
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
          )}
        </div>
      </main>

      <ShopFooter />
    </div>
  );
};

export default OrdersPage;
