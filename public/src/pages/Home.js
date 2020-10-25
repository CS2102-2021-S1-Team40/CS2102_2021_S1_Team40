import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { selectCareTaker } from "../redux/slices/careTakerSlice";
import Container from "@material-ui/core/Container";

export default function Home() {
  const user = useSelector(selectUser);
  const caretaker = useSelector(selectCareTaker);

  if (user !== null) {
    if (
      user.type.includes("caretaker") &&
      user.type.includes("petowner") &&
      caretaker !== null
    ) {
      return (
        <Container>
          <h1>
            Welcome {user.username}. You are registered as both a petowner and{" "}
            {user.type}.
          </h1>
        </Container>
      );
    } else if (user.type.includes("petowner")) {
      return (
        <Container>
          <h1>Welcome {user.username}. You are registered as a petowner.</h1>
        </Container>
      );
    } else if (caretaker) {
      return (
        <Container>
          <h1>
            Welcome {user.username}. You are registered as a {user.type}.
          </h1>
        </Container>
      );
    }
  }
  return (
    <Container>
      <br></br>
      <h1>Please Login.</h1>
      <h2>Create an account with us if you haven't!</h2>
    </Container>
  );
}
