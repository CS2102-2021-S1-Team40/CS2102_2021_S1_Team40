import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";
import { setUser } from "./userSlice";
import { setSignUpError } from "./signUpErrorSlice";

const PETOWNER_STATE_KEY = "petowner";
const persistedPetOwner = loadState(PETOWNER_STATE_KEY);

export const petOwnerSlice = createSlice({
  name: "petowner",
  initialState: persistedPetOwner,
  reducers: {
    setPetOwner: (state, action) => action.payload,
  },
});

export const { setPetOwner } = petOwnerSlice.actions;

export const getPetOwnerFromDb = (username, password) => (dispatch) => {
  fetch(`${API_HOST}/petowners/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ password: password }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(PETOWNER_STATE_KEY, result.data);
        dispatch(setUser(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const signoutPetOwner = () => (dispatch) => {
  removeState("user");
  dispatch(setUser(null));
};

export const signupPetOwner = (username, password, role) => (dispatch) => {
  fetch(`${API_HOST}/petowners`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
      role: role,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState("user", result.data);
        dispatch(setUser(result.data));
      } else {
        saveState("signuperror", result.message);
        console.log(result.message);
        dispatch(setSignUpError(JSON.stringify(result.message)));
      }
    });
};

export const selectPetOwner = (state) => state.petowner;

export default petOwnerSlice.reducer;
