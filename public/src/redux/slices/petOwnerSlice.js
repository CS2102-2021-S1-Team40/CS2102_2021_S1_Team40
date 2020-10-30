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
    setCreditCard: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

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

export const addCreditCard = (
  username,
  card_num,
  card_expiry,
  card_cvv,
  cardholder_name
) => (dispatch) => {
  fetch(`${API_HOST}/petowners/${username}/creditcard`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      card_num: card_num,
      card_expiry: card_expiry,
      card_cvv: card_cvv,
      cardholder_name: cardholder_name
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(PETOWNER_STATE_KEY, result.data);
        dispatch(setCreditCard(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const { setPetOwner, setCreditCard } = petOwnerSlice.actions;

export const selectPetOwner = (state) => state.petowner;

export default petOwnerSlice.reducer;
