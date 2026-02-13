"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Save,
    ArrowLeft,
    Loader2,
    User,
    Mail,
    Phone,
    Briefcase,
    Globe,
    MessageSquare,
    Layout
} from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_CONTACT_US_BY_ID } from "@/services/ApiRoutes";
import { ContactSubmission } from "@/types/landing";
import { createContactUsAction, updateContactUsAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditContactUs = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Form State
    const [formData, setFormData] = useState<Omit<ContactSubmission, "_id" | "id" | "createdAt" | "updatedAt">>({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: ""
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
                const response = await get(GET_CONTACT_US_BY_ID(id));
                if (response.success && response.data) {
                    setFormData({
                        name: response.data.name,
                        email: response.data.email,
                        phone: response.data.phone,
                        company: response.data.company,
                        service: response.data.service,
                        message: response.data.message
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
                router.push("/superadmin/content/contact-us");
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let resultAction;
            if (id) {
                resultAction = await dispatch(updateContactUsAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createContactUsAction(formData));
            }

            if (updateContactUsAction.fulfilled.match(resultAction) || createContactUsAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    id ? "Submission updated successfully" : "Submission created successfully",
                    "success",
                    5000,
                    false,
                    false
                );
                router.push("/superadmin/content/contact-us");
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
        <div className="max-w-4xl mx-auto pb-10">
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
                    {id ? "Edit Submission" : "Create Submission"}
                </h1>
                <p className="text-gray-500 mt-2">
                    {id ? "Update the details of this inquiry below" : "Manually log a new contact inquiry"}
                </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
                >
                    <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                        <Layout className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Submission Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <User size={16} className="text-blue-500" />
                                    Full Name
                                </div>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. John Doe"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} className="text-red-500" />
                                    Email Address
                                </div>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. john@example.com"
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Phone size={16} className="text-green-500" />
                                    Phone Number
                                </div>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. +1 234 567 890"
                                required
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Briefcase size={16} className="text-purple-500" />
                                    Company Name
                                </div>
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Acme Corp"
                                required
                            />
                        </div>

                        {/* Service */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <Globe size={16} className="text-orange-500" />
                                    Service Interested In
                                </div>
                            </label>
                            <input
                                type="text"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. Web Development"
                                required
                            />
                        </div>

                        {/* Message */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <MessageSquare size={16} className="text-indigo-500" />
                                    Message
                                </div>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Enter the message content here..."
                                required
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-end"
                >
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {id ? "Update Submission" : "Save Submission"}
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default AddEditContactUs;
