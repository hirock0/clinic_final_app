"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: object | null;
  carts: any;
  employee: any;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: UserState = {
  user: null,
  employee: null,
  carts: [],
  loading: false,
  error: null,
};

export const fetchData: any = createAsyncThunk(
  "fetcData",
  async (_, { rejectWithValue }) => {
    try {
      const employeeResponse = await axios.get(
        "/pages/api/employee/decodedEmployee"
      );
      const employee = employeeResponse?.data?.employee;
      const userResponse = await axios.get("/pages/api/user/decodedUser");
      const user = userResponse?.data?.user;
      return { employee, user };
    } catch (error) {
      return rejectWithValue("Failed to fetch users");
    }
  }
);

const slice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    addCart: (state: any, action) => {
      const { payload } = action;
      state.carts.push(payload);
    },
    removedCard: () => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.employee = action.payload.employee;
        state.user = action.payload.user;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { addCart, removedCard } = slice.actions;
export default slice.reducer;
