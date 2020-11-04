import React, { useEffect, useState } from "react";
import { selectUser } from "../redux/slices/userSlice";
import { editReview } from "../redux/slices/bidSlice";
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
import Slider from '@material-ui/core/Slider';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
  width: {
    width: 300,
  }
}));

export default function UpdateReviewPetOwner(props) {
  const { open, onClose, data } = props;

  const username = useSelector(selectUser).username;
  const dispatch = useDispatch();
  const classes = useStyles();
  const animatedComponents = makeAnimated();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [helperTextType, sethelperTextType] = useState("");
  const [updateReviewOpen, setUpdateReviewOpen] = useState(false);

  const update = () => {
    setUpdateReviewOpen(false);
    dispatch(
      editReview(
        username,
        data[1],
        data[2],
        data[3],
        data[4],
        rating,
        review,
    ));
    onClose();
  };

  return (
    <Container component="main">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update the Details</DialogTitle>
        <DialogContent>
          <div className={classes.width}>
          <Typography id="discrete-slider" gutterBottom>
        Rating
      </Typography>
          <Slider
            defaultValue={3}
            aria-labelledby="discrete-slider"
            min={0}
            step={1}
            max={5}
            marks
            valueLabelDisplay="on"
            onChange={ (e, val) => setRating(val) }
          />
          <TextField
            autoFocus
            label="Review"
            placeholder={"Enter your review for the caretaker " + data[2]}
            fullWidth
            multiline
            variant="outlined"
            onChange={(e) => setReview(e.target.value)}
          />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={update}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
