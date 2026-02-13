"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
    Plus,
    Edit,
    Trash2,
    Search,
    RefreshCw,
    FileText,
    AlertCircle,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchAboutContacts, deleteAboutContactAction } from "@/store/slices/landingSlice";
import AlertDialog from "@/utils/AlertDialog";

const AboutContactPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: aboutContacts, loading, error } = useAppSelector((state) => state.landing.aboutContact);
    const { user, token } = useAppSelector((state) => state.auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!token || !user || user.role !== "superAdmin") {
            router.push("/auth/superadmin-login");
            return;
        }
        dispatch(fetchAboutContacts());
    }, [token, user, router, dispatch]);

    // Handle refresh
    const handleRefresh = async () => {
        setRefreshing(true);
        await dispatch(fetchAboutContacts());
        setRefreshing(false);
    };


    const handleDelete = (id: string, title: string) => {
        AlertDialog(
            "Delete About Contact",
            `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            "warning",
            0,
            true,
            true,
            "Yes, Delete",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteAboutContactAction(id));
                    if (deleteAboutContactAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Success!",
                            "About contact deleted successfully.",
                            "success",
                            3000,
                            false,
                            false
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete about contact");
                    }
                } catch (error: any) {
                    AlertDialog(
                        "Error!",
                        error.message || "Failed to delete about contact",
                        "error",
                        3000,
                        false,
                        false
                    );
                }
            }
        );
    };

    // Filter about contacts based on search
    const filteredAboutContacts = aboutContacts.filter((contact) =>
        contact.mainTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 text-lg">Loading about contacts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
                        About Contact Management
                    </h1>
                    <p className="text-gray-600 flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        <span>Manage your about us and contact sections</span>
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleRefresh}
                        disabled={refreshing}
                        className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50"
                    >
                        <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
                        Refresh
                    </button>

                    <button
                        onClick={() => router.push("/superadmin/content/about-contact/add")}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl font-semibold"
                    >
                        <Plus size={20} />
                        Add About Contact
                    </button>
                </div>
            </motion.div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 p-4"
            >
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by title or subtitle..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
            </motion.div>

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                    <p className="text-blue-600 text-sm font-semibold mb-1">Total Sections</p>
                    <p className="text-3xl font-bold text-blue-700">{aboutContacts.length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                    <p className="text-green-600 text-sm font-semibold mb-1">Filtered Results</p>
                    <p className="text-3xl font-bold text-green-700">{filteredAboutContacts.length}</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                    <p className="text-purple-600 text-sm font-semibold mb-1">Last Updated</p>
                    <p className="text-lg font-bold text-purple-700">
                        {aboutContacts.length > 0 ? new Date(aboutContacts[0].updatedAt || "").toLocaleDateString() : "N/A"}
                    </p>
                </div>
            </motion.div>

            {/* Cards Grid */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {filteredAboutContacts.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-xl border border-gray-200">
                        <AlertCircle size={64} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No About Contacts Found</h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first about contact section"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={() => router.push("/superadmin/content/about-contact/add")}
                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                <Plus size={20} />
                                Add Your First About Contact
                            </button>
                        )}
                    </div>
                ) : (
                    <AnimatePresence>
                        {filteredAboutContacts.map((contact, index) => (
                            <motion.div
                                key={contact._id || contact.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all"
                            >
                                {/* Card Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                                    <h3 className="text-xl font-bold mb-2">{contact.mainTitle}</h3>
                                    <p className="text-blue-100 text-sm">{contact.subtitle}</p>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 space-y-4">
                                    {/* Contacts */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                            <Mail size={16} className="text-blue-600" />
                                            Contact Information ({contact.contacts.length})
                                        </h4>
                                        <div className="space-y-2">
                                            {contact.contacts.slice(0, 3).map((c, idx) => (
                                                <div key={idx} className="flex items-start gap-2 text-sm">
                                                    <ExternalLink size={14} className="text-gray-400 mt-0.5 flex-shrink-0" />
                                                    <a
                                                        href={c.href}
                                                        className="text-blue-600 hover:underline truncate"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {c.text}
                                                    </a>
                                                </div>
                                            ))}
                                            {contact.contacts.length > 3 && (
                                                <p className="text-xs text-gray-500 italic">+{contact.contacts.length - 3} more</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-700 mb-3">
                                            CTA Buttons ({contact.ctaButtons.length})
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {contact.ctaButtons.slice(0, 2).map((btn, idx) => (
                                                <span
                                                    key={idx}
                                                    className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium"
                                                >
                                                    {btn.label}
                                                </span>
                                            ))}
                                            {contact.ctaButtons.length > 2 && (
                                                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                                    +{contact.ctaButtons.length - 2} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="pt-4 border-t border-gray-200">
                                        <p className="text-xs text-gray-500">
                                            Created: {new Date(contact.createdAt || "").toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="px-6 pb-6 flex items-center gap-2">
                                    <button
                                        onClick={() => router.push(`/superadmin/content/about-contact/edit/${contact._id || contact.id}`)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                                    >
                                        <Edit size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact._id || contact.id!, contact.mainTitle)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </motion.div>
        </div>
    );
};

export default AboutContactPage;
