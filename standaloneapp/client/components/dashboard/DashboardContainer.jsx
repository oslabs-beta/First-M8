import React, { useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import ChartSetup from "./ChartSetup";
import ChartsContainer from "./ChartsContainer";
import history from "./dashboardHistory";

const DashboardContainer = () => {
  const [allCharts, setAllCharts] = useState(() => []);

  return (
    <div>
      <button id="new-dashboard-chart" onClick={() => history.push("/dashboard/new-chart")}>New Dashboard Chart</button>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <ChartsContainer />
          </Route>
          <Route path="/dashboard/new-chart">
            <ChartSetup 
              allCharts={allCharts}
              setAllCharts={setAllCharts}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default DashboardContainer;