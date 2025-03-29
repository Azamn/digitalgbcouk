import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";

export interface GlobalState {
  isAuthLoading: boolean;
}

const initialState: GlobalState = {
  isAuthLoading: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsAuthLoading: (state) => {
      state.isAuthLoading = !state.isAuthLoading;
    },
  },
});

export const { setIsAuthLoading } = globalSlice.actions;
