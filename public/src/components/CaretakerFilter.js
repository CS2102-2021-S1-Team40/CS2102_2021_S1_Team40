import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getCaretakers } from "../redux/slices/careTakerSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


export default function CaretakerFilter(props) {
    const { open, onClose } = props;
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(start_date);

    const [pet_type, setPetType] = useState("");

    const [transfer_type, setTransferType] = useState("");

    const [price, setPrice] = useState("0");

    const dispatch = useDispatch();
    const find = () => {
        dispatch(getCaretakers(parseInt(price), pet_type, start_date, end_date));
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Requirements Page</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter these information before we find you a caretaker!
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
                    id="pet-type"
                    label="Enter pet type"
                    type="text"
                    defaultValue=""
                    onChange={(e) => setPetType(e.target.value)}
                />
                <TextField
                    autoFocus
                    label="Maximum price"
                    type="text"
                    fullWidth
                    onChange={(e) => setPrice(e.target.value)}
                />
                <FormControl>
                    <InputLabel id="select-transfer-type">Select transfer type</InputLabel>
                    <Select
                        labelId="select-transfer-type"
                        id="select-transfer-type"
                        value={transfer_type}
                        onChange={(e) => setTransferType(e.target.value)}
                    >
                        <MenuItem value={"Delivered by you"}>Delivered by you</MenuItem>
                        <MenuItem value={"Caretaker pick up"}>Caretaker pick up</MenuItem>
                        <MenuItem value={"Transfer through PCS building"}>Transfer through PCS building</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Link to="/profile/find-caretakers">
                    <button onClick={find}>Find</button>
                </Link>
            </DialogActions>
        </Dialog>
    );
}