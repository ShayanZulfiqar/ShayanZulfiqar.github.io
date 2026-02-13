"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchShopHeroes, deleteShopHeroAction } from "@/store/slices/shopSlice";
import { ShopHero } from "@/types/shop";
import {
    Loader2,
    Plus,
    Pencil,
    Trash2,
    Home,
} from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { imageUrl } from "@/services/BaseUrl";
import Image from "next/image";

const getValidImageUrl = (img: any) => {
    if (!img || typeof img !== 'string') return "";
    if (img.startsWith('http')) return img;
    const path = img.replace(/\\/g, '/');
    return `${imageUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

const ShopHeroList = () => {
    const dispatch = useAppDispatch();
    const { data: items, loading } = useAppSelector((state) => state.shop.heroes);

    useEffect(() => {
        dispatch(fetchShopHeroes());
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
                const resultAction = await dispatch(deleteShopHeroAction(id));
                if (deleteShopHeroAction.fulfilled.match(resultAction)) {
                    Swal.fire("Deleted!", "Item has been deleted.", "success");
                } else {
                    throw new Error(resultAction.payload as string || "Failed to delete");
                }
            } catch (error: any) {
                Swal.fire("Error!", error.message || "Failed to delete", "error");
            }
        }
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Shop Hero Sections</h1>
                    <p className="text-gray-500 mt-2">Manage carousel entries for the shop landing page</p>
                </div>
                <Link href="/superadmin/shop/hero/add">
                    <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg">
                        <Plus size={20} />
                        Add Hero Slide
                    </button>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">Image</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Content</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Button</th>
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
                            ) : items.length > 0 ? (
                                items.map((item) => (
                                    <tr key={item._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                                                {getValidImageUrl(item.image) ? (
                                                    <Image
                                                        src={getValidImageUrl(item.image)}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                        unoptimized
                                                    />
                                                ) : (
                                                    <Home size={20} className="text-gray-300" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-800">{item.title}</span>
                                                <span className="text-xs text-gray-500 line-clamp-1">{item.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col text-xs">
                                                <span className="font-semibold text-purple-600">{item.buttonText}</span>
                                                <span className="text-gray-400 truncate max-w-[150px]">{item.buttonLink}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/superadmin/shop/hero/edit/${item._id}`}>
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
                                            <Home size={48} className="mb-4 opacity-50" />
                                            <p className="text-lg font-medium">No hero sections found</p>
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

export default ShopHeroList;
