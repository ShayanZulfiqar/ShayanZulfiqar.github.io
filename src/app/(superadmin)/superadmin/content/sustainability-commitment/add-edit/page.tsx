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
    Leaf,
    Activity,
    Target,
    BarChart2,
    Palette
} from "lucide-react";
import {
    createSustainabilityCommitmentAction,
    updateSustainabilityCommitmentAction
} from "@/store/slices/landingSlice";
import { type SustainabilityItem, type SustainabilityMetric } from "@/types/landing";
import { get } from "@/services/ApiService";
import { GET_SUSTAINABILITY_COMMITMENT_BY_ID } from "@/services/ApiRoutes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditSustainability = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Form State
    const [formData, setFormData] = useState<Omit<SustainabilityItem, "_id" | "id" | "createdAt" | "updatedAt">>({
        icon: "",
        title: "",
        description: "",
        target: "",
        progress: 0,
        color: "",
        metrics: []
    });

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    // Fetch existing data
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const response = await get(GET_SUSTAINABILITY_COMMITMENT_BY_ID(id));
                if (response.success && response.data) {
                    const d = response.data;
                    setFormData({
                        icon: d.icon,
                        title: d.title,
                        description: d.description,
                        target: d.target,
                        progress: d.progress,
                        color: d.color,
                        metrics: d.metrics || []
                    });
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Metric Handling
    const addMetric = () => {
        setFormData(prev => ({
            ...prev,
            metrics: [...prev.metrics, { label: "", value: "" }]
        }));
    };

    const removeMetric = (index: number) => {
        setFormData(prev => ({
            ...prev,
            metrics: prev.metrics.filter((_, i) => i !== index)
        }));
    };

    const handleMetricChange = (index: number, field: keyof SustainabilityMetric, value: string) => {
        const newMetrics = [...formData.metrics];
        newMetrics[index][field] = value;
        setFormData(prev => ({ ...prev, metrics: newMetrics }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateSustainabilityCommitmentAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createSustainabilityCommitmentAction(formData));
            }

            if (updateSustainabilityCommitmentAction.fulfilled.match(resultAction) || createSustainabilityCommitmentAction.fulfilled.match(resultAction)) {
                AlertDialog("Success!", id ? "Updated successfully" : "Created successfully", "success", 3000, false, false);
                router.push("/superadmin/content/sustainability-commitment");
            } else {
                throw new Error(resultAction.payload as string || "Operation failed");
            }
        } catch (error: any) {
            AlertDialog("Error!", error.message || "Operation failed", "error", 5000);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-green-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-green-600 transition-colors mb-4">
                    <ArrowLeft size={20} /> Back to List
                </button>
                <h1 className="text-3xl font-bold text-gray-800">{id ? "Edit Commitment" : "Add Commitment"}</h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Info */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Leaf className="text-green-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Basic Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" placeholder="e.g. Carbon Neutrality" required />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Target Year/Date</label>
                            <input type="text" name="target" value={formData.target} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" placeholder="e.g. 2030" required />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Progress (%)</label>
                            <input type="number" name="progress" value={formData.progress} onChange={handleInputChange} min="0" max="100" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" required />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Icon Name</label>
                            <input type="text" name="icon" value={formData.icon} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" placeholder="e.g. Sun" required />
                            <p className="text-xs text-gray-500 mt-1">Lucide icon name</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Gradient Class</label>
                            <input type="text" name="color" value={formData.color} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" placeholder="e.g. from-green-500 to-emerald-600" required />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500" placeholder="Brief description of the goal..." required />
                        </div>
                    </div>
                </motion.div>

                {/* Metrics */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <Activity className="text-blue-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Key Metrics</h2>
                        </div>
                        <button type="button" onClick={addMetric} className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg font-medium"><Plus size={16} /> Add Metric</button>
                    </div>

                    <div className="space-y-4">
                        <AnimatePresence>
                            {formData.metrics.map((metric, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200"
                                >
                                    <div className="flex-1">
                                        <input type="text" placeholder="Label (e.g. CO2 Reduced)" value={metric.label} onChange={(e) => handleMetricChange(idx, 'label', e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm mb-2 md:mb-0" required />
                                    </div>
                                    <div className="flex-1">
                                        <input type="text" placeholder="Value (e.g. 50 Tons)" value={metric.value} onChange={(e) => handleMetricChange(idx, 'value', e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" required />
                                    </div>
                                    <button type="button" onClick={() => removeMetric(idx)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {formData.metrics.length === 0 && <p className="text-center text-gray-400 py-4 italic">No metrics added yet.</p>}
                    </div>
                </motion.div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Commitment" : "Create Commitment"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditSustainability;
