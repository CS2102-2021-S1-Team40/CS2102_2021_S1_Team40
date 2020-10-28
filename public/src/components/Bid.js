import React, { useEffect, useState } from "react";
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


//also need to somehow pass over the username from caretakers
export default function Bid(props) {
  const { open, onClose, caretaker } = props;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(start_date);
  const [pet_type, setPetType] = useState("");
  const [price, setPrice] = useState("0");
  const [transfer_method, setTransferMethod] = useState("");
  const [payment_method, setPaymentMethod] = useState("");
  const [send_bid, setSendBid] = useState(false);
  const petowner_username = user.username;
  const caretaker_username = caretaker;
  const pet = useSelector(selectPet);

  console.log("petowner name: " + petowner_username);
  console.log("pet type: " + pet_type);
  useEffect(() => {
    if (open) {
      console.log("getting pet name pls come here");
      dispatch(getPetName(petowner_username, pet_type));
      console.log("pet name in effect: " + JSON.stringify(pet["pet_name"]));
    }
  }, [pet_type]);

  console.log("pet name: " + JSON.stringify(pet["pet_name"]));
  console.log(" caretaker username: " + caretaker_username);

  useEffect(() => {
    if (caretaker_username != null) {
      console.log("adding bid here pls work");
      dispatch(addBid(
        petowner_username,
        pet["pet_name"],
        caretaker_username,
        start_date,
        end_date,
        parseInt(price),
        transfer_method,
        payment_method
      ));
    }
  }, [send_bid]);

  const bid = () => {
    setSendBid(true);
    onClose();
  }


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
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          autoFocus
          label="Price"
          type="text"
          fullWidth
          onChange={(e) => setPrice(e.target.value)}
        />
        <FormControl>
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
        <FormControl>
          <InputLabel id="select-transfer-method">
            Select transfer method
          </InputLabel>
          <Select
            labelId="select-transfer-method"
            id="select-transfer-method"
            value={transfer_method}
            onChange={(e) => setTransferMethod(e.target.value)}
          >
            <MenuItem value={"Delivered by pet owner"}>Delivered by pet owner</MenuItem>
            <MenuItem value={"Caretaker pick up"}>Caretaker pick up</MenuItem>
            <MenuItem value={"Transfer through PCS building"}>
              Transfer through PCS building
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl>
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
