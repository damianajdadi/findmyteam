import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "normalize.css";
import LogIn from "./screens/LogIn";
import Home from "./screens/Home";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import Search from "./screens/Search";
import Applies from "./screens/Applies";
import NotFound from "./screens/NotFound";
import NewOffer from "./screens/NewOffer";
import MyOffers from "./screens/MyOffers";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/home" exact component={Home} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/offers/search" exact component={Search} />
          <Route path="/applies" exact component={Applies} />
          <Route path="/offers/new" exact component={NewOffer} />
          <Route path="/offers" exact component={MyOffers} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
