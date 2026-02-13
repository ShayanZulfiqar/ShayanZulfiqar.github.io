"use client";
import React, { useState, useRef } from "react";
import ShopHeader from "@/elements/ShopHeader";
import ShopFooter from "@/elements/ShopFooter";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserProfile } from "@/store/slices/authSlice";
import { categories } from "@/data/shopData";
import { User, Mail, Phone, Camera, Save, Briefcase } from "lucide-react";
import { getValidImageUrl } from "@/utils/imageUtils";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const loading = useAppSelector((state) => state.auth.loading);
  const [editing, setEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phoneNumber: user?.phoneNumber || "",
    occupation: user?.occupation || "",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    formDataToSend.append("occupation", formData.occupation);

    if (selectedFile) {
      formDataToSend.append("profileImage", selectedFile);
    }

    try {
      await dispatch(updateUserProfile(formDataToSend)).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setEditing(false);
      setImagePreview(null);
      setSelectedFile(null);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error || "Failed to update profile",
      });
    }
  };

  const currentProfileImage = imagePreview || (user?.profileImage ? getValidImageUrl(user.profileImage) : null);

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader categories={categories} />
      <main className="pt-40 mt-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                {currentProfileImage ? (
                  <img
                    src={currentProfileImage}
                    alt={user?.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-purple-100"
                  />
                ) : (
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={!editing}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!editing}
                  className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Camera size={20} className="text-purple-600" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mt-4">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!editing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    disabled={!editing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Occupation
                </label>
                <div className="relative">
                  <Briefcase
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={formData.occupation}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                    disabled={!editing}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 disabled:bg-gray-50"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                {editing ? (
                  <>
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save size={20} />
                          Save Changes
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setFormData({
                          name: user?.name || "",
                          phoneNumber: user?.phoneNumber || "",
                          occupation: user?.occupation || "",
                        });
                        setImagePreview(null);
                        setSelectedFile(null);
                      }}
                      disabled={loading}
                      className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <ShopFooter />
    </div>
  );
};
export default ProfilePage;
