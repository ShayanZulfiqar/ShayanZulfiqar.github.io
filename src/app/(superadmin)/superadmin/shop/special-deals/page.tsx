"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchSpecialDeals, deleteSpecialDealAction } from "@/store/slices/shopSlice";
import { ShopSpecialDeal } from "@/types/shop";
import {
    Loader2,
    Plus,
    Pencil,
    Trash2,
    Search,
    Clock
} from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";

const ShopSpecialDealList = () => {
    const dispatch = useAppDispatch();
    const { data: items, loading } = useAppSelector((state) => state.shop.specialDeals);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchSpecialDeals());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                const resultAction = await dispatch(deleteSpecialDealAction(id));
                if (deleteSpecialDealAction.fulfilled.match(resultAction)) {
                    Swal.fire("Deleted!", "Item has been deleted.", "success");
                } else {
                    throw new Error(resultAction.payload as string || "Failed to delete");
                }
            } catch (error: any) {
                Swal.fire("Error!", error.message || "Failed to delete", "error");
            }
        }
    };

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Special Deals</h1>
                    <p className="text-gray-500 mt-2">Manage limited-time offers and promotions</p>
                </div>
                <Link href="/superadmin/shop/special-deals/add">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg">
                        <Plus size={20} />
                        Add Special Deal
                    </button>
                </Link>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search deals..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Title</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Description</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Ends At</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <Loader2 className="animate-spin inline-block text-purple-600" size={32} />
                                    </td>
                                </tr>
                            ) : filteredItems.length > 0 ? (
                                filteredItems.map((item) => (
                                    <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-gray-800">{item.title}</td>
                                        <td className="px-6 py-4 text-gray-600 max-w-sm truncate">{item.description}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            {item.dealEndTime ? new Date(item.dealEndTime).toLocaleString() : "N/A"}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/superadmin/shop/special-deals/edit/${item._id}`}>
                                                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                                                        <Pencil size={18} />
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item._id!)}
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
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Clock size={48} className="mb-4 opacity-50" />
                                            <p className="text-lg font-medium">No special deals found</p>
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

export default ShopSpecialDealList;
