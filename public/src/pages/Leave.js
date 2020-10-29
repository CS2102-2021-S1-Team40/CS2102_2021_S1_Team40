import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import LeaveRetrieval from "../components/LeaveRetrieval";
import Container from "@material-ui/core/Container";

export default function Leave() {
  const user = useSelector(selectUser);
  if (user && user.type && user.type.includes("fulltime")) {
    return (
      <Container>
        <h1>Leaves applied</h1>
        <LeaveRetrieval />
      </Container>
    );
  } else {
    return (
      <Container>
        <h1>
          Oops! You are not allowed to view this page. Please make sure you are a full-time caretaker using PetLovers!
        </h1>
      </Container>
    );
  }
}
