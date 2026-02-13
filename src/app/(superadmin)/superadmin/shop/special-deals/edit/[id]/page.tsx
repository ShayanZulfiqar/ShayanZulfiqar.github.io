"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ShopSpecialDeal } from "@/types/shop";
import { Save, X, Loader2, Clock } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { get } from "@/services/ApiService";
import { GET_SHOP_SPECIAL_DEAL_BY_ID } from "@/services/ApiRoutes";
import { useAppDispatch } from "@/store/hooks";
import { updateSpecialDealAction } from "@/store/slices/shopSlice";

const EditShopSpecialDeal = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState<ShopSpecialDeal>({
        title: "",
        description: "",
        dealEndTime: "",
    });

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await get(GET_SHOP_SPECIAL_DEAL_BY_ID(id));
                if (res) {
                    const data = res.data || res;
                    // Format date for datetime-local input
                    if (data.dealEndTime) {
                        data.dealEndTime = new Date(data.dealEndTime).toISOString().slice(0, 16);
                    }
                    setFormData(data);
                }
            } catch (error) {
                console.error("Failed to fetch deal:", error);
                Swal.fire("Error", "Could not load data", "error");
            } finally {
                setFetching(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(updateSpecialDealAction({ id, data: formData })).unwrap();
            Swal.fire("Success", "Special deal updated successfully!", "success");
            router.push("/superadmin/shop/special-deals");
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to update deal", "error");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-purple-600" size={48} />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Edit Special Deal</h1>
                    <p className="text-gray-500 mt-2">Modify the details of this promotion</p>
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
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
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
                        Update Special Deal
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditShopSpecialDeal;
