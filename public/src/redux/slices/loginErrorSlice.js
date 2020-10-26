import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage";

const LOGINERROR_STATE_KEY = "loginerror";
const persistedLoginError = loadState(LOGINERROR_STATE_KEY);

export const loginerrorSlice = createSlice({
  name: "loginerror",
  initialState: persistedLoginError,
  reducers: {
    setLoginError: (state, action) => action.payload,
  },
});

export const { setLoginError } = loginerrorSlice.actions;

export const selectLoginError = (state) => state.loginerror;

export default loginerrorSlice.reducer;
