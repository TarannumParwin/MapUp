// zoomSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mapZoom: 5, // Initial zoom level
};

const zoomSlice = createSlice({
  name: "zoom",
  initialState,
  reducers: {
    zoomIn: (state) => {
      state.mapZoom += 1;
    },
    zoomOut: (state) => {
      state.mapZoom -= 1;
    },
  },
});

export const { zoomIn, zoomOut } = zoomSlice.actions;
export const selectMapZoom = (state) => state.zoom.mapZoom;
export default zoomSlice.reducer;
