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
    AlertCircle,
    Zap,
    Newspaper, // Using Newspaper as generic service icon representation in header
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchServices, deleteServiceAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

// Helper function to get Lucide icon component by name
const getLucideIcon = (iconName: string) => {
    if (!iconName) return null;

    // @ts-ignore - Dynamic icon access
    const IconComponent = LucideIcons[iconName];
    return IconComponent || null;
};

const ServicesPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: services, loading, error } = useAppSelector((state) => state.landing.services);
    const { user, token } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchServices());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchServices());
        setRefreshing(false);
    };


    // Handle refresh

    // Handle delete
    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete Service",
            `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteServiceAction(id));
                    if (deleteServiceAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Success!",
                            "Service deleted successfully.",
                            "success",
                            3000,
                            false,
                            false
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete service");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to delete service",
                        "error",
                        3000,
                        false,
                        false
                    );
                }
            }
        );
    };

    // Filter services based on search
    const filteredServices = services.filter((service) =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading services...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                        Services Management
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Newspaper size={16} className="text-purple-600" />
                        <span>Manage your offered services</span>
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
                        onClick={() => router.push("/superadmin/content/servicespage/add")}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Service
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
                        placeholder="Search services by title or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <p className="text-purple-600 text-sm font-semibold mb-1">Total Services</p>
                    <p className="text-3xl font-bold text-purple-700">{services.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                    <p className="text-blue-600 text-sm font-semibold mb-1">Filtered Results</p>
                    <p className="text-3xl font-bold text-blue-700">{filteredServices.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <p className="text-green-600 text-sm font-semibold mb-1">Last Updated</p>
                    <p className="text-lg font-bold text-green-700">
                        {services.length > 0 ? new Date(services[0].updatedAt || "").toLocaleDateString() : "N/A"}
                    </p>
                </div>
            </motion.div>

            {/* Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
            >
                {filteredServices.length === 0 ? (
                    <div className="text-center py-16">
                        <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Services Found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first service"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => router.push("/superadmin/content/servicespage/add")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                <Plus size={20} />
                                Add Your First Service
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                    <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Icon</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Created Date</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredServices.map((service, index) => {
                                        const IconComponent = service.icon ? getLucideIcon(service.icon) : null;

                                        return (
                                            <motion.tr
                                                key={service._id || service.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{index + 1}</td>
                                                <td className="px-6 py-4 text-center">
                                                    {IconComponent ? (
                                                        <div className="flex items-center justify-center">
                                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                                <IconComponent size={20} className="text-purple-600" />
                                                            </div>
                                                        </div>
                                                    ) : service.icon ? (
                                                        <span className="text-xs text-gray-400 italic">{service.icon}</span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-gray-800">{service.title}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 line-clamp-2" title={service.description}>
                                                        {service.description}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-center text-sm text-gray-600">
                                                    {new Date(service.createdAt || "").toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => router.push(`/superadmin/content/servicespage/edit/${service._id || service.id}`)}
                                                            className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                                                        >
                                                            <Edit size={16} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(service._id || service.id!, service.title)}
                                                            className="flex items-center gap-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                                                        >
                                                            <Trash2 size={16} />
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        );
                                    })}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ServicesPage;
