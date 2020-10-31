import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Container from "@material-ui/core/Container";
import HomeCarousel from "../components/HomeCarousel";

export default function Home() {
  const user = useSelector(selectUser);
  if (user !== null && user.type != null) {
    if (user.type.includes("caretaker") && user.type.includes("petowner")) {
      return (
        <Container>
          <h1>
            Welcome {user.username}. You are registered as both a petowner and{" "}
            {user.type[2]} {user.type[0]}.
          </h1>
          <HomeCarousel />
        </Container>
      );
    } else if (user.type.includes("petowner")) {
      return (
        <Container>
          <h1>Welcome {user.username}. You are registered as a petowner.</h1>
          <HomeCarousel />
        </Container>
      );
    } else if (user.type.includes("caretaker")) {
      return (
        <Container>
          <h1>
            Welcome {user.username}. You are registered as a {user.type[1]}{" "}
            {user.type[0]}.
          </h1>
          <HomeCarousel />
        </Container>
      );
    }
  }
  return (
    <Container>
      <br></br>
      <h1>Please Login.</h1>
      <h2>Create an account with us if you haven't!</h2>
      <HomeCarousel />
    </Container>
  );
}
