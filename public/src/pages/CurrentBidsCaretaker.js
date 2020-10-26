import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import BidsRetrievalCaretaker from "../components/BidRetrievalCaretaker";
import Container from "@material-ui/core/Container";

export default function CurrentBidsCaretaker() {
  const user = useSelector(selectUser);
  //   console.log(caretaker);
  if (user && user.type.includes("caretaker")) {
    return (
      <div>
        <Container>
          <h1>Your current bids as a caretaker: </h1>
          <br></br>
          <BidsRetrievalCaretaker />
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
