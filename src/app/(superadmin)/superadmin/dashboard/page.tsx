"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  TrendingUp, Users, ShoppingCart, DollarSign, Package, Eye, ArrowUp,
  ArrowDown, Activity, Globe, Star, FileText, Image, Video, Newspaper,
  ChevronDown, ChevronUp, BarChart3, PieChart, TrendingDown, Clock,
  ShoppingBag, CreditCard, Target, LogOut, Shield, RefreshCw, User
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";
import {
  fetchDashboardOverview,
  fetchSalesStats,
  fetchUserStats,
  fetchProductStats
} from "@/store/slices/statsSlice";
import AlertDialog from "@/utils/AlertDialog";

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const { overview, sales, users, products } = useAppSelector((state) => state.stats);
  const [timeRange, setTimeRange] = useState<"daily" | "monthly">("daily");
  const [contentManagementOpen, setContentManagementOpen] = useState(false);

  useEffect(() => {
    // Check if user is authenticated and has superadmin role
    if (!token || !user) {
      router.push("/auth/superadmin-login");
      return;
    }

    if (user.role !== "superAdmin") {
      AlertDialog("Unauthorized!", "You don't have permission to access this page.", "error", 3000, false, false);
      setTimeout(() => {
        router.push("/home");
      }, 3000);
      return;
    }

    // Fetch stats
    dispatch(fetchDashboardOverview());
    dispatch(fetchSalesStats());
    dispatch(fetchUserStats());
    dispatch(fetchProductStats());
  }, [token, user, router, dispatch]);

  const handleLogout = () => {
    AlertDialog(
      "Logout",
      "Are you sure you want to logout?",
      "warning",
      0,
      true,
      true,
      "Yes, Logout",
      "Cancel",
      () => {
        dispatch(logout());
        router.push("/auth/superadmin-login");
      }
    );
  };

  const handleRefresh = () => {
    dispatch(fetchDashboardOverview());
    dispatch(fetchSalesStats());
    dispatch(fetchUserStats());
    dispatch(fetchProductStats());
  };

  const isSyncing = overview.loading || sales.loading || users.loading || products.loading;

  // Show loading while checking auth or fetching overview
  if (!token || !user || user.role !== "superAdmin") {
    return (
      <div className="flex justify-center items-center bg-slate-900 min-h-screen">
        <div className="text-center">
          <div className="mx-auto mb-4 border-4 border-indigo-500 border-t-transparent rounded-full w-16 h-16 animate-spin" />
          <p className="text-white text-lg font-medium">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Stats Data with New Premium Colors
  const stats = [
    {
      title: "Total Revenue", value: `$${overview.data?.totalRevenue?.toLocaleString() || '0'}`,
      subValue: "Current period earnings",
      change: "+12.5%", trend: "up", icon: DollarSign,
      gradient: "from-indigo-600 to-violet-700",
      bgGradient: "from-white to-slate-50",
      shadowColor: "shadow-indigo-500/10", percentage: 85,
    },
    {
      title: "Total Users", value: overview.data?.totalUsers?.toLocaleString() || '0',
      subValue: "Registered customers",
      change: "+18.2%", trend: "up", icon: Users,
      gradient: "from-violet-600 to-purple-800",
      bgGradient: "from-white to-slate-50",
      shadowColor: "shadow-violet-500/10", percentage: 90,
    },
    {
      title: "Total Orders", value: overview.data?.totalOrders?.toLocaleString() || '0',
      subValue: "Processed transactions",
      change: "+8.3%", trend: "up", icon: ShoppingBag,
      gradient: "from-indigo-800 to-purple-900",
      bgGradient: "from-white to-slate-50",
      shadowColor: "shadow-purple-500/10", percentage: 75,
    },
    {
      title: "Active Products", value: overview.data?.totalProducts?.toLocaleString() || '0',
      subValue: "Live in store",
      change: "-3.1%", trend: "down", icon: Package,
      gradient: "from-slate-700 to-slate-900",
      bgGradient: "from-white to-slate-50",
      shadowColor: "shadow-slate-500/10", percentage: 60,
    },
  ];

  // Logic for analytical charts
  const salesChartData = timeRange === "daily"
    ? (sales.data?.weekly || []).map(item => ({ label: item._id, value: item.sales || 0, secondary: item.orders || 0 }))
    : (sales.data?.monthly || []).map(item => ({ label: item._id, value: item.sales || 0, secondary: item.orders || 0 }));

  const userChartData = timeRange === "daily"
    ? (users.data?.weekly || []).map(item => ({ label: item._id.split('-').slice(1).join('/'), value: item.count || 0 }))
    : (users.data?.monthly || []).map(item => ({ label: item._id.split('-').slice(1).join('/'), value: item.count || 0 }));

  const maxSales = Math.max(...salesChartData.map(d => d.value)) || 1;
  const maxUsers = Math.max(...userChartData.map(d => d.value)) || 1;

  // Products & Categories
  const mappedTopProducts = (products.data?.topProducts || []).map(p => ({
    name: p.name,
    sales: p.totalSold,
    revenue: `$${p.totalRevenue.toLocaleString()}`,
    trend: Math.min(100, (p.totalSold / 50) * 100),
    image: "🛒",
    category: "General"
  }));

  const categoryData = (products.data?.categoryDistribution || []).map((cat, index) => {
    const colors = ["#4F46E5", "#7C3AED", "#4338CA", "#6366F1", "#8B5CF6"];
    return {
      name: cat.categoryName,
      value: cat.count,
      color: colors[index % colors.length]
    };
  });

  const totalProductCount = categoryData.reduce((acc, curr) => acc + curr.value, 0) || 1;
  const categoryChartData = categoryData.map(c => ({
    ...c,
    percentage: ((c.value / totalProductCount) * 100).toFixed(1)
  }));

  return (
    <div className="space-y-8 pb-12 bg-[#F8FAFC]">
      {/* Premium Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="flex lg:flex-row flex-col justify-between items-start lg:items-center gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex justify-center items-center bg-gradient-to-br from-indigo-600 to-violet-700 shadow-2xl rounded-2xl w-16 h-16 transform transition-transform hover:rotate-3">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 bg-cyan-400 w-4 h-4 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div>
            <h1 className="bg-clip-text bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-800 font-extrabold text-transparent text-4xl tracking-tight">
              Dashboard Analytics
            </h1>
            <div className="flex items-center gap-4 mt-1">
              <p className="font-medium text-slate-500 text-sm">Overview for {user?.name}</p>
              <div className="flex items-center gap-2 px-2 py-0.5 bg-slate-100 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <Clock size={12} />
                Live Sync
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
            <button onClick={() => setTimeRange("daily")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${timeRange === "daily" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}>
              Today
            </button>
            <button onClick={() => setTimeRange("monthly")}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${timeRange === "monthly" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}>
              Monthly
            </button>
          </div>
          <motion.button whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={isSyncing}
            className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 px-5 py-3 rounded-2xl font-bold text-indigo-600 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={18} className={isSyncing ? "animate-spin" : ""} />
            Sync
          </motion.button>
          <button
            onClick={handleLogout}
            className="bg-slate-900 hover:bg-slate-800 px-6 py-3 rounded-2xl font-bold text-white transition-all shadow-lg hover:shadow-slate-200"
          >
            Sign Out
          </button>
        </div>
      </motion.div>

      {/* Hero Stats Grid */}
      <div className="gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`group relative overflow-hidden bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500`}>
            <div className="z-10 relative">
              <div className="flex justify-between items-center mb-6">
                <div className={`flex justify-center items-center bg-gradient-to-br ${stat.gradient} w-12 h-12 rounded-xl shadow-lg transform group-hover:-translate-y-1 transition-transform`}>
                  <stat.icon className="text-white" size={24} />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold leading-none ${stat.trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>
                  {stat.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {stat.change}
                </div>
              </div>
              <p className="font-semibold text-slate-400 text-xs uppercase tracking-[0.1em]">{stat.title}</p>
              <h2 className="mt-1 font-black text-4xl text-slate-800 tracking-tight">{stat.value}</h2>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${stat.percentage}%` }}
                    className={`h-full bg-gradient-to-r ${stat.gradient}`} />
                </div>
                <span className="text-[10px] font-bold text-slate-400">{stat.percentage}%</span>
              </div>
            </div>
            {/* Subtle background glow */}
            <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-br ${stat.gradient} opacity-[0.03] rounded-full blur-3xl group-hover:opacity-10 transition-opacity`} />
          </motion.div>
        ))}
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-3">
        {/* Main Revenue Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="font-bold text-slate-800 text-xl tracking-tight">Revenue Analytics</h3>
              <p className="text-slate-400 text-sm">Performance tracking across the {timeRange === 'daily' ? 'week' : 'year'}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Revenue
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 ml-4">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                Orders
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end gap-3 h-[280px] px-2 relative z-10">
            {salesChartData.map((item, index) => {
              const h = (item.value / maxSales) * 100;
              return (
                <div key={index} className="flex flex-col flex-1 items-center gap-4 h-full">
                  <div className="group relative flex justify-center items-end w-full h-full">
                    {/* Tooltip */}
                    <div className="bottom-full left-1/2 z-20 absolute mb-4 opacity-0 group-hover:opacity-100 pointer-events-none transition-all transform -translate-x-1/2 group-hover:-translate-y-1">
                      <div className="bg-slate-900 px-4 py-2.5 rounded-2xl shadow-2xl text-white text-xs whitespace-nowrap border border-slate-700">
                        <div className="mb-1 font-bold text-indigo-400">{item.label}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-300">Revenue:</span>
                          <span className="font-bold font-mono">${item.value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-slate-300">Orders:</span>
                          <span className="font-bold font-mono text-cyan-400">{item.secondary}</span>
                        </div>
                      </div>
                      <div className="mx-auto border-4 border-transparent border-t-slate-900 w-0 h-0" />
                    </div>

                    {/* Secondary metric (Orders) as a thin pulse line behind */}
                    <motion.div initial={{ height: 0 }} animate={{ height: `${(item.secondary / (maxSales / 1000)) * 5}%` }}
                      className="absolute bottom-0 bg-cyan-400/20 w-1/3 rounded-t-lg blur-[2px]" />

                    {/* Primary Bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: index * 0.05, duration: 0.8, ease: "circOut" }}
                      className="relative bg-gradient-to-t from-indigo-600 via-violet-600 to-indigo-500 hover:to-indigo-400 shadow-lg hover:shadow-indigo-500/20 rounded-t-2xl w-full group-hover:scale-x-105 transition-all cursor-crosshair">
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  </div>
                  <span className="font-bold text-[10px] text-slate-400 uppercase tracking-tighter">{item.label}</span>
                </div>
              );
            })}
          </div>
          {/* Decorative grid lines */}
          <div className="absolute inset-x-8 bottom-[135px] border-b border-dashed border-slate-100 pointer-events-none" />
          <div className="absolute inset-x-8 bottom-[205px] border-b border-dashed border-slate-100 pointer-events-none" />
        </motion.div>

        {/* User Growth Analytics */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="z-10 relative">
            <h3 className="font-bold text-white text-xl tracking-tight">New Signups</h3>
            <p className="text-indigo-300 text-sm">Customer acquisition flow</p>

            <div className="mt-8 space-y-6">
              {userChartData.length > 0 ? userChartData.slice(0, 5).map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="bg-slate-800 p-2.5 rounded-xl border border-slate-700">
                    <User className="text-indigo-400" size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-bold text-slate-300 text-xs">{item.label}</span>
                      <span className="font-black text-indigo-400 text-sm">{item.value}</span>
                    </div>
                    <div className="bg-slate-800 rounded-full h-1 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(item.value / maxUsers) * 100}%` }}
                        className="bg-indigo-500 h-full" />
                    </div>
                  </div>
                </div>
              )) : (
                <p className="py-10 text-center text-slate-500 italic">No recent signups detected</p>
              )}
            </div>

            <div className="bg-indigo-500/10 mt-10 p-5 rounded-2xl border border-indigo-500/20">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-cyan-400" size={20} />
                <p className="font-bold text-indigo-100 text-sm">Monthly Target: 85%</p>
              </div>
            </div>
          </div>
          {/* Background sparkles */}
          <div className="top-10 right-10 absolute opacity-20 text-cyan-400 blur-sm">✨</div>
          <div className="bottom-20 left-10 absolute opacity-10 text-indigo-400">✨</div>
        </motion.div>
      </div>

      <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
        {/* Category breakdown redesigned */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 text-xl tracking-tight">Market Distribution</h3>
            <PieChart className="text-violet-500" size={20} />
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-5">
              {categoryChartData.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-3 h-3 rounded-full mt-0.5" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-600 text-xs tracking-tight">{item.name}</span>
                      <span className="font-black text-slate-800 text-xs">{item.percentage}%</span>
                    </div>
                    <div className="bg-slate-50 group-hover:bg-slate-100 rounded-full h-1 transition-colors overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.percentage}%` }}
                        className="h-full" style={{ backgroundColor: item.color }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center items-center">
              <div className="relative flex justify-center items-center h-48 w-48">
                {/* This is a simple visual representation of distribution */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="transparent" stroke="#f1f5f9" strokeWidth="12" />
                  <motion.circle cx="96" cy="96" r="80" fill="transparent" stroke="#4F46E5" strokeWidth="12"
                    strokeDasharray="502" initial={{ strokeDashoffset: 502 }} animate={{ strokeDashoffset: 150 }}
                    strokeLinecap="round" />
                </svg>
                <div className="absolute text-center">
                  <p className="font-black text-slate-800 text-3xl">{categoryChartData.length}</p>
                  <p className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">Sectors</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-slate-800 text-xl tracking-tight">Top Performers</h3>
            <Star className="text-indigo-500" size={20} />
          </div>

          <div className="space-y-5">
            {mappedTopProducts.slice(0, 4).map((item, index) => (
              <div key={index} className="flex items-center gap-5 p-4 bg-slate-50/50 hover:bg-white rounded-3xl border border-transparent hover:border-slate-100 transition-all group">
                <div className="flex justify-center items-center bg-white shadow-sm rounded-2xl w-14 h-14 font-bold text-2xl border border-slate-100 group-hover:scale-105 transition-transform">
                  {item.image}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-slate-800 text-sm truncate">{item.name}</h4>
                    <span className="font-black text-indigo-700 text-sm">{item.revenue}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-slate-400 text-[10px] uppercase tracking-widest">{item.category}</span>
                    <div className="flex-1 bg-slate-200/50 rounded-full h-1 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.trend}%` }}
                        className="bg-indigo-500 h-full" />
                    </div>
                    <span className="font-bold text-slate-400 text-[10px]">{item.sales} sold</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content Shortcuts Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-indigo-600 p-1 rounded-[3rem] shadow-2xl">
        <div className="bg-indigo-600 px-10 py-10 rounded-[2.8rem]">
          <div className="flex justify-between items-center mb-10">
            <div className="text-white">
              <h2 className="font-black text-3xl tracking-tight">Content Ecosystem</h2>
              <p className="text-indigo-200 mt-1">Quick access to manage your digital assets</p>
            </div>
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
              <Globe className="text-white" size={24} />
            </div>
          </div>

          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Marketplace', count: '1.2k', link: '/superadmin/shop', icon: ShoppingBag, color: 'bg-indigo-500' },
              { label: 'Journal', count: '482', link: '/superadmin/content/blog', icon: Newspaper, color: 'bg-violet-500' },
              { label: 'Media Hub', count: '2.5k', link: '/superadmin/content/media', icon: Image, color: 'bg-cyan-500' },
              { label: 'Connect', count: '942', link: '/superadmin/content/messages', icon: FileText, color: 'bg-slate-800' }
            ].map((item, index) => (
              <motion.a href={item.link} key={index} whileHover={{ y: -8 }}
                className="bg-white/5 hover:bg-white/10 p-6 rounded-[2rem] border border-white/10 transition-colors group cursor-pointer">
                <div className={`w-12 h-12 ${item.color} rounded-xl shadow-lg flex items-center justify-center mb-6`}>
                  <item.icon className="text-white" size={20} />
                </div>
                <h4 className="text-white font-bold text-lg">{item.label}</h4>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-indigo-300 font-bold text-4xl">{item.count}</span>
                  <ArrowUp className="text-cyan-400 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
