import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState } from "../localStorage";
import { getCareTakerBasicInfo } from "./careTakerSlice";

const BASEDAILY_STATE_KEY = "basedaily";
const persistedBaseDaily = loadState(BASEDAILY_STATE_KEY);

export const baseDailySlice = createSlice({
  name: "basedaily",
  initialState: persistedBaseDaily,
  reducers: {
    setBaseDaily: (state, action) => action.payload,
  },
});

export const { setBaseDaily } = baseDailySlice.actions;

export const getBaseDailys = (username) => (dispatch) => {
  fetch(`${API_HOST}/basedailys/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        dispatch(setBaseDaily(result.data));
        saveState(BASEDAILY_STATE_KEY, result.data);
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const addNewBaseDaily = (ftct_username, pet_type, base_price) => (
  dispatch
) => {
  fetch(`${API_HOST}/basedailys`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      ftct_username: ftct_username,
      pet_type: pet_type,
      base_price: base_price,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        //saveState(AVAILABILITY_STATE_KEY, result.data);
        //dispatch(setAvailability(result.data));
        dispatch(getCareTakerBasicInfo(ftct_username));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const selectBaseDaily = (state) => state.basedaily;

export default baseDailySlice.reducer;
