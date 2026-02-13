"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShopTrending } from "@/types/shop";
import { Save, X, Loader2 } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/store/hooks";
import { createTrendingProductAction } from "@/store/slices/shopSlice";

const AddShopTrending = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ShopTrending>({
        title: "",
        description: "",
        productsNumber: "",
        ratingNumber: "",
        reviewNumber: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(createTrendingProductAction(formData)).unwrap();
            Swal.fire("Success", "Trending item added successfully!", "success");
            router.push("/superadmin/shop/trending");
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to add trending item", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Add Trending Item</h1>
                    <p className="text-gray-500 mt-2">Display a trending category or collection</p>
                </div>
                <Link href="/superadmin/shop/trending">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} />
                        Cancel
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Title</label>
                        <input
                            required
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                            placeholder="e.g. Minimalist Home Decor"
                        />
                    </div>

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                            placeholder="Why is this trending?"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Products Count</label>
                        <input
                            required
                            type="text"
                            name="productsNumber"
                            value={formData.productsNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                            placeholder="e.g. 150+ Products"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Average Rating</label>
                        <input
                            required
                            type="text"
                            name="ratingNumber"
                            value={formData.ratingNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                            placeholder="e.g. 4.8 Rating"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Total Reviews</label>
                        <input
                            required
                            type="text"
                            name="reviewNumber"
                            value={formData.reviewNumber}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                            placeholder="e.g. 2.5k Reviews"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        disabled={loading}
                        type="submit"
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Trending Item
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddShopTrending;
