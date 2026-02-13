"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ShopHero } from "@/types/shop";
import { Save, X, Loader2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import { imageUrl } from "@/services/BaseUrl";
import { get } from "@/services/ApiService";
import { GET_SHOP_HERO_BY_ID } from "@/services/ApiRoutes";
import { useAppDispatch } from "@/store/hooks";
import { updateShopHeroAction } from "@/store/slices/shopSlice";

const getValidImageUrl = (img: any) => {
    if (!img || typeof img !== 'string') return "";
    if (img.startsWith('http')) return img;
    const path = img.replace(/\\/g, '/');
    return `${imageUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

const EditShopHero = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState<Partial<ShopHero>>({
        title: "",
        description: "",
        buttonText: "",
        buttonLink: "",
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                // If GET_SHOP_HERO_BY_ID is not defined yet, we might need to add it or use a string construction
                // Assuming we will add it to ApiRoutes if missing.
                const res = await get(GET_SHOP_HERO_BY_ID(id));
                const data = res.data || res;
                if (data) {
                    setFormData(data);
                    if (data.image) {
                        setPreview(getValidImageUrl(data.image));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch hero:", error);
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await dispatch(updateShopHeroAction({ id, data: { ...formData, image: selectedFile || undefined } })).unwrap();
            Swal.fire("Success", "Hero section updated successfully!", "success");
            router.push("/superadmin/shop/hero");
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to update hero", "error");
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
                    <h1 className="text-3xl font-bold text-gray-800">Edit Hero Section</h1>
                    <p className="text-gray-500 mt-2">Modify the details of this carousel slide</p>
                </div>
                <Link href="/superadmin/shop/hero">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} />
                        Cancel
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Hero Image</label>
                        <div className="flex items-center gap-6">
                            <div className="relative w-48 h-32 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden flex items-center justify-center bg-gray-50 group transition-all hover:border-purple-400">
                                {preview ? (
                                    <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
                                ) : (
                                    <ImageIcon size={32} className="text-gray-300 group-hover:text-purple-400" />
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                            <div className="flex-1 text-sm text-gray-500">
                                <p className="font-medium text-gray-700 mb-1">Upload a new image to replace current one</p>
                                <p>Recommended size: 1920x800px</p>
                                <p>Formats: JPG, PNG, WEBP (Max 2MB)</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-2">
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

                    <div className="md:col-span-2 space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Button Text</label>
                        <input
                            required
                            type="text"
                            name="buttonText"
                            value={formData.buttonText}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Button Link</label>
                        <input
                            required
                            type="text"
                            name="buttonLink"
                            value={formData.buttonLink}
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
                        Update Hero Section
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditShopHero;
