"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Save,
    ArrowLeft,
    HelpCircle,
    Zap,
    Palette,
    Layout,
    Clock,
    Loader2
} from "lucide-react";
import {
    createWhyChooseUsItemAction,
    updateWhyChooseUsItemAction
} from "@/store/slices/landingSlice";
import { get } from "@/services/ApiService";
import { GET_WHY_CHOOSE_US_BY_ID } from "@/services/ApiRoutes";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditWhyChooseUs = () => {
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
    const [icon, setIcon] = useState("");
    const [color, setColor] = useState("");
    const [bgColor, setBgColor] = useState("");
    const [delay, setDelay] = useState(0);

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
                const response = await get(GET_WHY_CHOOSE_US_BY_ID(id));
                if (response.success && response.data) {
                    const d = response.data;
                    setTitle(d.title);
                    setDescription(d.description);
                    setIcon(d.icon);
                    setColor(d.color);
                    setBgColor(d.bgColor);
                    setDelay(d.delay);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            title,
            description,
            icon,
            color,
            bgColor,
            delay: Number(delay)
        };

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateWhyChooseUsItemAction({ id, data }));
            } else {
                resultAction = await dispatch(createWhyChooseUsItemAction(data));
            }

            if (updateWhyChooseUsItemAction.fulfilled.match(resultAction) || createWhyChooseUsItemAction.fulfilled.match(resultAction)) {
                AlertDialog("Success!", id ? "Updated successfully" : "Created successfully", "success", 3000, false, false);
                router.push("/superadmin/content/why-choose-us");
            } else {
                throw new Error(resultAction.payload as string || "Operation failed");
            }
        } catch (error: any) {
            AlertDialog("Error!", error.message || "Operation failed", "error", 5000);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin text-cyan-600" /></div>;

    return (
        <div className="max-w-4xl mx-auto pb-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-cyan-600 transition-colors mb-4">
                    <ArrowLeft size={20} /> Back to List
                </button>
                <h1 className="text-3xl font-bold text-gray-800">{id ? "Edit Feature" : "Add Feature"}</h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <HelpCircle className="text-cyan-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Feature Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Feature Title</label>
                            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500" placeholder="e.g. 24/7 Support" required />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500" placeholder="Explain the benefit..." required />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Icon Name</label>
                            <div className="relative">
                                <Zap className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input type="text" value={icon} onChange={e => setIcon(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500" placeholder="e.g. ShieldCheck" required />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Lucide React icon name</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Animation Delay (ms)</label>
                            <div className="relative">
                                <Clock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input type="number" value={delay} onChange={e => setDelay(Number(e.target.value))} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500" placeholder="e.g. 0" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Gradient Class</label>
                            <div className="relative">
                                <Palette className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input type="text" value={color} onChange={e => setColor(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500" placeholder="e.g. from-blue-500 to-cyan-500" required />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Background Color Class</label>
                            <div className="relative">
                                <Layout className="absolute left-3 top-3.5 text-gray-400" size={18} />
                                <input type="text" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-cyan-500" placeholder="e.g. bg-blue-50" required />
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="flex justify-end pt-4">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Feature" : "Create Feature"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditWhyChooseUs;
