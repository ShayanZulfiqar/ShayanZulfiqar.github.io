"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchInvestors, deleteInvestorAction } from "@/store/slices/landingSlice";
import { Trash2, Search, RefreshCw, Building } from "lucide-react";
import AlertDialog from "@/utils/Alert";

const InvestorAdminPage = () => {
    const dispatch = useAppDispatch();
    const { data: investors, loading, error } = useAppSelector((state) => state.landing.investors);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchInvestors());
    }, [dispatch]);

    const handleFetch = () => {
        dispatch(fetchInvestors());
    };

    const handleDelete = async (id: string) => {
        AlertDialog(
            "Are you sure?",
            "You won't be able to revert this!",
            "warning",
            0,
            true,
            true,
            "Yes, delete it!",
            "Cancel",
            async () => {
                try {
                    const resultAction = await dispatch(deleteInvestorAction(id));
                    if (deleteInvestorAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Deleted!",
                            "Investor application has been deleted.",
                            "success",
                            2000
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete investor");
                    }
                } catch (error: any) {
                    console.error("Failed to delete investor", error);
                    AlertDialog(
                        "Error",
                        error.message || "Failed to delete investor application.",
                        "error",
                        2000
                    );
                }
            },
            () => { }
        );
    };

    const filteredInvestors = investors.filter((inv: any) =>
        inv.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inv.companyOrganization && inv.companyOrganization.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Investor Applications</h1>
                    <p className="text-gray-500 mt-2">Manage investor inquiries and applications</p>
                </div>
                <button
                    onClick={handleFetch}
                    className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <RefreshCw className={`w-5 h-5 text-gray-600 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search by name, email, or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 font-semibold text-gray-600">Investor</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Company</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Investment Range</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Contact</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredInvestors.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                filteredInvestors.map((inv: any) => (
                                    <tr key={inv._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{inv.fullName}</div>
                                            <div className="text-sm text-gray-500">{inv.location}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {inv.companyOrganization ? (
                                                <div className="flex items-center gap-2 text-gray-900">
                                                    <Building className="w-4 h-4 text-gray-400" />
                                                    {inv.companyOrganization}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                                                {inv.investmentInterest}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div>{inv.email}</div>
                                            <div className="text-sm text-gray-500">{inv.phoneNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(inv._id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Application"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InvestorAdminPage;
