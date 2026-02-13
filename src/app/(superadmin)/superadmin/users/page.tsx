"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    getAllUsers,
    suspendUser,
    activateUser,
    deleteUser,
} from "@/services/userManagementService";
import {
    Eye,
    Trash2,
    Search,
    Ban,
    CheckCircle,
    Loader2,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { getValidImageUrl } from "@/utils/imageUtils";
import Swal from "sweetalert2";

interface User {
    id: string;
    _id: string;
    name: string;
    email: string;
    role: string;
    phoneNumber?: string;
    occupation?: string;
    profileImage?: string;
    isSuspended: boolean;
    suspensionCount: number;
    createdAt: string;
}

const UsersPage = () => {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended">("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await getAllUsers({
                page: currentPage,
                limit,
                search: searchTerm,
                status: statusFilter,
            });

            if (response.success) {
                setUsers(response.users);
                setTotalPages(response.pagination.pages);
                setTotal(response.pagination.total);
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.response?.data?.message || "Failed to fetch users",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage, statusFilter]);

    const handleSearch = () => {
        setCurrentPage(1);
        fetchUsers();
    };

    const handleSuspend = async (userId: string, userName: string) => {
        const { value: reason } = await Swal.fire({
            title: `Suspend ${userName}`,
            text: "Please provide a reason for suspension:",
            input: "textarea",
            inputPlaceholder: "Enter suspension reason...",
            inputAttributes: {
                "aria-label": "Suspension reason",
            },
            showCancelButton: true,
            confirmButtonText: "Suspend User",
            confirmButtonColor: "#ef4444",
            cancelButtonText: "Cancel",
            inputValidator: (value) => {
                if (!value || value.trim().length === 0) {
                    return "You need to provide a reason!";
                }
                return null;
            },
        });

        if (reason) {
            try {
                const response = await suspendUser(userId, reason);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "User suspended successfully",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    fetchUsers();
                }
            } catch (error: any) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response?.data?.message || "Failed to suspend user",
                });
            }
        }
    };

    const handleActivate = async (userId: string, userName: string) => {
        const result = await Swal.fire({
            title: `Activate ${userName}?`,
            text: "This will reactivate the suspended user.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Activate",
            confirmButtonColor: "#10b981",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response = await activateUser(userId);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "User activated successfully",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    fetchUsers();
                }
            } catch (error: any) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response?.data?.message || "Failed to activate user",
                });
            }
        }
    };

    const handleDelete = async (userId: string, userName: string) => {
        const result = await Swal.fire({
            title: "Delete User",
            html: `Are you sure you want to delete <strong>"${userName}"</strong>?<br><br><span style="color: #ef4444;">This action cannot be undone.</span>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            confirmButtonColor: "#ef4444",
            cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteUser(userId);
                if (response.success) {
                    setUsers((prevUsers) =>
                        prevUsers.filter((user) => user._id !== userId && user.id !== userId)
                    );
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "User deleted successfully",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            } catch (error: any) {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: error.response?.data?.message || "Failed to delete user",
                });
            }
        }
    };

    const handleViewDetails = (userId: string) => {
        router.push(`/superadmin/users/${userId}`);
    };

    return (
        <div className="p-6 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                    <p className="text-gray-500 mt-2">Manage all registered users</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">Total Users:</span>
                    <span className="font-bold text-purple-600">{total}</span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search */}
                    <div className="md:col-span-2">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                            />
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div>
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value as "all" | "active" | "suspended");
                                setCurrentPage(1);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        >
                            <option value="all">All Users</option>
                            <option value="active">Active Users</option>
                            <option value="suspended">Suspended Users</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleSearch}
                    className="mt-4 w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                    Search
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-700">User</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Contact</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Role</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Status</th>
                                <th className="px-6 py-4 font-semibold text-gray-700">Suspensions</th>
                                <th className="px-6 py-4 font-semibold text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <Loader2 className="animate-spin inline-block text-purple-600" size={32} />
                                    </td>
                                </tr>
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id || user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                                                    {user.profileImage ? (
                                                        <img
                                                            src={getValidImageUrl(user.profileImage) || undefined}
                                                            alt={user.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        user.name.charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.occupation || "N/A"}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-sm text-gray-800">{user.email}</p>
                                                <p className="text-xs text-gray-500">{user.phoneNumber || "N/A"}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isSuspended ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                                                    Suspended
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                                                    Active
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{user.suspensionCount || 0}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* View Details */}
                                                <button
                                                    onClick={() => handleViewDetails(user._id || user.id)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>

                                                {/* Suspend/Activate */}
                                                {user.isSuspended ? (
                                                    <button
                                                        onClick={() => handleActivate(user._id || user.id, user.name)}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                        title="Activate User"
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleSuspend(user._id || user.id, user.name)}
                                                        className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                                        title="Suspend User"
                                                    >
                                                        <Ban size={18} />
                                                    </button>
                                                )}

                                                {/* Delete */}
                                                <button
                                                    onClick={() => handleDelete(user._id || user.id, user.name)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete User"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <p className="text-gray-400">No users found</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UsersPage;
