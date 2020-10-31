import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signoutUser } from "../redux/slices/userSlice";

import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import NavDropdown from "@bit/react-bootstrap.react-bootstrap.nav-dropdown";
import Nav from "@bit/react-bootstrap.react-bootstrap.nav";
import Button from "@material-ui/core/Button";
import Navbar from "@bit/react-bootstrap.react-bootstrap.navbar";
import ReactBootstrapStyle from "@bit/react-bootstrap.react-bootstrap.internal.style-links";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CaretakerFilter from "./CaretakerFilter";
import Logo from "../images/icon.png";
import { ButtonGroup } from "@material-ui/core";

const useStyles = makeStyles({
  auth: {
    marginLeft: "auto",
  },
});

export default function NewNavbar() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [caretakerFiltersOpen, setCaretakerFiltersOpen] = useState(false);
  const classes = useStyles();
  const authButton =
    user && user.type ? (
      <div>
        {user.type.includes("fulltime") ? (
          <Button component={Link} to="/profile/leaves">
            Leaves
          </Button>
        ) : null}
        {user.type.includes("admin") ? (
          <Button component={Link} to="/admin">
            Admin Profile
          </Button>
        ) : null}
        {user.type.includes("petowner") ? (
          <ButtonGroup variant="text">
            <Button component={Link} to="/petowner">
              Petowner Profile
            </Button>
            <Button onClick={() => setCaretakerFiltersOpen(true)}>
              Find a Caretaker
            </Button>
          </ButtonGroup>
        ) : null}
        {user.type.includes("caretaker") ? (
          <Button component={Link} to="/caretaker">
            Caretaker Profile
          </Button>
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
    <div>
      <ReactBootstrapStyle />
      <Navbar bg="faded" expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} paddingTop="7%" alt="logo" />
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
              {authButton}
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

    // <Form inline>
    // 			<FormControl type="text" placeholder="Search" className="mr-sm-2" />
    // 			<Button variant="outline-success">Search</Button>
    //     </Form>
    // <AppBar position="sticky">
    //   <Toolbar>
    //     <Typography>PetLovers</Typography>
    //     <Link to="/profile">Profile</Link>
    //     {authButton}
    //   </Toolbar>
    // </AppBar>
    // <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
    // <Signup open={signupOpen} onClose={() => setSignupOpen(false)} />
  );
}
