"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    Edit,
    Trash2,
    Search,
    RefreshCw,
    Target,
    AlertCircle,
    Calendar,
    BarChart2,
    Layers,
    Type
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchFutureGoals, deleteFutureGoalAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

const FutureGoalsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: goals, loading, error } = useAppSelector((state) => state.landing.futureGoals);
    const { user, token } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchFutureGoals());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchFutureGoals());
        setRefreshing(false);
    };


    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete Future Goal",
            `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteFutureGoalAction(id));
                    if (deleteFutureGoalAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Success!",
                            "Goal deleted successfully.",
                            "success",
                            3000,
                            false,
                            false
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete item");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to delete item",
                        "error",
                        3000,
                        false,
                        false
                    );
                }
            }
        );
    };

    // Filter based on search
    const filteredItems = goals.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.target.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading future goals...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-green-600 bg-clip-text text-transparent mb-2">
                        Future Goals
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Target size={16} className="text-blue-600" />
                        <span>Track and manage organizational objectives</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                    >
                        <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
                        Refresh
                    </button>

                    <button
                        onClick={() => router.push("/superadmin/content/future-goals/add-edit")}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add New Goal
                    </button>
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
                        placeholder="Search by title, description, or target year..."
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
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Goals Found</h3>
                        <p className="text-gray-500 mb-6">Start by adding your first future goal.</p>
                        {!searchTerm && (
                            <button
                                onClick={() => router.push("/superadmin/content/future-goals/add-edit")}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                            >
                                <Plus size={20} />
                                Create Goal
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Goal Info</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Target</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Metrics</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Visuals</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
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
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-gray-900">{item.title}</span>
                                                    <span className="text-sm text-gray-500 truncate max-w-xs" title={item.description}>
                                                        {item.description}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                    <Calendar size={12} />
                                                    {item.target}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {item.metrics.slice(0, 2).map((m, idx) => (
                                                        <div key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                                            <span className="font-medium">{m.label}:</span> {m.value}
                                                        </div>
                                                    ))}
                                                    {item.metrics.length > 2 && (
                                                        <span className="text-xs text-gray-400 italic">+{item.metrics.length - 2} more</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="text-xs">
                                                        <span className="block text-gray-500">Icon: <span className="text-gray-900">{item.icon}</span></span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => router.push(`/superadmin/content/future-goals/add-edit?id=${item._id || item.id}`)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id || item.id!, item.title)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
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

export default FutureGoalsPage;
