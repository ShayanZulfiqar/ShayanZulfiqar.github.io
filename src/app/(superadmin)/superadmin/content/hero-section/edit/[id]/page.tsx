"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Palette, Loader2, Zap } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { updateHeroSectionAction, fetchHeroSections } from "@/store/slices/landingSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const EditHeroSectionPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);
    const { hero: { data: heroSections, loading: sliceLoading } } = useAppSelector((state) => state.landing);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [showGradientPicker, setShowGradientPicker] = useState(false);
    const [showBgGradientPicker, setShowBgGradientPicker] = useState(false);
    const [showBadgeColorPicker, setShowBadgeColorPicker] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        highlight: "",
        subtitle: "",
        gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        bgGradient: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        icon: "",
        badge: "",
        badgeColor: "#667eea",
    });

    // Check authentication
    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    // Fetch hero section data
    useEffect(() => {
        const loadData = async () => {
            try {
                setFetchingData(true);
                // Ensure data is loaded in store
                if (heroSections.length === 0) {
                    await dispatch(fetchHeroSections());
                }

                // Find current hero in store
                // Use a direct fetch or re-fetch if needed for latest data, but store should be fine
                const currentHero = heroSections.find(h => h._id === id || h.id === id);

                if (currentHero) {
                    setFormData({
                        title: currentHero.title,
                        highlight: currentHero.highlight,
                        subtitle: currentHero.subtitle,
                        gradient: currentHero.gradient,
                        bgGradient: currentHero.bgGradient,
                        icon: currentHero.icon || "",
                        badge: currentHero.badge,
                        badgeColor: currentHero.badgeColor,
                    });
                } else if (heroSections.length > 0) {
                    // If not found even after load, it might not exist
                    AlertDialog("Error!", "Hero section not found", "error", 3000, false, false);
                    router.push("/superadmin/content/hero-section");
                }
            } catch (error: any) {
                AlertDialog(
                    "Error!",
                    "Failed to load hero section",
                    "error",
                    3000,
                    false,
                    false
                );
            } finally {
                setFetchingData(false);
            }
        };

        loadData();
    }, [id, dispatch, heroSections, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.highlight.trim() || !formData.subtitle.trim() || !formData.badge.trim()) {
            AlertDialog("Error!", "Please fill in all required fields", "error", 3000, false, false);
            return;
        }

        try {
            setLoading(true);
            const resultAction = await dispatch(updateHeroSectionAction({ id, data: formData }));

            if (updateHeroSectionAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    "Hero section updated successfully!",
                    "success",
                    1500,
                    false,
                    false
                );
                router.push("/superadmin/content/hero-section");
            } else {
                throw new Error(resultAction.payload as string || "Failed to update hero section");
            }
        } catch (error: any) {
            AlertDialog(
                "Error!",
                error.message || "Failed to update hero section",
                "error",
                3000,
                false,
                false
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading hero section...</p>
                </div>
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
                    onClick={() => router.push("/superadmin/content/hero-section")}
                    className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                        Edit Hero Section
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <Zap size={16} className="text-blue-600" />
                        <span>Update the hero section for your landing page</span>
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
                            placeholder="e.g., Welcome to Our Platform"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Highlight */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Highlight Text <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="highlight"
                            value={formData.highlight}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Innovation"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Subtitle <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="subtitle"
                            value={formData.subtitle}
                            onChange={handleChange}
                            required
                            rows={3}
                            placeholder="Describe your hero section..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    {/* Badge */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Badge Text <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="badge"
                                value={formData.badge}
                                onChange={handleChange}
                                required
                                placeholder="e.g., New Feature"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Badge Color */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Palette size={16} className="text-blue-600" />
                                Badge Color
                            </label>
                            <div className="space-y-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={formData.badgeColor}
                                        onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                                        className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase font-mono"
                                        placeholder="#667eea"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowBadgeColorPicker(!showBadgeColorPicker)}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-8 rounded border-2 border-gray-300 shadow-sm hover:shadow-md transition-all"
                                        style={{ backgroundColor: formData.badgeColor }}
                                    />
                                </div>

                                {showBadgeColorPicker && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative"
                                    >
                                        <div className="absolute z-10 bg-white p-4 rounded-xl shadow-2xl border border-gray-200">
                                            <HexColorPicker
                                                color={formData.badgeColor}
                                                onChange={(color) => setFormData({ ...formData, badgeColor: color })}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowBadgeColorPicker(false)}
                                                className="mt-3 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium text-sm"
                                            >
                                                Done
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Icon (Optional) */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Icon (Optional)
                        </label>
                        <input
                            type="text"
                            name="icon"
                            value={formData.icon}
                            onChange={handleChange}
                            placeholder="e.g., Sparkles, Zap (Lucide React icon name)"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Gradients */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Text Gradient */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Palette size={16} className="text-blue-600" />
                                Text Gradient
                            </label>
                            <input
                                type="text"
                                name="gradient"
                                value={formData.gradient}
                                onChange={handleChange}
                                placeholder="linear-gradient(...)"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                            />
                            <div
                                className="mt-2 h-12 rounded-lg border-2 border-gray-300"
                                style={{ background: formData.gradient }}
                            />
                        </div>

                        {/* Background Gradient */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Palette size={16} className="text-cyan-600" />
                                Background Gradient
                            </label>
                            <input
                                type="text"
                                name="bgGradient"
                                value={formData.bgGradient}
                                onChange={handleChange}
                                placeholder="linear-gradient(...)"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent font-mono text-sm"
                            />
                            <div
                                className="mt-2 h-12 rounded-lg border-2 border-gray-300"
                                style={{ background: formData.bgGradient }}
                            />
                        </div>
                    </div>

                    {/* Preview Card */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Live Preview</label>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-8 rounded-xl border-2 border-dashed border-gray-300 transition-all"
                            style={{ background: formData.bgGradient }}
                        >
                            <div className="text-center space-y-4">
                                {formData.badge && (
                                    <span
                                        className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                                        style={{ backgroundColor: formData.badgeColor }}
                                    >
                                        {formData.badge}
                                    </span>
                                )}
                                <h2
                                    className="text-3xl font-bold"
                                    style={{ background: formData.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                                >
                                    {formData.title || "Hero Title"} <span className="text-purple-600">{formData.highlight || "Highlight"}</span>
                                </h2>
                                <p className="text-gray-700 max-w-2xl mx-auto">
                                    {formData.subtitle || "Hero subtitle will appear here..."}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.push("/superadmin/content/hero-section")}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-semibold transition-all hover:shadow-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    <span>Update Hero Section</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditHeroSectionPage;
