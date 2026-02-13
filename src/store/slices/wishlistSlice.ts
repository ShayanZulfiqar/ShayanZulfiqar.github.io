import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { WishlistState } from "@/types/cart";
import { Product } from "@/types/shop";
import {
  getWishlist,
  addToWishlistApi,
  removeFromWishlistApi,
  clearWishlistApi,
} from "@/services/wishlistService";

// Extended state to include loading status
interface ExtendedWishlistState extends WishlistState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ExtendedWishlistState = {
  items: [],
  status: "idle",
  error: null,
};

// Async Thunks

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlist();
      console.log("Wishlist API Response:", response); // Debugging

      // Handle different possible response structures
      let products = [];
      if (response.data && Array.isArray(response.data.products)) {
        // Map over the products array and extract the nested product object
        // The API returns [{ product: { ...productDetails }, _id: "..." }]
        products = response.data.products.map((item: any) => ({
          ...item.product,
          _id: item.product._id // Ensure _id is at the top level
        }));
      } else if (Array.isArray(response.products)) {
        products = response.products;
      } else if (Array.isArray(response.data)) {
        products = response.data;
      } else if (Array.isArray(response)) {
        products = response;
      }

      return products;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch wishlist");
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (product: Product, { rejectWithValue }) => {
    try {
      await addToWishlistApi(product._id);
      return product;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to add to wishlist");
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId: string, { rejectWithValue }) => {
    try {
      await removeFromWishlistApi(productId);
      return productId;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to remove from wishlist");
    }
  }
);

export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",
  async (_, { rejectWithValue }) => {
    try {
      await clearWishlistApi();
      return;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to clear wishlist");
    }
  }
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Keep synchronous toggle if needed for optimistic updates, 
    // but ideally we rely on thunks. 
    // For now, we will not export sync actions that conflict with thunks.
  },
  extraReducers: (builder) => {
    builder
      // Fetch Wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Add to Wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const exists = state.items.find(
          (item) => item._id === action.payload._id
        );
        if (!exists) {
          state.items.push(action.payload);
        }
      })
      // Remove from Wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      // Clear Wishlist
      .addCase(clearWishlist.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default wishlistSlice.reducer;

