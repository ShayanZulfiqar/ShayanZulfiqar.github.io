"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
  Building,
  Phone,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { signup, setTempEmail } from "@/store/slices/authSlice";
import AlertDialog from "@/utils/AlertDialog";

const SignupPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    occupation: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    if (error) {
      AlertDialog("Error!", error, "error", 3000, false, false);
    }
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
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
      const result = await dispatch(signup({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        phoneNumber: formData.phone,
        occupation: formData.occupation,
      })).unwrap();

      AlertDialog(
        "Success!",
        result?.message || "Registration successful! OTP sent to your email.",
        "success",
        3000,
        false,
        false
      );

      dispatch(setTempEmail(formData.email));
      setTimeout(() => {
        router.push(`/auth/verify-email?email=${formData.email}`);
      }, 3000);
    } catch (err: any) {
      // Error is handled in useEffect
    }
  };

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { label: "One number", met: /[0-9]/.test(formData.password) },
  ];

  return (
    <div className="relative flex justify-center items-center bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 px-4 py-12 min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="top-20 left-10 absolute bg-purple-500 opacity-20 blur-xl rounded-full w-72 h-72 mix-blend-multiply filter"
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
          className="right-10 bottom-20 absolute bg-blue-500 opacity-20 blur-xl rounded-full w-96 h-96 mix-blend-multiply filter"
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

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full w-1 h-1"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="z-10 relative w-full max-w-6xl">
        <div className="items-center gap-8 grid lg:grid-cols-2">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block text-white"
          >
            <Link href="/home">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 mb-8 cursor-pointer"
              >
                <div className="flex justify-center items-center bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg rounded-xl w-14 h-14">
                  <span className="font-bold text-2xl">H</span>
                </div>
                <span className="font-bold text-3xl">HubMicro Pro</span>
              </motion.div>
            </Link>

            <h1 className="mb-6 font-bold text-5xl md:text-6xl leading-tight">
              Join Our
              <br />
              <span className="bg-clip-text bg-gradient-to-r from-purple-300 to-blue-300 text-transparent">
                Digital Revolution
              </span>
            </h1>

            <p className="mb-8 text-purple-100 text-xl leading-relaxed">
              Create your account and unlock access to cutting-edge digital
              solutions, AI-powered tools, and expert support.
            </p>

            <div className="space-y-4">
              {[
                "🚀 Access to premium features",
                "💡 AI-powered insights",
                "🔒 Enterprise-grade security",
                "🎯 Dedicated support team",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="bg-purple-400 rounded-full w-2 h-2" />
                  <span className="text-lg">{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/10 shadow-2xl backdrop-blur-lg p-8 md:p-10 border border-white/20 rounded-3xl">
              <div className="mb-8 text-center">
                <h2 className="mb-2 font-bold text-white text-3xl md:text-4xl">
                  Create Account
                </h2>
                <p className="text-purple-200">
                  Fill in your details to get started
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 font-semibold text-white text-sm">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                      <User className="w-5 h-5 text-purple-300" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="bg-white/10 py-3 pr-4 pl-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-white transition-all placeholder-purple-200"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 font-semibold text-white text-sm">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                      <Mail className="w-5 h-5 text-purple-300" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/10 py-3 pr-4 pl-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-white transition-all placeholder-purple-200"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone & occupation */}
                <div className="gap-4 grid md:grid-cols-2">
                  <div>
                    <label className="block mb-2 font-semibold text-white text-sm">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                        <Phone className="w-5 h-5 text-purple-300" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-white/10 py-3 pr-4 pl-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-white transition-all placeholder-purple-200"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-white text-sm">
                      occupation
                    </label>
                    <div className="relative">
                      <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                        <Building className="w-5 h-5 text-purple-300" />
                      </div>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className="bg-white/10 py-3 pr-4 pl-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-white transition-all placeholder-purple-200"
                        placeholder="Your occupation"
                      />
                    </div>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block mb-2 font-semibold text-white text-sm">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                      <Lock className="w-5 h-5 text-purple-300" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="bg-white/10 py-3 pr-12 pl-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-white transition-all placeholder-purple-200"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="right-0 absolute inset-y-0 flex items-center pr-4"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-purple-300" />
                      ) : (
                        <Eye className="w-5 h-5 text-purple-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 font-semibold text-white text-sm">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="left-0 absolute inset-y-0 flex items-center pl-4 pointer-events-none">
                      <Lock className="w-5 h-5 text-purple-300" />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="bg-white/10 py-3 pr-12 pl-12 border border-white/20 focus:border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 w-full text-white transition-all placeholder-purple-200"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="right-0 absolute inset-y-0 flex items-center pr-4"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5 text-purple-300" />
                      ) : (
                        <Eye className="w-5 h-5 text-purple-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-2 bg-white/5 p-4 rounded-xl"
                  >
                    <p className="mb-2 font-semibold text-white text-sm">
                      Password must contain:
                    </p>
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            req.met ? "bg-green-500" : "bg-white/20"
                          }`}
                        >
                          {req.met && <Check className="w-3 h-3 text-white" />}
                        </div>
                        <span
                          className={`text-sm ${
                            req.met ? "text-green-300" : "text-purple-200"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {/* Terms Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    required
                    className="bg-white/10 mt-1 border-white/20 rounded focus:ring-purple-500 w-4 h-4 text-purple-600"
                  />
                  <label className="text-purple-200 text-sm">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-white hover:text-purple-300 underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-white hover:text-purple-300 underline"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="group flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg hover:shadow-xl py-4 rounded-xl w-full font-bold text-white text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-purple-200">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-semibold text-white hover:text-purple-300 transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
