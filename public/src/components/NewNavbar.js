import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, signoutUser } from "../redux/slices/userSlice";
import {
  selectCareTaker,
  signoutCareTaker,
} from "../redux/slices/careTakerSlice";
import Login from "./Login";
import Signup from "./Signup";
import { Link } from "react-router-dom";
import NavDropdown from "@bit/react-bootstrap.react-bootstrap.nav-dropdown";
import Nav from "@bit/react-bootstrap.react-bootstrap.nav";
import Button from "@material-ui/core/Button";
import Navbar from "@bit/react-bootstrap.react-bootstrap.navbar";
import ReactBootstrapStyle from "@bit/react-bootstrap.react-bootstrap.internal.style-links";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";

const useStyles = makeStyles({
  auth: {
    marginLeft: "auto",
  },
});

export default function NewNavbar() {
  const user = useSelector(selectUser);
  const caretaker = useSelector(selectCareTaker);
  const dispatch = useDispatch();
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [caretakerOpen, setCareTakerOpen] = useState(false);
  const classes = useStyles();
  const authButton = user ? (
    <div>
      {user.type.includes('admin') ? <Button component={Link} to="/admin">Admin Profile</Button> : null}
      {user.type.includes('petowner') ? <Button>Petowner Profile</Button> : null}
      {user.type.includes('caretaker') ? <Button component={Link} to="/caretaker">Caretaker Profile</Button> :
        <Button onClick={() => setCareTakerOpen(true)}>
          Become a Caretaker
        </Button>}
      <Button
        className={classes.auth}
        variant="contained"
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
          PetLovers
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="container-fluid">
            <NavDropdown title="Our Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>

            <Nav.Item className="ml-auto">
              <Login open={loginOpen} onClose={() => setLoginOpen(false)} />
              {authButton}
              <Signup open={signupOpen} onClose={() => setSignupOpen(false)} />
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
