"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Save,
    ArrowLeft,
    Upload,
    X,
    User,
    Building2,
    Briefcase,
    Star,
    MessageSquare,
    Loader2
} from "lucide-react";
import {
    createTestimonialAction,
    updateTestimonialAction
} from "@/store/slices/landingSlice";
import { get } from "@/services/ApiService";
import { GET_TESTIMONIAL_BY_ID } from "@/services/ApiRoutes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";
import { imageUrl } from "@/services/BaseUrl";

const AddEditTestimonial = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [company, setCompany] = useState("");
    const [project, setProject] = useState("");
    const [result, setResult] = useState("");
    const [rating, setRating] = useState(5);
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
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
                const response = await get(GET_TESTIMONIAL_BY_ID(id));
                if (response.success && response.data) {
                    const d = response.data;
                    setName(d.name);
                    setRole(d.role);
                    setCompany(d.company || "");
                    setProject(d.project || "");
                    setResult(d.result || "");
                    setRating(d.rating);
                    setText(d.text);
                    if (d.image) {
                        setImagePreview(`${imageUrl}/${d.image.startsWith('/') ? d.image.substring(1) : d.image}`);
                    }
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
            const file = e.target.files[0];
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setSelectedFile(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("role", role);
        formData.append("company", company);
        formData.append("project", project);
        formData.append("result", result);
        formData.append("rating", rating.toString());
        formData.append("text", text);
        if (selectedFile) {
            formData.append("image", selectedFile);
        }

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateTestimonialAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createTestimonialAction(formData));
            }

            if (updateTestimonialAction.fulfilled.match(resultAction) || createTestimonialAction.fulfilled.match(resultAction)) {
                AlertDialog("Success!", id ? "Updated successfully" : "Created successfully", "success", 3000, false, false);
                router.push("/superadmin/content/testimonials");
            } else {
                throw new Error(resultAction.payload as string || "Operation failed");
            }
        } catch (error: any) {
            AlertDialog("Error!", error.message || "Operation failed", "error", 5000);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 transition-colors mb-4">
                    <ArrowLeft size={20} /> Back to List
                </button>
                <h1 className="text-3xl font-bold text-gray-800">{id ? "Edit Testimonial" : "Add Testimonial"}</h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Image Upload Column */}
                    <div className="md:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 group">
                                {imagePreview ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <User size={40} />
                                    </div>
                                )}
                                <div
                                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white cursor-pointer transition-opacity"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload size={24} />
                                </div>
                            </div>

                            <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

                            {imagePreview ? (
                                <button type="button" onClick={removeImage} className="text-sm text-red-500 hover:text-red-700 font-medium">Remove Image</button>
                            ) : (
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Upload Photo</button>
                            )}
                            <p className="text-xs text-gray-400 mt-2">Recommended: 200x200px</p>
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <User className="text-indigo-600" /> Client Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Client Name</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Role / Position</label>
                                    <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Company</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                        <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Project / Service</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-3.5 text-gray-400" size={16} />
                                        <input type="text" value={project} onChange={e => setProject(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                                    </div>
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="text-sm font-semibold text-gray-700">Result / Outcome</label>
                                    <input type="text" value={result} onChange={e => setResult(e.target.value)} placeholder="e.g. Increased revenue by 50%" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <MessageSquare className="text-purple-600" /> The Review
                            </h2>
                            <div className="space-y-4">
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

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Testimonial Text</label>
                                    <textarea value={text} onChange={e => setText(e.target.value)} rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500" required />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Testimonial" : "Create Testimonial"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditTestimonial;
