import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState, removeState } from "../localStorage";
import { setCareTaker } from "./careTakerSlice";
import { setSignUpError } from "./signUpErrorSlice";

const FTCARETAKER_STATE_KEY = "ftcaretaker";
const persistedFTCareTaker = loadState(FTCARETAKER_STATE_KEY);

export const ftcareTakerSlice = createSlice({
  name: "ftcaretaker",
  initialState: persistedFTCareTaker,
  reducers: {
    setFTCareTaker: (state, action) => action.payload,
  },
});

export const { setFTCareTaker } = ftcareTakerSlice.actions;

export const getFTCareTakerFromDb = (username) => (dispatch) => {
  fetch(`${API_HOST}/fulltime_caretakers/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState("caretaker", result.data);
        dispatch(setCareTaker(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const signupFTCareTaker = (username) => (dispatch) => {
  fetch(`${API_HOST}/fulltime_caretakers`, {
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
        removeState("signuperror");
        dispatch(setSignUpError(null));
        saveState("signuperror", result.message);
        dispatch(setSignUpError(JSON.stringify(result.message)));
      }
    });
  //.catch((err) => dispatch(setError(JSON.stringify(err))));
};

export const selectFTCareTaker = (state) => state.ftcaretaker;

export default ftcareTakerSlice.reducer;
