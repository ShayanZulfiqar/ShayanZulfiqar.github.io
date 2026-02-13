"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchGeneralSettings, updateGeneralSettingsAction, createGeneralSettingsAction } from "@/store/slices/landingSlice";
import {
    Save,
    Upload,
    Mail,
    Phone,
    MapPin,
    Globe,
    Image as ImageIcon,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Edit3,
    X,
    Plus,
    Trash2
} from "lucide-react";
import AlertDialog from "@/utils/Alert";
import { imageUrl } from "@/services/BaseUrl";

const GeneralSettingsPage = () => {
    const dispatch = useAppDispatch();
    const { data: settings, loading, error } = useAppSelector((state) => state.landing.generalSettings);
    const [saving, setSaving] = useState(false);
    const [previews, setPreviews] = useState<{ headerLogo?: string; footerLogo?: string }>({});
    const [files, setFiles] = useState<{ headerLogo?: File; footerLogo?: File }>({});

    const [activeField, setActiveField] = useState<string | null>(null);

    const inputRefs = {
        email: useRef<HTMLInputElement>(null),
        location: useRef<HTMLInputElement>(null),
        ourLocation: useRef<HTMLTextAreaElement>(null),
    };

    const phoneNumberRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [formData, setFormData] = useState({
        email: "",
        phoneNumber: [""] as string[],
        location: "",
        ourLocation: "",
    });

    useEffect(() => {
        dispatch(fetchGeneralSettings());
    }, [dispatch]);

    useEffect(() => {
        if (settings) {
            setFormData({
                email: settings.email || "",
                phoneNumber: Array.isArray(settings.phoneNumber) ? settings.phoneNumber : [settings.phoneNumber || ""],
                location: settings.location || "",
                ourLocation: settings.ourLocation || "",
            });
            const formatImageUrl = (path: string) => path.startsWith('/') ? `${imageUrl}${path}` : `${imageUrl}/${path}`;

            setPreviews({
                headerLogo: settings.headerLogo ? formatImageUrl(settings.headerLogo) : undefined,
                footerLogo: settings.footerLogo ? formatImageUrl(settings.footerLogo) : undefined,
            });
        }
    }, [settings]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (index: number, value: string) => {
        const newPhones = [...formData.phoneNumber];
        newPhones[index] = value;
        setFormData((prev) => ({ ...prev, phoneNumber: newPhones }));
    };

    const addPhoneNumber = () => {
        if (formData.phoneNumber.length < 4) {
            setFormData((prev) => ({
                ...prev,
                phoneNumber: [...prev.phoneNumber, ""]
            }));
            // Focus the new field in next tick
            setTimeout(() => {
                const index = formData.phoneNumber.length;
                if (phoneNumberRefs.current[index]) {
                    phoneNumberRefs.current[index]?.focus();
                }
            }, 0);
        }
    };

    const removePhoneNumber = (index: number) => {
        if (formData.phoneNumber.length > 1) {
            const newPhones = formData.phoneNumber.filter((_, i) => i !== index);
            setFormData((prev) => ({ ...prev, phoneNumber: newPhones }));
        } else {
            // If it's the last one, just clear it
            const newPhones = [""];
            setFormData((prev) => ({ ...prev, phoneNumber: newPhones }));
        }
    };

    const toggleField = (fieldName: string) => {
        if (activeField === fieldName) {
            setActiveField(null);
        } else {
            setActiveField(fieldName);
            // Focus the field in the next tick after it becomes enabled
            setTimeout(() => {
                const ref = (inputRefs as any)[fieldName];
                if (ref && ref.current) {
                    ref.current.focus();
                }
            }, 0);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "headerLogo" | "footerLogo") => {
        const file = e.target.files?.[0];
        if (file) {
            setFiles((prev) => ({ ...prev, [type]: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviews((prev) => ({ ...prev, [type]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const submitData = new FormData();
        submitData.append("email", formData.email);

        // Append phone numbers (backend might expect multiple 'phoneNumber' entries or a JSON string)
        // Usually, appending multiple times works for arrays in many frameworks
        formData.phoneNumber.forEach((phone) => {
            if (phone.trim()) submitData.append("phoneNumber", phone);
        });

        submitData.append("location", formData.location);
        submitData.append("ourLocation", formData.ourLocation);

        if (files.headerLogo) submitData.append("headerLogo", files.headerLogo);
        if (files.footerLogo) submitData.append("footerLogo", files.footerLogo);

        try {
            let resultAction;
            if (settings && settings._id) {
                resultAction = await dispatch(updateGeneralSettingsAction(submitData));
            } else {
                resultAction = await dispatch(createGeneralSettingsAction(submitData));
            }

            if (createGeneralSettingsAction.fulfilled.match(resultAction) || updateGeneralSettingsAction.fulfilled.match(resultAction)) {
                AlertDialog("Success", "General settings updated successfully!", "success");
            } else {
                throw new Error(resultAction.payload as string || "Failed to update settings");
            }
        } catch (error: any) {
            console.error("Error saving settings:", error);
            AlertDialog("Error", error.message || "Failed to update settings", "error");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">General Settings</h1>
                    <p className="text-gray-500 mt-1">Manage global site configurations and contact information</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={saving}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                    {saving ? "Saving..." : "Save Changes"}
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Logos */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Header Logo Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group">
                        {/* Gradient Header */}
                        <div className="h-28 bg-gradient-to-r from-purple-600 to-indigo-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                            <div className="absolute top-4 left-4 flex items-center gap-2 text-white/90 font-bold">
                                <ImageIcon size={18} />
                                <span>Header Logo</span>
                            </div>
                        </div>

                        {/* Overlapping Logo Container */}
                        <div className="relative -mt-12 px-6 pb-6">
                            <div className={`w-24 h-24 bg-white rounded-xl shadow-xl border-4 flex items-center justify-center overflow-hidden transition-all duration-500 relative ${activeField === "headerLogo" ? "border-purple-500 scale-105" : "border-white"}`}>
                                {previews.headerLogo ? (
                                    <img
                                        src={previews.headerLogo}
                                        alt="Header Logo"
                                        className="w-full h-full object-contain p-2"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <Upload size={32} />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, "headerLogo")}
                                    className={`absolute inset-0 opacity-0 z-20 ${activeField === "headerLogo" ? "cursor-pointer" : "cursor-default pointer-events-none"}`}
                                    accept="image/*"
                                    disabled={activeField !== "headerLogo"}
                                />

                                <button
                                    onClick={() => toggleField("headerLogo")}
                                    className={`absolute top-1 right-1 p-1 rounded-full z-30 transition-all ${activeField === "headerLogo" ? "bg-red-500 text-white" : "bg-purple-600 text-white shadow-lg"}`}
                                >
                                    {activeField === "headerLogo" ? <X size={12} /> : <Edit3 size={12} />}
                                </button>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-sm font-bold text-gray-800">Main Navbar Logo</h4>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                                    {files.headerLogo ? files.headerLogo.name : "Recommended: Transparent PNG"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Logo Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group">
                        {/* Gradient Header */}
                        <div className="h-28 bg-gradient-to-r from-pink-600 to-purple-600 relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all" />
                            <div className="absolute top-4 left-4 flex items-center gap-2 text-white/90 font-bold">
                                <ImageIcon size={18} />
                                <span>Footer Logo</span>
                            </div>
                        </div>

                        {/* Overlapping Logo Container */}
                        <div className="relative -mt-12 px-6 pb-6">
                            <div className={`w-24 h-24 bg-gray-900 rounded-xl shadow-xl border-4 flex items-center justify-center overflow-hidden transition-all duration-500 relative ${activeField === "footerLogo" ? "border-pink-500 scale-105" : "border-white"}`}>
                                {previews.footerLogo ? (
                                    <img
                                        src={previews.footerLogo}
                                        alt="Footer Logo"
                                        className="w-full h-full object-contain p-2"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-600">
                                        <Upload size={32} />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(e, "footerLogo")}
                                    className={`absolute inset-0 opacity-0 z-20 ${activeField === "footerLogo" ? "cursor-pointer" : "cursor-default pointer-events-none"}`}
                                    accept="image/*"
                                    disabled={activeField !== "footerLogo"}
                                />

                                <button
                                    onClick={() => toggleField("footerLogo")}
                                    className={`absolute top-1 right-1 p-1 rounded-full z-30 transition-all ${activeField === "footerLogo" ? "bg-red-500 text-white" : "bg-pink-600 text-white shadow-lg"}`}
                                >
                                    {activeField === "footerLogo" ? <X size={12} /> : <Edit3 size={12} />}
                                </button>
                            </div>
                            <div className="mt-4">
                                <h4 className="text-sm font-bold text-gray-800">Footer Site Logo</h4>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider mt-1">
                                    {files.footerLogo ? files.footerLogo.name : "Optimized for dark background"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Contact Info & Location */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                            <Globe className="text-purple-600" size={24} />
                            Contact & Location Details
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2 group">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Mail size={16} /> Email Address
                                    </label>
                                    <button
                                        onClick={() => toggleField("email")}
                                        className={`p-1.5 rounded-lg transition-all ${activeField === "email" ? "bg-red-100 text-red-600" : "bg-purple-100 text-purple-600 opacity-0 group-hover:opacity-100"}`}
                                    >
                                        {activeField === "email" ? <X size={14} /> : <Edit3 size={14} />}
                                    </button>
                                </div>
                                <input
                                    ref={inputRefs.email}
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={activeField !== "email"}
                                    placeholder="e.g. info@hubmicro.com"
                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${activeField === "email" ? "border-purple-500 bg-white ring-2 ring-purple-100" : "border-gray-200 cursor-not-allowed"}`}
                                />
                            </div>
                            <div className="space-y-4 group">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <Phone size={16} /> Phone Numbers (Max 4)
                                    </label>
                                    <div className="flex items-center gap-2">
                                        {formData.phoneNumber.length < 4 && (
                                            <button
                                                onClick={addPhoneNumber}
                                                className="p-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-all flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider"
                                            >
                                                <Plus size={12} /> Add
                                            </button>
                                        )}
                                        <button
                                            onClick={() => toggleField("phoneNumber")}
                                            className={`p-1.5 rounded-lg transition-all ${activeField === "phoneNumber" ? "bg-red-100 text-red-600" : "bg-purple-100 text-purple-600 opacity-0 group-hover:opacity-100"}`}
                                        >
                                            {activeField === "phoneNumber" ? <X size={14} /> : <Edit3 size={14} />}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    {formData.phoneNumber.map((phone, index) => (
                                        <div key={index} className="flex gap-2">
                                            <div className="relative flex-1">
                                                <input
                                                    ref={(el: any) => (phoneNumberRefs.current[index] = el)}
                                                    type="text"
                                                    value={phone}
                                                    onChange={(e) => handlePhoneChange(index, e.target.value)}
                                                    disabled={activeField !== "phoneNumber"}
                                                    placeholder={`Phone Number ${index + 1}`}
                                                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${activeField === "phoneNumber" ? "border-purple-500 bg-white ring-2 ring-purple-100" : "border-gray-200 cursor-not-allowed"}`}
                                                />
                                            </div>
                                            {activeField === "phoneNumber" && (
                                                <button
                                                    onClick={() => removePhoneNumber(index)}
                                                    className="p-3 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 transition-all"
                                                    title="Remove"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 mb-6 group">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    <MapPin size={16} /> Business Address
                                </label>
                                <button
                                    onClick={() => toggleField("location")}
                                    className={`p-1.5 rounded-lg transition-all ${activeField === "location" ? "bg-red-100 text-red-600" : "bg-purple-100 text-purple-600 opacity-0 group-hover:opacity-100"}`}
                                >
                                    {activeField === "location" ? <X size={14} /> : <Edit3 size={14} />}
                                </button>
                            </div>
                            <input
                                ref={inputRefs.location}
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                disabled={activeField !== "location"}
                                placeholder="e.g. 123 Business Ave, Tech City, TC 12345"
                                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all ${activeField === "location" ? "border-purple-500 bg-white ring-2 ring-purple-100" : "border-gray-200 cursor-not-allowed"}`}
                            />
                        </div>

                        <div className="space-y-2 group">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                    Google Maps Embed URL / Location Note
                                </label>
                                <button
                                    onClick={() => toggleField("ourLocation")}
                                    className={`p-1.5 rounded-lg transition-all ${activeField === "ourLocation" ? "bg-red-100 text-red-600" : "bg-purple-100 text-purple-600 opacity-0 group-hover:opacity-100"}`}
                                >
                                    {activeField === "ourLocation" ? <X size={14} /> : <Edit3 size={14} />}
                                </button>
                            </div>
                            <textarea
                                ref={inputRefs.ourLocation}
                                name="ourLocation"
                                rows={4}
                                value={formData.ourLocation}
                                onChange={handleInputChange}
                                disabled={activeField !== "ourLocation"}
                                placeholder="Paste the 'src' URL from Google Maps embed iframe here..."
                                className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all resize-none ${activeField === "ourLocation" ? "border-purple-500 bg-white ring-2 ring-purple-100" : "border-gray-200 cursor-not-allowed"}`}
                            />
                            <p className="text-xs text-gray-400">
                                To get the URL: Go to Google Maps &rarr; Share &rarr; Embed a map &rarr; Copy the value inside the src="..." attribute.
                            </p>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-3xl text-white">
                        <h4 className="font-bold flex items-center gap-2 mb-4">
                            <CheckCircle2 size={20} className="text-green-400" />
                            Pro Tips
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex gap-2">
                                <span className="text-purple-400 font-bold">•</span>
                                Use transparent PNGs for logos to ensure they blend perfectly with transitions.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-400 font-bold">•</span>
                                Ensure your phone number includes the country code for global reach.
                            </li>
                            <li className="flex gap-2">
                                <span className="text-purple-400 font-bold">•</span>
                                Changes here will automatically reflect in the Navbar, Footer, and Contact sections.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralSettingsPage;
