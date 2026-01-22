import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: {
    id: 1,
    name: 'Admin',
    email: 'admin@example.com',
  },
  isAuthenticated: true,
};

const authSlice = createSlice({
  name: 'auth',
initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
      // User is already set in initial state
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;