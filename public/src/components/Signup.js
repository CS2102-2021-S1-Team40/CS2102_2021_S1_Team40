import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { selectUser } from "../redux/slices/userSlice";
import {
  selectSignUpError,
  setSignUpError,
} from "../redux/slices/signUpErrorSlice";
import { signupPetOwner } from "../redux/slices/petOwnerSlice";
import { setCareTaker, signupCareTaker } from "../redux/slices/careTakerSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeState } from "../redux/localStorage";
import CareTakerSignUp from "./CareTakerSignUp";

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
    marginTop: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const { open, onClose } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectSignUpError);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [helpTextUsername, setHelpUsername] = useState("");
  const [helpTextPassword, setHelpPassword] = useState("");
  const [helpTextRoles, setHelpRoles] = useState("");
  const [dbFeedback, setDbFeedback] = useState("");
  const [nextDialog, setNextDialog] = useState(false);

  const [roles, setRoles] = useState({
    selected: {
      caretaker: false,
      petowner: false,
      type: null,
    },
  });
  useEffect(() => {
    if (user) {
      setSignUpError(null);
      removeState("signuperror");
      onClose();
      if (user.type.includes("caretaker")) {
        setNextDialog(true);
      }
    } else {
      if (error) {
        if (error.includes("duplicate key value")) {
          setHelpUsername("Sorry, this username is taken!");
        } else {
          setDbFeedback(error);
        }
      } else {
        //console.log("Empty error");
      }
    }
  }, [error, user]);

  const isEmptyOrBlank = (str) => {
    return !str || 0 === str.length || /^\s*$/.test(str);
  };

  const signup = () => {
    setHelpUsername("");
    dispatch(setCareTaker(null));
    if (
      !isEmptyOrBlank(username) &&
      !isEmptyOrBlank(password) &&
      ((roles.selected.caretaker && roles.selected.roles !== null) ||
        roles.selected.petowner)
    ) {
      if (roles.selected.caretaker && roles.selected.petowner) {
        if (roles.selected.type === "parttime") {
          dispatch(
            signupCareTaker(
              username,
              password,
              ["caretaker", "petowner", "parttime"],
              roles.selected.type
            )
          );
        } else if (roles.selected.type === "fulltime") {
          dispatch(
            signupCareTaker(
              username,
              password,
              ["caretaker", "petowner", "fulltime"],
              roles.selected.type
            )
          );
        }
      } else if (roles.selected.caretaker) {
        //console.log("Sign up for caretaker");
        if (roles.selected.type === "parttime") {
          dispatch(
            signupCareTaker(
              username,
              password,
              ["caretaker", "parttime"],
              roles.selected.type
            )
          );
        } else if (roles.selected.type === "fulltime") {
          dispatch(
            signupCareTaker(
              username,
              password,
              ["caretaker", "fulltime"],
              roles.selected.type
            )
          );
        }
      } else if (roles.selected.petowner) {
        //console.log("Sign up for petowner");
        dispatch(signupPetOwner(username, password, ["petowner"]));
      } else {
      }
    } else {
      if (isEmptyOrBlank(username)) {
        setHelpUsername("Username cannot be empty");
      }
      if (isEmptyOrBlank(password)) {
        setHelpPassword("Password cannot be empty");
      }
      if (!roles.selected.caretaker && !roles.selected.petowner) {
        console.log(roles.selected);
        setHelpRoles("Please choose a role!");
      }
      if (roles.selected.caretaker && roles.selected.type === null) {
        console.log(roles.selected);
        setHelpRoles("Please choose the type of caretaker!");
      }
    }
  };

  const toggleOptionAllowOne = (e) => {
    const value = e.currentTarget.value;
    const newSelected = Object.assign(roles.selected, { ["type"]: value });
    setHelpRoles("");
    setRoles({ selected: newSelected });
  };

  const toggleOptionAllowMultiple = (e) => {
    const key = e.currentTarget.value;
    const value = !roles.selected[key];
    const newSelected = Object.assign(roles.selected, { [key]: value });
    setRoles({ selected: newSelected });
  };

  const getStyle = (key) => {
    return roles.selected[key] ? "primary" : "default";
  };

  const getStyle2 = (key) => {
    return roles.selected["type"] === key ? "primary" : "default";
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
    <div>
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
                Sign Up
              </Typography>

              <div className={classes.form}>
                <ButtonGroup fullWidth variant="outlined" bsStyle="default">
                  <Button
                    fullWidth
                    onClick={(e) => toggleOptionAllowMultiple(e)}
                    value="caretaker"
                    color={getStyle("caretaker")}
                  >
                    Caretaker
                  </Button>
                  <Button
                    fullWidth
                    onClick={(e) => toggleOptionAllowMultiple(e)}
                    value="petowner"
                    color={getStyle("petowner")}
                  >
                    PetOwner
                  </Button>
                </ButtonGroup>

                {roles.selected.caretaker && (
                  <ButtonGroup fullWidth variant="outlined" bsStyle="default">
                    <Button
                      fullWidth
                      color={getStyle2("fulltime")}
                      value="fulltime"
                      className={classes.submit}
                      onClick={(e) => toggleOptionAllowOne(e)}
                    >
                      Full-Time
                    </Button>
                    <Button
                      fullWidth
                      color={getStyle2("parttime")}
                      value="parttime"
                      className={classes.submit}
                      onClick={(e) => toggleOptionAllowOne(e)}
                    >
                      Part-Time
                    </Button>
                  </ButtonGroup>
                )}
                <p>{helpTextRoles}</p>
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
                  type="password"
                  helperText={helpTextPassword}
                  id="password"
                  autoComplete="current-password"
                  onChange={checkPassword}
                />
                <p>{dbFeedback}</p>
                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  onClick={signup}
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </Container>
        </DialogContent>
      </Dialog>
      <CareTakerSignUp open={nextDialog} onClose={() => setNextDialog(false)} />
    </div>
  );
}
