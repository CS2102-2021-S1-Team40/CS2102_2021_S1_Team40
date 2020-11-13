import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { getPetName } from "../redux/slices/petSlice";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment-timezone";

export default function CaretakerFilter(props) {
  const { open, onClose } = props;
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const [pet_type, setPetType] = useState("");
  const [price, setPrice] = useState("0");
  // const [caretakers_open, setCaretakersOpen] = useState(false);
  // const [ready, setReady] = useState(false);

  // useEffect(() => {
  //   dispatch(getCaretakers(parseInt(price), pet_type, start_date, end_date));
  //   onClose();
  // }, [caretakers_open]);

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let petowner_username = "";
  if (user) {
    petowner_username = user.username;
  }

  const find = async () => {
    const correct_start_date = new Date(start_date);
    const correct_end_date = new Date(end_date);
    // correct_start_date.setDate(correct_start_date.getDate() + 1);
    // correct_end_date.setDate(correct_end_date.getDate() + 1);
    await dispatch(getPetName(petowner_username, pet_type));
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
  let month = today.getMonth() + 1;
  let date = today.getDate();

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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              variant="inline"
              format="yyyy-MM-dd"
              fullWidth
              minDate={new Date()}
              maxDate={moment().add(2, "years").toDate()}
              value={start_date}
              label="Start Date"
              onChange={(date) => setStartDate(date)}
            />
            <KeyboardDatePicker
              variant="inline"
              format="yyyy-MM-dd"
              fullWidth
              minDate={start_date}
              maxDate={moment().add(2, "years").toDate()}
              value={end_date}
              label="End Date"
              onChange={(date) => setEndDate(date)}
            />
          </MuiPickersUtilsProvider>
          {/* <TextField
            id="pet-type"
            label="Enter pet type"
            type="text"
            defaultValue=""
            onChange={(e) => setPetType(e.target.value)}
          /> */}
          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            color="secondary"
          >
            <InputLabel id="select-pet-type">Select pet type</InputLabel>
            <Select
              label="Select pet type"
              fullWidth
              labelId="select-pet-type"
              id="select-pet-type"
              value={pet_type}
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
            margin="normal"
            variant="outlined"
            color="secondary"
            label="Maximum price"
            type="text"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button
            component={Link}
            to="/find-caretakers"
            onClick={find}
            color="secondary"
          >
            Find
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
