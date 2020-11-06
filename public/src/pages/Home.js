import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Cover from "../images/cover.jpg";
import { USER_TYPES } from "../consts";

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundImage: `url(${Cover}) !important`,
    backgroundSize: "cover",
    height: "calc(100vh - 64px)",
  },
  layout: {
    padding: 32,
  },
  title: {
    marginBottom: 16,
  },
}));

export default function Home() {
  const user = useSelector(selectUser);
  const classes = useStyles();
  let welcome = "Welcome to PetLovers";
  let description = "Please Login. Create an account with us if you haven't!";
  if (user !== null && user.type != null) {
    welcome = `Welcome ${user.username}.`;
    description = "You are registered as";
    user.type
      .filter((t) => t !== "caretaker")
      .forEach((t, i) => {
        const len = user.type.filter((t) => t !== "caretaker").length;
        description += ` ${i === len - 1 && len !== 1 ? "and" : ""} a ${
          USER_TYPES[t]
        }${i === len - 1 ? "." : ","}`;
      });
  }
  return (
    <div className={classes.background}>
      <Container className={classes.layout}>
        <h1>{welcome}</h1>
        <h2>{description}</h2>
      </Container>
    </div>
  );
}
