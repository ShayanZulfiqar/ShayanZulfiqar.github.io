"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, KeyRound, CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { forgotPassword, setTempEmail } from "@/store/slices/authSlice";
import AlertDialog from "@/utils/AlertDialog";

const ForgotPasswordPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(forgotPassword(email)).unwrap();

      AlertDialog(
        "Success!",
        result?.message || "Password reset OTP sent to your email!",
        "success",
        3000,
        false,
        false
      );

      setIsEmailSent(true);
      dispatch(setTempEmail(email));

      setTimeout(() => {
        router.push(`/auth/verify-password-otp?email=${email}`);
      }, 3000);
    } catch (error: any) {
      AlertDialog("Error!", error || "Failed to send OTP", "error", 3000, false, false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <KeyRound className="w-6 h-6 text-white/20" />
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
          {!isEmailSent ? (
            <>
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl mb-4 shadow-lg"
                >
                  <KeyRound className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  Forgot Password?
                </h2>
                <p className="text-orange-200 leading-relaxed">
                  No worries! Enter your email address and we'll send you an OTP to
                  reset your password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-orange-300" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className="w-full bg-gradient-to-r from-orange-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset OTP</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-8 text-center">
                <Link
                  href="/auth/login"
                  className="text-orange-200 hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <span>← Remember your password?</span>
                  <span className="font-semibold">Sign In</span>
                </Link>
              </div>
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
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-6 shadow-lg"
              >
                <CheckCircle className="w-12 h-12 text-white" />
              </motion.div>

              <h3 className="text-2xl font-bold text-white mb-3">
                OTP Sent Successfully!
              </h3>
              <p className="text-orange-200 mb-6">
                We've sent a verification code to <br />
                <span className="font-semibold text-white">{email}</span>
              </p>

              <div className="flex items-center justify-center gap-2 text-orange-200 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Redirecting to OTP verification...</span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/home"
            className="text-orange-200 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
