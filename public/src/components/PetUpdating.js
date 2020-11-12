import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/slices/userSlice";
import { updatePet } from "../redux/slices/petSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  marginTop: {
    marginTop: 16,
  },
  marginTopAndLeft: {
    marginTop: 16,
    marginLeft: 16,
  },
});

export default function PetUpdating(props) {
  const { open, onClose, data } = props;

  const petowner_username = useSelector(selectUser).username;
  const dispatch = useDispatch();
  const classes = useStyles();

  const pet_name = data[0];
  const pet_type = data[1];
  const pet_requirements = data[2];
  const [special_requirements, setRequirements] = useState("");
  const [editPetOpen, setEditPetOpen] = useState(false);

  const edit = () => {
    setEditPetOpen(false);
    dispatch(updatePet(petowner_username, pet_name, pet_type, special_requirements));
    onClose();
  };

  return (
    <Container component="main">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Your Pet Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Update special requirements for pet {pet_type}, {pet_name}.
            {pet_requirements ? <><br/> "Previous requirement" + pet_requirements + " will be deleted." </>: ""}
          </DialogContentText>
          <TextField
            className={classes.marginTop}
            label="Special Requirements (if none, input 'NA')"
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
          <Button onClick={edit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
