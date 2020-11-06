import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Caretakers from "./pages/Caretakers";
import CareTakerProfile from "./pages/CareTakerProfile";
import PetOwnerProfile from "./pages/PetOwnerProfile";
import AdminProfile from "./pages/AdminProfile";
import CurrentBidsCaretaker from "./pages/CurrentBidsCaretaker";
import CurrentBidsPetowner from "./pages/CurrentBidsPetowner";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import grey from "@material-ui/core/colors/grey";
import CssBaseline from "@material-ui/core/CssBaseline";
import teal from "@material-ui/core/colors/teal";
import brown from "@material-ui/core/colors/brown";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: amber[50],
      contrastText: brown[800],
    },
    secondary: {
      main: brown[600],
      contrastText: amber[50],
    },
    background: {
      default: amber[50],
      paper: amber[50],
    },
  },
  typography: {
    allVariants: {
      color: brown[800],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Switch>
          <Route path="/admin">
            <AdminProfile />
          </Route>
          <Route path="/caretaker">
            <CareTakerProfile />
          </Route>
          <Route path="/petowner">
            <PetOwnerProfile />
          </Route>
          <Route path="/profile/currentBidsCaretaker">
            <CurrentBidsCaretaker />
          </Route>
          <Route path="/profile/currentBidsPetowner">
            <CurrentBidsPetowner />
          </Route>
          <Route path="/find-caretakers">
            <Caretakers />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
