import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/slices/userSlice";
import { addPet } from "../redux/slices/petSlice";
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

export default function AddPet(props) {
  const { open, onClose } = props;

  const username = useSelector(selectUser).username;
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
    dispatch(addPet(username, pet_name, pet_type, special_requirements));
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
          <FormControl
            fullWidth
            className={classes.marginTop}
            variant="outlined"
          >
            <InputLabel id="select-pet-type-label">Pet Type</InputLabel>
            <Select
              fullWidth
              labelId="select-pet-type-label"
              id="select-pet-type"
              onChange={(e) => handleTypeChange(e.target.value)}
            >
              <MenuItem value={"Cat"}>Cat</MenuItem>
              <MenuItem value={"Dog"}>Dog</MenuItem>
              <MenuItem value={"Hamster"}>Hamster</MenuItem>
              <MenuItem value={"Terrapin"}>Terrapin</MenuItem>
              <MenuItem value={"Bird"}>Bird</MenuItem>
              <MenuItem value={"Rabbit"}>Rabbit</MenuItem>
              <MenuItem value={"Fish"}>Fish</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={classes.marginTop}
            label="Special Requirements (if any)"
            placeholder="Enter any requirements your pet may have"
            type="text"
            fullWidth
            multiline
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
