import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DashboardContainer from "./dashboard/DashboardContainer";
import SettingsContainer from "./settings/SettingsContainer.jsx";
import HistoryContainer from "./history/HistoryContainer";
import DashboardRoutes from "./dashboard/DashboardRoutes";

const App = () => {
  return (
    <div className="app">
      <Router>
        <nav>
          <Link to="/">Dashboard</Link>
          <Link to="/settings">Settings</Link>
          <Link to="/history">History</Link>
        </nav>
        <Switch>
          <Route exact path="/" component={DashboardContainer}></Route>
          <Route exact path="/settings" component={SettingsContainer}></Route>
          <Route exact path="/history" component={HistoryContainer}></Route>
        </Switch>
      </Router>
      <DashboardRoutes />
    </div>
  );
};

export default App;
