"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    ArrowLeft,
    Plus,
    Trash2,
    Loader2,
    Map,
    Calendar,
    Flag,
    CheckCircle,
    Layers,
    Palette
} from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_INNOVATION_ROADMAP_BY_ID } from "@/services/ApiRoutes";
import { InnovationRoadmapItem } from "@/types/landing";
import { createInnovationRoadmapAction, updateInnovationRoadmapAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditInnovationRoadmap = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Form State
    const [formData, setFormData] = useState<Omit<InnovationRoadmapItem, "_id" | "id" | "createdAt" | "updatedAt">>({
        phase: "",
        year: "",
        title: "",
        icon: "",
        color: "",
        status: "",
        initiatives: []
    });

    // Check Auth
    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    // Fetch existing data if Edit mode
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const response = await get(GET_INNOVATION_ROADMAP_BY_ID(id));
                if (response.success && response.data) {
                    setFormData({
                        phase: response.data.phase,
                        year: response.data.year,
                        title: response.data.title,
                        icon: response.data.icon,
                        color: response.data.color,
                        status: response.data.status,
                        initiatives: response.data.initiatives
                    });
                }
            } catch (error: any) {
                AlertDialog(
                    "Error!",
                    error.response?.data?.message || "Failed to fetch data",
                    "error",
                    3000,
                    false,
                    false
                );
                router.push("/superadmin/content/innovation-roadmap");
            } finally {
                setFetching(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Initiatives Array Handling
    const addInitiative = () => {
        setFormData(prev => ({
            ...prev,
            initiatives: [...prev.initiatives, ""]
        }));
    };

    const removeInitiative = (index: number) => {
        setFormData(prev => ({
            ...prev,
            initiatives: prev.initiatives.filter((_, i) => i !== index)
        }));
    };

    const handleInitiativeChange = (index: number, value: string) => {
        const newInitiatives = [...formData.initiatives];
        newInitiatives[index] = value;
        setFormData(prev => ({ ...prev, initiatives: newInitiatives }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateInnovationRoadmapAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createInnovationRoadmapAction(formData));
            }

            if (updateInnovationRoadmapAction.fulfilled.match(resultAction) || createInnovationRoadmapAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    id ? "Roadmap item updated successfully" : "Roadmap item created successfully",
                    "success",
                    5000,
                    false,
                    false
                );
                router.push("/superadmin/content/innovation-roadmap");
            } else {
                throw new Error(resultAction.payload as string || "Operation failed");
            }
        } catch (error: any) {
            AlertDialog(
                "Error!",
                error.message || "Operation failed",
                "error",
                5000,
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
                <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
            >
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to List
                </button>
                <h1 className="text-3xl font-bold text-gray-800">
                    {id ? "Edit Roadmap Phase" : "Add New Phase"}
                </h1>
                <p className="text-gray-500 mt-2">
                    {id ? "Update your roadmap trajectory below" : "Define a new phase in your innovation roadmap"}
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Information Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Map className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Phase Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Phase Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Flag size={16} className="text-blue-500" />
                                    Phase Name
                                </div>
                            </label>
                            <input
                                type="text"
                                name="phase"
                                value={formData.phase}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Phase 1"
                                required
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Flag size={16} className="text-purple-500" />
                                    Title
                                </div>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Foundation & Scaling"
                                required
                            />
                        </div>

                        {/* Year */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-orange-500" />
                                    Year / Timeline
                                </div>
                            </label>
                            <input
                                type="text"
                                name="year"
                                value={formData.year}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. 2024-2025"
                                required
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <CheckCircle size={16} className="text-green-500" />
                                    Status
                                </div>
                            </label>
                            <input
                                type="text"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. In Progress"
                                required
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Styling Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Palette className="text-pink-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Visuals</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Icon */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Layers size={16} className="text-pink-500" />
                                    Icon Name
                                </div>
                            </label>
                            <input
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Rocket"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Use valid Lucide React icon names</p>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Palette size={16} className="text-indigo-500" />
                                    Gradient Color Class
                                </div>
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. from-blue-600 to-purple-600"
                                required
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Initiatives Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
                >
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="text-teal-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Key Initiatives</h2>
                        </div>
                        <button
                            type="button"
                            onClick={addInitiative}
                            className="flex items-center gap-2 text-sm bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
                        >
                            <Plus size={16} />
                            Add Initiative
                        </button>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {formData.initiatives.map((initiative, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={initiative}
                                            onChange={(e) => handleInitiativeChange(index, e.target.value)}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                            placeholder={`Initiative ${index + 1}`}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeInitiative(index)}
                                        className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        title="Remove Initiative"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {formData.initiatives.length === 0 && (
                            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                <p>No initiatives added yet. Click &quot;Add Initiative&quot; to list key actions for this phase.</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-end"
                >
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Phase" : "Create Phase"}
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default AddEditInnovationRoadmap;
