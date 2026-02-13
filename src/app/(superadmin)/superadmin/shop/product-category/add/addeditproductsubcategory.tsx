"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import {
    createSubCategoryAction,
    updateSubCategoryAction,
} from "@/store/slices/shopSlice";
import { get } from "@/services/ApiService";
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_SUBCATEGORY_BY_ID } from "@/services/ApiRoutes";
import { useAppDispatch } from "@/store/hooks";
import { ProductSubCategoryInput, Category } from "@/types/shop";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import AlertDialog from "@/utils/Alert";

const AddEditProductSubCategory = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const isEditMode = !!id;
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ProductSubCategoryInput>();

    // Fetch Categories for Dropdown
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await get(GET_PRODUCT_CATEGORIES);
                if (response.success) {
                    setCategories(response.data);
                }
            } catch (error) {
                console.error("Failed to load categories", error);
                AlertDialog("Error", "Failed to load categories", "error");
            }
        };
        loadCategories();
    }, []);

    // Fetch Subcategory Data if in Edit Mode
    useEffect(() => {
        if (isEditMode && id) {
            const loadSubCategoryData = async () => {
                setInitialLoading(true);
                try {
                    const response = await get(GET_PRODUCT_SUBCATEGORY_BY_ID(id));
                    if (response.success && response.data) {
                        const data = response.data;
                        setValue("name", data.name);
                        setValue("slug", data.slug);
                        setValue("category", data.category); // Assuming API returns category ID
                        setValue("description", data.description);
                    }
                } catch (error) {
                    console.error(error);
                    AlertDialog("Error", "Failed to load subcategory data", "error");
                } finally {
                    setInitialLoading(false);
                }
            };
            loadSubCategoryData();
        }
    }, [isEditMode, id, setValue]);

    const onSubmit = async (data: ProductSubCategoryInput) => {
        setLoading(true);
        try {
            let resultAction;
            if (isEditMode && id) {
                resultAction = await dispatch(updateSubCategoryAction({ id, data }));
            } else {
                resultAction = await dispatch(createSubCategoryAction(data));
            }

            if (updateSubCategoryAction.fulfilled.match(resultAction) || createSubCategoryAction.fulfilled.match(resultAction)) {
                AlertDialog("Success", `Subcategory ${isEditMode ? "updated" : "created"} successfully`, "success");
                router.push("/superadmin/shop/product-subcategory");
            } else {
                throw new Error(resultAction.payload as string || "Operation failed");
            }
        } catch (error: any) {
            console.error(error);
            const msg = error.message || "Something went wrong";
            AlertDialog("Error", msg, "error");
        } finally {
            setLoading(false);
        }
    };

    if (initialLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-purple-600" size={40} />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">
                        {isEditMode ? "Edit Subcategory" : "Add New Subcategory"}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {isEditMode
                            ? "Update existing subcategory details"
                            : "Create a new subcategory under a parent category"}
                    </p>
                </div>
                <Link
                    href="/superadmin/shop/product-subcategory"
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to List</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Parent Category Field */}
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="category" className="text-sm font-medium text-gray-700">
                                Parent Category
                            </label>
                            <select
                                id="category"
                                className={`w-full px-4 py-3 rounded-lg border ${errors.category
                                    ? "border-red-500 focus:ring-red-200"
                                    : "border-gray-200 focus:ring-purple-200 focus:border-purple-500"
                                    } outline-none transition-all appearance-none bg-white`}
                                {...register("category", { required: "Parent category is required" })}
                            >
                                <option value="">Select a Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id} value={cat._id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>
                            )}
                        </div>

                        {/* Name Field */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Subcategory Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="e.g., Smartphones"
                                className={`w-full px-4 py-3 rounded-lg border ${errors.name
                                    ? "border-red-500 focus:ring-red-200"
                                    : "border-gray-200 focus:ring-purple-200 focus:border-purple-500"
                                    } outline-none transition-all`}
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Slug Field */}
                        <div className="space-y-2">
                            <label htmlFor="slug" className="text-sm font-medium text-gray-700">
                                Slug
                            </label>
                            <input
                                id="slug"
                                type="text"
                                placeholder="e.g., smartphones"
                                className={`w-full px-4 py-3 rounded-lg border ${errors.slug
                                    ? "border-red-500 focus:ring-red-200"
                                    : "border-gray-200 focus:ring-purple-200 focus:border-purple-500"
                                    } outline-none transition-all`}
                                {...register("slug", { required: "Slug is required" })}
                            />
                            {errors.slug && (
                                <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
                            )}
                        </div>

                        {/* Description Field - Full Width */}
                        <div className="space-y-2 md:col-span-2">
                            <label htmlFor="description" className="text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                placeholder="Add a brief description..."
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all resize-none"
                                {...register("description")}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    {isEditMode ? "Update Subcategory" : "Save Subcategory"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEditProductSubCategory;
