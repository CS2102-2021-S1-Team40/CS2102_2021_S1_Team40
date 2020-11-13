import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";
import { setUser } from "./userSlice";
import { setSignUpError } from "./signUpErrorSlice";
import { setMessage } from "./snackbarSlice";

const PETOWNER_STATE_KEY = "petowner";
const persistedPetOwner = loadState(PETOWNER_STATE_KEY);

export const petOwnerSlice = createSlice({
  name: "petowner",
  initialState: persistedPetOwner,
  reducers: {
    setPetOwner: (state, action) => {
      return { ...state, ...action.payload };
    },
    setBasicInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
    setCreditCard: (state, action) => {
      return { ...state, ...action.payload };
    },
    setCheckCreditCard: (state, action) => action.payload,
  },
});

export const getCreditCard = (username) => (dispatch) => {
  fetch(`${API_HOST}/petowners/${username}/creditcard`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(PETOWNER_STATE_KEY, result.data);
        dispatch(setCheckCreditCard(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

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
        removeState("user");
        dispatch(setUser(null));
        saveState("user", result.data);
        dispatch(setUser(result.data));
        dispatch(setMessage("Successfully signed up as Pet Owner!"));
      } else {
        removeState("signuperror");
        dispatch(setSignUpError(null));
        saveState("signuperror", result.message);
        dispatch(setSignUpError(JSON.stringify(result.message)));
      }
    });
};

export const getPetOwnerBasicInfo = (username) => (dispatch) => {
  fetch(`${API_HOST}/petowners/${username}`, {
    headers: {
      "Content-Type": "application/json",
      method: "GET",
    },
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        dispatch(setBasicInfo(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) =>
      alert("Error caught at petOwnerSlice getPetOwnerBasicInfo() - " + err)
    );
};

export const updateCreditCard = (
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
    method: "PUT",
    body: JSON.stringify({
      username: username,
      card_num: card_num,
      card_expiry: card_expiry,
      card_cvv: card_cvv,
      cardholder_name: cardholder_name,
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

export const deleteCreditCard = (username) => (dispatch) => {
  fetch(`${API_HOST}/petowners/${username}/deletecreditcard`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      username: username,
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

export const {
  setPetOwner,
  setCreditCard,
  setBasicInfo,
  setCheckCreditCard,
} = petOwnerSlice.actions;

export const selectPetOwner = (state) => state.petowner;

export default petOwnerSlice.reducer;
