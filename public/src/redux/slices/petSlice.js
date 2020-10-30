import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, removeState, saveState } from "../localStorage";

const PET_STATE_KEY = "pet";
const persistedPet = loadState(PET_STATE_KEY);

export const petSlice = createSlice({
  name: "pet",
  initialState: persistedPet,
  reducers: {
    setPet: (state, action) => action.payload,
  },
});

export const { setPet } = petSlice.actions;

export const getPetName = (
    petowner_username,
    pet_type,
  ) => (dispatch) => {
    fetch(`${API_HOST}/pets`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        petowner_username: petowner_username,
        pet_type: pet_type,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("am i here if not why");
        if (result.status === "success") {
            console.log("pet slice success yas");
          saveState(PET_STATE_KEY, result.data);
          dispatch(setPet(result.data));
        } else {
          throw new Error(result.message);
        }
      })
      .catch((err) => alert(err));
  };

export const selectPet = (state) => state.pet;

export default petSlice.reducer;