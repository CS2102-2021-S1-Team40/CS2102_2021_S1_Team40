import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signoutUser } from "../redux/slices/userSlice";
import { useLocation } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CaretakerFilter from "./CaretakerFilter";
import Logo from "../images/logo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PetsIcon from "@material-ui/icons/Pets";
import ChildCareIcon from "@material-ui/icons/ChildCare";
import SearchIcon from "@material-ui/icons/Search";
import EmailIcon from "@material-ui/icons/Email";
import SendIcon from "@material-ui/icons/Send";
import IconButton from "@material-ui/core/IconButton";
import EventNoteIcon from "@material-ui/icons/EventNote";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  auth: {
    marginLeft: 16,
  },
  title: {
    flexGrow: 1,
    marginLeft: 16,
    textDecoration: "initial",
    color: "inherit",
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [caretakerFiltersOpen, setCaretakerFiltersOpen] = useState(false);
  const classes = useStyles();
  const navButtons =
    user && user.type ? (
      <div>
        {user.type.includes("caretaker") ? (
          <Tooltip title="Bids Received">
            <IconButton component={Link} to="/profile/currentBidsCaretaker">
              <EmailIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {user.type.includes("petowner") ? (
          <Tooltip title="Bids Submitted">
            <IconButton component={Link} to="/profile/currentBidsPetowner">
              <SendIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {user.type.includes("admin") ? (
          <Tooltip title="Admin Profile">
            <IconButton component={Link} to="/admin">
              <SupervisorAccountIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {user.type.includes("caretaker") ? (
          <Tooltip title="Caretaker Profile">
            <IconButton component={Link} to="/caretaker">
              <ChildCareIcon />
            </IconButton>
          </Tooltip>
        ) : null}
        {user.type.includes("petowner") ? (
          <>
            <Tooltip title="Pet Owner Profile">
              <IconButton component={Link} to="/petowner">
                <PetsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Find Caretakers">
              <IconButton onClick={() => setCaretakerFiltersOpen(true)}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : null}

        <Button
          className={classes.auth}
          color="secondary"
          variant="contained"
          component={Link}
          to="/"
          onClick={() => dispatch(signoutUser())}
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </div>
    ) : (
      <>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setLoginOpen(true)}
          startIcon={<AccountCircleIcon />}
        >
          Login
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={() => setSignupOpen(true)}
          style={{ marginLeft: 16 }}
          startIcon={<PersonAddIcon />}
        >
          Register
        </Button>
      </>
    );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Avatar
          className={classes.large}
          alt="PetLovers"
          src={Logo}
          component={Link}
          to="/"
        />
        <Typography
          variant="h6"
          className={classes.title}
          component={Link}
          to="/"
        >
          PetLovers
        </Typography>
        {navButtons}
      </Toolbar>
      <Login
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        component={Link}
        to="/"
      />
      <Signup
        open={signupOpen}
        onClose={() => setSignupOpen(false)}
        component={Link}
        to="/"
      />
      <CaretakerFilter
        open={caretakerFiltersOpen}
        onClose={() => setCaretakerFiltersOpen(false)}
      />
    </AppBar>
  );
}
