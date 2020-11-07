import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { selectUser } from "../redux/slices/userSlice";
import {
  selectSignUpError,
  setSignUpError,
} from "../redux/slices/signUpErrorSlice";
import { signupPetOwner } from "../redux/slices/petOwnerSlice";
import { signupCareTaker } from "../redux/slices/careTakerSlice";
import { useDispatch, useSelector } from "react-redux";
import { removeState } from "../redux/localStorage";
import CareTakerSignUp from "./CareTakerSignUp";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { DialogContentText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    flexDirection: "column",
  },
  select: {
    marginTop: 8,
  },
}));

export default function Signup(props) {
  const { open, onClose } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectSignUpError);
  const defaultMessage =
    "Select the account types and choose a username and password.";
  const [message, setMessage] = useState(defaultMessage);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nextDialog, setNextDialog] = useState(false);

  const [roles, setRoles] = useState({
    caretaker: false,
    petowner: false,
    type: null,
  });
  useEffect(() => {
    if (user) {
      setSignUpError(null);
      setMessage(defaultMessage);
      removeState("signuperror");
    } else {
      if (error) {
        if (error.includes("duplicate key value")) {
          setMessage("Sorry, this username is taken!");
        } else {
          setMessage(error);
        }
      } else {
        setMessage(defaultMessage);
      }
    }
  }, [user, error]);

  useEffect(() => {
    if (user && user.type && user.type.includes("caretaker") && open) {
      onClose();
      setNextDialog(true);
    } else if (user && user.type && user.type.includes("petowner") && open) {
      onClose();
    }
  }, [user, open]);

  const isEmptyOrBlank = (str) => {
    return !str || 0 === str.length || /^\s*$/.test(str);
  };

  const signup = () => {
    setSignUpError(null);
    setMessage(defaultMessage);
    if (
      !isEmptyOrBlank(username) &&
      !isEmptyOrBlank(password) &&
      ((roles.caretaker && roles.type !== null) || roles.petowner)
    ) {
      if (roles.caretaker && roles.petowner) {
        if (roles.type === "parttime") {
          dispatch(
            signupCareTaker(
              username,
              password,
              ["caretaker", "petowner", "parttime"],
              roles.type
            )
          );
        } else if (roles.type === "fulltime") {
          dispatch(
            signupCareTaker(
              username,
              password,
              ["caretaker", "petowner", "fulltime"],
              roles.type
            )
          );
        }
      } else if (roles.caretaker) {
        if (roles.type === "parttime") {
          dispatch(
            signupCareTaker(
              username,
              password,
              ["caretaker", "parttime"],
              roles.type
            )
          );
        } else if (roles.type === "fulltime") {
          dispatch(
            signupCareTaker(
              username,
              password,
              ["caretaker", "fulltime"],
              roles.type
            )
          );
        }
      } else if (roles.petowner) {
        dispatch(signupPetOwner(username, password, ["petowner"]));
      } else {
      }
    } else {
      setMessage("Please fill in and select all required fields!");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText>{message}</DialogContentText>
          <ButtonGroup fullWidth variant="outlined">
            <Button
              variant={roles["caretaker"] ? "contained" : "outlined"}
              onClick={(e) =>
                setRoles((prevRole) => ({
                  ...prevRole,
                  caretaker: !prevRole.caretaker,
                }))
              }
              value="caretaker"
              color="secondary"
            >
              Caretaker
            </Button>
            <Button
              variant={roles["petowner"] ? "contained" : "outlined"}
              onClick={(e) =>
                setRoles((prevRole) => ({
                  ...prevRole,
                  petowner: !prevRole.petowner,
                }))
              }
              value="petowner"
              color="secondary"
            >
              PetOwner
            </Button>
          </ButtonGroup>

          {roles.caretaker && (
            <ButtonGroup
              className={classes.select}
              fullWidth
              variant="outlined"
            >
              <Button
                variant={
                  roles["type"] === "fulltime" ? "contained" : "outlined"
                }
                onClick={() =>
                  setRoles((prevRole) => ({ ...prevRole, type: "fulltime" }))
                }
                color="secondary"
              >
                Full-Time
              </Button>
              <Button
                variant={
                  roles["type"] === "parttime" ? "contained" : "outlined"
                }
                onClick={() =>
                  setRoles((prevRole) => ({ ...prevRole, type: "parttime" }))
                }
                color="secondary"
              >
                Part-Time
              </Button>
            </ButtonGroup>
          )}
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={signup}>Sign Up</Button>
        </DialogActions>
      </Dialog>
      <CareTakerSignUp open={nextDialog} onClose={() => setNextDialog(false)} />
    </>
  );
}
