import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { selectUser } from "../redux/slices/userSlice";
import { applyLeave } from "../redux/slices/leaveSlice";
import { useSelector, useDispatch } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment-timezone";

const useStyles = makeStyles({
  auth: {
    marginLeft: "auto",
  },
});

export default function LeaveApplication(props) {
  const { open, onClose } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [start_date, setStartDate] = useState(null);
  const [end_date, setEndDate] = useState(null);
  const classes = useStyles();
  const apply = async () => {
    await dispatch(applyLeave(user.username, start_date, end_date));
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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave Application</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please indicate the start and end date that you wish to apply for:
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={apply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}
