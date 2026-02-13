"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductInput, Category, SubCategory } from "@/types/shop";
import { ArrowLeft, Save, Loader2, Upload, Plus, X, Trash2 } from "lucide-react";
import Link from "next/link";
import AlertDialog from "@/utils/Alert";
import Image from "next/image";
import { get } from "@/services/ApiService";
import { GET_PRODUCT_CATEGORIES, GET_PRODUCT_SUBCATEGORIES } from "@/services/ApiRoutes";
import { useAppDispatch } from "@/store/hooks";
import { createProductAction } from "@/store/slices/shopSlice";

const AddProduct = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [allSubCategories, setAllSubCategories] = useState<SubCategory[]>([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [specList, setSpecList] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }]);
    const [tagsList, setTagsList] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProductInput>({
        defaultValues: {
            isActive: true,
            isFeatured: false,
        }
    });

    const selectedCategoryId = watch("category");

    // Fetch Categories and Subcategories
    useEffect(() => {
        const loadData = async () => {
            try {
                const [catRes, subRes] = await Promise.all([
                    get(GET_PRODUCT_CATEGORIES),
                    get(GET_PRODUCT_SUBCATEGORIES)
                ]);

                // Handle data wrapping
                const catData = catRes.data || catRes;
                const subData = subRes.data || subRes;

                if (catData && (catData.success || Array.isArray(catData))) {
                    setCategories(catData.data || catData);
                }
                if (subData && (subData.success || Array.isArray(subData))) {
                    setAllSubCategories(subData.data || subData);
                }
            } catch (error) {
                console.error("Failed to load initial data", error);
            }
        };
        loadData();
    }, []);

    // Filter Subcategories when Category changes
    useEffect(() => {
        if (selectedCategoryId) {
            const subs = allSubCategories.filter(sub => {
                const cat = sub.category;
                return typeof cat === 'object' ? cat._id === selectedCategoryId : cat === selectedCategoryId;
            });
            setFilteredSubCategories(subs);
        } else {
            setFilteredSubCategories([]);
        }
    }, [selectedCategoryId, allSubCategories]);

    // Handle Image Selection
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setUploadFiles(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setUploadFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
            const newPrev = [...prev];
            URL.revokeObjectURL(newPrev[index]); // cleanup
            return newPrev.filter((_, i) => i !== index);
        });
    };

    // Handle Specifications
    const addSpec = () => setSpecList([...specList, { key: '', value: '' }]);
    const removeSpec = (index: number) => setSpecList(specList.filter((_, i) => i !== index));
    const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
        const newList = [...specList];
        newList[index][field] = val;
        setSpecList(newList);
    };

    // Handle Tags
    const addTag = () => {
        if (currentTag.trim() && !tagsList.includes(currentTag.trim())) {
            setTagsList([...tagsList, currentTag.trim()]);
            setCurrentTag("");
        }
    };
    const removeTag = (tag: string) => setTagsList(tagsList.filter(t => t !== tag));


    const onSubmit = async (data: ProductInput) => {
        setLoading(true);
        try {
            // Prepare Specifications Object
            const specs: Record<string, string> = {};
            specList.forEach(item => {
                if (item.key.trim()) specs[item.key.trim()] = item.value.trim();
            });

            const payload: ProductInput = {
                ...data,
                images: uploadFiles,
                tags: tagsList,
                specifications: specs
            };

            await dispatch(createProductAction(payload)).unwrap();
            AlertDialog("Success", "Product created successfully", "success");
            router.push("/superadmin/shop/product");
        } catch (error: any) {
            console.error(error);
            const msg = error?.message || "Something went wrong";
            AlertDialog("Error", msg, "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Add New Product</h1>
                    <p className="text-gray-500 mt-2">Create a new product listing</p>
                </div>
                <Link
                    href="/superadmin/shop/product"
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors"
                >
                    <ArrowLeft size={20} />
                    <span>Back to List</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Product Name *</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                                placeholder="e.g. Wireless Headphones"
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Slug *</label>
                            <input
                                {...register("slug", { required: "Slug is required" })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                                placeholder="e.g. wireless-headphones"
                            />
                            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Short Description</label>
                        <input
                            {...register("shortDescription")}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                            placeholder="Brief summary..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Description *</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none resize-y"
                            placeholder="Detailed product description..."
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                    </div>

                    {/* Pricing and Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Price ($) *</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: "Price is required", valueAsNumber: true })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                            />
                            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Discount Price ($)</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("discountPrice", { valueAsNumber: true })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Stock Quantity *</label>
                            <input
                                type="number"
                                {...register("stock", { required: "Stock is required", valueAsNumber: true })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                            />
                            {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
                        </div>
                    </div>

                    {/* Taxonomy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category *</label>
                            <select
                                {...register("category", { required: "Category is required" })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none bg-white"
                            >
                                <option value="">Select Category</option>
                                {categories.map(cat => (
                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Sub Category *</label>
                            <select
                                {...register("subCategory", { required: "Sub Category is required" })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none bg-white"
                                disabled={!selectedCategoryId}
                            >
                                <option value="">Select Sub Category</option>
                                {filteredSubCategories.map(sub => (
                                    <option key={sub._id} value={sub._id}>{sub.name}</option>
                                ))}
                            </select>
                            {errors.subCategory && <p className="text-red-500 text-xs mt-1">{errors.subCategory.message}</p>}
                        </div>
                    </div>

                    {/* Other Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">SKU</label>
                            <input
                                {...register("sku")}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Brand</label>
                            <input
                                {...register("brand")}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">Product Images</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Drag & drop files here, or click to browse</p>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="image-upload"
                            />
                            <label
                                htmlFor="image-upload"
                                className="inline-block bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-purple-100 transition-colors"
                            >
                                Select Files
                            </label>
                        </div>

                        {/* Previews */}
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                                        <Image src={src} alt={`Preview ${index}`} fill className="object-cover" unoptimized />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tags</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                value={currentTag}
                                onChange={e => setCurrentTag(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                                placeholder="Add a tag..."
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                            />
                            <button
                                type="button"
                                onClick={addTag}
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tagsList.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                                    {tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-purple-900"><X size={14} /></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Specifications</label>
                        {specList.map((spec, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    placeholder="Key (e.g. Color)"
                                    value={spec.key}
                                    onChange={e => updateSpec(index, 'key', e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 outline-none"
                                />
                                <input
                                    placeholder="Value (e.g. Red)"
                                    value={spec.value}
                                    onChange={e => updateSpec(index, 'value', e.target.value)}
                                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 outline-none"
                                />
                                <button type="button" onClick={() => removeSpec(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={addSpec} className="text-sm text-purple-600 hover:underline flex items-center gap-1">
                            <Plus size={16} /> Add Specification
                        </button>
                    </div>

                    {/* Settings */}
                    <div className="flex gap-6 pt-4 border-t border-gray-100">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("isActive")}
                                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-200"
                            />
                            <span className="text-gray-700 font-medium">Active Status</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("isFeatured")}
                                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-200"
                            />
                            <span className="text-gray-700 font-medium">Featured</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("isTrending")}
                                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-200"
                            />
                            <span className="text-gray-700 font-medium">Trending</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("isBestSeller")}
                                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-200"
                            />
                            <span className="text-gray-700 font-medium">Best Seller</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                {...register("isSpecialDeal")}
                                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-200"
                            />
                            <span className="text-gray-700 font-medium">Special Deal</span>
                        </label>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-purple-200"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Create Product
                                </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;
