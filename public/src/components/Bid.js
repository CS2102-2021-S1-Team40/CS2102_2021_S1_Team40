import React, { useEffect, useState } from "react";
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
import { selectPet, getPetName } from "../redux/slices/petSlice";

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
  const dispatch = useDispatch();

  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(start_date);
  const [pet_type, setPetType] = useState("");
  const [price, setPrice] = useState(0);
  const [transfer_method, setTransferMethod] = useState("");
  const [payment_method, setPaymentMethod] = useState("");
  const [send_bid, setSendBid] = useState(false);
  const petowner_username = user.username;
  const pet = useSelector(selectPet);

  useEffect(() => {
    if (open) {
      console.log("getting pet name pls come here");
      dispatch(getPetName(petowner_username, pet_type));
      console.log("pet name in effect: " + JSON.stringify(pet));
    }
  }, [pet_type, caretaker]);

  const today = new Date();
  const today_date = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}`;
  const two_years_later_date = `${today.getFullYear() + 2}-${
    today.getMonth() + 1
  }-${today.getDate()}`;

  // useEffect(() => {
  //   if (send_bid == true) {
  //     console.log("adding bid here pls work");
  //     console.log(pet);
  //     dispatch(addBid(
  //       petowner_username,
  //       pet,
  //       caretaker_username,
  //       start_date,
  //       end_date,
  //       parseInt(price),
  //       transfer_method,
  //       payment_method
  //     ));
  //   }
  // }, [send_bid]);

  const bid = async () => {
    await dispatch(
      addBid(
        petowner_username,
        pet,
        caretaker,
        start_date,
        end_date,
        parseInt(caretakerPrice),
        transfer_method,
        payment_method
      )
    );
    onClose();
    setSendBid(false);
  };

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
        {/* <TextField
          autoFocus
          label="Price"
          type="number"
          fullWidth
          inputProps={{
            min: caretakerPrice,
          }}
          onChange={(e) => setPrice(e.target.value)}
        /> */}
        <FormControl className={classes.formControl}>
          <InputLabel id="select-pet-type">Select pet type</InputLabel>
          <Select
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
}
