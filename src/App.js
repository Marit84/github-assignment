import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import UserDetailsPage from "./pages/UserDetailsPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user/:username" component={UserDetailsPage} />
      </Switch>
    </Router>
  );
}

export default App;
