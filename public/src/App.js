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
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: amber[500],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
