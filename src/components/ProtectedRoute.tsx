"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const router = useRouter();
  const { user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!token || !user) {
      router.push("/auth/login");
      return;
    }

    // Check role if required
    if (requiredRole && user.role !== requiredRole) {
      if (user.role === "superAdmin") {
        router.push("/superadmin/dashboard");
      } else {
        router.push("/home");
      }
    }
  }, [token, user, requiredRole, router]);

  // Show loading or nothing while checking auth
  if (!token || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Check role mismatch
  if (requiredRole && user.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
