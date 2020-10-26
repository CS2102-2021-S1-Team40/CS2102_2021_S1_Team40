import React, { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { colourOptions } from "./data";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";
import { addNewAvailability } from "../redux/slices/availabilitySlice";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: theme.spacing(20),
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 0),
  },
}));

const animatedComponents = makeAnimated();

export default function CareTakerSignUp(props) {
  const user = useSelector(selectUser);
  const { open, onClose } = props;
  const dispatch = useDispatch();
  const classes = useStyles();
  const [types, setTypes] = useState([]);
  const [helperTextType, sethelperTextType] = useState("");
  const [nextStep, setNextStep] = useState(false);
  const handleTypeChange = (e) => {
    var value = [];
    if (e == null) {
      sethelperTextType("Please select at least one pet type");
    } else {
      sethelperTextType("");
      for (var i = 0, l = e.length; i < l; i++) {
        value.push(e[i]);
      }
    }
    setTypes(value);
  };

  const handlePriceChange = (e) => {
    var newTypes = [];
    types.forEach((x) => {
      if (x.value === e.target.id) {
        var newobj = x;
        newobj.price = e.target.value;
        newTypes.push(newobj);
      } else {
        newTypes.push(x);
      }
    });
    setTypes(newTypes);
  };

  const submitTypes = (e) => {
    if (types !== null) {
      setNextStep(true);
    }
  };

  const submitPrice = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    var end_date = yyyy + 2 + "-" + mm + "-" + dd;
    types.forEach((x) => {
      dispatch(
        addNewAvailability(user.username, x.value, x.price, today, end_date)
      );
    });
    setNextStep(false);
    setTypes([]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: { borderRadius: 10 },
      }}
    >
      <DialogContent>
        <Container component="main" maxWidth="xs" backdrop="static">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            {!nextStep && (
              <Container>
                <Typography component="h1" variant="h5">
                  What pets can you take care of?
                </Typography>
                <Select
                  className="mt-4"
                  closeMenuOnSelect={true}
                  components={animatedComponents}
                  defaultValue={types}
                  isMulti
                  onChange={(e) => handleTypeChange(e)}
                  options={colourOptions}
                />
                <p>{helperTextType}</p>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  onClick={submitTypes}
                >
                  Confirm
                </Button>
              </Container>
            )}

            {nextStep && (
              <Container>
                {types.map((x) => {
                  return (
                    <Container key={x.value}>
                      <p>{x.value}</p>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id={x.value}
                        label="Daily Price"
                        type="text"
                        onChange={(e) => handlePriceChange(e)}
                      />
                    </Container>
                  );
                })}
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  onClick={() => setNextStep(false)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                  onClick={submitPrice}
                >
                  Confirm
                </Button>
              </Container>
            )}
          </div>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
