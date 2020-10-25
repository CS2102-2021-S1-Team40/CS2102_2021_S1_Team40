import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewNavbar from "./components/NewNavbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Leave from "./pages/Leave";
import Caretakers from "./pages/Caretakers";
import CareTakerProfile from "./pages/CareTakerProfile";
import AdminProfile from "./pages/AdminProfile";
import CurrentBidsCaretaker from "./pages/CurrentBidsCaretaker";
import CurrentBidsPetowner from "./pages/CurrentBidsPetowner";

function App() {
  return (
    <Router>
      <NewNavbar />
      <Switch>
        <Route path="/admin">
          <AdminProfile />
        </Route>
        <Route path="/caretaker">
          <CareTakerProfile />
        </Route>
        <Route path="/profile/currentBidsCaretaker">
          <CurrentBidsCaretaker />
        </Route>
        <Route path="/profile/currentBidsPetowner">
          <CurrentBidsPetowner />
        </Route>
        <Route path="/profile/find-caretakers">
          <Caretakers />
        </Route>
        <Route path="/profile/leaves">
          <Leave />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
