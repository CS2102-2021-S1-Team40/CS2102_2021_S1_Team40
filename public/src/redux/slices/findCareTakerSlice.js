import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";

const FINDCARETAKER_STATE_KEY = "findcaretaker";
const persistedFindCareTaker = loadState(FINDCARETAKER_STATE_KEY);

export const findCareTakerSlice = createSlice({
  name: "findcaretaker",
  initialState: persistedFindCareTaker,
  reducers: {
    setFindCareTakers: (state, action) => action.payload,
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
        saveState(FINDCARETAKER_STATE_KEY, result.data);
        dispatch(setFindCareTakers(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const { setFindCareTakers } = findCareTakerSlice.actions;

export const selectFindCareTaker = (state) => state.findcaretaker;

export default findCareTakerSlice.reducer;
