"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    getUserDetails,
    suspendUser,
    activateUser,
    deleteUser,
} from "@/services/userManagementService";
import {
    ArrowLeft,
    Mail,
    Phone,
    Briefcase,
    Calendar,
    ShoppingBag,
    DollarSign,
    Package,
    Ban,
    CheckCircle,
    Trash2,
    Loader2,
    AlertTriangle,
} from "lucide-react";
import { getValidImageUrl } from "@/utils/imageUtils";
import Swal from "sweetalert2";

interface UserDetails {
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
    suspensionHistory: Array<{
        reason: string;
        suspendedAt: string;
        activatedAt?: string;
        suspendedBy: { name: string; email: string };
        activatedBy?: { name: string; email: string };
    }>;
    createdAt: string;
}

interface OrderStats {
    totalOrders: number;
    fulfilledOrders: number;
    paidOrders: number;
    totalSpent: number;
    ordersByStatus: {
        pending: number;
        processing: number;
        shipped: number;
        delivered: number;
        cancelled: number;
    };
}

const UserDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const userId = params.id as string;

    const [user, setUser] = useState<UserDetails | null>(null);
    const [orderStats, setOrderStats] = useState<OrderStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUserDetails = async () => {
        setLoading(true);
        try {
            const response = await getUserDetails(userId);
            if (response.success) {
                setUser(response.user);
                setOrderStats(response.orderStatistics);
            }
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.response?.data?.message || "Failed to fetch user details",
            });
            router.push("/superadmin/users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [userId]);

    const handleSuspend = async () => {
        if (!user) return;

        const { value: reason } = await Swal.fire({
            title: `Suspend ${user.name}`,
            text: "Please provide a reason for suspension:",
            input: "textarea",
            inputPlaceholder: "Enter suspension reason...",
            showCancelButton: true,
            confirmButtonText: "Suspend User",
            confirmButtonColor: "#ef4444",
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
                    fetchUserDetails();
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

    const handleActivate = async () => {
        if (!user) return;

        const result = await Swal.fire({
            title: `Activate ${user.name}?`,
            text: "This will reactivate the suspended user.",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Activate",
            confirmButtonColor: "#10b981",
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
                    fetchUserDetails();
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

    const handleDelete = async () => {
        if (!user) return;

        const result = await Swal.fire({
            title: "Delete User",
            html: `Are you sure you want to delete <strong>"${user.name}"</strong>?<br><br><span style="color: #ef4444;">This action cannot be undone.</span>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete",
            confirmButtonColor: "#ef4444",
        });

        if (result.isConfirmed) {
            try {
                const response = await deleteUser(userId);
                if (response.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "User deleted successfully",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    router.push("/superadmin/users");
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

    if (loading) {
        return (
            <div className="p-6 flex items-center justify-center min-h-screen">
                <Loader2 className="animate-spin text-purple-600" size={48} />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return (
        <div className="p-6 max-w-[1400px] mx-auto">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => router.push("/superadmin/users")}
                    className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-4"
                >
                    <ArrowLeft size={20} />
                    Back to Users
                </button>
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
                    <div className="flex gap-2">
                        {user.isSuspended ? (
                            <button
                                onClick={handleActivate}
                                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                            >
                                <CheckCircle size={18} />
                                Activate User
                            </button>
                        ) : (
                            <button
                                onClick={handleSuspend}
                                className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                            >
                                <Ban size={18} />
                                Suspend User
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                        >
                            <Trash2 size={18} />
                            Delete User
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex flex-col items-center">
                            <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white text-3xl font-bold mb-4">
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
                            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
                            <p className="text-sm text-gray-500 mb-4">User ID: {user.id || user._id}</p>

                            {user.isSuspended && (
                                <div className="w-full mb-4">
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                                        <AlertTriangle className="text-red-600" size={20} />
                                        <span className="text-red-600 font-semibold text-sm">Account Suspended</span>
                                    </div>
                                </div>
                            )}

                            <div className="w-full space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="text-gray-400" size={18} />
                                    <span className="text-gray-700">{user.email}</span>
                                </div>
                                {user.phoneNumber && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Phone className="text-gray-400" size={18} />
                                        <span className="text-gray-700">{user.phoneNumber}</span>
                                    </div>
                                )}
                                {user.occupation && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <Briefcase className="text-gray-400" size={18} />
                                        <span className="text-gray-700">{user.occupation}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm">
                                    <Calendar className="text-gray-400" size={18} />
                                    <span className="text-gray-700">
                                        Joined {new Date(user.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            <div className="w-full mt-4 pt-4 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">Role</span>
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                                        {user.role}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-sm text-gray-600">Suspensions</span>
                                    <span className="font-bold text-gray-800">{user.suspensionCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats and History */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Order Statistics */}
                    {orderStats && (
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Statistics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <ShoppingBag className="text-blue-600" size={20} />
                                        <span className="text-sm text-gray-600">Total Orders</span>
                                    </div>
                                    <p className="text-2xl font-bold text-blue-600">{orderStats.totalOrders}</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="text-green-600" size={20} />
                                        <span className="text-sm text-gray-600">Fulfilled</span>
                                    </div>
                                    <p className="text-2xl font-bold text-green-600">{orderStats.fulfilledOrders}</p>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="text-purple-600" size={20} />
                                        <span className="text-sm text-gray-600">Paid Orders</span>
                                    </div>
                                    <p className="text-2xl font-bold text-purple-600">{orderStats.paidOrders}</p>
                                </div>
                                <div className="bg-yellow-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <DollarSign className="text-yellow-600" size={20} />
                                        <span className="text-sm text-gray-600">Total Spent</span>
                                    </div>
                                    <p className="text-2xl font-bold text-yellow-600">${orderStats.totalSpent.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                                <h4 className="font-semibold text-gray-700 mb-3">Orders by Status</h4>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                                    <div>
                                        <span className="text-gray-600">Pending:</span>
                                        <span className="ml-2 font-semibold">{orderStats.ordersByStatus.pending}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Processing:</span>
                                        <span className="ml-2 font-semibold">{orderStats.ordersByStatus.processing}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Shipped:</span>
                                        <span className="ml-2 font-semibold">{orderStats.ordersByStatus.shipped}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Delivered:</span>
                                        <span className="ml-2 font-semibold">{orderStats.ordersByStatus.delivered}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Cancelled:</span>
                                        <span className="ml-2 font-semibold">{orderStats.ordersByStatus.cancelled}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Suspension History */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Suspension History</h3>
                        {user.suspensionHistory && user.suspensionHistory.length > 0 ? (
                            <div className="space-y-4">
                                {user.suspensionHistory.map((suspension, index) => (
                                    <div
                                        key={index}
                                        className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 transition-colors"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">Reason:</p>
                                                <p className="text-gray-600 text-sm mt-1">{suspension.reason}</p>
                                            </div>
                                            {suspension.activatedAt ? (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                                                    Reactivated
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                                                    Active
                                                </span>
                                            )}
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 text-sm">
                                            <div>
                                                <p className="text-gray-500">Suspended At:</p>
                                                <p className="text-gray-700">{new Date(suspension.suspendedAt).toLocaleString()}</p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    By: {suspension.suspendedBy.name}
                                                </p>
                                            </div>
                                            {suspension.activatedAt && (
                                                <div>
                                                    <p className="text-gray-500">Activated At:</p>
                                                    <p className="text-gray-700">{new Date(suspension.activatedAt).toLocaleString()}</p>
                                                    {suspension.activatedBy && (
                                                        <p className="text-gray-500 text-xs mt-1">
                                                            By: {suspension.activatedBy.name}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400 text-center py-8">No suspension history</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailsPage;
