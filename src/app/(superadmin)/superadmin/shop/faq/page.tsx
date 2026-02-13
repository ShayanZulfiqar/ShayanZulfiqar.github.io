"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchShopFaqs, deleteShopFaqAction } from "@/store/slices/shopSlice";
import { ShopFaq } from "@/types/shop";
import {
    Loader2,
    Plus,
    Pencil,
    Trash2,
    Search,
    MessageSquare,
    HelpCircle
} from "lucide-react";
import { useRouter } from "next/navigation";
import AlertDialog from "@/utils/AlertDialog";

const ShopFaqManagement = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: faqs, loading } = useAppSelector((state) => state.shop.faqs);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchShopFaqs());
    }, [dispatch]);

    // Handle delete using the specific logic requested by the user
    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete FAQ",
            `Are you sure you want to delete the FAQ "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteShopFaqAction(id));
                    if (deleteShopFaqAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Success!",
                            "FAQ deleted successfully.",
                            "success",
                            3000,
                            false,
                            false
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to delete FAQ",
                        "error",
                        3000,
                        false,
                        false
                    );
                }
            }
        );
    };

    const filteredFaqs = (faqs || []).filter(f =>
        f && (
            (f.question?.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (f.answer?.toLowerCase().includes(searchTerm.toLowerCase()))
        )
    );

    return (
        <div className="p-6 max-w-[1600px] mx-auto min-h-screen bg-slate-50/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm border border-slate-100">
                            <MessageSquare className="text-purple-600" size={32} />
                        </div>
                        Shop FAQ Management
                    </h1>
                    <p className="text-slate-500 mt-2 font-medium">Create and organize product FAQs with rich text support</p>
                </div>
                <button
                    onClick={() => router.push("/superadmin/shop/faq/add")}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all"
                >
                    <Plus size={20} />
                    Add New FAQ
                </button>
            </div>

            {/* Search Section */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search existing FAQs..."
                        className="w-full pl-12 pr-6 py-2.5 rounded-xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:bg-white focus:border-purple-200 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-slate-400 text-sm font-bold ml-auto px-4">
                    TOTAL: {faqs.length}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-4 font-bold text-slate-700">Question</th>
                                <th className="px-6 py-4 font-bold text-slate-700">Answer Preview</th>
                                <th className="px-6 py-4 font-bold text-slate-700">Last Updated</th>
                                <th className="px-6 py-4 font-bold text-slate-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <Loader2 className="animate-spin inline-block text-purple-600" size={32} />
                                    </td>
                                </tr>
                            ) : filteredFaqs.length > 0 ? (
                                filteredFaqs.map((faq) => (
                                    <tr key={faq._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-slate-800">{faq.question}</span>
                                        </td>
                                        <td className="px-6 py-4 max-w-lg">
                                            <div
                                                className="text-slate-500 text-xs prose prose-sm prose-slate line-clamp-3 prose-ul:my-1 prose-li:my-0 prose-ul:list-inside"
                                                dangerouslySetInnerHTML={{ __html: faq.answer }}
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-xs">
                                            {new Date(faq.updatedAt || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => router.push(`/superadmin/shop/faq/edit/${faq._id}`)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(faq._id!, faq.question)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-300">
                                            <HelpCircle size={48} className="mb-4 opacity-50" />
                                            <p className="text-lg font-medium">No FAQs found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ShopFaqManagement;
