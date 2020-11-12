import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { selectUser } from "../redux/slices/userSlice";
import { updateReview } from "../redux/slices/bidSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DeleteReviewPetOwner(props) {
  const { open, onClose, data } = props;

  const username = useSelector(selectUser).username;
  const pet_name = data[1];
  const caretaker_username = data[2];

  const input_start_date = new Date(data[3]);
  const start_year = input_start_date.getFullYear();
  var start_month = input_start_date.getMonth() + 1;
  var start_date = input_start_date.getDate();
  if (start_date < 10) {
    start_date = "0" + start_date;
  }
  if (start_month < 10) {
    start_month = "0" + start_month;
  }
  const correct_start_date = `${start_year}-${start_month}-${start_date}`;

  const input_end_date = new Date(data[4]);
  const end_year = input_end_date.getFullYear();
  var end_month = input_end_date.getMonth() + 1;
  var end_date = input_end_date.getDate();
  if (end_date < 10) {
    end_date = "0" + end_date;
  }
  if (end_month < 10) {
    end_month = "0" + end_month;
  }
  const correct_end_date = `${end_year}-${end_month}-${end_date}`;

  const rating = data[5];
  const review = data[6];

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [deleteReviewPetOwnerOpen, setDeleteReviewPetOwnerOpen] = useState(
    false
  );

  const remove = async () => {
    setDeleteReviewPetOwnerOpen(false);

    await dispatch(
      updateReview(
        username,
        pet_name,
        caretaker_username,
        correct_start_date,
        correct_end_date,
        parseInt(0),
        ""
      )
    );
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Delete Review</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Delete rating and review for {caretaker_username}? <br />
          Current given rating: {rating} <br />
          Current given review: {review}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={remove}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
