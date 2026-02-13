"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchJoinTeam, deleteJoinTeamAction } from "@/store/slices/landingSlice";
import { Trash2, FileText, Search, RefreshCw } from "lucide-react";
import { imageUrl } from "@/services/BaseUrl";
import AlertDialog from "@/utils/Alert";

const JoinTeamAdminPage = () => {
    const dispatch = useAppDispatch();
    const { data: applicants, loading, error } = useAppSelector((state) => state.landing.joinTeam);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchJoinTeam());
    }, [dispatch]);

    const handleFetch = () => {
        dispatch(fetchJoinTeam());
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
                    const resultAction = await dispatch(deleteJoinTeamAction(id));
                    if (deleteJoinTeamAction.fulfilled.match(resultAction)) {
                        AlertDialog(
                            "Deleted!",
                            "Application has been deleted.",
                            "success",
                            2000
                        );
                    } else {
                        throw new Error(resultAction.payload as string || "Failed to delete application");
                    }
                } catch (error: any) {
                    console.error("Failed to delete application", error);
                    AlertDialog(
                        "Error",
                        error.message || "Failed to delete application.",
                        "error",
                        2000
                    );
                }
            },
            () => { }
        );
    };

    const filteredApplicants = applicants.filter((app: any) =>
        app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.positionOfInterest.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Team Applications</h1>
                    <p className="text-gray-500 mt-2">Manage job applications for various roles</p>
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
                    placeholder="Search by name, email, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                />
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 font-semibold text-gray-600">Name</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Position</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Experience</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Contact</th>
                                <th className="px-6 py-4 font-semibold text-gray-600">Resume</th>
                                <th className="px-6 py-4 font-semibold text-gray-600 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : filteredApplicants.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No applications found.
                                    </td>
                                </tr>
                            ) : (
                                filteredApplicants.map((app: any) => (
                                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{app.fullName}</div>
                                            <div className="text-sm text-gray-500">{app.location}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
                                                {app.positionOfInterest}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{app.yearsOfExperience}</td>
                                        <td className="px-6 py-4 text-gray-600">
                                            <div>{app.email}</div>
                                            <div className="text-sm text-gray-500">{app.phoneNumber}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {app.resume ? (
                                                <a
                                                    href={`${imageUrl}${app.resume}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                                                >
                                                    <FileText className="w-4 h-4" />
                                                    <span>View Resume</span>
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No Resume</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(app._id)}
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

export default JoinTeamAdminPage;
