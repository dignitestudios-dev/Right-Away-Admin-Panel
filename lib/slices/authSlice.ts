// lib/slices/authSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../api/axios";

interface Admin {
  id: number;
  name: string;
  email: string;
  token?: string; // optional token from API
}

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  otpSent: boolean; // for forgot password
}

const initialState: AuthState = {
  admin: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  otpSent: false, // for forgot password
};

// Async thunk for login
export const loginUser = createAsyncThunk<
  Admin, // return type on success
  { email: string; password: string; role: string }, // payload type
  { rejectValue: string } // reject type
>("auth/loginUser", async (payload, { rejectWithValue }) => {
  try {
    const res = await API.post(`/auth/signIn`, payload);
    const data = res?.data?.data
    localStorage.setItem("authToken", data.token)
    return {
      id: data.admin._id,
      name: data.admin.name,
      email: data.admin.email,
      token: data.token,
    };
  } catch (err: any) {
    console.log(err, "error--->")
    return rejectWithValue(err.response?.data?.message || "Something went wrong");
  }
});


// ✅ Logout thunk
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await API.post(
        `/auth/logout`,
      );
    } catch (err: any) {
      return rejectWithValue(err.message || "Logout failed");
    }
  }
);
// Resend OTP
export const resendOTP = createAsyncThunk<void, { email: string; role: string }, { rejectValue: string }>(
  "auth/resendOTP",
  async (payload, { rejectWithValue }) => {
    try {

      await API.post("/auth/resendLoginOTP", payload);
    } catch (err: any) {
      return rejectWithValue(err.message || "Resend OTP failed");
    }
  }
);

// Verify OTP
export const verifyOTP = createAsyncThunk<void, { email: string; otp: string; role: string }, { rejectValue: string }>(
  "auth/verifyOTP",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await API.post("/auth/verifyOTP", payload);
      const data = res?.data?.data
      localStorage.setItem("authToken", data.token)
    } catch (err: any) {
      return rejectWithValue(err.message || "OTP verification failed");
    }
  }
);

// Reset password
export const resetPassword = createAsyncThunk<void, { password: string }, { rejectValue: string }>(
  "auth/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {

      await API.post("/auth/updatePassword", payload);
    } catch (err: any) {
      return rejectWithValue(err.message || "Reset password failed");
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.admin = null;
      state.error = null;
    },
    resetAuth: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<Admin>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.admin = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.admin = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })
      .addCase(resendOTP.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resendOTP.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Resend OTP failed";
      })
      .addCase(verifyOTP.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(verifyOTP.fulfilled, (state) => { state.loading = false; })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "OTP verification failed";
      })
      .addCase(resetPassword.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(resetPassword.fulfilled, (state) => { state.loading = false; })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Reset password failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
