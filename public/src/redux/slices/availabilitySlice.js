import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState } from "../localStorage";
import { getCareTakerBasicInfo } from "./careTakerSlice";

const AVAILABILITY_STATE_KEY = "availability";
const persistedAvailability = loadState(AVAILABILITY_STATE_KEY);

export const availabilitySlice = createSlice({
  name: "availability",
  initialState: persistedAvailability,
  reducers: {
    setAvailability: (state, action) => action.payload,
  },
});

export const { setAvailability } = availabilitySlice.actions;

export const getAvailabilities = (username) => (dispatch) => {
  fetch(`${API_HOST}/availabilities/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        dispatch(setAvailability(result.data));

        saveState(AVAILABILITY_STATE_KEY, result.data);
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const addNewAvailability = (
  username,
  pet_type,
  advertised_price,
  start_date,
  end_date
) => (dispatch) => {
  fetch(`${API_HOST}/availabilities`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      username: username,
      pet_type: pet_type,
      advertised_price: advertised_price,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        //saveState(AVAILABILITY_STATE_KEY, result.data);
        //dispatch(setAvailability(result.data));
        dispatch(getCareTakerBasicInfo(username));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const selectAvailability = (state) => state.availability;

export default availabilitySlice.reducer;
