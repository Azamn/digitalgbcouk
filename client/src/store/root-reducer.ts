import { combineReducers } from "@reduxjs/toolkit";
import ApiServices from "./middleware";
import { globalSlice } from "./states";

const rootReducer = combineReducers({
  global: globalSlice.reducer,
  [ApiServices.reducerPath]: ApiServices.reducer,
});

export default rootReducer;
