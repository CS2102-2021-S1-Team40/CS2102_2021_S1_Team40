import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Cover from "../images/cover.jpg";

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
    if (user.type.includes("caretaker") && user.type.includes("petowner")) {
      description = `You are registered as both a Pet Owner and ${user.type[2]} ${user.type[0]}.`;
    } else if (user.type.includes("petowner")) {
      description = "You are registered as a Pet Owner.";
    } else if (user.type.includes("caretaker")) {
      description = `You are registered as a ${user.type[1]} ${user.type[0]}`;
    }
  }
  return (
    <div className={classes.background}>
      <Container className={classes.layout}>
        <Typography className={classes.title} variant="h3">
          {welcome}
        </Typography>
        <Typography variant="h4">{description}</Typography>
      </Container>
    </div>
  );
}
