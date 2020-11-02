import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { getUserFromDb, selectUser } from "../redux/slices/userSlice";
import { getCareTakerFromDb } from "../redux/slices/careTakerSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginError,
  setLoginError,
} from "../redux/slices/loginErrorSlice";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { removeState } from "../redux/localStorage";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(10),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    // backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

export default function Login(props) {
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectLoginError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [helpTextUsername, setHelpUsername] = useState("");
  const [helpTextPassword, setHelpPassword] = useState("");
  const [dbFeedback, setDbFeedback] = useState("");
  const classes = useStyles();
  const isEmptyOrBlank = (str) => {
    return !str || 0 === str.length || /^\s*$/.test(str);
  };
  useEffect(() => {
    if (user) {
      if (user.type && user.type.includes("caretaker")) {
        dispatch(getCareTakerFromDb(username));
      }
      setHelpUsername("");
      setHelpPassword("");
      setLoginError(null);
      removeState("loginerror");
      onClose();
    } else {
      if (error) {
        setHelpUsername(error);
        setHelpPassword(error);
      }
    }
  }, [error, user]);

  const login = () => {
    setHelpUsername("");
    setHelpPassword("");
    if (!isEmptyOrBlank(username) && !isEmptyOrBlank(password)) {
      dispatch(getUserFromDb(username, password));
    }

    if (isEmptyOrBlank(username)) {
      setHelpUsername("Username cannot be empty");
    }
    if (isEmptyOrBlank(password)) {
      setHelpPassword("Password cannot be empty");
    }
  };

  const checkUsername = (e) => {
    setUsername(e.target.value);
    if (!isEmptyOrBlank(e.target.value)) {
      setHelpUsername("");
    }
  };

  const checkPassword = (e) => {
    setPassword(e.target.value);
    if (!isEmptyOrBlank(e.target.value)) {
      setHelpPassword("");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <DialogContent>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <div className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                type="text"
                helperText={helpTextUsername}
                autoFocus
                onChange={checkUsername}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                helperText={helpTextPassword}
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={checkPassword}
              />
              <p>{dbFeedback}</p>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                color="primary"
                className={classes.submit}
                onClick={login}
              >
                Login
              </Button>
            </div>
          </div>
        </Container>
      </DialogContent>
    </Dialog>
    // <Grid container>
    //         <Grid item xs>
    //           <Link href="#" variant="body2">
    //             Forgot password?
    //           </Link>
    //         </Grid>
    //         <Grid item>
    //           <Link href="#" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid>
    // <DialogActions>
    //   <Button onClick={onClose}>Cancel</Button>
    //   <Button onClick={login}>Login</Button>
    // </DialogActions>
  );
}
