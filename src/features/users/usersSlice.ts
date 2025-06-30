import { createSlice, createAsyncThunk, isPending, isRejected } from '@reduxjs/toolkit';
import * as api from './userApi';

// 1. User interface
export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
}

// 2. Initial State interface
interface UserState {
  items: User[];
  loading: boolean;
  error: string | null;
}

// 3. Initial state
const initialState: UserState = {
  items: [],
  loading: false,
  error: null,
};

// 4. Async Thunks
export const fetchUsers = createAsyncThunk('users/fetch', api.getUsers);
export const addUser = createAsyncThunk('users/add', api.createUser);
export const updateUser = createAsyncThunk('users/update', api.editUser);
export const deleteUser = createAsyncThunk('users/delete', api.deleteUser);

// 5. Slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(user => user.id !== action.payload);
      })

      // Matchers for loading and error
      .addMatcher(
        isPending(fetchUsers, addUser, updateUser, deleteUser),
        state => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(fetchUsers, addUser, updateUser, deleteUser),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Something went wrong';
        }
      );
  },
});

// 6. Export reducer
export default userSlice.reducer;
