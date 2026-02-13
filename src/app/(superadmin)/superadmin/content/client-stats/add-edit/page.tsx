"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Save,
    ArrowLeft,
    BarChart3,
    Hash,
    Type,
    Loader2
} from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_CLIENT_STAT_BY_ID } from "@/services/ApiRoutes";
import { createClientStatAction, updateClientStatAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditClientStat = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Form State
    const [value, setValue] = useState("");
    const [label, setLabel] = useState("");

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    // Fetch existing data for editing
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            try {
                const response = await getClientStatById(id);
                if (response.success && response.data) {
                    setValue(response.data.value);
                    setLabel(response.data.label);
                }
            } catch (error: any) {
                AlertDialog("Error", "Failed to fetch client stat data", "error", 3000);
                router.back();
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchData();
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!value.trim() || !label.trim()) {
            AlertDialog("Validation Error", "Both value and label are required", "warning", 3000);
            return;
        }

        setLoading(true);
        try {
            const data = { value, label };
            let response;
            if (id) {
                response = await updateClientStat(id, data);
            } else {
                response = await createClientStat(data);
            }

            if (response.success) {
                AlertDialog(
                    "Success!",
                    id ? "Client stat updated successfully" : "Client stat created successfully",
                    "success",
                    2000,
                    false,
                    false
                );
                router.push("/superadmin/content/client-stats");
            }
        } catch (error: any) {
            AlertDialog(
                "Error!",
                error.response?.data?.message || "Operation failed",
                "error",
                5000
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Fetching stat details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto pb-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            {id ? "Edit Client Stat" : "Add Client Stat"}
                        </h1>
                        <p className="text-gray-500 text-sm">
                            {id ? "Modify existing performance metric" : "Create a new highlight for your statistics section"}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Form Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
                <div className="p-1.5 bg-gradient-to-r from-blue-600 to-indigo-600"></div>

                <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Value Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                <Hash size={16} className="text-blue-600" />
                                Statistic Value
                            </label>
                            <input
                                type="text"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-xl text-blue-600 placeholder:text-gray-300"
                                placeholder="e.g. 500+, 98%, 10k"
                                required
                            />
                            <p className="text-[11px] text-gray-400 ml-1">Include symbols like +, %, or letters if needed (e.g., 50M).</p>
                        </div>

                        {/* Label Input */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-2">
                                <Type size={16} className="text-indigo-600" />
                                Description / Label
                            </label>
                            <input
                                type="text"
                                value={label}
                                onChange={e => setLabel(e.target.value)}
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none uppercase tracking-wider font-semibold text-gray-700 placeholder:text-gray-300"
                                placeholder="e.g. Happy Clients, Projects Done"
                                required
                            />
                            <p className="text-[11px] text-gray-400 ml-1">Keep it short and descriptive (max 2-3 words).</p>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="pt-6">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1 mb-4 block">
                            Live Preview
                        </label>
                        <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
                            <div className="space-y-1">
                                <h3 className="text-5xl font-black text-blue-600">
                                    {value || "???"}
                                </h3>
                                <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-xs">
                                    {label || "Your Label Here"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 px-8 py-4 rounded-2xl border-2 border-gray-100 text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-200 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[1.5] flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save size={22} />}
                            {id ? "Update Statistic" : "Create Statistic"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddEditClientStat;
