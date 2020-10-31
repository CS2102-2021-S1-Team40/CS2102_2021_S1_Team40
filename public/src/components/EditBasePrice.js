import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { API_HOST } from "../consts";

export default function EditBasePrice(props) {
  const { open, onClose, editInfo, username } = props;
  const [pet, setPet] = useState("");
  const [price, setPrice] = useState(0);
  useEffect(() => {
    if (editInfo) {
      setPet(editInfo["pet_type"]);
      setPrice(editInfo["base_price"]);
    }
  }, [editInfo]);
  const commitBasePrice = () => {
    fetch(`${API_HOST}/caretakers/admin/price`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        username: username,
        pet_type: pet,
        base_price: price,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          onClose();
        } else {
          alert(result.message);
        }
      });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Base Price</DialogTitle>
      <DialogContent>
        <TextField
          label="Pet Type"
          style={{ marginRight: 4 }}
          value={pet}
          onChange={(e) => setPet(e.target.value)}
        />
        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(parseInt(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={commitBasePrice} color="primary">
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
