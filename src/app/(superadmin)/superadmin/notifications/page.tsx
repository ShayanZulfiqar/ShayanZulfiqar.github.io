"use client";

import React, { useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
  Filter,
  Settings,
  ShoppingCart,
  Users,
  Package,
  MessageSquare,
  AlertTriangle,
  Info,
  CheckCircle,
  X,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";

const NotificationsPage = () => {
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const notifications = [
    {
      id: 1,
      type: "order",
      icon: ShoppingCart,
      title: "New Order Received",
      message: "Order #12345 has been placed by Sarah Johnson",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 2,
      type: "user",
      icon: Users,
      title: "New User Registration",
      message: "Michael Chen has created a new account",
      time: "15 minutes ago",
      read: false,
      priority: "normal",
      color: "from-green-400 to-green-600",
    },
    {
      id: 3,
      type: "alert",
      icon: AlertTriangle,
      title: "Low Stock Alert",
      message: "Product 'iPhone 14 Pro' is running low on stock (5 units left)",
      time: "1 hour ago",
      read: false,
      priority: "high",
      color: "from-orange-400 to-red-600",
    },
    {
      id: 4,
      type: "message",
      icon: MessageSquare,
      title: "New Customer Message",
      message: "Emily Rodriguez sent you a message about order #12344",
      time: "2 hours ago",
      read: true,
      priority: "normal",
      color: "from-purple-400 to-purple-600",
    },
    {
      id: 5,
      type: "product",
      icon: Package,
      title: "Product Review Posted",
      message: "David Kim left a 5-star review on 'Wireless Headphones'",
      time: "3 hours ago",
      read: true,
      priority: "low",
      color: "from-indigo-400 to-indigo-600",
    },
    {
      id: 6,
      type: "order",
      icon: ShoppingCart,
      title: "Order Delivered",
      message: "Order #12340 has been successfully delivered to Lisa Anderson",
      time: "4 hours ago",
      read: true,
      priority: "normal",
      color: "from-blue-400 to-blue-600",
    },
    {
      id: 7,
      type: "info",
      icon: Info,
      title: "System Update",
      message: "Platform maintenance scheduled for tonight at 2:00 AM",
      time: "5 hours ago",
      read: true,
      priority: "normal",
      color: "from-gray-400 to-gray-600",
    },
    {
      id: 8,
      type: "success",
      icon: CheckCircle,
      title: "Payment Processed",
      message: "Payment of $1,234.56 has been successfully processed",
      time: "6 hours ago",
      read: true,
      priority: "normal",
      color: "from-emerald-400 to-emerald-600",
    },
  ];

  const stats = [
    {
      label: "Total",
      count: notifications.length,
      color: "text-gray-600",
    },
    {
      label: "Unread",
      count: notifications.filter((n) => !n.read).length,
      color: "text-indigo-600",
    },
    {
      label: "High Priority",
      count: notifications.filter((n) => n.priority === "high").length,
      color: "text-red-600",
    },
  ];

  const filteredNotifications = notifications.filter((notif) => {
    const matchesFilter =
      filterType === "all" ||
      (filterType === "unread" && !notif.read) ||
      (filterType === "high" && notif.priority === "high");

    const matchesSearch =
      searchQuery === "" ||
      notif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Bell className="text-indigo-600" size={32} />
              Notifications Center
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and track all your notifications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors flex items-center gap-2 text-gray-700 font-medium">
              <CheckCheck size={18} />
              Mark All Read
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors flex items-center gap-2 text-gray-700 font-medium">
              <Settings size={18} />
              Settings
            </button>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold mt-2 ${stat.color}`}>
                  {stat.count}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                <Bell className="text-indigo-600" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2.5 rounded-lg transition-all font-medium ${
                filterType === "all"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("unread")}
              className={`px-4 py-2.5 rounded-lg transition-all font-medium ${
                filterType === "unread"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Unread
            </button>
            <button
              onClick={() => setFilterType("high")}
              className={`px-4 py-2.5 rounded-lg transition-all font-medium ${
                filterType === "high"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              High Priority
            </button>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        {filteredNotifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            variants={itemVariants}
            className={`bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all ${
              !notif.read ? "border-l-4 border-l-indigo-600" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={`w-12 h-12 bg-gradient-to-br ${notif.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}
              >
                <notif.icon className="text-white" size={24} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-gray-900">
                        {notif.title}
                      </h3>
                      {!notif.read && (
                        <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
                      )}
                      {notif.priority === "high" && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                          High Priority
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notif.message}</p>
                    <span className="text-xs text-gray-400">{notif.time}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {!notif.read && (
                      <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <CheckCheck size={18} />
                      </button>
                    )}
                    <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center"
          >
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              No notifications found
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? "Try adjusting your search terms"
                : "You're all caught up! Check back later for updates."}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NotificationsPage;
