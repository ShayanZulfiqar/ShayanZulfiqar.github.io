"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Save,
    ArrowLeft,
    Loader2,
    HelpCircle,
    MessageCircle,
    FileQuestion
} from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_GOT_QUESTION_BY_ID } from "@/services/ApiRoutes";
import { GotQuestion } from "@/types/landing";
import { createQuestionAction, updateQuestionAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddEditGotQuestion = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const { user, token } = useAppSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!!id);

    // Form State
    const [formData, setFormData] = useState<Omit<GotQuestion, "_id" | "id" | "createdAt" | "updatedAt">>({
        question: "",
        answer: ""
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
                const response = await get(GET_GOT_QUESTION_BY_ID(id));
                if (response.success && response.data) {
                    setFormData({
                        question: response.data.question,
                        answer: response.data.answer
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
                router.push("/superadmin/content/got-questions");
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
                resultAction = await dispatch(updateQuestionAction({ id, data: formData }));
            } else {
                resultAction = await dispatch(createQuestionAction(formData));
            }

            if (updateQuestionAction.fulfilled.match(resultAction) || createQuestionAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    id ? "Question updated successfully" : "Question created successfully",
                    "success",
                    5000,
                    false,
                    false
                );
                router.push("/superadmin/content/got-questions");
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
                    {id ? "Edit Question" : "Add New Question"}
                </h1>
                <p className="text-gray-500 mt-2">
                    {id ? "Update the FAQ details below" : "Create a new frequently asked question and answer"}
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
                        <FileQuestion className="text-blue-600" size={24} />
                        <h2 className="text-xl font-bold text-gray-800">Question Details</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Question */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <HelpCircle size={16} className="text-blue-500" />
                                    Question
                                </div>
                            </label>
                            <input
                                type="text"
                                name="question"
                                value={formData.question}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                placeholder="e.g. How do I reset my password?"
                                required
                            />
                        </div>

                        {/* Answer */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                <div className="flex items-center gap-2">
                                    <MessageCircle size={16} className="text-green-500" />
                                    Answer
                                </div>
                            </label>
                            <textarea
                                name="answer"
                                value={formData.answer}
                                onChange={handleInputChange}
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                placeholder="Provide a detailed answer here..."
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
                        {id ? "Update Question" : "Save Question"}
                    </button>
                </motion.div>
            </form>
        </div>
    );
};

export default AddEditGotQuestion;
