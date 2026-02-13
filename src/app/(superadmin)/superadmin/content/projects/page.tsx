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
    Briefcase,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Globe,
    ExternalLink
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchProjects, deleteProjectAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";
import { imageUrl } from "@/services/BaseUrl";

const ImageCarousel = ({ images, title }: { images: string[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                <Briefcase size={20} opacity={0.5} />
            </div>
        );
    }

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-24 h-16 group overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={`${imageUrl}/${images[currentIndex].startsWith('/') ? images[currentIndex].substring(1) : images[currentIndex]}`}
                alt={`${title} - ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                }}
            />
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-0 inset-y-0 bg-black/20 hover:bg-black/40 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronLeft size={14} />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-0 inset-y-0 bg-black/20 hover:bg-black/40 text-white p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <ChevronRight size={14} />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 flex justify-center gap-1 p-0.5 bg-black/10">
                        {images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`w-1 h-1 rounded-full transition-all ${idx === currentIndex ? "bg-white scale-125" : "bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const ProjectsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: projects, loading, error } = useAppSelector((state) => state.landing.projects);
    const { user, token } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchProjects());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchProjects());
        setRefreshing(false);
    };


    // Handle delete
    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete Project",
            `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteProjectAction(id));
                    if (deleteProjectAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Success!",
                            "Project deleted successfully.",
                            "success",
                            3000,
                            false,
                            false
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete project");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to delete project",
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
    const filteredItems = projects.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading projects...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        Projects
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Briefcase size={16} className="text-blue-600" />
                        <span>Manage your portfolio and case studies</span>
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
                        onClick={() => router.push("/superadmin/content/projects/add-edit")}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Project
                    </button>
                </div>
            </motion.div>

            {/* Search */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search projects by title or description..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Projects Found</h3>
                        <p className="text-gray-500 mb-6">No projects match your criteria.</p>
                        {!searchTerm && (
                            <button
                                onClick={() => router.push("/superadmin/content/projects/add-edit")}
                                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
                            >
                                <Plus size={20} />
                                Add First Project
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Images</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Live Preview</th>
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
                                                <ImageCarousel images={item.images} title={item.title} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="max-w-xs">
                                                    <div className="font-bold text-gray-900 truncate" title={item.title}>{item.title}</div>
                                                    <div className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {typeof item.serviceId === 'object' && item.serviceId ? (
                                                    <div className="flex items-center gap-2">
                                                        {(() => {
                                                            // @ts-ignore
                                                            const Icon = LucideIcons[item.serviceId.icon];
                                                            return Icon ? <Icon size={16} className="text-purple-600" /> : null;
                                                        })()}
                                                        <span className="text-sm font-medium text-gray-700">{item.serviceId.title}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-xs">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-wrap gap-1">
                                                    {item.tags?.slice(0, 3).map((tag, idx) => (
                                                        <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                    {item.tags && item.tags.length > 3 && (
                                                        <span className="text-[10px] text-gray-400">+{item.tags.length - 3}</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.liveUrl ? (
                                                    <a
                                                        href={item.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 transition-colors font-medium text-sm group"
                                                    >
                                                        <Globe size={14} className="group-hover:rotate-12 transition-transform" />
                                                        View Live
                                                        <ExternalLink size={12} />
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm italic">Not provided</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => router.push(`/superadmin/content/projects/add-edit?id=${item._id || item.id}`)}
                                                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                                        title="Edit Project"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id || item.id!, item.title)}
                                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                                        title="Delete Project"
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

export default ProjectsPage;
