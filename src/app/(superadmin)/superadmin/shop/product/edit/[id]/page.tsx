"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { ProductInput, Category, SubCategory } from "@/types/shop";
import { ArrowLeft, Save, Loader2, Upload, X, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import AlertDialog from "@/utils/Alert";
import { imageUrl } from "@/services/BaseUrl";
import Image from "next/image";
import { get } from "@/services/ApiService";
import { GET_PRODUCT_BY_ID, GET_PRODUCT_CATEGORIES, GET_PRODUCT_SUBCATEGORIES } from "@/services/ApiRoutes";
import { useAppDispatch } from "@/store/hooks";
import { updateProductAction } from "@/store/slices/shopSlice";

const EditProduct = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [categories, setCategories] = useState<Category[]>([]);
    const [allSubCategories, setAllSubCategories] = useState<SubCategory[]>([]);
    const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploadFiles, setUploadFiles] = useState<File[]>([]);
    const [tagsList, setTagsList] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState("");
    const [specList, setSpecList] = useState<{ key: string, value: string }[]>([{ key: '', value: '' }]);


    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<ProductInput>();

    const selectedCategoryId = watch("category");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Fetch Categories and Subcategories using ApiService
                const [catRes, subRes] = await Promise.all([
                    get(GET_PRODUCT_CATEGORIES),
                    get(GET_PRODUCT_SUBCATEGORIES)
                ]);

                // ApiService returns res or res.data depending on interceptor, here we assume res.data or res
                // Assuming standard response format { success: true, data: [...] }
                const catData = catRes.data || catRes;
                const subData = subRes.data || subRes;

                if (catData && (catData.success || Array.isArray(catData))) {
                    setCategories(catData.data || catData);
                }
                if (subData && (subData.success || Array.isArray(subData))) {
                    setAllSubCategories(subData.data || subData);
                }

                if (id) {
                    const productRes = await get(GET_PRODUCT_BY_ID(id));
                    const productData = productRes.data || productRes;

                    if (productData && (productData.success || productData.data)) {
                        const data = productData.data || productData;
                        setValue("name", data.name);
                        setValue("slug", data.slug);
                        setValue("description", data.description);
                        setValue("shortDescription", data.shortDescription);
                        setValue("price", data.price);
                        setValue("discountPrice", data.discountPrice);
                        setValue("stock", data.stock);
                        setValue("sku", data.sku);
                        setValue("brand", data.brand);
                        setValue("isActive", data.isActive);
                        setValue("isFeatured", data.isFeatured);
                        setValue("isTrending", data.isTrending);
                        setValue("isBestSeller", data.isBestSeller);
                        setValue("isSpecialDeal", data.isSpecialDeal);

                        // Handle Category & SubCategory (can be object or string)
                        const catId = typeof data.category === 'object' ? data.category._id : data.category;
                        const subId = typeof data.subCategory === 'object' ? data.subCategory._id : data.subCategory;

                        setValue("category", catId);
                        setValue("subCategory", subId);

                        // Handle Tags
                        if (data.tags) setTagsList(data.tags);

                        // Handle Specs
                        if (data.specifications) {
                            const specs = Object.entries(data.specifications).map(([key, value]) => ({ key, value }));
                            if (specs.length === 0) setSpecList([{ key: '', value: '' }]);
                            else setSpecList(specs as { key: string, value: string }[]);
                        }

                        // Handle Images
                        if (data.images) {
                            setImagePreviews(data.images.map((img: string) => img.startsWith('http') ? img : `${imageUrl}${img}`));
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load data", error);
                AlertDialog("Error", "Failed to load product data", "error");
            } finally {
                setInitialLoading(false);
            }
        };
        loadInitialData();
    }, [id, setValue]);


    // Filter Subcategories
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


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setUploadFiles(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
        // Note: Logic for sync with uploadFiles is simplified here as per original file
    };

    // Specs & Tags handlers
    const addTag = () => { if (currentTag.trim() && !tagsList.includes(currentTag.trim())) { setTagsList([...tagsList, currentTag.trim()]); setCurrentTag(""); } };
    const removeTag = (tag: string) => setTagsList(tagsList.filter(t => t !== tag));

    const addSpec = () => setSpecList([...specList, { key: '', value: '' }]);
    const removeSpec = (index: number) => setSpecList(specList.filter((_, i) => i !== index));
    const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
        const newList = [...specList];
        newList[index][field] = val;
        setSpecList(newList);
    };

    const onSubmit = async (data: ProductInput) => {
        setLoading(true);
        try {
            const specs: Record<string, string> = {};
            specList.forEach(item => { if (item.key.trim()) specs[item.key.trim()] = item.value.trim(); });

            const payload: Partial<ProductInput> = {
                ...data,
                tags: tagsList,
                specifications: specs,
                images: uploadFiles // Only sends new files
            };

            await dispatch(updateProductAction({ id, data: payload })).unwrap();
            AlertDialog("Success", "Product updated successfully", "success");
            router.push("/superadmin/shop/product");
        } catch (error: any) {
            console.error(error);
            const msg = error?.message || "Something went wrong";
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
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Edit Product</h1>
                    <p className="text-gray-500 mt-2">Update product details</p>
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
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Slug *</label>
                            <input
                                {...register("slug", { required: "Slug is required" })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Full Description *</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows={5}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-purple-200 focus:border-purple-500 outline-none resize-y"
                        />
                    </div>

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Price ($)</label>
                            <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Discount Price ($)</label>
                            <input type="number" step="0.01" {...register("discountPrice", { valueAsNumber: true })} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Stock</label>
                            <input type="number" {...register("stock", { valueAsNumber: true })} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none" />
                        </div>
                    </div>

                    {/* Taxonomy */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Category</label>
                            <select {...register("category")} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none bg-white">
                                <option value="">Select Category</option>
                                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Sub Category</label>
                            <select {...register("subCategory")} className="w-full px-4 py-3 rounded-lg border border-gray-200 outline-none bg-white">
                                <option value="">Select Sub Category</option>
                                {filteredSubCategories.map(sub => <option key={sub._id} value={sub._id}>{sub.name}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-700">Product Images (Add New)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                            <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload-edit" />
                            <label htmlFor="image-upload-edit" className="inline-block bg-purple-50 text-purple-600 px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
                                Select Files
                            </label>
                        </div>
                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
                                {imagePreviews.map((src, index) => (
                                    <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                                        <Image src={src} alt="Preview" fill className="object-cover" unoptimized />
                                        <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tags & Specs */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Tags</label>
                        <div className="flex gap-2 mb-2">
                            <input value={currentTag} onChange={e => setCurrentTag(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border border-gray-200 outline-none" placeholder="Add tag" onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())} />
                            <button type="button" onClick={addTag} className="bg-gray-100 px-4 py-2 rounded-lg">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tagsList.map(tag => (
                                <span key={tag} className="inline-flex items-center gap-1 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                                    {tag} <button onClick={() => removeTag(tag)}><X size={14} /></button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-6 pt-4 border-t border-gray-100">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register("isActive")} className="w-5 h-5 rounded border-gray-300 text-purple-600" />
                            <span className="text-gray-700 font-medium">Active</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register("isFeatured")} className="w-5 h-5 rounded border-gray-300 text-purple-600" />
                            <span className="text-gray-700 font-medium">Featured</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register("isTrending")} className="w-5 h-5 rounded border-gray-300 text-purple-600" />
                            <span className="text-gray-700 font-medium">Trending</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register("isBestSeller")} className="w-5 h-5 rounded border-gray-300 text-purple-600" />
                            <span className="text-gray-700 font-medium">Best Seller</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" {...register("isSpecialDeal")} className="w-5 h-5 rounded border-gray-300 text-purple-600" />
                            <span className="text-gray-700 font-medium">Special Deal</span>
                        </label>
                    </div>

                    <div className="flex justify-end pt-6 border-t border-gray-100">
                        <button type="submit" disabled={loading} className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
                            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProduct;
