import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState } from "../localStorage";

const PET_STATE_KEY = "pet";
const persistedPet = loadState(PET_STATE_KEY);

export const petSlice = createSlice({
  name: "pet",
  initialState: persistedPet,
  reducers: {
    setPet: (state, action) => {
      return { ...state, ...action.payload };
    },
    setPetName: (state, action) => action.payload,
  },
});

export const { setPet, setPetName } = petSlice.actions;

export const getPetName = (petowner_username, pet_type) => (dispatch) => {
  fetch(`${API_HOST}/pets/name`, {
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
      if (result.status === "success") {
        saveState(PET_STATE_KEY, result.data);
        dispatch(setPetName(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const addPet = (
  petowner_username,
  pet_name,
  pet_type,
  special_requirements
) => (dispatch) => {
  fetch(`${API_HOST}/pets`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      petowner_username: petowner_username,
      pet_name: pet_name,
      pet_type: pet_type,
      special_requirements: special_requirements,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(PET_STATE_KEY, result.data);
        dispatch(setPet(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const updatePet = (
  petowner_username,
  pet_name,
  pet_type,
  special_requirements
) => (dispatch) => {
  fetch(`${API_HOST}/pets`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      petowner_username: petowner_username,
      pet_name: pet_name,
      pet_type: pet_type,
      special_requirements: special_requirements,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(PET_STATE_KEY, result.data);
        dispatch(setPet(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const deletePet = (petowner_username, pet_name) => (dispatch) => {
  fetch(`${API_HOST}/pets`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({
      petowner_username: petowner_username,
      pet_name: pet_name,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(PET_STATE_KEY, result.data);
        dispatch(setPet(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) =>
      alert(
        "Sorry, we are unable to delete this pet as you have an ongoing / past transaction."
      )
    );
};

export const selectPet = (state) => state.pet;

export default petSlice.reducer;
