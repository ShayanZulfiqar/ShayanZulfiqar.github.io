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
    Sparkles,
    AlertCircle,
    Zap,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { fetchHeroSections, deleteHeroSectionAction } from "@/store/slices/landingSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { HeroSection } from "@/types/landing";
import AlertDialog from "@/utils/AlertDialog";

// Helper function to get Lucide icon component by name
const getLucideIcon = (iconName: string) => {
    if (!iconName) return null;

    // @ts-ignore - Dynamic icon access
    const IconComponent = LucideIcons[iconName];
    return IconComponent || null;
};

// Helper function to convert Tailwind gradient classes to CSS gradient or return exact color
const convertGradientToCSS = (gradient: string): string => {
    // If it's already a CSS gradient (contains 'linear-gradient' or 'radial-gradient'), return as-is
    if (gradient.includes('linear-gradient') || gradient.includes('radial-gradient')) {
        return gradient;
    }

    // If it's a hex color (starts with #), return as-is
    if (gradient.startsWith('#')) {
        return gradient;
    }

    // If it's a named color or rgb/rgba, return as-is
    if (gradient.startsWith('rgb') || gradient.startsWith('hsl') || !gradient.includes('-')) {
        return gradient;
    }

    // Otherwise, assume it's Tailwind classes like "from-purple-600 to-pink-600"
    // Extract color values and create a CSS gradient
    const fromMatch = gradient.match(/from-(\w+-\d+)/);
    const toMatch = gradient.match(/to-(\w+-\d+)/);

    if (fromMatch && toMatch) {
        // Map common Tailwind colors to hex values
        const colorMap: Record<string, string> = {
            'purple-600': '#9333ea',
            'pink-600': '#db2777',
            'purple-50': '#faf5ff',
            'pink-50': '#fdf2f8',
            'blue-600': '#2563eb',
            'cyan-600': '#0891b2',
            'red-600': '#dc2626',
            'green-600': '#16a34a',
            'yellow-600': '#ca8a04',
            'orange-600': '#ea580c',
        };

        const fromColor = colorMap[fromMatch[1]] || '#9333ea';
        const toColor = colorMap[toMatch[1]] || '#db2777';

        return `linear-gradient(135deg, ${fromColor} 0%, ${toColor} 100%)`;
    }

    // Fallback
    return gradient;
};

const HeroSectionPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);
    const { data: heroSections, loading, error } = useAppSelector((state) => state.landing.hero);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchHeroSections());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchHeroSections());
        setRefreshing(false);
    };

    // Handle delete
    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete Hero Section",
            `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteHeroSectionAction(id));
                    if (deleteHeroSectionAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Success!",
                            "Hero section deleted successfully.",
                            "success",
                            3000,
                            false,
                            false
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to delete hero section",
                        "error",
                        3000,
                        false,
                        false
                    );
                }
            }
        );
    };

    // Filter hero sections based on search
    const filteredHeroSections = heroSections.filter((section) =>
        section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.highlight.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading hero sections...</p>
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
                        Hero Section Management
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Zap size={16} className="text-purple-600" />
                        <span>Manage your landing page hero sections</span>
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
                        onClick={() => router.push("/superadmin/content/hero-section/add")}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Hero Section
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
                        placeholder="Search hero sections by title, subtitle, or highlight..."
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
                    <p className="text-purple-600 text-sm font-semibold mb-1">Total Sections</p>
                    <p className="text-3xl font-bold text-purple-700">{heroSections.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                    <p className="text-blue-600 text-sm font-semibold mb-1">Filtered Results</p>
                    <p className="text-3xl font-bold text-blue-700">{filteredHeroSections.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <p className="text-green-600 text-sm font-semibold mb-1">Last Updated</p>
                    <p className="text-lg font-bold text-green-700">
                        {heroSections.length > 0 ? new Date(heroSections[0].updatedAt || "").toLocaleDateString() : "N/A"}
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
                {filteredHeroSections.length === 0 ? (
                    <div className="text-center py-16">
                        <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Hero Sections Found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first hero section"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => router.push("/superadmin/content/hero-section/add")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                <Plus size={20} />
                                Add Your First Hero Section
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                                    <th className="px-6 py-4 text-left text-sm font-semibold">#</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Title</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Highlight</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Badge</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Color Preview</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Icon</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Created Date</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {filteredHeroSections.map((section, index) => {
                                        const IconComponent = section.icon ? getLucideIcon(section.icon) : null;

                                        return (
                                            <motion.tr
                                                key={section._id || section.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                transition={{ delay: index * 0.05 }}
                                                className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all"
                                            >
                                                <td className="px-6 py-4 text-sm text-gray-600 font-semibold">{index + 1}</td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-gray-800">{section.title}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-purple-600 font-semibold">{section.highlight}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span
                                                        className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                                                        style={{ backgroundColor: section.badgeColor }}
                                                    >
                                                        {section.badge}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <div
                                                            className="w-12 h-12 rounded-lg shadow-md border-2 border-white"
                                                            style={{ background: convertGradientToCSS(section.gradient) }}
                                                            title={`Gradient: ${section.gradient}`}
                                                        />
                                                        <div
                                                            className="w-12 h-12 rounded-lg shadow-md border-2 border-white"
                                                            style={{ background: convertGradientToCSS(section.bgGradient) }}
                                                            title={`Background: ${section.bgGradient}`}
                                                        />
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {IconComponent ? (
                                                        <div className="flex items-center justify-center">
                                                            <div className="p-2 bg-purple-100 rounded-lg">
                                                                <IconComponent size={20} className="text-purple-600" />
                                                            </div>
                                                        </div>
                                                    ) : section.icon ? (
                                                        <span className="text-xs text-gray-400 italic">{section.icon}</span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-center text-sm text-gray-600">
                                                    {new Date(section.createdAt || "").toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => router.push(`/superadmin/content/hero-section/edit/${section._id || section.id}`)}
                                                            className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                                                        >
                                                            <Edit size={16} />
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(section._id || section.id!, section.title)}
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

export default HeroSectionPage;
