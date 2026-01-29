import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboardData, DashboardFilter } from "@/lib/api/dashboard.api";

interface DashboardState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

// 🔥 Async Thunk
export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (filter: DashboardFilter, { rejectWithValue }) => {
    try {
      return await getDashboardData(filter);
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to fetch dashboard"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;
