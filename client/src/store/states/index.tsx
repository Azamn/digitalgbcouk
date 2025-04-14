import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GlobalState {
  isAuthLoading: boolean;
  view: "GRID" | "LIST";
}

const initialState: GlobalState = {
  isAuthLoading: false,
  view: "LIST",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsAuthLoading: (state) => {
      state.isAuthLoading = !state.isAuthLoading;
    },
    setView: (state, action: PayloadAction<"GRID" | "LIST">) => {
      state.view = action.payload;
    },
  },
});

export const { setIsAuthLoading, setView } = globalSlice.actions;
