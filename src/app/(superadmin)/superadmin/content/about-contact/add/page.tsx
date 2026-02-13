"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Plus, Trash2, FileText, Mail, ExternalLink } from "lucide-react";
import { Contact, CtaButton } from "@/types/landing";
import { createAboutContactAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddAboutContactPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user, token } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        mainTitle: "",
        subtitle: "",
        contacts: [{ text: "", href: "" }] as Contact[],
        ctaButtons: [{ label: "", href: "" }] as CtaButton[],
    });

    // Check authentication
    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Contact handlers
    const addContact = () => {
        setFormData({
            ...formData,
            contacts: [...formData.contacts, { text: "", href: "" }],
        });
    };

    const removeContact = (index: number) => {
        setFormData({
            ...formData,
            contacts: formData.contacts.filter((_, i) => i !== index),
        });
    };

    const updateContact = (index: number, field: keyof Contact, value: string) => {
        const updatedContacts = [...formData.contacts];
        updatedContacts[index][field] = value;
        setFormData({ ...formData, contacts: updatedContacts });
    };

    // CTA Button handlers
    const addCtaButton = () => {
        setFormData({
            ...formData,
            ctaButtons: [...formData.ctaButtons, { label: "", href: "" }],
        });
    };

    const removeCtaButton = (index: number) => {
        setFormData({
            ...formData,
            ctaButtons: formData.ctaButtons.filter((_, i) => i !== index),
        });
    };

    const updateCtaButton = (index: number, field: keyof CtaButton, value: string) => {
        const updatedButtons = [...formData.ctaButtons];
        updatedButtons[index][field] = value;
        setFormData({ ...formData, ctaButtons: updatedButtons });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.mainTitle.trim() || !formData.subtitle.trim()) {
            AlertDialog("Error!", "Please fill in all required fields", "error", 3000, false, false);
            return;
        }

        // Validate contacts
        const validContacts = formData.contacts.filter(c => c.text.trim() && c.href.trim());
        if (validContacts.length === 0) {
            AlertDialog("Error!", "Please add at least one contact", "error", 3000, false, false);
            return;
        }

        // Validate CTA buttons
        const validButtons = formData.ctaButtons.filter(b => b.label.trim() && b.href.trim());
        if (validButtons.length === 0) {
            AlertDialog("Error!", "Please add at least one CTA button", "error", 3000, false, false);
            return;
        }

        try {
            setLoading(true);
            const startTime = performance.now();

            const resultAction = await dispatch(createAboutContactAction({
                ...formData,
                contacts: validContacts,
                ctaButtons: validButtons,
            }));

            const endTime = performance.now();
            console.log(`Create API Response Time: ${(endTime - startTime).toFixed(2)}ms`);

            if (createAboutContactAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    "About contact created successfully!",
                    "success",
                    1500,
                    false,
                    false
                );
                router.push("/superadmin/content/about-contact");
            } else {
                throw new Error(resultAction.payload as string || "Failed to create about contact");
            }
        } catch (error: any) {
            AlertDialog(
                "Error!",
                error.message || "Failed to create about contact",
                "error",
                3000,
                false,
                false
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <button
                    onClick={() => router.push("/superadmin/content/about-contact")}
                    className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                        Add New About Contact
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <FileText size={16} className="text-blue-600" />
                        <span>Create a new about us and contact section</span>
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
                    {/* Main Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Main Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mainTitle"
                            value={formData.mainTitle}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Let's Build Something Amazing Together"
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
                            placeholder="Ready to start your next project? Our team is here to turn your vision into reality..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    {/* Contacts Section */}
                    <div className="border-t pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <Mail size={20} className="text-blue-600" />
                                Contact Information
                            </h3>
                            <button
                                type="button"
                                onClick={addContact}
                                className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg transition-all font-medium text-sm"
                            >
                                <Plus size={16} />
                                Add Contact
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.contacts.map((contact, index) => (
                                <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex-1 space-y-3">
                                        <input
                                            type="text"
                                            value={contact.text}
                                            onChange={(e) => updateContact(index, "text", e.target.value)}
                                            placeholder="Contact text (e.g., info@hubmicro.com)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        />
                                        <input
                                            type="text"
                                            value={contact.href}
                                            onChange={(e) => updateContact(index, "href", e.target.value)}
                                            placeholder="Contact link (e.g., mailto:info@hubmicro.com)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        />
                                    </div>
                                    {formData.contacts.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeContact(index)}
                                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons Section */}
                    <div className="border-t pt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                <ExternalLink size={20} className="text-cyan-600" />
                                CTA Buttons
                            </h3>
                            <button
                                type="button"
                                onClick={addCtaButton}
                                className="flex items-center gap-2 bg-cyan-100 hover:bg-cyan-200 text-cyan-700 px-4 py-2 rounded-lg transition-all font-medium text-sm"
                            >
                                <Plus size={16} />
                                Add Button
                            </button>
                        </div>

                        <div className="space-y-4">
                            {formData.ctaButtons.map((button, index) => (
                                <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex-1 space-y-3">
                                        <input
                                            type="text"
                                            value={button.label}
                                            onChange={(e) => updateCtaButton(index, "label", e.target.value)}
                                            placeholder="Button label (e.g., Start a Project)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                                        />
                                        <input
                                            type="text"
                                            value={button.href}
                                            onChange={(e) => updateCtaButton(index, "href", e.target.value)}
                                            placeholder="Button link (e.g., /contact)"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                                        />
                                    </div>
                                    {formData.ctaButtons.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeCtaButton(index)}
                                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview Card */}
                    <div className="border-t pt-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Live Preview</label>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-dashed border-blue-300">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                {formData.mainTitle || "Main Title"}
                            </h3>
                            <p className="text-gray-600 mb-4">{formData.subtitle || "Subtitle will appear here..."}</p>

                            <div className="space-y-3 mb-4">
                                <p className="text-sm font-semibold text-gray-700">Contacts:</p>
                                {formData.contacts.filter(c => c.text).map((c, idx) => (
                                    <p key={idx} className="text-sm text-blue-600">• {c.text}</p>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {formData.ctaButtons.filter(b => b.label).map((b, idx) => (
                                    <span key={idx} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                                        {b.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.push("/superadmin/content/about-contact")}
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
                                    <span>Creating...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    <span>Create About Contact</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddAboutContactPage;
