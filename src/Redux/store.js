// store.js
import { configureStore } from "@reduxjs/toolkit";
import zoomReducer from "./slice";

export const store = configureStore({
  reducer: {
    zoom: zoomReducer,
    // Add other reducers
  },
});
