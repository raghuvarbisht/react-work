import { createSlice, createAsyncThunk , isPending, isRejected} from '@reduxjs/toolkit';
import * as api from './productApi';

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
}

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchProducts = createAsyncThunk('products/fetch', api.getProducts);
export const addProduct = createAsyncThunk('products/add', api.createProduct);
export const updateProduct = createAsyncThunk('products/update', api.editProduct);
export const deleteProduct = createAsyncThunk('products/delete', api.deleteProduct);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p.id !== action.payload);
      })      // Handle all pending actions
      .addMatcher(isPending(fetchProducts, addProduct, updateProduct, deleteProduct), state => {
        state.loading = true;
        state.error = null;
      })      // Handle all rejected actions
      .addMatcher(isRejected(fetchProducts, addProduct, updateProduct, deleteProduct), (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});
export default productSlice.reducer;
