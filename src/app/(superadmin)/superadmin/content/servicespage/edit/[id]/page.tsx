"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Zap } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_SERVICE_BY_ID } from "@/services/ApiRoutes";
import { updateServiceAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

// Helper to render icon preview safely
const IconPreview = ({ name }: { name: string }) => {
    // @ts-ignore
    const Icon = LucideIcons[name];
    if (!Icon) return null;
    return <Icon size={24} className="text-purple-600" />;
};

const EditServicePage = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useAppDispatch();
    const id = params.id as string;
    const { user, token } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "",
    });

    // Check authentication
    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    // Fetch existing data
    useEffect(() => {
        const fetchServiceData = async () => {
            if (!id) return;
            try {
                const response = await get(GET_SERVICE_BY_ID(id));
                if (response.success && response.data) {
                    setFormData({
                        title: response.data.title,
                        description: response.data.description,
                        icon: response.data.icon,
                    });
                }
            } catch (error: any) {
                AlertDialog("Error", "Failed to load service data", "error", 3000);
                router.push("/superadmin/content/servicespage");
            } finally {
                setFetching(false);
            }
        };

        if (id && token) {
            fetchServiceData();
        }
    }, [id, token, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.description.trim() || !formData.icon.trim()) {
            AlertDialog("Error!", "Please fill in all required fields", "error", 3000, false, false);
            return;
        }

        try {
            setLoading(true);
            const resultAction = await dispatch(updateServiceAction({ id, data: formData }));

            if (updateServiceAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    "Service updated successfully!",
                    "success",
                    1500,
                    false,
                    false
                );
                router.push("/superadmin/content/servicespage");
            } else {
                throw new Error(resultAction.payload as string || "Failed to update service");
            }
        } catch (error: any) {
            AlertDialog(
                "Error!",
                error.message || "Failed to update service",
                "error",
                3000,
                false,
                false
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <button
                    onClick={() => router.push("/superadmin/content/servicespage")}
                    className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                        Edit Service
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <Zap size={16} className="text-purple-600" />
                        <span>Update service details</span>
                    </p>
                </div>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-xl border border-gray-200 p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Web Development"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows={3}
                            placeholder="Describe the service..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    {/* Icon */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Icon (Lucide React Name) <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-4">
                            <input
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleChange}
                                required
                                placeholder="e.g., Code, Smartphone, Globe"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            />
                            {formData.icon && (
                                <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                                    <IconPreview name={formData.icon} />
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Enter a valid <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Lucide icon name</a>.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.push("/superadmin/content/servicespage")}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-semibold transition-all hover:shadow-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    <span>Update Service</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditServicePage;
