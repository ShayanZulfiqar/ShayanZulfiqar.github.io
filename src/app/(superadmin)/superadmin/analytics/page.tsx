"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  ShoppingCart,
  Eye,
  MousePointer,
  Clock,
  Target,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("7days");

  const keyMetrics = [
    {
      title: "Total Visitors",
      value: "45,892",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      gradient: "from-blue-400 to-blue-600",
    },
    {
      title: "Page Views",
      value: "128,456",
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "Avg. Session",
      value: "3m 42s",
      change: "+5.1%",
      trend: "up",
      icon: Clock,
      gradient: "from-green-400 to-green-600",
    },
    {
      title: "Bounce Rate",
      value: "42.3%",
      change: "-2.8%",
      trend: "down",
      icon: Target,
      gradient: "from-orange-400 to-red-600",
    },
  ];

  const trafficSources = [
    { name: "Direct", value: 45, color: "bg-blue-500", visitors: "20,651" },
    { name: "Organic Search", value: 30, color: "bg-green-500", visitors: "13,768" },
    { name: "Social Media", value: 15, color: "bg-purple-500", visitors: "6,884" },
    { name: "Referral", value: 10, color: "bg-orange-500", visitors: "4,589" },
  ];

  const deviceStats = [
    { name: "Desktop", percentage: 55, icon: Monitor, count: "25,241" },
    { name: "Mobile", percentage: 35, icon: Smartphone, count: "16,062" },
    { name: "Tablet", percentage: 10, icon: Tablet, count: "4,589" },
  ];

  const topPages = [
    { page: "/shop/products", views: "24,456", avgTime: "4m 32s", bounce: "38%" },
    { page: "/", views: "18,234", avgTime: "2m 18s", bounce: "45%" },
    { page: "/about", views: "12,890", avgTime: "3m 42s", bounce: "42%" },
    { page: "/blog", views: "9,567", avgTime: "5m 12s", bounce: "35%" },
    { page: "/contact", views: "7,234", avgTime: "1m 48s", bounce: "52%" },
  ];

  const realtimeData = [
    { time: "10:00", visitors: 145 },
    { time: "10:15", visitors: 178 },
    { time: "10:30", visitors: 234 },
    { time: "10:45", visitors: 198 },
    { time: "11:00", visitors: 267 },
    { time: "11:15", visitors: 312 },
    { time: "11:30", visitors: 289 },
    { time: "11:45", visitors: 345 },
    { time: "12:00", visitors: 398 },
    { time: "12:15", visitors: 356 },
    { time: "12:30", visitors: 412 },
    { time: "12:45", visitors: 378 },
  ];

  const maxVisitors = Math.max(...realtimeData.map((d) => d.visitors));

  const geographicData = [
    { country: "United States", flag: "🇺🇸", visitors: "15,234", percentage: 33 },
    { country: "United Kingdom", flag: "🇬🇧", visitors: "8,567", percentage: 19 },
    { country: "Germany", flag: "🇩🇪", visitors: "6,890", percentage: 15 },
    { country: "Canada", flag: "🇨🇦", visitors: "5,234", percentage: 11 },
    { country: "Australia", flag: "🇦🇺", visitors: "4,123", percentage: 9 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
              <BarChart3 className="text-indigo-600" size={32} />
              Advanced Analytics
            </h1>
            <p className="text-gray-500 mt-1">
              Real-time insights and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTimeRange("7days")}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === "7days"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange("30days")}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === "30days"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange("90days")}
              className={`px-4 py-2 rounded-lg transition-all ${
                timeRange === "90days"
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-300"
              }`}
            >
              90 Days
            </button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {keyMetrics.map((metric, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-lg flex items-center justify-center shadow-sm`}
              >
                <metric.icon className="text-white" size={24} />
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                  metric.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {metric.trend === "up" ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {metric.change}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{metric.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Real-time Traffic */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Real-time Traffic</h2>
              <p className="text-gray-500 text-sm mt-1">Active users over time</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">412 Active Now</span>
            </div>
          </div>
          <div className="flex items-end justify-between h-64 gap-2">
            {realtimeData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex items-end justify-center h-48">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.visitors / maxVisitors) * 100}%` }}
                    transition={{ delay: index * 0.05, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg relative group cursor-pointer hover:from-indigo-700 hover:to-purple-700 transition-all"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {data.visitors} visitors
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs text-gray-500">{data.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Traffic Sources</h2>
          <p className="text-gray-500 text-sm mb-6">Where visitors come from</p>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    {source.name}
                  </span>
                  <span className="text-sm text-gray-500">{source.visitors}</span>
                </div>
                <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${source.value}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className={`h-full ${source.color} rounded-full`}
                  ></motion.div>
                </div>
                <span className="text-xs text-gray-500 mt-1">{source.value}%</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Device Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-2">Device Statistics</h2>
          <p className="text-gray-500 text-sm mb-6">Visitor device breakdown</p>
          <div className="space-y-6">
            {deviceStats.map((device, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                  <device.icon className="text-indigo-600" size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {device.name}
                    </span>
                    <span className="text-sm text-gray-500">{device.count}</span>
                  </div>
                  <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${device.percentage}%` }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                    ></motion.div>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {device.percentage}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center gap-2 mb-2">
            <Globe className="text-indigo-600" size={24} />
            <h2 className="text-xl font-bold text-gray-800">Top Countries</h2>
          </div>
          <p className="text-gray-500 text-sm mb-6">Geographic visitor distribution</p>
          <div className="space-y-4">
            {geographicData.map((country, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <span className="text-2xl">{country.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {country.country}
                    </span>
                    <span className="text-sm text-gray-500">{country.visitors}</span>
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${country.percentage}%` }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Top Pages</h2>
          <p className="text-gray-500 text-sm mt-1">Most visited pages</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page Views
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Time
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bounce Rate
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topPages.map((page, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-indigo-600">
                      {page.page}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{page.views}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{page.avgTime}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{page.bounce}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
