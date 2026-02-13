"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Star,
    Check,
    X,
    Trash2,
    Search,
    RefreshCw,
    MessageSquare,
    AlertCircle,
    User,
    Box,
    Flag
} from "lucide-react";
import {

    type Review
} from "@/types/landing";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchReviews, deleteReviewAction, updateReviewStatusAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

const ReviewsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: reviews, loading, error } = useAppSelector((state) => state.landing.reviews);
    const { user, token } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);
    const [filterStatus, setFilterStatus] = useState("All"); // All, Pending, Approved

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchReviews());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchReviews());
        setRefreshing(false);
    };

    // Handle Status Update (Approve/Reject)
    const handleStatusUpdate = async (id: string, newStatus: boolean) => {
        try {
            const resultAction = await dispatch(updateReviewStatusAction({ id, isApproved: newStatus }));
            if (updateReviewStatusAction.fulfilled.match(resultAction)) {
                // No need to fetchReviews, reducer handles update? Needs verification.
                // The reducer updates the state directly. So we are good.
                // But fetchReviews ensures consistency if we want.
                // dispatch(fetchReviews()); // Optional, state is updated optimistically/confirmed
                AlertDialog("Success", `Review ${newStatus ? "approved" : "rejected"}`, "success", 2000, false, false);
            } else {
                throw new Error(resultAction.payload as string || "Failed to update review status");
            }
        } catch (error: any) {
            AlertDialog("Error", error.message || "Failed to update status", "error", 3000);
        }
    };

    // Handle delete
    const handleDelete = (id: string) => {
        AlertDialog(
            "Delete Review",
            "Are you sure you want to delete this review? This action cannot be undone.",
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteReviewAction(id));
                    if (deleteReviewAction.fulfilled.match(resultAction)) {
                        AlertDialog("Success!", "Review deleted.", "success", 3000, false, false);
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete review");
                    }
                } catch (error: any) {
                    AlertDialog("Error!", error.message || "Failed to delete review", "error", 3000);
                }
            }
        );
    };

    // Filter logic
    const filteredItems = reviews.filter((item) => {
        const matchesSearch =
            item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.comment?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (typeof item.user === 'object' && item.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
            filterStatus === "All" ||
            (filterStatus === "Approved" && item.isApproved) ||
            (filterStatus === "Pending" && !item.isApproved);

        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading reviews...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                        Review Moderation
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <MessageSquare size={16} className="text-yellow-600" />
                        <span>Manage and moderate user reviews</span>
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
                    <div className="bg-yellow-50 text-yellow-700 px-4 py-2 rounded-xl font-medium border border-yellow-100">
                        Total: {reviews.length}
                    </div>
                </div>
            </motion.div>

            {/* Controls */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by content or user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>

                <div className="flex gap-2">
                    {["All", "Approved", "Pending"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${filterStatus === status
                                ? "bg-yellow-500 text-white shadow-md"
                                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
            >
                {filteredItems.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-md border border-gray-200">
                        <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Reviews Found</h3>
                        <p className="text-gray-500">No reviews match your current filters.</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item._id || item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`bg-white rounded-xl p-6 border transition-all ${item.isApproved ? "border-gray-200 shadow-sm" : "border-yellow-300 shadow-md bg-yellow-50/30"
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={16} fill={i < item.rating ? "currentColor" : "none"} strokeWidth={i < item.rating ? 0 : 1.5} className={i < item.rating ? "" : "text-gray-300"} />
                                                ))}
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">{item.title}</span>
                                            {!item.isApproved && (
                                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                                    <AlertCircle size={10} /> Pending
                                                </span>
                                            )}
                                            {item.reportCount > 0 && (
                                                <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                                                    <Flag size={10} /> Reported ({item.reportCount})
                                                </span>
                                            )}
                                        </div>

                                        <p className="text-gray-600 mb-3">{item.comment}</p>

                                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <User size={12} />
                                                {typeof item.user === 'object' ? item.user?.username || "User" : "User"}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Box size={12} />
                                                {typeof item.product === 'object' ? item.product?.title || "Product" : "Product"}
                                            </div>
                                            {item.isVerifiedPurchase && (
                                                <span className="text-green-600 flex items-center gap-1">
                                                    <Check size={12} /> Verified Purchase
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-2">
                                        {!item.isApproved ? (
                                            <button
                                                onClick={() => handleStatusUpdate(item._id || item.id!, true)}
                                                className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                                                title="Approve"
                                            >
                                                <Check size={18} />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleStatusUpdate(item._id || item.id!, false)}
                                                className="p-2 bg-gray-50 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
                                                title="Reject / Unapprove"
                                            >
                                                <X size={18} />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(item._id || item.id!)}
                                            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
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

export default ReviewsPage;
