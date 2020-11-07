import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { getUserFromDb, selectUser } from "../redux/slices/userSlice";
import { getCareTakerFromDb } from "../redux/slices/careTakerSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginError } from "../redux/slices/loginErrorSlice";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import { DialogContentText } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default function Login(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectLoginError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const defaultMessage = "Enter your login credentials.";
  const [message, setMessage] = useState(defaultMessage);
  const classes = useStyles();
  const isEmptyOrBlank = (str) => {
    return !str || 0 === str.length || /^\s*$/.test(str);
  };
  useEffect(() => {
    if (user) {
      if (user.type && user.type.includes("caretaker")) {
        dispatch(getCareTakerFromDb(username));
      }
      onClose();
    } else {
      if (error) {
        setMessage(error);
      }
    }
  }, [error, user]);

  const login = () => {
    if (!isEmptyOrBlank(username) && !isEmptyOrBlank(password)) {
      dispatch(getUserFromDb(username, password));
    } else {
      setMessage("Username or Password cannot be empty!");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent className={classes.content}>
        <DialogContentText>{message}</DialogContentText>
        <TextField
          variant="outlined"
          color="secondary"
          margin="normal"
          required
          fullWidth
          label="Username"
          type="text"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          color="secondary"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? login() : null)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={login}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}
