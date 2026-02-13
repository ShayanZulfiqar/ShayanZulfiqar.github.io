"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyPasswordResetOTP, resendPasswordResetOTP } from "@/store/slices/authSlice";
import AlertDialog from "@/utils/AlertDialog";

const VerifyPasswordOtpPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const { loading, tempEmail } = useAppSelector((state) => state.auth);
  const email = emailParam || tempEmail || "your email";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      AlertDialog("Error!", "Please enter complete OTP", "error", 3000, false, false);
      return;
    }

    try {
      const result = await dispatch(verifyPasswordResetOTP({
        email: email as string,
        otp: otpValue,
      })).unwrap();

      AlertDialog(
        "Success!",
        result?.message || "OTP verified. You can now reset your password.",
        "success",
        2000,
        false,
        false
      );

      setTimeout(() => {
        router.push(`/auth/reset-password?email=${email}`);
      }, 2000);
    } catch (error: any) {
      const errorMsg = error?.message || error || "Verification failed";
      AlertDialog("Error!", errorMsg, "error", 3000, false, false);

      if (error?.attemptsRemaining !== undefined) {
        AlertDialog(
          "Warning!",
          `${error?.attemptsRemaining} attempts remaining`,
          "warning",
          3000,
          false,
          false
        );
      }
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      const result = await dispatch(resendPasswordResetOTP(email as string)).unwrap();

      AlertDialog(
        "Success!",
        result?.message || "New OTP sent to your email",
        "success",
        3000,
        false,
        false
      );

      setCountdown(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch (error: any) {
      AlertDialog("Error!", error || "Failed to resend OTP", "error", 3000, false, false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden py-12 px-4">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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

      {/* Animated shield icons */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Shield className="w-8 h-8 text-white/10" />
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
          {/* Icon */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-full mb-4 shadow-lg relative"
            >
              <Shield className="w-10 h-10 text-white" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
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
              Verify Security Code
            </h1>
            <p className="text-purple-100 mb-2">
              We've sent a verification code to
            </p>
            <p className="text-white font-semibold">{email}</p>
          </div>

          {/* Security Info Banner */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 bg-indigo-500/20 border border-indigo-400/30 rounded-xl p-4"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-indigo-300 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-1">
                  Security First
                </p>
                <p className="text-xs text-purple-200">
                  This code expires in 10 minutes. Don't share it with anyone.
                </p>
              </div>
            </div>
          </motion.div>

          {/* OTP Input */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-white mb-4 text-center">
              Enter 6-Digit Code
            </label>
            <div className="flex gap-2 justify-center" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <motion.input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              ))}
            </div>
          </div>

          {/* Verify Button */}
          <motion.button
            onClick={handleVerify}
            disabled={!isComplete || loading}
            whileHover={{ scale: isComplete && !loading ? 1.02 : 1 }}
            whileTap={{ scale: isComplete && !loading ? 0.98 : 1 }}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group mb-6 ${
              isComplete && !loading
                ? "bg-gradient-to-r from-indigo-600 to-pink-600 text-white hover:shadow-xl"
                : "bg-white/10 text-white/50 cursor-not-allowed"
            }`}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Verify & Continue</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>

          {/* Resend Code */}
          <div className="text-center mb-6">
            {countdown > 0 ? (
              <p className="text-purple-200">
                Didn't receive the code?{" "}
                <span className="font-bold text-white">Resend in {countdown}s</span>
              </p>
            ) : (
              <motion.button
                onClick={handleResend}
                disabled={!canResend || loading}
                whileHover={{ scale: canResend && !loading ? 1.05 : 1 }}
                whileTap={{ scale: canResend && !loading ? 0.95 : 1 }}
                className="text-white font-semibold hover:text-purple-300 transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Resend Code</span>
                  </>
                )}
              </motion.button>
            )}
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-transparent text-purple-200">or</span>
            </div>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <p className="text-purple-200">
              Wrong email?{" "}
              <Link
                href="/auth/forgot-password"
                className="text-white font-semibold hover:text-purple-300 transition-colors"
              >
                Try Again
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Login */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-6"
        >
          <Link
            href="/auth/login"
            className="text-white hover:text-purple-300 transition-colors inline-flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>Back to Sign In</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VerifyPasswordOtpPage;
