"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import { useAppDispatch } from "@/store/hooks";
import { createShopCardAction } from "@/store/slices/shopSlice";

const AddShopCard = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setSelectedFiles(prev => [...prev, ...files]);

            const newPreviews = files.map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedFiles.length === 0) {
            Swal.fire("Warning", "Please select at least one image", "warning");
            return;
        }

        setLoading(true);
        try {
            await dispatch(createShopCardAction({ images: selectedFiles })).unwrap();
            Swal.fire("Success", "Shop card added successfully!", "success");
            router.push("/superadmin/shop/cards");
        } catch (error: any) {
            Swal.fire("Error", error?.message || "Failed to add card", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Add Shop Card</h1>
                    <p className="text-gray-500 mt-2">Upload images for the shop card collection</p>
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
                        {previews.map((preview, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200">
                                <Image
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={14} />
                                </button>
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
                        disabled={loading || selectedFiles.length === 0}
                        type="submit"
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        Save Shop Card
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddShopCard;
