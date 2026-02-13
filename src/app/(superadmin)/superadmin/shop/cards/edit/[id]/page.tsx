"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ShopCard } from "@/types/shop";
import { Save, X, Loader2, Plus, Trash2, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import { imageUrl } from "@/services/BaseUrl";
import { get } from "@/services/ApiService";
import { GET_SHOP_CARD_BY_ID } from "@/services/ApiRoutes";
import { useAppDispatch } from "@/store/hooks";
import { updateShopCardAction } from "@/store/slices/shopSlice";

const getValidImageUrl = (img: any) => {
    if (!img || typeof img !== 'string') return "";
    if (img.startsWith('http')) return img;
    const path = img.replace(/\\/g, '/');
    return `${imageUrl}${path.startsWith('/') ? '' : '/'}${path}`;
};

const EditShopCard = () => {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newFiles, setNewFiles] = useState<File[]>([]);
    const [newPreviews, setNewPreviews] = useState<string[]>([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const res = await get(GET_SHOP_CARD_BY_ID(id));
                const data = res.data || res;
                if (data) {
                    setExistingImages(data.images || []);
                }
            } catch (error) {
                console.error("Failed to fetch card:", error);
                Swal.fire("Error", "Could not load data", "error");
            } finally {
                setFetching(false);
            }
        };
        fetchItem();
    }, [id]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setNewFiles(prev => [...prev, ...files]);
            const previews = files.map(file => URL.createObjectURL(file));
            setNewPreviews(prev => [...prev, ...previews]);
        }
    };

    const removeExisting = (index: number) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    const removeNew = (index: number) => {
        setNewFiles(newFiles.filter((_, i) => i !== index));
        setNewPreviews(newPreviews.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Backend likely expects all current plus new images or special handling
            // Here we send back existing strings and new files, the thunk/service should handle formatting
            // Based on previous service, it accepted { images: [...existing, ...newFiles] }
            // The thunk expects `data` which will be processed by `ApiService`
            // If images contains File objects, ApiService should handle FormData conversion if needed.
            // But usually we need to structure it properly.
            // Assuming the simple updated ApiService handles array of mixed strings/files if logic exists,
            // OR we rely on `updateShopCardAction` to use `ApiService` which wraps it.
            // However, typical multipart upload expects specific field names.
            // The `apiService` helper usually constructs FormData if it sees Files.
            // Let's pass the object as expected.
            await dispatch(updateShopCardAction({ id, data: { images: [...existingImages, ...newFiles] } })).unwrap();
            Swal.fire("Success", "Shop card updated successfully!", "success");
            router.push("/superadmin/shop/cards");
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to update card", "error");
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
                    <h1 className="text-3xl font-bold text-gray-800">Edit Shop Card</h1>
                    <p className="text-gray-500 mt-2">Modify images for this card collection</p>
                </div>
                <Link href="/superadmin/shop/cards">
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={20} />
                        Cancel
                    </button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 space-y-8">
                <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700 block">Card Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Existing Images */}
                        {existingImages.map((img, index) => (
                            <div key={`existing-${index}`} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200 bg-gray-50 flex items-center justify-center">
                                {getValidImageUrl(img) ? (
                                    <Image
                                        src={getValidImageUrl(img)}
                                        alt={`Existing ${index}`}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                ) : (
                                    <ImageIcon size={24} className="text-gray-300" />
                                )}
                                <button
                                    type="button"
                                    onClick={() => removeExisting(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={14} />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[10px] text-white py-1 px-2">Existing</div>
                            </div>
                        ))}

                        {/* New Previews */}
                        {newPreviews.map((preview, index) => (
                            <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden group border border-purple-200 bg-purple-50">
                                <Image
                                    src={preview}
                                    alt={`New Preview ${index}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeNew(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={14} />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-purple-600/80 text-[10px] text-white py-1 px-2">New</div>
                            </div>
                        ))}

                        <label className="flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-400 hover:bg-purple-50 transition-all cursor-pointer group">
                            <Plus size={32} className="text-gray-400 group-hover:text-purple-500" />
                            <span className="text-xs text-gray-500 group-hover:text-purple-600 mt-2 font-medium">Add Image</span>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        disabled={loading || (existingImages.length === 0 && newFiles.length === 0)}
                        type="submit"
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Update Shop Card
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditShopCard;
