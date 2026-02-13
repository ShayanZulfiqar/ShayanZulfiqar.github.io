import { post } from "./ApiService";

/**
 * Login API call
 * @param {Object} credentials - { email, password }
 * @returns {Promise} Response with token and user data
 */
export const login = async (credentials) => {
  try {
    const response = await post("/auth/login", credentials);
    return response;
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

/**
 * Logout - Clear authentication data
 */
export const logout = () => {
  // Clear localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Clear sessionStorage (if any)
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  console.log("🔓 User logged out successfully");
};

/**
 * Check if user is authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

/**
 * Get current user from localStorage
 * @returns {Object|null}
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

/**
 * Get current token from localStorage
 * @returns {string|null}
 */
export const getAuthToken = () => {
  return localStorage.getItem("token");
};

export default {
  login,
  logout,
  isAuthenticated,
  getCurrentUser,
  getAuthToken,
};
