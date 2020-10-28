import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";
import { setUser } from "./userSlice";
import { signupFTCareTaker } from "./fullTimeCareTakerSlice";
import { signupPTCareTaker } from "./partTimeCareTakerSlice";
import { signupPetOwner } from "./petOwnerSlice";

import { setSignUpError } from "./signUpErrorSlice";

const CARETAKER_STATE_KEY = "caretaker";
const persistedCareTaker = loadState(CARETAKER_STATE_KEY);

export const careTakerSlice = createSlice({
  name: "caretaker",
  initialState: persistedCareTaker,
  reducers: {
    setCareTaker: (state, action) => {
      return { ...state, ...action.payload };
    },
    setBasicInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const getCaretakers = (
  maximum_price,
  pet_type,
  start_date,
  end_date
) => (dispatch) => {
  fetch(`${API_HOST}/users/find-caretakers`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      maximum_price: maximum_price,
      pet_type: pet_type,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(CARETAKER_STATE_KEY, result.data);
        dispatch(setCareTaker(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const { setCareTaker, setBasicInfo } = careTakerSlice.actions;

export const getCareTakerFromDb = (username) => (dispatch) => {
  fetch(`${API_HOST}/caretakers/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        dispatch(setCareTaker(result.data));
        saveState(CARETAKER_STATE_KEY, result.data);
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const signoutCareTaker = () => (dispatch) => {
  removeState("user");
  dispatch(setUser(null));
};

export const signupCareTaker = (username, password, role, type) => (
  dispatch
) => {
  fetch(`${API_HOST}/caretakers`, {
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
        //console.log(role);
        if (type === "parttime") {
          console.log("parttime caretaker signing up");
          dispatch(signupPTCareTaker(username));
        } else if (type === "fulltime") {
          console.log("fulltime caretaker signing up");
          dispatch(signupFTCareTaker(username));
        } else {
        }

        if (role[0] === "caretaker" && role[1] === "petowner") {
          console.log("signing up as both caretaker and petowner");
          removeState("user");
          dispatch(signupPetOwner(username, password, role));
        } else {
        }
      } else {
        saveState("signuperror", result.message);
        console.log(result.message);
        dispatch(setSignUpError(JSON.stringify(result.message)));
        //throw new Error(result.message);
      }
    });
  //.catch((err) => ;
};

export const getCareTakerBasicInfo = (username) => (dispatch) => {
  fetch(`${API_HOST}/caretakers/${username}`, {
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
    .catch((err) => alert(err));
};

export const selectCareTaker = (state) => state.caretaker;

export default careTakerSlice.reducer;
