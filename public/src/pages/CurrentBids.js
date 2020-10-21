import React from "react";
import { useSelector } from "react-redux";
import { selectCareTaker } from "../redux/slices/careTakerSlice";
import { selectUser } from "../redux/slices/userSlice";
import BidsRetrieval from "../components/BidRetrieval";

export default function CurrentBids() {
  const caretaker = useSelector(selectCareTaker);
//   console.log(caretaker);
  if (caretaker) {
    return (
      <div>
        <h1>THESE ARE THE CURRENT BIDS FOR YOU</h1>
        <BidsRetrieval />
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          Please Login LEAVE PAGE. Create an account with us if you haven't!
        </h1>
      </div>
    );
  }
}
