"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Save,
    ArrowLeft,
    Plus,
    Trash2,
    Layout,
    Type,
    Zap,
    MessageSquare,
    Palette,
    CreditCard, // Placeholder for icon input
    Loader2
} from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_CONTACT_HERO_BY_ID } from "@/services/ApiRoutes";
import { ContactHero, ContactItem } from "@/types/landing";
import { createContactHeroAction, updateContactHeroAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditContactHero = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Form State
    const [formData, setFormData] = useState<Omit<ContactHero, "_id" | "id" | "createdAt" | "updatedAt">>({
        badgeText: "",
        mainTitle: "",
        subtitle: "",
        contacts: []
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
                const response = await get(GET_CONTACT_HERO_BY_ID(id));
                if (response.success && response.data) {
                    setFormData({
                        badgeText: response.data.badgeText,
                        mainTitle: response.data.mainTitle,
                        subtitle: response.data.subtitle,
                        contacts: response.data.contacts
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
                router.push("/superadmin/content/contact-hero");
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

    // Contacts Array Handling
    const addContact = () => {
        setFormData(prev => ({
            ...prev,
            contacts: [
                ...prev.contacts,
                { title: "", value: "", icon: "Mail", color: "text-blue-600" } // Default values
            ]
        }));
    };

    const removeContact = (index: number) => {
        setFormData(prev => ({
            ...prev,
            contacts: prev.contacts.filter((_, i) => i !== index)
        }));
    };

    const handleContactChange = (index: number, field: keyof ContactItem, value: string) => {
        const newContacts = [...formData.contacts];
        newContacts[index] = { ...newContacts[index], [field]: value };
        setFormData(prev => ({ ...prev, contacts: newContacts }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateContactHeroAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createContactHeroAction(formData));
            }

            if (updateContactHeroAction.fulfilled.match(resultAction) || createContactHeroAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    id ? "Contact Hero updated successfully" : "Contact Hero created successfully",
                    "success",
                    5000,
                    false,
                    false
                );
                router.push("/superadmin/content/contact-hero");
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
                    {id ? "Edit Contact Hero" : "Add New Contact Hero"}
                </h1>
                <p className="text-gray-500 mt-2">
                    {id ? "Update your contact hero details below" : "Fill in the details to create a new contact hero section"}
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
                        <Layout className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Main Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Badge Text */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Zap size={16} className="text-yellow-500" />
                                    Badge Text
                                </div>
                            </label>
                            <input
                                type="text"
                                name="badgeText"
                                value={formData.badgeText}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Contact Us Today"
                                required
                            />
                        </div>

                        {/* Main Title */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Type size={16} className="text-blue-500" />
                                    Main Title
                                </div>
                            </label>
                            <input
                                type="text"
                                name="mainTitle"
                                value={formData.mainTitle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Get in Touch"
                                required
                            />
                        </div>

                        {/* Subtitle */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={16} className="text-green-500" />
                                    Subtitle
                                </div>
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. We are here to help you"
                                required
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Contacts List Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
                >
                    <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                        <div className="flex items-center gap-3">
                            <CreditCard className="text-purple-600" size={24} />
                            <h2 className="text-xl font-bold text-gray-800">Contact Details</h2>
                        </div>
                        <button
                            type="button"
                            onClick={addContact}
                            className="flex items-center gap-2 text-sm bg-purple-50 text-purple-700 hover:bg-purple-100 px-3 py-1.5 rounded-lg font-medium transition-colors"
                        >
                            <Plus size={16} />
                            Add Contact
                        </button>
                    </div>

                    <div className="space-y-4">
                        {formData.contacts.map((contact, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-gray-50 rounded-xl p-4 border border-gray-200 relative group"
                            >
                                <button
                                    type="button"
                                    onClick={() => removeContact(index)}
                                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="Remove Contact"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pr-8">
                                    {/* Contact Title */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Title</label>
                                        <input
                                            type="text"
                                            value={contact.title}
                                            onChange={(e) => handleContactChange(index, "title", e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                            placeholder="e.g. Email"
                                            required
                                        />
                                    </div>

                                    {/* Contact Value */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Value</label>
                                        <input
                                            type="text"
                                            value={contact.value}
                                            onChange={(e) => handleContactChange(index, "value", e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                            placeholder="e.g. hello@example.com"
                                            required
                                        />
                                    </div>

                                    {/* Icon Name */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Lucide Icon Name</label>
                                        <input
                                            type="text"
                                            value={contact.icon}
                                            onChange={(e) => handleContactChange(index, "icon", e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                            placeholder="e.g. Rocket"
                                            required
                                        />
                                    </div>

                                    {/* Color */}
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">Color/Gradient Class</label>
                                        <input
                                            type="text"
                                            value={contact.color}
                                            onChange={(e) => handleContactChange(index, "color", e.target.value)}
                                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                            placeholder="e.g. text-red-500"
                                            required
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {formData.contacts.length === 0 && (
                            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
                                <p>No contacts added yet. Click &quot;Add Contact&quot; to start.</p>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-end"
                >
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Changes" : "Save Contact Hero"}
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default AddEditContactHero;
