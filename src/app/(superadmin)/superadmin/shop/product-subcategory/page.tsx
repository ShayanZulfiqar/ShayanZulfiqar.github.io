"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProductSubCategories, deleteSubCategoryAction } from "@/store/slices/shopSlice";
import { SubCategory } from "@/types/shop";
import {
    Loader2,
    Plus,
    Pencil,
    Trash2,
    Search,
    Filter,
    Package,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertDialog from "@/utils/Alert";
import Swal from "sweetalert2";
import { getValidImageUrl } from "@/utils/imageUtils";

const ProductSubCategory = () => {
    const dispatch = useAppDispatch();
    const { subCategories } = useAppSelector((state) => state.shop);
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchProductSubCategories());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const resultAction = await dispatch(deleteSubCategoryAction(id));
                    if (deleteSubCategoryAction.fulfilled.match(resultAction)) {
                        Swal.fire("Deleted!", "Subcategory has been deleted.", "success");
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete");
                    }
                } catch (error: any) {
                    const msg = error.message || "Failed to delete subcategory";
                    Swal.fire("Error!", msg, "error");
                }
            }
        });
    };

    const handleEdit = (id: string) => {
        router.push(`/superadmin/shop/product-subcategory/edit/${id}`);
    };

    // Helper to get Category Name safely
    const getCategoryName = (category: string | { name: string }) => {
        if (typeof category === 'object' && category !== null && 'name' in category) {
            return category.name;
        }
        return "Unknown Category";
    };

    const filteredSubCategories = subCategories.data.filter((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (subCategories.loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-purple-600" size={40} />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Product Subcategories</h1>
                    <p className="text-gray-500 mt-2">
                        Manage your store's product subcategories and hierarchy
                    </p>
                </div>
                <Link href="/superadmin/shop/product-subcategory/add">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-200">
                        <Plus size={20} />
                        Add Subcategory
                    </button>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Search subcategories..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Name</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Parent Category</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Slug</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-center">
                                    Status
                                </th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSubCategories.length > 0 ? (
                                filteredSubCategories.map((sub) => (
                                    <tr
                                        key={sub._id}
                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50">
                                                    {sub.image ? (
                                                        <img
                                                            src={getValidImageUrl(sub.image || "")}
                                                            alt={sub.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <Package size={20} className="text-gray-400" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {sub.name}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                                                {getCategoryName(sub.category)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{sub.slug}</td>
                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${sub.isActive
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : "bg-red-50 text-red-700 border-red-200"
                                                    }`}
                                            >
                                                {sub.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(sub._id)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(sub._id)}
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
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Package size={48} className="mb-4 opacity-50" />
                                            <p className="text-lg font-medium">No subcategories found</p>
                                            <p className="text-sm">
                                                Try adjusting your search or add a new subcategory.
                                            </p>
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

export default ProductSubCategory;
