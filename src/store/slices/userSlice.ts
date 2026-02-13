import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, Address } from "@/types/cart";

const initialState: UserState = {
  isAuthenticated: true, // Mock authenticated user
  user: {
    id: "user-1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "",
    phone: "+1 (234) 567-890",
    addresses: [
      {
        id: "addr-1",
        type: "home",
        name: "John Doe",
        phone: "+1 (234) 567-890",
        addressLine1: "123 Main Street",
        addressLine2: "Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States",
        isDefault: true,
      },
      {
        id: "addr-2",
        type: "work",
        name: "John Doe",
        phone: "+1 (234) 567-890",
        addressLine1: "456 Business Ave",
        city: "New York",
        state: "NY",
        zipCode: "10002",
        country: "United States",
        isDefault: false,
      },
    ],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        email: string;
        avatar?: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = {
        ...action.payload,
        phone: "",
        addresses: [],
      };
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    updateProfile: (
      state,
      action: PayloadAction<{
        name?: string;
        email?: string;
        phone?: string;
        avatar?: string;
      }>
    ) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    addAddress: (state, action: PayloadAction<Address>) => {
      if (state.user) {
        // If this is the first address or marked as default, set as default
        if (
          action.payload.isDefault ||
          state.user.addresses.length === 0
        ) {
          state.user.addresses = state.user.addresses.map((addr) => ({
            ...addr,
            isDefault: false,
          }));
        }
        state.user.addresses.push(action.payload);
      }
    },

    updateAddress: (state, action: PayloadAction<Address>) => {
      if (state.user) {
        const index = state.user.addresses.findIndex(
          (addr) => addr.id === action.payload.id
        );
        if (index >= 0) {
          // If marking as default, unset other defaults
          if (action.payload.isDefault) {
            state.user.addresses = state.user.addresses.map((addr) => ({
              ...addr,
              isDefault: false,
            }));
          }
          state.user.addresses[index] = action.payload;
        }
      }
    },

    deleteAddress: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.addresses = state.user.addresses.filter(
          (addr) => addr.id !== action.payload
        );
      }
    },

    setDefaultAddress: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.addresses = state.user.addresses.map((addr) => ({
          ...addr,
          isDefault: addr.id === action.payload,
        }));
      }
    },
  },
});

export const {
  login,
  logout,
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = userSlice.actions;
export default userSlice.reducer;
