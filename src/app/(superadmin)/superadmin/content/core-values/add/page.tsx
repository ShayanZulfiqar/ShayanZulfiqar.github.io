"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, Palette } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { createCoreValueAction } from "@/store/slices/landingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import AlertDialog from "@/utils/AlertDialog";

const AddCoreValuePage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
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

      const resultAction = await dispatch(createCoreValueAction(formData));

      const endTime = performance.now();
      console.log(`Create API Response Time: ${(endTime - startTime).toFixed(2)}ms`);

      if (createCoreValueAction.fulfilled.match(resultAction)) {
        AlertDialog(
          "Success!",
          "Core value created successfully!",
          "success",
          1500, // Reduced timer for better UX
          false,
          false
        );
        router.push("/superadmin/content/core-values");
      } else {
        throw new Error(resultAction.payload as string || "Failed to create core value");
      }
    } catch (error: any) {
      AlertDialog(
        "Error!",
        error.message || "Failed to create core value",
        "error",
        3000,
        false,
        false
      );
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            Add New Core Value
          </h1>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <Sparkles size={16} className="text-purple-600" />
            <span>Create a new core value for your organization</span>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Colors Row */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Icon/Text Color */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Palette size={16} className="text-purple-600" />
                Icon/Text Color
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase font-mono"
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
                          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all font-medium text-sm"
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
                <Palette size={16} className="text-pink-600" />
                Background Color
              </label>
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={formData.bgColor}
                    onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                    className="w-full px-4 py-3 pr-16 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent uppercase font-mono"
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
                          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-all font-medium text-sm"
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
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>Create Core Value</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddCoreValuePage;
