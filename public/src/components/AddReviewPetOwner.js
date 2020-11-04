import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/slices/userSlice";
import { editReview } from "../redux/slices/bidSlice";
import { colourOptions } from "./data";
import { useDispatch, useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  marginTop: {
    marginTop: 16,
  },
  marginTopAndLeft: {
    marginTop: 16,
    marginLeft: 16,
  },
}));

export default function AddReviewPetOwner(props) {
  const { open, onClose } = props;

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const classes = useStyles();
  const animatedComponents = makeAnimated();

  const [pet_name, setName] = useState("");
  const [caretaker_username, setCaretaker] = useState("");
  const [review, setReview] = useState("");
  const [helperTextType, sethelperTextType] = useState("");
  const [addPetOpen, setAddPetOpen] = useState(false);

  const add = () => {
    setAddPetOpen(false);
    // need change to dispatch(editReview(user.username, pet_name, caretaker_username, start_date, end_date, review));
    onClose();
  };

  const handleTypeChange = (e) => {
    if (e == null) {
      sethelperTextType("Please select a pet type");
    } else {
      sethelperTextType(e);
    }
    //setType(e);
  };

  return (
    <Container component="main">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Enter Your Pet Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Pet Name"
            placeholder="Enter your pet name"
            fullWidth
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={add}>Add Pet</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
