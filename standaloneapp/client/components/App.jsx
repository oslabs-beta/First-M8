import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DashboardContainer from "./dashboard/DashboardContainer";
import SettingsContainer from "./settings/SettingsContainer.jsx";
import HistoryContainer from "./history/HistoryContainer";

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
          <Route exact to="/" component={DashboardContainer}></Route>
          <Route exact to="/settings" component={SettingsContainer}></Route>
          <Route exact to="/history" component={HistoryContainer}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
