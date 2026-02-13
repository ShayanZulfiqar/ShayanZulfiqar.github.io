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
    Eye,
    AlertCircle,
    Building2,
    ImageIcon
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchClientBrands, deleteClientBrandAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";
import { imageUrl } from "@/services/BaseUrl";

// Add missing function declaration
const convertGradientToCSS = (gradient: string): string => {
    if (!gradient) {
        return "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)";
    }

    if (gradient.startsWith('#') || gradient.startsWith('rgb') || gradient.startsWith('hsl')) {
        return gradient;
    }

    const fromMatch = gradient.match(/from-(\w+-\d+)/);
    const toMatch = gradient.match(/to-(\w+-\d+)/);

    if (fromMatch && toMatch) {
        const colorMap: Record<string, string> = {
            'blue-500': '#3b82f6',
            'cyan-500': '#06b6d4',
            'purple-500': '#a855f7',
            'pink-500': '#ec4899',
            'green-500': '#22c55e',
            'red-500': '#ef4444',
            'yellow-500': '#eab308',
            'orange-500': '#f97316',
        };

        const fromColor = colorMap[fromMatch[1]] || '#3b82f6';
        const toColor = colorMap[toMatch[1]] || '#06b6d4';

        return `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`;
    }

    return gradient;
};

interface ClientBrand {
    id?: string;
    _id?: string;
    name: string;
    industry: string;
    logo: string;
    gradient: string;
    createdAt?: string;
    updatedAt?: string;
}

const ClientBrandsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: clientBrands, loading, error } = useAppSelector((state) => state.landing.clientBrands);
    const { user, token } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchClientBrands());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchClientBrands());
        setRefreshing(false);
    };


    const handleDelete = (id: string, name: string) => {
        AlertDialog(
            "Delete Client Brand",
            `Are you sure you want to delete "${name}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteClientBrandAction(id));
                    if (deleteClientBrandAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Success!",
                            "Client brand deleted successfully.",
                            "success",
                            3000,
                            false,
                            false
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete client brand");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to delete client brand",
                        "error",
                        3000,
                        false,
                        false
                    );
                }
            }
        );
    };

    // Filter client brands based on search
    const filteredClientBrands = clientBrands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading client brands...</p>
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
                        Client Brands Management
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Eye size={16} className="text-indigo-600" />
                        <span>Manage your client brand logos and information</span>
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
                        onClick={() => router.push("/superadmin/content/client-brands/add")}
                        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Client Brand
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
                        placeholder="Search by brand name or industry..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
                    <p className="text-indigo-600 text-sm font-semibold mb-1">Total Brands</p>
                    <p className="text-3xl font-bold text-indigo-700">{clientBrands.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <p className="text-purple-600 text-sm font-semibold mb-1">Filtered Results</p>
                    <p className="text-3xl font-bold text-purple-700">{filteredClientBrands.length}</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 border border-pink-200">
                    <p className="text-pink-600 text-sm font-semibold mb-1">Last Updated</p>
                    <p className="text-lg font-bold text-pink-700">
                        {clientBrands.length > 0 ? new Date(clientBrands[0].updatedAt || "").toLocaleDateString() : "N/A"}
                    </p>
                </div>
            </motion.div>

            {/* Cards Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                {filteredClientBrands.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-xl border border-gray-200">
                        <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Client Brands Found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first client brand"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => router.push("/superadmin/content/client-brands/add")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                <Plus size={20} />
                                Add Your First Client Brand
                            </button>
                        )}
                    </div>
                ) : (
                    <AnimatePresence>
                        {filteredClientBrands.map((brand, index) => (
                            <motion.div
                                key={brand.id || brand._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
                            >
                                {/* Card Header with Gradient */}
                                <div
                                    className="h-32 relative overflow-hidden"
                                    style={{ background: convertGradientToCSS(brand.gradient) }}
                                >
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all" />
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-700">
                                            {brand.industry}
                                        </span>
                                    </div>
                                </div>

                                {/* Logo Section */}
                                <div className="relative -mt-12 px-6">
                                    <div className="w-24 h-24 bg-white rounded-xl shadow-lg border-4 border-white overflow-hidden">
                                        {brand.logo ? (
                                            <img
                                                src={`${imageUrl}/${brand.logo}`}
                                                alt={brand.name}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                <ImageIcon size={32} className="text-gray-400" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 pt-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{brand.name}</h3>

                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                                        <Building2 size={14} />
                                        <span className="truncate">{brand.industry}</span>
                                    </div>

                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-xs text-gray-500">
                                            Added: {new Date(brand.createdAt || "").toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-6 pb-6 flex items-center gap-2">
                                    <button
                                        onClick={() => router.push(`/superadmin/content/client-brands/edit/${brand.id || brand._id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(brand.id || brand._id!, brand.name)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </motion.div>
        </div>
    );
};

export default ClientBrandsPage;