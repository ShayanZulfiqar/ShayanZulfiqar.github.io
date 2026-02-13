"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, ArrowRight, CheckCircle, RefreshCw } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyEmail, resendEmailOTP } from "@/store/slices/authSlice";
import AlertDialog from "@/utils/AlertDialog";

const VerifyEmailPage = () => {
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
      const result = await dispatch(verifyEmail({
        email: email as string,
        otp: otpValue,
      })).unwrap();

      AlertDialog(
        "Success!",
        result?.message || "Email verified successfully. You can now login.",
        "success",
        3000,
        false,
        false
      );

      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
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
      const result = await dispatch(resendEmailOTP(email as string)).unwrap();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900 via-teal-900 to-blue-900 relative overflow-hidden py-12 px-4">
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
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

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-10 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl mb-4 shadow-lg"
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Verify Your Email
            </h2>
            <p className="text-green-200 mb-2">
              We've sent a 6-digit code to
            </p>
            <p className="text-white font-semibold text-lg">{email}</p>
          </div>

          <div className="space-y-6">
            <div className="flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              ))}
            </div>

            <motion.button
              onClick={handleVerify}
              disabled={!isComplete || loading}
              whileHover={{ scale: isComplete && !loading ? 1.02 : 1 }}
              whileTap={{ scale: isComplete && !loading ? 0.98 : 1 }}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Verify Email</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>

            <div className="text-center">
              <p className="text-green-200 mb-3">
                {countdown > 0 ? (
                  <>Resend code in <span className="font-bold">{countdown}s</span></>
                ) : (
                  "Didn't receive the code?"
                )}
              </p>

              <motion.button
                onClick={handleResend}
                disabled={!canResend || loading}
                whileHover={{ scale: canResend && !loading ? 1.05 : 1 }}
                whileTap={{ scale: canResend && !loading ? 0.95 : 1 }}
                className="text-white font-semibold hover:text-green-300 transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Resend OTP
              </motion.button>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-center text-green-200 text-sm">
                Wrong email address?{" "}
                <Link
                  href="/auth/signup"
                  className="text-white font-semibold hover:text-green-300 transition-colors"
                >
                  Go back
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/home"
            className="text-green-200 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmailPage;
