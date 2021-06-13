import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardContainer from './dashboard/DashboardContainer';
import SettingsContainer from './settings/SettingsContainer';
import HistoryContainer from './history/HistoryContainer';

const MainRoutes = ({
  allCharts,
  setAllCharts,
  prometheusInstance,
  setPrometheusInstance,
}) => {
  /*
  initializes state of all settings to display on settings page
  */
  const [settingsArr, setSettingsArr] = useState(() => []);

  /*
  retrieves all existing settings from database to display on
  settings page
  */
  const getSettings = async () => {
    await fetch('/settings/all')
      .then((resp) => resp.json())
      .then((result) => {
        setSettingsArr(result.settings);
      }).catch((e) => console.log(e));
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <DashboardContainer
          allCharts={allCharts}
          setAllCharts={setAllCharts}
          prometheusInstance={prometheusInstance}
          setPrometheusInstance={setPrometheusInstance}
        />
      </Route>
      <Route path="/settings">
        <SettingsContainer
          settingsArr={settingsArr}
          setSettingsArr={setSettingsArr}
        />
      </Route>
      <Route exact path="/history" component={HistoryContainer} />
    </Switch>
  );
};

export default MainRoutes;
