"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ShopFaq } from "@/types/shop";
import {
    Loader2,
    Save,
    X,
    Bold,
    Italic,
    MessageSquare,
    List,
    ChevronLeft
} from "lucide-react";
import AlertDialog from "@/utils/AlertDialog";
import { get } from "@/services/ApiService";
import { GET_FAQ_SHOP_BY_ID } from "@/services/ApiRoutes";
import { useAppDispatch } from "@/store/hooks";
import { updateFaqAction } from "@/store/slices/shopSlice";

const EditFaqPage = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    useEffect(() => {
        if (id) {
            const fetchFaq = async () => {
                try {
                    const res = await get(GET_FAQ_SHOP_BY_ID(id));
                    const data = res.data || res;
                    // The backend might return { success: true, faq: {...} } or { success: true, data: {...} }
                    // Based on previous code: res.faq || res.data
                    const faqData = data.faq || data.data || data;

                    if (faqData) {
                        setQuestion(faqData.question || "");
                        setAnswer(faqData.answer || "");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to fetch FAQ details",
                        "error",
                        3000,
                        false,
                        false
                    );
                    router.push("/superadmin/shop/faq");
                } finally {
                    setFetching(false);
                }
            };
            fetchFaq();
        }
    }, [id, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!question || !answer) {
            AlertDialog("Error!", "Please fill in all fields", "error", 3000, false, false);
            return;
        }

        const data: Partial<ShopFaq> = { question, answer };

        setLoading(true);
        try {
            await dispatch(updateFaqAction({ id, data })).unwrap();
            AlertDialog("Success!", "FAQ updated successfully.", "success", 3000, false, false);
            router.push("/superadmin/shop/faq");
        } catch (error: any) {
            AlertDialog(
                "Error!",
                error.message || "Operation failed",
                "error",
                3000,
                false,
                false
            );
        } finally {
            setLoading(false);
        }
    };

    const applyFormatting = (tag: string) => {
        const textarea = document.getElementById("faq-answer") as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        if (!selectedText) return;

        let formattedText = "";
        if (tag === 'ul') {
            // Split by newline and wrap each line in <li> if it's a list
            const lines = selectedText.split('\n').filter(line => line.trim() !== "");
            const listItems = lines.map(line => `  <li>${line.trim()}</li>`).join('\n');
            formattedText = `<ul>\n${listItems}\n</ul>`;
        } else {
            formattedText = `<${tag}>${selectedText}</${tag}>`;
        }

        const newText = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);

        setAnswer(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start, start + formattedText.length);
        }, 10);
    };

    if (fetching) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-purple-600 mb-4" size={48} />
                <p className="text-slate-500 font-bold animate-pulse">Fetching FAQ details...</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-8 px-4">
            <button
                onClick={() => router.push("/superadmin/shop/faq")}
                className="flex items-center gap-2 text-slate-500 hover:text-purple-600 font-bold mb-8 transition-colors group"
            >
                <div className="p-2 bg-white rounded-lg group-hover:bg-purple-50 transition-colors shadow-sm border border-slate-100">
                    <ChevronLeft size={20} />
                </div>
                Back to FAQs
            </button>

            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-purple-100 overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-12 -mr-24 -mt-24 bg-purple-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />

                <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-4 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-200">
                            <MessageSquare size={28} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                                Update FAQ
                            </h2>
                            <p className="text-slate-500 font-medium">
                                Edit the existing question and answer
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-wider">Question</label>
                            <input
                                type="text"
                                placeholder="What is your return policy?"
                                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 transition-all font-semibold text-slate-800 placeholder:text-slate-300"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-black text-slate-700 mb-3 uppercase tracking-wider">Answer (formatting supported)</label>
                            <div className="border border-slate-200 rounded-2xl overflow-hidden focus-within:ring-4 focus-within:ring-purple-500/10 focus-within:border-purple-500 transition-all shadow-sm">
                                {/* Simple Toolbar */}
                                <div className="bg-slate-50 border-b border-slate-200 p-3 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => applyFormatting('b')}
                                        className="p-3 bg-white hover:bg-purple-50 rounded-xl text-slate-700 hover:text-purple-600 transition-all border border-slate-200 shadow-sm hover:scale-105 active:scale-95"
                                        title="Bold"
                                    >
                                        <Bold size={20} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormatting('i')}
                                        className="p-3 bg-white hover:bg-purple-50 rounded-xl text-slate-700 hover:text-purple-600 transition-all border border-slate-200 shadow-sm hover:scale-105 active:scale-95"
                                        title="Italic"
                                    >
                                        <Italic size={20} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => applyFormatting('ul')}
                                        className="p-3 bg-white hover:bg-purple-50 rounded-xl text-slate-700 hover:text-purple-600 transition-all border border-slate-200 shadow-sm hover:scale-105 active:scale-95"
                                        title="Bullet List"
                                    >
                                        <List size={20} />
                                    </button>
                                    <div className="w-px h-8 bg-slate-200 mx-1 self-center" />
                                    <span className="text-[10px] text-slate-400 self-center font-black uppercase tracking-widest hidden md:block">Highlight text & click icons</span>
                                </div>
                                <textarea
                                    id="faq-answer"
                                    placeholder="Provide a detailed and helpful answer here..."
                                    rows={8}
                                    className="w-full px-6 py-4 focus:outline-none font-medium resize-none text-slate-700 leading-relaxed text-lg"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-400">Formatting: use tags like &lt;b&gt; and &lt;i&gt;</span>
                                <div className="flex gap-2">
                                    <div className={`w-2 h-2 rounded-full ${answer.length > 0 ? "bg-green-500" : "bg-slate-200"}`} />
                                    <div className={`w-2 h-2 rounded-full ${question.length > 0 ? "bg-green-500" : "bg-slate-200"}`} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-purple-200 hover:shadow-purple-300 transition-all active:scale-[0.98] disabled:opacity-70 disabled:scale-100"
                            >
                                {loading ? <Loader2 className="animate-spin" size={24} /> : <Save size={24} />}
                                Update FAQ Entry
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/superadmin/shop/faq")}
                                className="px-8 py-5 rounded-2xl font-black text-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all flex items-center justify-center gap-2 border border-slate-200"
                            >
                                <X size={20} />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditFaqPage;
