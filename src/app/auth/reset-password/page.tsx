"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetPassword } from "@/store/slices/authSlice";
import AlertDialog from "@/utils/AlertDialog";

const ResetPasswordPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const { loading, tempEmail } = useAppSelector((state) => state.auth);
  const email = emailParam || tempEmail || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      AlertDialog("Error!", "Passwords do not match", "error", 3000, false, false);
      return;
    }

    if (formData.password.length < 6) {
      AlertDialog("Error!", "Password must be at least 6 characters", "error", 3000, false, false);
      return;
    }

    try {
      const result = await dispatch(resetPassword({
        email: email as string,
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      })).unwrap();

      AlertDialog(
        "Success!",
        result?.message || "Password reset successful. You can now login with your new password.",
        "success",
        3000,
        false,
        false
      );

      setIsSuccess(true);

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error: any) {
      AlertDialog("Error!", error || "Failed to reset password", "error", 3000, false, false);
    }
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { label: "One number", met: /[0-9]/.test(formData.password) },
    { label: "One special character", met: /[!@#$%^&*]/.test(formData.password) },
  ];

  const allRequirementsMet = passwordRequirements.every((req) => req.met);
  const passwordsMatch =
    formData.password && formData.confirmPassword
      ? formData.password === formData.confirmPassword
      : true;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 relative overflow-hidden py-12 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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

      {/* Animated lock icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 180, 360],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Lock className="w-6 h-6 text-white/20" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
          {!isSuccess ? (
            <>
              {/* Icon */}
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full mb-4 shadow-lg relative"
                >
                  <Lock className="w-10 h-10 text-white" />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 blur-xl opacity-50"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Reset Password
                </h1>
                <p className="text-teal-100">Create a strong new password for your account</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* New Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-teal-300" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-teal-300" />
                      ) : (
                        <Eye className="w-5 h-5 text-teal-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="bg-white/5 rounded-xl p-4 space-y-2"
                  >
                    <p className="text-sm font-semibold text-white mb-2">
                      Password requirements:
                    </p>
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                            req.met
                              ? "bg-green-500 scale-100"
                              : "bg-white/20 scale-90"
                          }`}
                        >
                          {req.met && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span
                          className={`text-sm transition-colors ${
                            req.met ? "text-green-300 font-medium" : "text-teal-200"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-teal-300" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className={`w-full pl-12 pr-12 py-4 bg-white/10 border-2 rounded-xl text-white placeholder-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all ${
                        formData.confirmPassword
                          ? passwordsMatch
                            ? "border-green-500/50"
                            : "border-red-500/50"
                          : "border-white/20"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-teal-300" />
                      ) : (
                        <Eye className="w-5 h-5 text-teal-300" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && !passwordsMatch && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-300 text-sm mt-2"
                    >
                      Passwords don't match
                    </motion.p>
                  )}
                  {formData.confirmPassword && passwordsMatch && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-300 text-sm mt-2 flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" />
                      Passwords match
                    </motion.p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={!allRequirementsMet || !passwordsMatch || loading}
                  whileHover={{
                    scale:
                      allRequirementsMet && passwordsMatch && !loading ? 1.02 : 1,
                  }}
                  whileTap={{
                    scale:
                      allRequirementsMet && passwordsMatch && !loading ? 0.98 : 1,
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group ${
                    allRequirementsMet && passwordsMatch && !loading
                      ? "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-xl"
                      : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Resetting Password...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Reset Password</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg"
              >
                <CheckCircle className="w-16 h-16 text-white" />
              </motion.div>

              <h3 className="text-3xl font-bold text-white mb-3">
                Password Reset Successfully!
              </h3>
              <p className="text-teal-200 mb-6">
                Your password has been changed. You can now login with your new
                password.
              </p>

              <div className="flex items-center justify-center gap-2 text-teal-200 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Redirecting to login...</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/home"
            className="text-teal-200 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
