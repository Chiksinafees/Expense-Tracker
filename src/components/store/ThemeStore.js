import { createSlice } from "@reduxjs/toolkit";

const themeState = {
  theme: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState: themeState,
  reducers: {
    darkHandler(prevState, action) {
      prevState.theme = document.body.style.background = action.payload;
    },

    lightHandler(prevState, action) {
      prevState.theme = document.body.style.background = action.payload;
    },
  },
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
