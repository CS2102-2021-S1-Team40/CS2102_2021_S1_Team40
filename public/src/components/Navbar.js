import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signoutUser } from "../redux/slices/userSlice";
import { useLocation } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CaretakerFilter from "./CaretakerFilter";
import Logo from "../images/icon.png";
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
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles({
  auth: {
    marginLeft: 16,
  },
  title: {
    flexGrow: 1,
    marginLeft: 16,
    textDecoration: "initial",
    color: "inherit",
  },
});

export default function Navbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();
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
        {user.type.includes("fulltime") ? (
          <Tooltip title="Your Leaves">
            <IconButton component={Link} to="/profile/leaves">
              <EventNoteIcon />
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
          variant="contained"
          component={Link}
          to="/"
          onClick={() => dispatch(signoutUser())}
        >
          Logout
        </Button>
      </div>
    ) : (
      <div>
        <Button variant="contained" onClick={() => setLoginOpen(true)}>
          <PermIdentityIcon fontSize="small" /> Login
        </Button>
        <Button variant="contained" onClick={() => setSignupOpen(true)}>
          Signup
        </Button>
      </div>
    );

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Avatar alt="PetLovers" src={Logo} component={Link} to="/" />
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
  /*
  return (
    <div>
      <ReactBootstrapStyle />
      <Navbar bg="faded" expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="logo" />
          PetLovers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="container-fluid">
            {user != null &&
            user.type != null &&
            user.type.includes("caretaker") ? (
              <Nav.Link as={Link} to="/profile/currentBidsCaretaker">
                Bids For You
              </Nav.Link>
            ) : null}
            {user != null &&
            user.type != null &&
            user.type.includes("petowner") ? (
              <Nav.Link as={Link} to="/profile/currentBidsPetowner">
                Bids From You
              </Nav.Link>
            ) : null}
            <Nav.Item className="ml-auto">
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
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );*/
}
