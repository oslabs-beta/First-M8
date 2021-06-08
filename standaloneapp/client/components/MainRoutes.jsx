import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import DashboardContainer from "./dashboard/DashboardContainer";
import SettingsContainer from "./settings/SettingsContainer.jsx";
import HistoryContainer from "./history/HistoryContainer";

const MainRoutes = () => {
  const [allCharts, setAllCharts] = useState(() => []);

  const getAllCharts = async () => {
    await fetch("/dashboard")
      .then(response => response.json())
      .then(data => {
        if (data[0] !== undefined) {
          console.log("display data", data[0].display)
          setAllCharts(data[0].display);
        }
      });
  }

  useEffect(() => {
    getAllCharts();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <DashboardContainer
          allCharts={allCharts}
          setAllCharts={setAllCharts}
        />
      </Route>
      <Route path="/settings" component={SettingsContainer}></Route>
      <Route exact path="/history" component={HistoryContainer}></Route>
    </Switch>
  )
}

export default MainRoutes;