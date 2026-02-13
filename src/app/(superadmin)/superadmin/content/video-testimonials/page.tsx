"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    Edit,
    Trash2,
    RefreshCw,
    PlayCircle,
    AlertCircle,
    Star,
    Video,
    X,
    Maximize2
} from "lucide-react";
import { VideoTestimonial } from "@/types/landing";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchVideoTestimonials, deleteVideoTestimonialAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";
import { imageUrl } from "@/services/BaseUrl";

const VideoTestimonialsPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: items, loading, error } = useAppSelector((state) => state.landing.videoTestimonials);
    const { user, token } = useAppSelector((state) => state.auth);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<VideoTestimonial | null>(null);
    const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchVideoTestimonials());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchVideoTestimonials());
        setRefreshing(false);
    };


    // Handle delete
    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete Video Testimonial",
            `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteVideoTestimonialAction(id));
                    if (deleteVideoTestimonialAction.fulfilled.match(resultAction)) {
                        AlertDialog("Success!", "Video testimonial deleted.", "success", 3000, false, false);
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete item");
                    }
                } catch (error: any) {
                    AlertDialog("Error!", error.message || "Failed to delete item", "error", 3000);
                }
            }
        );
    };

    const getFullUrl = (path: string) => {
        if (!path) return "";
        if (path.startsWith('http')) return path;
        const cleanPath = path.startsWith('/') ? path.substring(1) : path;
        return `${imageUrl}/${cleanPath}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading video reviews...</p>
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
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-2">
                        Video Testimonials
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <Video size={16} className="text-red-600" />
                        <span>Showcase user experience videos</span>
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
                        onClick={() => router.push("/superadmin/content/video-testimonials/add-edit")}
                        className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add Video
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
                            {/* Thumbnail */}
                            <div
                                className="relative aspect-video bg-gray-900 overflow-hidden cursor-pointer"
                                onClick={() => setSelectedVideo(item)}
                                onMouseEnter={() => setHoveredVideoId(item._id || item.id || null)}
                                onMouseLeave={() => setHoveredVideoId(null)}
                            >
                                <AnimatePresence mode="wait">
                                    {hoveredVideoId === (item._id || item.id) && !item.videoUrl.includes('youtube.com') && !item.videoUrl.includes('youtu.be') ? (
                                        <motion.div
                                            key="video-preview"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full"
                                        >
                                            <video
                                                src={getFullUrl(item.videoUrl)}
                                                muted
                                                autoPlay
                                                loop
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="thumbnail"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="w-full h-full"
                                        >
                                            {item.thumbnail && (item.thumbnail.startsWith('http') || item.thumbnail.includes('uploads') || item.thumbnail.includes('.')) ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={getFullUrl(item.thumbnail)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className={`w-full h-full bg-gradient-to-br ${item.thumbnail?.includes('from') ? item.thumbnail : 'from-gray-800 to-gray-900'} flex items-center justify-center`}>
                                                    <PlayCircle size={48} className="text-white/50" />
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                                    <PlayCircle size={48} className="text-white drop-shadow-lg" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded z-10">
                                    {item.duration || "0:00"}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{item.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{item.name} • {item.role}</p>

                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} fill={i < item.rating ? "#F59E0B" : "none"} className={i < item.rating ? "text-yellow-500" : "text-gray-300"} />
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <span className="text-xs text-gray-400">
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => router.push(`/superadmin/content/video-testimonials/add-edit?id=${item._id || item.id}`)}
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
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/80"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-10 flex items-center justify-between">
                                <div className="text-white">
                                    <h3 className="text-lg font-bold">{selectedVideo.title}</h3>
                                    <p className="text-xs text-white/70">{selectedVideo.name} • {selectedVideo.role}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedVideo(null)}
                                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white backdrop-blur-md"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Video Player */}
                            <div className="aspect-video">
                                {selectedVideo.videoUrl.includes('youtube.com') || selectedVideo.videoUrl.includes('youtu.be') ? (
                                    <iframe
                                        className="w-full h-full"
                                        src={selectedVideo.videoUrl.replace('watch?v=', 'embed/')}
                                        title={selectedVideo.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <video
                                        controls
                                        autoPlay
                                        className="w-full h-full"
                                        src={getFullUrl(selectedVideo.videoUrl)}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {items.length === 0 && (
                <div className="text-center py-16">
                    <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Video Testimonials</h3>
                    <p className="text-gray-500">Shared videos build authenticity.</p>
                </div>
            )}
        </div>
    );
};

export default VideoTestimonialsPage;
