import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { cancelBid } from "../redux/slices/bidSlice";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

export default function BidCancel(props) {
  const { open, onClose, data } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const cancel = () => {
    dispatch(
      cancelBid(
        user.username,
        data.split(",")[1],
        data.split(",")[0].split("(")[1],
        data.split(",")[3],
        data.split(",")[4]
      )
    );
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Cancel Bid</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to cancel the bid for{" "}
          {data.split(",")[0].split("(")[1]}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={cancel}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
