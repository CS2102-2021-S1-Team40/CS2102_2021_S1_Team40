import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import BidsRetrievalPetowner from "../components/BidRetrievalPetowner";
import Container from "@material-ui/core/Container";

export default function CurrentBidsPetowner() {
  const user = useSelector(selectUser);
  if (user && user.type && user.type.includes("petowner")) {
    return (
      <div>
        <Container>
          <h1>Your current bids as a pet owner:</h1>
          <br></br>
          <BidsRetrievalPetowner />
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <h1>
          You do not have permission to view the bids page! Please login and try
          again
        </h1>
      </div>
    );
  }
}
