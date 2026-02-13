"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    ArrowLeft,
    Upload,
    X,
    Folder,
    Type,
    Tag,
    Palette,
    FileText,
    Link as LinkIcon,
    Loader2
} from "lucide-react";
import {
    createProjectAction,
    updateProjectAction
} from "@/store/slices/landingSlice";
import { get } from "@/services/ApiService";
import { GET_PROJECT_BY_ID, GET_SERVICES } from "@/services/ApiRoutes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { type Service } from "@/types/landing";
import AlertDialog from "@/utils/AlertDialog";
import { imageUrl } from "@/services/BaseUrl";

const AddEditProject = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Form State
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [serviceId, setServiceId] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState("");
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [services, setServices] = useState<Service[]>([]);


    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await get(GET_SERVICES);
                if (response.success) {
                    setServices(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
            }
        };
        fetchServices();
    }, []);

    // Fetch existing data
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const response = await get(GET_PROJECT_BY_ID(id));
                if (response.success && response.data) {
                    const p = response.data;
                    setTitle(p.title);
                    setDescription(p.description);
                    setLiveUrl(p.liveUrl || "");
                    // Handle populated serviceId object
                    if (typeof p.serviceId === 'object' && p.serviceId?._id) {
                        setServiceId(p.serviceId._id);
                    } else if (typeof p.serviceId === 'string') {
                        setServiceId(p.serviceId);
                    }
                    setTags(p.tags || []);
                    setExistingImages(p.images || []);
                }
            } catch (error: any) {
                AlertDialog("Error", "Failed to fetch project data", "error", 3000);
                router.push("/superadmin/content/projects");
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchData();
    }, [id, router]);

    // Tag Handling
    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) {
                setTags([...tags, tagInput.trim()]);
            }
            setTagInput("");
        }
    };
    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    // Image Handling
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewImages([...newImages, ...files]);

            // Generate previews
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...newPreviews]);
        }
    };

    const removeNewImage = (index: number) => {
        const updatedNewImages = newImages.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
        setNewImages(updatedNewImages);
        setImagePreviews(updatedPreviews);
    };

    // We don't remove existing images in this simple implementation, 
    // usually backend might require a flag or array of "imgs to keep".
    // For now, let's assume update replaces images OR appends.
    // Based on user provided controller: 
    // "let images = project.images; if (req.files) ... images.push(...)"
    // It appends. So we can't easily delete existing images via the provided controller without modifying it.
    // I will display them but not offer delete for existing images to avoid UI confusion vs backend capability.

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("liveUrl", liveUrl);
        formData.append("serviceId", serviceId);

        // Send tags as an array by appending multiple times
        if (tags && tags.length > 0) {
            tags.forEach(tag => formData.append("tags", tag));
        } else {
            // Some backends check for existence, if empty send empty string or handle specifically
            // Usually just not appending works, but if backend strictly requires the key:
            // formData.append("tags", ""); 
        }

        newImages.forEach(file => {
            formData.append("images", file);
        });

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateProjectAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createProjectAction(formData));
            }

            if (updateProjectAction.fulfilled.match(resultAction) || createProjectAction.fulfilled.match(resultAction)) {
                AlertDialog("Success!", id ? "Project updated" : "Project created", "success", 3000, true, false);
                router.push("/superadmin/content/projects");
            } else {
                throw new Error(resultAction.payload as string || "Operation failed");
            }
        } catch (error: any) {
            const data = error.response?.data;
            let errorMsg = data?.message || "Operation failed";

            if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
                const detailedErrors = data.errors.map((err: any) => `${err.field}: ${err.message}`).join("\n");
                errorMsg = detailedErrors;
            }

            AlertDialog("Validation Error", errorMsg, "error", 5000);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4">
                    <ArrowLeft size={20} /> Back to Projects
                </button>
                <h1 className="text-3xl font-bold text-gray-800">{id ? "Edit Project" : "Add New Project"}</h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Folder className="text-blue-600" /> Project Details
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Project Title <span className="text-red-500">*</span></label>
                            <div className="relative">
                                <Type className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="e.g. Finance App Redesign" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Related Service <span className="text-red-500">*</span></label>
                            <select
                                value={serviceId}
                                onChange={e => setServiceId(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Service</option>
                                {services.map(service => (
                                    <option key={service._id || service.id} value={service._id || service.id}>
                                        {service.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <div className="relative">
                                <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                                <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="Describe the project case study..." required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Live URL</label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                                <input type="url" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="e.g. https://example.com" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tags */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <Tag className="text-indigo-600" /> Tags
                    </h2>
                    <input
                        type="text"
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Type tag and press Enter"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 mb-4"
                    />
                    <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                            {tags.map(tag => (
                                <motion.span key={tag} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                                    {tag}
                                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-500"><X size={14} /></button>
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Images */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Upload className="text-green-600" /> Project Images
                        </h2>
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            Select Images
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            multiple
                            accept="image/*"
                            className="hidden"
                        />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Existing Images */}
                        {existingImages.map((img, idx) => (
                            <div key={`existing-${idx}`} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={`${imageUrl}/${img.startsWith('/') ? img.substring(1) : img}`} alt="Existing" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                                    Existing
                                </div>
                            </div>
                        ))}

                        {/* New Previews */}
                        {imagePreviews.map((src, idx) => (
                            <div key={`new-${idx}`} className="relative aspect-video rounded-lg overflow-hidden border border-green-200 group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={src} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(idx)}
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                >
                                    <X size={12} />
                                </button>
                                <div className="absolute bottom-1 left-1 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">New</div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Project" : "Create Project"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditProject;
