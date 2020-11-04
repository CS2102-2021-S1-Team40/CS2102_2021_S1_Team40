import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { getCaretakers } from "../redux/slices/findCareTakerSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Container } from "@material-ui/core";

export default function CaretakerFilter(props) {
  const { open, onClose } = props;
  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(start_date);
  const [pet_type, setPetType] = useState("");
  const [price, setPrice] = useState("0");
  // const [caretakers_open, setCaretakersOpen] = useState(false);
  // const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   dispatch(getCaretakers(parseInt(price), pet_type, start_date, end_date));
  //   onClose();
  // }, [caretakers_open]);

  const dispatch = useDispatch();

  const find = async () => {
    var correct_start_date = new Date(start_date);
    var correct_end_date = new Date(end_date);
    correct_start_date.setDate(correct_start_date.getDate() + 1);
    correct_end_date.setDate(correct_end_date.getDate() + 1);
    await dispatch(
      getCaretakers(
        parseInt(price),
        pet_type,
        correct_start_date,
        correct_end_date
      )
    );
    onClose();
  };

  const today = new Date();
  const year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();

  if (date < 10) {
    date = "0" + date;
  }
  if (month < 10) {
    month = "0" + month;
  }

  const today_date = `${year}-${month}-${date}`;
  const two_years_later_date = `${year + 2}-${month + 1}-${date}`;

  return (
    <Container>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Requirements Page</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter these information before we find you a caretaker!
          </DialogContentText>
          <TextField
            fullWidth
            id="date"
            label="Select start date"
            type="date"
            defaultValue=""
            inputProps={{
              min: today_date,
              max: two_years_later_date,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            id="date"
            fullWidth
            label="Select end date"
            type="date"
            defaultValue=""
            inputProps={{
              min: today_date,
              max: two_years_later_date,
            }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setEndDate(e.target.value)}
          />
          {/* <TextField
            id="pet-type"
            label="Enter pet type"
            type="text"
            defaultValue=""
            onChange={(e) => setPetType(e.target.value)}
          /> */}
          <FormControl fullWidth>
            <InputLabel id="select-pet-type">Select pet type</InputLabel>
            <Select
              fullWidth
              labelId="select-pet-type"
              id="select-pet-type"
              onChange={(e) => setPetType(e.target.value)}
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
            autoFocus
            label="Maximum price"
            type="text"
            fullWidth
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button component={Link} to="/find-caretakers" onClick={find}>
            Find
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
