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

const useStyles = makeStyles({
  auth: {
    marginLeft: "auto",
  },
});

export default function LeaveApplication(props) {
  const { open, onClose } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const classes = useStyles();
  const apply = () => {
    dispatch(applyLeave(user.username, start_date, end_date));
    onClose();
  };

  // const today = new Date();
  // const today_date = (today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()).toString();
  // const one_year_later_date = ((today.getFullYear() + 1) + '-' + (today.getMonth() + 1 ) + '-' + today.getDate()).toString();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave Application</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please indicate the start and end date that you wish to apply for:
        </DialogContentText>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </form>
        <form className={classes.container} noValidate>
          <TextField
            id="date"
            label="End Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={apply}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}
