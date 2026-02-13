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
    Target,
    Type,
    FileText,
    Calendar,
    Palette,
    BarChart2,
    Layers
} from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_FUTURE_GOAL_BY_ID } from "@/services/ApiRoutes";
import { FutureGoal, FutureGoalMetric } from "@/types/landing";
import { createFutureGoalAction, updateFutureGoalAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditFutureGoal = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Form State
    const [formData, setFormData] = useState<Omit<FutureGoal, "_id" | "id" | "createdAt" | "updatedAt">>({
        icon: "",
        title: "",
        description: "",
        target: "",
        color: "",
        bgColor: "",
        metrics: []
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
                const response = await get(GET_FUTURE_GOAL_BY_ID(id));
                if (response.success && response.data) {
                    setFormData({
                        icon: response.data.icon,
                        title: response.data.title,
                        description: response.data.description,
                        target: response.data.target,
                        color: response.data.color,
                        bgColor: response.data.bgColor,
                        metrics: response.data.metrics
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
                router.push("/superadmin/content/future-goals");
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

    // Metrics Array Handling
    const addMetric = () => {
        setFormData(prev => ({
            ...prev,
            metrics: [
                ...prev.metrics,
                { label: "", value: "" }
            ]
        }));
    };

    const removeMetric = (index: number) => {
        setFormData(prev => ({
            ...prev,
            metrics: prev.metrics.filter((_, i) => i !== index)
        }));
    };

    const handleMetricChange = (index: number, field: keyof FutureGoalMetric, value: string) => {
        const newMetrics = [...formData.metrics];
        newMetrics[index] = { ...newMetrics[index], [field]: value };
        setFormData(prev => ({ ...prev, metrics: newMetrics }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateFutureGoalAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createFutureGoalAction(formData));
            }

            if (updateFutureGoalAction.fulfilled.match(resultAction) || createFutureGoalAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    id ? "Future goal updated successfully" : "Future goal created successfully",
                    "success",
                    5000,
                    false,
                    false
                );
                router.push("/superadmin/content/future-goals");
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
                    {id ? "Edit Future Goal" : "Add New Future Goal"}
                </h1>
                <p className="text-gray-500 mt-2">
                    {id ? "Update your organizational goal details below" : "Define a new strategic objective and its metrics"}
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
                        <Target className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Goal Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Type size={16} className="text-blue-500" />
                                    Goal Title
                                </div>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Global Expansion"
                                required
                            />
                        </div>

                        {/* Target */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-orange-500" />
                                    Target Year/Date
                                </div>
                            </label>
                            <input
                                type="text"
                                name="target"
                                value={formData.target}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. 2030"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <FileText size={16} className="text-green-500" />
                                    Description
                                </div>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Briefly describe the goal..."
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
                        <Palette className="text-purple-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Visuals & Styling</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Icon */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Layers size={16} className="text-purple-500" />
                                    Icon Name
                                </div>
                            </label>
                            <input
                                type="text"
                                name="icon"
                                value={formData.icon}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Globe2"
                                required
                            />
                            <p className="text-xs text-gray-500 mt-1">Use valid Lucide React icon names</p>
                        </div>

                        {/* Color */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Palette size={16} className="text-pink-500" />
                                    Text Gradient Class
                                </div>
                            </label>
                            <input
                                type="text"
                                name="color"
                                value={formData.color}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. text-blue-600"
                                required
                            />
                        </div>

                        {/* Bg Color */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Palette size={16} className="text-indigo-500" />
                                    Background Class
                                </div>
                            </label>
                            <input
                                type="text"
                                name="bgColor"
                                value={formData.bgColor}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. bg-blue-50"
                                required
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Metrics List Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
                >
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <BarChart2 className="text-teal-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Key Metrics</h2>
                        </div>
                        <button
                            type="button"
                            onClick={addMetric}
                            className="flex items-center gap-2 text-sm bg-teal-50 text-teal-700 hover:bg-teal-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
                        >
                            <Plus size={16} />
                            Add Metric
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.metrics.map((metric, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gray-50 rounded-xl p-4 border border-gray-200 relative group"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeMetric(index)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="Remove Metric"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                    {/* Metric Label */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Metric Label</label>
                                        <input
                                            type="text"
                                            value={metric.label}
                                            onChange={(e) => handleMetricChange(index, "label", e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                                            placeholder="e.g. Revenue Growth"
                                            required
                                        />
                                    </div>

                                    {/* Metric Value */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Target Value</label>
                                        <input
                                            type="text"
                                            value={metric.value}
                                            onChange={(e) => handleMetricChange(index, "value", e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                                            placeholder="e.g. 50%"
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {formData.metrics.length === 0 && (
                            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                <p>No metrics added yet. Click &quot;Add Metric&quot; to define success indicators.</p>
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
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Goal" : "Create Goal"}
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default AddEditFutureGoal;
