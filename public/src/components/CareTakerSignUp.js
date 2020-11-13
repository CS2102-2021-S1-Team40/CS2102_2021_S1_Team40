import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import makeAnimated from "react-select/animated";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { addNewAvailability } from "../redux/slices/availabilitySlice";
import { addNewBaseDaily } from "../redux/slices/baseDailySlice";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Chip from "@material-ui/core/Chip";
import DialogContentText from "@material-ui/core/DialogContentText";
import { colourOptions } from "./data";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  petChip: {
    margin: "0 2px",
  },
}));

export default function CareTakerSignUp(props) {
  const user = useSelector(selectUser);
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [types, setTypes] = useState([]);
  const [prices, setPrices] = useState({});
  const defaultMessage = "You may select multiple pets.";
  const [message, setMessage] = useState(defaultMessage);
  const [nextStep, setNextStep] = useState(false);

  const isEmptyOrBlank = (str) => {
    return !str || 0 === str.length || /^\s*$/.test(str);
  };

  const handleTypeChange = (e) => {
    setTypes(e.target.value);
  };

  const handlePriceChange = (e) => {
    const newTypes = [];
    let helperText = "";
    if (
      !isNaN(e.target.value) &&
      !isEmptyOrBlank(e.target.value) &&
      e.target.value !== "0" &&
      e.target.value !== "" &&
      !/^0*$/.test(e.target.value)
    ) {
      types.forEach((x) => {
        if (x.value === e.target.id) {
          const newobj = x;
          newobj.helperText = helperText;
          newobj.price = e.target.value;
          newTypes.push(newobj);
        } else {
          newTypes.push(x);
        }
      });
    } else {
      if (
        isNaN(e.target.value) ||
        isEmptyOrBlank(e.target.value) ||
        e.target.value === ""
      ) {
        helperText = "Please enter a valid number";
      } else if (e.target.value === "0" || /^0*$/.test(e.target.value)) {
        helperText = "Please enter a number greater than 0";
      }
      types.forEach((x) => {
        if (x.value === e.target.id) {
          const newobj = x;
          newobj.helperText = helperText;
          newTypes.push(newobj);
        } else {
          newTypes.push(x);
        }
      });
    }
    setTypes(newTypes);
  };

  const submitTypes = (e) => {
    if (types.length === 0) {
      setMessage("Please select at least one pet type");
    } else if (types.length > 0 && user.type.includes("parttime")) {
      let newPrices = {};
      for (let type of types) {
        newPrices[type] = 0;
      }
      setPrices(newPrices);
      setMessage("Key in your daily price for each pet.");
      setNextStep(true);
    } else if (types.length > 0 && user.type.includes("fulltime")) {
      setNextStep(false);
      types.forEach((x) => {
        dispatch(addNewBaseDaily(user.username, x, 20));
      });
      setTypes([]);
      onClose();
    }
  };

  const submitPrice = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    today = yyyy + "-" + mm + "-" + dd;
    const end_date = yyyy + 2 + "-" + mm + "-" + dd;
    const withErrors = Object.values(prices).filter(
      (p) => isEmptyOrBlank(p) || p === null || p === "0"
    );
    if (withErrors.length === 0) {
      types.forEach((x) => {
        dispatch(
          addNewAvailability(user.username, x, prices[x], today, end_date)
        );
      });
      setNextStep(false);
      setTypes([]);
      onClose();
    } else {
      setMessage("Please ensure all prices are filled in!");
    }
  };

  const title = nextStep
    ? "List your price"
    : "Select the pets you can take care of";
  const actions = nextStep ? (
    <>
      <Button
        type="submit"
        color="secondary"
        onClick={() => setNextStep(false)}
      >
        Back
      </Button>
      <Button type="submit" color="secondary" onClick={submitPrice}>
        Confirm
      </Button>
    </>
  ) : (
    <Button type="submit" color="secondary" onClick={submitTypes}>
      Confirm
    </Button>
  );
  return (
    <Dialog open={open} onClose={onClose} disableBackdropClick>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        {!nextStep && (
          <FormControl fullWidth color="secondary" variant="outlined">
            <InputLabel id="select-pet-label">Pets</InputLabel>
            <Select
              label="Pets"
              labelId="select-pet-label"
              id="select-pet-multiple"
              value={types}
              multiple
              onChange={handleTypeChange}
              renderValue={(selected) => (
                <>
                  {selected.map((value) => (
                    <Chip
                      className={classes.petChip}
                      color="secondary"
                      key={value}
                      label={value}
                    />
                  ))}
                </>
              )}
            >
              {colourOptions.map((option) => (
                <MenuItem key={option.label} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {nextStep &&
          types.map((x) => {
            return (
              <TextField
                key={x}
                variant="outlined"
                color="secondary"
                margin="normal"
                required
                fullWidth
                id={x}
                label={`Daily Price for ${x}`}
                type="number"
                value={prices[x]}
                onChange={(e) => {
                  e.persist();
                  setPrices((prevPrices) => {
                    let updated = { ...prevPrices };
                    updated[x] = e.target.value;
                    return updated;
                  });
                }}
              />
            );
          })}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}
