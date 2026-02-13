"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  ShoppingCart,
  Search,
  ChevronDown,
  Eye,
  Printer,
} from "lucide-react";
import { motion } from "framer-motion";

const ReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month");
  const [selectedCategory, setSelectedCategory] = useState("All Reports");
  const [searchQuery, setSearchQuery] = useState("");

  const reportSummary = [
    {
      title: "Revenue Report",
      value: "$124,567",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      gradient: "from-emerald-400 to-green-600",
    },
    {
      title: "Sales Report",
      value: "3,456",
      change: "+8.2%",
      trend: "up",
      icon: ShoppingCart,
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      title: "Products Report",
      value: "892",
      change: "-2.1%",
      trend: "down",
      icon: Package,
      gradient: "from-purple-400 to-purple-600",
    },
    {
      title: "Users Report",
      value: "12,845",
      change: "+15.8%",
      trend: "up",
      icon: Users,
      gradient: "from-orange-400 to-red-600",
    },
  ];

  const recentReports = [
    {
      id: "RPT-001",
      name: "Monthly Sales Report",
      category: "Sales",
      date: "Dec 15, 2025",
      status: "Completed",
      size: "2.4 MB",
    },
    {
      id: "RPT-002",
      name: "User Activity Report",
      category: "Users",
      date: "Dec 14, 2025",
      status: "Completed",
      size: "1.8 MB",
    },
    {
      id: "RPT-003",
      name: "Revenue Analysis Q4",
      category: "Finance",
      date: "Dec 13, 2025",
      status: "Processing",
      size: "3.2 MB",
    },
    {
      id: "RPT-004",
      name: "Product Inventory Report",
      category: "Products",
      date: "Dec 12, 2025",
      status: "Completed",
      size: "1.5 MB",
    },
    {
      id: "RPT-005",
      name: "Customer Feedback Report",
      category: "Support",
      date: "Dec 11, 2025",
      status: "Completed",
      size: "890 KB",
    },
    {
      id: "RPT-006",
      name: "Marketing Campaign Report",
      category: "Marketing",
      date: "Dec 10, 2025",
      status: "Failed",
      size: "2.1 MB",
    },
    {
      id: "RPT-007",
      name: "Order Fulfillment Report",
      category: "Orders",
      date: "Dec 09, 2025",
      status: "Completed",
      size: "1.9 MB",
    },
    {
      id: "RPT-008",
      name: "Traffic Analytics Report",
      category: "Analytics",
      date: "Dec 08, 2025",
      status: "Completed",
      size: "2.7 MB",
    },
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
              <FileText className="text-indigo-600" size={32} />
              Reports Management
            </h1>
            <p className="text-gray-500 mt-1">
              Generate and manage your business reports
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2">
            <Download size={18} />
            Generate Report
          </button>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {reportSummary.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-gradient-to-br ${item.gradient} rounded-lg flex items-center justify-center shadow-sm`}
              >
                <item.icon className="text-white" size={24} />
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium ${
                  item.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.trend === "up" ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {item.change}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
            <p className="text-2xl font-bold text-gray-800 mt-1">{item.value}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Period Filter */}
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option>All Reports</option>
              <option>Sales</option>
              <option>Users</option>
              <option>Finance</option>
              <option>Products</option>
              <option>Support</option>
              <option>Marketing</option>
              <option>Orders</option>
              <option>Analytics</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>

          {/* Export Button */}
          <button className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-gray-700 font-medium">
            <Download size={18} />
            Export All
          </button>
        </div>
      </motion.div>

      {/* Reports Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Recent Reports</h2>
          <p className="text-gray-500 text-sm mt-1">
            View and download your generated reports
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentReports.map((report, index) => (
                <motion.tr
                  key={report.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {report.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{report.name}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                      {report.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{report.date}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${
                        report.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : report.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{report.size}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Printer size={18} />
                      </button>
                    </div>
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

export default ReportsPage;
