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


//also need to somehow pass over the username from caretakers
export default function Bid(props) {
  const { open, onClose } = props.open;
  const current_caretaker = props.caretaker;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [start_date, setStartDate] = useState(new Date());
  const [end_date, setEndDate] = useState(start_date);
  // const [pet_type, setPetType] = useState("");
  const [price, setPrice] = useState("0");
  const [transfer_method, setTransferMethod] = useState("");
  const [payment_method, setPaymentMethod] = useState("");
  const [send_bid, setSendBid] = useState(false);
  const petowner_username = user.username;


  useEffect(() => {
    dispatch(addBid = (
      petowner_username,
      pet_name,
      caretaker_username,
      start_date,
      end_date,
      price,
      transfer_method,
      payment_method
    ))
  }, [send_bid]);

  const bid = () => {
    setSendBid(true);

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
          label="Maximum price"
          type="text"
          fullWidth
          onChange={(e) => setPrice(e.target.value)}
        />
        {/* <FormControl>
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
        </FormControl> */}
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
      </DialogActions>
    </Dialog>
  );
}
