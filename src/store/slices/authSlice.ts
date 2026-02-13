import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "@/services/BaseUrl";

const API_BASE_URL = `${baseUrl}/auth/user`;
const SUPERADMIN_API_URL = `${baseUrl}/auth/user`;

interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
  phoneNumber?: string;
  occupation?: string;
  avatar?: string;
  profileImage?: string;
  isEmailVerified?: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
  otpExpiresAt: number | null;
  resetSessionExpiresAt: number | null;
  tempEmail: string | null;
}

const initialState: AuthState = {
  user: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user") || "null") : null,
  token: typeof window !== 'undefined' ? localStorage.getItem("token") : null,
  refreshToken: typeof window !== 'undefined' ? localStorage.getItem("refreshToken") : null,
  loading: false,
  error: null,
  otpExpiresAt: null,
  resetSessionExpiresAt: null,
  tempEmail: null,
};

// User Signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    occupation: string;
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signup`, userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Verify Email OTP
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-email`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Verification failed");
    }
  }
);

// Resend Email OTP
export const resendEmailOTP = createAsyncThunk(
  "auth/resendEmailOTP",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/resend-email-otp`, { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to resend OTP");
    }
  }
);

// User Login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Super Admin Login
export const superAdminLogin = createAsyncThunk(
  "auth/superAdminLogin",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${SUPERADMIN_API_URL}/login`, credentials);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Forgot Password
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/forgot-password`, { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to send OTP");
    }
  }
);

// Verify Password Reset OTP
export const verifyPasswordResetOTP = createAsyncThunk(
  "auth/verifyPasswordResetOTP",
  async (data: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/verify-password-reset`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Verification failed");
    }
  }
);

// Resend Password Reset OTP
export const resendPasswordResetOTP = createAsyncThunk(
  "auth/resendPasswordResetOTP",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/resend-password-reset-otp`, { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to resend OTP");
    }
  }
);

// Reset Password
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: { email: string; newPassword: string; confirmPassword: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to reset password");
    }
  }
);

// Get User Profile
export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch profile");
    }
  }
);

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const { updateUserProfile: updateProfileService } = await import("@/services/profileService");
      const response = await updateProfileService(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update profile");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.error = null;
      state.otpExpiresAt = null;
      state.resetSessionExpiresAt = null;
      state.tempEmail = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
      }
    },
    updateTokens: (state, action: PayloadAction<{ token: string; refreshToken: string }>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    },
    setTempEmail: (state, action: PayloadAction<string>) => {
      state.tempEmail = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.otpExpiresAt = action.payload.user?.otpExpiresAt || null;
        state.tempEmail = action.payload.user?.email || null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
        state.otpExpiresAt = null;
        state.tempEmail = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Resend Email OTP
    builder
      .addCase(resendEmailOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendEmailOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpExpiresAt = action.payload.otpExpiresAt || null;
      })
      .addCase(resendEmailOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        const token = action.payload.accessToken || action.payload.token;
        state.user = action.payload.user;
        state.token = token;
        state.refreshToken = action.payload.refreshToken;
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          if (token) {
            localStorage.setItem("token", token);
          }
          if (action.payload.refreshToken) {
            localStorage.setItem("refreshToken", action.payload.refreshToken);
          }
        }
      })
      .addCase(login.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.message || action.payload;
        if (action.payload?.requiresEmailVerification) {
          state.tempEmail = action.payload.email;
        }
      });

    // Super Admin Login
    builder
      .addCase(superAdminLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(superAdminLogin.fulfilled, (state, action) => {
        state.loading = false;
        const token = action.payload.accessToken || action.payload.token;
        state.user = action.payload.user;
        state.token = token;
        state.refreshToken = action.payload.refreshToken;
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          if (token) {
            localStorage.setItem("token", token);
          }
          if (action.payload.refreshToken) {
            localStorage.setItem("refreshToken", action.payload.refreshToken);
          }
        }
      })
      .addCase(superAdminLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Forgot Password
    builder
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.otpExpiresAt = action.payload.otpExpiresAt || null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Verify Password Reset OTP
    builder
      .addCase(verifyPasswordResetOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPasswordResetOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.resetSessionExpiresAt = action.payload.sessionExpiresAt || null;
      })
      .addCase(verifyPasswordResetOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Resend Password Reset OTP
    builder
      .addCase(resendPasswordResetOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendPasswordResetOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.otpExpiresAt = action.payload.otpExpiresAt || null;
      })
      .addCase(resendPasswordResetOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Reset Password
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.tempEmail = null;
        state.resetSessionExpiresAt = null;
        state.otpExpiresAt = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Get Profile
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update User Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        if (typeof window !== 'undefined') {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, updateTokens, setTempEmail, clearError } = authSlice.actions;
export default authSlice.reducer;
