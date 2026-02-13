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
    Type,
    Quote,
    Image as ImageIcon,
    Flag,
    BarChart2,
    Layout,
    Palette
} from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_OUR_JOURNEY_BY_ID } from "@/services/ApiRoutes";
import { OurJourney } from "@/types/landing";
import { createOurJourneyAction, updateOurJourneyAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditOurJourney = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Initial State
    const initialState: Omit<OurJourney, "_id" | "createdAt" | "updatedAt"> = {
        sectionTitle: "",
        mainTitle: "",
        mainTitleGradient: "",
        subtitle: "",
        storyParagraphs: [],
        quoteBox: {
            quoteText: "",
            quoteAuthor: "",
            quoteDesignation: "",
            quoteGradient: "",
            quoteBorderColor: ""
        },
        visualSection: {
            visualIcon: "",
            visualYears: "",
            visualSubtitle: "",
            floatingStats: []
        },
        milestones: []
    };

    const [formData, setFormData] = useState(initialState);

    // Check Auth
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
                const response = await get(GET_OUR_JOURNEY_BY_ID(id));
                if (response.success && response.data) {
                    setFormData({
                        sectionTitle: response.data.sectionTitle,
                        mainTitle: response.data.mainTitle,
                        mainTitleGradient: response.data.mainTitleGradient || "",
                        subtitle: response.data.subtitle || "",
                        storyParagraphs: response.data.storyParagraphs || [],
                        quoteBox: response.data.quoteBox || initialState.quoteBox,
                        visualSection: response.data.visualSection || initialState.visualSection,
                        milestones: response.data.milestones || []
                    });
                }
            } catch (error: any) {
                AlertDialog("Error!", error.response?.data?.message || "Failed to fetch data", "error", 3000, false, false);
                router.push("/superadmin/content/our-journey");
            } finally {
                setFetching(false);
            }
        };

        if (id) fetchData();
    }, [id, router]);

    // --- Handlers ---

    // Top-Level Inputs
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Story Paragraphs
    const addParagraph = () => setFormData(p => ({ ...p, storyParagraphs: [...p.storyParagraphs, ""] }));
    const removeParagraph = (idx: number) => setFormData(p => ({ ...p, storyParagraphs: p.storyParagraphs.filter((_, i) => i !== idx) }));
    const handleParagraphChange = (idx: number, val: string) => {
        const newArr = [...formData.storyParagraphs];
        newArr[idx] = val;
        setFormData(p => ({ ...p, storyParagraphs: newArr }));
    };

    // Quote Box
    const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, quoteBox: { ...p.quoteBox, [name]: value } }));
    };

    // Visual Section Top Level
    const handleVisualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, visualSection: { ...p.visualSection, [name]: value } }));
    };

    // Floating Stats
    const addStat = () => setFormData(p => ({
        ...p,
        visualSection: {
            ...p.visualSection,
            floatingStats: [...p.visualSection.floatingStats, { icon: "", iconBg: "", iconColor: "", title: "", subtitle: "" }]
        }
    }));
    const removeStat = (idx: number) => setFormData(p => ({
        ...p,
        visualSection: {
            ...p.visualSection,
            floatingStats: p.visualSection.floatingStats.filter((_, i) => i !== idx)
        }
    }));
    const handleStatChange = (idx: number, field: string, val: string) => {
        const newStats = [...formData.visualSection.floatingStats];
        // @ts-ignore
        newStats[idx][field] = val;
        setFormData(p => ({ ...p, visualSection: { ...p.visualSection, floatingStats: newStats } }));
    };

    // Milestones
    const addMilestone = () => setFormData(p => ({
        ...p,
        milestones: [...p.milestones, { year: "", title: "", description: "", icon: "", colorGradient: "" }]
    }));
    const removeMilestone = (idx: number) => setFormData(p => ({ ...p, milestones: p.milestones.filter((_, i) => i !== idx) }));
    const handleMilestoneChange = (idx: number, field: string, val: string) => {
        const newMilestones = [...formData.milestones];
        // @ts-ignore
        newMilestones[idx][field] = val;
        setFormData(p => ({ ...p, milestones: newMilestones }));
    };

    // Submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateOurJourneyAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createOurJourneyAction(formData));
            }

            if (updateOurJourneyAction.fulfilled.match(resultAction) || createOurJourneyAction.fulfilled.match(resultAction)) {
                AlertDialog("Success!", id ? "Updated successfully" : "Created successfully", "success", 5000, false, false);
                router.push("/superadmin/content/our-journey");
            } else {
                const error = resultAction.payload as string || "Operation failed";
                AlertDialog("Error!", error, "error", 5000, false, false);
            }
        } catch (error: any) {
            AlertDialog("Error!", error.message || "Operation failed", "error", 5000, false, false);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-600" /></div>;

    return (
        <div className="max-w-5xl mx-auto pb-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-4">
                    <ArrowLeft size={20} /> Back to List
                </button>
                <h1 className="text-3xl font-bold text-gray-800">{id ? "Edit Journey Section" : "Add Journey Section"}</h1>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Main Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Layout className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Header Information</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Section Title (Badge)</label>
                            <input type="text" name="sectionTitle" value={formData.sectionTitle} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Main Title</label>
                            <input type="text" name="mainTitle" value={formData.mainTitle} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Title Gradient Class</label>
                            <input type="text" name="mainTitleGradient" value={formData.mainTitleGradient} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" placeholder="from-blue-600 to-cyan-600" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                            <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>
                </motion.div>

                {/* 2. Story Paragraphs */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <Type className="text-purple-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Story Paragraphs</h2>
                        </div>
                        <button type="button" onClick={addParagraph} className="flex items-center gap-2 text-sm bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg font-medium"><Plus size={16} /> Add Paragraph</button>
                    </div>
                    <div className="space-y-3">
                        {formData.storyParagraphs.map((para, idx) => (
                            <div key={idx} className="flex gap-2">
                                <textarea value={para} onChange={(e) => handleParagraphChange(idx, e.target.value)} rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500" placeholder={`Paragraph ${idx + 1}`} required />
                                <button type="button" onClick={() => removeParagraph(idx)} className="text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 3. Quote Box */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Quote className="text-orange-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Quote Box</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Quote Text</label>
                            <textarea name="quoteText" value={formData.quoteBox.quoteText} onChange={handleQuoteChange} rows={2} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                            <input type="text" name="quoteAuthor" value={formData.quoteBox.quoteAuthor} onChange={handleQuoteChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                            <input type="text" name="quoteDesignation" value={formData.quoteBox.quoteDesignation} onChange={handleQuoteChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500" required />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Gradient Class</label>
                            <input type="text" name="quoteGradient" value={formData.quoteBox.quoteGradient} onChange={handleQuoteChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500" placeholder="bg-gradient-to-r ..." />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Border Color</label>
                            <input type="text" name="quoteBorderColor" value={formData.quoteBox.quoteBorderColor} onChange={handleQuoteChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500" placeholder="border-l-orange-500" />
                        </div>
                    </div>
                </motion.div>

                {/* 4. Visual Section & Stats */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <ImageIcon className="text-teal-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Visuals & Stats</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Main Icon</label>
                            <input type="text" name="visualIcon" value={formData.visualSection.visualIcon} onChange={handleVisualChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Highlight Year(s)</label>
                            <input type="text" name="visualYears" value={formData.visualSection.visualYears} onChange={handleVisualChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Subtitle</label>
                            <input type="text" name="visualSubtitle" value={formData.visualSection.visualSubtitle} onChange={handleVisualChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-700">Floating Stats</h3>
                            <button type="button" onClick={addStat} className="text-sm text-teal-600 font-medium">+ Add Stat</button>
                        </div>
                        {formData.visualSection.floatingStats.map((stat, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-5 gap-3 relative">
                                <button type="button" onClick={() => removeStat(idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                <input placeholder="Icon Name" value={stat.icon} onChange={(e) => handleStatChange(idx, 'icon', e.target.value)} className="px-3 py-2 rounded border border-gray-300 text-sm" />
                                <input placeholder="Icon Bg (bg-white)" value={stat.iconBg} onChange={(e) => handleStatChange(idx, 'iconBg', e.target.value)} className="px-3 py-2 rounded border border-gray-300 text-sm" />
                                <input placeholder="Icon Color (text-blue-500)" value={stat.iconColor} onChange={(e) => handleStatChange(idx, 'iconColor', e.target.value)} className="px-3 py-2 rounded border border-gray-300 text-sm" />
                                <input placeholder="Title (e.g. 50+)" value={stat.title} onChange={(e) => handleStatChange(idx, 'title', e.target.value)} className="px-3 py-2 rounded border border-gray-300 text-sm" />
                                <input placeholder="Subtitle" value={stat.subtitle} onChange={(e) => handleStatChange(idx, 'subtitle', e.target.value)} className="px-3 py-2 rounded border border-gray-300 text-sm" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 5. Milestones */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <Flag className="text-red-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Milestones</h2>
                        </div>
                        <button type="button" onClick={addMilestone} className="flex items-center gap-2 text-sm bg-red-50 text-red-700 px-3 py-1.5 rounded-lg font-medium"><Plus size={16} /> Add Milestone</button>
                    </div>
                    <div className="space-y-4">
                        {formData.milestones.map((ms, idx) => (
                            <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                                <button type="button" onClick={() => removeMilestone(idx)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Year</label>
                                    <input value={ms.year} onChange={(e) => handleMilestoneChange(idx, 'year', e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" placeholder="2023" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                                    <input value={ms.title} onChange={(e) => handleMilestoneChange(idx, 'title', e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" placeholder="Founded" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Gradient Class</label>
                                    <input value={ms.colorGradient} onChange={(e) => handleMilestoneChange(idx, 'colorGradient', e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" placeholder="from-blue-600 to-cyan-600" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Icon Name</label>
                                    <input value={ms.icon} onChange={(e) => handleMilestoneChange(idx, 'icon', e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" placeholder="Award" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">Description</label>
                                    <textarea value={ms.description} onChange={(e) => handleMilestoneChange(idx, 'description', e.target.value)} className="w-full px-3 py-2 rounded border border-gray-300 text-sm" rows={2} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Section" : "Create Section"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditOurJourney;
