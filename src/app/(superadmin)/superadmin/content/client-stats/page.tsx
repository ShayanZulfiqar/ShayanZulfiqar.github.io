"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    Edit,
    Trash2,
    RefreshCw,
    AlertCircle,
    BarChart3,
    Search
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchClientStats, deleteClientStatAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

const ClientStatsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: items, loading, error } = useAppSelector((state) => state.landing.clientStats);
    const { user, token } = useAppSelector((state) => state.auth);
    const [refreshing, setRefreshing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchClientStats());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchClientStats());
        setRefreshing(false);
    };


    const handleDelete = (id: string, label: string) => {
        AlertDialog(
            "Delete Client Stat",
            `Are you sure you want to delete "${label}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteClientStatAction(id));
                    if (deleteClientStatAction.fulfilled.match(resultAction)) {
                        AlertDialog("Success!", "Client stat deleted.", "success", 3000, false, false);
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete client stat");
                    }
                } catch (error: any) {
                    AlertDialog("Error!", error.message || "Failed to delete item", "error", 3000);
                }
            }
        );
    };

    const filteredItems = items.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.value.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading client stats...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Client Stats
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <BarChart3 size={16} className="text-blue-600" />
                        <span>Manage key performance indicators and statistics</span>
                    </p>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search stats..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                        />
                    </div>

                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                        title="Refresh"
                    >
                        <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
                    </button>

                    <button
                        onClick={() => router.push("/superadmin/content/client-stats/add-edit")}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold whitespace-nowrap"
                    >
                        <Plus size={20} />
                        Add Stat
                    </button>
                </div>
            </motion.div>

            {/* Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <AnimatePresence>
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item._id || item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-xl transition-all overflow-hidden group p-6 flex flex-col justify-between"
                        >
                            <div className="text-center space-y-2 mb-6">
                                <h3 className="text-4xl font-black text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                    {item.value}
                                </h3>
                                <p className="text-gray-500 font-medium uppercase tracking-wider text-sm">
                                    {item.label}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                                <span className="text-[10px] text-gray-400">
                                    Added: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Just now"}
                                </span>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => router.push(`/superadmin/content/client-stats/add-edit?id=${item._id || item.id}`)}
                                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id || item.id!, item.label)}
                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
                <div className="text-center py-24 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
                    <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {searchTerm ? "No matching stats found" : "No Client Stats Yet"}
                    </h3>
                    <p className="text-gray-500 max-w-xs mx-auto">
                        {searchTerm ? "Try searching for a different value or label." : "Add your first performance metric to showcase your achievements."}
                    </p>
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm("")}
                            className="mt-4 text-blue-600 hover:underline font-medium"
                        >
                            Clear search
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ClientStatsPage;
