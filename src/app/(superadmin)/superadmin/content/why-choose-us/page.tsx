"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    Edit,
    Trash2,
    RefreshCw,
    HelpCircle,
    AlertCircle,
    Copy,
    Palette,
    Zap
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchWhyChooseUsItems, deleteWhyChooseUsItemAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

const WhyChooseUsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: items, loading, error } = useAppSelector((state) => state.landing.whyChooseUsItems);
    const { user, token } = useAppSelector((state) => state.auth);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchWhyChooseUsItems());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchWhyChooseUsItems());
        setRefreshing(false);
    };


    // Handle delete
    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete Feature",
            `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteWhyChooseUsItemAction(id));
                    if (deleteWhyChooseUsItemAction.fulfilled.match(resultAction)) {
                        AlertDialog("Success!", "Feature deleted.", "success", 3000, false, false);
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete item");
                    }
                } catch (error: any) {
                    AlertDialog("Error!", error.message || "Failed to delete item", "error", 3000);
                }
            }
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading features...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                        Why Choose Us
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <HelpCircle size={16} className="text-cyan-600" />
                        <span>Manage unique selling propositions</span>
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
                        onClick={() => router.push("/superadmin/content/why-choose-us/add-edit")}
                        className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Feature
                    </button>
                </div>
            </motion.div>

            {/* Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                    {items.map((item, index) => (
                        <motion.div
                            key={item._id || item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all overflow-hidden flex flex-col"
                        >
                            <div className={`h-2 w-full bg-gradient-to-r ${item.color || 'from-gray-300 to-gray-400'}`} />

                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.bgColor || 'bg-gray-100'}`}>
                                        {/* Placeholder for Lucide Icon name */}
                                        <Zap size={24} className="text-gray-700" />
                                    </div>
                                    <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                        {item.icon}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-3">{item.description}</p>

                                <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                                    <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                        <Palette size={10} /> {item.color ? "Gradient Set" : "No Color"}
                                    </span>
                                    {item.delay > 0 && (
                                        <span className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
                                            <Zap size={10} /> {item.delay}ms Delay
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50">
                                <button
                                    onClick={() => router.push(`/superadmin/content/why-choose-us/add-edit?id=${item._id || item.id}`)}
                                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit size={18} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id || item.id!, item.title)}
                                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {items.length === 0 && (
                <div className="text-center py-16">
                    <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Features Found</h3>
                    <p className="text-gray-500">Add key selling points here.</p>
                </div>
            )}
        </div>
    );
};

export default WhyChooseUsPage;
