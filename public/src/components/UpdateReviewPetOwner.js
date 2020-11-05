import React, { useState } from "react";
import { selectUser } from "../redux/slices/userSlice";
import { updateReview } from "../redux/slices/bidSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
  width: {
    width: 300,
  },
});

export default function UpdateReviewPetOwner(props) {
  const { open, onClose, data } = props;

  const username = useSelector(selectUser).username;
  const pet_name = data[1];
  const caretaker_username = data[2];
  const start_date = data[3];
  const end_date = new Date(data[4]);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [updateReviewOpen, setUpdateReviewOpen] = useState(false);

  const edit = () => {
    setUpdateReviewOpen(false);
    dispatch(
      updateReview(
        username,
        pet_name,
        caretaker_username,
        start_date,
        end_date,
        parseInt(rating),
        review
      )
    );
    onClose();
  };

  console.log("update review pet code running");
  console.log(start_date);

  return (
    <Container component="main">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update Review and Rating</DialogTitle>
        <DialogContent>
          <div className={classes.width}>
            <Typography id="discrete-slider" gutterBottom>
              Rating (0 - Terrible, 5 - Excellent)
            </Typography>
            <Slider
              className={classes.marginTop}
              defaultValue={5}
              aria-labelledby="discrete-slider"
              min={0}
              step={1}
              max={5}
              marks
              value={rating}
              valueLabelDisplay="on"
              onChange={(e, val) => setRating(val)}
            />
            <TextField
              className={classes.marginTop}
              autoFocus
              label="Review"
              placeholder={"Enter your review for the caretaker " + data[2]}
              fullWidth
              type="text"
              multiline
              variant="outlined"
              onChange={(e) => setReview(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={edit}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
