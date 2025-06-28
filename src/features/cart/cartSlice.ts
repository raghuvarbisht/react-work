import {
  createSlice,
  createAsyncThunk,
  isAnyOf,
} from '@reduxjs/toolkit';
import * as api from './cartApi';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetch', api.getCart);
export const addToCart = createAsyncThunk('cart/add', api.addCartItem);
export const updateCart = createAsyncThunk('cart/update', api.updateCartItem);
export const removeFromCart = createAsyncThunk('cart/remove', api.removeCartItem);

// ✅ New thunk: remove all items
export const removeAllFromCart = createAsyncThunk('cart/removeAll', api.removeAllCartItems);

const cartThunks = [fetchCart, addToCart, updateCart, removeFromCart, removeAllFromCart];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        state.loading = false;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.loading = false;
      })

      // ✅ Case for clearing the cart
      .addCase(removeAllFromCart.fulfilled, (state) => {
        state.items = [];
        state.loading = false;
      })

      // 🔄 Shared loading handler
      .addMatcher(
        isAnyOf(...cartThunks.map(thunk => thunk.pending)),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // ❌ Shared error handler
      .addMatcher(
        isAnyOf(...cartThunks.map(thunk => thunk.rejected)),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Cart request failed';
        }
      );
  },
});

export default cartSlice.reducer;
