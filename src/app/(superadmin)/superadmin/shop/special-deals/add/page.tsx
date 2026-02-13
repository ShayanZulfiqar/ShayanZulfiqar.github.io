"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShopSpecialDeal } from "@/types/shop";
import { Save, X, Loader2, Clock } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useAppDispatch } from "@/store/hooks";
import { createSpecialDealAction } from "@/store/slices/shopSlice";

const AddShopSpecialDeal = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<ShopSpecialDeal>({
        title: "",
        description: "",
        dealEndTime: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(createSpecialDealAction(formData)).unwrap();
            Swal.fire("Success", "Special deal added successfully!", "success");
            router.push("/superadmin/shop/special-deals");
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to add deal", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Add Special Deal</h1>
                    <p className="text-gray-500 mt-2">Create a new time-limited promotion</p>
                </div>
                <Link href="/superadmin/shop/special-deals">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} />
                        Cancel
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Title</label>
                        <input
                            required
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                            placeholder="e.g. 50% Off Flash Sale"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                            placeholder="Describe the deal conditions..."
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 font-flex items-center gap-2">
                            <Clock size={16} />
                            Deal End Time
                        </label>
                        <input
                            required
                            type="datetime-local"
                            name="dealEndTime"
                            value={formData.dealEndTime}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
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
                        Save Special Deal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddShopSpecialDeal;
