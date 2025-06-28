import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productoldSlice';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});

// Infer types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
