import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/slices/userSlice";
import { addPet } from "../redux/slices/petSlice";
import { colourOptions } from "./data";
import { useDispatch, useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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

export default function AddPet(props) {
  const { open, onClose } = props;

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const classes = useStyles();
  const animatedComponents = makeAnimated();

  const [pet_name, setName] = useState("");
  const [pet_type, setType] = useState("");
  const [special_requirements, setRequirements] = useState("");
  const [helperTextType, sethelperTextType] = useState("");
  const [addPetOpen, setAddPetOpen] = useState(false);

  const add = () => {
    setAddPetOpen(false);
    dispatch(addPet(user.username, pet_name, pet_type, special_requirements));
    onClose();
  };

  const handleTypeChange = (e) => {
    if (e == null) {
      sethelperTextType("Please select a pet type");
    } else {
      sethelperTextType(e);
    }
    setType(e);
  };

  return (
    <Container>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Enter Pet Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Pet Name"
            placeholder="Kitty"
            fullWidth
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            className={classes.marginTop}
            closeMenuOnSelect={true}
            components={animatedComponents}
            defaultValue={colourOptions[0]}
            label="Single select"
            fullWidth
            variant="outlined"
            onChange={(e) => handleTypeChange(e)}
            options={colourOptions}
          />
          <TextField
            className={classes.marginTop}
            autoFocus
            label="Special Requirements (if any)"
            placeholder="Enter any requirements your pet may have"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setRequirements(e.target.value)}
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
