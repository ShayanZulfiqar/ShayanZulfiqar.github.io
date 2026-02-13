"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    Edit,
    Trash2,
    RefreshCw,
    Map,
    AlertCircle,
    BookOpen,
    Flag
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchOurJourneys, deleteOurJourneyAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

const OurJourneyPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: journeys, loading, error } = useAppSelector((state) => state.landing.ourJourneys);
    const { user, token } = useAppSelector((state) => state.auth);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchOurJourneys());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchOurJourneys());
        setRefreshing(false);
    };


    // Handle delete
    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete Journey Section",
            `Are you sure you want to delete the journey section "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteOurJourneyAction(id));
                    if (deleteOurJourneyAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Success!",
                            "Journey section deleted successfully.",
                            "success",
                            3000,
                            false,
                            false
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete section");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to delete section",
                        "error",
                        3000,
                        false,
                        false
                    );
                }
            }
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading journey sections...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                        Our Journey
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Map size={16} className="text-blue-600" />
                        <span>Manage company history and milestones</span>
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
                        onClick={() => router.push("/superadmin/content/our-journey/add-edit")}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Section
                    </button>
                </div>
            </motion.div>

            {/* List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid gap-6"
            >
                {journeys.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
                        <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Journey Sections Found</h3>
                        <p className="text-gray-500 mb-6">Create your first journey section to tell your story.</p>
                        <button
                            onClick={() => router.push("/superadmin/content/our-journey/add-edit")}
                            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                        >
                            <Plus size={20} />
                            Create Section
                        </button>
                    </div>
                ) : (
                    <AnimatePresence>
                        {journeys.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all"
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full">
                                                    {item.sectionTitle}
                                                </span>
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.mainTitle}</h2>
                                            <p className="text-gray-600">{item.subtitle}</p>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                <BookOpen size={16} className="text-blue-500" />
                                                <span>{item.storyParagraphs?.length || 0} Paragraphs</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                <Flag size={16} className="text-teal-500" />
                                                <span>{item.milestones?.length || 0} Milestones</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                                <AlertCircle size={16} className="text-purple-500" />
                                                <span>{item.visualSection?.floatingStats?.length || 0} Stats</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex md:flex-col justify-end gap-3 min-w-[120px]">
                                        <button
                                            onClick={() => router.push(`/superadmin/content/our-journey/add-edit?id=${item._id}`)}
                                            className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                                        >
                                            <Edit size={18} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id!, item.mainTitle)}
                                            className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                                        >
                                            <Trash2 size={18} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </motion.div>
        </div>
    );
};

export default OurJourneyPage;
