"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Upload, Eye, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { get } from "@/services/ApiService";
import { GET_CLIENT_BRAND_BY_ID } from "@/services/ApiRoutes";
import { imageUrl } from "@/services/BaseUrl";
import { updateClientBrandAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const EditClientBrandPage = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useAppDispatch();
    const id = params.id as string;
    const { user, token } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        gradient: "from-blue-500 to-cyan-500",
        industry: "",
    });

    const [existingLogo, setExistingLogo] = useState<string>("");
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string>("");

    // Check authentication
    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
        }
    }, [token, user, router]);

    // Fetch client brand data
    useEffect(() => {
        const fetchClientBrand = async () => {
            try {
                setFetchingData(true);
                const startTime = performance.now();

                const response = await get(GET_CLIENT_BRAND_BY_ID(id));

                const endTime = performance.now();
                console.log(`Fetch API Response Time: ${(endTime - startTime).toFixed(2)}ms`);

                if (response.success && response.data) {
                    setFormData({
                        name: response.data.name,
                        gradient: response.data.gradient,
                        industry: response.data.industry,
                    });
                    setExistingLogo(response.data.logo);
                }
            } catch (error: any) {
                AlertDialog(
                    "Error!",
                    error.response?.data?.message || "Failed to fetch client brand",
                    "error",
                    3000,
                    false,
                    false
                );
                router.push("/superadmin/content/client-brands");
            } finally {
                setFetchingData(false);
            }
        };

        if (id) {
            fetchClientBrand();
        }
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                AlertDialog("Error!", "Please select a valid image file", "error", 3000, false, false);
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                AlertDialog("Error!", "Image size should be less than 5MB", "error", 3000, false, false);
                return;
            }

            setLogoFile(file);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeLogo = () => {
        setLogoFile(null);
        setLogoPreview("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.industry.trim()) {
            AlertDialog("Error!", "Please fill in all required fields", "error", 3000, false, false);
            return;
        }

        try {
            setLoading(true);
            const startTime = performance.now();

            // Create FormData
            const formDataToSend = new FormData();
            formDataToSend.append("name", formData.name);
            formDataToSend.append("gradient", formData.gradient);
            formDataToSend.append("industry", formData.industry);

            // Only append logo if a new one is selected
            if (logoFile) {
                formDataToSend.append("logo", logoFile);
            }

            const resultAction = await dispatch(updateClientBrandAction({ id, data: formDataToSend }));

            const endTime = performance.now();
            console.log(`Update API Response Time: ${(endTime - startTime).toFixed(2)}ms`);

            if (updateClientBrandAction.fulfilled.match(resultAction)) {
                AlertDialog(
                    "Success!",
                    "Client brand updated successfully!",
                    "success",
                    1500,
                    false,
                    false
                );
                router.push("/superadmin/content/client-brands");
            } else {
                throw new Error(resultAction.payload as string || "Failed to update client brand");
            }
        } catch (error: any) {
            AlertDialog(
                "Error!",
                error.message || "Failed to update client brand",
                "error",
                3000,
                false,
                false
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetchingData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">Loading client brand...</p>
                </div>
            </div>
        );
    }

    const currentLogo = logoPreview || (existingLogo ? `${imageUrl}/${existingLogo.startsWith('/') ? existingLogo.substring(1) : existingLogo}` : "");

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4"
            >
                <button
                    onClick={() => router.push("/superadmin/content/client-brands")}
                    className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all shadow-sm hover:shadow-md"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        Edit Client Brand
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <Eye size={16} className="text-green-600" />
                        <span>Update the client brand information</span>
                    </p>
                </div>
            </motion.div>

            {/* Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-xl border border-gray-200 p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Brand Name */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Brand Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="e.g., TechCorp Solutions"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Industry */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Industry <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                            placeholder="e.g., Technology, Finance, Healthcare"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Gradient */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gradient (Tailwind Classes)
                        </label>
                        <input
                            type="text"
                            name="gradient"
                            value={formData.gradient}
                            onChange={handleChange}
                            placeholder="e.g., from-blue-500 to-cyan-500"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                        />
                        <div className={`mt-2 h-16 rounded-lg border-2 border-gray-300 bg-gradient-to-r ${formData.gradient}`} />
                    </div>

                    {/* Logo Upload */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Logo {!existingLogo && <span className="text-red-500">*</span>}
                            {existingLogo && <span className="text-sm text-gray-500 ml-2">(Leave empty to keep current logo)</span>}
                        </label>

                        {!currentLogo ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all"
                            >
                                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                                <p className="text-gray-600 font-medium mb-1">Click to upload logo</p>
                                <p className="text-sm text-gray-500">PNG, JPG, SVG up to 5MB</p>
                            </div>
                        ) : (
                            <div className="relative border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
                                <button
                                    type="button"
                                    onClick={removeLogo}
                                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all"
                                >
                                    <X size={16} />
                                </button>
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-32 bg-white rounded-lg border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                                        <img src={currentLogo} alt="Logo preview" className="max-w-full max-h-full object-contain p-2" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800 mb-1">
                                            {logoFile ? logoFile.name : "Current Logo"}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {logoFile ? `${(logoFile.size / 1024).toFixed(2)} KB` : "Existing image"}
                                        </p>
                                        {!logoFile && (
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="mt-2 text-sm text-green-600 hover:text-green-700 font-medium"
                                            >
                                                Change Logo
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>

                    {/* Preview Card */}
                    <div className="border-t pt-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Live Preview</label>
                        <div className="bg-white rounded-xl shadow-lg border-2 border-dashed border-gray-300 overflow-hidden max-w-sm">
                            <div className={`h-32 bg-gradient-to-r ${formData.gradient}`} />
                            <div className="relative -mt-12 px-6">
                                <div className="w-24 h-24 bg-white rounded-xl shadow-lg border-4 border-white overflow-hidden">
                                    {currentLogo ? (
                                        <img src={currentLogo} alt="Preview" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <ImageIcon size={32} className="text-gray-400" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 pt-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-2">
                                    {formData.name || "Brand Name"}
                                </h3>
                                <p className="text-sm text-gray-600">{formData.industry || "Industry"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.push("/superadmin/content/client-brands")}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-semibold transition-all hover:shadow-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    <span>Update Client Brand</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditClientBrandPage;
