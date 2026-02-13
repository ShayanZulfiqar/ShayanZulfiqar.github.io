import {
    GET_WISHLIST,
    ADD_TO_WISHLIST,
    REMOVE_FROM_WISHLIST,
    CLEAR_WISHLIST,
} from "./ApiRoutes";
import { get, post, del } from "./ApiService";

/**
 * Get the user's wishlist
 * @returns {Promise<any>}
 */
export const getWishlist = async () => {
    try {
        const response = await get(GET_WISHLIST);
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Add a product to the wishlist
 * @param {string} productId
 * @returns {Promise<any>}
 */
export const addToWishlistApi = async (productId: string) => {
    try {
        const response = await post(ADD_TO_WISHLIST, { productId });
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Remove a product from the wishlist
 * @param {string} productId
 * @returns {Promise<any>}
 */
export const removeFromWishlistApi = async (productId: string) => {
    try {
        const response = await del(REMOVE_FROM_WISHLIST(productId));
        return response;
    } catch (error) {
        throw error;
    }
};

/**
 * Clear the entire wishlist
 * @returns {Promise<any>}
 */
export const clearWishlistApi = async () => {
    try {
        const response = await del(CLEAR_WISHLIST);
        return response;
    } catch (error) {
        throw error;
    }
};

export default {
    getWishlist,
    addToWishlistApi,
    removeFromWishlistApi,
    clearWishlistApi,
};
