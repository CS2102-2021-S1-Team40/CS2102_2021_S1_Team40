import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState } from "../localStorage";

const LEAVE_STATE_KEY = "leaves";

const persistedLeave = loadState(LEAVE_STATE_KEY);

export const leaveSlice = createSlice({
  name: "leaves",
  initialState: persistedLeave,
  reducers: {
    setLeave: (state, action) => action.payload,
  },
});

export const { setLeave } = leaveSlice.actions;

export const getLeaves = (username) =>
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(LEAVE_STATE_KEY, result.data);
        setLeave(result.data);
      } else {
        console.log("No leaves found!");
      }
    });

export const applyLeave = (username, start_date, end_date) => (dispatch) => {
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      ftct_username: username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(LEAVE_STATE_KEY, result.data);
        dispatch(setLeave(result.data));
      } else {
        throw new Error(result);
      }
    })
    .catch((err) =>
      alert("The added date must not overlap with any of your current leaves!")
    );
};

export const updateLeave = (
  username,
  old_start_date,
  old_end_date,
  new_start_date,
  new_end_date
) => (dispatch) => {
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify({
      ftct_username: username,
      old_start_date: old_start_date,
      old_end_date: old_end_date,
      new_start_date: new_start_date,
      new_end_date: new_end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(LEAVE_STATE_KEY, result.data);
        dispatch(setLeave(result.data));
      } else {
        throw new Error(result);
      }
    })
    .catch((err) =>
      alert(
        "The updated date must not overlap with any of your current leaves!"
      )
    );
};

export const deleteLeave = (username, start_date, end_date) => (dispatch) => {
  fetch(`${API_HOST}/users/leaves/${username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({
      ftct_username: username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(LEAVE_STATE_KEY, result.data);
        dispatch(setLeave(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const selectLeaves = (state) => state.leaves;

export default leaveSlice.reducer;
