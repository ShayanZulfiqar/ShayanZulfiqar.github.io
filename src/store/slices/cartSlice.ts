import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartState } from "@/types/cart";
import { Product } from "@/types/shop";

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        product: Product;
        quantity?: number;
        selectedSize?: string;
        selectedColor?: string;
        selectedVariant?: string;
      }>
    ) => {
      const {
        product,
        quantity = 1,
        selectedSize,
        selectedColor,
        selectedVariant,
      } = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.product._id === product._id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor &&
          item.selectedVariant === selectedVariant
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          product,
          quantity,
          selectedSize,
          selectedColor,
          selectedVariant,
        });
      }

      // Recalculate totals
      state.itemCount = state.items.reduce(
        (count, item) => count + item.quantity,
        0
      );
      state.total = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    removeFromCart: (
      state,
      action: PayloadAction<{
        productId: string;
        selectedSize?: string;
        selectedColor?: string;
        selectedVariant?: string;
      }>
    ) => {
      const { productId, selectedSize, selectedColor, selectedVariant } =
        action.payload;

      state.items = state.items.filter(
        (item) =>
          !(
            item.product._id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor &&
            item.selectedVariant === selectedVariant
          )
      );

      // Recalculate totals
      state.itemCount = state.items.reduce(
        (count, item) => count + item.quantity,
        0
      );
      state.total = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        selectedSize?: string;
        selectedColor?: string;
        selectedVariant?: string;
      }>
    ) => {
      const {
        productId,
        quantity,
        selectedSize,
        selectedColor,
        selectedVariant,
      } = action.payload;

      const item = state.items.find(
        (item) =>
          item.product._id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor &&
          item.selectedVariant === selectedVariant
      );

      if (item) {
        item.quantity = Math.max(1, quantity);

        // Recalculate totals
        state.itemCount = state.items.reduce(
          (count, item) => count + item.quantity,
          0
        );
        state.total = state.items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
