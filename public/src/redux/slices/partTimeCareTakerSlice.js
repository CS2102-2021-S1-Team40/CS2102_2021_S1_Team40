import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState } from "../localStorage";
import { setCareTaker } from "./careTakerSlice";
import { setSignUpError } from "./signUpErrorSlice";

const PTCARETAKER_STATE_KEY = "ptcaretaker";
const persistedPTCareTaker = loadState(PTCARETAKER_STATE_KEY);

export const ptcareTakerSlice = createSlice({
  name: "ptcaretaker",
  initialState: persistedPTCareTaker,
  reducers: {
    setPTCareTaker: (state, action) => action.payload,
  },
});

export const { setPTCareTaker } = ptcareTakerSlice.actions;

export const getPTCareTakerFromDb = (username) => (dispatch) => {
  fetch(`${API_HOST}/parttime_caretakers/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(PTCARETAKER_STATE_KEY, result.data);
        dispatch(setPTCareTaker(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const signupPTCareTaker = (username) => (dispatch) => {
  fetch(`${API_HOST}/parttime_caretakers`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        dispatch(setCareTaker(result.data));
        saveState("caretaker", result.data);
      } else {
        saveState("signuperror", result.message);
        dispatch(setSignUpError(JSON.stringify(result.message)));
      }
    });
  //.catch((err) => dispatch(setError(JSON.stringify(err))));
};

export const selectPTCareTaker = (state) => state.ptcaretaker;

export default ptcareTakerSlice.reducer;
