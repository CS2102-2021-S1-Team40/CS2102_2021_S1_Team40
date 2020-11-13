import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { addBid } from "../redux/slices/bidSlice";
import { selectPet } from "../redux/slices/petSlice";
import { selectPetOwner, getCreditCard } from "../redux/slices/petOwnerSlice";

const useStyles = makeStyles((theme) => ({
  formControl: {
    //margin: theme.spacing(1),
    minWidth: 150,
  },
}));

export default function Bid(props) {
  const classes = useStyles();
  const { open, onClose, caretaker, caretakerPrice } = props;
  const user = useSelector(selectUser);
  const pet_names = useSelector(selectPet);
  const pet_owner = useSelector(selectPetOwner);
  const dispatch = useDispatch();

  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(start_date);
  const [pet_name, setPetName] = useState("");
  const [transfer_method, setTransferMethod] = useState("");
  const [payment_method, setPaymentMethod] = useState("");
  const petowner_username = user.username;
  const card_num = pet_owner ? pet_owner["card_num"] : null;

  const today = new Date();
  const today_date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const two_years_later_date = `${today.getFullYear() + 2}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  const bid = async () => {
    await dispatch(
      addBid(
        petowner_username,
        pet_name,
        caretaker,
        start_date,
        end_date,
        parseInt(caretakerPrice),
        transfer_method,
        payment_method
      )
    );
    onClose();
  };

  if (Array.isArray(pet_names) && card_num) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Bid page</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter these information before bidding
          </DialogContentText>
          <TextField
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
          <FormControl className={classes.formControl}>
            <InputLabel id="select-pet">Select pet</InputLabel>
            <Select
              label="Select pet"
              labelId="select-pet"
              id="select-pet"
              onChange={(e) => setPetName(e.target.value)}
            >
              {pet_names &&
                pet_names.map((pet, i) => (
                  <MenuItem value={pet["pet_name"]}>{pet["pet_name"]}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-transfer-method">
              Select transfer method
            </InputLabel>
            <Select
              labelId="select-transfer-method"
              id="select-transfer-method"
              value={transfer_method}
              onChange={(e) => setTransferMethod(e.target.value)}
            >
              <MenuItem value={"Delivered by pet owner"}>
                Delivered by pet owner
              </MenuItem>
              <MenuItem value={"Caretaker pick up"}>Caretaker pick up</MenuItem>
              <MenuItem value={"Transfer through PCS building"}>
                Transfer through PCS building
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-payment-method">
              Select payment method
            </InputLabel>
            <Select
              labelId="select-payment-method"
              id="select-payment-method"
              value={payment_method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value={"By cash"}>By cash</MenuItem>
              <MenuItem value={"By credit card"}>By credit card</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={bid}>Bid</Button>
        </DialogActions>
      </Dialog>
    );
  } else if (Array.isArray(pet_names)) {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Bid page</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter these information before bidding
          </DialogContentText>
          <TextField
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
          <FormControl className={classes.formControl}>
            <InputLabel id="select-pet">Select pet</InputLabel>
            <Select
              label="Select pet"
              labelId="select-pet"
              id="select-pet"
              onChange={(e) => setPetName(e.target.value)}
            >
              {pet_names &&
                pet_names.map((pet, i) => (
                  <MenuItem value={pet["pet_name"]}>{pet["pet_name"]}</MenuItem>
                ))}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-transfer-method">
              Select transfer method
            </InputLabel>
            <Select
              labelId="select-transfer-method"
              id="select-transfer-method"
              value={transfer_method}
              onChange={(e) => setTransferMethod(e.target.value)}
            >
              <MenuItem value={"Delivered by pet owner"}>
                Delivered by pet owner
              </MenuItem>
              <MenuItem value={"Caretaker pick up"}>Caretaker pick up</MenuItem>
              <MenuItem value={"Transfer through PCS building"}>
                Transfer through PCS building
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="select-payment-method">
              Select payment method
            </InputLabel>
            <Select
              labelId="select-payment-method"
              id="select-payment-method"
              value={payment_method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value={"By cash"}>By cash</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={bid}>Bid</Button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Bid page</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add your pets before bidding
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  }
}
