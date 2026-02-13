"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Palette, Loader2 } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { get } from "@/services/ApiService";
import { GET_CORE_VALUE_BY_ID } from "@/services/ApiRoutes";
import { updateCoreValueAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const EditCoreValuePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const id = params.id as string;
  const { user, token } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "#FF5733",
    bgColor: "#F0F0F0",
  });

  // Check authentication
  useEffect(() => {
    if (!token || !user || user.role !== "superAdmin") {
      router.push("/auth/superadmin-login");
    }
  }, [token, user, router]);

  // Fetch core value data
  useEffect(() => {
    const fetchCoreValue = async () => {
      try {
        setFetchingData(true);
        const startTime = performance.now();

        const response = await get(GET_CORE_VALUE_BY_ID(id));

        const endTime = performance.now();
        console.log(`Fetch API Response Time: ${(endTime - startTime).toFixed(2)}ms`);

        if (response.success && response.data) {
          setFormData({
            title: response.data.title,
            description: response.data.description,
            color: response.data.color,
            bgColor: response.data.bgColor,
          });
        }
      } catch (error: any) {
        AlertDialog(
          "Error!",
          error.response?.data?.message || "Failed to fetch core value",
          "error",
          3000,
          false,
          false
        );
        router.push("/superadmin/content/core-values");
      } finally {
        setFetchingData(false);
      }
    };

    if (id) {
      fetchCoreValue();
    }
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      AlertDialog("Error!", "Please fill in all required fields", "error", 3000, false, false);
      return;
    }

    try {
      setLoading(true);
      const startTime = performance.now();

      const resultAction = await dispatch(updateCoreValueAction({ id, data: formData }));

      const endTime = performance.now();
      console.log(`Update API Response Time: ${(endTime - startTime).toFixed(2)}ms`);

      if (updateCoreValueAction.fulfilled.match(resultAction)) {
        AlertDialog(
          "Success!",
          "Core value updated successfully!",
          "success",
          1500,
          false,
          false
        );
        router.push("/superadmin/content/core-values");
      } else {
        throw new Error(resultAction.payload as string || "Failed to update core value");
      }
    } catch (error: any) {
      AlertDialog(
        "Error!",
        error.message || "Failed to update core value",
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
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading core value...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={() => router.push("/superadmin/content/core-values")}
          className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-all shadow-sm hover:shadow-md"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
            Edit Core Value
          </h1>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <Sparkles size={16} className="text-blue-600" />
            <span>Update the core value for your organization</span>
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
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Integrity"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe what this core value means..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Colors Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Icon/Text Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Palette size={16} className="text-blue-600" />
                Icon/Text Color
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase font-mono"
                    placeholder="#FF5733"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowColorPicker(!showColorPicker);
                      setShowBgColorPicker(false);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-8 rounded border-2 border-gray-300 shadow-sm hover:shadow-md transition-all"
                    style={{ backgroundColor: formData.color }}
                  />
                </div>

                {showColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <div className="absolute z-10 bg-white p-4 rounded-xl shadow-2xl border border-gray-200">
                      <HexColorPicker
                        color={formData.color}
                        onChange={(color) => setFormData({ ...formData, color })}
                      />
                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={formData.color}
                          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                        />
                        <button
                          type="button"
                          onClick={() => setShowColorPicker(false)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-medium text-sm"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Palette size={16} className="text-cyan-600" />
                Background Color
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.bgColor}
                    onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                    className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent uppercase font-mono"
                    placeholder="#F0F0F0"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setShowBgColorPicker(!showBgColorPicker);
                      setShowColorPicker(false);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-8 rounded border-2 border-gray-300 shadow-sm hover:shadow-md transition-all"
                    style={{ backgroundColor: formData.bgColor }}
                  />
                </div>

                {showBgColorPicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative"
                  >
                    <div className="absolute z-10 bg-white p-4 rounded-xl shadow-2xl border border-gray-200">
                      <HexColorPicker
                        color={formData.bgColor}
                        onChange={(color) => setFormData({ ...formData, bgColor: color })}
                      />
                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={formData.bgColor}
                          onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                        />
                        <button
                          type="button"
                          onClick={() => setShowBgColorPicker(false)}
                          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-all font-medium text-sm"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Live Preview</label>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-xl border-2 border-dashed border-gray-300 transition-all"
              style={{ backgroundColor: formData.bgColor }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                  style={{ backgroundColor: formData.color }}
                >
                  {formData.title.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: formData.color }}
                  >
                    {formData.title || "Core Value Title"}
                  </h3>
                  <p className="text-gray-700">
                    {formData.description || "Core value description will appear here..."}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.push("/superadmin/content/core-values")}
              className="flex-1 px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 rounded-xl font-semibold transition-all hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Update Core Value</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditCoreValuePage;
