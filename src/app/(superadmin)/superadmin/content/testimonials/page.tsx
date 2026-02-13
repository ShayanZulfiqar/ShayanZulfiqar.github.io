"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    Edit,
    Trash2,
    RefreshCw,
    MessageSquare,
    AlertCircle,
    Star,
    Quote
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchTestimonials, deleteTestimonialAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";
import { imageUrl } from "@/services/BaseUrl";

const TestimonialsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: items, loading, error } = useAppSelector((state) => state.landing.testimonials);
    const { user, token } = useAppSelector((state) => state.auth);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchTestimonials());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchTestimonials());
        setRefreshing(false);
    };


    // Handle delete
    const handleDelete = (id: string, name: string) => {
        AlertDialog(
            "Delete Testimonial",
            `Are you sure you want to delete the testimonial from "${name}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteTestimonialAction(id));
                    if (deleteTestimonialAction.fulfilled.match(resultAction)) {
                        AlertDialog("Success!", "Testimonial deleted.", "success", 3000, false, false);
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete testimonial");
                    }
                } catch (error: any) {
                    AlertDialog("Error!", error.message || "Failed to delete testimonial", "error", 3000);
                }
            }
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading testimonials...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Testimonials</h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <MessageSquare size={16} className="text-indigo-600" />
                        <span>Showcase client success stories</span>
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
                        onClick={() => router.push("/superadmin/content/testimonials/add-edit")}
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Testimonial
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
                            <div className="p-6 flex-1">
                                <Quote className="text-indigo-100 fill-indigo-100 mb-4" size={32} />

                                <p className="text-gray-600 italic mb-6 line-clamp-4">&quot;{item.text}&quot;</p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                        {item.image && (item.image.startsWith('http') || item.image.startsWith('upload')) ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={`${imageUrl}/${item.image.startsWith('/') ? item.image.substring(1) : item.image}`} alt={item.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className={`w-full h-full bg-gradient-to-br ${item.image.includes('from') ? item.image : 'from-gray-200 to-gray-300'}`} />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                                        <p className="text-xs text-gray-500">{item.role} @ {item.company}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 mt-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < item.rating ? "#F59E0B" : "none"} className={i < item.rating ? "text-yellow-500" : "text-gray-300"} />
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
                                <span className="text-xs font-medium px-2 py-1 bg-white border border-gray-200 rounded-md text-gray-600">
                                    {item.project || "General"}
                                </span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => router.push(`/superadmin/content/testimonials/add-edit?id=${item._id || item.id}`)}
                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id || item.id!, item.name)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
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
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Testimonials Found</h3>
                    <p className="text-gray-500">Collect feedback to build trust.</p>
                </div>
            )}
        </div>
    );
};

export default TestimonialsPage;
