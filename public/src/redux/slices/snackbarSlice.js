import { createSlice } from "@reduxjs/toolkit";

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: "",
  reducers: {
    setSnackbar: (state, action) => action.payload,
  },
});

export const { setSnackbar } = snackbarSlice.actions;

export const setMessage = (message) => (dispatch) => {
  dispatch(setSnackbar(message));
  setTimeout(() => {
    dispatch(setSnackbar(""));
  }, 1000);
};

export const selectSnackbar = (state) => state.snackbar;

export default snackbarSlice.reducer;
