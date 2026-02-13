"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    Edit,
    Trash2,
    RefreshCw,
    Leaf,
    AlertCircle,
    Target,
    Activity,
    BarChart2
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchSustainabilityItems, deleteSustainabilityItemAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

const SustainabilityPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: items, loading, error } = useAppSelector((state) => state.landing.sustainabilityItems);
    const { user, token } = useAppSelector((state) => state.auth);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchSustainabilityItems());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchSustainabilityItems());
        setRefreshing(false);
    };


    // Handle delete
    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete Commitment",
            `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteSustainabilityItemAction(id));
                    if (deleteSustainabilityItemAction.fulfilled.match(resultAction)) {
                        AlertDialog("Success!", "Commitment deleted.", "success", 3000, false, false);
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
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading sustainability goals...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                        Sustainability Commitments
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Leaf size={16} className="text-green-600" />
                        <span>Track environmental impact and goals</span>
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
                        onClick={() => router.push("/superadmin/content/sustainability-commitment/add-edit")}
                        className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Commitment
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
                            className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition-all overflow-hidden group"
                        >
                            <div className={`h-2 w-full bg-gradient-to-r ${item.color || 'from-green-500 to-emerald-500'}`} />

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl bg-gray-50 text-gray-700`}>
                                        {/* Since icon is a string name, we might not render dynamic Lucide here easily without mapping. 
                                            We'll just show a generic icon or the name if possible, or attempt to use a dynamic import/map if needed.
                                            For now, using generic Leaf. */}
                                        <Leaf size={24} className="text-green-600" />
                                    </div>
                                    <span className="text-xs font-bold px-2 py-1 bg-green-50 text-green-700 rounded-lg border border-green-100">
                                        Target: {item.target}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm mb-6 line-clamp-2">{item.description}</p>

                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="flex justify-between text-xs font-semibold text-gray-600 mb-1">
                                            <span>Progress</span>
                                            <span>{item.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full bg-gradient-to-r ${item.color || 'from-green-500 to-emerald-500'}`}
                                                style={{ width: `${item.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {item.metrics && item.metrics.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {item.metrics.slice(0, 3).map((m, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                                                    <Activity size={12} className="text-blue-500" />
                                                    <span className="text-xs font-medium text-gray-700">
                                                        {m.label}: <span className="text-gray-900 font-bold">{m.value}</span>
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => router.push(`/superadmin/content/sustainability-commitment/add-edit?id=${item._id || item.id}`)}
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
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {items.length === 0 && (
                <div className="text-center py-16">
                    <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Commitments Found</h3>
                    <p className="text-gray-500">Add a sustainability goal to track your impact.</p>
                </div>
            )}
        </div>
    );
};

export default SustainabilityPage;
