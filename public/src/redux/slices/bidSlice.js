import { createSlice } from "@reduxjs/toolkit";
import { API_HOST } from "../../consts";
import { loadState, saveState } from "../localStorage";

const BID_STATE_KEY = "bids";

const persistedBid = loadState(BID_STATE_KEY);

export const bidSlice = createSlice({
  name: "bids",
  initialState: persistedBid,
  reducers: {
    setBid: (state, action) => action.payload,
  },
});

export const { setBid } = bidSlice.actions;

export const acceptBid = (
  petowner_username,
  pet_name,
  caretaker_username,
  start_date,
  end_date
) => (dispatch) => {
  fetch(`${API_HOST}/caretakers/bids/${caretaker_username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      type: "Accept",
      petowner_username: petowner_username,
      pet_name: pet_name,
      caretaker_username: caretaker_username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(BID_STATE_KEY, result.data);
        dispatch(setBid(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert("Unable to accept bid! Something went wrong!"));
};

export const declineBid = (
  petowner_username,
  pet_name,
  caretaker_username,
  start_date,
  end_date
) => (dispatch) => {
  fetch(`${API_HOST}/caretakers/bids/${caretaker_username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      type: "Decline",
      petowner_username: petowner_username,
      pet_name: pet_name,
      caretaker_username: caretaker_username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(BID_STATE_KEY, result.data);
        dispatch(setBid(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert("Unable to decline bid! Something went wrong!"));
};

export const cancelBid = (
  petowner_username,
  pet_name,
  caretaker_username,
  start_date,
  end_date
) => (dispatch) => {
  fetch(`${API_HOST}/petowners/bids/${petowner_username}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify({
      petowner_username: petowner_username,
      pet_name: pet_name,
      caretaker_username: caretaker_username,
      start_date: start_date,
      end_date: end_date,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        saveState(BID_STATE_KEY, result.data);
        dispatch(setBid(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) => alert(err));
};

export const addBid = (
  petowner_username,
  pet_name,
  caretaker_username,
  start_date,
  end_date,
  price,
  transfer_method,
  payment_method
) => (dispatch) => {
  fetch(`${API_HOST}/find-caretakers/bid`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      petowner_username: petowner_username,
      pet_name: pet_name,
      caretaker_username: caretaker_username,
      start_date: start_date,
      end_date: end_date,
      price: price,
      transfer_method: transfer_method,
      payment_method: payment_method,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      if (result.status === "success") {
        console.log("bid slice here success yay");
        saveState(BID_STATE_KEY, result.data);
        dispatch(setBid(result.data));
      } else {
        throw new Error(result.message);
      }
    })
    .catch((err) =>
      alert(
        "Unable to add bid! You might have created a bid with the same details already!"
      )
    );
};

export const selectBids = (state) => state.bids;

export default bidSlice.reducer;
