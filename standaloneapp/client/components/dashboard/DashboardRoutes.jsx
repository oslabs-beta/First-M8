import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import DashboardSetup from "./DashboardSetup";
import history from "./dashboardHistory";

class DashboardRoutes extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/newdashboardelement" exact component={DashboardSetup} />
        </Switch>
      </Router>
    );
  }
}

export default DashboardRoutes;
