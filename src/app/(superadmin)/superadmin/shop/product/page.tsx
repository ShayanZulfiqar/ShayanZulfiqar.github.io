"use client";

import React, { useEffect, useState } from "react";
import { Product, ProductFilterParams, Category, SubCategory } from "@/types/shop";
import {
    Loader2,
    Plus,
    Pencil,
    Trash2,
    Search,
    Filter,
    Package,
    Eye,
    Power,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AlertDialog from "@/utils/Alert";
import Swal from "sweetalert2";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { imageUrl } from "@/services/BaseUrl";
import Image from "next/image";

import { fetchProducts, deleteProductAction, fetchProductCategories, fetchProductSubCategories, toggleProductStatusAction } from "@/store/slices/shopSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const ProductList = () => {
    const dispatch = useAppDispatch();
    const { products, categories, subCategories } = useAppSelector((state) => state.shop);

    // UI-only local states
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const router = useRouter();

    const fetchData = async () => {
        const params: ProductFilterParams = {
            search: searchTerm || undefined,
            category: selectedCategory || undefined,
            subCategory: selectedSubCategory || undefined,
            isActive: 'all'
        };
        dispatch(fetchProducts(params));
    };

    const fetchFilterData = async () => {
        dispatch(fetchProductCategories());
        dispatch(fetchProductSubCategories());
    }

    useEffect(() => {
        fetchFilterData();
    }, [dispatch]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchData();
        }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm, selectedCategory, selectedSubCategory, dispatch]);

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
                    const resultAction = await dispatch(deleteProductAction(id));
                    if (deleteProductAction.fulfilled.match(resultAction)) {
                        Swal.fire("Deleted!", "Product has been deleted.", "success");
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete");
                    }
                } catch (error: any) {
                    Swal.fire("Error!", error.message || "Failed to delete product", "error");
                }
            }
        });
    };

    const handleEdit = (id: string) => {
        router.push(`/superadmin/shop/product/edit/${id}`);
    };

    const handleStatusToggle = async (id: string, currentStatus: boolean) => {
        try {
            const newStatus = !currentStatus;
            const resultAction = await dispatch(toggleProductStatusAction({ id, isActive: newStatus }));

            if (toggleProductStatusAction.fulfilled.match(resultAction)) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
                Toast.fire({
                    icon: "success",
                    title: `Product ${newStatus ? 'activated' : 'deactivated'} successfully`
                });
            } else {
                throw new Error(resultAction.payload as string || "Failed to update status");
            }
        } catch (error: any) {
            console.error("Failed to update status", error);
            Swal.fire("Error!", error.message || "Failed to update status", "error");
        }
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Products</h1>
                    <p className="text-gray-500 mt-2">
                        Manage your store's inventory
                    </p>
                </div>
                <Link href="/superadmin/shop/product/add">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-purple-200">
                        <Plus size={20} />
                        Add Product
                    </button>
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="relative w-full">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Category Filter */}
                <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.data.map(cat => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>

                {/* SubCategory Filter */}
                <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100"
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                >
                    <option value="">All Subcategories</option>
                    {/* Ideally filter subcategories based on selected category, but showing all for now or filter simply */}
                    {subCategories.data
                        .filter(sub => !selectedCategory || (typeof sub.category === 'object' ? sub.category._id === selectedCategory : sub.category === selectedCategory))
                        .map(sub => (
                            <option key={sub._id} value={sub._id}>{sub.name}</option>
                        ))}
                </select>

                <div className="flex gap-2 justify-end">
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
                                <th className="px-6 py-4 font-semibold text-gray-700 w-64">Product</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 w-48">Images</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Category</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Price</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Stock</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-center">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.loading ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <Loader2 className="animate-spin inline-block text-purple-600" size={32} />
                                    </td>
                                </tr>
                            ) : products.data && products.data.length > 0 ? (
                                products.data.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <p className="font-medium text-gray-800">{product.name}</p>
                                                <span className="text-xs text-gray-500 line-clamp-1">{product.slug}</span>
                                            </div>
                                        </td>

                                        {/* Images Carousel Column */}
                                        <td className="px-6 py-4 w-48">
                                            {product.images && product.images.length > 0 ? (
                                                <div className="w-48 h-32 rounded-lg overflow-hidden relative border border-gray-100">
                                                    <Swiper
                                                        modules={[Navigation, Pagination]}
                                                        spaceBetween={10}
                                                        slidesPerView={1}
                                                        navigation
                                                        pagination={{ clickable: true }}
                                                        loop={product.images.length > 1}
                                                        className="w-full h-full"
                                                    >
                                                        {product.images.map((img, idx) => (
                                                            <SwiperSlide key={idx}>
                                                                <div className="relative w-full h-full bg-gray-50">
                                                                    <Image
                                                                        src={img.startsWith('http') ? img : `${imageUrl}${img}`}
                                                                        alt={`${product.name} ${idx + 1}`}
                                                                        fill
                                                                        className="object-cover"
                                                                        sizes="150px"
                                                                        unoptimized
                                                                    />
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                    </Swiper>
                                                </div>
                                            ) : (
                                                <div className="w-32 h-20 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                                    <Package size={20} />
                                                </div>
                                            )}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-sm">
                                                <span className="font-medium text-gray-700">
                                                    {typeof product.category === 'object' ? product.category?.name : 'Unknown'}
                                                </span>
                                                <span className="text-gray-500 text-xs">
                                                    {typeof product.subCategory === 'object' ? product.subCategory?.name : ''}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                {product.discountPrice && product.discountPrice < product.price ? (
                                                    <>
                                                        <span className="font-bold text-gray-800">${product.discountPrice}</span>
                                                        <span className="text-xs text-gray-400 line-through">${product.price}</span>
                                                    </>
                                                ) : (
                                                    <span className="font-bold text-gray-800">${product.price}</span>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-medium ${product.stock < 10 ? 'text-orange-600' : 'text-gray-600'}`}>
                                                {product.stock} units
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span
                                                className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${product.isActive
                                                    ? "bg-green-50 text-green-700 border-green-200"
                                                    : "bg-red-50 text-red-700 border-red-200"
                                                    }`}
                                            >
                                                {product.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleStatusToggle(product._id, product.isActive)}
                                                    className={`p-2 rounded-lg transition-colors ${product.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                                    title={product.isActive ? "Deactivate" : "Activate"}
                                                >
                                                    <Power size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(product._id)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
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
                                    <td colSpan={7} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Package size={48} className="mb-4 opacity-50" />
                                            <p className="text-lg font-medium">No products found</p>
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

export default ProductList;
