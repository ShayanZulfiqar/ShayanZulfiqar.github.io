"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Save,
    ArrowLeft,
    Upload,
    Video,
    User,
    Star,
    Clock,
    Type,
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import {
    createVideoTestimonialAction,
    updateVideoTestimonialAction
} from "@/store/slices/landingSlice";
import { get } from "@/services/ApiService";
import { GET_VIDEO_TESTIMONIAL_BY_ID } from "@/services/ApiRoutes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditVideoTestimonial = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [thumbnail, setThumbnail] = useState(""); // URL or gradient class
    const [duration, setDuration] = useState("");
    const [rating, setRating] = useState(5);
    const [videoUrl, setVideoUrl] = useState(""); // External URL fallback
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    // Fetch existing
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const response = await get(GET_VIDEO_TESTIMONIAL_BY_ID(id));
                if (response.success && response.data) {
                    const d = response.data;
                    setTitle(d.title);
                    setName(d.name);
                    setRole(d.role);
                    setThumbnail(d.thumbnail || "");
                    setDuration(d.duration || "");
                    setRating(d.rating);
                    setVideoUrl(d.videoUrl); // If file path, show it; if URL show it
                }
            } catch (error: any) {
                AlertDialog("Error", "Failed to fetch data", "error", 3000);
                router.back();
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchData();
    }, [id, router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("name", name);
        formData.append("role", role);
        formData.append("thumbnail", thumbnail);
        formData.append("duration", duration);
        formData.append("rating", rating.toString());
        formData.append("videoUrl", videoUrl); // Fallback if no file

        if (selectedFile) {
            formData.append("video", selectedFile); // Backend expects req.file, name 'video' usually
        }

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateVideoTestimonialAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createVideoTestimonialAction(formData));
            }

            if (updateVideoTestimonialAction.fulfilled.match(resultAction) || createVideoTestimonialAction.fulfilled.match(resultAction)) {
                AlertDialog("Success!", id ? "Updated successfully" : "Created successfully", "success", 3000, false, false);
                router.push("/superadmin/content/video-testimonials");
            } else {
                throw new Error(resultAction.payload as string || "Operation failed");
            }
        } catch (error: any) {
            AlertDialog("Error!", error.message || "Operation failed", "error", 5000);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-red-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors mb-4">
                    <ArrowLeft size={20} /> Back to List
                </button>
                <h1 className="text-3xl font-bold text-gray-800">{id ? "Edit Video Testimonial" : "Add Video Testimonial"}</h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <User className="text-red-600" /> User Details
                        </h2>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Video Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500" placeholder="e.g. Amazing Experience!" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">User Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Role / Job Title</label>
                            <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`p-1 transition-transform hover:scale-110 ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                                    >
                                        <Star size={24} fill={rating >= star ? "currentColor" : "none"} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Media Info */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Video className="text-red-600" /> Media Details
                        </h2>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500" placeholder="e.g. 2:30" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail (Gradient Class or URL)</label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input type="text" value={thumbnail} onChange={e => setThumbnail(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500" placeholder="from-red-500 to-orange-500" />
                            </div>
                        </div>

                        <div className="pt-2 border-t border-gray-100">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Video File</label>
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                    <Upload size={18} /> Select Video
                                </button>
                                <span className="text-sm text-gray-500 truncate max-w-[150px]">
                                    {selectedFile ? selectedFile.name : (videoUrl ? "Using existing/URL" : "No file selected")}
                                </span>
                            </div>
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="video/*" className="hidden" />

                            <div className="mt-4">
                                <p className="text-xs text-center text-gray-400 mb-2">- OR -</p>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">External Video URL (Optional)</label>
                                <input type="text" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500" placeholder="https://..." />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Video" : "Create Video"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditVideoTestimonial;
