import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import LeaveRetrieval from "../components/LeaveRetrieval";
import Container from "@material-ui/core/Container";

export default function Leave() {
  const user = useSelector(selectUser);
  if (user && user.type.includes("caretaker")) {
    return (
      <Container>
        <h1>THESE ARE YOUR LEAVES</h1>
        <LeaveRetrieval />
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>
          Please Login LEAVE PAGE. Create an account with us if you haven't!
        </h1>
      </Container>
    );
  }
}
