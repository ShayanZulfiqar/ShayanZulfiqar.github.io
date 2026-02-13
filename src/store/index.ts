import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import landingReducer from "./slices/landingSlice";
import shopReducer from "./slices/shopSlice";
import statsReducer from "./slices/statsSlice";

import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    auth: authReducer,
    landing: landingReducer,
    shop: shopReducer,
    stats: statsReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
