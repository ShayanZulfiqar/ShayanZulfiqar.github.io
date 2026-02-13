"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Search,
    RefreshCw,
    Mail,
    AlertCircle,
    Calendar,
    Users
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchSubscribers } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

const NewsletterPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: subscribers, loading, error } = useAppSelector((state) => state.landing.newsletterSubscribers);
    const { user, token } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchSubscribers());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchSubscribers());
        setRefreshing(false);
    };


    // Filter based on search
    const filteredItems = subscribers.filter((item) =>
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading subscribers...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                        Newsletter Subscribers
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Users size={16} className="text-blue-600" />
                        <span>View and manage your email audience</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                    >
                        <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
                        Refresh List
                    </button>
                    <div className="bg-blue-50 text-blue-700 px-4 py-2.5 rounded-xl font-medium border border-blue-100">
                        Total: {subscribers.length}
                    </div>
                </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-4"
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
            >
                {filteredItems.length === 0 ? (
                    <div className="text-center py-16">
                        <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Subscribers Found</h3>
                        <p className="text-gray-500 mb-6">Your email list is currently empty.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscribed Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <AnimatePresence>
                                    {filteredItems.map((item, index) => (
                                        <motion.tr
                                            key={item._id || item.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                                        <Mail size={18} />
                                                    </div>
                                                    <span className="font-semibold text-gray-900">{item.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <Calendar size={14} />
                                                    {new Date(item.subscribedAt).toLocaleString()}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default NewsletterPage;
