import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "../localStorage";

const SIGNUPERROR_STATE_KEY = "signuperror";
const persistedSignUpError = loadState(SIGNUPERROR_STATE_KEY);

export const signuperrorSlice = createSlice({
  name: "signuperror",
  initialState: persistedSignUpError,
  reducers: {
    setSignUpError: (state, action) => action.payload,
  },
});

export const { setSignUpError } = signuperrorSlice.actions;

export const selectSignUpError = (state) => state.signuperror;

export default signuperrorSlice.reducer;
