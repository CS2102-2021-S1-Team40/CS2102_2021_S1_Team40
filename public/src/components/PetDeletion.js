import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { deletePet } from "../redux/slices/petSlice";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function PetDeletion(props) {
  const { open, onClose, data } = props;
  const pet_name = data[0];
  console.log(pet_name);
  const pet_type = data[1];
  console.log(pet_type);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const remove = () => {
    dispatch(
      deletePet(user.username, pet_name)
    );
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Pet Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the pet {pet_type}, {pet_name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={remove}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
