"use client";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: object | null;
  allJobs: any;
  allApplications: any;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: UserState = {
  user: null,
  allJobs: null,
  allApplications: null,
  loading: false,
  error: null,
};

export const fetchData: any = createAsyncThunk(
  "fetcData",
  async (_, { rejectWithValue }) => {
    try {
      const userRes = await axios.get(`/pages/api/decodedToken`);
      const user = userRes?.data?.user;
      const allAppliedJobsResponse = await axios.get(
        `/pages/api/user/applications/${user?.email}`
      );
      const allApplications = allAppliedJobsResponse?.data?.allApplications;

      const reqAllAppliedJobs = await axios.get(
        `/pages/api/allJobs`
      );
      const allAppliedJobs = reqAllAppliedJobs?.data?.allJobs;
      return { user, allApplications, allAppliedJobs };
    } catch (error: any) {
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
        state.user = action.payload.user;
        state.allJobs = action.payload.allAppliedJobs;

      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { addCart, removedCard } = slice.actions;
export default slice.reducer;
