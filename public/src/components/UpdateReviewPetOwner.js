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
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

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

const muiTheme = createMuiTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "#654d44",
      },
      track: {
        color: "brown",
      },
      rail: {
        color: "#87776f",
      },
    },
  },
});

export default function UpdateReviewPetOwner(props) {
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

  const dispatch = useDispatch();
  const classes = useStyles();

  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");
  const [updateReviewOpen, setUpdateReviewOpen] = useState(false);

  const edit = async () => {
    setUpdateReviewOpen(false);

    await dispatch(
      updateReview(
        username,
        pet_name,
        caretaker_username,
        correct_start_date,
        correct_end_date,
        parseInt(rating),
        review
      )
    );
    onClose();
  };

  return (
    <Container component="main">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Update Review and Rating</DialogTitle>
        <DialogContent>
          <div className={classes.width}>
            <Typography id="discrete-slider" gutterBottom>
              Rating (0 - Terrible, 5 - Excellent)
            </Typography>
            <ThemeProvider theme={muiTheme}>
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
            </ThemeProvider>
            <TextField
              className={classes.marginTop}
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
