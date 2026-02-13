import axios from "axios";
import { baseUrl } from "./BaseUrl";
import AlertDialog from "../utils/Alert";
import { logout as logoutAction, updateTokens } from "../store/slices/authSlice";
import { REFRESH_TOKEN, LOGOUT } from "./ApiRoutes";

let _store = null;

export const injectStore = (store) => {
  _store = store;
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add request interceptor for debugging and token injection
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(`🔵 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for handling 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const isLoginRequest = originalRequest.url?.includes('/auth/login') ||
        originalRequest.url?.includes('/login');

      if (isLoginRequest) {
        return Promise.reject(error);
      }

      if (error.response.data?.code === 'TOKEN_EXPIRED') {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          handleLogout();
          return Promise.reject(error);
        }

        try {
          // Use plain axios for refresh to avoid interceptor loop
          const response = await axios.post(REFRESH_TOKEN, { refreshToken });
          const token = response.data.accessToken || response.data.token;
          const newRefreshToken = response.data.refreshToken;

          _store?.dispatch(updateTokens({ token, refreshToken: newRefreshToken }));
          processQueue(null, token);

          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);
          handleLogout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      handleLogout();
    }
    return Promise.reject(error);
  }
);

const handleLogout = () => {
  _store?.dispatch(logoutAction());
  if (typeof window !== 'undefined') {
    window.location.href = '/auth/login';
  }
};

// Generic API service function
export const apiService = async (
  url,
  method,
  body = null,
  token = null,
  isMultipart = false
) => {
  let attempt = 0;
  const maxRetries = 1;

  // Better token handling - fallback to localStorage if no token provided
  const authToken = token || localStorage.getItem("token") || sessionStorage.getItem("token");

  // Debug: Log token availability
  if (process.env.NODE_ENV === 'development') {
    if (!authToken) {
      console.warn('⚠️ No auth token available for request:', url);
    }
  }


  while (attempt <= maxRetries) {
    try {
      const config = {
        method,
        url,
        headers: {
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        },
      };

      // CRITICAL FIX: Don't set Content-Type for multipart - let axios handle it
      if (isMultipart) {
        // Don't set Content-Type for FormData - axios will set it with proper boundary
      } else if (body && !(body instanceof FormData)) {
        config.headers["Content-Type"] = "application/json";
      }

      if (body) {
        config.data = body;
      }

      const response = await axiosInstance(config);
      return response.data;
    } catch (error) {

      if (attempt < maxRetries) {
        attempt++;
        continue;
      } else {
        // Don't show alert for authentication errors - let components handle them
        if (error.response?.status === 401 || error.response?.status === 403) {
          throw error;
        }

        handleApiError(error);
        throw error;
      }
    }
  }
};

// Helper function to handle API errors
const handleApiError = (error) => {

  if (error.response) {
    // Server responded with error status
    const errorMessage =
      error.response.data?.Message ||
      error.response.data?.message ||
      error.response.data?.detail ||
      error.response.statusText ||
      "Server error occurred";


    // Don't show alert for auth errors - let components handle them
    if (error.response.status !== 401 && error.response.status !== 403) {
      AlertDialog("", errorMessage, "error", 1500);
    }

    // Create a proper error object for Redux
    const apiError = new Error(errorMessage);
    apiError.response = error.response;
    throw apiError;
  } else if (error.request) {
    // Request was made but no response received
    const errorMessage = "No response received from the server";
    AlertDialog("", errorMessage, "error", 1500);
    const apiError = new Error(errorMessage);
    apiError.request = error.request;
    throw apiError;
  } else {
    // Something else happened
    const errorMessage = error.message || "Something went wrong";
    AlertDialog("", errorMessage, "error", 1500);
    throw new Error(errorMessage);
  }
};

/**
 * Standard CRUD operations
 */
export const get = (url, options = {}) => {
  // Support both old (token) and new (options with headers) patterns
  const token = typeof options === 'string' ? options :
    options.headers?.Authorization?.replace('Bearer ', '') ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");
  return apiService(url, "GET", null, token);
};

export const post = (url, body, options = {}) => {
  // Support both old (token) and new (options with headers) patterns
  const token = typeof options === 'string' ? options :
    options.headers?.Authorization?.replace('Bearer ', '') ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");
  const isMultipart = options.isMultipart || false;
  // Auto-detect if body is FormData
  const isFormData = body instanceof FormData;
  return apiService(url, "POST", body, token, isFormData || isMultipart);
};

export const put = (url, body, options = {}) => {
  // Support both old (token) and new (options with headers) patterns
  const token = typeof options === 'string' ? options :
    options.headers?.Authorization?.replace('Bearer ', '') ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");
  const isMultipart = options.isMultipart || false;
  // Auto-detect if body is FormData
  const isFormData = body instanceof FormData;
  return apiService(url, "PUT", body, token, isFormData || isMultipart);
};

export const patch = (url, body, options = {}) => {
  // Support both old (token) and new (options with headers) patterns
  const token = typeof options === 'string' ? options :
    options.headers?.Authorization?.replace('Bearer ', '') ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");
  const isMultipart = options.isMultipart || false;
  // Auto-detect if body is FormData
  const isFormData = body instanceof FormData;
  return apiService(url, "PATCH", body, token, isFormData || isMultipart);
};

export const del = (url, options = {}) => {
  // Support both old (token) and new (options with headers) patterns
  const token = typeof options === 'string' ? options :
    options.headers?.Authorization?.replace('Bearer ', '') ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");
  return apiService(url, "DELETE", null, token);
};

// Alias for delete (since 'delete' is a reserved keyword)
export const deleteRequest = del;

/**
 * Specific multipart form data operations
 */
export const uploadFile = (url, _formData, token) => {
  if (!(_formData instanceof FormData)) {
    throw new Error("uploadFile requires FormData object");
  }
  return apiService(url, "POST", _formData, token, true);
};

export const uploadFiles = (url, _formData, token) => {
  if (!(_formData instanceof FormData)) {
    throw new Error("uploadFiles requires FormData object");
  }
  return apiService(url, "POST", _formData, token, true);
};

export const createWithMultipart = (url, _formData, token) => {
  if (!(_formData instanceof FormData)) {
    throw new Error("createWithMultipart requires FormData object");
  }
  return apiService(url, "POST", _formData, token, true);
};

export const updateWithMultipart = (url, _formData, token) => {
  if (!(_formData instanceof FormData)) {
    throw new Error("updateWithMultipart requires FormData object");
  }
  return apiService(url, "PUT", _formData, token, true);
};

/**
 * Utility functions
 */
export const createFormData = (data) => {
  const _formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        // Handle arrays (like multiple files)
        value.forEach((item, index) => {
          if (item instanceof File) {
            _formData.append(key, item);
          } else {
            _formData.append(`${key}[${index}]`, item);
          }
        });
      } else if (value instanceof File) {
        _formData.append(key, value);
      } else {
        _formData.append(key, value);
      }
    }
  });

  return _formData;
};

export const logFormData = (_formData) => {
  // FormData logging removed for production
};

// Configuration for different types of requests
export const apiConfig = {
  defaultTimeout: 30000,
  uploadTimeout: 120000, // 2 minutes for file uploads
  retryAttempts: 1,

  // Headers for different request types
  headers: {
    json: {
      "Content-Type": "application/json",
    },
    // Don't set Content-Type for multipart - axios handles it
    multipart: {},
  },
};

/**
 * Utility function to check if token exists
 */
export const hasValidToken = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) {
    console.warn('⚠️ No token found in localStorage or sessionStorage');
    return false;
  }
  console.log('✅ Token found');
  return true;
};

/**
 * Utility function to get current token
 */
export const getToken = () => {
  return localStorage.getItem("token") || sessionStorage.getItem("token");
};

/**
 * Utility function to manually clear authentication
 */
export const logout = async () => {
  const token = localStorage.getItem("token");
  try {
    if (token) {
      await axios.post(LOGOUT, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  } catch (error) {
    console.error("Logout API failed", error);
  } finally {
    handleLogout();
  }
};

export const clearAuth = () => {
  handleLogout();
  console.log('🔓 Authentication cleared');
};

// Export default with all methods
export default {
  get,
  post,
  put,
  patch,
  del,
  deleteRequest,
  uploadFile,
  uploadFiles,
  createWithMultipart,
  updateWithMultipart,
  createFormData,
  logFormData,
  apiService,
  apiConfig,
  hasValidToken,
  getToken,
  clearAuth,
  logout,
  injectStore,
};
