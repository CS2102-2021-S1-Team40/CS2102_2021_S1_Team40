import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { selectUser } from "../redux/slices/userSlice";
import { updateCreditCard } from "../redux/slices/petOwnerSlice";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  marginTop: {
    marginTop: 16,
  },
  marginTopAndLeft: {
    marginTop: 16,
    marginLeft: 16,
  },
});

export default function UpdateCreditCard(props) {
  const { open, onClose } = props;

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [card_num, setCardNum] = useState("");
  const [card_expiry, setCardExpiry] = useState(new Date());
  const [card_cvc, setCardCvc] = useState("");
  const [cardholder_name, setCardholderName] = useState("");
  const [credit_card_open, setCreditCardOpen] = useState(false);

  const add = () => {
    setCreditCardOpen(false);
    dispatch(
      updateCreditCard(
        user.username,
        parseInt(card_num),
        parseInt(card_expiry),
        parseInt(card_cvc),
        cardholder_name
      )
    );
    onClose();
  };

  return (
    <Container>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Enter Credit Card Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Card number"
            placeholder="1234567890123456 (Without Spaces)"
            fullWidth
            variant="outlined"
            onChange={(e) => setCardNum(e.target.value)}
          />
          <TextField
            className={classes.marginTop}
            label="Expiry date"
            type="text"
            placeholder="MMYY"
            variant="outlined"
            onChange={(e) => setCardExpiry(e.target.value)}
          />
          <TextField
            className={classes.marginTopAndLeft}
            label="CVC/CVV"
            placeholder="123"
            type="text"
            variant="outlined"
            onChange={(e) => setCardCvc(e.target.value)}
          />
          <TextField
            className={classes.marginTop}
            autoFocus
            label="Cardholder name"
            placeholder="J. Smith"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setCardholderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={add}>Update</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
