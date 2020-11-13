import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { deleteLeave } from "../redux/slices/leaveSlice";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function LeaveDeletion(props) {
  const { open, onClose, data } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const cancel = async () => {
    await dispatch(
      deleteLeave(user.username, data.substring(1, 11), data.substring(12, 22))
    );
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the leave from 
          {moment(data.substring(1, 11))
            .add(1, "days")
            .format("DD MMM YYYY")}{" "}
          to {moment(data.substring(12, 22))
            .add(1, "days")
            .format("DD MMM YYYY")}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={cancel}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
