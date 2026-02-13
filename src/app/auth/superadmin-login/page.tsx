"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Shield, Lock, Eye, EyeOff, ArrowRight, Mail } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { superAdminLogin } from "@/store/slices/authSlice";
import AlertDialog from "@/utils/AlertDialog";

const SuperAdminLoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(superAdminLogin({
        email: formData.email,
        password: formData.password,
      })).unwrap();

      AlertDialog(
        "Success!",
        "Super Admin login successful!",
        "success",
        2000,
        false,
        false
      );

      setTimeout(() => {
        if (result.user.role === "superAdmin") {
          router.push("/superadmin/dashboard");
        } else {
          AlertDialog("Error!", "Unauthorized access. Super admin role required.", "error", 3000, false, false);
        }
      }, 2000);
    } catch (error: any) {
      AlertDialog("Error!", error || "Login failed", "error", 3000, false, false);
    }
  };

  return (
    <div className="relative flex justify-center items-center bg-gradient-to-br from-gray-900 via-purple-900 to-red-900 px-4 py-12 min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="top-20 left-10 absolute bg-red-600 opacity-20 blur-xl rounded-full w-72 h-72 mix-blend-multiply filter"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="right-10 bottom-20 absolute bg-purple-600 opacity-20 blur-xl rounded-full w-96 h-96 mix-blend-multiply filter"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 relative w-full max-w-md"
      >
        <div className="bg-white/10 shadow-2xl backdrop-blur-lg p-8 md:p-10 border border-white/20 rounded-3xl">
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex justify-center items-center bg-gradient-to-br from-red-600 to-purple-600 shadow-lg mb-4 rounded-2xl w-20 h-20"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="mb-2 font-bold text-white text-3xl md:text-4xl">
              Super Admin
            </h2>
            <p className="text-red-200">Restricted Access Area</p>
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="bg-red-500 rounded-full w-2 h-2 animate-pulse" />
              <p className="text-red-300 text-xs uppercase tracking-wide">
                Authorized Personnel Only
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold text-white text-sm">
                Admin Email
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                  <Mail className="w-5 h-5 text-red-300" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                  className="bg-white/10 py-4 pr-4 pl-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-full text-white transition-all placeholder-red-200"
                  placeholder="admin@hubmicro.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 font-semibold text-white text-sm">
                Admin Password
              </label>
              <div className="relative">
                <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                  <Lock className="w-5 h-5 text-red-300" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="bg-white/10 py-4 pr-12 pl-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 w-full text-white transition-all placeholder-red-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="right-0 absolute inset-y-0 flex items-center pr-4"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-red-300" />
                  ) : (
                    <Eye className="w-5 h-5 text-red-300" />
                  )}
                </button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="bg-red-500/10 p-4 border border-red-500/20 rounded-xl">
              <p className="text-red-200 text-sm">
                🔐 This is a secure area. All access attempts are logged and monitored.
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="group flex justify-center items-center gap-2 bg-gradient-to-r from-red-600 to-purple-600 disabled:opacity-50 shadow-lg hover:shadow-xl py-4 rounded-xl w-full font-bold text-white text-lg transition-all duration-300 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="border-2 border-white border-t-transparent rounded-full w-5 h-5 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Access Admin Panel</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-red-200 text-sm">
              Not a super admin?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-white hover:text-red-300 transition-colors"
              >
                User Login
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/home"
            className="text-red-200 hover:text-white text-sm transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SuperAdminLoginPage;
