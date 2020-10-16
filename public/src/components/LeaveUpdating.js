import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import { updateLeave } from "../redux/slices/leaveSlice";
import { selectUser } from "../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles({
  auth: {
    marginLeft: "auto",
  },
});

export default function LeaveUpdating(props) {
  const { open, onClose } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [old_start_date, setOldStartDate] = useState("");
  const [old_end_date, setOldEndDate] = useState("");
  const [new_start_date, setNewStartDate] = useState("");
  const [new_end_date, setNewEndDate] = useState("");
  const classes = useStyles();
  const update = () => {
    dispatch(updateLeave(user.username, old_start_date, old_end_date, new_start_date, new_end_date));
    onClose();
  };
  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Leave Updating</DialogTitle>
      <DialogContent>
        <DialogContentText>
        Please indicate the old start and end date that you wish to update, and the new start and end date:
        </DialogContentText>
        <form className={classes.container} noValidate>
        <TextField
            id="date"
            label="Old Start Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e) => setOldStartDate(e.target.value)}
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
            onChange={(e) => setOldEndDate(e.target.value)}
        />
        </form>
        <form className={classes.container} noValidate>
        <TextField
            id="date"
            label="New Start Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e) => setNewStartDate(e.target.value)}
        />
        </form>
        <form className={classes.container} noValidate>
        <TextField
            id="date"
            label="New End Date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
            shrink: true,
            }}
            onChange={(e) => setNewEndDate(e.target.value)}
        />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={update}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}
